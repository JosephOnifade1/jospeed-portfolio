// Offline exports. The site and social crawlers only need the finished files.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { brand, cardSize } from '../src/data/brand.js';
import { locationLabel, profile } from '../src/data/profile.js';
import { escapeHtml as esc } from '../src/seo/pageHead.js';
import { citron, ink, markHeight, monogram, wordmark } from './brand-mark.js';

const out = (url) => path.join('public', url);
const svg = (w, h, content) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${content}</svg>\n`
  );
await fs.mkdir(path.dirname(out(brand.mark)), { recursive: true });
await fs.writeFile(
  out(brand.mark),
  svg(108, 70, `<title>JOspeed monogram</title>${monogram(1.66, 1.225, 104.68)}`)
);

function tile(micro) {
  // Full bleed for OS-masked touch icons. The tab gets a contrasting ground
  // for light/dark browser chrome and more drawing area at 16 CSS pixels.
  const w = micro ? 56 : 48;
  const ground = `<rect width="64" height="64" rx="${micro ? 12 : 0}" fill="${ink}"/>`;
  const mark = monogram((64 - w) / 2, (64 - markHeight(w, micro)) / 2, w, micro);
  return svg(64, 64, `<title>JOspeed</title>${ground}${mark}`);
}
const pngIcon = (source, size) => sharp(source, { density: 576 }).resize(size, size).png().toBuffer();
const favicon = tile(true);
const square = tile(false);
await fs.writeFile(out('/favicon.svg'), favicon);
await fs.writeFile(out('/apple-touch-icon.png'), await pngIcon(square, 180));
await fs.writeFile(out(brand.logo), await pngIcon(square, brand.logoSize));

// A conventional /favicon.ico for clients which don't read the HTML links.
// Each ICO directory entry points at a complete, independently decodable PNG.
const sizes = [16, 32, 48];
const layers = await Promise.all(sizes.map((size) => pngIcon(favicon, size)));
const directory = Buffer.alloc(6 + 16 * layers.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(layers.length, 4);
let offset = directory.length;
for (const [i, layer] of layers.entries()) {
  const entry = 6 + 16 * i;
  directory[entry] = directory[entry + 1] = sizes[i];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(layer.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += layer.length;
}
await fs.writeFile(out('/favicon.ico'), Buffer.concat([directory, ...layers]));
await fs.writeFile(out('/favicon.png'), layers[sizes.indexOf(32)]);

// Compose around the existing sculpture, leaving its face and visor clear.
// Keep all type in the raster: no font, SVG or JS support required to unfurl it.
const { width, height } = cardSize;
const [given, ...family] = profile.name.split(' ');
const roleLines = profile.role.split(/ (?=& )/);
const overlay = svg(width, height, `
  <defs><linearGradient id="shade">
    <stop offset="0.07" stop-color="${ink}"/>
    <stop offset="0.33" stop-color="${ink}" stop-opacity=".95"/>
    <stop offset="0.49" stop-color="${ink}" stop-opacity=".76"/>
    <stop offset="0.67" stop-color="${ink}" stop-opacity="0"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#shade)"/>
  ${wordmark(64, 80, 40)}
  <g font-family="DejaVu Sans, sans-serif" fill="#F5F4EE">
    <path d="M64 158h29" stroke="${citron}" stroke-width="2"/>
    <text x="107" y="164" font-family="DejaVu Sans Mono, monospace" font-size="18" letter-spacing="2" fill="${citron}">ENGINEERING PORTFOLIO</text>
    <text x="60" y="266" font-size="106" font-weight="bold" letter-spacing="-6">${esc(given)}</text>
    <text x="58" y="393" font-family="DejaVu Serif, serif" font-style="italic" font-size="116" letter-spacing="-3" fill="${citron}">${esc(family.join(' '))}</text>
    ${roleLines.map((line, i) => `<text x="66" y="${449 + 39 * i}" font-size="34" letter-spacing="-.9">${esc(line)}</text>`).join('\n')}
    <path d="M66 530h421" stroke="#4A5143"/>
    <circle cx="72" cy="567" r="5" fill="${citron}"/>
    <text x="93" y="574" font-family="DejaVu Sans Mono, monospace" font-size="20" letter-spacing="1.8" fill="#D5DBCD">${esc(locationLabel.toUpperCase())}</text>
  </g>`);
const art = await sharp(out('/jospeed-hero-artwork.png'))
  .resize(width - 80, height, { fit: 'cover', position: 'right' })
  .png()
  .toBuffer();
const card = sharp({ create: { width, height, channels: 3, background: ink } }).composite([
  { input: art, left: 80, top: 0 },
  { input: overlay, left: 0, top: 0 },
]);
await fs.mkdir(path.dirname(out(brand.shareImage)), { recursive: true });
await card.clone().jpeg({ quality: 89, chromaSubsampling: '4:4:4', mozjpeg: true })
  .toFile(out(brand.shareImage));
// Previously shared pages may still point at this filename. Serve the new
// composition there as a real PNG, not the retired illustration or a 404.
await card.png({ palette: true, effort: 8 }).toFile(out('/og-image.png'));
console.log(`Rendered the JO mark, tab/touch icons and ${width}×${height} portfolio card.`);
