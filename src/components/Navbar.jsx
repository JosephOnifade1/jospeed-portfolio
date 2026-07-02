import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const LINKS = ['About', 'Projects', 'Skills', 'Services', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(7,7,12,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
        <a href="#top" style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
          Jos<span style={{ color: 'var(--indigo-bright)' }}>peed</span>
        </a>

        <div className="desktop-links" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ fontSize: 14, color: 'var(--text-dim)', fontWeight: 500, transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {l}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary btn-sm">
            Hire me <ArrowUpRight size={15} />
          </a>
        </div>

        <button className="mobile-toggle" onClick={() => setOpen(!open)} style={{ display: 'none' }} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 76,
            background: 'var(--bg-deep)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 32px',
            gap: 28,
          }}
        >
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ fontSize: 24, fontFamily: 'var(--display)', fontWeight: 600 }}>
              {l}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary" style={{ width: 'fit-content', marginTop: 12 }}>
            Hire me <ArrowUpRight size={16} />
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-links { display: none !important; }
          .mobile-toggle { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </nav>
  );
}
