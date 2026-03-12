const CALENDAR_IDS = [
  '5e2a55b220a56c1a9b69fd0c3d28b7fcdd729e7df59309289ae0898980a8a9e9@group.calendar.google.com', // Silla 1 (Any / General)
  'f9b1dd278e911351832a47492482e13b59fcdf1a12d649897eb034925708f5d5@group.calendar.google.com', // Silla 2 (Juan)
  '1fb9703965a7d644f7ad2fdb9a0bd77253d3bc8242eb18b812e96f66a90ba88f@group.calendar.google.com', // Silla 3 (Alex)
  '9a762467214f82e50c14754cc091bac4129a57091dfad3ba1ce937b682c9e45d@group.calendar.google.com'  // Silla 4 (Extra / Backup)
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. GET AVAILABILITY
    if (data.action === 'getAvailability') {
        const rawDate = data.dateStr; // "20260312"
        const parsedTargetDate = new Date(parseInt(rawDate.substr(0,4)), parseInt(rawDate.substr(4,2))-1, parseInt(rawDate.substr(6,2)));
        
        const startHour = 9;
        const endHour = 21;
        const intervalMinutes = 30; 
        
        let duracion = 30;
        if (data.service === 'corte' || data.service === 'ninos') duracion = 40;
        if (data.service === 'barba' || data.service === 'mascarilla') duracion = 30;
        if (data.service === 'combo') duracion = 60;
        if (data.service === 'recortes') duracion = 20;
        duracion += 10; // 10 min buffer
        
        const available_slots = [];
        
        const startOfDay = new Date(parsedTargetDate);
        startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date(parsedTargetDate);
        endOfDay.setHours(23,59,59,999);
        
        const barberMap = {
            'alberto': [CALENDAR_IDS[0]],
            'jotzan': [CALENDAR_IDS[1]],
            'juan': [CALENDAR_IDS[2]],
            'carlos': [CALENDAR_IDS[3]],
            'any': CALENDAR_IDS
        };
        
        let targetCals = barberMap[data.barber] || CALENDAR_IDS;
        let eventsByCal = [];
        for (let cid of targetCals) {
            let cal = CalendarApp.getCalendarById(cid);
            if (cal) {
                eventsByCal.push(cal.getEvents(startOfDay, endOfDay));
            }
        }
        
        let now = new Date();
        
        for (let h = startHour; h < endHour; h++) {
            for (let m = 0; m < 60; m += intervalMinutes) {
                let slotStart = new Date(startOfDay);
                slotStart.setHours(h, m, 0, 0);
                
                let slotEnd = new Date(slotStart.getTime() + duracion * 60000); 
                if (slotEnd.getHours() > endHour || (slotEnd.getHours() === endHour && slotEnd.getMinutes() > 0)) {
                    continue; // Goes past 9 PM
                }
                if (slotStart < now) continue;
                
                let isSlotFree = false;
                for (let calEvents of eventsByCal) {
                    let overlap = false;
                    for (let ev of calEvents) {
                        if (ev.getStartTime() < slotEnd && ev.getEndTime() > slotStart) {
                            overlap = true;
                            break;
                        }
                    }
                    if (!overlap) {
                        isSlotFree = true;
                        break;
                    }
                }
                
                if (isSlotFree) {
                    let timeStr = slotStart.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true});
                    available_slots.push(timeStr);
                }
            }
        }
        
        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            available_slots: available_slots
        })).setMimeType(ContentService.MimeType.JSON);
    } 
    
    // 2. CHECK USER APPOINTMENT
    else if (data.action === 'checkUserAppointment') {
       const events = checkPhoneInEvents(data.phone);
       if (events && events.length > 0) {
          const startDate = events[0].getStartTime();
          const dayName = startDate.getDay() === new Date().getDay() ? "Hoy" : "Mañana";
          const timeStr = startDate.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true});
          
          return ContentService.createTextOutput(JSON.stringify({
              hasAppointment: true,
              appointmentTime: `${dayName} a las ${timeStr}`
          })).setMimeType(ContentService.MimeType.JSON);
       }
       
       return ContentService.createTextOutput(JSON.stringify({
          hasAppointment: false
       })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 3. BOOK APPOINTMENT
    else if (data.action === 'bookAppointment') {
        const rawDate = data.dateStr || ""; 
        const target = new Date(parseInt(rawDate.substr(0,4)), parseInt(rawDate.substr(4,2))-1, parseInt(rawDate.substr(6,2)));
        
        let num = data.time.substring(0,2);
        let min = parseInt(data.time.substring(2,4));
        let isPM = data.time.toUpperCase().includes('PM');
        
        let hour = parseInt(num);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
        
        target.setHours(hour, min, 0, 0);
        
        let duracion = 30;
        if (data.service === 'corte' || data.service === 'ninos') duracion = 40;
        if (data.service === 'barba' || data.service === 'mascarilla') duracion = 30;
        if (data.service === 'combo') duracion = 60;
        if (data.service === 'recortes') duracion = 20;
        duracion += 10;
        
        const endTarget = new Date(target.getTime() + duracion * 60000);
        
        const barberMap = {
            'alberto': { index: 0, name: "Silla 1 Alberto" },
            'jotzan': { index: 1, name: "Silla 2 Jotzan" },
            'juan': { index: 2, name: "Silla 3 Juan" },
            'carlos': { index: 3, name: "Silla 4 Carlos" }
        };
        
        let calendarIndexToUse = -1;
        let sillaName = "";
        
        if (barberMap[data.barber]) {
            calendarIndexToUse = barberMap[data.barber].index;
            sillaName = barberMap[data.barber].name;
        } else {
            for (let idx = 0; idx < CALENDAR_IDS.length; idx++) {
                let cal = CalendarApp.getCalendarById(CALENDAR_IDS[idx]);
                let events = cal.getEvents(target, endTarget);
                if (events.length === 0) {
                    calendarIndexToUse = idx;
                    sillaName = ["Silla 1 Alberto", "Silla 2 Jotzan", "Silla 3 Juan", "Silla 4 Carlos"][idx];
                    break;
                }
            }
        }
        
        if (calendarIndexToUse === -1) {
             return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: 'No slots available' })).setMimeType(ContentService.MimeType.JSON);
        }
        
        const cal = CalendarApp.getCalendarById(CALENDAR_IDS[calendarIndexToUse]);
        if (!cal) {
           return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: 'Calendar not found' })).setMimeType(ContentService.MimeType.JSON);
        }
        
        const title = `💈 Cita: ${data.name}`;
        const description = `Phone: ${data.phone}\nService: ${data.service}\nBarber: ${data.barber}`;
        cal.createEvent(title, target, endTarget, { description: description });
        
        const prettyTime = target.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true});

        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            silla: sillaName,
            appointmentTime: prettyTime
        })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to search upcoming 7 days for the user's phone
function checkPhoneInEvents(phone) {
    const now = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 7);
    
    for (let c of CALENDAR_IDS) {
       const cal = CalendarApp.getCalendarById(c);
       if (!cal) continue;
       
       const events = cal.getEvents(now, end);
       for (let ev of events) {
          const desc = ev.getDescription() || '';
          if (desc.indexOf(phone) !== -1) {
             return [ev];
          }
       }
    }
    return [];
}
