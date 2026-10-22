const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// 1. Read source image
const srcBuf = fs.readFileSync('public/Modern JP Code Monogram Logo.png');
const srcPng = PNG.sync.read(srcBuf);
console.log('Source loaded:', srcPng.width, 'x', srcPng.height);

// 2. Scan content bounding box (pixels brighter than threshold)
let minX = srcPng.width, maxX = 0, minY = srcPng.height, maxY = 0;
for (let y = 0; y < srcPng.height; y++) {
  for (let x = 0; x < srcPng.width; x++) {
    const idx = (srcPng.width * y + x) << 2;
    const r = srcPng.data[idx];
    const g = srcPng.data[idx + 1];
    const b = srcPng.data[idx + 2];
    if (r > 60 || g > 60 || b > 60) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log('Bounding box:', { minX, maxX, minY, maxY });

const logoW = maxX - minX;
const logoH = maxY - minY;
const centerX = (minX + maxX) / 2;
const centerY = (minY + maxY) / 2;
const maxDim = Math.max(logoW, logoH);

// Add 16% breathing room around logo
const cropSize = maxDim * 1.32;
const cropX = centerX - cropSize / 2;
const cropY = centerY - cropSize / 2;

console.log('Crop window:', { cropX, cropY, cropSize });

// 3. Create target 256x256 PNG with bicubic/bilinear sampling
const targetSize = 256;
const targetPng = new PNG({ width: targetSize, height: targetSize });

const cornerRadius = 48; // Squircle corner radius

function isInsideSquircle(x, y, size, r) {
  // Check 4 corners
  if (x < r && y < r) {
    const dx = x - r, dy = y - r;
    return dx * dx + dy * dy <= r * r;
  }
  if (x > size - 1 - r && y < r) {
    const dx = x - (size - 1 - r), dy = y - r;
    return dx * dx + dy * dy <= r * r;
  }
  if (x < r && y > size - 1 - r) {
    const dx = x - r, dy = y - (size - 1 - r);
    return dx * dx + dy * dy <= r * r;
  }
  if (x > size - 1 - r && y > size - 1 - r) {
    const dx = x - (size - 1 - r), dy = y - (size - 1 - r);
    return dx * dx + dy * dy <= r * r;
  }
  return true;
}

function distToSquircleEdge(x, y, size, r) {
  let d = 0;
  if (x < r && y < r) {
    const dx = x - r, dy = y - r;
    return r - Math.sqrt(dx * dx + dy * dy);
  }
  if (x > size - 1 - r && y < r) {
    const dx = x - (size - 1 - r), dy = y - r;
    return r - Math.sqrt(dx * dx + dy * dy);
  }
  if (x < r && y > size - 1 - r) {
    const dx = x - r, dy = y - (size - 1 - r);
    return r - Math.sqrt(dx * dx + dy * dy);
  }
  if (x > size - 1 - r && y > size - 1 - r) {
    const dx = x - (size - 1 - r), dy = y - (size - 1 - r);
    return r - Math.sqrt(dx * dx + dy * dy);
  }
  return Math.min(x, size - 1 - x, y, size - 1 - y);
}

for (let ty = 0; ty < targetSize; ty++) {
  for (let tx = 0; tx < targetSize; tx++) {
    const tIdx = (targetSize * ty + tx) << 2;

    const edgeDist = distToSquircleEdge(tx, ty, targetSize, cornerRadius);

    if (edgeDist < 0) {
      // Outside squircle -> transparent
      targetPng.data[tIdx] = 0;
      targetPng.data[tIdx + 1] = 0;
      targetPng.data[tIdx + 2] = 0;
      targetPng.data[tIdx + 3] = 0;
      continue;
    }

    // Map tx, ty back to source image coordinate
    const sx = cropX + (tx / targetSize) * cropSize;
    const sy = cropY + (ty / targetSize) * cropSize;

    // Bilinear interpolation
    const x0 = Math.floor(sx);
    const x1 = Math.min(x0 + 1, srcPng.width - 1);
    const y0 = Math.floor(sy);
    const y1 = Math.min(y0 + 1, srcPng.height - 1);

    const xDiff = sx - x0;
    const yDiff = sy - y0;

    let r = 0, g = 0, b = 0;

    if (x0 >= 0 && x1 < srcPng.width && y0 >= 0 && y1 < srcPng.height) {
      const idx00 = (srcPng.width * y0 + x0) << 2;
      const idx10 = (srcPng.width * y0 + x1) << 2;
      const idx01 = (srcPng.width * y1 + x0) << 2;
      const idx11 = (srcPng.width * y1 + x1) << 2;

      for (let c = 0; c < 3; c++) {
        const val =
          srcPng.data[idx00 + c] * (1 - xDiff) * (1 - yDiff) +
          srcPng.data[idx10 + c] * xDiff * (1 - yDiff) +
          srcPng.data[idx01 + c] * (1 - xDiff) * yDiff +
          srcPng.data[idx11 + c] * xDiff * yDiff;

        if (c === 0) r = Math.round(val);
        if (c === 1) g = Math.round(val);
        if (c === 2) b = Math.round(val);
      }
    } else {
      // background
      r = 15; g = 12; b = 11;
    }

    // Border highlight (subtle gold ring around edge)
    if (edgeDist <= 3.5) {
      const alpha = Math.min(edgeDist / 3.5, 1);
      // Gold #c9922a = [201, 146, 42]
      r = Math.round(r * 0.4 + 201 * 0.6);
      g = Math.round(g * 0.4 + 146 * 0.6);
      b = Math.round(b * 0.4 + 42 * 0.6);
    }

    // Anti-aliasing on the outermost boundary pixel
    let alpha = 255;
    if (edgeDist < 1) {
      alpha = Math.round(Math.max(0, Math.min(1, edgeDist)) * 255);
    }

    targetPng.data[tIdx] = r;
    targetPng.data[tIdx + 1] = g;
    targetPng.data[tIdx + 2] = b;
    targetPng.data[tIdx + 3] = alpha;
  }
}

// 4. Output PNG buffer
const outPngBuf = PNG.sync.write(targetPng);
fs.writeFileSync('public/favicon.png', outPngBuf);
fs.writeFileSync('public/apple-touch-icon.png', outPngBuf);
console.log('Saved public/favicon.png & apple-touch-icon.png, size:', outPngBuf.length);

// 5. Generate high-quality SVG embedding the data URI
const base64Png = outPngBuf.toString('base64');
const dataUrl = `data:image/png;base64,${base64Png}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%">
  <defs>
    <clipPath id="squircle">
      <rect x="0" y="0" width="256" height="256" rx="48" ry="48" />
    </clipPath>
  </defs>
  <rect width="256" height="256" rx="48" ry="48" fill="#0f0c0b" />
  <image href="${dataUrl}" width="256" height="256" />
  <rect x="1.5" y="1.5" width="253" height="253" rx="46.5" ry="46.5" fill="none" stroke="#c9922a" stroke-width="3" stroke-opacity="0.45" />
</svg>
`;

fs.writeFileSync('public/favicon.svg', svg, 'utf8');
console.log('Saved public/favicon.svg, size:', svg.length);
