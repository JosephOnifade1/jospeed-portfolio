import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const blogDir = path.resolve('content/blog');

// Parse CMS YAML on the build host, not in the reader's browser. In particular,
// draft bodies must never be imported by the public bundle or included in SEO.
function readPost(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const slug = path.basename(file, '.md');
  const fail = (message) => {
    throw new Error(`Blog post ${slug}: ${message}`);
  };
  // Only plain YAML frontmatter; never select an executable frontmatter engine.
  if (!/^---\r?\n/.test(raw)) fail('expected YAML frontmatter beginning with ---');
  const { data, content } = matter(raw, { language: 'yaml' });
  if (data.draft !== undefined && typeof data.draft !== 'boolean') fail('draft must be true or false');
  if (data.draft) return null;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('use a lowercase, hyphen-separated filename');
  for (const key of ['title', 'description', 'category']) {
    if (typeof data[key] !== 'string' || !data[key].trim()) fail(`missing ${key}`);
  }
  if (!content.trim()) fail('cannot publish an empty article');
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) fail('date must be YYYY-MM-DD');
  const tags = data.tags ?? [];
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string'))
    fail('tags must be a list of text values');
  return {
    slug,
    title: data.title,
    description: data.description,
    date,
    author: data.author || 'Joseph Onifade',
    category: data.category,
    tags,
    readingTime: data.readingTime || `${Math.ceil(content.trim().split(/\s+/).length / 200)} min read`,
    coverImage: data.coverImage || '/og-image.png',
    featured: data.featured === true,
    relatedProject: data.relatedProject || null,
    content,
  };
}

export function readPublishedPosts(dir = blogDir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => readPost(path.join(dir, entry.name)))
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

const publicId = 'virtual:published-blog-posts';
const resolvedId = `\0${publicId}`;
export function blogCollection() {
  return {
    name: 'published-blog-posts',
    resolveId(id) {
      if (id === publicId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      // Build watch needs the directory for additions/deletions. In dev, Vite
      // treats files watched during load as module imports; watch edits via hotUpdate instead.
      if (this.environment.mode === 'build') this.addWatchFile(blogDir);
      return `export default ${JSON.stringify(readPublishedPosts())};`;
    },
    // A new filename or an unpublished entry has no import of its own to invalidate.
    hotUpdate({ file }) {
      if (!file.endsWith('.md') || path.resolve(path.dirname(file)) !== blogDir) return;
      const mod = this.environment.moduleGraph.getModuleById(resolvedId);
      if (mod) {
        this.environment.moduleGraph.invalidateModule(mod);
        this.environment.hot.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}
