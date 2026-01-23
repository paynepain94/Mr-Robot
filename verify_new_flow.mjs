import handler from './api/webhook.js';
import fs from 'fs';
import path from 'path';

// --- LOAD ENV ---
// Simple .env parser for testing (since we might not have dotenv installed)
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}
// ----------------

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
        query: {}, // Default empty query
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

// Check tokens availability
if (!process.env.VERIFY_TOKEN || !process.env.WHATSAPP_API_TOKEN) {
    console.error("❌ ERROR: .env file missing or tokens not found.");
    process.exit(1);
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
    // 1. Test Greeting (Step 1)
    await runTest('Greeting - "Hola"', { text: 'Hola' }, (calls, res) => {
        // Now expects: Welcome Text + Needs Buttons (Wait is simulated but helper calls send twice)
        // sendWelcomeAndNeeds sends text then buttons.
        if (calls.length !== 2) return false;
        const msg1 = calls[0].body.text.body;
        const msg2 = calls[1].body.interactive.action.buttons;

        return msg1.includes("¿cuál es el impulso que tu negocio necesita hoy?") &&
            msg2.some(b => b.reply.id === 'btn_need_speed');
    });

    // 2. Test Needs Selection (Step 2)
    await runTest('Needs Selection - "btn_need_speed"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_need_speed' } } },
        (calls, res) => {
            if (calls.length !== 1) return false;
            const text = calls[0].body.interactive.body.text;
            const buttons = calls[0].body.interactive.action.buttons;
            return text.includes("¿cuántos chats recibes") && buttons.some(b => b.reply.id === 'btn_vol_1');
        }
    );

    // 3. Test Volume Selection (Step 3) - Level 3
    await runTest('Volume Selection - "btn_vol_3"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_vol_3' } } },
        (calls, res) => {
            if (calls.length !== 1) return false;
            const text = calls[0].body.interactive.body.text;
            return text.includes("Solución Premium") && text.includes("Desde $15,000 MXN");
        }
    );

    // 4. Test Main Menu (Reset to Step 1)
    await runTest('Main Menu - "btn_main_menu"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_main_menu' } } },
        (calls, res) => {
            // Should call sendWelcomeAndNeeds (Text + Buttons)
            if (calls.length !== 2) return false;
            return calls[0].body.text.body.includes("¿cuál es el impulso que tu negocio necesita hoy?");
        }
    );
}

main();
