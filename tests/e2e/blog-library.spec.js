import { expect, test } from '@playwright/test';
import { readPublishedPosts } from '../../scripts/blog-content.js';
import { SITE_ORIGIN } from '../../src/seo/pageHead.js';
import { mockExternalServices } from './support/network.js';

const posts = readPublishedPosts();
const href = (post) => `/blog/${post.slug}`;
test.beforeEach(mockExternalServices);

test('Field notes opens the latest four; the archive lists each published story once and filters it', async ({
  page,
}) => {
  await page.goto('/#blog');
  await expect(page.getByRole('heading', { name: 'Field notes.' })).toBeFocused();
  const latest = posts.slice(0, 4);
  const notes = page.locator('.note-list a');
  await expect(notes).toHaveCount(latest.length);
  expect(await notes.evaluateAll((links) => links.map((a) => a.getAttribute('href')))).toEqual(
    latest.map(href)
  );
  await page
    .locator('#blog')
    .getByRole('link', { name: `All blog posts (${posts.length})` })
    .click();
  const links = page.locator('main a[href^="/blog/"]');
  await expect(links).toHaveCount(posts.length);
  const cardCovers = await links.evaluateAll((items) =>
    Object.fromEntries(
      items.map((a) => [a.getAttribute('href'), a.querySelector('img')?.getAttribute('src')])
    )
  );
  expect(cardCovers).toEqual(Object.fromEntries(posts.map((post) => [href(post), post.coverImage])));

  const story = latest[0];
  const category = page.getByRole('button', { name: story.category, exact: true });
  await category.click();
  await expect(category).toHaveAttribute('aria-pressed', 'true');
  await expect(links).toHaveCount(posts.filter((p) => p.category === story.category).length);
  const search = page.getByRole('searchbox');
  await search.fill(' xyz-no-matches ');
  await expect(page.getByText('No articles match these filters.', { exact: false })).toBeVisible();
  await search.fill(` ${story.title} `);
  await expect(links).toHaveCount(1);
  await links.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: story.title })).toBeFocused();
  await expect(page.locator('.blog-prose h2').first()).toBeVisible();
});

test.describe('public blog export', () => {
  test.use({ javaScriptEnabled: false });
  test('each article is discoverable without JS and has its own raw metadata, cover and sitemap entry', async ({
    page,
    request,
  }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text();
    await page.goto('/blog');
    const indexLinks = await page
      .locator('main a')
      .evaluateAll((items) => items.map((a) => a.getAttribute('href')));
    // The static page is the real index: featured story first, then the dated grid.
    const featured = posts.find((post) => post.featured) || posts[0];
    expect(indexLinks).toEqual([featured, ...posts.filter((p) => p !== featured)].filter(Boolean).map(href));
    for (const post of posts) {
      const url = SITE_ORIGIN + href(post);
      expect(sitemap).toContain(`<loc>${url}</loc>`);
      expect((await page.goto(href(post))).status()).toBe(200);
      await expect(page).toHaveTitle(`${post.title} | JOspeed Blog`);
      const article = page.locator('main article');
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(article.getByRole('heading', { level: 1 })).toHaveText(post.title);
      await expect(article.locator('.blog-prose')).not.toBeEmpty();
      await expect(article.locator('time')).toHaveAttribute('datetime', post.date);
      await expect(article.getByRole('navigation', { name: 'Breadcrumb' })).toContainText(post.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url);
      const shareImage = SITE_ORIGIN + post.coverImage;
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', shareImage);
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', shareImage);
      expect(
        JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())
      ).toMatchObject({
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        image: shareImage,
      });
      const cover = await request.get(post.coverImage);
      expect(cover.ok()).toBeTruthy();
      expect(cover.headers()['content-type']).toMatch(/^image\//);
    }
  });
});
