import { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { PROJECTS, FILTERS } from '../data/projects.js';


function ProjectCard({ p, i }) {
  const [hover, setHover] = useState(false);
  const [ref, inView] = useReveal(0.08);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: `1px solid ${hover ? 'rgba(99,102,241,0.45)' : 'var(--border)'}`,
          borderRadius: 16,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? '0 20px 48px -16px rgba(99,102,241,0.3)' : 'none',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Gradient preview band */}
        <div style={{
          height: 140,
          background: p.gradient || 'linear-gradient(160deg, #1a1b2e 0%, #11121c 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: hover ? 'blur(0px)' : 'blur(1px)',
            transition: 'backdrop-filter 0.4s ease',
          }} />
          <div style={{
            fontFamily: 'var(--display)',
            fontSize: 32,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
            zIndex: 1,
            transform: hover ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}>{p.name}</div>
          {/* Tag badge */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: 14,
            fontFamily: 'var(--mono)',
            fontSize: 10.5,
            letterSpacing: '0.06em',
            color: '#fff',
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '4px 10px',
            borderRadius: 999,
            backdropFilter: 'blur(4px)',
          }}>{p.tag}</div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.65, flex: 1, marginBottom: 16 }}>
            {p.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
            {p.stack.map((s) => (
              <span key={s} style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--cyan)',
                background: 'rgba(34,211,238,0.08)',
                border: '1px solid rgba(34,211,238,0.18)',
                padding: '3px 9px',
                borderRadius: 4,
                letterSpacing: '0.02em',
              }}>{s}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => window.location.href = `/case-study/${p.id}`}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 8,
                background: hover ? 'var(--indigo)' : 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.25)',
                color: hover ? '#fff' : 'var(--indigo-bright)',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                transition: 'background 0.25s ease, color 0.25s ease',
                cursor: 'pointer',
              }}
            >
              Case study <ArrowUpRight size={13} />
            </button>
            <a
              href={p.live || p.github}
              target="_blank"
              rel="noreferrer"
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-faint)',
                flexShrink: 0,
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'var(--cyan)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {p.live ? <ExternalLink size={15} /> : <GithubIcon size={15} color="currentColor" />}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [headRef, headIn] = useReveal();
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects">
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 44 }}>
          <div className="eyebrow">// Selected Work</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <h2 className={`section-heading ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 0 }}>
              Built for performance.
              <span className="rule" />
            </h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    border: `1px solid ${filter === f ? 'transparent' : 'var(--border-strong)'}`,
                    background: filter === f ? 'var(--indigo)' : 'transparent',
                    color: filter === f ? '#fff' : 'var(--text-dim)',
                    transition: 'all 0.22s ease',
                    cursor: 'pointer',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="projects-grid">
          {filtered.map((p, i) => <ProjectCard key={p.id || p.name} p={p} i={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
