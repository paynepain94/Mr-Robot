import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, errorMessage: 'Method Not Allowed' });
    }

    // (Opcional) Protege el endpoint para que solo n8n lo use
    const internalAuthToken = process.env.INTERNAL_AUTH_TOKEN;
    if (internalAuthToken) {
        const authHeader = req.headers.authorization || '';
        const expected = `Bearer ${internalAuthToken}`;
        if (authHeader !== expected) {
            return res.status(401).json({ ok: false, errorMessage: 'Unauthorized' });
        }
    }

    const { signed_request } = req.body;
    if (!signed_request || typeof signed_request !== 'string') {
        return res.status(400).json({ ok: false, errorMessage: 'Missing signed_request' });
    }

    const parts = signed_request.split('.');
    if (parts.length !== 2) {
        return res.status(400).json({ ok: false, errorMessage: 'Invalid signed_request format' });
    }

    const [encodedSig, encodedPayload] = parts;

    // Decodificar Base64Url -> Parsear JSON
    let payload;
    try {
        const payloadBuffer = Buffer.from(encodedPayload.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
        payload = JSON.parse(payloadBuffer.toString('utf8'));
    } catch (err) {
        return res.status(400).json({ ok: false, errorMessage: 'Payload is not valid JSON' });
    }

    // Usar META_APP_SECRET o APP_SECRET
    const appSecret = process.env.META_APP_SECRET || process.env.APP_SECRET;
    if (!appSecret) {
        return res.status(500).json({ ok: false, errorMessage: 'Server missing META_APP_SECRET' });
    }

    let is_valid_signature = false;
    try {
        // Generar expectedSig utilizando la string `encodedPayload` cruda
        const sigBuffer = Buffer.from(encodedSig.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
        const expectedSigBuffer = crypto.createHmac('sha256', appSecret).update(encodedPayload).digest();

        // timingSafeEqual para la protección timing attack
        if (sigBuffer.length === expectedSigBuffer.length && crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) {
            is_valid_signature = true;
        }
    } catch (err) {
        console.error('Error verifying signature:', err);
    }

    return res.status(200).json({
        ok: true,
        is_valid_signature,
        algorithm: payload?.algorithm ?? null,
        issued_at: payload?.issued_at ?? null,
        user_id: payload?.user_id ?? null,
        decoded_payload: payload,
    });
}
