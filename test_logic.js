
// Mocking logic from webhook.js
function isBusinessHours(mockDate) {
    const now = mockDate || new Date();
    // Logic equivalent to implementation
    const mexicoDate = new Date(now.toLocaleString("en-US", { timeZone: "America/Mexico_City" }));
    const day = mexicoDate.getDay(); // 0 (Sun) - 6 (Sat)
    const hour = mexicoDate.getHours();

    // Condition: Mon(1) to Fri(5) AND 9 <= hour < 18
    return (day >= 1 && day <= 5) && (hour >= 9 && hour < 18);
}

console.log("Running Business Logic Tests...");

// Test logic
const testCases = [
    { day: 1, hour: 10, expected: true, name: "Monday 10am" },
    { day: 5, hour: 17, expected: true, name: "Friday 5pm" },
    { day: 1, hour: 8, expected: false, name: "Monday 8am (Early)" },
    { day: 1, hour: 18, expected: false, name: "Monday 6pm (Closed match exclude)" },
    { day: 0, hour: 12, expected: false, name: "Sunday Noon" },
    { day: 6, hour: 12, expected: false, name: "Saturday Noon" }
];

testCases.forEach(tc => {
    const isActive = (tc.day >= 1 && tc.day <= 5) && (tc.hour >= 9 && tc.hour < 18);
    if (isActive === tc.expected) {
        console.log(`✅ Passed: ${tc.name}`);
    } else {
        console.error(`❌ Failed: ${tc.name}. Expected ${tc.expected}, got ${isActive}`);
    }
});

const now = new Date();
const mexicoDateString = now.toLocaleString("en-US", { timeZone: "America/Mexico_City" });
console.log(`Current System Time: ${now.toString()}`);
console.log(`Current Mexico Time (Derived): ${mexicoDateString}`);
const mexicoDate = new Date(mexicoDateString);
console.log(`Parsed Mexico Day: ${mexicoDate.getDay()}, Hour: ${mexicoDate.getHours()}`);
console.log(`Is Business Hours Now? ${isBusinessHours()}`);
