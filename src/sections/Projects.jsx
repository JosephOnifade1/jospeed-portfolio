import { useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import { PROJECTS } from '../data/projects.js';

const FILTER_LABELS = ['All', 'Web Apps', 'AI / Automation', '3D / Design'];

function ProjectCard({ p, i }) {
  const [hover, setHover] = useState(false);
  const [ref, inView] = useReveal(0.08);

  // Map category to citron-tinted badge
  const catColor = p.category === 'AI / Automation' ? 'var(--citron)' : 'rgba(216,243,106,0.55)';

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${(i % 4) * 0.07}s` }}
    >
      <a
        href={p.live || p.github || '#'}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          style={{
            background: hover ? 'rgba(216,243,106,0.04)' : 'rgba(255,255,255,0.025)',
            border: `1px solid ${hover ? 'rgba(216,243,106,0.3)' : 'rgba(245,244,238,0.07)'}`,
            borderRadius: 16,
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'background 0.25s, border-color 0.25s, transform 0.25s',
            transform: hover ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          {/* Project image / visual */}
          <div
            style={{
              aspectRatio: '16 / 9',
              background: p.gradient || 'linear-gradient(135deg, #0d1210, #1a2818)',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.9,
                transition: 'opacity 0.3s, transform 0.4s',
                transform: hover ? 'scale(1.03)' : 'scale(1)',
              }}
              onError={(e) => { e.currentTarget.style.opacity = '0'; }}
            />
            {/* Category tag */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--ink)',
                background: catColor,
                padding: '3px 8px',
                borderRadius: 4,
                textTransform: 'uppercase',
              }}
            >
              {p.tag || p.category}
            </div>
            {/* Arrow indicator */}
            {hover && (
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--citron)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  color: 'var(--ink)',
                  fontWeight: 700,
                }}
              >
                ↗
              </div>
            )}
          </div>

          {/* Card body */}
          <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            <h3
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--paper)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {p.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'rgba(245,244,238,0.55)',
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
              }}
            >
              {p.description}
            </p>
            {/* Stack pills */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
              {p.stack.slice(0, 3).map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.06em',
                    color: 'rgba(216,243,106,0.7)',
                    background: 'rgba(216,243,106,0.07)',
                    border: '1px solid rgba(216,243,106,0.15)',
                    padding: '3px 8px',
                    borderRadius: 4,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            {/* View link */}
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--citron)',
                marginTop: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                opacity: hover ? 1 : 0.65,
                transition: 'opacity 0.2s',
              }}
            >
              View Project →
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [headRef, headIn] = useReveal();

  const filtered =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      style={{
        padding: 'clamp(72px, 9vw, 120px) 0',
        background: 'var(--ink)',
        position: 'relative',
      }}
    >
      {/* Section header */}
      <div
        ref={headRef}
        className={`reveal ${headIn ? 'in-view' : ''}`}
        style={{ marginBottom: 'clamp(36px, 5vw, 60px)' }}
      >
        <div className="wrap">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              color: 'var(--citron)',
              textTransform: 'uppercase',
              marginBottom: 14,
              opacity: 0.8,
            }}
          >
            My Projects
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
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: 'var(--paper)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Ideas to
              <br />
              <span style={{ color: 'var(--citron)' }}>Impact.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.4vw, 16px)',
                color: 'rgba(245,244,238,0.55)',
                maxWidth: 380,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              A collection of projects where I build, learn and innovate.
            </p>
          </div>

          {/* Filter tabs */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
              marginTop: 36,
            }}
          >
            {FILTER_LABELS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 13,
                    padding: '8px 18px',
                    borderRadius: 100,
                    border: `1px solid ${active ? 'var(--citron)' : 'rgba(245,244,238,0.12)'}`,
                    background: active ? 'var(--citron)' : 'transparent',
                    color: active ? 'var(--ink)' : 'rgba(245,244,238,0.65)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.01em',
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 24,
          }}
        >
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
