import handler from './api/webhook.js';

// DO NOT LOAD .ENV to test fallback
// Clear existing env just in case
delete process.env.VERIFY_TOKEN;
delete process.env.WHATSAPP_API_TOKEN;

console.log("Testing Fallback Logic (No Env Vars)...");

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

// Check if it works without env
async function main() {
    console.log("--- Running Fallback Test (Greeting) ---");
    const req = createMockReq({ text: "Hola" });
    const res = createMockRes();

    await handler(req, res);

    // If it works, fetchCalls should have 2 items (Text + Segmentation)
    // AND it shouldn't crash
    if (fetchCalls.length === 2 && fetchCalls[0].body.text.body.includes("Bienvenido")) {
        console.log("✅ Fallback Test Passed: Bot responded using hardcoded tokens.");
    } else {
        console.log("❌ Fallback Test Failed.");
        console.log("Fetch calls:", fetchCalls.length);
    }
}

main();
