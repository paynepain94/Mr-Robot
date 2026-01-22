import handler from './api/webhook.js';

// Mock Fetch
const fetchCalls = [];
global.fetch = async (url, options) => {
    fetchCalls.push({ url, options, body: JSON.parse(options.body) });
    return {
        ok: true,
        json: async () => ({})
    };
};

function createMockReq(body) {
    return {
        method: 'POST',
        body: {
            object: 'whatsapp_business_account',
            entry: [{
                changes: [{
                    value: {
                        metadata: { phone_number_id: '12345' },
                        messages: [{
                            from: '521234567890',
                            type: body.type || 'text',
                            text: body.text ? { body: body.text } : undefined,
                            interactive: body.interactive ? body.interactive : undefined
                        }]
                    }
                }]
            }]
        }
    };
}

function createMockRes() {
    const res = {};
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.send = (msg) => {
        res.body = msg;
        return res;
    };
    res.json = (json) => {
        res.body = json;
        return res;
    };
    return res;
}

async function runTest(name, inputBody, expectedCheck) {
    console.log(`\n--- Running Test: ${name} ---`);
    fetchCalls.length = 0; // Clear history
    const req = createMockReq(inputBody);
    const res = createMockRes();

    await handler(req, res);

    if (expectedCheck(fetchCalls, res)) {
        console.log(`✅ ${name} Passed`);
    } else {
        console.log(`❌ ${name} Failed`);
        console.log('Fetch Calls:', JSON.stringify(fetchCalls, null, 2));
    }
}

async function main() {
    // 1. Test Greeting
    await runTest('Greeting - "Hola"', { text: 'Hola' }, (calls, res) => {
        // Expect 2 calls: one text (welcome), one interactive (segmentation)
        // Note: Code waits 2000ms, so test will take 2s.
        if (calls.length !== 2) return false;
        const msg1 = calls[0].body.text.body;
        const msg2 = calls[1].body.interactive.body.text;

        const hasWelcome = msg1.includes("Bienvenido a Senior Robot");
        const hasSegmentation = msg2.includes("Selecciona tu volumen actual");
        return hasWelcome && hasSegmentation;
    });

    // 2. Test Level 1
    await runTest('Level 1 - "btn_level_1"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_level_1' } } },
        (calls, res) => {
            if (calls.length !== 1) return false;
            const body = calls[0].body.interactive.body.text;
            const buttons = calls[0].body.interactive.action.buttons;
            return body.includes("Solución Entrada") && buttons.some(b => b.reply.id === 'btn_schedule');
        }
    );

    // 3. Test Level 2
    await runTest('Level 2 - "btn_level_2"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_level_2' } } },
        (calls, res) => {
            if (calls.length !== 1) return false;
            const body = calls[0].body.interactive.body.text;
            return body.includes("Plan Estándar");
        }
    );

    // 4. Test Level 3
    await runTest('Level 3 - "btn_level_3"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_level_3' } } },
        (calls, res) => {
            if (calls.length !== 1) return false;
            const body = calls[0].body.interactive.body.text;
            const buttons = calls[0].body.interactive.action.buttons;
            return body.includes("Plan Premium") && buttons.some(b => b.reply.id === 'btn_consulting');
        }
    );

    // 5. Test Schedule
    await runTest('Schedule - "btn_schedule"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_schedule' } } },
        (calls, res) => {
            if (calls.length !== 1) return false;
            const body = calls[0].body.text.body;
            return body.includes("calendar.app.google");
        }
    );

    // 6. Test Main Menu
    await runTest('Main Menu - "btn_main_menu"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_main_menu' } } },
        (calls, res) => {
            // Same as Greeting
            if (calls.length !== 2) return false;
            return calls[0].body.text.body.includes("Bienvenido a Senior Robot");
        }
    );
}

main();
