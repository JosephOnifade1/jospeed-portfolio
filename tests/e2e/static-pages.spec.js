import { expect, test } from '@playwright/test';
import { readPublishedPosts } from '../../scripts/blog-content.js';
import { WORK_INDEX } from '../../src/data/projects.js';
import { mockExternalServices } from './support/network.js';

const origin = 'https://buildwithjospeed.vercel.app';
const posts = readPublishedPosts();
const casePaths = WORK_INDEX.map((p) => `/case-study/${p.id}`);
const paths = ['/', '/blog', '/work', '/gallery', ...casePaths, ...posts.map((p) => `/blog/${p.slug}`)];

test.beforeEach(mockExternalServices);

test('discovery files, permanent redirects and real 404 responses', async ({ request, baseURL }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url);
  expect(urls.sort()).toEqual(paths.map((p) => origin + p).sort());
  expect(await (await request.get('/robots.txt')).text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
  for (const [from, to] of [
    ['/index.html', '/'],
    ['/work.html?category=web', '/work?category=web'],
    ['/blog/index.html', '/blog'],
    [`${casePaths[0]}/?utm_source=share`, `${casePaths[0]}?utm_source=share`],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(new URL(response.headers().location, baseURL).href).toBe(new URL(to, baseURL).href);
  }
  for (const path of ['/not-a-portfolio-route', '/blog/unpublished-example', '/case-study/no-such-case']) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    expect((await request.head(path)).status()).toBe(404);
    const html = await response.text();
    expect(html).toContain('noindex, follow');
    expect(html).not.toContain('rel="canonical"');
  }
  expect((await request.get('/share/cases/no-such-image.jpg')).status()).toBe(404);
});

