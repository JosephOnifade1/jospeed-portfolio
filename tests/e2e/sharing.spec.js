import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { WORK_INDEX } from '../../src/data/projects.js';
import { readPublishedPosts } from '../../scripts/blog-content.js';
import { mockExternalServices } from './support/network.js';

const origin = 'https://buildwithjospeed.vercel.app';
const portfolioCard = `${origin}/share/jospeed-portfolio.jpg`;
const publisherLogo = { url: `${origin}/brand/jospeed-logo.png`, width: 512, height: 512 };
const rag = '/blog/getting-started-with-rag-2025';
const quivellox = '/case-study/quivellox';
const caseTitles = {
  'revive-touch': 'Revive Touch — Massage bookings at poker tournaments',
  quivellox: 'Quivellox — Document Q&A with PDF citations',
  borynx: 'Borynx — A topic feed for freelancers',
  'fiverr-scout': 'Fiverr Scout — Freelance niche research',
  'ai-missed-call': 'AI Missed-Call Recovery — SMS follow-up for dental clinics',
  'ai-client-finder': 'AI Client Finder Bot — Freelance leads in Telegram',
  homeplate: 'HomePlate — A marketplace for home-cooked meals',
  'ai-strategy-coach': 'AI Strategy Coach — Conversational business coaching',
};
const canonical = (page) => page.locator('head link[rel="canonical"]');
const meta = (page, key) =>
  page.locator(`head meta[${key.startsWith('og:') ? 'property' : 'name'}="${key}"]`);
const schema = (page) => page.locator('head script[type="application/ld+json"]');

// Tags point at production; read the bytes from the deployment under test.
async function readImage(request, url, type, width, height) {
  const { pathname, search } = new URL(url, origin);
  const res = await request.get(pathname + search);
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type'].split(';')[0]).toBe(type);
  const buffer = await res.body();
  const image = sharp(buffer);
  expect(await image.metadata()).toMatchObject({ format: type.slice(6).split('+')[0], width, height });
  await image.resize(1, 1).raw().toBuffer(); // Decode the image, not just its header.
  return buffer;
}

test.beforeEach(mockExternalServices);

