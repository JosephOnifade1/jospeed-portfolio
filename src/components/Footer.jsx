import { GithubIcon, LinkedinIcon, XIcon } from './BrandIcons.jsx';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--ink)',
        borderTop: '1px solid rgba(245,244,238,0.07)',
        padding: '40px 0 32px',
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
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 18,
              color: 'var(--paper)',
              letterSpacing: '-0.03em',
              marginBottom: 4,
            }}
          >
            <span style={{ color: 'var(--citron)' }}>⚡</span> JOspeed
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(245,244,238,0.35)',
              letterSpacing: '0.06em',
            }}
          >
            Build with Joseph Onifade Speed
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 13.5,
                fontWeight: 500,
                color: 'rgba(245,244,238,0.45)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--citron)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,244,238,0.45)'; }}
            >
              {label}
            </a>
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
                color: 'rgba(245,244,238,0.35)',
                transition: 'color 0.2s',
                display: 'flex',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--citron)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,244,238,0.35)'; }}
            >
              <Icon size={16} color="currentColor" />
            </a>
          ))}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(245,244,238,0.25)',
              letterSpacing: '0.04em',
              borderLeft: '1px solid rgba(245,244,238,0.1)',
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

