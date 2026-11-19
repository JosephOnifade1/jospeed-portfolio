import { WORK_FILTERS } from '../data/projects.js';

export function archiveFilter(key) {
  return WORK_FILTERS.find((filter) => filter.key === key) || WORK_FILTERS[0];
}

// Only local, known archive views can be return destinations from a case study.
export function archiveSearch(category, project) {
  const params = new URLSearchParams();
  const { key } = archiveFilter(category);
  if (key !== 'all') params.set('category', key);
  if (project) params.set('project', project);
  return params.size ? `?${params}` : '';
}
