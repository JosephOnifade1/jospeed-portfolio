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

export function parsePost(slug, raw) {
  const { data, content } = parseFrontmatter(raw);
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
    relatedProject: data.relatedProject || null,
    content,
  };
}
