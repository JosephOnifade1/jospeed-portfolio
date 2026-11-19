import { locationLabel, profile, profileSummary } from '../data/profile.js';
import { WORK_INDEX } from '../data/projects.js';
import { homeSchema } from './homeSchema.js';

// Share links identify the public portfolio, not the current preview host.
export const SITE_ORIGIN = 'https://buildwithjospeed.vercel.app';
export const siteUrl = (path) => new URL(path, SITE_ORIGIN).href;
export const caseCardPath = (id) => `/share/cases/${id}.jpg`;
export const cardSize = { width: 1200, height: 630 };
export const evidenceLabel = ({ visual }) =>
  visual ? [visual.label, visual.note].filter(Boolean).join(' / ') : 'Architecture diagram';

const homeTitle = `${profile.name} — ${profile.role}`;
const sections = {
  '/blog': [
    'Engineering blog',
    'Field notes by Joseph Onifade on mobile workflows, verifiable AI answers, web development and scoping freelance projects.',
  ],
  '/work': [
    'Project archive',
    'Explore Joseph Onifade’s mobile apps, web products and automation projects by discipline.',
  ],
  '/gallery': ['3D gallery', 'Browse the project covers and open a case study to see how it was built.'],
};

// Shared by the static HTML generator and the client router. Query parameters
// and fragments describe a view within a page, not a separate canonical page.
export function pageFor(pathname, posts) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') {
    return {
      path,
      title: homeTitle,
      description: profileSummary,
      schema: homeSchema(SITE_ORIGIN),
    };
  }
  const section = path === '/coverflow' ? '/gallery' : path;
  if (Object.hasOwn(sections, section)) {
    const [title, description] = sections[section];
    return { path: section, title: `${title} | JOspeed`, description };
  }
  const project = WORK_INDEX.find((p) => path === `/case-study/${p.id}`);
  if (project) {
    const title = `${project.name} — ${project.shareSubtitle}`;
    const image = caseCardPath(project.id);
    return {
      path,
      title,
      description: project.summary,
      image,
      imageSize: cardSize,
      imageAlt: `${title}. ${evidenceLabel(project)}.`,
      type: 'article',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: project.summary,
        image: siteUrl(image),
        mainEntityOfPage: siteUrl(path),
        author: { '@type': 'Person', name: 'Joseph Onifade', url: siteUrl('/') },
      },
    };
  }
  const post = posts.find((p) => path === `/blog/${p.slug}`);
  if (post) {
    return {
      path,
      title: `${post.title} | JOspeed Blog`,
      shareTitle: post.title,
      description: post.description,
      image: post.coverImage,
      imageAlt: `Cover for ${post.title}`,
      type: 'article',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: siteUrl(post.coverImage),
        datePublished: post.date,
        author: { '@type': 'Person', name: post.author, url: siteUrl('/') },
        publisher: {
          '@type': 'Organization',
          name: 'JOspeed',
          logo: { '@type': 'ImageObject', url: siteUrl('/apple-touch-icon.png') },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': siteUrl(path) },
      },
    };
  }
  return {
    title: 'Page not found | JOspeed',
    description: 'This portfolio page could not be found.',
    noindex: true,
  };
}

export const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

// Only these nodes are replaced on navigation. Keep stylesheets, icons,
// analytics and other document-level resources outside this owned set.
export function renderHead(page) {
  const meta = (key, value) =>
    `<meta data-page-head ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}">`;
  const tags = [
    `<title data-page-head>${escapeHtml(page.title)}</title>`,
    meta('description', page.description),
    meta(
      'robots',
      page.noindex
        ? 'noindex, follow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    ),
  ];
  if (page.noindex) return tags.join('\n');
  const canonical = escapeHtml(siteUrl(page.path));
  const image = siteUrl(page.image || '/og-image.png');
  const alt = page.imageAlt || 'JOspeed — Joseph Onifade’s developer portfolio';
  const title = page.shareTitle || page.title;
  tags.push(
    `<link data-page-head rel="canonical" href="${canonical}">`,
    meta('og:type', page.type || 'website'),
    meta('og:url', siteUrl(page.path)),
    meta('og:title', title),
    meta('og:description', page.description),
    meta('og:image', image),
    meta('og:image:secure_url', image),
    meta('og:image:alt', alt),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title),
    meta('twitter:description', page.description),
    meta('twitter:image', image),
    meta('twitter:image:alt', alt)
  );
  const size = page.imageSize || (!page.image && { width: 1847, height: 851 });
  if (size) tags.push(meta('og:image:width', size.width), meta('og:image:height', size.height));
  if (image.endsWith('.png')) tags.push(meta('og:image:type', 'image/png'));
  if (image.endsWith('.jpg')) tags.push(meta('og:image:type', 'image/jpeg'));
  if (page.path === '/') {
    tags.push(meta('geo.placename', locationLabel));
  }
  if (page.schema) {
    const json = JSON.stringify(page.schema).replaceAll('<', '\\u003c');
    tags.push(`<script data-page-head type="application/ld+json">${json}</script>`);
  }
  return tags.join('\n');
}
