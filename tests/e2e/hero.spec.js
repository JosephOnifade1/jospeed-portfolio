import { expect, test } from '@playwright/test';
import { readPublishedPosts } from '../../scripts/blog-content.js';
import { mockExternalServices } from './support/network.js';

const notesCount = readPublishedPosts().length;
test.beforeEach(mockExternalServices);

for (const javaScriptEnabled of [true, false]) {
  test.describe(javaScriptEnabled ? 'interactive hero' : 'first-response hero', () => {
    test.use({ javaScriptEnabled });

    test('the introduction opens the case study and the published count opens the blog', async ({ page }) => {
      await page.goto('/');
      const hero = page.locator('#top');
      const intro = hero.locator('#hero-sub');
      await expect(intro).toContainText('Full-Stack Software Engineer & AI Engineer · Ibadan, Nigeria');
      await expect(intro).toContainText('I’m open to client projects and engineering roles.');
      await expect(hero.getByRole('link', { name: 'Explore My Work' })).toHaveAttribute('href', '#projects');
      await expect(hero.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '#contact');

      const proof = intro.getByRole('link', { name: 'Quivellox case study' });
      await expect(proof).toHaveAttribute('href', '/case-study/quivellox');
      await proof.press('Enter');
      await expect(page.getByRole('heading', { level: 1, name: 'Quivellox' })).toBeVisible();
      await expect(page.locator('#sample-answer blockquote')).not.toBeEmpty();
      if (javaScriptEnabled) {
        await expect(page.locator('#case-title')).toBeFocused();
        await expect
          .poll(() => page.evaluate(() => window.folioEvents.find((e) => e.name === 'case_study_opened')?.data))
          .toEqual({ project: 'quivellox', source: 'hero' });
      }

      await page.goBack();
      const notes = hero.getByRole('link', { name: `${notesCount} Field notes`, exact: true });
      await expect(notes).toHaveAttribute('href', '/blog');
      await notes.press('Enter');
      await expect(page).toHaveURL(/\/blog$/);
      await expect(page.locator('main a[href^="/blog/"]')).toHaveCount(notesCount);
    });
  });
}
