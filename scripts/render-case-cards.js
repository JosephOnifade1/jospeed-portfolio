// Offline artwork tool. Only the final small JPEGs ship; rendering never runs
// in a visitor's browser or depends on fonts being installed on the web host.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { WORK_INDEX } from '../src/data/projects.js';
import { cardSize } from '../src/data/brand.js';
import { caseCardPath, escapeHtml as esc, evidenceLabel } from '../src/seo/pageHead.js';
import { wordmark } from './brand-mark.js';

const svg = (w, h, body) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`
  );
const mono = (x, y, text, color = '#b5bfae', size = 19) =>
  `<text x="${x}" y="${y}" fill="${color}" font-family="monospace" font-size="${size}" letter-spacing="1">${esc(text)}</text>`;
const text = (x, y, label, size, color = '#f5f4ee', weight = 400) =>
  `<text x="${x}" y="${y}" fill="${color}" font-family="sans-serif" font-size="${size}" font-weight="${weight}">${esc(label)}</text>`;
const folio = (n) => String(n).padStart(2, '0');

function lines(value, font, color) {
  // Pango measures and wraps whole words within the left column.
  return sharp({
    text: {
      text: `<span foreground="${color}">${esc(value)}</span>`,
      font,
      width: 545,
      wrap: 'word',
      rgba: true,
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
}

async function plate(project) {
  const w = 514,
    h = 316;
  if (!project.visual) {
    // Use the actual components of this build, not a pretend product screenshot.
    const rows = project.architecture.nodes
      .map(({ role, tech }, i) => {
        const y = 62 + i * 94;
        return (
          `<circle cx="47" cy="${y}" r="16" fill="#203227" stroke="#8a9e82"/>` +
          mono(35, y + 6, folio(i + 1), '#d8f36a', 17) +
          text(88, y + 1, role, 28, '#f3f4ed', 700) +
          text(88, y + 32, tech, 21, '#c2cdbf')
        );
      })
      .join('');
    return svg(
      w,
      h,
      `<rect width="100%" height="100%" fill="#1a261e"/><path d="M47 62v188" stroke="#8a9e82" stroke-dasharray="4 6"/>${rows}`
    );
  }
  const workflow = project.visual.kind === 'workflow';
  const artwork = sharp(path.join('public', project.visual.src)).resize(w, h, {
    fit: workflow ? 'cover' : 'contain',
    background: project.visual.theme === 'paper' ? '#e9e8de' : '#0f1317',
  });
  if (workflow) {
    const { exampleTime, service } = project.sample;
    const slip = svg(
      236,
      128,
      `<rect width="236" height="128" rx="7" fill="#f3f1dc"/>
      ${mono(17, 27, 'SAMPLE BOOKING', '#46503b', 15)}${text(16, 69, exampleTime, 37, '#172116', 700)}
      <path d="M16 83h203" stroke="#bdc2ab"/>${text(16, 109, `${service} · Booked`, 15, '#283424')}`
    );
    artwork.composite([{ input: slip, left: 24, top: 160 }]);
  }
  return artwork.png().toBuffer();
}

for (const [i, project] of WORK_INDEX.entries()) {
  const number = folio(i + 1);
  const label = evidenceLabel(project);
  const title = await lines(project.name, 'sans-serif bold 68', '#f5f4ee');
  const subtitle = await lines(project.shareSubtitle, 'sans-serif 32', '#ced6c6');
  const groupHeight = title.info.height + 24 + subtitle.info.height;
  const top = 205 + Math.max(0, Math.round((239 - groupHeight) / 2));
  const canvas = svg(
    cardSize.width,
    cardSize.height,
    `
    <rect width="1200" height="630" fill="#111710"/>
    ${wordmark(56, 76, 40)}
    ${mono(890, 72, `WORK INDEX  /  ${number}—${folio(WORK_INDEX.length)}`)}
    <path d="M56 113h1088 M56 531h1088" stroke="#49513f"/>
    <path d="M56 175h31" stroke="#d8f36a" stroke-width="3"/>
    ${mono(102, 181, (project.discipline || project.category).toUpperCase(), '#d8f36a', 19)}
    <rect x="628" y="146" width="516" height="318" fill="#737b69"/>
    <path d="M628 487h14m-7-7v14" stroke="#d8f36a" stroke-width="2"/>
    ${mono(656, 495, label.toUpperCase(), '#d9dfd4', 22)}
    ${mono(56, 586, 'CASE STUDY', '#d8f36a')}${text(917, 587, 'Joseph Onifade', 27)}
  `
  );
  const target = path.join('public', caseCardPath(project.id));
  await fs.mkdir(path.dirname(target), { recursive: true });
  await sharp(canvas)
    .composite([
      { input: title.data, left: 53, top },
      { input: subtitle.data, left: 56, top: top + title.info.height + 24 },
      { input: await plate(project), left: 629, top: 147 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(target);
  console.log(target);
}
