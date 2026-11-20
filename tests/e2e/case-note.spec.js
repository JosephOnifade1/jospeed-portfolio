import { expect, test } from '@playwright/test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import CaseStudyNote from '../../src/components/CaseStudyNote.jsx';
import { mockExternalServices } from './support/network.js';

test('the Revive Touch note sits beneath the outcome and leads into the booking sample', async ({
  page,
  baseURL,
}) => {
  await mockExternalServices({ page, baseURL });
  await page.goto('/case-study/revive-touch#project-note');
  const note = page.locator('.case-result').getByRole('complementary');
  await expect(note.getByRole('heading')).toBeFocused();
  await expect(note).toBeInViewport({ ratio: 1 });
  await page.keyboard.press('Tab');
  await expect(page.getByRole('radio', { name: /^14:00/ })).toBeFocused();
  await page.getByRole('link', { name: /Next case study Quivellox/ }).click();
  await expect(page.locator('#case-title')).toHaveText('Quivellox');
  await expect(page.locator('#project-note')).toHaveCount(0);
});

test('only a complete approved quote replaces the editorial note', async ({ page }) => {
  // Isolated fixtures: never seed a testimonial into the public project records for a test.
  const render = (props) => renderToStaticMarkup(createElement(CaseStudyNote, props));
  const projectNote = { title: 'Note title', text: 'Editorial fixture.' };
  expect(render({})).toBe('');
  for (const approvedTestimonial of [
    null,
    { quote: 'Fixture text', credit: ' ' },
    { credit: 'Fixture credit' },
  ]) {
    await page.setContent(render({ projectNote, approvedTestimonial }));
    await expect(page.getByRole('complementary', { name: 'Project note' })).toContainText(projectNote.text);
    await expect(page.locator('blockquote')).toHaveCount(0);
    await expect(page.getByText('Fixture text')).toHaveCount(0);
  }
  const approvedTestimonial = { quote: 'Exact fixture text.', credit: 'Fixture credit' };
  await page.setContent(render({ projectNote, approvedTestimonial }));
  const feedback = page.getByRole('complementary', { name: 'Client feedback' });
  await expect(feedback.locator('blockquote')).toHaveText(approvedTestimonial.quote);
  await expect(feedback.locator('figcaption')).toHaveText(approvedTestimonial.credit);
  await expect(page.getByText(projectNote.text)).toHaveCount(0);
});
