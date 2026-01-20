export default async function handler(req, res) {
    if (req.method === 'GET') {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        // Use hardcoded token as requested/debugged
        const VERIFY_TOKEN = 'mr_robot_secret_8909789';

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
                let responseText = '';
                const ADMIN_NUMBER = '523317106005';

                // START PHRASE DETECTION
                // Matches "¡Hola! Me interesa saber mas de Mr-Robot" or slight variations
                if (msg_body.includes('interesa saber mas de mr-robot')) {

                    // 1. Send Greeting
                    await sendMessage(phone_number_id, from, "¡Hola! Gracias por escribirnos desde la web. ⚡");

                    // 2. Wait 5 seconds (Serverless caution: this might time out on some platforms, but per request we do it)
                    await new Promise(resolve => setTimeout(resolve, 5000));

                    // 3. Send Interactive Button Message (Max 3 buttons)
                    await sendButtonMessage(phone_number_id, from);

                    return res.status(200).send('EVENT_RECEIVED');
                }

                // HANDLE OPTIONS (Button ID or Text)
                if (msg_body === 'btn_low' || msg_body.includes('menos de 30')) {
                    responseText = "Perfecto. Para un volumen bajo, te recomendamos nuestro plan *Starter*. Es ideal para empezar a automatizar sin complicaciones.";
                } else if (msg_body === 'btn_high' || msg_body.includes('más de 100')) {
                    responseText = "¡Excelente! Para altos volúmenes necesitamos una solución robusta. Te sugerimos el plan *Enterprise* con soporte dedicado.";
                } else if (msg_body === 'btn_calendar' || msg_body.includes('agendar')) {
                    responseText = "Genial. Aquí tienes el enlace para agendar tu sesión técnica: https://calendar.google.com/calendar/u/0/r";
                } else {
                    // Fallback / Standard menu logic could go here
                    // For now, if it's not the start phrase or an option, we do nothing or generic reply
                    // process.env.WHATSAPP_API_TOKEN would control this
                }

                if (responseText) {
                    try {
                        await sendMessage(phone_number_id, from, responseText);
                    } catch (error) {
                        console.error('Error sending message:', error);
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

// Helper to send text messages
async function sendMessage(phoneNumberId, to, text) {
    const token = 'EAAL9iuGZC5pwBQc3QrfiZCEAb0EkAT5OOJW2OkoRWfMQXk1qZCGvFeGb77yrXnQAZC1w5UkIJ8GjoCbxYGBq6DIfGMoekKcrZCeZApp84RBsdQkYt4lCWLk3ZAXMoNZCWh29ssrcazoVCNGWZBBnWBLZCJLCffnZA86rbpIENjONOnrQzBzfCUqCgNZBFGwqrChPxOwvmz7TqHFsERh3cH8M5bptZBtZBx2oRXIr5Uq1tyY6IZB';

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

// Helper to send Interactive Button Messages
async function sendButtonMessage(phoneNumberId, to) {
    const token = 'EAAL9iuGZC5pwBQc3QrfiZCEAb0EkAT5OOJW2OkoRWfMQXk1qZCGvFeGb77yrXnQAZC1w5UkIJ8GjoCbxYGBq6DIfGMoekKcrZCeZApp84RBsdQkYt4lCWLk3ZAXMoNZCWh29ssrcazoVCNGWZBBnWBLZCJLCffnZA86rbpIENjONOnrQzBzfCUqCgNZBFGwqrChPxOwvmz7TqHFsERh3cH8M5bptZBtZBx2oRXIr5Uq1tyY6IZB';

    const messagePayload = {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        interactive: {
            type: "button",
            body: {
                text: "Para darte una propuesta de automatización a tu medida, cuéntanos ¿cuál es tu volumen aproximado de mensajes diarios?"
            },
            action: {
                buttons: [
                    {
                        type: "reply",
                        reply: {
                            id: "btn_low",
                            title: "🟢 Bajo (<30)"
                        }
                    },
                    {
                        type: "reply",
                        reply: {
                            id: "btn_high",
                            title: "🔴 Alto (>100)"
                        }
                    },
                    {
                        type: "reply",
                        reply: {
                            id: "btn_calendar",
                            title: "🗓️ Agendar"
                        }
                    }
                ]
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
