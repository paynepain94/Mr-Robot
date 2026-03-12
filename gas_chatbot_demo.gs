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
       // Mock response logic for the demo 
       // We can return a static array of available hours based on demo constraints.
       let slots = ["10:00 AM", "02:00 PM", "04:00 PM"];
       if (data.date === 'man') slots = ["09:00 AM", "11:00 AM", "01:00 PM"];
       if (data.date === 'otro') slots = ["12:00 PM", "03:00 PM", "05:00 PM"];
       
       return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          available_slots: slots
       })).setMimeType(ContentService.MimeType.JSON);
    } 
    
    // 2. CHECK USER APPOINTMENT
    else if (data.action === 'checkUserAppointment') {
       const events = checkPhoneInEvents(data.phone);
       if (events && events.length > 0) {
          // Format date for the demo
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
       let calId = CALENDAR_IDS[0]; // any
       let sillaName = "Silla Principal";
       
       // Asignar recursos por barbero
       if (data.barber === 'juan') {
           calId = CALENDAR_IDS[1];
           sillaName = "Silla 2 (Juan)";
       } else if (data.barber === 'alex') {
           calId = CALENDAR_IDS[2];
           sillaName = "Silla 3 (Alex)";
       }
       
       const cal = CalendarApp.getCalendarById(calId);
       
       // Calculate date
       const target = new Date();
       if (data.day === 'man') {
          target.setDate(target.getDate() + 1);
       } else if (data.day === 'otro') {
          target.setDate(target.getDate() + 2);
       }
       
       // Format "1000", "0200" into hours (assuming PM for demo purposes if < 0900)
       let num = data.time.substring(0,2);
       let isPM = data.time.includes('PM');
       if (!data.time.includes('PM') && !data.time.includes('AM')) {
           // Fallback from safeTime (e.g. "1000" instead of "10:00 AM")
           let intHour = parseInt(num);
           if (intHour >= 1 && intHour <= 6) isPM = true; // 1, 2, 3, 4, 5, 6 is PM generally in these contexts
       }
       
       let hour = parseInt(num);
       if (isPM && hour !== 12) hour += 12;
       if (!isPM && hour === 12) hour = 0;
       
       target.setHours(hour, 0, 0, 0);
       
       let durationMinutes = 60; // default (Combo)
       if (data.service === 'corte') durationMinutes = 45;
       if (data.service === 'perfilado') durationMinutes = 30;
       
       const endTarget = new Date(target.getTime() + durationMinutes * 60 * 1000);
       
       // Make reservation
       const title = `💈 Cita: ${data.name} - ${data.service}`;
       const description = `Phone: ${data.phone}\nService: ${data.service}\nBarber: ${data.barber}`;
       const event = cal.createEvent(title, target, endTarget, { description: description });
       
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
