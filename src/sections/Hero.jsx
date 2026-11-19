import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { locationLabel, profile } from '../data/profile.js';
import { WORK_INDEX } from '../data/projects.js';
import { getAllPosts } from '../utils/blog.js';

const STATS = [
  { value: WORK_INDEX.length, label: 'Case studies' },
  { value: getAllPosts().length, label: 'Field notes', to: '/blog' },
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
            data-route-title
            tabIndex={-1}
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

          <div id="hero-sub" className="hero-intro hero-anim-3">
            <p className="hero-identity">
              {profile.role} · <span>{locationLabel}</span>
            </p>
            <p>
              I build tools like{' '}
              <Link to="/case-study/quivellox" state={{ entry: 'hero' }} aria-label="Quivellox case study">
                Quivellox
              </Link>
              , where readers can check an AI answer against the passage it came from. I’m open to client
              projects and engineering roles.
            </p>
          </div>

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
            {STATS.map(({ value, label, to }, idx) => {
              const Item = to ? Link : 'div';
              return (
                <Fragment key={label}>
                  <Item to={to} className="hero-stat">
                    <span className="hero-stat-value">{value}</span>
                    <span className="hero-stat-label">{label}</span>
                  </Item>
                  {idx < STATS.length - 1 && <span className="hero-stat-rule" aria-hidden="true" />}
                </Fragment>
              );
            })}
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

        .hero-intro {
          max-width: 490px;
          margin-bottom: 34px;
          font-size: clamp(14.5px, 1.25vw, 16px);
          line-height: 1.65;
          color: rgba(245, 244, 238, 0.86);
          text-shadow: 0 1px 3px var(--ink);
        }
        .hero-identity {
          margin-bottom: 6px;
          font: 600 1em/1.45 var(--font-ui);
          color: var(--paper);
          text-wrap: balance;
        }
        .hero-identity span { white-space: nowrap; }
        .hero-intro a, a.hero-stat .hero-stat-label {
          color: var(--citron);
          text-decoration: underline;
          text-underline-offset: 0.2em;
        }
        .hero-intro a:hover, a.hero-stat:hover .hero-stat-label { color: var(--citron-light); }

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

        .hero-stat {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          min-height: 44px;
        }
        .hero-stat-value {
          font: 800 20px/1 var(--font-ui);
          letter-spacing: -0.02em;
          color: #fff;
        }
        .hero-stat-label {
          font: 10.5px/1.6 var(--font-mono);
          letter-spacing: 0.04em;
          color: rgba(245, 244, 238, 0.5);
        }
        .hero-stat-rule {
          width: 1px;
          height: 26px;
          background: rgba(255, 255, 255, 0.1);
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
