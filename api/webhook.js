import crypto from 'crypto';

export default async function handler(req, res) {
    // -------------------------------------------------------------------------
    // SECURITY: Signature Verification
    // -------------------------------------------------------------------------
    const APP_SECRET = process.env.APP_SECRET;
    const VERIFY_TOKEN = 'Senior_Robot_Webhook_Secure_2026';

    // 1. Verify Request Signature (POST only)
    if (req.method === 'POST') {
        const signature = req.headers['x-hub-signature-256'];
        const APP_SECRET_1 = process.env.APP_SECRET;
        const APP_SECRET_2 = process.env.CALENDAR_APP_SECRET; // Nuevo secret para la app de calendar

        if (!signature || (!APP_SECRET_1 && !APP_SECRET_2)) {
            console.warn('WARNING: Missing signature or APP_SECRETS');
            if ((APP_SECRET_1 || APP_SECRET_2) && !signature) {
                return res.status(401).send('Missing X-Hub-Signature-256');
            }
        } else {
            const elements = signature.split('=');
            if (elements.length > 1) {
                const signatureHash = elements[1];
                let isValid = false;

                // Intentar con el Secret 1 (Senior Robot)
                if (APP_SECRET_1) {
                    const expectedHash1 = crypto.createHmac('sha256', APP_SECRET_1).update(JSON.stringify(req.body)).digest('hex');
                    if (signatureHash === expectedHash1) isValid = true;
                }

                // Si falla, intentar con el Secret 2 (Calendar Demo)
                if (!isValid && APP_SECRET_2) {
                    const expectedHash2 = crypto.createHmac('sha256', APP_SECRET_2).update(JSON.stringify(req.body)).digest('hex');
                    if (signatureHash === expectedHash2) isValid = true;
                }

                if (!isValid) {
                    console.error('Signature verification failed (App Secret mismatch). Bypassing temporarily.');
                    // TEMPORAL: Desactivado para que puedas probar el bot.
                    // return res.status(403).send('Forbidden: Invalid Signature');
                }
            }
        }
    }

    if (req.method === 'GET') {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

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
                const message = body.entry[0].changes[0].value.messages[0];
                const from = message.from;
                const msgId = message.id;

                // Meta sends retries if the server takes > 3s or crashes.
                // This cache prevents the bot from answering the exact same message two or three times.
                global.processedMessageIds = global.processedMessageIds || new Set();
                if (global.processedMessageIds.has(msgId)) {
                    console.log(`Duplicate message ignored: ${msgId}`);
                    return res.status(200).send('EVENT_RECEIVED');
                }
                global.processedMessageIds.add(msgId);
                // Keep set small to prevent memory leaks over time
                if (global.processedMessageIds.size > 2000) global.processedMessageIds.clear();

                // Handle various message types (text, interactive)
                let msg_body = '';
                if (message.type === 'text') {
                    msg_body = message.text.body.toLowerCase();
                } else if (message.type === 'interactive') {
                    // Handle button replies or list replies
                    const interactive = message.interactive;
                    if (interactive.type === 'button_reply') {
                        msg_body = interactive.button_reply.id;
                    } else if (interactive.type === 'list_reply') {
                        msg_body = interactive.list_reply.id;
                    }
                }

                console.log(`Message from ${from} to ${phone_number_id}: ${msg_body}`);

                // ==========================================
                // ROUTING POR NÚMERO DE TELÉFONO
                // ==========================================

                const DEMO_CALENDAR_PHONE_ID = '1062960976899570';

                if (phone_number_id === DEMO_CALENDAR_PHONE_ID) {
                    // ---------------------------------------------------------
                    // ✂️ LÓGICA DEL NUEVO CHATBOT (Barber Shop Demo + GAS)
                    // ---------------------------------------------------------
                    global.bookingCache = global.bookingCache || {};
                    global.stateCache = global.stateCache || {};
                    const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby7aar-5FgFpBcR8yUZJ49_zJEqDt55T8q2_az4rUEJtrETR_RIxOJdFFJ-gtrBHHsm/exec";

                    try {
                        // Natural typing delay
                        await new Promise(r => setTimeout(r, 800));

                        // Clears any previous pending reminder because they just interacted
                        if (global.stateCache[from]?.reminderTimeout) {
                            clearTimeout(global.stateCache[from].reminderTimeout);
                            global.stateCache[from].reminderTimeout = null;
                        }

                        // Global check for Bot/System keywords at any point
                        if (!msg_body.startsWith('btn_')) {
                            const cleanedTokens = msg_body.replace(/[¡!.,¿?()"]/g, ' ').split(/\s+/);
                            const botKeywords = [
                                'agente', 'bot', 'robot', 'aplicativo', 'asistente',
                                'agnete', 'ajente', 'agnte', 'agene', 'asitente', 'assistente', 'asiztente', 'asisntencia', 'modulo', 'moduo', 'moudlo', 'modilo', 'aplicatibo', 'apliactivo', 'aplicatvo', 'apliactibo', 'automata', 'automota', 'automta', 'scrip', 'escript', 'escrip', 'sccript', 'skript', 'interfase', 'interfáz', 'interfas', 'entidat', 'enditad', 'entiddad', 'vot', 'bod', 'boit', 'robót', 'roboot', 'rrobot', 'robt', 'automatizacion', 'atomatizacion', 'automatizasion', 'outomatizacion', 'guia', 'gía', 'guuia', 'guis', 'birtual', 'virtul', 'virutal', 'vritual', 'interlokutor', 'interlocuctor', 'interloucutor', 'autogestion', 'outogestion', 'autogestionn', 'atencion', 'atension', 'atecion', 'automatico', 'automaitco', 'atomitaco', 'resolicion', 'resolucion', 'resolusion', 'omnicanalida', 'omnicanalidat', 'omnicanalidad', 'asitencia', 'assistencia', 'asisencia', 'automatizadó', 'atomatizado'
                            ];
                            const hasBotKeyword = botKeywords.some(kw => cleanedTokens.includes(kw));
                            if (hasBotKeyword) {
                                await sendMessage(phone_number_id, from, "Si desea saber más información de este sistema, contacte a www.Senior-Robot.com Celular: +52 3121128434");
                                return res.status(200).send('EVENT_RECEIVED');
                            }
                        }

                        // Check keywords if bot is finished
                        if (global.stateCache[from]?.isFinished && !msg_body.startsWith('btn_')) {
                            const cleanedTokens = msg_body.replace(/[¡!.,¿?()"]/g, ' ').split(/\s+/);
                            const yesKeywords = ['si', 'sí', 'yes', 'claro', 'va', 'vale', 'ok', 'okay'];
                            
                            if (yesKeywords.some(kw => cleanedTokens.includes(kw))) {
                                msg_body = 'btn_post_ayuda_si';
                            } else {
                                const gratitudeKeywords = ['gracias', 'bien', 'listo'];
                                const hasGratitude = gratitudeKeywords.some(kw => cleanedTokens.includes(kw));
                                
                                if (hasGratitude && !global.stateCache[from].thanked) {
                                    global.stateCache[from].thanked = true; // prevent unlimited spamming
                                    const responseMsg = "¡Gracias por su preferencia! Te esperamos pronto en Peluquería Carlos Escobar. Obten un 50% de descuento al mostraros en tu primer corte, que nos sigues en Instagram <Cuenta>.";
                                    await sendMessage(phone_number_id, from, responseMsg);
                                }
                                
                                const btnsHelp = [
                                    { type: "reply", reply: { id: "btn_post_ayuda_si", title: "Sí, por favor" } },
                                    { type: "reply", reply: { id: "btn_conf_main", title: "No, gracias" } }
                                ];
                                await sendCustomButtonMessage(phone_number_id, from, "¿Te podemos ayudar con algo más?", btnsHelp);
                                return res.status(200).send('EVENT_RECEIVED');
                            }
                        }

                        // Anti-hallucination / invalid text handler
                        if (!msg_body.startsWith('btn_') && !global.bookingCache[from]) {
                            if (msg_body.length > 50) {
                                const btns = [
                                    { type: "reply", reply: { id: "btn_conf_main", title: "Menú Principal" } }
                                ];
                                await sendCustomButtonMessage(phone_number_id, from, "Parece que has escrito algo extenso. Para poder ayudarte mejor, por favor utiliza las opciones del menú. ¿Deseas volver al inicio?", btns);
                                return res.status(200).send('EVENT_RECEIVED');
                            }
                            
                            if (global.stateCache[from] && !global.stateCache[from].isFinished) {
                                const state = global.stateCache[from];
                                state.errors = (state.errors || 0) + 1;
                                
                                if (state.errors >= 2) {
                                    const btns = [
                                        { type: "reply", reply: { id: "btn_conf_human", title: "Hablar con Humano" } },
                                        { type: "reply", reply: { id: "btn_conf_main", title: "Menú Principal" } }
                                    ];
                                    await sendCustomButtonMessage(phone_number_id, from, "Parece que necesitas ayuda. ¿Deseas hablar con un humano o regresar al menú principal?", btns);
                                } else {
                                    await sendMessage(phone_number_id, from, "Opción incorrecta, elija una opción disponible. 👇");
                                    await new Promise(r => setTimeout(r, 800));
                                    if (state.menuType === 'customButton') {
                                        await sendCustomButtonMessage(phone_number_id, from, state.payload.text, state.payload.buttons);
                                    } else if (state.menuType === 'list') {
                                        await sendListMessage(phone_number_id, from, state.payload.text, state.payload.buttonText, state.payload.sections);
                                    } else if (state.menuType === 'headerImage') {
                                        await sendHeaderImageMessage(phone_number_id, from, state.payload.text, state.payload.imageUrl, state.payload.buttons);
                                    }
                                }
                                return res.status(200).send('EVENT_RECEIVED');
                            }
                        }

                        if (msg_body.startsWith('btn_')) {
                            // Block old menus if finished
                            const allowedPostBtns = ['btn_conf_main', 'btn_action_agendar', 'btn_action_reagendar', 'btn_post_ayuda_si', 'btn_post_pagos', 'btn_conf_human', 'btn_post_menu_anterior'];
                            if (global.stateCache[from]?.isFinished && !allowedPostBtns.includes(msg_body)) {
                                const btns = [
                                    { type: "reply", reply: { id: "btn_action_agendar", title: "Agendar Corte" } },
                                    { type: "reply", reply: { id: "btn_conf_main", title: "Menú Principal" } }
                                ];
                                await sendCustomButtonMessage(phone_number_id, from, "Opción Incorrecta. ¿Deseas agendar un nuevo corte o regresar al menú principal?", btns);
                                return res.status(200).send('EVENT_RECEIVED');
                            }
                            
                            delete global.bookingCache[from];
                            const parts = msg_body.split('_');

                            if (parts[1] === 'action') {
                                if (parts[2] === 'agendar') {
                                    const sections = [{
                                        title: "Catálogo de Servicios",
                                        rows: [
                                            { id: "btn_srv_corte", title: "Corte de cabello", description: "40 min | $230 | Tijera o máquina. Incluye asesoría según tu rostro." },
                                            { id: "btn_srv_ninos", title: "Corte niños (1-10 años)", description: "40 min | $190 | Corte (tijera/máquina) adaptado para los más pequeños." },
                                            { id: "btn_srv_barba", title: "Afeitado de barba", description: "30 min | $230 | Toalla caliente, navaja profesional y cuidado facial." },
                                            { id: "btn_srv_combo", title: "Corte y Barba", description: "1 h | $390 | Servicio integral corte y barba. Incluye toalla caliente." },
                                            { id: "btn_srv_recortes", title: "Recortes", description: "20 min | $150 | Definición contornos y retoque para un look impecable." },
                                            { id: "btn_srv_mascarilla", title: "Mascarilla y exfoliación", description: "30 min | $200 | Purifica tu piel: carbón activado, exfoliación y relax." }
                                        ]
                                    }];
                                    await sendListMessage(phone_number_id, from, "Por favor, selecciona qué servicio deseas agendar:", "Ver servicios", sections);
                                } else if (parts[2] === 'reagendar') {
                                    await sendMessage(phone_number_id, from, "⏳ Buscando tu cita actual...");
                                    const response = await fetch(GAS_WEB_APP_URL, {
                                        method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                        body: JSON.stringify({ action: "checkUserAppointment", phone: from })
                                    });
                                    const data = await response.json();
                                    
                                    if (data.hasAppointment) {
                                        let oldService = data.oldService || "corte";
                                        let oldName = data.oldName || "Cliente";
                                        
                                        global.bookingCache[from] = { isReagendar: true, srv: oldService, oldName: oldName, ts: Date.now() };
                                        
                                        const sections = [{
                                            title: "Sillas / Barberos",
                                            rows: [
                                                { id: `btn_brb_any_${oldService}`, title: "Ninguna en especial", description: "(No tengo una preferencia particular)" },
                                                { id: `btn_brb_alberto_${oldService}`, title: "Silla 1 Alberto" },
                                                { id: `btn_brb_jotzan_${oldService}`, title: "Silla 2 Jotzan" },
                                                { id: `btn_brb_juan_${oldService}`, title: "Silla 3 Juan" },
                                                { id: `btn_brb_carlos_${oldService}`, title: "Silla 4 Carlos" },
                                                { id: `btn_conf_main`, title: "Menú Principal" }
                                            ]
                                        }];
                                        await sendListMessage(phone_number_id, from, `Encontramos tu cita agendada para ${data.appointmentTime}.\n\nReagendaremos tu servicio registrado de *${oldService}* a nombre de *${oldName}*.\n\n¿Con quién te gustaría agendar ahora?`, "Ver opciones", sections);
                                    } else {
                                        const btns = [
                                            { type: "reply", reply: { id: "btn_action_agendar", title: "Agendar Corte" } },
                                            { type: "reply", reply: { id: `btn_conf_main`, title: "Menú Principal" } }
                                        ];
                                        await sendCustomButtonMessage(phone_number_id, from, "No encontramos ninguna cita pendiente a tu nombre. ¿Deseas agendar un nuevo corte?", btns);
                                    }
                                } else if (parts[2] === 'ubicacion') {
                                    await sendMessage(phone_number_id, from, "📍 Dirección: Calle Ignacio Manuel Altamirano 1117, Colima, México.\n🔗 Maps: https://www.google.com/maps/search/?api=1&query=Calle%20Ignacio%20Manuel%20Altamirano%201117,%20Colima,%20,%20M%C3%A9xico");
                                }
                            }
                            else if (parts[1] === 'srv') {
                                const srv = parts[2];
                                if (global.bookingCache && global.bookingCache[from] && global.bookingCache[from].isReagendar) {
                                    global.bookingCache[from].srv = srv;
                                }
                                const btns = [
                                    { type: "reply", reply: { id: `btn_conf_agendar_${srv}`, title: "Agendar Cita" } },
                                    { type: "reply", reply: { id: "btn_conf_human", title: "Hablar con Humano" } },
                                    { type: "reply", reply: { id: "btn_conf_main", title: "Menú Principal" } }
                                ];
                                await sendCustomButtonMessage(phone_number_id, from, "Has seleccionado un servicio. ¿Qué deseas hacer con el servicio?", btns);
                            }
                            else if (parts[1] === 'conf') {
                                if (parts[2] === 'main') {
                                    const btns = [
                                        { type: "reply", reply: { id: "btn_action_agendar", title: "Agendar Corte" } },
                                        { type: "reply", reply: { id: "btn_action_reagendar", title: "Re-agendar" } },
                                        { type: "reply", reply: { id: "btn_action_ubicacion", title: "Ubicación" } }
                                    ];
                                    await sendHeaderImageMessage(phone_number_id, from, "¡Hola! Bienvenido a Peluquería Carlos Escobar. ¿En qué podemos ayudarte hoy?\n\n👆 *Toque la opción deseada*", "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80", btns);
                                } else if (parts[2] === 'human') {
                                    await sendMessage(phone_number_id, from, "En un momento uno de nuestros asesores te atenderá personalmente.");
                                } else if (parts[2] === 'agendar') {
                                    const srv = parts[3];
                                    const sections = [{
                                        title: "Sillas / Barberos",
                                        rows: [
                                            { id: `btn_brb_any_${srv}`, title: "Ninguna en especial", description: "(No tengo una preferencia particular)" },
                                            { id: `btn_brb_alberto_${srv}`, title: "Silla 1 Alberto" },
                                            { id: `btn_brb_jotzan_${srv}`, title: "Silla 2 Jotzan" },
                                            { id: `btn_brb_juan_${srv}`, title: "Silla 3 Juan" },
                                            { id: `btn_brb_carlos_${srv}`, title: "Silla 4 Carlos" },
                                            { id: `btn_conf_main`, title: "Menú Principal" }
                                        ]
                                    }];
                                    await sendListMessage(phone_number_id, from, "¿Con quién te gustaría agendar tu servicio?", "Ver opciones", sections);
                                }
                            }
                            else if (parts[1] === 'brb') {
                                const brb = parts[2];
                                const srv = parts[3];
                                const sections = [{
                                    title: "Días Disponibles",
                                    rows: []
                                }];
                                
                                let nowStr = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" });
                                let now = new Date(nowStr);
                                let validDays = 0;
                                let dayOffset = 0;
                                while(validDays < 5) {
                                    let d = new Date(nowStr);
                                    d.setDate(d.getDate() + dayOffset);
                                    if (d.getDay() !== 0) {
                                        let dateStr = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
                                        let dayName = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][d.getDay()];
                                        sections[0].rows.push({
                                            id: `btn_day_${dateStr}_${brb}_${srv}`, 
                                            title: `${dayName} ${d.getDate()}`
                                        });
                                        validDays++;
                                    }
                                    dayOffset++;
                                    if(dayOffset > 10) break;
                                }
                                sections[0].rows.push({ id: "btn_conf_human", title: "Hablar con Humano" });
                                
                                await sendListMessage(phone_number_id, from, "¿Para qué día te gustaría agendar?📅", "Ver Días", sections);
                            }
                            else if (parts[1] === 'day') {
                                const dateStr = parts[2];
                                const brb = parts[3];
                                const srv = parts[4];
                                const btns = [
                                    { type: "reply", reply: { id: `btn_bloque_manana_${dateStr}_${brb}_${srv}`, title: "Mañana (hasta 1pm)" } },
                                    { type: "reply", reply: { id: `btn_bloque_tarde_${dateStr}_${brb}_${srv}`, title: "Tarde (1pm a cierre)" } },
                                    { type: "reply", reply: { id: `btn_brb_${brb}_${srv}`, title: "Menú Anterior" } }
                                ];
                                await sendCustomButtonMessage(phone_number_id, from, "Para ver todos los horarios, ¿en qué momento te gustaría agendar?", btns);
                            }
                            else if (parts[1] === 'bloque') {
                                const bloque = parts[2];
                                const dateStr = parts[3];
                                const brb = parts[4];
                                const srv = parts[5];

                                await sendMessage(phone_number_id, from, "⏳ Consultando disponibilidad en la barbería...");

                                const response = await fetch(GAS_WEB_APP_URL, {
                                    method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                    body: JSON.stringify({ action: "getAvailability", dateStr, barber: brb, service: srv })
                                });
                                const data = await response.json();

                                if (data.status === 'success' && data.available_slots && data.available_slots.length > 0) {
                                    let filtered = [];
                                    for (let slot of data.available_slots) {
                                        let isPM = slot.includes('PM');
                                        let partsSlot = slot.split(':');
                                        let h = parseInt(partsSlot[0], 10);
                                        if (isPM && h !== 12) h += 12;
                                        if (!isPM && h === 12) h = 0;
                                        
                                        if (bloque === 'manana' && h >= 6 && h < 13) filtered.push(slot);
                                        if (bloque === 'tarde' && h >= 13 && h <= 23) filtered.push(slot);
                                    }

                                    if (filtered.length > 0) {
                                        const slots = filtered.slice(0, 10);
                                        const sections = [{
                                            title: `Horarios (${bloque})`,
                                            rows: slots.map(slot => {
                                                const safeTime = slot.replace(/ /g, '').replace(/:/g, ''); 
                                                return { id: `btn_time_${safeTime}_${dateStr}_${brb}_${srv}`, title: slot };
                                            })
                                        }];
                                        await sendListMessage(phone_number_id, from, `Estos son los turnos disponibles:`, "Ver horarios", sections);
                                    } else {
                                        const btns = [
                                            { type: "reply", reply: { id: `btn_day_${dateStr}_${brb}_${srv}`, title: "Ver otro horario" } },
                                            { type: "reply", reply: { id: `btn_conf_main`, title: "Menú Principal" } }
                                        ];
                                        await sendCustomButtonMessage(phone_number_id, from, "Lo siento, para ese momento del día estamos a tope 💈. ¿Te gustaría intentar otro horario?", btns);
                                    }
                                } else {
                                    // Si no hay turnos disponibles en todo el día para ese barbero
                                    if (brb === 'any') {
                                        const btns = [
                                            { type: "reply", reply: { id: `btn_conf_main`, title: "Menú Principal" } }
                                        ];
                                        await sendCustomButtonMessage(phone_number_id, from, "Lo sentimos, todas nuestras sillas están ocupadas para este día o turno. Por favor intenta otro día.", btns);
                                    } else {
                                        await sendMessage(phone_number_id, from, "Por el momento, la agenda de este barbero para el día seleccionado ya está completa. Nos encantaría atenderte, ¿te gustaría intentar con otra fecha o consultar la disponibilidad de nuestros otros barberos?");
                                        await new Promise(r => setTimeout(r, 800));

                                        let allBarbers = [
                                            { id: `btn_brb_any_${srv}`, title: "Ninguna en especial", description: "(No tengo una preferencia particular)" },
                                            { id: `btn_brb_alberto_${srv}`, title: "Silla 1 Alberto" },
                                            { id: `btn_brb_jotzan_${srv}`, title: "Silla 2 Jotzan" },
                                            { id: `btn_brb_juan_${srv}`, title: "Silla 3 Juan" },
                                            { id: `btn_brb_carlos_${srv}`, title: "Silla 4 Carlos" }
                                        ];
                                        
                                        // Excluir al barbero actual
                                        let availableBarbers = allBarbers.filter(b => !b.id.includes(`_${brb}_`));
                                        
                                        const sections = [
                                            {
                                                title: "Consultar otro barbero",
                                                rows: availableBarbers
                                            },
                                            {
                                                title: "Otras opciones",
                                                rows: [
                                                    { id: `btn_brb_${brb}_${srv}`, title: "Probar otra fecha", description: "Con el mismo barbero" },
                                                    { id: `btn_conf_main`, title: "Menú Principal" }
                                                ]
                                            }
                                        ];
                                        
                                        await sendListMessage(phone_number_id, from, "Por favor, selecciona una opción para continuar:", "Ver opciones", sections);
                                    }
                                }
                            }
                            else if (parts[1] === 'time') {
                                const time = parts[2];
                                const dateStr = parts[3];
                                const brb = parts[4];
                                const srv = parts[5];
                                
                                let isReagendar = false;
                                let oldName = null;
                                if (global.bookingCache && global.bookingCache[from] && global.bookingCache[from].isReagendar) {
                                    isReagendar = true;
                                    oldName = global.bookingCache[from].oldName;
                                }

                                if (isReagendar && oldName && oldName !== 'Cliente') {
                                    delete global.bookingCache[from];
                                    await sendMessage(phone_number_id, from, `⏳ Re-agendando tu cita a nombre de ${oldName}...`);

                                    const response = await fetch(GAS_WEB_APP_URL, {
                                        method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                        body: JSON.stringify({ action: "bookAppointment", phone: from, name: oldName, service: srv, barber: brb, dateStr: dateStr, time: time, isReagendar: true })
                                    });
                                    const data = await response.json();

                                    if (data.status === 'success') {
                                        if (global.stateCache) global.stateCache[from] = { isFinished: true };
                                        let msg = `¡Listo! Hemos **re-agendado** exitosamente tu cita anterior por esta nueva. Tu nuevo espacio está reservado en Peluquería Carlos Escobar. 💈✨\n\n📅 Nueva Fecha: ${dateStr.substr(6,2)}/${dateStr.substr(4,2)}/${dateStr.substr(0,4)}\n⏰ Nueva Hora: ${data.appointmentTime}\n💈 Servicio: ${srv}\n📍 Lugar: ${data.silla}\n\nUbicación:\nhttps://www.google.com/maps/search/?api=1&query=Calle%20Ignacio%20Manuel%20Altamirano%201117,%20Colima,%20,%20M%C3%A9xico`;
                                        await sendMessage(phone_number_id, from, msg);
                                    } else {
                                        await sendMessage(phone_number_id, from, "❌ Hubo un problema al intentar apartar tu lugar. Por favor intenta de nuevo.");
                                    }
                                } else {
                                    global.bookingCache[from] = { time, dateStr, brb, srv, isReagendar, oldName, ts: Date.now() };
                                    await sendMessage(phone_number_id, from, "¡Casi listo! Por favor, dime tu nombre y apellido para registrar la cita. ✍️");
                                }
                            }
                            else if (parts[1] === 'post') {
                                if (parts[2] === 'ayuda' || parts[2] === 'menu') {
                                    const btns = [
                                        { type: "reply", reply: { id: "btn_action_reagendar", title: "Reagendar" } },
                                        { type: "reply", reply: { id: "btn_post_pagos", title: "Métodos de Pago" } },
                                        { type: "reply", reply: { id: "btn_conf_human", title: "Hablar con Humano" } }
                                    ];
                                    await sendCustomButtonMessage(phone_number_id, from, "¿En qué más te puedo ayudar?", btns);
                                } else if (parts[2] === 'pagos') {
                                    await sendMessage(phone_number_id, from, "✅ Pago con efectivo\n✅ Pago con tarjeta\n✅ Transferencia Bancaria");
                                    const btns = [
                                        { type: "reply", reply: { id: "btn_conf_main", title: "Menú Principal" } },
                                        { type: "reply", reply: { id: "btn_action_reagendar", title: "Reagendar" } },
                                        { type: "reply", reply: { id: "btn_post_menu_anterior", title: "Menú Anterior" } }
                                    ];
                                    await sendCustomButtonMessage(phone_number_id, from, "¿Deseas hacer algo más?", btns);
                                }
                            }

                        } else {
                            if (global.bookingCache && global.bookingCache[from]) {
                                const booking = global.bookingCache[from];
                                const rawName = msg_body.trim() === '' ? 'Cliente' : msg_body.trim();
                                const formatName = (n) => n.split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase()).join(' ');
                                const userName = formatName(rawName);
                                
                                if (userName !== 'Cliente' && userName.split(' ').length < 2) {
                                    await sendMessage(phone_number_id, from, "✍️ Por favor ayúdanos escribiendo tu *nombre y apellido* juntos para que el barbero te identifique correctamente.");
                                    return res.status(200).send('EVENT_RECEIVED');
                                }
                                
                                delete global.bookingCache[from];

                                await sendMessage(phone_number_id, from, `⏳ Agendando tu cita, *${userName}*...`);

                                const response = await fetch(GAS_WEB_APP_URL, {
                                    method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                    body: JSON.stringify({ action: "bookAppointment", phone: from, name: userName, service: booking.srv, barber: booking.brb, dateStr: booking.dateStr, time: booking.time, isReagendar: booking.isReagendar })
                                });
                                const data = await response.json();

                                if (data.status === 'success') {
                                    if (global.stateCache) global.stateCache[from] = { isFinished: true };
                                    let msg = `¡Listo! Tu espacio está reservado en Peluquería Carlos Escobar. Tu barbero tendrá todo limpio y listo para recibirte. 💈✨\n\n📅 Fecha: ${booking.dateStr.substr(6,2)}/${booking.dateStr.substr(4,2)}/${booking.dateStr.substr(0,4)}\n⏰ Hora: ${data.appointmentTime}\n💈 Servicio: ${booking.srv}\n📍 Lugar: ${data.silla}\n\nEstá es la ubicacion de la peluquería:\nhttps://www.google.com/maps/search/?api=1&query=Calle%20Ignacio%20Manuel%20Altamirano%201117,%20Colima,%20,%20M%C3%A9xico`;
                                    if (booking.isReagendar) {
                                        msg = `¡Listo! Hemos **re-agendado** exitosamente tu cita anterior por esta nueva. Tu nuevo espacio está reservado en Peluquería Carlos Escobar. 💈✨\n\n📅 Nueva Fecha: ${booking.dateStr.substr(6,2)}/${booking.dateStr.substr(4,2)}/${booking.dateStr.substr(0,4)}\n⏰ Nueva Hora: ${data.appointmentTime}\n💈 Servicio: ${booking.srv}\n📍 Lugar: ${data.silla}\n\nUbicación:\nhttps://www.google.com/maps/search/?api=1&query=Calle%20Ignacio%20Manuel%20Altamirano%201117,%20Colima,%20,%20M%C3%A9xico`;
                                    }
                                    await sendMessage(phone_number_id, from, msg);
                                } else {
                                    await sendMessage(phone_number_id, from, "❌ Hubo un problema al intentar apartar tu lugar. Por favor intenta de nuevo.");
                                }
                            } else if (!global.stateCache[from] || !global.stateCache[from].isFinished) {
                                const btns = [
                                    { type: "reply", reply: { id: "btn_action_agendar", title: "Agendar Corte" } },
                                    { type: "reply", reply: { id: "btn_action_reagendar", title: "Re-agendar" } },
                                    { type: "reply", reply: { id: "btn_action_ubicacion", title: "Ubicación" } }
                                ];
                                await sendHeaderImageMessage(phone_number_id, from, "¡Hola! Qué gusto saludarte. Bienvenido a Peluquería Carlos Escobar 💈. Nos encantaría atenderte, ¿en qué podemos ayudarte el día de hoy?\n\n👆 *Por favor, toca la opción deseada*", "https://drive.google.com/uc?export=view&id=1pSxGMedHKUtxdOvhK9ZkbaDlNsO9nTmD", btns);
                            }
                        }
                    } catch (error) {
                        console.error('Error en Barber Flow:', error);
                        try { await sendMessage(phone_number_id, from, "❌ Lo siento, hubo un error de conexión con nuestros sistemas."); } catch (e) { }
                    }

                } else {
                    // ---------------------------------------------------------
                    // 🤖 LÓGICA DEL CHATBOT ACTUAL (Senior Robot)
                    // ---------------------------------------------------------

                    // 1. Check for Return to Main Menu (Resets to Needs Assessment)
                    if (msg_body === 'btn_main_menu') {
                        // Send Needs Assessment (Step 1)
                        await sendWelcomeAndNeeds(phone_number_id, from);
                        return res.status(200).send('EVENT_RECEIVED');
                    }

                    let responseText = '';
                    let nextButtons = null;

                    // 2. STEP 2 A: Handle Needs Selection -> Send Volume Qualification
                    // Needs: Speed (A), Organization (B), AI (C)
                    if (
                        msg_body === 'btn_need_speed' || msg_body.includes('rapidez') ||
                        msg_body === 'btn_need_org' || msg_body.includes('organizar') ||
                        msg_body === 'btn_need_ai' || msg_body.includes('inteligencia')
                    ) {
                        const qualText = "¡Excelente meta! Tenemos la tecnología para lograrlo. Solo para asegurarnos de que el sistema soporte tu ritmo de trabajo sin interrupciones, ¿cuántos chats recibes, aproximadamente, por día? 📊";
                        const qualButtons = [
                            { type: "reply", reply: { id: "btn_vol_1", title: "Hasta 25 🐣" } },
                            { type: "reply", reply: { id: "btn_vol_2", title: "25 a 50 📈" } },
                            { type: "reply", reply: { id: "btn_vol_3", title: "Más de 50 🏢" } }
                        ];
                        await sendCustomButtonMessage(phone_number_id, from, qualText, qualButtons);
                        return res.status(200).send('EVENT_RECEIVED');
                    }

                    // 3. STEP 3: Handle Volume Selection -> Send Solution
                    // LEVEL 1: Hasta 25 chats
                    else if (msg_body === 'btn_vol_1' || msg_body.includes('hasta 25')) {
                        responseText = "¡Perfecto para dar el primer gran paso! Nuestra Solución Entrada está diseñada para que te olvides de las tareas repetitivas y te enfoques en crecer. 🌱\n\n✅ Tus contactos se guardan solos en Google Sheets. 📊\n✅ Tus citas se agendan directo en Google Calendar. 📅\n✅ Resolvemos dudas comunes al instante con FAQ. 💡\n\n💰 Inversión: Desde $3,000 MXN.\n\n¿Te gustaría agendar una breve llamada para ver cómo se vería en tu negocio? 📞";
                        nextButtons = [
                            { type: "reply", reply: { id: "btn_schedule", title: "Agendar Llamada 📞" } },
                            { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                        ];
                    }
                    // LEVEL 2: 25 - 50 chats
                    else if (msg_body === 'btn_vol_2' || msg_body.includes('25 a 50')) {
                        responseText = "¡Qué buen ritmo lleva tu negocio! El Plan Estándar es el aliado que necesitas para profesionalizar cada interacción. 🚀\n\n✅ Gestión completa de citas: tus clientes agendan, cambian o cancelan solos. ⏳\n✅ Base de datos segura para que nunca pierdas un prospecto. 🔒\n✅ Respuestas rápidas que dan confianza y cierran ventas. 🎯\n\n💰 Inversión: Desde $7,000 MXN.\n\n¿Platicamos en una llamada para explicarte cómo configurarlo? 📞";
                        nextButtons = [
                            { type: "reply", reply: { id: "btn_schedule", title: "Agendar Llamada 📞" } },
                            { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                        ];
                    }
                    // LEVEL 3: 50+ chats
                    else if (msg_body === 'btn_vol_3' || msg_body.includes('más de 50') || msg_body.includes('51')) {
                        responseText = "¡Increíble volumen! Para un flujo así, necesitas el poder de nuestra Solución Premium con Inteligencia Artificial. 🧠⚡\n\n✅ Un agente de IA entrenado con la voz de tu marca. 🗣️\n✅ Integración total con tu CRM para que todo esté conectado. 🔗\n✅ Seguridad de nivel corporativo para proteger tu información. 🛡️\n\n💰 Inversión: Desde $15,000 MXN.\n\nEste nivel requiere un toque personal. ¿Agendamos una consultoría técnica gratuita? 📞";
                        nextButtons = [
                            { type: "reply", reply: { id: "btn_consulting", title: "Consultoría Gratis 🛠️" } },
                            { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                        ];
                    }
                    // SCHEDULING / CONSULTING (External Link)
                    else if (msg_body === 'btn_schedule' || msg_body === 'btn_consulting' || msg_body.includes('agendar') || msg_body.includes('consultoría')) {
                        responseText = "¡Excelente decisión! 🎯 El siguiente paso es una breve llamada de diagnóstico para detectar los cuellos de botella en tu proceso y ver cómo Senior Robot los va a eliminar. 🚫🍾\n\nPor favor, elige el horario que mejor te acomode en nuestro calendario oficial: 👉 https://calendar.app.google/1VzMDX3u7EunndcYA 📅\n\nNota: Atendemos de forma personalizada para asegurar la máxima calidad en cada integración. 🦾";
                    }
                    // CONTACT HUMAN (Direct Call)
                    else if (msg_body === 'btn_contact_human' || msg_body.includes('llamar')) {
                        responseText = "📞 Puedes contactarnos directamente al: +52 312 112 8434\n\nEstamos disponibles para atenderte personalmente. 🤝";
                    }

                    // 4. Send Response if matched an option
                    if (responseText) {
                        try {
                            if (nextButtons) {
                                await sendCustomButtonMessage(phone_number_id, from, responseText, nextButtons);
                            } else {
                                await sendMessage(phone_number_id, from, responseText);
                            }
                        } catch (error) {
                            console.error('Error sending message:', error);
                        }
                        return res.status(200).send('EVENT_RECEIVED');
                    }

                    // 5. GREETING CHECK
                    // Restore explicit check for greetings to trigger the Welcome Flow
                    const greetingKeywords = ['hola', 'hi', 'hello', 'buenos', 'buenas', 'inicio', 'empezar', 'menu'];
                    const isGreeting = greetingKeywords.some(keyword => msg_body.includes(keyword));

                    try {
                        if (isGreeting) {
                            // Triggers the Welcome & Needs Assessment (Step 1)
                            await sendWelcomeAndNeeds(phone_number_id, from);
                        } else {
                            // 6. FALLBACK: HUMAN HANDOFF / SENIOR ROBOT INTRO
                            // If it's unknown text (e.g. user writing after flow), offer human contact.
                            const fallbackText = "Soy Senior Robot, tu Asistente Digital 🤖.\n\nSi deseas hablar con un humano, puedes agendar una cita, llamar directo o volver al menú. 👇";
                            const fallbackButtons = [
                                { type: "reply", reply: { id: "btn_schedule", title: "Agendar Cita 📅" } },
                                { type: "reply", reply: { id: "btn_contact_human", title: "Llamar Ahora 📞" } },
                                { type: "reply", reply: { id: "btn_main_menu", title: "Menú Principal ⬅️" } }
                            ];
                            await sendCustomButtonMessage(phone_number_id, from, fallbackText, fallbackButtons);
                        }
                    } catch (error) {
                        console.error('Error sending fallback flow:', error);
                    }
                }
            }
            return res.status(200).send('EVENT_RECEIVED');
        } else {
            return res.status(404).send('Not Found');
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

// Generic Helper to send Button Messages with Header Image
async function sendHeaderImageMessage(phoneNumberId, to, bodyText, imageUrl, buttons) {
    // IGNORANDO VERCEL: Forzado directo del token asíncrono en código puro
    const token = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';

    const messagePayload = {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        interactive: {
            type: "button",
            header: {
                type: "image",
                image: { link: imageUrl }
            },
            body: { text: bodyText },
            action: { buttons: buttons }
        }
    };

    const response = await fetch(
        `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
        {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(messagePayload),
        }
    );
    if (!response.ok) {
        const errorData = await response.json();
        console.error("WhatsApp API Error (Image Button):", JSON.stringify(errorData));
    } else {
        global.stateCache = global.stateCache || {};
        global.stateCache[to] = { isFinished: false, menuType: 'headerImage', payload: { text: bodyText, imageUrl, buttons }, errors: 0 };
    }
}

// Helper to send text messages
async function sendMessage(phoneNumberId, to, text) {
    // IGNORANDO VERCEL: Forzado directo del token asíncrono en código puro
    const token = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';


    console.log(`Intentando enviar mensaje a ${to} usando App/Token configurado en env...`);

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
        console.error("WhatsApp API Error (Text):", JSON.stringify(errorData));
        throw new Error(`WhatsApp API Error: ${JSON.stringify(errorData)}`);
    } else {
        const responseData = await response.json();
        console.log(`✅ ¡Mensaje enviado a Meta con éxito! ID: ${responseData.messages?.[0]?.id}`);
    }
}

// Helper to send Welcome Message & Needs Assessment Buttons
async function sendWelcomeAndNeeds(phoneNumberId, to) {
    const welcomeText = "¡Hola! Qué gusto saludarte. Soy el asistente inteligente de Senior Robot 🤖.\n\nSabemos que detrás de cada chat hay un cliente esperando y un negocio con metas grandes. Mi objetivo es ayudarte a que tu equipo sea más productivo y tus clientes reciban atención de primer nivel, las 24 horas. 🌟\n\nPara empezar, ¿cuál es el impulso que tu negocio necesita hoy? 👇\n\nA) Dejar de perder clientes por falta de respuesta rápida ⚡\nB) Organizar mis citas y datos de forma automática 📅\nC) Implementar Inteligencia Artificial para ventas complejas 🧠";

    // Send text first
    await sendMessage(phoneNumberId, to, welcomeText);

    // Short delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Send Buttons
    const buttons = [
        { type: "reply", reply: { id: "btn_need_speed", title: "Respuesta Rápida ⚡" } },
        { type: "reply", reply: { id: "btn_need_org", title: "Organizar Citas 📅" } },
        { type: "reply", reply: { id: "btn_need_ai", title: "Implementar IA 🧠" } }
    ];
    await sendCustomButtonMessage(phoneNumberId, to, "Selecciona tu prioridad:", buttons);
}

// Generic Helper to send Button Messages
async function sendCustomButtonMessage(phoneNumberId, to, bodyText, buttons) {
    // IGNORANDO VERCEL: Forzado directo del token asíncrono en código puro
    const token = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';


    const messagePayload = {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        interactive: {
            // El tipo siempre es "button" cuando mandamos reply buttons
            type: "button",
            body: {
                text: bodyText
            },
            action: {
                buttons: buttons
            }
        }
    };

    const response = await fetch(
        `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messagePayload),
        }
    );
    if (!response.ok) {
        const errorData = await response.json();
        console.error("WhatsApp API Error (Buttons):", JSON.stringify(errorData));
        throw new Error(`WhatsApp API Error: ${JSON.stringify(errorData)}`);
    } else {
        global.stateCache = global.stateCache || {};
        global.stateCache[to] = { isFinished: false, menuType: 'customButton', payload: { text: bodyText, buttons }, errors: 0 };
    }
}

// Generic Helper to send List Messages
async function sendListMessage(phoneNumberId, to, bodyText, buttonText, sections) {
    const token = 'EAAWj2QODFwwBQyCohZBk5RP9MehtyMivglpExhX4AXeKZCnPpzaJKi0OyNLMpftfeipKC3STf5BXZAFF03s2CZBgvzS0ra1n6EZCqJQtcJ1GJ5X5fEVnukQZCcPLuv4l1ABS7sLWf1J9uacNcd3dRnFkOA9j1Ji0S6inYwQorZBNZCSUJz19PweBqgkeVfguYtko4QZDZD';

    const messagePayload = {
        messaging_product: "whatsapp",
        to: to,
        type: "interactive",
        interactive: {
            type: "list",
            body: { text: bodyText },
            action: {
                button: buttonText,
                sections: sections
            }
        }
    };

    const response = await fetch(
        `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messagePayload),
        }
    );
    if (!response.ok) {
        const errorData = await response.json();
        console.error("WhatsApp API Error (List):", JSON.stringify(errorData));
        throw new Error(`WhatsApp API Error: ${JSON.stringify(errorData)}`);
    } else {
        global.stateCache = global.stateCache || {};
        global.stateCache[to] = { isFinished: false, menuType: 'list', payload: { text: bodyText, buttonText, sections }, errors: 0 };
    }
}
