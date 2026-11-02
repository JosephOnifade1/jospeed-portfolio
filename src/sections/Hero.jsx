import { ArrowRight, ArrowDown } from 'lucide-react';
import Scene3D from '../components/Scene3D.jsx';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from '../components/BrandIcons.jsx';

const STATS = [
  { value: '10+', label: 'Projects' },
  { value: '2+', label: 'Years Learning' },
  { value: '∞', label: 'Curiosity' },
];

const SOCIALS = [
  { Icon: GithubIcon,   href: 'https://github.com/JosephOnifade1',             label: 'GitHub'   },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/joseph-onifade-ol', label: 'LinkedIn' },
  { Icon: XIcon,        href: 'https://x.com/buildwithjospeed',                 label: 'X'        },
  { Icon: DiscordIcon,  href: 'https://discord.com/users/1278856822555414549',  label: 'Discord'  },
];

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 104,
        paddingBottom: 48,
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
      }}
    >
      {/* Background Ambient Citron Glow */}
      <div
        className="ambient-glow-citron"
        style={{
          width: 580,
          height: 580,
          top: '12%',
          right: '8%',
          opacity: 0.7,
        }}
      />

      <div className="wrap" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        
        {/* Desktop & Mobile Grid */}
        <div id="hero-layout">
          
          {/* Main Content Column */}
          <div className="hero-content">
            
            {/* Tag / Eyebrow */}
            <div className="hero-anim-1" style={{ marginBottom: 18 }}>
              <span className="eyebrow-tag">
                Joseph Onifade · JOspeed
              </span>
            </div>

            {/* Editorial Headline */}
            <h1
              id="hero-headline"
              className="hero-anim-2"
              style={{
                fontSize: 'clamp(44px, 5.4vw, 76px)',
                lineHeight: 1.04,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                marginBottom: 20,
              }}
            >
              Build.<br />
              Innovate.<br />
              <span style={{ color: 'var(--citron)' }}>Create More.</span>
            </h1>

            {/* Subtitle / Positioning */}
            <p
              id="hero-sub"
              className="hero-anim-3"
              style={{
                fontSize: 'clamp(15px, 1.35vw, 17px)',
                color: 'var(--text-dim)',
                lineHeight: 1.65,
                maxWidth: 480,
                marginBottom: 32,
                fontWeight: 400,
              }}
            >
              Fullstack Developer &amp; AI Engineer exploring Blockchain and 3D tools like Blender.
              Designing and building intelligent web applications, automated workflows, and production systems.
            </p>

            {/* Action Buttons */}
            <div
              className="hero-anim-4 hero-cta-row"
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: 38,
              }}
            >
              <a href="#projects" className="btn-citron-pill">
                Explore My Work
                <ArrowRight size={15} />
              </a>

              <a href="#contact" className="btn-ghost-pill">
                Get in Touch
              </a>
            </div>

            {/* Desktop Only: Stats Dock & Social Links */}
            <div className="desktop-stats-row hero-anim-5">
              {/* Stat Pill Dock */}
              <div className="stat-pill-container">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="stat-item">
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
              </div>

              {/* Social Icons */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(245, 244, 238, 0.04)',
                      border: '1px solid rgba(245, 244, 238, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-dim)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--citron)';
                      e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.3)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-dim)';
                      e.currentTarget.style.borderColor = 'rgba(245, 244, 238, 0.08)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <Icon size={16} color="currentColor" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* 3D Visual Centerpiece */}
          <div id="hero-3d-wrapper">
            <Scene3D />

            {/* Interactive Hint Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                pointerEvents: 'none',
                background: 'rgba(10, 13, 9, 0.75)',
                padding: '4px 12px',
                borderRadius: 9999,
                border: '1px solid rgba(216, 243, 106, 0.15)',
                backdropFilter: 'blur(8px)',
                whiteSpace: 'nowrap',
              }}
            >
              drag to explore 3D
            </div>
          </div>

          {/* Mobile Only: Stats Dock & Social Links positioned right below the 3D visual */}
          <div className="mobile-stats-row">
            <div className="stat-pill-container" style={{ width: '100%', justifyContent: 'space-around' }}>
              {STATS.map(({ value, label }) => (
                <div key={label} className="stat-item" style={{ padding: '0 8px' }}>
                  <span className="stat-value" style={{ fontSize: 20 }}>{value}</span>
                  <span className="stat-label" style={{ fontSize: 10 }}>{label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 16 }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: 'rgba(245, 244, 238, 0.04)',
                    border: '1px solid rgba(245, 244, 238, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-dim)',
                  }}
                >
                  <Icon size={17} color="currentColor" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div
          className="hero-anim-5"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 40,
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <a
            href="#about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'inherit',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--citron)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-faint)')}
          >
            <span>Scroll Down</span>
            <span style={{ animation: 'bounceDown 1.8s infinite ease-in-out' }}>
              <ArrowDown size={13} />
            </span>
          </a>
        </div>
      </div>

      <style>{`
        /* Desktop Layout */
        #hero-layout {
          display: grid;
          grid-template-columns: 1.05fr 1.15fr;
          gap: 28px;
          align-items: center;
          width: 100%;
        }
        #hero-3d-wrapper {
          position: relative;
          width: 100%;
          height: clamp(480px, 58vw, 650px);
          display: flex;
          align-items: center;
          justifyContent: center;
        }
        .desktop-stats-row {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .mobile-stats-row {
          display: none;
        }

        /* Entrance animations */
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-anim-1 { animation: heroFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s backwards; }
        .hero-anim-2 { animation: heroFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.12s backwards; }
        .hero-anim-3 { animation: heroFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.20s backwards; }
        .hero-anim-4 { animation: heroFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.28s backwards; }
        .hero-anim-5 { animation: heroFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.36s backwards; }

        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        /* Mobile Layout */
        @media (max-width: 880px) {
          #hero-layout {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          .hero-content {
            width: 100% !important;
          }
          .desktop-stats-row {
            display: none !important;
          }
          #hero-3d-wrapper {
            height: clamp(340px, 75vw, 440px) !important;
            margin: 10px 0 !important;
          }
          .mobile-stats-row {
            display: block !important;
            width: 100% !important;
          }
          .hero-cta-row {
            margin-bottom: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
