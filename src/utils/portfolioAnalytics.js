import { track } from '@vercel/analytics';

// Only portfolio slugs and entry points go to analytics. Never send form fields.
// Use tab-scoped attribution, with an in-memory fallback if storage is disabled.
const memory = new Map();
const prefix = 'jospeed:work:';
function read(key) {
  try {
    return sessionStorage.getItem(prefix + key) ?? memory.get(key);
  } catch {
    return memory.get(key);
  }
}
function remember(key, value) {
  memory.set(key, value);
  try {
    sessionStorage.setItem(prefix + key, value);
  } catch {
    /* Storage is optional. */
  }
}
function once(key, event, props) {
  if (read(key)) return;
  remember(key, '1');
  track(event, props);
}

export function recordWorkView() {
  once('viewed', 'selected_work_viewed');
}
export function recordCaseView(project, entry) {
  const source = ['selected_work', 'capabilities', 'next_case', 'work_archive', 'work_gallery'].includes(
    entry
  )
    ? entry
    : 'direct';
  remember('last_case', project);
  once(`case:${project}:${source}`, 'case_study_opened', { project, source });
}
export function recordInquiry() {
  track('inquiry_sent', { last_case: read('last_case') || 'none' });
}
