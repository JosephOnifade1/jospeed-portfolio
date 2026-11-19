import fs from 'node:fs';
import path from 'node:path';
import { WORK_INDEX } from '../src/data/projects.js';
import { companionFor } from '../src/utils/companionReading.js';
import { parsePost } from '../src/utils/parsePost.js';
import { caseCardPath, escapeHtml, pageFor, renderHead, siteUrl } from '../src/seo/pageHead.js';

function readPosts() {
  return fs
    .readdirSync('content/blog')
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => parsePost(file.slice(0, -3), fs.readFileSync(path.join('content/blog', file), 'utf8')))
    .sort((a, b) => b.date.localeCompare(a.date));
}
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
  const priorities = { '/': '1.0', '/blog': '0.9', '/gallery': '0.7' };
  const urls = routes(posts).map((route) => {
    const post = posts.find((p) => route === `/blog/${p.slug}`);
    return [
      '  <url>',
      `    <loc>${escapeHtml(siteUrl(route))}</loc>`,
      ...(post ? [`    <lastmod>${escapeHtml(post.date)}</lastmod>`] : []),
      `    <changefreq>${route === '/' || route === '/blog' ? 'daily' : 'weekly'}</changefreq>`,
      `    <priority>${priorities[route] || '0.8'}</priority>`,
      '  </url>',
    ].join('\n');
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function fallbackLinks(path, posts) {
  if (path === '/blog') return posts.map((p) => [`/blog/${p.slug}`, p.title]);
  if (path === '/work' || path === '/gallery') return WORK_INDEX.map((p) => [`/case-study/${p.id}`, p.name]);
  const companion = companionFor(path, posts);
  return [
    ...(companion ? [[companion.href, companion.label]] : []),
    ['/work', 'Project archive'],
    ['/blog', 'Blog'],
  ];
}

const marker = '<!--page-head-->';
function documentFor(template, pathname, posts) {
  const page = pageFor(pathname, posts);
  const html = template.replace(marker, () => renderHead(page));
  // Real navigation for readers without JavaScript, not hidden crawler-only text.
  const links = fallbackLinks(page.path, posts).map(
    ([href, label]) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`
  );
  const summary = `<noscript><main class="static-summary wrap"><h1>${escapeHtml(page.shareTitle || page.title)}</h1><p>${escapeHtml(page.description)}</p><nav>${links.join(' · ')}</nav></main></noscript>`;
  return html.replace('<div id="root"></div>', () => `<div id="root">${summary}</div>`);
}

export function portfolioPages() {
  return {
    name: 'portfolio-static-pages',
    enforce: 'post',
    buildStart() {
      const posts = readPosts();
      for (const project of WORK_INDEX) {
        if (!project.shareSubtitle || !fs.existsSync(path.join('public', caseCardPath(project.id)))) {
          throw new Error(
            `Missing share copy or artwork for ${project.id}. Update projects.js and run npm run share:images.`
          );
        }
      }
      for (const post of posts) {
        if (post.relatedProject && !WORK_INDEX.some((p) => p.id === post.relatedProject)) {
          throw new Error(`Unknown relatedProject in ${post.slug}: ${post.relatedProject}`);
        }
      }
      fs.writeFileSync('public/sitemap.xml', sitemap(posts));
      fs.writeFileSync(
        'public/robots.txt',
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl('/sitemap.xml')}\n`
      );
    },
    transformIndexHtml(html, ctx) {
      // Dev also answers unfurl requests without needing a browser. In a build,
      // keep the slot until Vite has finished resolving JS and CSS asset names.
      if (!ctx.server) return html;
      const { pathname } = new URL(ctx.originalUrl || ctx.path, 'http://vite.local');
      return documentFor(html, pathname === '/index.html' ? '/' : pathname, readPosts());
    },
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const shell = bundle['index.html'];
        if (!shell?.source.includes(marker))
          throw new Error('Cannot find the page-head slot in the built HTML.');
        const template = shell.source;
        const posts = readPosts();
        const paths = [...routes(posts), '/coverflow', '/404'];
        for (const pathname of paths) {
          const source = documentFor(template, pathname, posts);
          if (pathname === '/') shell.source = source;
          else this.emitFile({ type: 'asset', fileName: `${pathname.slice(1)}.html`, source });
        }
        this.info(
          `Generated ${paths.length} HTML entry points, including ${WORK_INDEX.length} case studies.`
        );
      },
    },
    configurePreviewServer(server) {
      // Match Vercel's cleanUrls/trailingSlash policy: Vite normally looks for
      // /foo/index.html on a request for /foo/, missing the real /foo.html.
      const pages = new Set([...routes(readPosts()), '/coverflow']);
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://vite.local');
        const clean = url.pathname.replace(/\/+$/, '');
        if (url.pathname !== clean && pages.has(clean)) {
          res.writeHead(308, { Location: clean + url.search }).end();
        } else next();
      });
    },
  };
}
