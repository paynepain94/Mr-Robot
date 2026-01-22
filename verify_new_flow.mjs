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
    // 1. Test Greeting (Standard)
    await runTest('Greeting - "Hola"', { text: 'Hola' }, (calls, res) => {
        if (calls.length !== 2) return false;
        const msg1 = calls[0].body.text.body;
        const msg2 = calls[1].body.interactive.body.text;

        return msg1.includes("Bienvenido a Senior Robot") && msg2.includes("Selecciona tu volumen actual");
    });

    // 2. Test Random Text (NEW Catch-all)
    await runTest('Random Text - "Info please"', { text: 'Info please' }, (calls, res) => {
        if (calls.length !== 2) return false;
        const msg1 = calls[0].body.text.body;

        // Should be same as greeting
        return msg1.includes("Bienvenido a Senior Robot");
    });

    // 3. Test Level 1
    await runTest('Level 1 - "btn_level_1"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_level_1' } } },
        (calls, res) => {
            if (calls.length !== 1) return false;
            return calls[0].body.interactive.body.text.includes("Solución Entrada");
        }
    );

    // 4. Test Main Menu (REFINED)
    await runTest('Main Menu - "btn_main_menu"',
        { type: 'interactive', interactive: { type: 'button_reply', button_reply: { id: 'btn_main_menu' } } },
        (calls, res) => {
            // New Logic: Expect only 1 call (Buttons), NO Welcome Text
            if (calls.length !== 1) return false;
            return calls[0].body.interactive.body.text.includes("Selecciona tu volumen actual");
        }
    );
}

main();
