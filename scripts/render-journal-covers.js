// Editorial plates for the Field Notes cover series. Only the rendered JPEGs go on the site.
import fs from 'node:fs/promises';
import sharp from 'sharp';

const out = 'public/projects/journal';
const label = (x, y, value, size = 22) =>
  `<text x="${x}" y="${y}" font-family="monospace" font-size="${size}" letter-spacing="2">${value}</text>`;
const display = (x, y, value, size) =>
  `<text x="${x}" y="${y}" font-family="serif" font-size="${size}">${value}</text>`;
const rule = (d, width = 2) => `<path d="${d}" stroke="currentColor" stroke-width="${width}" fill="none"/>`;

// Trace the same low-poly form in both views of the Blender → WebGL plate.
const facets = [
  ['-95,-32 -29,-84 -27,-27', '#f3c299'],
  ['-29,-84 63,-70 -27,-27', '#f5d7ae'],
  ['63,-70 42,-12 -27,-27', '#ecb184'],
  ['63,-70 98,-4 42,-12', '#cb805f'],
  ['98,-4 58,70 42,-12', '#a86254'],
  ['58,70 8,43 42,-12', '#b87057'],
  ['58,70 -26,84 8,43', '#8f594d'],
  ['-26,84 -90,46 8,43', '#b77961'],
  ['-90,46 -27,-27 8,43', '#d69670'],
  ['-90,46 -95,-32 -27,-27', '#eab285'],
  ['-27,-27 42,-12 8,43', '#dfa079'],
];
const mesh = (shaded) =>
  facets.map(([points, color]) => `<polygon points="${points}" fill="${shaded ? color : 'none'}"/>`).join('');

