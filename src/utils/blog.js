import posts from 'virtual:published-blog-posts';

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllCategories() {
  return ['All', ...new Set(posts.map((post) => post.category))];
}
