
const ACCESS_TOKEN = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';
const PHONE_NUMBER_ID = '1062960976899570';
const RECIPIENT_NUMBER = '5213317106005';

async function sendTemplateMessage() {
    const url = `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`;

    const payload = {
        messaging_product: "whatsapp",
        to: RECIPIENT_NUMBER,
        type: "template",
        template: {
            name: "hello_world",
            language: {
                code: "en_US"
            }
        }
    };

    try {
        console.log(`Enviando mensaje plantilla 'hello_world' a ${+5213317106005}...`);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ ¡Mensaje enviado exitosamente!");
            console.log("Respuesta de Meta:", JSON.stringify(data, null, 2));
        } else {
            console.error("❌ Error al enviar el mensaje:");
            console.error(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("❌ Error de conexión/ejecución:", error.message);
    }
}

sendTemplateMessage();
