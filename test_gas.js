const url = "https://script.google.com/macros/s/AKfycby7aar-5FgFpBcR8yUZJ49_zJEqDt55T8q2_az4rUEJtrETR_RIxOJdFFJ-gtrBHHsm/exec";
(async () => {
    try {
        const payload = { action: "bookAppointment", phone: "5213317106005", name: "dante", service: "corte", barber: "juan", day: "man", time: "1100" };
        const res = await fetch(url, {
            method: "POST", redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        });
        const text = await res.text();
        console.log("Raw Response:");
        console.log(text);

        try {
            console.log("Parsed JSON:", JSON.parse(text));
        } catch (e) {
            console.log("Not valid JSON");
        }
    } catch (e) {
        console.error("Fetch Exception:", e);
    }
})();
