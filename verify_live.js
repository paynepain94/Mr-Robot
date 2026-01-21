const VERIFY_TOKEN = 'mr_robot_secret_8909789';
const BASE_URL = 'https://mr-robot-cyan.vercel.app/api/webhook';

async function verifyLiveWebhook() {
    const url = `${BASE_URL}?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=LIVE_TEST_SUCCESS`;

    console.log(`Checking URL: ${url}`);

    try {
        const response = await fetch(url);
        const text = await response.text();

        console.log(`Status: ${response.status}`);
        console.log(`Response: "${text}"`);

        if (response.status === 200 && text === 'LIVE_TEST_SUCCESS') {
            console.log("✅ Vercel Deployment is ACTIVE and listening!");
        } else {
            console.error("❌ Vercel Deployment failed verification.");
        }
    } catch (error) {
        console.error("❌ Error connecting to Vercel:", error.message);
    }
}

verifyLiveWebhook();
