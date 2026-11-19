import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  ['Selected work', '/#projects'],
  ['About', '/#about'],
  ['Notes', '/blog'],
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className={`site-header ${scrolled || open || pathname !== '/' ? 'is-solid' : ''}`}
      onBlur={(event) => {
        if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="wrap masthead">
        <Link className="brand-link" to="/" onClick={() => setOpen(false)} aria-label="JOspeed home">
          <span className="brand-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
            </svg>
          </span>
          JOspeed
        </Link>
        <nav className="mast-nav" aria-label="Primary navigation">
          {links.map(([label, url]) => (
            <Link key={url} to={url} aria-current={pathname === url ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="btn-citron-pill mast-contact" to="/#contact">
          Let’s Talk
        </Link>
        <button
          ref={toggle}
          className="nav-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-navigation" hidden={!open}>
        {[...links, ['Get in touch', '/#contact']].map(([label, url]) => (
          <Link key={url} to={url} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
