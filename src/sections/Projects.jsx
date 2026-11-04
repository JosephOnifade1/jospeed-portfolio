import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal } from '../hooks/useReveal.js';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons.jsx';

// Showcase projects matching the approved design reference
const SHOWCASE_PROJECTS = [
  {
    id: 'quivellox',
    name: 'Quivellox',
    categorySubtitle: 'AI · RAG · Knowledge Workspace',
    category: 'AI / Automation',
    tag: '01 / FEATURED PROJECT',
    headline: 'Ask. Find. Understand.',
    subheadline: 'Your AI-powered knowledge workspace for deeper insights and trusted answers.',
    ctaText: 'Explore Workspace →',
    description:
      'An intelligent knowledge workspace built with RAG, designed to help you find, understand, and organize information effortlessly with evidence-grounded answers.',
    stack: ['React', 'TypeScript', 'Dify', 'Supabase', 'RAG'],
    github: 'https://github.com/JosephOnifade1',
    live: null,
    hasCaseStudy: true,
    accentColor: '#D8F36A',
    gradient: 'linear-gradient(135deg, #0e1710 0%, #070d08 60%, #030504 100%)',
    borderGlow: 'rgba(216, 243, 106, 0.45)',
    type: 'ai-workspace',
  },
  {
    id: 'revive-touch',
    name: 'Revive Touch',
    categorySubtitle: 'Mobile App · On-Demand Dispatch',
    category: 'Mobile Application',
    tag: '02 / CLIENT APPLICATION',
    headline: 'Request a Massage',
    subheadline: 'At Poker Events & High-Stakes Tournaments',
    ctaText: 'Get Started →',
    description:
      'An on-demand mobile request and dispatch platform built for live poker tournaments. Real-time player queues, table assignments, and staff coordination.',
    stack: ['React Native', 'Supabase', 'Expo', 'PostgreSQL'],
    github: 'https://github.com/JosephOnifade1',
    live: null,
    hasCaseStudy: true,
    accentColor: '#4ADE80',
    gradient: 'linear-gradient(135deg, #0d1a10 0%, #060e07 60%, #020503 100%)',
    borderGlow: 'rgba(74, 222, 128, 0.4)',
    type: 'mobile-app',
  },
  {
    id: 'jospeed-studio',
    name: 'JOspeed Studio',
    categorySubtitle: 'Tools · Automation · Production Systems',
    category: 'Dev Platform',
    tag: '03 / SYSTEM PLATFORM',
    headline: 'Build. Automate. Scale.',
    subheadline: 'Modern tools for digital creators & automated workflows.',
    ctaText: 'Launch Tools →',
    description:
      'A developer tool suite and autonomous engine orchestrating AI workers, scraper pipelines, and high-frequency webhook data synchronizations.',
    stack: ['React', 'Node.js', 'Python', 'Tailwind', 'Docker'],
    github: 'https://github.com/JosephOnifade1',
    live: null,
    hasCaseStudy: false,
    accentColor: '#D8F36A',
    gradient: 'linear-gradient(135deg, #10160d 0%, #080d06 60%, #030502 100%)',
    borderGlow: 'rgba(216, 243, 106, 0.35)',
    type: 'platform',
  },
  {
    id: 'borynx',
    name: 'Borynx',
    categorySubtitle: 'Freelancer Community · High-Signal Network',
    category: 'Web Application',
    tag: '04 / COMMUNITY ENGINE',
    headline: 'Insights. Trends. Growth.',
    subheadline: 'High-signal network for independent creators & serious freelancers.',
    ctaText: 'View Community →',
    description:
      'A zero-lockin full-text community engine with sub-80ms feed latencies, optimistic UI updates, and Postgres Row-Level Security rules.',
    stack: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL FTS'],
    github: 'https://github.com/JosephOnifade1/freelancer-s-hub',
    live: null,
    hasCaseStudy: true,
    accentColor: '#38BDF8',
    gradient: 'linear-gradient(135deg, #09131a 0%, #04090e 60%, #020406 100%)',
    borderGlow: 'rgba(56, 189, 248, 0.35)',
    type: 'community',
  },
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [headRef, headIn] = useReveal(0.08);
  const total = SHOWCASE_PROJECTS.length;
  const current = SHOWCASE_PROJECTS[activeIdx];

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback(
    (index) => {
      setActiveIdx(((index % total) + total) % total);
    },
    [total]
  );

  const prev = () => goTo(activeIdx - 1);
  const next = () => goTo(activeIdx + 1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  // Touch Swipe for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) next();
      else prev();
    }
  };

  // Circular layout calculation (relative offset: -1, 0, 1, 2...)
  const getCardTransform = (index) => {
    let offset = index - activeIdx;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const isCenter = offset === 0;
    const absOff = Math.abs(offset);

    // Desktop values matching the attached screenshot
    // Active card: wide 580px, centered, z-index 30
    // Flanking cards: rotated ~ -7deg and +7deg, scaled down, overlapping behind
    const xDistance = 320;
    const x = offset * xDistance;
    const y = isCenter ? 0 : 20 + absOff * 10;
    const rotate = offset * 6; // -6deg on left, +6deg on right
    const scale = isCenter ? 1 : Math.max(0.82, 1 - absOff * 0.1);
    const zIndex = 30 - absOff * 10;
    const opacity = absOff > 1.5 ? 0.35 : isCenter ? 1 : 0.65;
    const brightness = isCenter ? 1 : 0.55;

    return {
      x,
      y,
      rotate,
      scale,
      zIndex,
      opacity,
      brightness,
      isCenter,
      offset,
    };
  };

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        background: '#070906',
        padding: 'clamp(90px, 9vw, 140px) 0 clamp(70px, 8vw, 110px)',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* ── Standalone Atmospheric Background Artwork ── */}
      <div className="projects-artwork-bg" aria-hidden="true">
        <picture>
          <img
            src="/jospeed-project-art.webp"
            alt=""
            className="projects-artwork-img"
            loading="lazy"
            decoding="async"
          />
        </picture>
        {/* Soft edge blend overlays to seamlessly integrate into #070906 */}
        <div className="projects-artwork-top-gradient" />
        <div className="projects-artwork-bottom-gradient" />
        <div className="projects-artwork-center-vignette" />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── 1. Section Heading ── */}
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(44px, 6vw, 68px)',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.16em',
              color: '#D8F36A',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span>—</span>
            <span>03 / SELECTED WORK</span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(42px, 5.8vw, 76px)',
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              margin: '0 0 16px',
            }}
          >
            Things I've <span style={{ color: '#D8F36A' }}>built.</span>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.35vw, 17px)',
              color: 'rgba(245, 244, 238, 0.65)',
              maxWidth: 580,
              lineHeight: 1.65,
              margin: '0 auto',
            }}
          >
            Real products, experiments, and systems I'm proud of.
          </p>
        </div>

        {/* ── 2. Interactive Layered Project Deck ── */}
        <div
          className="projects-deck-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="projects-deck-stage">
            {SHOWCASE_PROJECTS.map((project, idx) => {
              const transform = getCardTransform(idx);
              const isCenter = transform.isCenter;

              return (
                <motion.div
                  key={project.id}
                  className="projects-deck-card"
                  onClick={() => goTo(idx)}
                  animate={{
                    x: transform.x,
                    y: transform.y,
                    rotate: transform.rotate,
                    scale: transform.scale,
                    opacity: transform.opacity,
                    filter: `brightness(${transform.brightness})`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 30,
                    mass: 0.85,
                  }}
                  style={{
                    zIndex: transform.zIndex,
                    cursor: isCenter ? 'default' : 'pointer',
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${project.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goTo(idx);
                    }
                  }}
                >
                  <div
                    className="card-screen-shell"
                    style={{
                      background: project.gradient,
                      borderColor: isCenter ? project.borderGlow : 'rgba(245, 244, 238, 0.08)',
                      boxShadow: isCenter
                        ? '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(216, 243, 106, 0.12)'
                        : '0 20px 45px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {/* Top Application Bar */}
                    <div className="card-app-header">
                      <div className="card-brand-pill">
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: project.accentColor,
                            boxShadow: `0 0 8px ${project.accentColor}`,
                            display: 'inline-block',
                          }}
                        />
                        <span style={{ fontWeight: 700, letterSpacing: '-0.01em', color: '#FFFFFF' }}>
                          {project.name}
                        </span>
                      </div>

                      <div className="card-header-tools">
                        <span className="tool-tag">Workspace ▾</span>
                        <span className="search-mock">⚲ Search...</span>
                        <div className="avatar-dot" />
                      </div>
                    </div>

                    {/* Card Content Stage (Custom Authentic Mockup Visual) */}
                    <div className="card-hero-canvas">
                      {/* Left: Project Headline & CTA */}
                      <div className="card-copy-block">
                        <h4 className="card-main-heading">{project.headline}</h4>
                        <p className="card-sub-copy">{project.subheadline}</p>

                        <div className="card-action-pill" style={{ color: '#070906', background: project.accentColor }}>
                          <span>{project.ctaText}</span>
                        </div>
                      </div>

                      {/* Right: Specialized Visual Device */}
                      <div className="card-visual-device">
                        {project.type === 'ai-workspace' && (
                          <div className="cube-3d-visual">
                            {/* Glowing central cube */}
                            <div className="cube-core">
                              <span className="cube-flower">✱</span>
                            </div>
                            {/* Surrounding floating glass cards */}
                            <div className="glass-tile-float tile-1">
                              <span>Embedding vector index</span>
                            </div>
                            <div className="glass-tile-float tile-2">
                              <span>Source: doc_chunk_42.pdf</span>
                            </div>
                          </div>
                        )}

                        {project.type === 'mobile-app' && (
                          <div className="phone-mock-frame">
                            <div className="phone-screen-inner">
                              <div className="phone-notch" />
                              <div className="phone-logo">✱</div>
                              <div className="phone-title">Revive Touch</div>
                              <div className="phone-pill">Table #14 — 15m</div>
                            </div>
                          </div>
                        )}

                        {project.type === 'platform' && (
                          <div className="torus-3d-visual">
                            <div className="torus-ring" />
                            <div className="torus-dot" />
                          </div>
                        )}

                        {project.type === 'community' && (
                          <div className="feed-mock-visual">
                            <div className="feed-item active">▲ Upvoted +48</div>
                            <div className="feed-item">Solopreneur Revenue Stack</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── 3. Project Information Dynamic Bar ── */}
        <div className="project-info-dock">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="project-info-inner"
            >
              {/* Left Column: Project Name & Tagline */}
              <div className="dock-col-left">
                <div className="dock-eyebrow">
                  <span>—</span>
                  <span>{current.tag}</span>
                </div>
                <h3 className="dock-title">{current.name}</h3>
                <div className="dock-subtitle">{current.categorySubtitle}</div>
              </div>

              {/* Middle Column: Accurate Description */}
              <div className="dock-col-middle">
                <p className="dock-description">{current.description}</p>
              </div>

              {/* Right Column: Stack Badges & Case Study Link */}
              <div className="dock-col-right">
                <div className="dock-badges">
                  {current.stack.map((tech) => (
                    <span key={tech} className="dock-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="dock-links">
                  {current.hasCaseStudy ? (
                    <Link to={`/case-study/${current.id}`} className="dock-cta-link">
                      <span>View Case Study</span>
                      <span>→</span>
                    </Link>
                  ) : current.live ? (
                    <a
                      href={current.live}
                      target={current.live.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="dock-cta-link"
                    >
                      <span>Explore Live</span>
                      <span>→</span>
                    </a>
                  ) : (
                    <a
                      href={current.github}
                      target="_blank"
                      rel="noreferrer"
                      className="dock-cta-link"
                    >
                      <span>View Code</span>
                      <span>→</span>
                    </a>
                  )}

                  {current.github && (
                    <a
                      href={current.github}
                      target="_blank"
                      rel="noreferrer"
                      className="dock-icon-link"
                      title="GitHub Repository"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── 4. Bottom Controls & Timeline Bar ── */}
          <div className="dock-footer-nav">
            {/* Arrow Navigation */}
            <div className="nav-arrows">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous Project"
                className="nav-arrow-btn"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next Project"
                className="nav-arrow-btn"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Horizontal Timeline Bar with Active Segment Indicator */}
            <div className="nav-timeline-track">
              {SHOWCASE_PROJECTS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  className={`nav-timeline-segment ${i === activeIdx ? 'active' : ''}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="nav-counter">
              <span className="counter-current">0{activeIdx + 1}</span>
              <span className="counter-sep">/</span>
              <span className="counter-total">0{total}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Standalone Atmospheric Background Artwork ── */
        .projects-artwork-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .projects-artwork-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          opacity: 0.65;
          filter: contrast(1.05) brightness(0.92);
          transform: translateZ(0);
          will-change: transform;
        }

        .projects-artwork-top-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(to bottom, #070906 0%, rgba(7, 9, 6, 0.7) 40%, transparent 100%);
        }

        .projects-artwork-bottom-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: linear-gradient(to top, #070906 0%, rgba(7, 9, 6, 0.85) 50%, transparent 100%);
        }

        .projects-artwork-center-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 85% 70% at 50% 50%,
            rgba(7, 9, 6, 0.45) 0%,
            rgba(7, 9, 6, 0.25) 45%,
            rgba(7, 9, 6, 0.85) 100%
          );
        }

        /* ── Deck Stage & Composition ── */
        .projects-deck-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: clamp(36px, 5vw, 60px);
        }

        .projects-deck-stage {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: clamp(360px, 42vw, 480px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .projects-deck-card {
          position: absolute;
          width: clamp(320px, 48vw, 600px);
          height: clamp(280px, 34vw, 380px);
          user-select: none;
          outline: none;
          will-change: transform, opacity, filter;
        }

        .card-screen-shell {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          border-width: 1px;
          border-style: solid;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          background-clip: padding-box;
        }

        /* Card Top Bar */
        .card-app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-family: var(--font-mono);
          font-size: 11px;
        }

        .card-brand-pill {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-header-tools {
          display: flex;
          align-items: center;
          gap: 14px;
          color: rgba(245, 244, 238, 0.5);
        }

        .tool-tag {
          font-size: 10px;
          cursor: default;
        }

        .search-mock {
          background: rgba(255, 255, 255, 0.05);
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 10px;
        }

        .avatar-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #D8F36A;
          opacity: 0.8;
        }

        /* Card Hero Canvas Layout */
        .card-hero-canvas {
          position: relative;
          flex: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          padding: clamp(16px, 2.8vw, 30px);
          gap: 16px;
          overflow: hidden;
        }

        .card-copy-block {
          z-index: 2;
        }

        .card-main-heading {
          font-family: var(--font-ui);
          font-size: clamp(22px, 2.6vw, 34px);
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.035em;
          line-height: 1.1;
          margin: 0 0 10px;
        }

        .card-sub-copy {
          font-family: var(--font-body);
          font-size: clamp(11.5px, 1.1vw, 13.5px);
          color: rgba(245, 244, 238, 0.62);
          line-height: 1.5;
          margin: 0 0 18px;
          max-width: 280px;
        }

        .card-action-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-ui);
          font-size: 11.5px;
          font-weight: 700;
          padding: 7px 16px;
          border-radius: 100px;
          cursor: pointer;
          letter-spacing: -0.01em;
        }

        /* Right Device Visuals */
        .card-visual-device {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Cube 3D (Quivellox) */
        .cube-3d-visual {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cube-core {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          background: #D8F36A;
          color: #070906;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-weight: 900;
          box-shadow: 0 0 40px rgba(216, 243, 106, 0.6), inset 0 0 12px rgba(255, 255, 255, 0.5);
          transform: rotate(8deg);
          animation: floatCube 5s ease-in-out infinite;
        }

        @keyframes floatCube {
          0%, 100% { transform: translateY(0px) rotate(8deg); }
          50% { transform: translateY(-6px) rotate(12deg); }
        }

        .glass-tile-float {
          position: absolute;
          background: rgba(14, 22, 14, 0.75);
          border: 1px solid rgba(216, 243, 106, 0.25);
          border-radius: 8px;
          padding: 6px 10px;
          font-family: var(--font-mono);
          font-size: 9px;
          color: rgba(245, 244, 238, 0.75);
          backdrop-filter: blur(8px);
          white-space: nowrap;
        }

        .glass-tile-float.tile-1 {
          top: 8px;
          left: -10px;
        }

        .glass-tile-float.tile-2 {
          bottom: 12px;
          right: -10px;
        }

        /* Phone Mock (Revive Touch) */
        .phone-mock-frame {
          width: 90px;
          height: 170px;
          border-radius: 18px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          background: #000000;
          padding: 6px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(74, 222, 128, 0.2);
          transform: rotate(4deg);
        }

        .phone-screen-inner {
          width: 100%;
          height: 100%;
          background: #0c140e;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 6px;
          text-align: center;
        }

        .phone-notch {
          width: 24px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.2);
          margin-bottom: 18px;
        }

        .phone-logo {
          color: #4ADE80;
          font-size: 20px;
          margin-bottom: 6px;
        }

        .phone-title {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 12px;
        }

        .phone-pill {
          font-family: var(--font-mono);
          font-size: 7.5px;
          color: #4ADE80;
          background: rgba(74, 222, 128, 0.15);
          padding: 3px 8px;
          border-radius: 100px;
        }

        /* Torus (JOspeed Studio) */
        .torus-3d-visual {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .torus-ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 6px solid #D8F36A;
          box-shadow: 0 0 35px rgba(216, 243, 106, 0.4);
          transform: rotateX(55deg) rotateY(20deg);
        }

        .torus-dot {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 0 14px #FFFFFF;
        }

        /* Feed Mock (Borynx) */
        .feed-mock-visual {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 140px;
        }

        .feed-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px 10px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: rgba(245, 244, 238, 0.7);
        }

        .feed-item.active {
          border-color: rgba(56, 189, 248, 0.4);
          color: #38BDF8;
          background: rgba(56, 189, 248, 0.1);
        }

        /* ── 3. Project Information Dynamic Dock ── */
        .project-info-dock {
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
        }

        .project-info-inner {
          display: grid;
          grid-template-columns: 280px 1fr auto;
          align-items: center;
          gap: clamp(20px, 4vw, 44px);
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(245, 244, 238, 0.08);
        }

        .dock-col-left {
          display: flex;
          flex-direction: column;
        }

        .dock-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #D8F36A;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .dock-title {
          font-family: var(--font-ui);
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.03em;
          margin: 0 0 4px;
          line-height: 1.1;
        }

        .dock-subtitle {
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: rgba(245, 244, 238, 0.55);
        }

        .dock-col-middle {
          max-width: 440px;
        }

        .dock-description {
          font-family: var(--font-body);
          font-size: 14.5px;
          color: rgba(245, 244, 238, 0.72);
          line-height: 1.6;
          margin: 0;
        }

        .dock-col-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 14px;
        }

        .dock-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: flex-end;
        }

        .dock-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(245, 244, 238, 0.75);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          padding: 4px 10px;
          border-radius: 100px;
        }

        .dock-links {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .dock-cta-link {
          font-family: var(--font-ui);
          font-size: 13.5px;
          font-weight: 600;
          color: #D8F36A;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s ease, color 0.2s ease;
        }

        .dock-cta-link:hover {
          color: #E9FF88;
          gap: 10px;
        }

        .dock-icon-link {
          color: rgba(245, 244, 238, 0.5);
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .dock-icon-link:hover {
          color: #D8F36A;
        }

        /* ── 4. Bottom Footer Controls ── */
        .dock-footer-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          gap: 24px;
        }

        .nav-arrows {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(245, 244, 238, 0.12);
          background: rgba(255, 255, 255, 0.03);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-arrow-btn:hover {
          border-color: #D8F36A;
          color: #D8F36A;
          background: rgba(216, 243, 106, 0.08);
          transform: scale(1.05);
        }

        .nav-timeline-track {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 420px;
        }

        .nav-timeline-segment {
          flex: 1;
          height: 2px;
          background: rgba(245, 244, 238, 0.12);
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.3s ease, height 0.3s ease;
        }

        .nav-timeline-segment.active {
          background: #D8F36A;
          height: 3px;
          box-shadow: 0 0 10px rgba(216, 243, 106, 0.5);
        }

        .nav-counter {
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.08em;
        }

        .counter-current {
          color: #D8F36A;
          font-weight: 700;
        }

        .counter-sep {
          color: rgba(245, 244, 238, 0.25);
          margin: 0 4px;
        }

        .counter-total {
          color: rgba(245, 244, 238, 0.45);
        }

        /* ── Responsive Behavior ── */
        @media (max-width: 960px) {
          .project-info-inner {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .dock-col-right {
            align-items: flex-start;
          }

          .dock-badges {
            justify-content: flex-start;
          }

          .projects-deck-card {
            width: clamp(280px, 65vw, 480px);
            height: clamp(260px, 46vw, 340px);
          }
        }

        @media (max-width: 640px) {
          .card-hero-canvas {
            grid-template-columns: 1fr;
          }

          .card-visual-device {
            display: none;
          }

          .card-main-heading {
            font-size: 24px;
          }

          .projects-deck-card {
            width: 86vw;
            height: 270px;
          }

          .dock-footer-nav {
            flex-wrap: wrap;
          }

          .nav-timeline-track {
            order: 3;
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
