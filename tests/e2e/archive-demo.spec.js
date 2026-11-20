import { expect, test } from '@playwright/test';
import { mockExternalServices } from './support/network.js';

test.beforeEach(mockExternalServices);

const caseLink = (page, name) => page.getByRole('link', { name: `Read the ${name} case study`, exact: true });
const filters = (page) => page.getByRole('navigation', { name: 'Filter by discipline' });
const views = (page) => page.getByRole('navigation', { name: 'Archive views' });

// This list deliberately doesn't use the implementation's filter or project index.
const namesByFilter = {
  Mobile: ['Revive Touch'],
  Web: ['Borynx', 'HomePlate'],
  'AI & automation': [
    'Quivellox',
    'Fiverr Scout',
    'AI Missed-Call Recovery',
    'AI Client Finder Bot',
    'AI Strategy Coach',
  ],
};

test('all eight stories are discoverable; archive filters survive navigation and refresh', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#projects');
  await page.getByRole('link', { name: /Explore all 8 projects/ }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Project archive.' })).toBeFocused();
  const grid = page.getByRole('list', { name: 'Project case studies' });
  await expect(grid.getByRole('link')).toHaveCount(8);
  for (const [label, names] of Object.entries(namesByFilter)) {
    const filter = filters(page).getByRole('link', { name: label, exact: true });
    await filter.press('Enter');
    await expect(filter).toBeFocused();
    await expect(filter).toHaveAttribute('aria-current', 'true');
    await expect(grid.getByRole('heading')).toHaveText(names);
    await expect(page.getByRole('status')).toHaveText(`Showing ${names.length} of 8 projects`);
  }
  await page.goBack();
  await expect(page).toHaveURL(/\/work\?category=web$/);
  await page.reload();
  await expect(grid.getByRole('heading')).toHaveText(namesByFilter.Web);
  await caseLink(page, 'HomePlate').click();
  await expect(page.locator('#case-title')).toHaveText('HomePlate');
  expect(await page.evaluate(() => window.folioEvents.at(-1)?.data)).toEqual({
    project: 'homeplate',
    source: 'work_archive',
  });
  await page.getByRole('link', { name: 'Back to project archive' }).click();
  await expect(grid.getByRole('heading')).toHaveText(namesByFilter.Web);
  await filters(page).getByRole('link', { name: 'All', exact: true }).click();
  await expect(grid.getByRole('link')).toHaveCount(8);
});

test('3D view preserves the discipline and each active cover opens its own case study', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work?category=web');
  await views(page).getByRole('link', { name: '3D gallery' }).click();
  await expect(page).toHaveURL(/\/gallery\?category=web$/);
  const next = page.getByRole('button', { name: 'Next project' });
  const carousel = page.getByRole('group', { name: 'Project covers' });
  await expect(caseLink(page, 'Borynx')).toBeVisible();
  await next.click();
  await expect(caseLink(page, 'HomePlate')).toHaveAttribute('href', '/case-study/homeplate');
  await carousel.press('ArrowRight'); // wrap
  await expect(caseLink(page, 'Borynx')).toBeVisible();
  await carousel.press('ArrowLeft');
  await page.keyboard.press('Tab');
  await expect(caseLink(page, 'HomePlate')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#case-title')).toBeFocused();
  await expect(page.locator('#case-title')).toHaveText('HomePlate');
  expect(await page.evaluate(() => window.folioEvents.at(-1)?.data)).toEqual({
    project: 'homeplate',
    source: 'work_gallery',
  });
  await page.getByRole('link', { name: 'Back to 3D gallery' }).click();
  await expect(caseLink(page, 'HomePlate')).toBeVisible();
  await views(page).getByRole('link', { name: 'Grid' }).click();
  await expect(page).toHaveURL(/\/work\?category=web$/);
});

