import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllPosts } from '../utils/blog.js';
import { pageFor, renderHead, siteUrl } from '../seo/pageHead.js';

export default function PageHead() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    // The server and the router own the same marked nodes. A direct entry on
    // an article or case must not lend its card to the next page (or to Back).
    const page = pageFor(pathname, getAllPosts());
    const current = document.head.querySelector('link[data-page-head][rel="canonical"]');
    if (page.path && current?.href === siteUrl(page.path)) return; // Already in the static HTML.
    const html = renderHead(page);
    document.head.querySelectorAll('[data-page-head]').forEach((node) => node.remove());
    document.head.insertAdjacentHTML('beforeend', html);
  }, [pathname]);
  return null;
}
