import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon, XIcon } from './BrandIcons.jsx';

const NAV = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#070906',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '44px 0 36px',
      }}
    >
      <div
        className="wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        {/* Brand */}
        <div>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'inline-block',
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 18,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: 4,
            }}
          >
            <span style={{ color: 'var(--citron)' }}>⚡</span> JOspeed
          </Link>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(245, 244, 238, 0.4)',
              letterSpacing: '0.06em',
            }}
          >
            Build with Joseph Onifade Speed
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {NAV.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 13.5,
                fontWeight: 500,
                color: 'rgba(245, 244, 238, 0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--citron)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245, 244, 238, 0.6)'; }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Socials + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {[
            { Icon: GithubIcon, href: 'https://github.com/JosephOnifade1', label: 'GitHub' },
            { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/joseph-onifade-ol', label: 'LinkedIn' },
            { Icon: XIcon, href: 'https://x.com/buildwithjospeed', label: 'X' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              title={label}
              style={{
                color: 'rgba(245, 244, 238, 0.4)',
                transition: 'color 0.2s',
                display: 'flex',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--citron)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245, 244, 238, 0.4)'; }}
            >
              <Icon size={16} color="currentColor" />
            </a>
          ))}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(245, 244, 238, 0.3)',
              letterSpacing: '0.04em',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              paddingLeft: 16,
            }}
          >
            © {year} JOspeed
          </span>
        </div>
      </div>
    </footer>
  );
}
