import { expect, test } from '@playwright/test';
import { mockExternalServices } from './support/network.js';

test.beforeEach(mockExternalServices);

const study = '/case-study/quivellox';
const referenceName = '[1] View source: Security incident response.pdf, page 12';
const passage =
  'The initial detection and triage must be completed within 15 minutes of alert identification. Escalation to the security team shall occur within 1 hour.';

test('follow the sample citation to its passage and back without losing the archive entry', async ({
  page,
  context,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work?category=ai');
  await page.getByRole('link', { name: 'Read the Quivellox case study' }).click();
  const citation = page.getByRole('link', { name: referenceName, exact: true });
  const excerpt = page.getByRole('figure', { name: /Security incident response\.pdf page 12/ });
  await expect(citation).toHaveAttribute('href', `${study}#source-1`);
  await expect(excerpt.getByRole('blockquote')).toHaveText(`“${passage}”`);
  await page.getByRole('link', { name: 'Trace the sample citation' }).press('Enter');
  await expect(
    page.getByRole('heading', { name: 'What is the incident escalation timeline?' })
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(citation).toBeFocused();
  // This is a local sample; following it never needs a PDF download or AI service.
  await context.setOffline(true);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/case-study\/quivellox#source-1$/);
  await expect(excerpt).toBeFocused();
  await expect(excerpt).toBeInViewport({ ratio: 1 });
  await expect(excerpt).toHaveAttribute('data-selected', '');
  await expect(excerpt.locator('mark')).toHaveText(passage);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Back to answer' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(citation).toBeFocused();
  await expect(page).toHaveURL(/#citation-1$/);
  await expect(excerpt).not.toHaveAttribute('data-selected', '');
  await page.goBack();
  await expect(excerpt).toBeFocused();
  await context.setOffline(false);
  await page.reload();
  await expect(excerpt).toBeFocused();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `https://buildwithjospeed.vercel.app${study}`
  );
  await page.getByRole('link', { name: 'Back to project archive' }).click();
  await expect(page).toHaveURL(/\/work\?category=ai$/);
});

test('copy the reviewed Upwork brief, optionally including only the project note', async ({
  page,
  context,
  baseURL,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
  // The test reads back the clipboard; the portfolio only ever writes, on request.
  const outbound = [];
  page.on('request', (r) => {
    if (/formspree\.io|upwork\.com/.test(r.url())) outbound.push(r.url());
  });
  await page.goto(study);
  await page.getByRole('link', { name: 'Start a similar project' }).click();
  const form = page.getByRole('form');
  const note = 'Build a document desk for our team. Keep the $& marker.';
  await form.getByLabel('Your name').fill('Private Name');
  await form.getByLabel('Email address').fill('private@example.com');
  await form.getByLabel('About your project or role', { exact: true }).fill(note);

  const toggle = page.locator('summary', { hasText: 'Prepare an Upwork brief' });
  const editor = page.getByRole('textbox', { name: 'Your project brief' });
  await expect(editor).toBeHidden();
  await toggle.press('Enter');
  const starter = await editor.inputValue();
  expect(starter).toContain(`Reference: Quivellox — https://buildwithjospeed.vercel.app${study}`);
  expect(starter).toContain('First deliverable:');
  expect(starter).toContain('Timeline:');
  expect(starter).toContain('Budget:');
  expect(starter).not.toContain(note);
  const custom = starter.replace('[target date or flexible]', 'Flexible, after a pilot');
  await editor.fill(custom);
  await page.getByRole('button', { name: 'Add my project note' }).click();
  const reviewed = await editor.inputValue();
  expect(reviewed).toContain(note);
  expect(reviewed).toContain('Timeline: Flexible, after a pilot');
  expect(reviewed).not.toMatch(/Private Name|private@example\.com/);
  const copy = page.getByRole('button', { name: 'Copy brief', exact: true });
  await copy.press('Enter');
  await expect(page.getByText('Copied. Your brief is ready to paste on Upwork.')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(reviewed);
  await expect(form.getByLabel('About your project or role', { exact: true })).toHaveValue(note);
  await expect(form.getByLabel('Your name')).toHaveValue('Private Name');
  await expect(form.getByLabel('Email address')).toHaveValue('private@example.com');
  await toggle.press('Enter');
  await toggle.press('Enter');
  await expect(editor).toHaveValue(reviewed);
  await expect(page).toHaveURL(/\/#contact$/);
  expect(outbound).toEqual([]);
  expect(context.pages()).toHaveLength(1);
  const events = await page.evaluate(() => window.folioEvents);
  expect(events.map((e) => e.name)).not.toContain('upwork_profile_clicked');
  expect(events.map((e) => e.name)).not.toContain('inquiry_sent');
  expect(JSON.stringify(events)).not.toMatch(/Private Name|private@example\.com|document desk/);

  // Leaving is a separate, explicit action. The destination never carries the brief.
  const profileUrl = 'https://www.upwork.com/freelancers/~01a476791ed9f8b084?mp_source=share';
  await context.route('https://www.upwork.com/**', (r) =>
    r.fulfill({ contentType: 'text/html', body: '<title>Profile</title>' })
  );
  const link = page.getByRole('link', { name: 'Open Upwork profile (opens in a new tab)' });
  await expect(link).toHaveAttribute('href', profileUrl);
  const [profile] = await Promise.all([context.waitForEvent('page'), link.press('Enter')]);
  await expect(profile).toHaveURL(profileUrl);
  expect(await profile.evaluate(() => window.opener === null)).toBe(true);
  await profile.close();
  await expect(editor).toHaveValue(reviewed);
  await expect(form.getByLabel('About your project or role', { exact: true })).toHaveValue(note);
});

test('a blocked clipboard offers manual copying; a direct visit starts with a clean brief', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new DOMException('Copy denied', 'NotAllowedError');
        },
      },
    })
  );
  await page.goto('/#upwork-brief');
  const editor = page.getByRole('textbox', { name: 'Your project brief' });
  const copy = page.getByRole('button', { name: 'Copy brief', exact: true });
  await expect(page.locator('#upwork-brief')).toBeFocused();
  await expect(editor).toBeVisible();
  expect(await editor.inputValue()).not.toContain('Reference:');
  await editor.fill('Deliverable: a scheduling page.\nBudget: not yet set.');
  await copy.click();
  await expect(editor).toBeFocused();
  expect(await editor.evaluate((el) => el.selectionStart === 0 && el.selectionEnd === el.value.length)).toBe(
    true
  );
  await expect(page.locator('#brief-feedback')).toContainText('Use your device’s Copy command');
  await expect(page.locator('#brief-feedback')).not.toContainText('Copied.');
  await editor.fill('   ');
  await expect(copy).toBeDisabled();
  await expect(page.locator('#brief-feedback')).toHaveText('');
  await page.reload();
  await expect(editor).toHaveValue(/Hi Joseph,/);
  expect(await editor.inputValue()).not.toContain('scheduling');
});
