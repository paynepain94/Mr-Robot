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
                const from = body.entry[0].changes[0].value.messages[0].from;
                const msg_body = body.entry[0].changes[0].value.messages[0].text.body.toLowerCase(); // Normalized

                console.log(`Message from ${from}: ${msg_body}`);

                // KEYWORD LOGIC
                let responseText = '';
                const ADMIN_NUMBER = '523317106005'; // Tu número para alertas

                // Helper to check business hours (Mon-Fri, 9am-6pm Mexico City time)
                const isBusinessHours = () => {
                    const now = new Date();
                    const options = { timeZone: 'America/Mexico_City', hour12: false, weekday: 'numeric', hour: 'numeric' };
                    // formatter returns something like "1, 10" (Monday, 10am) depending on locale, but let's parse parts properly
                    const parts = new Intl.DateTimeFormat('en-US', {
                        timeZone: 'America/Mexico_City',
                        weekday: 'numeric', // 1 (Mon) - 7 (Sun)
                        hour: 'numeric',    // 0-23
                        hour12: false
                    }).formatToParts(now);

                    const weekday = parseInt(parts.find(p => p.type === 'weekday').value); // Monday is 1? No, logic varies.
                    // Wait, 'weekday: numeric' in en-US might return differently. Let's use standard Date objects converted to TZ.
                    // Safer approach:
                    const mexicoDate = new Date(now.toLocaleString("en-US", { timeZone: "America/Mexico_City" }));
                    const day = mexicoDate.getDay(); // 0 (Sun) - 6 (Sat)
                    const hour = mexicoDate.getHours();

                    // Condition: Mon(1) to Fri(5) AND 9 <= hour < 18
                    return (day >= 1 && day <= 5) && (hour >= 9 && hour < 18);
                };

                const menuText = `👋 Hola! Soy el asistente virtual de Mr. Robot.\n\nEscribe una opción:\n1️⃣ *Servicios*\n2️⃣ *Precios*\n3️⃣ *Contacto*\n4️⃣ *Hablar con Humano*`;

                if (msg_body.includes('servicios') || msg_body.includes('1')) {
                    responseText = "🚀 *Nuestros Servicios:*\n- Desarrollo Web\n- Chatbots con IA\n- Automatización de Procesos";
                } else if (msg_body.includes('precios') || msg_body.includes('2')) {
                    responseText = "💰 *Planes:*\n- Básico: $XXXX\n- Pro: $XXXX\n- Enterprise: Cotizar";
                } else if (msg_body.includes('contacto') || msg_body.includes('3')) {
                    responseText = "📞 *Contáctanos:*\nWhatsapp: +52 33 1710 6005\nCorreo: contacto@mr-robot.mx";
                } else if (msg_body.includes('humano') || msg_body.includes('4')) {
                    if (isBusinessHours()) {
                        responseText = "Un agente se pondrá en contacto contigo en breve.";
                        // Send Alert to Admin
                        try {
                            await sendMessage(phone_number_id, ADMIN_NUMBER, `⚠️ ALERTA MR-ROBOT: El cliente ${from} solicita atención humana.`);
                        } catch (e) {
                            console.error('Failed to send admin alert', e);
                        }
                    } else {
                        responseText = "Nuestro horario de atención humana es de Lunes a Viernes de 9am a 6pm. Por ahora, puedo ayudarte con las opciones automáticas.\n\n" + menuText;
                    }
                } else {
                    // CATCH-ALL / ERROR CASE
                    responseText = "❌ Opción no válida. Por favor, selecciona una de las opciones del menú.\n\n" + menuText;
                }

                try {
                    await sendMessage(phone_number_id, from, responseText);
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            }
            return res.status(200).send('EVENT_RECEIVED');
        } else {
            return res.status(404).send('Not Found');
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

// Helper function to send messages via WhatsApp Graph API
async function sendMessage(phoneNumberId, to, text) {
    // TEMPORARY FIX: Hardcode your token here because Vercel Env Vars are not loading
    // PASTE YOUR LONG TOKEN INSIDE THE QUOTES BELOW:
    const token = 'EAAL9iuGZC5pwBQc3QrfiZCEAb0EkAT5OOJW2OkoRWfMQXk1qZCGvFeGb77yrXnQAZC1w5UkIJ8GjoCbxYGBq6DIfGMoekKcrZCeZApp84RBsdQkYt4lCWLk3ZAXMoNZCWh29ssrcazoVCNGWZBBnWBLZCJLCffnZA86rbpIENjONOnrQzBzfCUqCgNZBFGwqrChPxOwvmz7TqHFsERh3cH8M5bptZBtZBx2oRXIr5Uq1tyY6IZB';
    // const token = process.env.WHATSAPP_API_TOKEN; // (Commented out until Vercel is fixed)

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
        throw new Error(`WhatsApp API Error: ${JSON.stringify(errorData)}`);
    }
}
