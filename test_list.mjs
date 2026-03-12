
const token = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';
const phoneNumberId = '1062960976899570';
const to = '523121128434'; // Or whatever phone he has

const messagePayload = {
    messaging_product: "whatsapp",
    to: to,
    type: "interactive",
    interactive: {
        type: "list",
        body: { text: "Por favor, selecciona qué servicio deseas agendar:" },
        action: {
            button: "Ver servicios",
            sections: [{
                title: "Catálogo de Servicios",
                rows: [
                    { id: "btn_srv_corte", title: "Corte de cabello", description: "40 min | $230" },
                    { id: "btn_srv_ninos", title: "Corte niños (1-10 años)", description: "40 min | $190" },
                    { id: "btn_srv_barba", title: "Afeitado de barba", description: "30 min | $230" },
                    { id: "btn_srv_combo", title: "Corte y Barba", description: "1 hr | $390" },
                    { id: "btn_srv_recortes", title: "Recortes", description: "20 min | $150" },
                    { id: "btn_srv_mascarilla", title: "Mascarilla y exfoliación", description: "30 min | $200" }
                ]
            }]
        }
    }
};

fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
}).then(res => res.json()).then(console.log).catch(console.error);
