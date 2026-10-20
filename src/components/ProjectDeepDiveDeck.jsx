import { useEffect, useRef } from 'react';
import {
  X,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Target,
  Lightbulb,
  CheckCircle,
  RotateCcw,
  Zap,
  Cpu,
  Database,
  ArrowRight,
} from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';

const DARK = '#4D2622';
const CREAM = '#F2ECD1';
const GOLD = '#c9922a';

export default function ProjectDeepDiveDeck({
  project,
  onClose,
  onSelectProject,
  allProjects = [],
}) {
  const drawerRef = useRef(null);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigateProject(-1);
      if (e.key === 'ArrowRight') navigateProject(1);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, allProjects]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const total = allProjects.length;

  const navigateProject = (direction) => {
    if (currentIndex === -1 || total <= 1) return;
    const nextIndex = (currentIndex + direction + total) % total;
    onSelectProject(allProjects[nextIndex]);
    if (drawerRef.current) {
      drawerRef.current.scrollTop = 0;
    }
  };

  const { architecture, caseStudy } = project;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(26, 10, 9, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'opacity 0.35s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Slide-over Drawer Panel */}
      <div
        ref={drawerRef}
        style={{
          width: '100%',
          maxWidth: '740px',
          height: '100%',
          background: 'linear-gradient(165deg, #3d1b18 0%, #29110f 45%, #190908 100%)',
          borderLeft: '1px solid rgba(201, 146, 42, 0.3)',
          boxShadow: '-24px 0 80px rgba(0, 0, 0, 0.85), inset 1px 0 0 rgba(242, 236, 209, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowY: 'auto',
          color: CREAM,
          animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Sticky Deck Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            background: 'rgba(41, 17, 15, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(242, 236, 209, 0.12)',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {/* Tag & Deck Index */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: GOLD,
                background: 'rgba(201, 146, 42, 0.14)',
                border: '1px solid rgba(201, 146, 42, 0.35)',
                padding: '3px 9px',
                borderRadius: 999,
                fontWeight: 700,
              }}
            >
              {project.tag}
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: 'rgba(242, 236, 209, 0.4)',
              }}
            >
              DOSSIER {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Controls: Prev, Next, Full Page, Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => navigateProject(-1)}
              title="Previous Case Study (←)"
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: 'rgba(242, 236, 209, 0.06)',
                border: '1px solid rgba(242, 236, 209, 0.15)',
                color: CREAM,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242, 236, 209, 0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(242, 236, 209, 0.06)')}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => navigateProject(1)}
              title="Next Case Study (→)"
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: 'rgba(242, 236, 209, 0.06)',
                border: '1px solid rgba(242, 236, 209, 0.15)',
                color: CREAM,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242, 236, 209, 0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(242, 236, 209, 0.06)')}
            >
              <ChevronRight size={16} />
            </button>

            <a
              href={`/case-study/${project.id}`}
              target="_blank"
              rel="noreferrer"
              title="Open standalone case study page"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(242, 236, 209, 0.06)',
                border: '1px solid rgba(242, 236, 209, 0.15)',
                color: 'rgba(242, 236, 209, 0.75)',
                fontSize: 12,
                fontFamily: 'var(--mono)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(242, 236, 209, 0.15)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(242, 236, 209, 0.06)';
                e.currentTarget.style.color = 'rgba(242, 236, 209, 0.75)';
              }}
            >
              Full Page <ArrowUpRight size={13} />
            </a>

            <button
              onClick={onClose}
              title="Close Dossier (Esc)"
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: 'rgba(201, 146, 42, 0.15)',
                border: '1px solid rgba(201, 146, 42, 0.4)',
                color: CREAM,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201, 146, 42, 0.3)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(201, 146, 42, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Interior Scrollable Content */}
        <div style={{ padding: '36px 32px 60px', display: 'flex', flexDirection: 'column', gap: 36 }}>
          {/* Hero Header */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {project.stack.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: CREAM,
                    background: 'rgba(242, 236, 209, 0.08)',
                    border: '1px solid rgba(242, 236, 209, 0.16)',
                    padding: '3px 10px',
                    borderRadius: 5,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <h1
              style={{
                fontFamily: 'var(--display)',
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 800,
                color: CREAM,
                letterSpacing: '-0.025em',
                lineHeight: 1.12,
                margin: '0 0 14px 0',
              }}
            >
              {project.name}
            </h1>

            <p
              style={{
                fontSize: 16,
                color: 'rgba(242, 236, 209, 0.72)',
                lineHeight: 1.7,
                margin: '0 0 24px 0',
              }}
            >
              {project.description}
            </p>

            {/* Quick Links & Benchmark Badge */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
              {architecture && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 14px',
                    borderRadius: 8,
                    background: 'rgba(201, 146, 42, 0.15)',
                    border: '1px solid rgba(201, 146, 42, 0.35)',
                  }}
                >
                  <Zap size={15} color={GOLD} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: GOLD }}>
                    {architecture.metric}
                  </span>
                </div>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: CREAM,
                    color: DARK,
                    fontFamily: 'var(--body)',
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = CREAM)}
                >
                  Launch App <ExternalLink size={14} />
                </a>
              )}

              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: 'rgba(242, 236, 209, 0.08)',
                    border: '1px solid rgba(242, 236, 209, 0.2)',
                    color: CREAM,
                    fontFamily: 'var(--body)',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(242, 236, 209, 0.16)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(242, 236, 209, 0.08)')}
                >
                  <GithubIcon size={14} color="currentColor" /> Inspect Code
                </a>
              )}
            </div>
          </div>

          {/* Section: Live Pipeline Architecture */}
          {architecture && (
            <div
              style={{
                background: 'rgba(242, 236, 209, 0.03)',
                border: '1px solid rgba(201, 146, 42, 0.25)',
                borderRadius: 14,
                padding: '24px 26px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: GOLD,
                    boxShadow: '0 0 10px rgba(201, 146, 42, 0.8)',
                    display: 'inline-block',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: GOLD,
                    margin: 0,
                  }}
                >
                  System Blueprint & Telemetry
                </h3>
              </div>

              <p style={{ fontSize: 14, color: 'rgba(242, 236, 209, 0.65)', margin: '0 0 20px 0', lineHeight: 1.6 }}>
                {architecture.headline}
              </p>

              {/* 3-Stage Connected Nodes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
                {architecture.nodes.map((node, idx) => (
                  <div
                    key={node.role}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      background: 'rgba(242, 236, 209, 0.04)',
                      border: '1px solid rgba(242, 236, 209, 0.1)',
                      borderRadius: 10,
                      padding: '12px 16px',
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background:
                          idx === 0
                            ? 'rgba(201, 146, 42, 0.25)'
                            : idx === 1
                            ? 'rgba(242, 236, 209, 0.15)'
                            : 'rgba(201, 146, 42, 0.2)',
                        border: '1px solid rgba(201, 146, 42, 0.4)',
                        color: GOLD,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {idx === 0 ? <Zap size={14} /> : idx === 1 ? <Cpu size={14} /> : <Database size={14} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'rgba(242, 236, 209, 0.45)', textTransform: 'uppercase' }}>
                          Stage 0{idx + 1} // {node.role}
                        </span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: CREAM }}>
                          {node.tech}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: 'rgba(242, 236, 209, 0.72)', margin: 0, lineHeight: 1.5 }}>
                        {node.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: The Problem / Raw Dilemma */}
          {caseStudy && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(201, 146, 42, 0.15)',
                    border: '1px solid rgba(201, 146, 42, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: GOLD,
                  }}
                >
                  <Target size={16} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: CREAM,
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  The Dilemma & Friction
                </h3>
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: 'rgba(242, 236, 209, 0.75)',
                  lineHeight: 1.8,
                  margin: 0,
                  paddingLeft: 42,
                }}
              >
                {caseStudy.problem}
              </p>
            </div>
          )}

          {/* Section: Architectural Decisions */}
          {caseStudy && caseStudy.decisions && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(201, 146, 42, 0.15)',
                    border: '1px solid rgba(201, 146, 42, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: GOLD,
                  }}
                >
                  <Lightbulb size={16} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: CREAM,
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  Key Architectural Decisions
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 42 }}>
                {caseStudy.decisions.map((decision, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      padding: '14px 16px',
                      background: 'rgba(242, 236, 209, 0.04)',
                      border: '1px solid rgba(242, 236, 209, 0.08)',
                      borderRadius: 10,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'rgba(201, 146, 42, 0.18)',
                        border: '1px solid rgba(201, 146, 42, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--mono)',
                        fontSize: 10.5,
                        color: GOLD,
                        fontWeight: 700,
                        marginTop: 1,
                      }}
                    >
                      {i + 1}
                    </span>
                    <p style={{ color: 'rgba(242, 236, 209, 0.8)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                      {decision}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Measured Business Outcome */}
          {caseStudy && caseStudy.outcome && (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(201, 146, 42, 0.12) 0%, rgba(242, 236, 209, 0.03) 100%)',
                border: '1px solid rgba(201, 146, 42, 0.35)',
                borderLeft: `4px solid ${GOLD}`,
                borderRadius: 12,
                padding: '22px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: GOLD,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                  fontWeight: 700,
                }}
              >
                // Measured Outcome & ROI
              </div>
              <p style={{ fontSize: 15, color: CREAM, lineHeight: 1.75, margin: 0 }}>
                {caseStudy.outcome}
              </p>
            </div>
          )}

          {/* Section: Engineering Retrospective */}
          {caseStudy && caseStudy.retrospective && (
            <div style={{ paddingLeft: 12, borderLeft: '2px dashed rgba(242, 236, 209, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                <RotateCcw size={14} color="rgba(242, 236, 209, 0.5)" />
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: 'rgba(242, 236, 209, 0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  What I'd Architect Differently
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(242, 236, 209, 0.65)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                "{caseStudy.retrospective}"
              </p>
            </div>
          )}

          {/* Bottom Call to Action */}
          <div
            style={{
              paddingTop: 24,
              borderTop: '1px solid rgba(242, 236, 209, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 17, fontWeight: 700, color: CREAM, marginBottom: 2 }}>
                Need similar architecture built?
              </div>
              <div style={{ fontSize: 13, color: 'rgba(242, 236, 209, 0.5)' }}>
                Direct contracts available on Upwork or async milestones.
              </div>
            </div>

            <a
              href="#contact"
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 22px',
                borderRadius: 8,
                background: CREAM,
                color: DARK,
                fontFamily: 'var(--body)',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = CREAM;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start a Conversation <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
