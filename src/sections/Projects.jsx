import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal } from '../hooks/useReveal.js';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons.jsx';
import { PROJECTS } from '../data/projects.js';

// Curated 6 primary showcase projects matching the requested deck
const SHOWCASE_PROJECTS = [
  {
    id: 'quivellox',
    name: 'Quivellox',
    categorySubtitle: 'AI · RAG · Knowledge Workspace',
    category: 'AI / Automation',
    tag: 'RAG & VECTOR SEARCH',
    description:
      'An AI-powered knowledge workspace built around retrieval-augmented generation. Upload private documents, parse semantics, and receive grounded answers with strict source verification.',
    stack: ['React', 'LangChain', 'Supabase pgvector', 'OpenAI'],
    github: 'https://github.com/JosephOnifade1',
    live: null,
    hasCaseStudy: true,
    image: '/projects/quivellox-preview.png',
    fallbackSvg: '/projects/quivellox.svg',
    accentColor: '#D8F36A',
    gradient: 'linear-gradient(160deg, #0d1e13 0%, #08140c 50%, #030805 100%)',
    badgeText: 'FEATURED ARCHITECTURE',
    metrics: 'Zero-hallucination source retrieval',
  },
  {
    id: 'revive-touch',
    name: 'Revive Touch',
    categorySubtitle: 'Mobile Client · Realtime Dispatch · Live Events',
    category: 'Web & Mobile',
    tag: 'REACT NATIVE & SUPABASE',
    description:
      'On-demand massage-request app built for high-stakes poker tournaments and events. Real-time player queues, table assignment, and staff management.',
    stack: ['React Native', 'Supabase Realtime', 'Expo', 'PostgreSQL'],
    github: 'https://github.com/JosephOnifade1',
    live: null,
    hasCaseStudy: true,
    image: '/projects/revive-touch-preview.png',
    fallbackSvg: '/projects/revive-touch.svg',
    accentColor: '#4ADE80',
    gradient: 'linear-gradient(160deg, #1c0e18 0%, #10060e 50%, #050204 100%)',
    badgeText: 'CLIENT APPLICATION',
    metrics: 'Android Delivered · iOS in progress',
  },
  {
    id: 'borynx',
    name: 'Borynx',
    categorySubtitle: 'Freelancer Community · High-Signal Network',
    category: 'Web Application',
    tag: 'POSTGRES RLS & OPTIMISTIC UI',
    description:
      'High-signal freelancer community built for serious solo operators. Features sub-community isolation with Row-Level Security and full-text search indexing.',
    stack: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL FTS'],
    github: 'https://github.com/JosephOnifade1/freelancer-s-hub',
    live: null,
    hasCaseStudy: true,
    image: '/projects/borynx.svg',
    fallbackSvg: '/projects/borynx.svg',
    accentColor: '#FACC15',
    gradient: 'linear-gradient(160deg, #24100c 0%, #140806 50%, #050202 100%)',
    badgeText: 'FULL-STACK PLATFORM',
    metrics: '< 80ms feed & upvote latency',
  },
  {
    id: 'fiverr-scout',
    name: 'Fiverr Scout',
    categorySubtitle: 'Niche Arbitrage · Intelligence Terminal',
    category: 'AI & Data Engineering',
    tag: 'SCRAPER PIPELINE + GEMINI AI',
    description:
      'Autonomous market intelligence terminal scraping competition density, order queue depth, and review velocity to surface 5:1 demand gaps.',
    stack: ['React', 'Gemini 1.5 Flash', 'Supabase', 'Node.js'],
    github: 'https://github.com/JosephOnifade1/fiverr-scout',
    live: null,
    hasCaseStudy: true,
    image: '/projects/fiverr-scout.svg',
    fallbackSvg: '/projects/fiverr-scout.svg',
    accentColor: '#38BDF8',
    gradient: 'linear-gradient(160deg, #16170d 0%, #0e0f07 50%, #040502 100%)',
    badgeText: 'MARKET ANALYTICS',
    metrics: '5:1 Demand Gap Score in <30s',
  },
  {
    id: 'ai-client-finder',
    name: 'AI Client Finder',
    categorySubtitle: 'Autonomous Lead Engine · LLM Inference',
    category: 'AI / Automation',
    tag: 'GROQ LLAMA-3 & TELEGRAM BOT',
    description:
      'High-throughput freelance lead harvester polling developer forums every 4 hours, scoring fit and project budget in sub-300ms using Groq Llama-3.',
    stack: ['n8n', 'Groq Llama 3', 'Supabase', 'Telegram Bot API'],
    github: 'https://github.com/JosephOnifade1',
    live: null,
    hasCaseStudy: true,
    image: '/projects/ai-client-finder.svg',
    fallbackSvg: '/projects/ai-client-finder.svg',
    accentColor: '#A78BFA',
    gradient: 'linear-gradient(160deg, #0e1a17 0%, #07100e 50%, #020504 100%)',
    badgeText: 'AUTOMATION PIPELINE',
    metrics: '90% open rates via push dispatch',
  },
  {
    id: '3d-art-lab',
    name: '3D Art & Shaders',
    categorySubtitle: 'Blender Experiments · WebGL & Three.js',
    category: '3D & Creative Exploration',
    tag: 'BLENDER & PROCEDURAL GLSL',
    description:
      'Creative exploration in 3D modeling, lighting studies, procedural shaders, and interactive WebGL canvas scenes pushing digital craft.',
    stack: ['Blender', 'Three.js', 'WebGL', 'GLSL'],
    github: 'https://github.com/JosephOnifade1',
    live: '/gallery',
    hasCaseStudy: false,
    image: '/projects/art-lab-preview.png',
    fallbackSvg: '/projects/art-lab-preview.png',
    accentColor: '#F472B6',
    gradient: 'linear-gradient(160deg, #180d1e 0%, #0e0712 50%, #040205 100%)',
    badgeText: 'CREATIVE EXPLORATION',
    metrics: 'Realtime lighting & geometry',
  },
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [headRef, headIn] = useReveal(0.1);
  const total = SHOWCASE_PROJECTS.length;
  const current = SHOWCASE_PROJECTS[activeIdx];

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

  // Deck layer layout calculation based on circular offset from active
  const getCardLayout = (index) => {
    let offset = index - activeIdx;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOff = Math.abs(offset);
    const isCenter = offset === 0;

    // Fanned out spread positions like reference
    // Desktop parameters:
    const xDistance = 160;
    const x = offset * xDistance;
    const y = isCenter ? 0 : Math.pow(absOff, 1.25) * 14;
    const rotate = offset * 7; // -14deg, -7deg, 0deg, 7deg, 14deg
    const scale = isCenter ? 1 : Math.max(0.78, 1 - absOff * 0.08);
    const zIndex = 20 - absOff * 4;
    const opacity = absOff > 2 ? 0 : isCenter ? 1 : Math.max(0.42, 1 - absOff * 0.28);
    const brightness = isCenter ? 1 : 0.55;

    return {
      x,
      y,
      rotate,
      scale,
      zIndex,
      opacity,
      brightness,
      offset,
      isCenter,
    };
  };

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        background: '#151713',
        padding: 'clamp(90px, 10vw, 140px) 0 clamp(70px, 8vw, 110px)',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Background Citron Glow Accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(400px, 60vw, 900px)',
          height: 'clamp(300px, 45vw, 600px)',
          background: 'radial-gradient(circle, rgba(216, 243, 106, 0.06) 0%, rgba(21, 23, 19, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Section Header ── */}
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(11px, 1.1vw, 13px)',
              letterSpacing: '0.18em',
              color: '#D8F36A',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
            }}
          >
            <span>03 / SELECTED WORK</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 'clamp(38px, 5.5vw, 76px)',
                  color: '#F5F4EE',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                Things I've built<span style={{ color: '#D8F36A' }}>.</span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.35vw, 17px)',
                  color: 'rgba(245, 244, 238, 0.65)',
                  maxWidth: 580,
                  lineHeight: 1.68,
                  marginTop: 16,
                  marginBottom: 0,
                }}
              >
                A selection of products, experiments, and systems built through full-stack development,
                AI engineering, and creative exploration.
              </p>
            </div>

            {/* Deck Navigation Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Previous Project"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: 'rgba(245, 244, 238, 0.05)',
                  border: '1px solid rgba(245, 244, 238, 0.12)',
                  color: '#F5F4EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.5)';
                  e.currentTarget.style.color = '#D8F36A';
                  e.currentTarget.style.background = 'rgba(216, 243, 106, 0.08)';
                  e.currentTarget.style.transform = 'translateX(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 244, 238, 0.12)';
                  e.currentTarget.style.color = '#F5F4EE';
                  e.currentTarget.style.background = 'rgba(245, 244, 238, 0.05)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <ArrowLeft size={18} />
              </button>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'rgba(245, 244, 238, 0.5)',
                  letterSpacing: '0.1em',
                  minWidth: 48,
                  textAlign: 'center',
                }}
              >
                <span style={{ color: '#D8F36A', fontWeight: 700 }}>0{activeIdx + 1}</span> / 0{total}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next Project"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: 'rgba(245, 244, 238, 0.05)',
                  border: '1px solid rgba(245, 244, 238, 0.12)',
                  color: '#F5F4EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.5)';
                  e.currentTarget.style.color = '#D8F36A';
                  e.currentTarget.style.background = 'rgba(216, 243, 106, 0.08)';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 244, 238, 0.12)';
                  e.currentTarget.style.color = '#F5F4EE';
                  e.currentTarget.style.background = 'rgba(245, 244, 238, 0.05)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Layered Fanned-Out Project Deck Stage ── */}
        <div className="projects-deck-stage">
          <div className="projects-deck-viewport">
            {SHOWCASE_PROJECTS.map((project, idx) => {
              const layout = getCardLayout(idx);
              const isCenter = layout.isCenter;

              return (
                <motion.div
                  key={project.id}
                  className="projects-deck-card"
                  onClick={() => goTo(idx)}
                  animate={{
                    x: layout.x,
                    y: layout.y,
                    rotate: layout.rotate,
                    scale: layout.scale,
                    opacity: layout.opacity,
                    filter: `brightness(${layout.brightness})`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 28,
                    mass: 0.9,
                  }}
                  style={{
                    zIndex: layout.zIndex,
                    pointerEvents: Math.abs(layout.offset) > 2 ? 'none' : 'auto',
                    cursor: isCenter ? 'default' : 'pointer',
                  }}
                  whileHover={
                    isCenter
                      ? { y: -6, transition: { duration: 0.25 } }
                      : { scale: layout.scale * 1.04, brightness: 0.85, transition: { duration: 0.2 } }
                  }
                  tabIndex={0}
                  role="button"
                  aria-label={`View project ${project.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goTo(idx);
                    }
                  }}
                >
                  <div
                    className="card-inner"
                    style={{
                      background: project.gradient,
                      borderColor: isCenter ? 'rgba(216, 243, 106, 0.45)' : 'rgba(245, 244, 238, 0.08)',
                      boxShadow: isCenter
                        ? '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(216, 243, 106, 0.12)'
                        : '0 20px 50px rgba(0, 0, 0, 0.65)',
                    }}
                  >
                    {/* Top Bar inside card */}
                    <div className="card-top-bar">
                      <div className="card-badge">
                        <span className="badge-dot" style={{ background: project.accentColor }} />
                        <span>{project.tag}</span>
                      </div>
                      <div className="card-indicator">
                        0{idx + 1}
                      </div>
                    </div>

                    {/* Screenshot / Visual Representation */}
                    <div className="card-visual-frame">
                      <img
                        src={project.image}
                        alt={`${project.name} interface preview`}
                        className="card-image"
                        onError={(e) => {
                          if (e.currentTarget.src !== project.fallbackSvg) {
                            e.currentTarget.src = project.fallbackSvg;
                          }
                        }}
                      />
                      {/* Vignette & Ambient Layer */}
                      <div className="card-vignette" />
                      
                      {/* Sub-label inside card graphic */}
                      <div className="card-bottom-banner">
                        <div className="card-title-small">{project.name}</div>
                        <div className="card-metrics-small">{project.metrics}</div>
                      </div>
                    </div>

                    {/* Active highlight ring on front card */}
                    {isCenter && (
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 20,
                          border: '1px solid rgba(216, 243, 106, 0.25)',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Pagination Dots */}
          <div className="deck-dots-indicator">
            {SHOWCASE_PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Jump to ${p.name}`}
                className={`deck-dot ${idx === activeIdx ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* ── Project Information Panel (Updates with Active Project) ── */}
        <div className="project-info-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="project-info-container"
            >
              <div className="project-info-left">
                {/* PROJECT NAME */}
                <h3 className="project-info-title">
                  {current.name.toUpperCase()}
                </h3>

                {/* Category / Technology */}
                <div className="project-info-subtitle">
                  <span style={{ color: '#D8F36A', fontWeight: 600 }}>{current.category}</span>
                  <span style={{ opacity: 0.4 }}>—</span>
                  <span>{current.categorySubtitle}</span>
                </div>

                {/* Short, accurate description */}
                <p className="project-info-desc">
                  {current.description}
                </p>

                {/* Tech stack badges */}
                <div className="project-tech-row">
                  {current.stack.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links & Case Study CTA */}
              <div className="project-info-right">
                {current.hasCaseStudy ? (
                  <Link
                    to={`/case-study/${current.id}`}
                    className="btn-case-study"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight size={17} />
                  </Link>
                ) : current.live ? (
                  <a
                    href={current.live}
                    target={current.live.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="btn-case-study"
                  >
                    <span>EXPLORE PROJECT</span>
                    <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <a
                    href={current.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-case-study"
                  >
                    <span>VIEW REPOSITORY</span>
                    <ArrowUpRight size={17} />
                  </a>
                )}

                <div className="project-sublinks">
                  {current.github && (
                    <a
                      href={current.github}
                      target="_blank"
                      rel="noreferrer"
                      className="sublink-btn"
                    >
                      <GithubIcon size={14} />
                      <span>Source Code</span>
                    </a>
                  )}
                  {current.live && (
                    <a
                      href={current.live}
                      target={current.live.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="sublink-btn"
                    >
                      <ExternalLink size={14} />
                      <span>Live Site</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        /* ── Deck Stage & Composition ── */
        .projects-deck-stage {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: clamp(32px, 5vw, 48px);
        }

        .projects-deck-viewport {
          position: relative;
          width: 100%;
          height: clamp(380px, 48vw, 540px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .projects-deck-card {
          position: absolute;
          width: clamp(260px, 34vw, 430px);
          height: clamp(340px, 44vw, 490px);
          user-select: none;
          will-change: transform, opacity;
          touch-action: pan-y;
          outline: none;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          border-width: 1px;
          border-style: solid;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          background-clip: padding-box;
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          position: relative;
          z-index: 2;
        }

        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #F5F4EE;
          text-transform: uppercase;
          background: rgba(10, 13, 9, 0.65);
          padding: 5px 12px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px currentColor;
        }

        .card-indicator {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(245, 244, 238, 0.45);
          letter-spacing: 0.08em;
        }

        .card-visual-frame {
          position: relative;
          flex: 1;
          margin: 0 16px 16px;
          border-radius: 14px;
          overflow: hidden;
          background: #090B08;
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .card-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(9, 11, 8, 0.15) 0%,
            transparent 35%,
            rgba(9, 11, 8, 0.4) 70%,
            rgba(9, 11, 8, 0.95) 100%
          );
          pointer-events: none;
        }

        .card-bottom-banner {
          position: absolute;
          bottom: 14px;
          left: 16px;
          right: 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 2;
        }

        .card-title-small {
          font-family: var(--font-ui);
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }

        .card-metrics-small {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #D8F36A;
          letter-spacing: 0.04em;
        }

        /* ── Deck Dots ── */
        .deck-dots-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
        }

        .deck-dot {
          width: 24px;
          height: 3px;
          border-radius: 2px;
          background: rgba(245, 244, 238, 0.15);
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          padding: 0;
        }

        .deck-dot.active {
          width: 48px;
          background: #D8F36A;
          box-shadow: 0 0 12px rgba(216, 243, 106, 0.5);
        }

        /* ── Project Information Panel ── */
        .project-info-stage {
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
        }

        .project-info-container {
          background: rgba(21, 23, 19, 0.85);
          border: 1px solid rgba(245, 244, 238, 0.08);
          border-radius: 20px;
          padding: clamp(24px, 4vw, 36px) clamp(24px, 4vw, 44px);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .project-info-left {
          flex: 1;
        }

        .project-info-title {
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: clamp(24px, 2.8vw, 36px);
          color: #F5F4EE;
          letter-spacing: -0.03em;
          margin: 0 0 8px;
          line-height: 1.1;
        }

        .project-info-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: rgba(245, 244, 238, 0.65);
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 16px;
        }

        .project-info-desc {
          font-family: var(--font-body);
          font-size: 15px;
          color: rgba(245, 244, 238, 0.72);
          line-height: 1.65;
          margin: 0 0 20px;
          max-width: 620px;
        }

        .project-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-badge {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.04em;
          color: rgba(245, 244, 238, 0.75);
          background: rgba(245, 244, 238, 0.05);
          border: 1px solid rgba(245, 244, 238, 0.09);
          padding: 4px 11px;
          border-radius: 4px;
        }

        .project-info-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          flex-shrink: 0;
        }

        .btn-case-study {
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.04em;
          padding: 13px 26px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #D8F36A;
          color: #0A0D09;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(216, 243, 106, 0.25);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .btn-case-study:hover {
          background: #E9FF88;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(216, 243, 106, 0.4);
        }

        .project-sublinks {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sublink-btn {
          font-family: var(--font-mono);
          font-size: 12px;
          color: rgba(245, 244, 238, 0.5);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }

        .sublink-btn:hover {
          color: #D8F36A;
        }

        /* ── Responsive Adaptations ── */
        @media (max-width: 900px) {
          .project-info-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .project-info-right {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(245, 244, 238, 0.08);
            padding-top: 20px;
          }

          .projects-deck-card {
            width: clamp(260px, 46vw, 360px);
            height: clamp(340px, 58vw, 440px);
          }
        }

        @media (max-width: 600px) {
          .project-info-right {
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
          }

          .btn-case-study {
            justify-content: center;
          }

          .project-sublinks {
            justify-content: center;
          }

          .projects-deck-card {
            width: 82vw;
            height: 108vw;
            max-width: 320px;
            max-height: 420px;
          }

          .projects-deck-viewport {
            height: 114vw;
            max-height: 450px;
          }
        }
      `}</style>
    </section>
  );
}
