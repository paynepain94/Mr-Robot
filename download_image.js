import https from 'https';
import fs from 'fs';
import path from 'path';

const imageUrl = 'https://lh3.googleusercontent.com/d/1pSxGMedHKUtxdOvhK9ZkbaDlNsO9nTmD';
const outputPath = path.resolve('public/barber-header.jpg');

const file = fs.createWriteStream(outputPath);

https.get(imageUrl, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Image downloaded and saved to public/barber-header.jpg');
    });
}).on('error', (err) => {
    fs.unlink(outputPath, () => {});
    console.error('Error downloading image:', err.message);
});
