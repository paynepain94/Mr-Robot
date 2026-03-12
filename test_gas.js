const url = "https://script.google.com/macros/s/AKfycbzVvtXgU2Vq1aSmwnRoAvdfYCQDwXQgl0aRO2ytCDIDy_LHVtVvukCTQsla_9CsEM89/exec";
(async () => {
    const res = await fetch(url, {
        method: "POST", redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: "getAvailability", date: "hoy", barber: "juan" })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
})();