test.describe('crawler reads the built HTML', () => {
  test.use({ javaScriptEnabled: false });

  test('the portfolio card, publisher logo and tab icons work in the first response', async ({
    page,
    request,
  }) => {
    await page.goto('/');
    for (const key of ['og:image', 'og:image:secure_url', 'twitter:image']) {
      await expect(meta(page, key)).toHaveAttribute('content', portfolioCard);
    }
    const alt = await meta(page, 'og:image:alt').getAttribute('content');
    expect(alt).toMatch(/Joseph Onifade.*Ibadan, Nigeria.*wordmark.*visor/);
    await expect(meta(page, 'twitter:image:alt')).toHaveAttribute('content', alt);
    await expect(meta(page, 'og:image:type')).toHaveAttribute('content', 'image/jpeg');
    await expect(meta(page, 'og:image:width')).toHaveAttribute('content', '1200');
    await expect(meta(page, 'og:image:height')).toHaveAttribute('content', '630');
    const graph = JSON.parse(await schema(page).textContent())['@graph'];
    expect(graph.find((item) => item['@type'] === 'WebPage').primaryImageOfPage).toMatchObject({
      url: portfolioCard,
      width: 1200,
      height: 630,
    });
    expect(graph.find((item) => item['@type'] === 'ProfessionalService').logo).toMatchObject(publisherLogo);
    await readImage(request, portfolioCard, 'image/jpeg', 1200, 630);
    await readImage(request, publisherLogo.url, 'image/png', 512, 512);
    await readImage(request, '/og-image.png', 'image/png', 1200, 630);

    const home = page.getByRole('banner').getByRole('link', { name: 'JOspeed home' });
    const footer = page.getByRole('contentinfo').getByRole('link', { name: 'JOspeed', exact: true });
    for (const link of [home, footer]) {
      await expect(link).toHaveAttribute('href', '/');
      await expect(link).toHaveText('speed'); // The graphic supplies JO; don't spell it twice.
      await expect(link.getByRole('img', { name: 'JOspeed', exact: true })).toBeVisible();
      await expect(link.locator('img')).toHaveAttribute('src', '/brand/jospeed-mark.svg');
      await expect(link.locator('img')).toHaveAttribute('alt', '');
    }
    await readImage(request, '/brand/jospeed-mark.svg', 'image/svg+xml', 108, 70);
    for (const [selector, sizes, type, px] of [
      ['[rel="icon"][type="image/svg+xml"]', 'any', 'image/svg+xml', 64],
      ['[rel="icon"][type="image/png"]', '32x32', 'image/png', 32],
      ['[rel="apple-touch-icon"]', '180x180', 'image/png', 180],
    ]) {
      const icon = page.locator(`head link${selector}`);
      await expect(icon).toHaveAttribute('sizes', sizes);
      await readImage(request, await icon.getAttribute('href'), type, px, px);
    }
  });

  test('each case has one canonical card and a distinct, decodable share image', async ({
    page,
    request,
  }) => {
    const images = new Set();
    const descriptions = new Set();
    const sitemap = await (await request.get('/sitemap.xml')).text();
    for (const [id, title] of Object.entries(caseTitles)) {
      const path = `/case-study/${id}`;
      const url = origin + path;
      const image = `${origin}/share/cases/${id}.jpg`;
      const entry = id === 'revive-touch' ? `${path}/?utm_source=message` : path;
      expect((await page.goto(entry)).status()).toBe(200);
      await expect(page.locator('head title')).toHaveCount(1);
      await expect(page).toHaveTitle(title);
      const project = WORK_INDEX.find((p) => p.id === id);
      const article = page.locator('main article');
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(article.locator('h1')).toHaveText(project.name);
      await expect(article).toContainText(project.caseStudy.problem);
      await expect(article).toContainText(project.caseStudy.approach);
      await expect(article).toContainText(project.caseStudy.outcome);
      await expect(article.locator('.case-decisions li')).toHaveText(project.caseStudy.decisions);
      await expect(article.locator('.case-stack li')).toHaveText(project.stack);
      await expect(canonical(page)).toHaveAttribute('href', url);
      await expect(meta(page, 'og:url')).toHaveAttribute('content', url);
      const description = await meta(page, 'description').getAttribute('content');
      expect(description.length).toBeGreaterThan(30);
      descriptions.add(description);
      for (const prefix of ['og', 'twitter']) {
        await expect(meta(page, `${prefix}:title`)).toHaveAttribute('content', title);
        await expect(meta(page, `${prefix}:description`)).toHaveAttribute('content', description);
        await expect(meta(page, `${prefix}:image`)).toHaveAttribute('content', image);
        await expect(meta(page, `${prefix}:image:alt`)).toHaveAttribute(
          'content',
          /illustration|sample data|diagram/i
        );
      }
      await expect(meta(page, 'twitter:card')).toHaveAttribute('content', 'summary_large_image');
      await expect(meta(page, 'og:image:width')).toHaveAttribute('content', '1200');
      await expect(meta(page, 'og:image:height')).toHaveAttribute('content', '630');
      expect(JSON.parse(await schema(page).textContent())).toMatchObject({
        '@type': 'Article',
        headline: title,
        image,
      });
      expect(sitemap).toContain(`<loc>${url}</loc>`);
      const buffer = await readImage(request, image, 'image/jpeg', 1200, 630);
      images.add(createHash('sha256').update(buffer).digest('hex'));
    }
    expect(images.size).toBe(8);
    expect(descriptions.size).toBe(8);
    expect(await (await request.get('/robots.txt')).text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
    await page.goto(rag);
    await expect(canonical(page)).toHaveAttribute('href', origin + rag);
    expect(JSON.parse(await schema(page).textContent())).toMatchObject({
      '@type': 'BlogPosting',
      publisher: { logo: publisherLogo },
    });
    const guide = page.locator('main article');
    await expect(guide.getByRole('heading', { name: '2. The Production Architecture' })).toBeVisible();
    await expect(guide.locator('pre').first()).toContainText('Reciprocal Rank Fusion (RRF)');
    await expect(guide.locator('pre').nth(1)).toContainText('FUNCTION hybrid_document_search');
    await page.getByRole('link', { name: 'See Quivellox in action' }).click();
    await expect(page.getByRole('link', { name: 'Read how I built this' })).toHaveAttribute('href', rag);
    await expect(page.locator('#source-1 blockquote')).toContainText('within 15 minutes');
  });
});

test('a reader can move between the case and the build note without stale share metadata', async ({
  page,
}) => {
  await page.goto(`${quivellox}?from=reader`);
  const note = page.getByRole('link', { name: 'Read how I built this', exact: true });
  await expect(note).toHaveAttribute('href', rag);
  await note.press('Enter');
  await expect(page.locator('h1')).toBeFocused();
  await expect(page.getByRole('heading', { name: '1. The Real Challenges with Naive RAG' })).toBeVisible();
  await expect(canonical(page)).toHaveAttribute('href', origin + rag);
  const guide = readPublishedPosts().find((post) => `/blog/${post.slug}` === rag);
  await expect(meta(page, 'og:image')).toHaveAttribute('content', origin + guide.coverImage);
  const evidence = page.getByRole('link', { name: 'See Quivellox in action', exact: true });
  await expect(evidence).toHaveAttribute('href', quivellox);
  await expect(page.getByRole('complementary', { name: 'Companion case study' })).toContainText(
    'sample conversation'
  );
  await evidence.press('Enter');
  await expect(page.locator('#case-title')).toBeFocused();
  await expect(page).toHaveTitle(caseTitles.quivellox);
  await expect(canonical(page)).toHaveAttribute('href', origin + quivellox);
  await expect(meta(page, 'twitter:image')).toHaveAttribute('content', `${origin}/share/cases/quivellox.jpg`);
  await expect(page.locator('.sample-exchange')).toContainText('page 12');
  expect(await page.evaluate(() => window.folioEvents.map((e) => e.data?.source))).toContain('blog_post');
  await page.goBack();
  await expect(canonical(page)).toHaveAttribute('href', origin + rag);
  await expect(meta(page, 'twitter:title')).toHaveAttribute('content', /^Getting Started with RAG/);
  await page.getByRole('link', { name: 'JOspeed home' }).click();
  await expect(canonical(page)).toHaveAttribute('href', `${origin}/`);
  await expect(meta(page, 'og:image')).toHaveAttribute('content', portfolioCard);
  await expect(meta(page, 'twitter:image')).toHaveAttribute('content', portfolioCard);
  await expect(meta(page, 'og:image:type')).toHaveAttribute('content', 'image/jpeg');
  await expect(meta(page, 'og:image:height')).toHaveAttribute('content', '630');
  expect(JSON.parse(await schema(page).textContent())['@graph']).toBeTruthy();
});

test('Blog navigation reaches the filterable index; unrelated articles and cases have no companion link', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Field notes.' })).toBeVisible();
  const footer = page.getByRole('navigation', { name: 'Footer navigation' });
  await expect(footer.getByRole('link', { name: 'Blog', exact: true })).toHaveAttribute('href', '/blog');
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  const nav = page.getByRole('navigation', { name: isMobile ? 'Mobile navigation' : 'Primary navigation' });
  await nav.getByRole('link', { name: 'Blog', exact: true }).click();
  await expect(canonical(page)).toHaveAttribute('href', `${origin}/blog`);
  await expect(page.locator('h1')).toBeFocused();
  await page.getByRole('button', { name: '3D Design', exact: true }).click();
  await page.getByPlaceholder('Search articles & tags...').fill('Blender');
  const article = page.locator('main a[href^="/blog/"]');
  await expect(article).toHaveCount(1);
  await article.click();
  await expect(page.locator('h1')).toContainText('Blender');
  await expect(page.getByRole('complementary', { name: 'Companion case study' })).toHaveCount(0);
  await footer.getByRole('link', { name: 'All projects' }).click();
  await expect(canonical(page)).toHaveAttribute('href', `${origin}/work`);
  await expect(schema(page)).toHaveCount(0);
  await page.getByRole('link', { name: 'Read the Revive Touch case study', exact: true }).click();
  await expect(page.locator('#case-title')).toHaveText('Revive Touch');
  await expect(page.getByRole('link', { name: 'Read how I built this' })).toHaveCount(0);
});
