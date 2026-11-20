import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { brand } from '../src/data/brand.js';
import { profile } from '../src/data/profile.js';
import { WORK_INDEX } from '../src/data/projects.js';
import { readPublishedPosts } from './blog-content.js';
import { caseCardPath, escapeHtml, pageFor, renderHead, siteUrl } from '../src/seo/pageHead.js';

function routes(posts) {
  return [
    '/',
    '/blog',
    '/work',
    '/gallery',
    ...WORK_INDEX.map((p) => `/case-study/${p.id}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
}

function sitemap(posts) {
  // A publication date isn't necessarily the last modification. List canonical
  // URLs without synthesizing freshness dates or update schedules.
  const urls = routes(posts).map((route) => `  <url><loc>${escapeHtml(siteUrl(route))}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

const headSlot = '<!--page-head-->';
const rootSlot = '<div id="root"></div>';
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl('/sitemap.xml')}\n`;
const entries = (posts) => [...routes(posts), '/coverflow', '/404'];
const filename = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);

function documentFor(template, pathname, posts, renderBody) {
  if (!template.includes(headSlot) || !template.includes(rootSlot)) {
    throw new Error('Missing head or root slot in the HTML template.');
  }
  return template
    .replace(headSlot, () => renderHead(pageFor(pathname, posts)))
    .replace(
      rootSlot,
      () => `<div id="root" data-page="${escapeHtml(pathname)}">${renderBody(pathname)}</div>`
    );
}

function validateContent(posts) {
  if (!fs.existsSync(path.join('public', profile.resume))) {
    throw new Error(`Missing résumé at ${profile.resume}. Supply the PDF or run npm run resume:pdf.`);
  }
  for (const url of [brand.mark, brand.logo, brand.shareImage]) {
    if (!fs.existsSync(path.join('public', url))) {
      throw new Error(`Missing brand asset ${url}. Run npm run brand:assets.`);
    }
  }
  for (const project of WORK_INDEX) {
    if (!project.shareSubtitle || !fs.existsSync(path.join('public', caseCardPath(project.id)))) {
      throw new Error(`Missing share copy or artwork for ${project.id}. Run npm run share:images.`);
    }
  }
  for (const post of posts) {
    if (post.relatedProject && !WORK_INDEX.some((p) => p.id === post.relatedProject)) {
      throw new Error(`Unknown relatedProject in ${post.slug}: ${post.relatedProject}`);
    }
    if (post.coverImage.startsWith('/') && !fs.existsSync(path.join('public', post.coverImage))) {
      throw new Error(`Missing cover image for ${post.slug}: ${post.coverImage}`);
    }
  }
}

export async function buildPortfolio({ build, environments: { client, ssr } }) {
  const posts = readPublishedPosts();
  validateContent(posts);
  await build(client);
  await build(ssr);
  const out = path.resolve(client.config.build.outDir);
  const renderer = path.resolve(ssr.config.build.outDir, 'entry-static.js');
  const { renderBody } = await import(pathToFileURL(renderer).href);
  const template = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
  for (const route of entries(posts)) {
    const file = path.join(out, filename(route));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, documentFor(template, route, posts, renderBody));
  }
  fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap(posts));
  fs.writeFileSync(path.join(out, 'robots.txt'), robots);
  client.config.logger.info(
    `Prerendered ${entries(posts).length} pages; ${routes(posts).length} canonical URLs in sitemap.`
  );
}

// Vercel serves the flat HTML files with cleanUrls and no trailing slash. Mirror
// that policy in dev/preview, retaining the query but never redirecting off-site.
function redirectPath(pathname, known) {
  const clean =
    pathname
      .replace(/\/+$/, '')
      .replace(/\.html$/, '')
      .replace(/\/index$/, '') || '/';
  return clean !== pathname && known.has(clean) ? clean : null;
}
function send(res, status, type, content, method) {
  res.writeHead(status, { 'Content-Type': `${type}; charset=utf-8` });
  res.end(method === 'HEAD' ? undefined : content);
}
const isPageRequest = (url) => !/\.[^/]+$/.test(url.pathname) || url.pathname.endsWith('.html');

export function portfolioPages() {
  return {
    name: 'portfolio-static-pages',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!['GET', 'HEAD'].includes(req.method)) return next();
        try {
          const url = new URL(req.url, 'http://vite.local');
          if (url.pathname === '/robots.txt') return send(res, 200, 'text/plain', robots, req.method);
          if (url.pathname === '/sitemap.xml')
            return send(res, 200, 'application/xml', sitemap(readPublishedPosts()), req.method);
          // Leave Vite's module requests, file assets and HMR transport alone.
          if (!isPageRequest(url) || /^\/(?:@|__|node_modules\/|src\/)/.test(url.pathname)) return next();
          const posts = readPublishedPosts();
          const known = new Set(entries(posts));
          const redirect = redirectPath(url.pathname, known);
          if (redirect) return res.writeHead(308, { Location: redirect + url.search }).end();
          const route = known.has(url.pathname) ? url.pathname : '/404';
          const { renderBody } = await server.ssrLoadModule('/src/entry-static.jsx');
          const shell = await server.transformIndexHtml('/index.html', fs.readFileSync('index.html', 'utf8'));
          send(
            res,
            route === '/404' ? 404 : 200,
            'text/html',
            documentFor(shell, route, posts, renderBody),
            req.method
          );
        } catch (error) {
          next(error);
        }
      });
    },
    configurePreviewServer(server) {
      // Inspect the actual build, not the Markdown currently on disk. A draft
      // edit doesn't change the pages served until the next successful build.
      const out = path.resolve(server.config.build.outDir);
      const known = new Set(
        fs
          .readdirSync(out, { recursive: true })
          .filter((file) => file.endsWith('.html'))
          .map((file) => (file === 'index.html' ? '/' : `/${file.split(path.sep).join('/').slice(0, -5)}`))
      );
      server.middlewares.use((req, res, next) => {
        if (!['GET', 'HEAD'].includes(req.method)) return next();
        const url = new URL(req.url, 'http://vite.local');
        const redirect = redirectPath(url.pathname, known);
        if (redirect) return res.writeHead(308, { Location: redirect + url.search }).end();
        if (isPageRequest(url) && (!known.has(url.pathname) || url.pathname === '/404')) {
          return send(res, 404, 'text/html', fs.readFileSync(path.join(out, '404.html')), req.method);
        }
        next();
      });
    },
  };
}
