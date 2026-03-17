export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Validación opcional de seguridad interno (si lo configuraste en Vercel)
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
        console.log("Recibido evento de Onboarding desde el Frontend:", JSON.stringify(payload, null, 2));

        const { client, embedded_event, received_at } = payload;
        
        // Verifica si el flujo terminó correctamente
        const isSuccess = embedded_event?.event !== 'CANCEL';
        
        let phoneNumberId = null;
        let wabaId = null;
        let businessId = null;
        let errorMessage = null;

        if (isSuccess && embedded_event?.data) {
            phoneNumberId = embedded_event.data.phone_number_id;
            wabaId = embedded_event.data.waba_id;
            businessId = embedded_event.data.business_id;
        } else {
            errorMessage = embedded_event?.data?.error_message || "Proceso cancelado o incompleto.";
        }

        const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7aar-5FgFpBcR8yUZJ49_zJEqDt55T8q2_az4rUEJtrETR_RIxOJdFFJ-gtrBHHsm/exec";

        // Registrar este nuevo negocio en Google Sheets de manera asíncrona
        await fetch(GAS_WEB_APP_URL, {
             method: 'POST', 
             headers: { 'Content-Type': 'text/plain;charset=utf-8' },
             body: JSON.stringify({ 
                 action: "logOnboarding", 
                 client: client || "desconocido",
                 status: isSuccess ? "SUCCESS" : "CANCELLED",
                 phone_number_id: phoneNumberId,
                 waba_id: wabaId,
                 business_id: businessId,
                 error: errorMessage,
                 received_at: received_at
             })
        }).catch(err => console.error("Error enviando log de Onboarding a GAS:", err));

        // Responde con un 200 directo al componente Frontend
        return res.status(200).json({ ok: true, status: isSuccess ? 'registrado' : 'cancelado' });

    } catch (err) {
        console.error("Error procesando /api/onboarding:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
