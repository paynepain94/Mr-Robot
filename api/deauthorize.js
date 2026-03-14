const crypto = require('crypto');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Decode signed request
        const signed_request = req.body.signed_request || req.query.signed_request;
        if (!signed_request) {
            return res.status(400).json({ error: 'Missing signed_request' });
        }

        const [encoded_sig, payload] = signed_request.split('.');
        const secret = process.env.APP_SECRET || ''; 

        let isValid = false;
        let data = {};

        try {
            // Decodificar Base64Url
            const sig = Buffer.from(encoded_sig.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('hex');
            data = JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));

            // Verificar firma solo si tenemos el APP_SECRET configurado en las variables de entorno de Vercel
            if (secret) {
                const expected_sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
                if (sig === expected_sig) {
                    isValid = true;
                }
            } else {
                // Si no hay TOKEN en el proyecto, asumiremos false/fallido pero igual guardamos el reporte.
                console.warn("APP_SECRET no encontrado, no se puede verificar firma.");
            }
        } catch (e) {
             console.error('Error decoding signed_request:', e);
        }

        const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7aar-5FgFpBcR8yUZJ49_zJEqDt55T8q2_az4rUEJtrETR_RIxOJdFFJ-gtrBHHsm/exec";

        // Registrar en Google Apps Script
        await fetch(GAS_WEB_APP_URL, {
             method: 'POST', 
             headers: { 'Content-Type': 'text/plain;charset=utf-8' },
             body: JSON.stringify({ 
                 action: "logDeauthorize", 
                 user_id: data.user_id, 
                 issued_at: data.issued_at,
                 isValid: isValid
             })
        }).catch(err => console.error("Error enviando log a GAS:", err));

        // Por lo general, Facebook espera un status code 200 y confirmacion.
        res.status(200).json({ status: "ok" });
    } catch (err) {
        console.error("Error in deauthorize:", err);
        res.status(500).json({ error: 'Internal error' });
    }
}
