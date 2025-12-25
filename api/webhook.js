export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Webhook Verification
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        // SECURITY: Use an environment variable for the verify token
        const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

        console.log('--- NEW VERIFICATION REQUEST ---');
        console.log('Query Params:', JSON.stringify(req.query));
        console.log('Expected Token (Env Var):', VERIFY_TOKEN ? `'${VERIFY_TOKEN}'` : 'UNDEFINED/NULL');
        console.log('Received Token:', token ? `'${token}'` : 'UNDEFINED/NULL');
        console.log('Match?', token === VERIFY_TOKEN);

        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('WEBHOOK_VERIFIED success');
                return res.status(200).send(challenge);
            } else {
                console.log('VERIFICATION FAILED: Token mismatch');
                return res.status(403).json({ error: 'Verification failed' });
            }
        } else {
            return res.status(400).json({ error: 'Missing parameters' });
        }
    }

    if (req.method === 'POST') {
        // Message Handling
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
                const from = body.entry[0].changes[0].value.messages[0].from; // sender phone number
                const msg_body = body.entry[0].changes[0].value.messages[0].text.body; // message text

                console.log(`Message from ${from}: ${msg_body}`);

                // Simple Echo/Auto-response logic
                try {
                    await sendMessage(phone_number_id, from, `Hola! Soy Mr. Robot. Recibí tu mensaje: "${msg_body}"`);
                } catch (error) {
                    console.error('Error sending message:', error);
                    // Don't fail the webhook response, just log the error
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
    const token = process.env.WHATSAPP_API_TOKEN;

    // Note: Using native fetch (available in Node 18+)
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
