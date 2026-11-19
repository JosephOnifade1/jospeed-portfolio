import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';

// A hash in a client-side route doesn't cause a browser document load. Resolve it
// after React has mounted its destination, including when arriving from a case study.
export default function RouteNavigation() {
  const { pathname, search, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const previous = useRef(null);

  useLayoutEffect(() => {
    const samePage = previous.current?.pathname === pathname;
    const queryOnly = samePage && previous.current.hash === hash && previous.current.search !== search;
    previous.current = { pathname, search, hash };
    // A filter or a cover change updates the URL without moving the visitor.
    if (queryOnly) return;
    const section = hash && document.getElementById(hash.slice(1));
    if (section) {
      // A history traversal/native fragment jump restores its own focus and
      // scroll position after popstate. Apply our heading target on the next frame.
      const frame = requestAnimationFrame(() => {
        const title = section.querySelector('[data-section-title], h1, h2, h3') || section;
        if (!title.hasAttribute('tabindex')) title.tabIndex = -1;
        const smooth =
          samePage &&
          navigationType !== 'POP' &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        title.focus({ preventScroll: true });
        if (hash === '#top') window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' });
        else title.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'instant' });
      });
      return () => cancelAnimationFrame(frame);
    } else if (!hash && navigationType !== 'POP') {
      document.querySelector('[data-route-title]')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, search, hash, key, navigationType]);

  // Keep the hero's ordinary fragment links and router Links on the same history,
  // focus and scroll path. Leave modifier clicks and new-tab navigation native.
  useEffect(() => {
    if (pathname !== '/') return;
    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const link = event.target.closest?.('a[href^="#"]');
      if (!link || link.target || !document.getElementById(link.hash.slice(1))) return;
      event.preventDefault();
      navigate(link.hash, { replace: window.location.hash === link.hash });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname, navigate]);

  return null;
}
