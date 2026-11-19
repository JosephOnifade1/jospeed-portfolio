import { WORK_INDEX } from '../data/projects.js';

// One explicit relationship in Markdown drives both directions, including in
// the static HTML. Never infer a companion from similar tags or cover art.
export function companionFor(path, posts) {
  const article = posts.find((p) => p.relatedProject && path === `/blog/${p.slug}`);
  if (article) {
    const project = WORK_INDEX.find((p) => p.id === article.relatedProject);
    return project
      ? {
          href: `/case-study/${project.id}`,
          label: `See ${project.name} in action`,
          detail: project.visual?.caption || project.summary,
        }
      : null;
  }
  const note = posts.find((p) => p.relatedProject && path === `/case-study/${p.relatedProject}`);
  return note ? { href: `/blog/${note.slug}`, label: 'Read how I built this' } : null;
}
