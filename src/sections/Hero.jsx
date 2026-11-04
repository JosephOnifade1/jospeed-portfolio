import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '10+', label: 'Projects' },
  { value: '2+', label: 'Years Learning' },
  { value: '∞', label: 'Curiosity' },
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
        paddingTop: 100,
        paddingBottom: 60,
        position: 'relative',
        overflow: 'hidden',
        background: '#070906',
      }}
    >
      {/* Full-bleed Cinematic Hero Artwork Layer (Desktop) */}
      <div className="hero-artwork-desktop-bg" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet="/jospeed-hero-artwork.webp" />
          <img
            src="/jospeed-hero-artwork.png"
            alt=""
            className="hero-artwork-bg-img"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Contrast gradient: darkens only the text column on the far left */}
        <div className="hero-artwork-left-gradient" />
        {/* Bottom edge fade merging into the next section */}
        <div className="hero-artwork-bottom-gradient" />
        {/* Top edge fade under navbar */}
        <div className="hero-artwork-top-gradient" />
      </div>

      <div className="wrap" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        
        {/* Content Column */}
        <div className="hero-content">
          
          {/* Eyebrow Tag */}
          <div className="hero-anim-1" style={{ marginBottom: 20 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.14em',
                color: '#D8F36A',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>—</span> JOSEPH ONIFADE - JOSPEED
            </span>
          </div>

          {/* Editorial Headline */}
          <h1
            id="hero-headline"
            className="hero-anim-2"
            style={{
              fontSize: 'clamp(46px, 5.4vw, 78px)',
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              marginBottom: 22,
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
              fontSize: 'clamp(14.5px, 1.25vw, 16px)',
              color: 'rgba(245, 244, 238, 0.72)',
              lineHeight: 1.65,
              maxWidth: 490,
              marginBottom: 34,
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
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: 44,
            }}
          >
            <a
              href="#projects"
              className="btn-citron-pill"
              style={{
                padding: '13px 28px',
                fontSize: 15,
                fontWeight: 700,
                boxShadow: '0 4px 18px rgba(216, 243, 106, 0.22)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
              }}
            >
              Explore My Work
              <ArrowRight size={16} />
            </a>

            <a
              href="#contact"
              style={{
                padding: '13px 26px',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--paper)',
                background: 'rgba(20, 24, 18, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: 9999,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.4)';
                e.currentTarget.style.color = '#D8F36A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.color = 'var(--paper)';
              }}
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Only: Dedicated Artwork Focal View */}
          <div className="hero-mobile-artwork">
            <picture>
              <source type="image/webp" srcSet="/jospeed-hero-artwork.webp" />
              <img
                src="/jospeed-hero-artwork.png"
                alt="JOspeed Creative Engineering Sculpture"
                className="hero-mobile-img"
              />
            </picture>
            <div className="hero-mobile-vignette" aria-hidden="true" />
          </div>

          {/* Stats Dock */}
          <div className="hero-stats-dock hero-anim-5">
            {STATS.map(({ value, label }, idx) => (
              <div key={label} style={{ display: 'contents' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 800,
                      fontSize: 20,
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10.5,
                      color: 'rgba(245,244,238,0.5)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {label}
                  </span>
                </div>
                {idx < STATS.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      height: 26,
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        /* Desktop Artwork Background: Spans seamlessly across the hero */
        .hero-artwork-desktop-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .hero-artwork-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          display: block;
          filter: contrast(1.05) brightness(1.02);
        }

        /* Contrast Gradient Overlays */
        .hero-artwork-left-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(7, 9, 6, 0.95) 0%,
            rgba(7, 9, 6, 0.82) 24%,
            rgba(7, 9, 6, 0.38) 42%,
            transparent 56%
          );
        }

        .hero-artwork-bottom-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(to bottom, transparent 0%, rgba(7, 9, 6, 0.8) 60%, var(--ink) 100%);
        }

        .hero-artwork-top-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          background: linear-gradient(to bottom, rgba(7, 9, 6, 0.6) 0%, transparent 100%);
        }

        .hero-content {
          max-width: 560px;
        }

        /* Stats Dock Styling */
        .hero-stats-dock {
          display: inline-flex;
          align-items: center;
          background: rgba(12, 16, 11, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          padding: 14px 26px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          gap: 24px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .hero-mobile-artwork {
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

        /* Responsive Breakpoints */
        @media (max-width: 880px) {
          .hero-artwork-desktop-bg {
            display: none !important;
          }
          .hero-content {
            max-width: 100% !important;
          }
          .hero-mobile-artwork {
            display: block !important;
            position: relative;
            width: 100%;
            height: clamp(320px, 80vw, 440px);
            margin: 12px 0 28px 0;
            border-radius: 16px;
            overflow: hidden;
          }
          .hero-mobile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 73% center;
            display: block;
          }
          .hero-mobile-vignette {
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse 95% 95% at 73% 50%, transparent 50%, rgba(7, 9, 6, 0.7) 85%, var(--ink) 100%);
            pointer-events: none;
          }
          .hero-stats-dock {
            width: 100% !important;
            justify-content: space-around !important;
            padding: 14px 18px !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
