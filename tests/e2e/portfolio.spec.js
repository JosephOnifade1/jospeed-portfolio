import { expect, test } from '@playwright/test';

import { mockExternalServices } from './support/network.js';

test.beforeEach(mockExternalServices);

test('featured work → case study → inquiry, with retry and attribution', async ({ page, isMobile }) => {
  await page.goto('/');
  const explore = page.getByRole('link', { name: 'Explore My Work' });
  if (isMobile) await explore.tap();
  else await explore.click();
  await expect(page.locator('#work-title')).toBeFocused();
  await expect(page.locator('#projects .work-link')).toHaveCount(3);
  const story = page.getByRole('link', { name: 'Read the Revive Touch case study' });
  await expect(story).toBeInViewport({ ratio: 1 });
  await expect(page.locator('.work-feature .dispatch-ticket')).toBeInViewport();
  if (isMobile) await story.tap();
  else await story.click();
  await expect(page.getByRole('heading', { level: 1, name: 'Revive Touch' })).toBeFocused();
  await expect(page.getByText('Efficiency gain', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Source code' })).toHaveCount(0);
  await page.getByRole('link', { name: 'Start a similar project' }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator('#contact-title')).toBeFocused();
  await expect(page.getByLabel('Your name')).toBeInViewport({ ratio: 1 });
  const headingTop = (await page.locator('#contact-title').boundingBox()).y;
  expect(headingTop).toBeGreaterThanOrEqual(76);
  expect(headingTop).toBeLessThan(150);
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Your name')).toBeFocused();

  let attempts = 0;
  await page.route('https://formspree.io/f/xpwzrpdb', async (route) => {
    attempts++;
    expect(route.request().postDataJSON()).toEqual({
      name: 'Example',
      email: 'qa@example.com',
      message: 'An engineering role on our team.',
    });
    await route.fulfill({ status: attempts === 1 ? 503 : 200, json: { ok: attempts > 1 } });
  });
  await page.getByLabel('Your name').fill('Example');
  await page.getByLabel('Email address').fill('qa@example.com');
  await page.getByLabel('About your project or role', { exact: true }).fill('An engineering role on our team.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('alert')).toContainText('didn’t send');
  await expect(page.getByLabel('About your project or role', { exact: true })).toHaveValue('An engineering role on our team.');
  expect(await page.evaluate(() => window.folioEvents.filter((e) => e.name === 'inquiry_sent'))).toHaveLength(
    0
  );
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toContainText('Message sent');
  const events = await page.evaluate(() => window.folioEvents.map(({ name, data }) => ({ name, data })));
  expect(events).toEqual([
    { name: 'selected_work_viewed', data: undefined },
    { name: 'case_study_opened', data: { project: 'revive-touch', source: 'selected_work' } },
    { name: 'inquiry_sent', data: { last_case: 'revive-touch' } },
  ]);
});

test('deep links, keyboard navigation and project evidence', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#projects');
  await expect(page.locator('#work-title')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Read the Revive Touch case study' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Read the Quivellox case study' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#case-title')).toHaveText('Quivellox');
  await expect
    .poll(() => page.locator('.screen-capture').evaluate((img) => img.naturalWidth))
    .toBeGreaterThan(0);
  await expect(page.locator('.sample-exchange blockquote')).toBeVisible();
  await expect(page.locator('.sample-exchange')).toContainText('page 12');
  await expect(page.getByRole('link', { name: 'Source code' })).toHaveAttribute(
    'href',
    'https://github.com/JosephOnifade1/quivellox'
  );
  await page.getByRole('link', { name: /Next case study Borynx/ }).click();
  await expect(page.locator('#case-title')).toHaveText('Borynx');
  await expect
    .poll(() => page.locator('.screen-capture').evaluate((img) => img.naturalWidth))
    .toBeGreaterThan(0);
  await page.getByRole('link', { name: 'Back to selected work' }).click();
  await expect(page.locator('#work-title')).toBeFocused();
  await page.goto('/#contact');
  await expect(page.locator('#contact-title')).toBeFocused();
  await expect(page.getByLabel('Your name')).toBeInViewport({ ratio: 1 });
});

test('compact supporting sections and legacy destinations still work', async ({ page }) => {
  await page.goto('/#skills');
  await expect(page.getByRole('heading', { name: 'Capabilities in practice' })).toBeFocused();
  await page.getByRole('link', { name: 'Mobile apps Revive Touch' }).click();
  await expect(page.locator('#case-title')).toHaveText('Revive Touch');
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Capabilities in practice' })).toBeFocused();
  const firstNote = page.locator('.note-list a').first();
  const noteUrl = new URL(await firstNote.getAttribute('href'), page.url()).href;
  await firstNote.click();
  await expect(page).toHaveURL(noteUrl);
  await expect(page.locator('h1')).toBeFocused();
  await page.goto('/case-study/fiverr-scout');
  await expect(page.locator('#case-title')).toHaveText('Fiverr Scout');
  await page.goto('/case-study/missing');
  await expect(page.getByRole('heading', { name: 'Case study not found.' })).toBeVisible();
});

test('navigation reaches the form from another page and the mobile disclosure is keyboard accessible', async ({
  page,
  isMobile,
}) => {
  await page.goto('/blog');
  const menu = page.getByRole('button', { name: 'Open menu' });
  if (isMobile) {
    await menu.tap();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await menu.press('Enter');
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Get in touch' })
      .tap();
  } else {
    await page.getByRole('link', { name: 'Let’s Talk' }).click();
  }
  await expect(page.locator('#contact-title')).toBeFocused();
  await expect(page.getByLabel('Your name')).toBeInViewport({ ratio: 1 });
});

test('Upwork is a separate hiring option that leaves the inquiry draft on the portfolio', async ({
  page,
  context,
  isMobile,
}) => {
  const profileURL = 'https://www.upwork.com/freelancers/~01a476791ed9f8b084?mp_source=share';
  // Intercept at the context level: the external anchor opens a new tab.
  await context.route('https://www.upwork.com/**', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<title>Mock freelance profile</title>' })
  );
  await page.goto('/case-study/revive-touch');
  await page.getByRole('link', { name: 'Start a similar project' }).click();
  const card = page.locator('#contact').getByRole('link', { name: /Hire me on Upwork/ });
  const send = page.getByRole('button', { name: 'Send message' });
  await expect(card).toHaveAttribute('href', profileURL);
  if (isMobile) {
    const submitBox = await send.boundingBox();
    expect((await card.boundingBox()).y).toBeGreaterThan(submitBox.y + submitBox.height);
  }

  const message = page.getByLabel('About your project or role', { exact: true });
  await message.fill('An unsent inquiry.');
  await page.keyboard.press('Tab');
  await expect(send).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'josephonifade21@gmail.com' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(card).toBeFocused();
  const [profile] = await Promise.all([context.waitForEvent('page'), page.keyboard.press('Enter')]);
  await expect(profile).toHaveURL(profileURL);
  expect(await profile.evaluate(() => window.opener === null)).toBe(true);
  await profile.close();

  await expect(page).toHaveURL(/\/#contact$/);
  await expect(message).toHaveValue('An unsent inquiry.');
  expect(await page.evaluate(() => window.folioEvents.map(({ name, data }) => ({ name, data })))).toEqual([
    { name: 'case_study_opened', data: { project: 'revive-touch', source: 'direct' } },
    { name: 'upwork_profile_clicked', data: { last_case: 'revive-touch' } },
  ]);
});
