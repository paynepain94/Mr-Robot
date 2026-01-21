import handler from './api/webhook.js';

// Mock Response Object
const res = {
    status: (code) => {
        console.log(`Response Status: ${code}`);
        return res;
    },
    send: (body) => {
        console.log(`Response Body: ${body}`);
        return res;
    },
    json: (json) => {
        console.log(`Response JSON: ${JSON.stringify(json)}`);
        return res;
    }
};

// Mock Global Fetch
global.fetch = async (url, options) => {
    console.log(`\n--- FETCH CALL ---`);
    console.log(`URL: ${url}`);
    console.log(`Method: ${options.method}`);
    const body = JSON.parse(options.body);
    console.log(`Body Type: ${body.type || 'text'}`);
    if (body.text) {
        console.log(`Text: "${body.text.body}"`);
    }
    if (body.interactive) {
        console.log(`Interactive Type: ${body.interactive.type}`);
        console.log(`Body Text: "${body.interactive.body.text}"`);
        if (body.interactive.action.buttons) {
            console.log(`Buttons: ${JSON.stringify(body.interactive.action.buttons.map(b => b.reply.id))}`);
        }
    }
    return {
        ok: true,
        json: async () => ({})
    };
};

// Test Case 1: Start Phrase
console.log('TEST 1: Triggering Start Phrase');
const reqStart = {
    method: 'POST',
    body: {
        object: 'whatsapp_business_account',
        entry: [{
            changes: [{
                value: {
                    metadata: { phone_number_id: '123456' },
                    messages: [{
                        from: '5213312345678',
                        type: 'text',
                        text: { body: '¡Hola! Me interesa saber mas de Mr-Robot' }
                    }]
                }
            }]
        }]
    }
};

await handler(reqStart, res);

// Test Case 1.5: Simple "Hola"
console.log('\nTEST 1.5: Triggering "Hola"');
const reqHola = {
    method: 'POST',
    body: {
        object: 'whatsapp_business_account',
        entry: [{
            changes: [{
                value: {
                    metadata: { phone_number_id: '123456' },
                    messages: [{
                        from: '5213312345678',
                        type: 'text',
                        text: { body: 'Hola me gustaria saber mas' }
                    }]
                }
            }]
        }]
    }
};

await handler(reqHola, res);

// Test Case 2: Option Selection (Low Volume)
console.log('\nTEST 2: Selecting "Bajo" Option');
const reqOption = {
    method: 'POST',
    body: {
        object: 'whatsapp_business_account',
        entry: [{
            changes: [{
                value: {
                    metadata: { phone_number_id: '123456' },
                    messages: [{
                        from: '5213312345678',
                        type: 'interactive',
                        interactive: {
                            type: 'button_reply',
                            button_reply: { id: 'btn_low', title: '🟢 Bajo' }
                        }
                    }]
                }
            }]
        }]
    }
};

await handler(reqOption, res);
