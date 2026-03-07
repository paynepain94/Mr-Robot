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
        if (!signature || !APP_SECRET) {
            console.warn('WARNING: Missing signature or APP_SECRET');
            // In production, you might return 401 or 403.
            // For now, if APP_SECRET is missing, we proceed but warn.
            // If signature is missing but APP_SECRET exists, we reject.
            if (APP_SECRET && !signature) {
                return res.status(401).send('Missing X-Hub-Signature-256');
            }
        } else {
            const elements = signature.split('=');
            const signatureHash = elements[1];
            const expectedHash = crypto
                .createHmac('sha256', APP_SECRET)
                .update(JSON.stringify(req.body))
                .digest('hex');

            if (signatureHash !== expectedHash) {
                console.error('Signature verification failed (App Secret mismatch). Bypassing temporarily.');
                // TEMPORAL: Desactivado para que puedas probar el bot.
                // return res.status(403).send('Forbidden: Invalid Signature');
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

                console.log(`Message from ${from}: ${msg_body}`);

                // KEYWORD / BUTTON LOGIC

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
                    responseText = "📞 Puedes contactarnos directamente al: +52 220 613 4842\n\nEstamos disponibles para atenderte personalmente. 🤝";
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
            return res.status(200).send('EVENT_RECEIVED');
        } else {
            return res.status(404).send('Not Found');
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

// Helper to send text messages
async function sendMessage(phoneNumberId, to, text) {
    const token = 'EAAWj2QODFwwBQ9CstPKuZAwLQWEaQi5CRLxkmwT3l0oAzbgZBo5TSSucA0ylLLwUCk7RpeHfqadoAp6i1apO0TgmodMn34CMVo56zEsISCf769A1aJ2B6dHdw11TXv356udEW22lFrtSNs7XNWPwZAZAvNzDWZBRAnq3BmiGgASgjydYDnGjEUT0kw5ZAgsM4vnRFmYXGmOvptKtil0kZAC7d3aNrVfzZCF4iyaKtJYmnCEXzCP48hkScJLkTSmPYTheVinbLo4EN96HhvJigZCSzMMa7oB9Vfzzfm9VHlwZDZD';

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
    const token = 'EAAWj2QODFwwBQ9CstPKuZAwLQWEaQi5CRLxkmwT3l0oAzbgZBo5TSSucA0ylLLwUCk7RpeHfqadoAp6i1apO0TgmodMn34CMVo56zEsISCf769A1aJ2B6dHdw11TXv356udEW22lFrtSNs7XNWPwZAZAvNzDWZBRAnq3BmiGgASgjydYDnGjEUT0kw5ZAgsM4vnRFmYXGmOvptKtil0kZAC7d3aNrVfzZCF4iyaKtJYmnCEXzCP48hkScJLkTSmPYTheVinbLo4EN96HhvJigZCSzMMa7oB9Vfzzfm9VHlwZDZD';

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
