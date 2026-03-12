import fs from 'fs';
const content = fs.readFileSync('out.html', 'utf16le');
let preview = content.replace(/<(style)[^>]*>[\s\S]*?<\/\1>/gi, ''); // remove large CSS
preview = preview.substring(preview.search("La script se completó") - 50, preview.search("La script se completó") + 200) || content.substring(500, 1500);
console.log(preview);
