export default async function handler(req, res) {
    if (req.method === 'GET') {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        // Use hardcoded token as requested/debugged
        // Load env via process.env (Standard Node/Vercel behavior)
        // FALLBACK: Use hardcoded token if env var is missing (Hotfix for immediate deployment)
        const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'mr_robot_secret_8909789';

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

                console.log(`Message from ${from}: ${msg_body}`);

                // KEYWORD LOGIC
                // 1. Check for Return to Main Menu (First priority explicit action)
                if (msg_body === 'btn_main_menu') {
                    // Just the segmentation question
                    await sendSegmentationButtons(phone_number_id, from);
                    return res.status(200).send('EVENT_RECEIVED');
                }

                let responseText = '';
                let nextButtons = null;

                // 2. Check for Specific Flow Options
                // LEVEL 1: 1 - 25 chats
                if (msg_body === 'btn_level_1' || msg_body.includes('1 - 25')) {
                    responseText = "¡Perfecto! ✨ Para tu volumen actual, nuestra Solución Entrada es la llave para que dejes de perder clientes por falta de atención inmediata. 🔑\n\nLo que obtienes:\n✅ Orden Total: Registro automático de tus prospectos en Google Sheets. 📊\n✅ Puntualidad: Agendamiento directo en tu Google Calendar. 📅\n✅ Disponibilidad 24/7: Sección de Preguntas Frecuentes personalizada para que nunca dejes de responder. 💡\n\n💰 Inversión: Desde $3,000 MXN.\n\n¿Te gustaría que un especialista valide si este flujo es el ideal para ti?";
                    nextButtons = [
                        { type: "reply", reply: { id: "btn_schedule", title: "Agendar Llamada 📞" } },
                        { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                    ];
                }
                // LEVEL 2: 25 - 50 chats
                else if (msg_body === 'btn_level_2' || msg_body.includes('25 - 50')) {
                    responseText = "¡Excelente! 🚀 Tu negocio está en el punto ideal para nuestro Plan Estándar, donde la automatización toma el control total de tu logística.\n\nLo que obtienes:\n✅ Control de Agenda: El bot agenda, cambia o cancela citas sin que tú muevas un dedo. ⏳\n✅ Seguridad Pro: Base de datos dedicada para el resguardo seguro de tus contactos. 🔒\n✅ Cierre de Ventas: Estructura de Preguntas Frecuentes diseñada para derribar objeciones al instante. 🎯\n\n💰 Inversión: Desde $7,000 MXN.\n\n¿Quieres ver cómo este sistema puede ahorrarte más de 15 horas de administración a la semana? 🕒";
                    nextButtons = [
                        { type: "reply", reply: { id: "btn_schedule", title: "Agendar Llamada 📞" } },
                        { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                    ];
                }
                // LEVEL 3: 51+ chats
                else if (msg_body === 'btn_level_3' || msg_body.includes('51') || msg_body.includes('más')) {
                    responseText = "¡Entendido! ⚡ A este volumen, la eficiencia es crítica. Nuestro Plan Premium integra un Agente de IA entrenado específicamente con el ADN de tu marca. 🧠🤖\n\nLo que obtienes:\n✅ IA Avanzada: Respuestas inteligentes y naturales a consultas complejas. 🤯\n✅ Ecosistema Conectado: Integración total con tu CRM para un seguimiento perfecto. 🔗\n✅ Máxima Resiliencia: Infraestructura diseñada bajo estándares de ciberseguridad profesional. 🛡️\n\n💰 Inversión: Desde $15,000 MXN.\n\nEste nivel requiere una consultoría técnica personalizada. ¿Agendamos tu sesión ahora? 💡";
                    nextButtons = [
                        { type: "reply", reply: { id: "btn_consulting", title: "Consultoría 🛠️" } },
                        { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                    ];
                }
                // SCHEDULING / CONSULTING
                else if (msg_body === 'btn_schedule' || msg_body === 'btn_consulting' || msg_body.includes('agendar') || msg_body.includes('consultoría')) {
                    responseText = "¡Excelente decisión! 🎯 El siguiente paso es una breve llamada de diagnóstico para detectar los cuellos de botella en tu proceso y ver cómo Senior Robot los va a eliminar. 🚫🍾\n\nPor favor, elige el horario que mejor te acomode en nuestro calendario oficial: 👉 https://calendar.app.google/1VzMDX3u7EunndcYA 📅\n\nNota: Atendemos de forma personalizada para asegurar la máxima calidad en cada integración. 🦾";
                }

                // 3. Send Response if matched an option
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

                // 4. FALLBACK / DEFAULT: Detailed Welcome Message
                // If it wasn't a Main Menu click AND not a known option, assume it's a Greeting or valid input.
                // This acts as a Catch-All for new users or random text.
                try {
                    const welcomeText = "¡Hola! 👋 Bienvenido a Senior Robot, ingeniería en automatización de élite. 🤖🚀\n\nSoy tu asistente virtual y estoy aquí para ayudarte a escalar tus ventas con tecnología inteligente. 📈\n\nDiseñamos soluciones con más de 10 años de experiencia en infraestructura y ciberseguridad 🛡️, garantizando que tu bot sea una herramienta blindada y ultra eficiente.\n\nPara darte el diagnóstico correcto, ¿cuántos chats recibe tu negocio en promedio al día? 👇\n\n1️⃣ 1 - 25 chats (Perfil Emprendedor / Micro) 🐣\n2️⃣ 25 - 50 chats (Empresa en Crecimiento) 📈\n3️⃣ 51 o más chats (Nivel Corporativo / Alto Flujo) 🏢";
                    await sendMessage(phone_number_id, from, welcomeText);

                    // Wait a bit for natural pacing
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    // Send Segmentation Buttons
                    await sendSegmentationButtons(phone_number_id, from);
                } catch (error) {
                    console.error('Error sending welcome flow:', error);
                }
            }
            return res.status(200).send('EVENT_RECEIVED');
        } else {
            return res.status(404).send('Not Found');
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

// Helper to send text messages
async function sendMessage(phoneNumberId, to, text) {
    const token = process.env.WHATSAPP_API_TOKEN || 'EAAL9iuGZC5pwBQc3QrfiZCEAb0EkAT5OOJW2OkoRWfMQXk1qZCGvFeGb77yrXnQAZC1w5UkIJ8GjoCbxYGBq6DIfGMoekKcrZCeZApp84RBsdQkYt4lCWLk3ZAXMoNZCWh29ssrcazoVCNGWZBBnWBLZCJLCffnZA86rbpIENjONOnrQzBzfCUqCgNZBFGwqrChPxOwvmz7TqHFsERh3cH8M5bptZBtZBx2oRXIr5Uq1tyY6IZB';

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
    }
}

// Helper to send Segmentation Buttons (Fixed)
async function sendSegmentationButtons(phoneNumberId, to) {
    const buttons = [
        { type: "reply", reply: { id: "btn_level_1", title: "1 - 25 chats 🐣" } },
        { type: "reply", reply: { id: "btn_level_2", title: "25 - 50 chats 📈" } },
        { type: "reply", reply: { id: "btn_level_3", title: "51+ chats 🏢" } }
    ];
    // Short body because the main text was sent before
    await sendCustomButtonMessage(phoneNumberId, to, "Selecciona tu volumen actual:", buttons);
}

// Generic Helper to send Button Messages
async function sendCustomButtonMessage(phoneNumberId, to, bodyText, buttons) {
    const token = process.env.WHATSAPP_API_TOKEN || 'EAAL9iuGZC5pwBQc3QrfiZCEAb0EkAT5OOJW2OkoRWfMQXk1qZCGvFeGb77yrXnQAZC1w5UkIJ8GjoCbxYGBq6DIfGMoekKcrZCeZApp84RBsdQkYt4lCWLk3ZAXMoNZCWh29ssrcazoVCNGWZBBnWBLZCJLCffnZA86rbpIENjONOnrQzBzfCUqCgNZBFGwqrChPxOwvmz7TqHFsERh3cH8M5bptZBtZBx2oRXIr5Uq1tyY6IZB';

    const messagePayload = {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        interactive: {
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
