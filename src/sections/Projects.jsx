import { useState, useRef } from 'react';
import { ArrowUpRight, ExternalLink, Layers, LayoutGrid, Cpu } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { PROJECTS, FILTERS } from '../data/projects.js';
import CoverflowGallery from '../components/CoverflowGallery.jsx';
import ProjectArchitecture from '../components/ProjectArchitecture.jsx';
import ProjectDeepDiveDeck from '../components/ProjectDeepDiveDeck.jsx';
import { useTactileTilt } from '../hooks/useTactileTilt.js';
import { playTactileClick } from '../utils/audioHaptics.js';

const DARK  = '#4D2622';
const CREAM = '#F2ECD1';
const GOLD  = '#c9922a';

function ProjectCard({ p, i, globalXray, onOpenDeepDive }) {
  const [hover, setHover] = useState(false);
  const [localXray, setLocalXray] = useState(null);
  const [ref, inView] = useReveal(0.08);
  const { cardRef, onMouseMove, onMouseLeave } = useTactileTilt({ maxTilt: 6, scale: 1.018 });

  const isXray = localXray !== null ? localXray : globalXray;

  if (isXray) {
    return (
      <div
        ref={ref}
        className={`reveal ${inView ? 'in-view' : ''}`}
        style={{ transitionDelay: `${(i % 6) * 0.08}s`, height: 440 }}
      >
        <ProjectArchitecture
          project={p}
          isActive={true}
          onFlipBack={() => {
            playTactileClick('light');
            setLocalXray(false);
          }}
          onOpenDeepDive={onOpenDeepDive}
        />
      </div>
    );
  }

  return (
    <div
      ref={(el) => {
        ref.current = el;
        cardRef.current = el;
      }}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{
        transitionDelay: `${(i % 6) * 0.08}s`,
        height: '100%',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={(e) => {
        setHover(false);
        onMouseLeave(e);
      }}
      onMouseMove={onMouseMove}
      onClick={() => {
        playTactileClick('pop');
        onOpenDeepDive(p);
      }}
    >
      <div
        style={{
          background: hover ? DARK : '#fff',
          border: `1px solid ${hover ? 'rgba(201, 146, 42, 0.4)' : 'rgba(77,38,34,0.18)'}`,
          borderRadius: 14,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: hover
            ? '0 24px 50px -12px rgba(77,38,34,0.4), 0 0 25px rgba(201, 146, 42, 0.15)'
            : '0 2px 10px rgba(77,38,34,0.08)',
          transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
        }}
      >
        {/* Dynamic Specular Sheen (follows cursor) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle 240px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201, 146, 42, 0.18), transparent 75%)',
            pointerEvents: 'none',
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 4,
          }}
        />

        {/* Card Header & Gradient Banner */}
        <div
          style={{
            height: 140,
            background: p.gradient || `linear-gradient(135deg,${DARK},#7a3a34)`,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '14px 18px',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />

          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 14,
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.07em',
              color: '#fff',
              background: 'rgba(0,0,0,0.45)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '3px 9px',
              borderRadius: 999,
              zIndex: 1,
            }}
          >
            {p.tag}
          </div>

          {/* Quick X-Ray Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playTactileClick('xray');
              setLocalXray(true);
            }}
            title="Inspect Architecture Blueprint"
            style={{
              position: 'absolute',
              top: 10,
              right: 12,
              zIndex: 5,
              background: 'rgba(36, 16, 14, 0.7)',
              border: '1px solid rgba(201, 146, 42, 0.45)',
              borderRadius: 999,
              padding: '3px 9px',
              color: '#e8b84b',
              fontFamily: 'var(--mono)',
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 146, 42, 0.25)';
              e.currentTarget.style.borderColor = '#c9922a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(36, 16, 14, 0.7)';
              e.currentTarget.style.borderColor = 'rgba(201, 146, 42, 0.45)';
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#c9922a', display: 'inline-block' }} />
            X-RAY
          </button>

          <span
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'var(--display)',
              fontSize: 22,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            {p.name}
          </span>
        </div>

        {/* Card Body */}
        <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p
            style={{
              fontSize: 13.5,
              color: hover ? 'rgba(242,236,209,0.7)' : 'rgba(77,38,34,0.65)',
              lineHeight: 1.65,
              flex: 1,
            }}
          >
            {p.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {p.stack.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10.5,
                  color: hover ? CREAM : DARK,
                  background: hover ? 'rgba(242,236,209,0.12)' : 'rgba(77,38,34,0.08)',
                  border: `1px solid ${hover ? 'rgba(242,236,209,0.25)' : 'rgba(77,38,34,0.2)'}`,
                  padding: '3px 9px',
                  borderRadius: 4,
                  transition: 'all 0.3s',
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: 8,
              paddingTop: 12,
              borderTop: `1px solid ${hover ? 'rgba(242,236,209,0.12)' : 'rgba(77,38,34,0.1)'}`,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                playTactileClick('pop');
                onOpenDeepDive(p);
              }}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 7,
                background: hover ? CREAM : DARK,
                border: 'none',
                color: hover ? DARK : CREAM,
                fontSize: 12.5,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                cursor: 'pointer',
                transition: 'all 0.25s',
                fontFamily: 'var(--body)',
              }}
            >
              Case study <ArrowUpRight size={13} />
            </button>
            {p.github && p.github !== '#' && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                title="Source Code"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 7,
                  flexShrink: 0,
                  background: hover ? 'rgba(242,236,209,0.12)' : 'rgba(77,38,34,0.08)',
                  border: `1px solid ${hover ? 'rgba(242,236,209,0.25)' : 'rgba(77,38,34,0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: hover ? CREAM : DARK,
                  transition: 'all 0.25s',
                }}
              >
                <GithubIcon size={14} color="currentColor" />
              </a>
            )}
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 7,
                  flexShrink: 0,
                  background: hover ? 'rgba(242,236,209,0.12)' : 'rgba(77,38,34,0.08)',
                  border: `1px solid ${hover ? 'rgba(242,236,209,0.25)' : 'rgba(77,38,34,0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: hover ? CREAM : DARK,
                  transition: 'all 0.25s',
                }}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('coverflow');
  const [xrayMode, setXrayMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [headRef, headIn] = useReveal();
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ paddingTop: 80 }}>
      <div className="wrap">
        {/* Header */}
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 36 }}>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11.5,
              letterSpacing: '0.1em',
              color: DARK,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 18,
              opacity: 0.5,
            }}
          >
            <span style={{ width: 18, height: 1, background: DARK, display: 'inline-block' }} />
            Selected Work
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(28px,4vw,48px)',
                  color: DARK,
                  fontFamily: 'var(--display)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  margin: '0 0 6px 0',
                }}
              >
                Built for performance.
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: 'rgba(77,38,34,0.65)' }}>
                {xrayMode
                  ? 'Viewing live system architecture, node pipelines, and benchmarks.'
                  : 'Full-stack applications & production AI automation workflows.'}
              </p>
            </div>

            {/* Action Bar: Architecture X-Ray & View Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {/* Architecture X-Ray Master Switch */}
              <button
                onClick={() => {
                  playTactileClick('xray');
                  setXrayMode(!xrayMode);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '7px 15px',
                  borderRadius: 9,
                  border: xrayMode ? '1px solid #c9922a' : '1px solid rgba(77,38,34,0.2)',
                  background: xrayMode ? '#2a110f' : 'rgba(77,38,34,0.06)',
                  color: xrayMode ? '#f2ecd1' : DARK,
                  cursor: 'pointer',
                  fontSize: 12.5,
                  fontWeight: 700,
                  fontFamily: 'var(--mono)',
                  letterSpacing: '0.04em',
                  boxShadow: xrayMode
                    ? '0 0 20px rgba(201, 146, 42, 0.3), inset 0 0 10px rgba(201, 146, 42, 0.1)'
                    : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: xrayMode ? '#c9922a' : 'rgba(77,38,34,0.4)',
                    boxShadow: xrayMode ? '0 0 8px #c9922a' : 'none',
                    display: 'inline-block',
                    animation: xrayMode ? 'pulse 1.8s infinite' : 'none',
                  }}
                />
                {xrayMode ? 'SYSTEM ARCHITECTURE: ON' : 'SYSTEM ARCHITECTURE'}
              </button>

              {/* View toggle (Gallery vs Grid) */}
              <div
                style={{
                  display: 'flex',
                  background: 'rgba(77,38,34,0.08)',
                  border: '1px solid rgba(77,38,34,0.15)',
                  borderRadius: 9,
                  padding: 4,
                  gap: 4,
                }}
              >
                {[
                  { key: 'coverflow', Icon: Layers, label: 'Gallery' },
                  { key: 'grid', Icon: LayoutGrid, label: 'Grid' },
                ].map(({ key, Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => {
                      playTactileClick('light');
                      setView(key);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '7px 14px',
                      borderRadius: 6,
                      border: 'none',
                      cursor: 'pointer',
                      background: view === key ? DARK : 'transparent',
                      color: view === key ? CREAM : 'rgba(77,38,34,0.6)',
                      fontSize: 13,
                      fontWeight: 600,
                      transition: 'all 0.22s',
                      fontFamily: 'var(--body)',
                    }}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coverflow View */}
        {view === 'coverflow' && (
          <CoverflowGallery
            xrayMode={xrayMode}
            onOpenDeepDive={(p) => {
              playTactileClick('pop');
              setSelectedProject(p);
            }}
          />
        )}

        {/* Grid View */}
        {view === 'grid' && (
          <div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    playTactileClick('light');
                    setFilter(f);
                  }}
                  style={{
                    padding: '7px 15px',
                    borderRadius: 999,
                    fontSize: 12.5,
                    fontWeight: 600,
                    border: `1px solid ${filter === f ? 'transparent' : 'rgba(77,38,34,0.2)'}`,
                    background: filter === f ? DARK : 'transparent',
                    color: filter === f ? CREAM : 'rgba(77,38,34,0.6)',
                    transition: 'all 0.22s',
                    cursor: 'pointer',
                    fontFamily: 'var(--body)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}
              className="projects-grid"
            >
              {filtered.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  p={p}
                  i={i}
                  globalXray={xrayMode}
                  onOpenDeepDive={(proj) => {
                    playTactileClick('pop');
                    setSelectedProject(proj);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Slide-Over Deep Dive Deck Drawer */}
      <ProjectDeepDiveDeck
        project={selectedProject}
        onClose={() => {
          playTactileClick('light');
          setSelectedProject(null);
        }}
        onSelectProject={(proj) => {
          playTactileClick('light');
          setSelectedProject(proj);
        }}
        allProjects={PROJECTS}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }
        @media(max-width:980px){.projects-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:640px){.projects-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}
