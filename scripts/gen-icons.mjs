// Generates PWA icons: icon-192.png and icon-512.png
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public');

const svgIcon = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#A78BFA"/>
      <stop offset="100%" style="stop-color:#7C3AED"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bg)"/>
  <!-- Paw: two top toes -->
  <circle cx="${size*0.35}" cy="${size*0.28}" r="${size*0.08}" fill="white"/>
  <circle cx="${size*0.65}" cy="${size*0.28}" r="${size*0.08}" fill="white"/>
  <!-- Two side toes -->
  <circle cx="${size*0.2}" cy="${size*0.42}" r="${size*0.075}" fill="white"/>
  <circle cx="${size*0.8}" cy="${size*0.42}" r="${size*0.075}" fill="white"/>
  <!-- Main pad -->
  <ellipse cx="${size*0.5}" cy="${size*0.63}" rx="${size*0.22}" ry="${size*0.19}" fill="white"/>
</svg>`;

for (const size of [192, 512]) {
  await sharp(Buffer.from(svgIcon(size)))
    .png()
    .toFile(path.join(outDir, `icon-${size}.png`));
  console.log(`✓ icon-${size}.png`);
}
