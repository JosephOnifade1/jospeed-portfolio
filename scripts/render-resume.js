// An offline authoring tool, not part of the site build. The public PDF has
// selectable text and ordinary links; downloading it never needs JavaScript.
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { locationLabel, profile } from '../src/data/profile.js';
import { WORK_INDEX } from '../src/data/projects.js';
import { escapeHtml as esc, siteUrl } from '../src/seo/pageHead.js';

// Curate contributions, not a guessed employment timeline. Names, roles,
// platforms, stacks and destinations come from the public portfolio records.
const experience = [
  ['revive-touch', [
    'Designed and built a mobile app for poker tournament players to book on-site massages. Players choose an available time and receive a booking confirmation.',
    'Implemented live availability and the scheduling tools therapists and admins use to manage slots and see bookings.',
  ]],
  ['quivellox', [
    'Built a retrieval-augmented generation (RAG) workspace for uploaded PDFs. Split documents into passages, indexed their embeddings in Postgres and retrieved context for each question.',
    'Linked answers to the original page and passage so readers can check the evidence without leaving the conversation.',
  ]],
  ['borynx', [
    'Built topic feeds, voting and freelancer profiles for a community web app. Used optimistic updates so a vote appears while it saves.',
    'Used PostgreSQL full-text search for posts and Supabase row-level security to keep communities separate.',
  ]],
];
const link = (href, label) => `<a href="${esc(href)}">${esc(label)}</a>`;
const projectEntries = experience.map(([id, points]) => {
  const p = WORK_INDEX.find((project) => project.id === id);
  if (!p) throw new Error(`Unknown résumé project: ${id}`);
  return `<article>
    <h3>${link(siteUrl(`/case-study/${p.id}`), p.name)} <span> / ${esc(p.discipline)}</span></h3>
    <p class="position">${esc([p.role, p.platforms].filter(Boolean).join(' · '))}</p>
    <ul>${points.map((point) => `<li>${esc(point)}</li>`).join('')}</ul>
    <p class="stack"><b>Tools</b> &nbsp;${esc(p.stack.join(' · '))}</p>
  </article>`;
}).join('\n');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(profile.name)} — Résumé</title>
<style>
  @page { size: A4; margin: 16mm 18mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 10.5pt/1.45 'DejaVu Sans', sans-serif; color: #19231e; }
  h1, h2, h3, p { margin: 0; }
  a { color: #194e40; text-underline-offset: 1.8pt; }
  header { padding: 3mm 0 4.5mm; border-block: 2pt solid #284f41; }
  .folio, h2 { font-size: 9pt; font-weight: 700; letter-spacing: 1.3pt; text-transform: uppercase; color: #375948; }
  h1 { margin: 2mm 0 0.5mm; font-size: 31pt; line-height: 1.14; letter-spacing: -1.45pt; }
  .role { font-size: 14pt; line-height: 1.4; }
  address { margin-top: 3mm; font-size: 9.7pt; line-height: 1.65; font-style: normal; }
  section { margin-top: 5mm; }
  h2 { margin-bottom: 1.8mm; }
  article { break-inside: avoid; }
  article + article { border-top: .6pt solid #d2dbd3; margin-top: 3.5mm; padding-top: 3mm; }
  h3 { font-size: 14pt; line-height: 1.4; }
  h3 a { color: #19231e; text-decoration-thickness: .7pt; }
  h3 span, .position, .stack { font-size: 9.6pt; }
  h3 span { font-weight: 400; color: #4b5f52; }
  .position { font-weight: 700; margin-top: .5mm; }
  ul { margin: 1.6mm 0; padding-left: 5mm; }
  li + li { margin-top: .7mm; }
  .stack { color: #405447; }
  .writing { border-top: .8pt solid #809083; padding-top: 3mm; }
</style></head><body>
<header>
  <p class="folio">Project résumé</p>
  <h1>${esc(profile.name)}</h1>
  <p class="role">${esc(profile.role)}</p>
  <address>${esc(locationLabel)} &nbsp;·&nbsp; ${link(`mailto:${profile.email}`, profile.email)}<br>
    ${link(siteUrl('/'), new URL(siteUrl('/')).host)} &nbsp;·&nbsp;
    ${link(profile.github, profile.github.replace('https://', ''))} &nbsp;·&nbsp; ${link(profile.linkedin, 'LinkedIn')}
  </address>
</header>
<main>
  <section><h2>Profile</h2>
    <p>I build TypeScript applications for mobile and the web, from interface design to the data behind it.
    My work includes real-time scheduling, document retrieval and community publishing tools.</p>
  </section>
  <section><h2>Selected project experience</h2>${projectEntries}</section>
  <section class="writing"><h2>Technical writing</h2>
    <p>${link(siteUrl('/blog'), 'Engineering field notes')} on verifying AI citations, designing booking flows and testing link previews.</p>
  </section>
</main></body></html>`;

const target = path.join('public', profile.resume);
await fs.mkdir(path.dirname(target), { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ offline: true });
  await page.setContent(html);
  await page.pdf({ path: target, preferCSSPageSize: true, printBackground: true, tagged: true, outline: true });
  console.log(`Rendered ${target}`);
} finally {
  await browser.close();
}
