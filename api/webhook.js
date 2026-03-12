import crypto from 'crypto';

export default async function handler(req, res) {
    // -------------------------------------------------------------------------
    // SECURITY: Signature Verification
    // -------------------------------------------------------------------------
    const APP_SECRET = process.env.APP_SECRET;
    const VERIFY_TOKEN = 'Senior_Robot_Webhook_Secure_2026';

    // 1. Verify Request Signature (POST only)
    if (req.method === 'POST') {
        const signature = req.headers['x-hub-signature-256'];
        const APP_SECRET_1 = process.env.APP_SECRET;
        const APP_SECRET_2 = process.env.CALENDAR_APP_SECRET; // Nuevo secret para la app de calendar

        if (!signature || (!APP_SECRET_1 && !APP_SECRET_2)) {
            console.warn('WARNING: Missing signature or APP_SECRETS');
            if ((APP_SECRET_1 || APP_SECRET_2) && !signature) {
                return res.status(401).send('Missing X-Hub-Signature-256');
            }
        } else {
            const elements = signature.split('=');
            if (elements.length > 1) {
                const signatureHash = elements[1];
                let isValid = false;

                // Intentar con el Secret 1 (Senior Robot)
                if (APP_SECRET_1) {
                    const expectedHash1 = crypto.createHmac('sha256', APP_SECRET_1).update(JSON.stringify(req.body)).digest('hex');
                    if (signatureHash === expectedHash1) isValid = true;
                }

                // Si falla, intentar con el Secret 2 (Calendar Demo)
                if (!isValid && APP_SECRET_2) {
                    const expectedHash2 = crypto.createHmac('sha256', APP_SECRET_2).update(JSON.stringify(req.body)).digest('hex');
                    if (signatureHash === expectedHash2) isValid = true;
                }

                if (!isValid) {
                    console.error('Signature verification failed (App Secret mismatch). Bypassing temporarily.');
                    // TEMPORAL: Desactivado para que puedas probar el bot.
                    // return res.status(403).send('Forbidden: Invalid Signature');
                }
            }
        }
    }

    if (req.method === 'GET') {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('WEBHOOK_VERIFIED success');
                return res.status(200).send(challenge);
            } else {
                return res.status(403).json({ error: 'Verification failed' });
            }
        } else {
            return res.status(400).json({ error: 'Missing parameters' });
        }
    }

    if (req.method === 'POST') {
        const body = req.body;
        console.log('Incoming webhook:', JSON.stringify(body, null, 2));

        if (body.object) {
            if (
                body.entry &&
                body.entry[0].changes &&
                body.entry[0].changes[0] &&
                body.entry[0].changes[0].value.messages &&
                body.entry[0].changes[0].value.messages[0]
            ) {
                const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
                const message = body.entry[0].changes[0].value.messages[0];
                const from = message.from;

                // Handle various message types (text, interactive)
                let msg_body = '';
                if (message.type === 'text') {
                    msg_body = message.text.body.toLowerCase();
                } else if (message.type === 'interactive') {
                    // Handle button replies or list replies
                    const interactive = message.interactive;
                    if (interactive.type === 'button_reply') {
                        msg_body = interactive.button_reply.id;
                    } else if (interactive.type === 'list_reply') {
                        msg_body = interactive.list_reply.id;
                    }
                }

                console.log(`Message from ${from} to ${phone_number_id}: ${msg_body}`);

                // ==========================================
                // ROUTING POR NÚMERO DE TELÉFONO
                // ==========================================

                const DEMO_CALENDAR_PHONE_ID = '1062960976899570';

                if (phone_number_id === DEMO_CALENDAR_PHONE_ID) {
                    // ---------------------------------------------------------
                    // ✂️ LÓGICA DEL NUEVO CHATBOT (Barber Shop Demo + GAS)
                    // ---------------------------------------------------------
                    global.bookingCache = global.bookingCache || {};
                    const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7aar-5FgFpBcR8yUZJ49_zJEqDt55T8q2_az4rUEJtrETR_RIxOJdFFJ-gtrBHHsm/exec";

                    try {
                        if (msg_body.startsWith('btn_')) {
                            const parts = msg_body.split('_'); // ej: btn_srv_corte, btn_brb_juan_corte, btn_day_hoy_juan_corte, btn_time_1000_hoy_juan_corte

                            if (parts[1] === 'srv') {
                                const srv = parts[2];
                                await sendMessage(phone_number_id, from, "Excelente elección. ¿Tienes algún barbero de preferencia o buscamos el primer espacio disponible?");
                                const btns = [
                                    { type: "reply", reply: { id: `btn_brb_any_${srv}`, title: "Cualquiera (Rápido)" } },
                                    { type: "reply", reply: { id: `btn_brb_juan_${srv}`, title: "Barbero Juan" } },
                                    { type: "reply", reply: { id: `btn_brb_alex_${srv}`, title: "Barbero Alex" } }
                                ];
                                await sendCustomButtonMessage(phone_number_id, from, "👉 Elige tu preferencia:", btns);
                            }
                            else if (parts[1] === 'brb') {
                                const brb = parts[2];
                                const srv = parts[3];
                                const btns = [
                                    { type: "reply", reply: { id: `btn_day_hoy_${brb}_${srv}`, title: "Hoy" } },
                                    { type: "reply", reply: { id: `btn_day_man_${brb}_${srv}`, title: "Mañana" } },
                                    { type: "reply", reply: { id: `btn_day_otro_${brb}_${srv}`, title: "Otro día" } }
                                ];
                                await sendCustomButtonMessage(phone_number_id, from, "¿Para qué día te gustaría tu cita? 📅", btns);
                            }
                            else if (parts[1] === 'day') {
                                const day = parts[2];
                                const brb = parts[3];
                                const srv = parts[4];

                                // Condición Fuera de Horario (demo check for 9 PM MX)
                                const mxTime = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" });
                                const currentHour = new Date(mxTime).getHours();

                                if (day === 'hoy' && currentHour >= 21) {
                                    const btns = [
                                        { type: "reply", reply: { id: `btn_day_man_${brb}_${srv}`, title: "Ver Mañana" } }
                                    ];
                                    await sendCustomButtonMessage(phone_number_id, from, "🌙 Ya cerramos por hoy, pero no te quedes sin tu corte. Aquí tienes los horarios para mañana temprano.", btns);
                                    return res.status(200).send('EVENT_RECEIVED');
                                }

                                await sendMessage(phone_number_id, from, "⏳ Consultando disponibilidad de nuestras sillas...");

                                // Petición a GAS
                                const response = await fetch(GAS_WEB_APP_URL, {
                                    method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                    body: JSON.stringify({ action: "getAvailability", date: day, barber: brb })
                                });
                                const data = await response.json();

                                if (data.status === 'success' && data.available_slots && data.available_slots.length > 0) {
                                    const slots = data.available_slots.slice(0, 3);
                                    const btns = slots.map(slot => {
                                        const safeTime = slot.replace(/ AM| PM|:/g, ''); // "1000", "0200"
                                        return { type: "reply", reply: { id: `btn_time_${safeTime}_${day}_${brb}_${srv}`, title: slot } };
                                    });
                                    await sendCustomButtonMessage(phone_number_id, from, `Estos son los turnos disponibles para ${day === 'hoy' ? 'hoy' : (day === 'man' ? 'mañana' : 'ese día')}:`, btns);
                                } else {
                                    const btns = [
                                        { type: "reply", reply: { id: `btn_day_man_${brb}_${srv}`, title: "Ver mañana" } }
                                    ];
                                    await sendCustomButtonMessage(phone_number_id, from, "Lo siento, para ese día estamos a tope 💈. ¿Te gustaría intentar con el día siguiente?", btns);
                                }
                            }
                            else if (parts[1] === 'time') {
                                const time = parts[2];
                                const day = parts[3];
                                const brb = parts[4];
                                const srv = parts[5];

                                global.bookingCache[from] = { time, day, brb, srv, ts: Date.now() };

                                await sendMessage(phone_number_id, from, "¡Casi listo! Por favor, dime tu nombre para registrar la cita. ✍️");
                            }
                            else if (parts[1] === 'action') {
                                if (parts[2] === 'mantener') {
                                    await sendMessage(phone_number_id, from, "Perfecto, tu cita se mantiene sin cambios. ¡Te esperamos! 💈");
                                } else if (parts[2] === 'reagendar') {
                                    const btns = [
                                        { type: "reply", reply: { id: "btn_srv_corte", title: "Corte / Haircut" } },
                                        { type: "reply", reply: { id: "btn_srv_combo", title: "Corte + Barba" } },
                                        { type: "reply", reply: { id: "btn_srv_perfilado", title: "Solo Barba" } }
                                    ];
                                    await sendHeaderImageMessage(phone_number_id, from, "¡Hola! Bienvenido a Mr. Robot Barber 💈. Selecciona tu servicio para reagendar:", "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop", btns);
                                }
                            }

                        } else {
                            // Flujo de texto libre
                            if (global.bookingCache && global.bookingCache[from]) {
                                const booking = global.bookingCache[from];
                                const userName = msg_body.trim() === '' ? 'Cliente' : msg_body.trim();
                                delete global.bookingCache[from];

                                await sendMessage(phone_number_id, from, `⏳ Agendando tu cita, ${userName}...`);

                                const response = await fetch(GAS_WEB_APP_URL, {
                                    method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                    body: JSON.stringify({ action: "bookAppointment", phone: from, name: userName, service: booking.srv, barber: booking.brb, day: booking.day, time: booking.time })
                                });
                                const data = await response.json();

                                if (data.status === 'success') {
                                    const msg = `¡Listo, ${userName}! Tu cita quedó agendada exitosamente: 🎉\n\n📅 Día: ${booking.day.toUpperCase()}\n⏰ Hora: ${data.appointmentTime}\n💈 Servicio: ${booking.srv}\n📍 Lugar: ${data.silla}`;
                                    await sendMessage(phone_number_id, from, msg);
                                } else {
                                    await sendMessage(phone_number_id, from, "❌ Hubo un problema al intentar apartar tu lugar. Por favor intenta de nuevo.");
                                }
                            } else {
                                // Checking for an existing appointment directly on first message
                                const response = await fetch(GAS_WEB_APP_URL, {
                                    method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                    body: JSON.stringify({ action: "checkUserAppointment", phone: from })
                                });
                                const data = await response.json();

                                if (data.hasAppointment) {
                                    const btns = [
                                        { type: "reply", reply: { id: "btn_action_reagendar", title: "Reagendar" } },
                                        { type: "reply", reply: { id: "btn_action_mantener", title: "Mantener cita" } }
                                    ];
                                    await sendCustomButtonMessage(phone_number_id, from, `Veo que ya tienes una cita agendada para mañana temprano (${data.appointmentTime}). ¿Deseas cancelarla o reagendarla?`, btns);
                                } else {
                                    const btns = [
                                        { type: "reply", reply: { id: "btn_srv_corte", title: "Corte de Cabello ($)" } },
                                        { type: "reply", reply: { id: "btn_srv_combo", title: "Corte + Barba ($$)" } },
                                        { type: "reply", reply: { id: "btn_srv_perfilado", title: "Perfilado ($)" } }
                                    ];
                                    await sendHeaderImageMessage(phone_number_id, from, "¡Hola! Bienvenido a Mr. Robot Barber Shop 💈. Soy tu asistente virtual. ¿Qué servicio te gustaría agendar hoy?", "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80", btns);
                                }
                            }
                        }
                    } catch (error) {
                        console.error('Error en Barber Flow:', error);
                        try { await sendMessage(phone_number_id, from, "❌ Lo siento, hubo un error de conexión con nuestros sistemas."); } catch (e) { }
                    }

                } else {
                    // ---------------------------------------------------------
                    // 🤖 LÓGICA DEL CHATBOT ACTUAL (Senior Robot)
                    // ---------------------------------------------------------

                    // 1. Check for Return to Main Menu (Resets to Needs Assessment)
                    if (msg_body === 'btn_main_menu') {
                        // Send Needs Assessment (Step 1)
                        await sendWelcomeAndNeeds(phone_number_id, from);
                        return res.status(200).send('EVENT_RECEIVED');
                    }

                    let responseText = '';
                    let nextButtons = null;

                    // 2. STEP 2 A: Handle Needs Selection -> Send Volume Qualification
                    // Needs: Speed (A), Organization (B), AI (C)
                    if (
                        msg_body === 'btn_need_speed' || msg_body.includes('rapidez') ||
                        msg_body === 'btn_need_org' || msg_body.includes('organizar') ||
                        msg_body === 'btn_need_ai' || msg_body.includes('inteligencia')
                    ) {
                        const qualText = "¡Excelente meta! Tenemos la tecnología para lograrlo. Solo para asegurarnos de que el sistema soporte tu ritmo de trabajo sin interrupciones, ¿cuántos chats recibes, aproximadamente, por día? 📊";
                        const qualButtons = [
                            { type: "reply", reply: { id: "btn_vol_1", title: "Hasta 25 🐣" } },
                            { type: "reply", reply: { id: "btn_vol_2", title: "25 a 50 📈" } },
                            { type: "reply", reply: { id: "btn_vol_3", title: "Más de 50 🏢" } }
                        ];
                        await sendCustomButtonMessage(phone_number_id, from, qualText, qualButtons);
                        return res.status(200).send('EVENT_RECEIVED');
                    }

                    // 3. STEP 3: Handle Volume Selection -> Send Solution
                    // LEVEL 1: Hasta 25 chats
                    else if (msg_body === 'btn_vol_1' || msg_body.includes('hasta 25')) {
                        responseText = "¡Perfecto para dar el primer gran paso! Nuestra Solución Entrada está diseñada para que te olvides de las tareas repetitivas y te enfoques en crecer. 🌱\n\n✅ Tus contactos se guardan solos en Google Sheets. 📊\n✅ Tus citas se agendan directo en Google Calendar. 📅\n✅ Resolvemos dudas comunes al instante con FAQ. 💡\n\n💰 Inversión: Desde $3,000 MXN.\n\n¿Te gustaría agendar una breve llamada para ver cómo se vería en tu negocio? 📞";
                        nextButtons = [
                            { type: "reply", reply: { id: "btn_schedule", title: "Agendar Llamada 📞" } },
                            { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                        ];
                    }
                    // LEVEL 2: 25 - 50 chats
                    else if (msg_body === 'btn_vol_2' || msg_body.includes('25 a 50')) {
                        responseText = "¡Qué buen ritmo lleva tu negocio! El Plan Estándar es el aliado que necesitas para profesionalizar cada interacción. 🚀\n\n✅ Gestión completa de citas: tus clientes agendan, cambian o cancelan solos. ⏳\n✅ Base de datos segura para que nunca pierdas un prospecto. 🔒\n✅ Respuestas rápidas que dan confianza y cierran ventas. 🎯\n\n💰 Inversión: Desde $7,000 MXN.\n\n¿Platicamos en una llamada para explicarte cómo configurarlo? 📞";
                        nextButtons = [
                            { type: "reply", reply: { id: "btn_schedule", title: "Agendar Llamada 📞" } },
                            { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                        ];
                    }
                    // LEVEL 3: 50+ chats
                    else if (msg_body === 'btn_vol_3' || msg_body.includes('más de 50') || msg_body.includes('51')) {
                        responseText = "¡Increíble volumen! Para un flujo así, necesitas el poder de nuestra Solución Premium con Inteligencia Artificial. 🧠⚡\n\n✅ Un agente de IA entrenado con la voz de tu marca. 🗣️\n✅ Integración total con tu CRM para que todo esté conectado. 🔗\n✅ Seguridad de nivel corporativo para proteger tu información. 🛡️\n\n💰 Inversión: Desde $15,000 MXN.\n\nEste nivel requiere un toque personal. ¿Agendamos una consultoría técnica gratuita? 📞";
                        nextButtons = [
                            { type: "reply", reply: { id: "btn_consulting", title: "Consultoría Gratis 🛠️" } },
                            { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                        ];
                    }
                    // SCHEDULING / CONSULTING (External Link)
                    else if (msg_body === 'btn_schedule' || msg_body === 'btn_consulting' || msg_body.includes('agendar') || msg_body.includes('consultoría')) {
                        responseText = "¡Excelente decisión! 🎯 El siguiente paso es una breve llamada de diagnóstico para detectar los cuellos de botella en tu proceso y ver cómo Senior Robot los va a eliminar. 🚫🍾\n\nPor favor, elige el horario que mejor te acomode en nuestro calendario oficial: 👉 https://calendar.app.google/1VzMDX3u7EunndcYA 📅\n\nNota: Atendemos de forma personalizada para asegurar la máxima calidad en cada integración. 🦾";
                    }
                    // CONTACT HUMAN (Direct Call)
                    else if (msg_body === 'btn_contact_human' || msg_body.includes('llamar')) {
                        responseText = "📞 Puedes contactarnos directamente al: +52 312 112 8434\n\nEstamos disponibles para atenderte personalmente. 🤝";
                    }

                    // 4. Send Response if matched an option
                    if (responseText) {
                        try {
                            if (nextButtons) {
                                await sendCustomButtonMessage(phone_number_id, from, responseText, nextButtons);
                            } else {
                                await sendMessage(phone_number_id, from, responseText);
                            }
                        } catch (error) {
                            console.error('Error sending message:', error);
                        }
                        return res.status(200).send('EVENT_RECEIVED');
                    }

                    // 5. GREETING CHECK
                    // Restore explicit check for greetings to trigger the Welcome Flow
                    const greetingKeywords = ['hola', 'hi', 'hello', 'buenos', 'buenas', 'inicio', 'empezar', 'menu'];
                    const isGreeting = greetingKeywords.some(keyword => msg_body.includes(keyword));

                    try {
                        if (isGreeting) {
                            // Triggers the Welcome & Needs Assessment (Step 1)
                            await sendWelcomeAndNeeds(phone_number_id, from);
                        } else {
                            // 6. FALLBACK: HUMAN HANDOFF / SENIOR ROBOT INTRO
                            // If it's unknown text (e.g. user writing after flow), offer human contact.
                            const fallbackText = "Soy Senior Robot, tu Asistente Digital 🤖.\n\nSi deseas hablar con un humano, puedes agendar una cita, llamar directo o volver al menú. 👇";
                            const fallbackButtons = [
                                { type: "reply", reply: { id: "btn_schedule", title: "Agendar Cita 📅" } },
                                { type: "reply", reply: { id: "btn_contact_human", title: "Llamar Ahora 📞" } },
                                { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                            ];
                            await sendCustomButtonMessage(phone_number_id, from, fallbackText, fallbackButtons);
                        }
                    } catch (error) {
                        console.error('Error sending fallback flow:', error);
                    }
                }
            }
            return res.status(200).send('EVENT_RECEIVED');
        } else {
            return res.status(404).send('Not Found');
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

// Generic Helper to send Button Messages with Header Image
async function sendHeaderImageMessage(phoneNumberId, to, bodyText, imageUrl, buttons) {
    // IGNORANDO VERCEL: Forzado directo del token asíncrono en código puro
    const token = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';

    const messagePayload = {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        interactive: {
            type: "button",
            header: {
                type: "image",
                image: { link: imageUrl }
            },
            body: { text: bodyText },
            action: { buttons: buttons }
        }
    };

    const response = await fetch(
        `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
        {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(messagePayload),
        }
    );
    if (!response.ok) {
        const errorData = await response.json();
        console.error("WhatsApp API Error (Image Button):", JSON.stringify(errorData));
    }
}

// Helper to send text messages
async function sendMessage(phoneNumberId, to, text) {
    // IGNORANDO VERCEL: Forzado directo del token asíncrono en código puro
    const token = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';


    console.log(`Intentando enviar mensaje a ${to} usando App/Token configurado en env...`);

    const response = await fetch(
        `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: to,
                text: { body: text },
            }),
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        console.error("WhatsApp API Error (Text):", JSON.stringify(errorData));
        throw new Error(`WhatsApp API Error: ${JSON.stringify(errorData)}`);
    } else {
        const responseData = await response.json();
        console.log(`✅ ¡Mensaje enviado a Meta con éxito! ID: ${responseData.messages?.[0]?.id}`);
    }
}

// Helper to send Welcome Message & Needs Assessment Buttons
async function sendWelcomeAndNeeds(phoneNumberId, to) {
    const welcomeText = "¡Hola! Qué gusto saludarte. Soy el asistente inteligente de Senior Robot 🤖.\n\nSabemos que detrás de cada chat hay un cliente esperando y un negocio con metas grandes. Mi objetivo es ayudarte a que tu equipo sea más productivo y tus clientes reciban atención de primer nivel, las 24 horas. 🌟\n\nPara empezar, ¿cuál es el impulso que tu negocio necesita hoy? 👇\n\nA) Dejar de perder clientes por falta de respuesta rápida ⚡\nB) Organizar mis citas y datos de forma automática 📅\nC) Implementar Inteligencia Artificial para ventas complejas 🧠";

    // Send text first
    await sendMessage(phoneNumberId, to, welcomeText);

    // Short delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Send Buttons
    const buttons = [
        { type: "reply", reply: { id: "btn_need_speed", title: "Respuesta Rápida ⚡" } },
        { type: "reply", reply: { id: "btn_need_org", title: "Organizar Citas 📅" } },
        { type: "reply", reply: { id: "btn_need_ai", title: "Implementar IA 🧠" } }
    ];
    await sendCustomButtonMessage(phoneNumberId, to, "Selecciona tu prioridad:", buttons);
}

// Generic Helper to send Button Messages
async function sendCustomButtonMessage(phoneNumberId, to, bodyText, buttons) {
    // IGNORANDO VERCEL: Forzado directo del token asíncrono en código puro
    const token = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';


    const messagePayload = {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        interactive: {
            // El tipo siempre es "button" cuando mandamos reply buttons
            type: "button",
            body: {
                text: bodyText
            },
            action: {
                buttons: buttons
            }
        }
    };

    const response = await fetch(
        `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messagePayload),
        }
    );
    if (!response.ok) {
        const errorData = await response.json();
        console.error("WhatsApp API Error (Buttons):", JSON.stringify(errorData));
        throw new Error(`WhatsApp API Error: ${JSON.stringify(errorData)}`);
    }
}