const plates = [
  {
    file: 'table-ticket',
    number: '01',
    desk: '#bbc89d',
    ink: '#203c33',
    name: 'SERVICE DESK',
    art: `<g transform="translate(278 116) rotate(5 320 175)">
      <rect x="14" y="18" width="643" height="343" rx="6" fill="#6d826a"/>
      <rect width="643" height="343" rx="6" fill="#e6a465"/>
      ${label(22, 315, 'QUEUE COPY   /   001', 18)}
    </g>
    <g transform="translate(228 149) rotate(-9 362 150)">
      <path d="M0 0H742V127a26 26 0 0 0 0 52v126H0V179a26 26 0 0 0 0-52z" fill="#f8f0d8" stroke="#315446" stroke-width="3"/>
      <path d="M541 1v303" stroke="#637961" stroke-width="3" stroke-dasharray="9 9"/>
      ${label(51, 55, 'TABLE-SIDE SERVICE', 24)}${rule('M51 74H482')}
      ${display(47, 244, '14', 188)}${label(301, 227, 'TABLE', 28)}
      ${label(573, 62, 'STAFF', 23)}${label(573, 95, 'COPY', 23)}
      <circle cx="641" cy="207" r="49" fill="#2f5547"/>
      <path d="m615 207 18 18 34-39" stroke="#eeedcd" stroke-width="10" fill="none"/>
    </g>`,
  },
  {
    file: 'source-margin',
    number: '02',
    desk: '#aabec2',
    ink: '#263f48',
    name: 'EVIDENCE DESK',
    art: `<g transform="rotate(6 600 321)"><rect x="367" y="106" width="491" height="421" fill="#758e93"/><rect x="354" y="93" width="491" height="421" fill="#e5dfc9"/></g>
    <g transform="rotate(-6 575 323)"><rect x="302" y="108" width="508" height="408" fill="#fbf3de" stroke="#354f58" stroke-width="3"/>
      ${label(339, 165, 'SOURCE PASSAGE', 22)}${rule('M339 186h433')}
      <path d="M340 235h375m-375 29h320m-320 30h387m-387 104h354m-354 29h279" stroke="#9da4a0" stroke-width="9"/>
      <path d="M329 314h409v52H329z" fill="#f2c569"/>
      ${label(345, 349, 'within 15 minutes', 27)}${label(680, 480, 'P.12', 25)}
    </g>
    <path d="M763 318q124 11 148-71" fill="none" stroke="#aa5637" stroke-width="4"/><circle cx="916" cy="201" r="61" fill="#b65d3c"/>
    <g fill="#fff0d9">${display(888, 227, '1', 80)}</g>`,
  },
  {
    file: 'first-delivery',
    number: '03',
    desk: '#d8b39c',
    ink: '#59382f',
    name: 'SCOPING DESK',
    art: `<g transform="rotate(-4 585 322)">
      <rect x="256" y="137" width="625" height="361" fill="#997666"/><rect x="244" y="123" width="625" height="361" fill="#f8ebce" stroke="#654838" stroke-width="3"/>
      <path d="M304 124v360" stroke="#c99175" stroke-width="2"/>
      ${label(343, 182, 'FIRST DELIVERY', 28)}${rule('M338 203h467')}
      <g fill="none" stroke="#785c4d" stroke-width="3"><path d="M345 237h28v28h-28zM345 308h28v28h-28zM345 380h28v28h-28z"/></g>
      <path d="m344 243 12 15 28-35" stroke="#49705a" fill="none" stroke-width="8"/>
      ${label(405, 261, 'Who uses it?', 25)}${label(405, 331, 'What changes?', 25)}${label(405, 404, 'What can wait?', 25)}
    </g>
    <g transform="translate(883 190) rotate(26)"><rect x="-14" y="0" width="28" height="231" rx="4" fill="#a95435"/><path d="M-5 4h8v227h-8z" fill="#db895a"/><path d="M-14 231h28L0 275z" fill="#f1d299"/><path d="m-5 258 5 17 5-17" fill="#463b35"/></g>`,
  },
  {
    file: 'link-proof',
    number: '04',
    desk: '#abaac3',
    ink: '#373648',
    name: 'WEB DESK',
    art: `<g transform="rotate(-6 462 297)"><rect x="248" y="125" width="415" height="334" rx="4" fill="#817e98"/><rect x="237" y="113" width="415" height="334" rx="4" fill="#f7edd8" stroke="#524d62" stroke-width="3"/>
      ${label(263, 160, '01 / HTML', 23)}${rule('M263 178h365')}
      <text x="264" y="260" font-size="65" font-family="monospace">&lt;head&gt;</text>
      <path d="M268 307h214m-214 30h302m-302 30h151" stroke="#b0a9b3" stroke-width="8"/></g>
    <g transform="rotate(7 776 351)"><rect x="604" y="216" width="375" height="282" rx="7" fill="#76738c"/><rect x="593" y="205" width="375" height="282" rx="7" fill="#313c48"/>
      <rect x="616" y="228" width="329" height="147" fill="#c3cfbd"/><circle cx="858" cy="270" r="22" fill="#ecd399"/>
      <path d="m616 368 104-104 78 69 48-38 99 69v11H616z" fill="#788f80"/>
      <g fill="#efedde">${label(621, 437, '02 / PREVIEW', 27)}</g></g>`,
  },
  {
    file: 'hybrid-index',
    number: '05',
    desk: '#d8c891',
    ink: '#384139',
    name: 'RETRIEVAL DESK',
    art: `<g transform="rotate(-3 600 326)">
      <path d="M266 352l54-70h621v160l-53 55H278z" fill="#aa9e72"/>
      <path d="M253 331l58-70h613l-50 70z" fill="#334a40"/>
      <g transform="rotate(-5 463 292)">
        <path d="M291 348V173q0-10 10-10h137l19 20h124q10 0 10 10v166z" fill="#fbefd0" stroke="#536352" stroke-width="3"/>
        ${label(317, 218, 'KEYWORDS', 24)}${rule('M315 234h245')}
        ${display(316, 305, 'Aa', 68)}<path d="M430 268h112m-112 24h80" stroke="#a8ac92" stroke-width="7"/>
      </g>
      <g transform="rotate(6 737 292)">
        <path d="M575 351V152q0-10 10-10h123l19 19h145q10 0 10 10v190z" fill="#d1dfca" stroke="#536352" stroke-width="3"/>
        ${label(604, 203, 'VECTORS', 24)}${rule('M602 220h252')}
        <path d="m624 280 58-33 74 42 68-43m-142 1 19 49 55-7" fill="none" stroke="#608679" stroke-width="3"/>
        <g fill="#426d61"><circle cx="624" cy="280" r="7"/><circle cx="682" cy="247" r="8"/><circle cx="701" cy="296" r="6"/><circle cx="756" cy="289" r="8"/><circle cx="824" cy="246" r="7"/></g>
      </g>
      <path d="M874 331l50-70v161l-50 60z" fill="#345345" stroke="#324d40" stroke-width="3"/>
      <rect x="253" y="331" width="621" height="151" rx="3" fill="#557461" stroke="#324d40" stroke-width="3"/>
      <rect x="391" y="366" width="347" height="79" rx="6" fill="#d2af70" stroke="#384c3f" stroke-width="3"/>
      <rect x="412" y="377" width="305" height="56" fill="#f5ecd2"/>
      <circle cx="402" cy="405" r="3"/><circle cx="727" cy="405" r="3"/>
      ${label(441, 415, 'HYBRID INDEX', 29)}
    </g>`,
  },
  {
    file: 'escrow-envelope',
    number: '06',
    desk: '#cdb3bb',
    ink: '#503c43',
    name: 'CONTRACT DESK',
    art: `<g transform="rotate(-5 581 288)">
      <rect x="332" y="143" width="529" height="283" fill="#9b828b"/>
      <rect x="322" y="132" width="529" height="283" fill="#f6ebd8" stroke="#6d5358" stroke-width="3"/>
      ${label(407, 173, 'SOLIDITY   /   CONTRACT', 24)}${rule('M349 194h472')}
      <path d="M353 226h249m-249 26h354" stroke="#c2b3a2" stroke-width="7"/>
    </g>
    <g transform="rotate(4 600 339)">
      <rect x="275" y="228" width="661" height="252" rx="5" fill="#a08385"/>
      <rect x="261" y="212" width="661" height="253" rx="5" fill="#e1bc91" stroke="#725747" stroke-width="3"/>
      <path d="m265 462 249-168h153l251 168z" fill="#eacc9f" stroke="#ab846a" stroke-width="2.5"/>
      <path d="M263 213h657L607 376q-16 9-32 0z" fill="#f0d8b3" stroke="#94755f" stroke-width="3"/>
      ${label(352, 440, 'ESCROW', 29)}
      <g transform="translate(591 365)">
        <path d="M-3-54c15-4 23 1 34 7s17 10 20 22 10 22 4 34-3 22-17 31-19 16-34 16-24 1-35-9-20-9-23-24-9-23-3-36 4-20 16-28 21-11 38-13z" fill="#9c4d43" stroke="#7f443f" stroke-width="4"/>
        <circle r="40" fill="#93493f" stroke="#c77e65" stroke-width="3"/>
        <g transform="rotate(-35)" stroke="#f0c19a" stroke-width="5" fill="none">
          <rect x="-28" y="-10" width="34" height="20" rx="10"/><rect x="-5" y="-10" width="33" height="20" rx="10"/>
        </g>
      </g>
    </g>`,
  },
  {
    file: 'mesh-study',
    number: '07',
    desk: '#a8c8bb',
    ink: '#304843',
    name: 'MODELING DESK',
    art: `<defs><pattern id="graph" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M0 22V0h22" fill="none" stroke="#adc2b9" stroke-width="1.5"/></pattern></defs>
    <g transform="rotate(-4 596 318)">
      <path d="M251 150h633l51 48v310H251z" fill="#78988b"/>
      <path d="M237 135h636l49 47v310H237z" fill="#f6efdb" stroke="#476058" stroke-width="3"/>
      <path d="M873 136v46h47" fill="#c5d2be" stroke="#749083" stroke-width="2"/>
      ${label(267, 183, 'FORM STUDY', 24)}${label(720, 183, 'GLB / 01', 21)}
      <rect x="261" y="204" width="637" height="220" fill="url(#graph)"/>
      <g transform="translate(408 319)" stroke="#47665f" stroke-width="2.6" stroke-linejoin="round">${mesh(false)}</g>
      ${rule('M548 317h61m-13-11 14 11-14 11', 3)}
      <g transform="translate(751 319)" stroke="#826756" stroke-width="1.4" stroke-linejoin="round">${mesh(true)}</g>
      ${rule('M263 432h632')}${label(354, 469, 'BLENDER', 23)}${label(716, 469, 'WEBGL', 23)}
    </g>`,
  },
];

await fs.mkdir(out, { recursive: true });
for (const { file, number, desk, ink, name, art } of plates) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs><pattern id="grain" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="${ink}" opacity=".18"/></pattern></defs>
    <rect width="1200" height="630" fill="${desk}"/><rect width="1200" height="630" fill="url(#grain)"/>
    <g fill="${ink}" color="${ink}">${rule('M58 93h1084M58 537h1084', 1.5)}
      ${label(58, 69, 'JOSPEED   /   FIELD NOTES', 21)}${label(979, 69, `PLATE  ${number}`, 21)}
      ${art}${label(59, 587, name, 20)}${label(898, 587, 'WORKING NOTES', 20)}
    </g></svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(`${out}/${file}.jpg`);
}
