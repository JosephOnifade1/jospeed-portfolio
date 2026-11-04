// Utility to load, parse, and filter blog posts
const blogModules = import.meta.glob('../../content/blog/*.md', { query: '?raw', eager: true });

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const yamlBlock = match[1];
  const content = match[2];
  const data = {};

  const lines = yamlBlock.split(/\r?\n/);
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (val === 'true') {
      val = true;
    } else if (val === 'false') {
      val = false;
    }
    data[key] = val;
  }
  return { data, content };
}

export function getAllPosts() {
  const posts = Object.entries(blogModules).map(([path, raw]) => {
    const rawContent = typeof raw === 'string' ? raw : (raw.default || '');
    const { data, content } = parseFrontmatter(rawContent);
    // Slug from filename: '../../content/blog/getting-started-with-rag-2025.md' -> 'getting-started-with-rag-2025'
    const slug = path.split('/').pop().replace(/\.md$/, '');

    return {
      slug,
      title: data.title || 'Untitled Post',
      description: data.description || '',
      date: data.date || '2025-01-01',
      author: data.author || 'Joseph Onifade',
      category: data.category || 'General',
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: data.readingTime || '5 min read',
      coverImage: data.coverImage || '/projects/quivellox-preview.png',
      featured: Boolean(data.featured),
      content,
    };
  });

  // Sort descending by date
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getAllCategories() {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category).filter(Boolean));
  return ['All', ...Array.from(cats)];
}

