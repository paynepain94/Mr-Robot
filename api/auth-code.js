export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Validación opcional interactiva (n8n header style) si se configura
    const internalAuthToken = process.env.INTERNAL_AUTH_TOKEN;
    if (internalAuthToken) {
        const authHeader = req.headers.authorization || '';
        const expected = `Bearer ${internalAuthToken}`;
        if (authHeader !== expected) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    try {
        const payload = req.body;
        console.log("Recibido Auth Code desde el Frontend:", JSON.stringify(payload, null, 2));

        const { client, code, error, received_at } = payload;
        
        let statusCode = "SUCCESS";
        let message = "Código recibido exitosamente";

        if (error || !code) {
            statusCode = "ERROR";
            message = error?.message || "No se ha proporcionado un Auth Code válido.";
        }

        const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7aar-5FgFpBcR8yUZJ49_zJEqDt55T8q2_az4rUEJtrETR_RIxOJdFFJ-gtrBHHsm/exec";

        // Registrar Auth Code
        await fetch(GAS_WEB_APP_URL, {
             method: 'POST', 
             headers: { 'Content-Type': 'text/plain;charset=utf-8' },
             body: JSON.stringify({ 
                 action: "logAuthCode", 
                 client: client || "desconocido",
                 status: statusCode,
                 auth_code: code,
                 error: message,
                 received_at: received_at
             })
        }).catch(err => console.error("Error enviando log de AuthCode a GAS:", err));

        // En un caso real a futuro, tú podrías decidir tomar ese "code" y mandárselo a la Graph API de Meta
        // para canjearlo por un System User Access Token permanente aquí mismo en Vercel.

        return res.status(200).json({ ok: true, status: statusCode });

    } catch (err) {
        console.error("Error procesando /api/auth-code:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
