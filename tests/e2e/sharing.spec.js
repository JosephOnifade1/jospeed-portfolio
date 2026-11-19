import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { WORK_INDEX } from '../../src/data/projects.js';
import { readPublishedPosts } from '../../scripts/blog-content.js';
import { mockExternalServices } from './support/network.js';

const origin = 'https://buildwithjospeed.vercel.app';
const rag = '/blog/getting-started-with-rag-2025';
const quivellox = '/case-study/quivellox';
const caseTitles = {
  'revive-touch': 'Revive Touch — Android app for poker-event staff',
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

test.beforeEach(mockExternalServices);

test.describe('crawler reads the built HTML', () => {
  test.use({ javaScriptEnabled: false });

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
      // Absolute production URLs in the tags; fetch the asset from the deployment under test.
      const res = await request.get(new URL(image).pathname);
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toMatch(/^image\/jpeg/);
      const buffer = await res.body();
      expect(await sharp(buffer).metadata()).toMatchObject({ format: 'jpeg', width: 1200, height: 630 });
      images.add(createHash('sha256').update(buffer).digest('hex'));
    }
    expect(images.size).toBe(8);
    expect(descriptions.size).toBe(8);
    expect(await (await request.get('/robots.txt')).text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
    await page.goto(rag);
    await expect(canonical(page)).toHaveAttribute('href', origin + rag);
    expect(JSON.parse(await schema(page).textContent())['@type']).toBe('BlogPosting');
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
  await expect(meta(page, 'og:image')).toHaveAttribute('content', `${origin}/og-image.png`);
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