test.describe('read and get in touch without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('home and both archive views link to the work; the alias stays canonical to the gallery', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('main').locator('h1')).toBeVisible();
    await expect(page.locator('.note-list a')).toHaveCount(Math.min(4, posts.length));
    await expect(page.locator('#about')).toContainText('Ibadan, Nigeria');
    await expect(page.locator('#hero-sub')).toContainText('Full-Stack Software Engineer & AI Engineer');
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('Ibadan, Nigeria');
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/`);
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())[
      '@graph'
    ];
    expect(graph.find((item) => item['@type'] === 'Person')).toMatchObject({
      name: 'Joseph Onifade',
      jobTitle: 'Full-Stack Software Engineer & AI Engineer',
      address: { addressLocality: 'Ibadan' },
    });
    await page.getByRole('link', { name: /Explore all .* projects/ }).click();
    await expect(page.locator('.archive-grid a')).toHaveCount(casePaths.length);
    await page.goto('/coverflow?category=web');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/gallery`);
    const fallback = page.getByRole('navigation', { name: 'Gallery case studies' });
    expect(await fallback.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')))).toEqual(
      casePaths
    );
    await fallback.getByRole('link', { name: 'Quivellox' }).click();
    await expect(page.locator('main h1')).toHaveText('Quivellox');
  });

  test('About downloads the résumé as a local PDF without leaving the portfolio', async ({ page, request }) => {
    await page.goto('/#about');
    const resume = page.locator('#about').getByRole('link', { name: /Download résumé.*PDF.*1 page/ });
    const path = '/resume/joseph-onifade-resume.pdf';
    await expect(resume).toBeVisible();
    await expect(resume).toHaveAttribute('href', path);
    await expect(resume).toHaveAttribute('download', '');
    const file = await request.get(path);
    expect(file.status()).toBe(200);
    expect(file.headers()['content-type']).toMatch(/^application\/pdf\b/);
    expect((await file.body()).subarray(0, 5).toString()).toBe('%PDF-');
    const [download] = await Promise.all([page.waitForEvent('download'), resume.press('Enter')]);
    expect(download.suggestedFilename()).toBe('joseph-onifade-resume.pdf');
    expect(await download.failure()).toBeNull();
    await expect(page).toHaveURL(/\/#about$/);
  });

  test('both sample links work without JS; the booking walkthrough offers a contextual native inquiry', async ({ page }) => {
    await page.goto('/#projects');
    await page.getByRole('link', { name: 'Check a sample citation' }).click();
    await expect(page).toHaveURL(/\/case-study\/quivellox#sample-answer$/);
    await expect(page.locator('#sample-question')).toBeInViewport();
    await page.getByRole('link', { name: /View source: Security incident response/ }).click();
    await expect(page.locator('#source-1 mark')).toContainText('15 minutes');
    await page.goto('/#projects');
    await page.getByRole('link', { name: 'Try a sample booking' }).click();
    await expect(page).toHaveURL(/\/case-study\/revive-touch#demo$/);
    const walkthrough = page.locator('#demo noscript p');
    await expect(walkthrough).toBeVisible();
    await expect(walkthrough).toContainText('Confirming it gives the player a 14:30 booking');
    await expect(page.locator('#demo').getByRole('button')).toHaveCount(0);
    const endpoint = 'https://formspree.io/f/xpwzrpdb';
    await page.route(endpoint, (route) => route.fulfill({ contentType: 'text/html', body: 'Test receipt' }));
    const inquiry = { name: 'Test Reader', email: 'reader@example.com', message: 'Another mobile app.' };
    for (const include of [true, false]) {
      if (!include) await page.goto('/case-study/revive-touch');
      await page.getByText('Start a similar project', { exact: true }).filter({ visible: true }).click();
      const form = page.getByRole('form', { name: 'Have a similar project?' });
      const reference = form.getByRole('checkbox', { name: 'Include reference: Revive Touch' });
      await expect(reference).toBeChecked();
      if (!include) await reference.uncheck();
      await form.getByLabel('Your name').fill(inquiry.name);
      await form.getByLabel('Email address').fill(inquiry.email);
      await form.getByLabel('About your project or role').fill(inquiry.message);
      const [request] = await Promise.all([
        page.waitForRequest(endpoint), form.getByRole('button', { name: 'Send message' }).click(),
      ]);
      expect(request.method()).toBe('POST');
      expect(Object.fromEntries(new URLSearchParams(request.postData()))).toEqual(
        include ? { ...inquiry, reference: 'Revive Touch' } : inquiry
      );
    }
  });

  test('the native inquiry is a POST, not personal information in a URL', async ({ page }) => {
    const endpoint = 'https://formspree.io/f/xpwzrpdb';
    await page.route(endpoint, (route) =>
      route.fulfill({ contentType: 'text/html', body: '<p>Test receipt</p>' })
    );
    await page.goto('/#contact');
    const form = page.getByRole('form', { name: 'Have a project or a role in mind? Let’s talk.' });
    await expect(form).toHaveAttribute('method', 'post');
    await expect(form).toHaveAttribute('action', endpoint);
    await expect(page.locator('#contact')).toContainText('Ibadan, Nigeria');
    const inquiry = {
      name: 'Test Reader',
      email: 'reader@example.com',
      message: 'We have an engineering role.',
    };
    await form.getByLabel('Your name').fill(inquiry.name);
    await form.getByLabel('Email address').fill(inquiry.email);
    await form.getByLabel('About your project or role').fill(inquiry.message);
    const [sent] = await Promise.all([
      page.waitForRequest((req) => req.url().startsWith(endpoint)),
      form.getByRole('button', { name: 'Send message' }).click(),
    ]);
    expect(sent.method()).toBe('POST');
    expect(sent.url()).toBe(endpoint);
    expect(Object.fromEntries(new URLSearchParams(sent.postData()))).toEqual(inquiry);
  });
});

test('React attaches to the article already on screen without replacing it', async ({
  page,
  context,
  baseURL,
}) => {
  const guide = '/blog/getting-started-with-rag-2025';
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
  const gate = Promise.withResolvers();
  await page.route('**/assets/*.js', async (route) => {
    await gate.promise;
    await route.continue();
  });
  await page.goto(guide, { waitUntil: 'commit' });
  const article = page.locator('main article');
  let initial, before;
  try {
    initial = await article.elementHandle();
    before = await article.innerText();
    expect(before).toContain('Reciprocal Rank Fusion (RRF)');
  } finally {
    gate.resolve();
  }
  await page.waitForLoadState('load');
  await article.getByRole('button', { name: 'Share', exact: true }).click();
  await expect(article.getByRole('button', { name: 'Copied!' })).toBeVisible();
  expect(await initial.evaluate((node) => node.isConnected)).toBe(true);
  expect((await article.innerText()).replace('Copied!', 'Share')).toBe(before);
  await article.getByRole('link', { name: 'See Quivellox in action' }).click();
  await expect(page.locator('main h1')).toBeFocused();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${origin}/case-study/quivellox`
  );
});
