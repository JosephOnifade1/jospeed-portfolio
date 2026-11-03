import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        background: open
          ? '#0A0D09'
          : (scrolled ? 'rgba(10, 13, 9, 0.82)' : 'transparent'),
        backdropFilter: open ? 'none' : (scrolled ? 'blur(16px)' : 'none'),
        WebkitBackdropFilter: open ? 'none' : (scrolled ? 'blur(16px)' : 'none'),
        borderBottom: (open || scrolled)
          ? '1px solid rgba(216, 243, 106, 0.12)'
          : '1px solid transparent',
      }}
    >
      <div
        className="wrap"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 76,
        }}
      >
        {/* Brand Logo */}
        <a
          href="#top"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
          }}
        >
          {/* Stylized Angled Circuit / Slash Monogram */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'rgba(216, 243, 106, 0.12)',
              border: '1px solid rgba(216, 243, 106, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
                fill="#D8F36A"
              />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: '-0.03em',
                color: 'var(--text-main)',
                lineHeight: 1,
              }}
            >
              JOspeed
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'center',
          }}
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-dim)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--citron)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center' }}>
          <a
            href="#contact"
            className="btn-citron-pill"
            style={{
              padding: '10px 22px',
              fontSize: 13.5,
              fontWeight: 600,
            }}
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close Menu' : 'Open Menu'}
          style={{
            color: 'var(--text-main)',
            width: 42,
            height: 42,
            borderRadius: 8,
            background: 'rgba(216, 243, 106, 0.08)',
            border: '1px solid rgba(216, 243, 106, 0.25)',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {open ? <X size={20} color="#D8F36A" /> : <Menu size={20} color="#D8F36A" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 76,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: 'calc(100dvh - 76px)',
            background: '#0A0D09',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            padding: '28px 24px 36px',
            gap: 16,
            overflowY: 'auto',
            animation: 'fadeMenu 0.22s ease-out',
            borderTop: '1px solid rgba(216, 243, 106, 0.1)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: 22,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(245, 244, 238, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{label}</span>
                <span style={{ color: 'var(--citron)', fontSize: 14 }}>→</span>
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-citron-pill"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: 15,
              fontWeight: 700,
              justifyContent: 'center',
            }}
          >
            Let's Talk <ArrowUpRight size={16} />
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeMenu {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-toggle {
          display: none;
        }
        @media (max-width: 860px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