test('bookmarked gallery views have safe defaults and support a single cover', async ({ page }) => {
  await page.goto('/coverflow?category=missing&project=missing');
  await expect(page.getByRole('status')).toHaveText('Showing 8 of 8 projects');
  await expect(caseLink(page, 'Revive Touch')).toBeVisible();
  await filters(page).getByRole('link', { name: 'Mobile', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Showing 1 of 8 projects');
  await expect(page.getByRole('button', { name: 'Next project' })).toHaveCount(0);
  await caseLink(page, 'Revive Touch').click();
  await expect(page.locator('#case-title')).toHaveText('Revive Touch');
});

test('a player books an available time; the therapist can manage only unbooked slots, offline', async ({
  page,
  context,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#projects');
  const sample = page.getByRole('link', { name: 'Try a sample booking' });
  await expect(sample).toHaveAttribute('href', '/case-study/revive-touch#demo');
  // Real hit testing: the card also has a stretched “Read case study” link.
  if (isMobile) await sample.tap();
  else await sample.click();
  await expect(page).toHaveURL(/\/case-study\/revive-touch#demo$/);
  const demo = page.getByRole('region', { name: 'Try a sample booking.' });
  const title = demo.getByRole('heading', { level: 2 });
  const player = demo.getByRole('group', { name: 'Player view' });
  const schedule = demo.getByRole('group', { name: 'Therapist view' });
  const slot = (time) => player.getByRole('radio', { name: new RegExp(`^${time}`) });
  const row = (time) => schedule.getByRole('listitem').filter({ hasText: time });
  const confirm = player.getByRole('button', { name: 'Confirm booking' });
  await expect(title).toBeFocused();
  await expect(demo).toContainText('no real booking is made');
  await expect(confirm).toBeDisabled();
  await expect(schedule.getByText('Open', { exact: true })).toHaveCount(3);
  expect(await page.evaluate(() => window.folioEvents.at(-1)?.data)).toEqual({
    project: 'revive-touch', source: 'selected_work',
  });
  const writes = [];
  page.on('request', (r) => {
    if (!['GET', 'HEAD'].includes(r.method())) writes.push(r.method());
  });
  page.on('websocket', () => writes.push('websocket'));
  await context.setOffline(true);
  await page.keyboard.press('Tab');
  await expect(slot('14:00')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(slot('14:30')).toBeChecked();
  await expect(row('14:30')).toContainText('Open'); // selection isn't a booking
  await expect(confirm).toBeEnabled();
  await row('14:30').getByRole('button', { name: 'Close 14:30 slot' }).press('Enter');
  await expect(slot('14:30')).toBeDisabled();
  await expect(slot('14:30')).not.toBeChecked();
  await expect(confirm).toBeDisabled();
  await row('14:00').getByRole('button').click();
  await row('15:00').getByRole('button').click();
  await expect(player).toContainText('No times open');
  await row('14:30').getByRole('button', { name: 'Reopen 14:30 slot' }).press('Enter');
  await expect(slot('14:30')).toBeEnabled();
  await slot('14:30').check();
  await confirm.press('Enter');
  await expect(player).toContainText('Session booked');
  await expect(player).toContainText('14:30');
  await expect(demo.getByRole('status')).toContainText('14:30 confirmed');
  await expect(player.getByRole('button', { name: 'Booking confirmed' })).toBeDisabled();
  await expect(row('14:30')).toContainText('Booked');
  await expect(row('14:30').getByRole('button')).toHaveCount(0);
  await row('14:00').getByRole('button').click(); // does not change the booking
  await expect(row('14:30')).toContainText('Booked');
  await demo.getByRole('button', { name: 'Reset demo' }).click();
  await expect(title).toBeFocused();
  await expect(schedule.getByText('Open', { exact: true })).toHaveCount(3);
  await expect(confirm).toBeDisabled();
  await slot('15:00').check();
  await confirm.click();
  expect(writes).toEqual([]);
  await context.setOffline(false);
  await page.reload();
  await expect(title).toBeFocused();
  await expect(schedule.getByText('Open', { exact: true })).toHaveCount(3);
  await expect(confirm).toBeDisabled();
});
