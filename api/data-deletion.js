import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Decode signed request
        const signed_request = req.body?.signed_request || req.query?.signed_request || '';
        if (!signed_request) {
            return res.status(400).json({ error: 'Missing signed_request' });
        }

        const [encoded_sig, payload] = signed_request.split('.');
        const secret = process.env.APP_SECRET || ''; 

        let isValid = false;
        let data = {};

        try {
            // Decodificar Base64Url
            if (encoded_sig && payload) {
                const sigBuffer = Buffer.from(encoded_sig.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
                data = JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));

                // Verificar firma solo si tenemos el APP_SECRET configurado
                if (secret) {
                    const expectedSigBuffer = crypto.createHmac('sha256', secret).update(payload).digest();
                    
                    // Verificación segura contra ataques de tiempo (Timing Safe)
                    if (sigBuffer.length === expectedSigBuffer.length && crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) {
                        isValid = true;
                    }
                } else {
                    console.warn("APP_SECRET no encontrado, no se puede verificar firma.");
                }
            }
        } catch (e) {
             console.error('Error decoding signed_request:', e);
        }

        const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7aar-5FgFpBcR8yUZJ49_zJEqDt55T8q2_az4rUEJtrETR_RIxOJdFFJ-gtrBHHsm/exec";
        
        const timestamp = Date.now();
        const userId = data.user_id || "unknown";
        const confirmationCode = `REQ-${userId}-${timestamp}`;

        // Registrar en Google Apps Script
        await fetch(GAS_WEB_APP_URL, {
             method: 'POST', 
             headers: { 'Content-Type': 'text/plain;charset=utf-8' },
             body: JSON.stringify({ 
                 action: "logDataDeletion", 
                 user_id: data.user_id, 
                 issued_at: data.issued_at,
                 isValid: isValid,
                 code: confirmationCode
             })
        }).catch(err => console.error("Error enviando log a GAS:", err));

        // 3. Devolver la respuesta a Meta en el formato que exigen
        return res.status(200).json({ 
            url: `https://senior-robot.com/eliminacion-datos?id=${confirmationCode}`,
            confirmation_code: confirmationCode,
            status: "success"
        });

    } catch (err) {
        console.error("Error in data deletion:", err);
        return res.status(500).json({ error: 'Internal error' });
    }
}
