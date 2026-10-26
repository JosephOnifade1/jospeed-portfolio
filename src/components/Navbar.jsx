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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      background: open ? '#24100e' : (scrolled ? 'rgba(28,10,10,0.88)' : 'transparent'),
      backdropFilter: open ? 'none' : (scrolled ? 'blur(16px)' : 'none'),
      WebkitBackdropFilter: open ? 'none' : (scrolled ? 'blur(16px)' : 'none'),
      borderBottom: (open || scrolled) ? '1px solid rgba(240,232,213,0.08)' : '1px solid transparent',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <a href="#top" style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--text)' }}>
          JO<span style={{ color: 'var(--accent-gold)' }}>speed</span>
        </a>

        <div className="desktop-links" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 14, color: 'var(--text-dim)', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
            >{l}</a>
          ))}
          <a href="#contact" style={{
            padding: '9px 20px', borderRadius: 6,
            background: '#F2ECD1',
            color: '#4D2622',
            fontSize: 14, fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'background 0.2s, transform 0.2s',
            border: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F2ECD1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Hire me <ArrowUpRight size={14} />
          </a>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close Menu' : 'Open Menu'}
          style={{
            display: 'none',
            color: 'var(--text)',
            width: 44,
            height: 44,
            borderRadius: 8,
            background: 'rgba(242,236,209,0.08)',
            border: '1px solid rgba(242,236,209,0.14)',
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{
          position: 'fixed',
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: 'calc(100dvh - 72px)',
          background: '#24100e',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 28px 36px 28px',
          gap: 20,
          overflowY: 'auto',
          animation: 'fadeDown 0.22s ease-out',
        }}>
          {LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{
                fontSize: 22,
                fontFamily: 'var(--display)',
                fontWeight: 700,
                color: 'var(--text)',
                padding: '10px 0',
                borderBottom: '1px solid rgba(242,236,209,0.08)',
                display: 'block',
              }}
            >{l}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} style={{
            padding: '14px 24px', borderRadius: 8,
            background: '#F2ECD1', color: '#4D2622',
            fontSize: 16, fontWeight: 700, width: '100%', marginTop: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          }}>Hire me <ArrowUpRight size={16} /></a>
        </div>
      )}

      <style>{`
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 860px) {
          .desktop-links { display: none !important; }
          .mobile-toggle { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </nav>
  );
}
