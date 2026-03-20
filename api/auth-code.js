export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Validación opcional interactiva
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
        let accessToken = null; // Traducido de n8n: Guardará el token real

        if (error || !code) {
            statusCode = "ERROR";
            message = error?.message || "No se ha proporcionado un Auth Code válido.";
        } else {
            // N8N Translation: Nodo "Intercambiar Token"
            // Petición a la Graph API de Meta para canjear el 'code' por 'access_token'
            const fbAppId = process.env.FB_APP_ID || process.env.VITE_FB_APP_ID;     // "client_id" equivale a "tu_app_id" en n8n
            const fbAppSecret = process.env.FB_APP_SECRET || process.env.APP_SECRET; // credential App Secret en n8n
            
            if (fbAppId && fbAppSecret) {
                try {
                    const tokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${fbAppId}&client_secret=${fbAppSecret}&code=${code}`;
                    const tokenRes = await fetch(tokenUrl);
                    const tokenData = await tokenRes.json();
                    
                    if (tokenData.access_token) {
                        accessToken = tokenData.access_token;
                        console.log("Token de acceso obtenido correctamente (Traducción n8n).");
                        
                        // NOTA: n8n espera 10 seg y actualiza la tabla aquí.
                        // En Vercel enviamos el token a Google Sheets directamente,
                        // donde se guardará referenciado bajo el mismo "client".
                    } else {
                        console.error("Error al intercambiar el token:", tokenData);
                        message = "Error intercambiando el token con Facebook.";
                        statusCode = "TOKEN_ERROR";
                    }
                } catch (e) {
                    console.error("Excepción al intercambiar token:", e);
                    message = "Excepción al intercambiar token.";
                    statusCode = "TOKEN_ERROR";
                }
            } else {
                console.warn("FB_APP_ID o FB_APP_SECRET no están en las variables de entorno (.env). Saltando intercambio.");
            }
        }

        const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7aar-5FgFpBcR8yUZJ49_zJEqDt55T8q2_az4rUEJtrETR_RIxOJdFFJ-gtrBHHsm/exec";

        // Registrar Auth Code y Token en GAS
        await fetch(GAS_WEB_APP_URL, {
             method: 'POST', 
             headers: { 'Content-Type': 'text/plain;charset=utf-8' },
             body: JSON.stringify({ 
                 action: "logAuthCode", 
                 client: client || "desconocido",
                 status: statusCode,
                 auth_code: code,
                 access_token: accessToken, // <-- Equivalente a crear/guardar la credencial de n8n
                 error: message,
                 received_at: received_at
             })
        }).catch(err => console.error("Error enviando log de AuthCode a GAS:", err));

        return res.status(200).json({ ok: true, status: statusCode });

    } catch (err) {
        console.error("Error procesando /api/auth-code:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
