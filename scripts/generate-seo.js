import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://jospeedtech.vercel.app';
const BLOG_DIR = path.resolve('content/blog');
const DIST_DIR = path.resolve('dist');
const PUBLIC_DIR = path.resolve('public');

function getBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.(md|mdx)$/, '');
    return {
      slug,
      title: data.title || 'Untitled Post',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Joseph Onifade',
      category: data.category || 'Engineering',
      tags: data.tags || [],
      coverImage: data.coverImage || '/projects/quivellox-preview.png',
      content,
    };
  });
}

function generateSitemap(posts) {
  const staticRoutes = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/blog', changefreq: 'daily', priority: '0.9' },
    { loc: '/gallery', changefreq: 'weekly', priority: '0.7' },
  ];

  const blogRoutes = posts.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const allUrls = [...staticRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  if (fs.existsSync(PUBLIC_DIR)) fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
  if (fs.existsSync(DIST_DIR)) fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml);
  console.log(`✓ Generated sitemap.xml with ${allUrls.length} routes.`);
}

function generateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  if (fs.existsSync(PUBLIC_DIR)) fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
  if (fs.existsSync(DIST_DIR)) fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
  console.log('✓ Generated robots.txt');
}

function prerenderBlogPages(posts) {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.log('Dist index.html not found, skipping SSG prerender.');
    return;
  }
  const template = fs.readFileSync(indexPath, 'utf8');

  // 1. Prerender /blog index page
  const blogDir = path.join(DIST_DIR, 'blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  const blogIndexMeta = `
    <title>Engineering Blog &amp; Technical Notes | JOspeed</title>
    <meta name="description" content="Technical deep-dives on AI agent architectures, RAG systems, smart contracts, and creative engineering workflows by Joseph Onifade." />
    <link rel="canonical" href="${BASE_URL}/blog" />
    <meta property="og:title" content="Engineering Blog | JOspeed" />
    <meta property="og:description" content="Deep-dives on AI agent architectures, RAG, smart contracts, and creative engineering workflows." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${BASE_URL}/blog" />
    <meta property="og:image" content="${BASE_URL}/jospeed-hero-artwork.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Engineering Blog | JOspeed" />
    <meta name="twitter:description" content="Technical deep-dives on AI agent architectures, RAG, and Web3." />
    <meta name="twitter:image" content="${BASE_URL}/jospeed-hero-artwork.png" />
  `;
  const blogHtml = template.replace(/<title>.*?<\/title>/, '').replace('</head>', `${blogIndexMeta}\n</head>`);
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml);
  console.log('✓ Prerendered /blog static entrypoint');

  // 2. Prerender each individual /blog/[slug]
  posts.forEach((post) => {
    const postDir = path.join(DIST_DIR, 'blog', post.slug);
    if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });

    const postCanonical = `${BASE_URL}/blog/${post.slug}`;
    const coverFull = `${BASE_URL}${post.coverImage}`;

    const schemaJson = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: coverFull,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
        url: BASE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'JOspeed',
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/apple-touch-icon.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postCanonical,
      },
    };

    const postMeta = `
    <title>${post.title} | JOspeed Blog</title>
    <meta name="description" content="${post.description.replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="${postCanonical}" />
    <meta property="og:title" content="${post.title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${post.description.replace(/"/g, '&quot;')}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${postCanonical}" />
    <meta property="og:image" content="${coverFull}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${post.title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${post.description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${coverFull}" />
    <meta name="twitter:creator" content="@buildwithjospeed" />
    <script type="application/ld+json">${JSON.stringify(schemaJson)}</script>
    `;

    // Static crawler fallback inside root for non-JS web crawlers
    const crawlerFallback = `
    <div id="seo-crawler-content" style="display:none;" aria-hidden="true">
      <h1>${post.title}</h1>
      <p>${post.description}</p>
      <time datetime="${post.date}">${post.date}</time>
      <span>Author: ${post.author}</span>
    </div>`;

    let postHtml = template.replace(/<title>.*?<\/title>/, '');
    postHtml = postHtml.replace('</head>', `${postMeta}\n</head>`);
    postHtml = postHtml.replace('<div id="root"></div>', `<div id="root">${crawlerFallback}</div>`);

    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml);
    console.log(`✓ Prerendered static SEO route: /blog/${post.slug}`);
  });
}

function run() {
  console.log('--- Generating SEO Assets & Sitemaps ---');
  const posts = getBlogPosts();
  console.log(`Found ${posts.length} markdown articles.`);
  generateSitemap(posts);
  generateRobots();
  prerenderBlogPages(posts);
  console.log('--- SEO Generation Complete ---');
}

run();

