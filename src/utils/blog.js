import { parsePost } from './parsePost.js';

const modules = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const posts = Object.entries(modules)
  .map(([path, raw]) => parsePost(path.split('/').pop().slice(0, -3), raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllCategories() {
  return ['All', ...new Set(posts.map((post) => post.category))];
}
