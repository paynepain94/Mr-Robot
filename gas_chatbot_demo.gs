// ==========================================
// GOOGLE APPS SCRIPT - AGENDA MULTI-SILLAS (DEMO)
// Archivo: gas_chatbot_demo.gs
// ==========================================

const CALENDAR_IDS = [
  "5e2a55b220a56c1a9b69fd0c3d28b7fcdd729e7df59309289ae0898980a8a9e9@group.calendar.google.com", // Silla 1
  "f9b1dd278e911351832a47492482e13b59fcdf1a12d649897eb034925708f5d5@group.calendar.google.com", // Silla 2
  "1fb9703965a7d644f7ad2fdb9a0bd77253d3bc8242eb18b812e96f66a90ba88f@group.calendar.google.com", // Silla 3
  "9a762467214f82e50c14754cc091bac4129a57091dfad3ba1ce937b682c9e45d@group.calendar.google.com"  // Silla 4
];

// Función principal que recibe las peticiones (POST) desde Node.js (Webhook)
function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;
    const userPhone = postData.user_phone;
    
    // 1. Acción: Consultar Disponibilidad
    if (action === "getAvailability") {
      const availabilityInfo = checkCalendarsForNextDays(2); // Buscar en los próximos 2 días
      
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        action_received: action,
        phone: userPhone,
        data: availabilityInfo,
        message: "Consulta a calendarios realizada desde Apps Script."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 2. Acción: Agendar Cita (Ejemplo a expandir después)
    if (action === "bookAppointment") {
      // Aquí irá la lógica para crear el evento
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Función de agendar todavía en construcción."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Si la acción no hace match
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Acción no reconocida."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Función auxiliar para leer los calendarios
function checkCalendarsForNextDays(daysAhead) {
  const now = new Date();
  
  // Expandir a la tarde/noche para obtener todo del día actual y X días adelante
  const endDate = new Date();
  endDate.setDate(now.getDate() + daysAhead);
  endDate.setHours(23, 59, 59);

  let busyEvents = [];
  
  // Recorremos cada silla (calendario)
  CALENDAR_IDS.forEach((calId, index) => {
    try {
      const cal = CalendarApp.getCalendarById(calId);
      if (cal) {
        const events = cal.getEvents(now, endDate);
        
        events.forEach(ev => {
           busyEvents.push({
             silla: `Silla ${index + 1}`,
             title: ev.getTitle(),
             startTime: ev.getStartTime().toISOString(),
             endTime: ev.getEndTime().toISOString()
           });
        });
      }
    } catch (err) {
      // Ignorar si un ID falla temporalmente
      Logger.log("Error leyendo el calendario " + calId + ": " + err);
    }
  });
  
  return {
    search_start: now.toISOString(),
    search_end: endDate.toISOString(),
    total_busy_events: busyEvents.length,
    events: busyEvents 
  };
}

// ==========================================
// Función de prueba manual desde el editor de Apps Script
function testCheckCalendars() {
  const data = checkCalendarsForNextDays(2);
  Logger.log(data);
}
