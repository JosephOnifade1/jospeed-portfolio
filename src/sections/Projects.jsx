import { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { PROJECTS, FILTERS } from '../data/projects.js';
import ProjectCarousel3D from '../components/ProjectCarousel3D.jsx';

const DARK = '#4D2622';
const CREAM = '#F2ECD1';

function ProjectCard({ p, i }) {
  const [hover, setHover] = useState(false);
  const [ref, inView] = useReveal(0.08);

  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{
        background: hover ? DARK : '#fff',
        border: `1px solid ${hover ? DARK : 'rgba(77,38,34,0.18)'}`,
        borderRadius: 14, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hover ? `0 20px 48px -12px rgba(77,38,34,0.35)` : '0 2px 10px rgba(77,38,34,0.08)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Gradient band — always visible */}
        <div style={{
          height: 140, background: p.gradient || `linear-gradient(135deg, ${DARK}, #7a3a34)`,
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
          padding: '14px 18px',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
          {/* Tag pill */}
          <div style={{
            position: 'absolute', top: 12, left: 14,
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.07em',
            color: '#fff', background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.2)', padding: '3px 9px',
            borderRadius: 999, zIndex: 1,
          }}>{p.tag}</div>
          <span style={{
            position: 'relative', zIndex: 1,
            fontFamily: 'var(--display)', fontSize: 22, fontWeight: 700,
            color: '#fff', letterSpacing: '-0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}>{p.name}</span>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 13.5, color: hover ? 'rgba(242,236,209,0.7)' : 'rgba(77,38,34,0.65)', lineHeight: 1.65, flex: 1 }}>
            {p.description}
          </p>

          {/* Stack chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {p.stack.map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)', fontSize: 10.5,
                color: hover ? CREAM : DARK,
                background: hover ? 'rgba(242,236,209,0.12)' : 'rgba(77,38,34,0.08)',
                border: `1px solid ${hover ? 'rgba(242,236,209,0.25)' : 'rgba(77,38,34,0.2)'}`,
                padding: '3px 9px', borderRadius: 4,
                transition: 'all 0.3s ease',
              }}>{s}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: `1px solid ${hover ? 'rgba(242,236,209,0.12)' : 'rgba(77,38,34,0.1)'}` }}>
            <button onClick={() => window.location.href = `/case-study/${p.id}`} style={{
              flex: 1, padding: '9px 0', borderRadius: 7,
              background: hover ? CREAM : DARK,
              border: 'none',
              color: hover ? DARK : CREAM,
              fontSize: 12.5, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              cursor: 'pointer', transition: 'all 0.25s ease',
            }}>Case study <ArrowUpRight size={13} /></button>
            <a href={p.live || p.github || '#'} target="_blank" rel="noreferrer" style={{
              width: 36, height: 36, borderRadius: 7, flexShrink: 0,
              background: hover ? 'rgba(242,236,209,0.12)' : 'rgba(77,38,34,0.08)',
              border: `1px solid ${hover ? 'rgba(242,236,209,0.25)' : 'rgba(77,38,34,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: hover ? CREAM : DARK, transition: 'all 0.25s ease',
            }}>
              {p.live ? <ExternalLink size={14} /> : <GithubIcon size={14} color="currentColor" />}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('3d');
  const [headRef, headIn] = useReveal();
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ paddingTop: 80 }}>
      <div className="wrap">
        {/* Header */}
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.1em', color: DARK, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, opacity: 0.5 }}>
            <span style={{ width: 18, height: 1, background: DARK, display: 'inline-block' }} />
            Selected Work
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', color: DARK, fontFamily: 'var(--display)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
              Built for performance.
            </h2>
            {/* View toggle */}
            <div style={{ display: 'flex', background: 'rgba(77,38,34,0.08)', border: '1px solid rgba(77,38,34,0.15)', borderRadius: 9, padding: 4, gap: 4 }}>
              {[{ key: '3d', label: '3D View' }, { key: 'grid', label: 'Grid' }].map(({ key, label }) => (
                <button key={key} onClick={() => setView(key)} style={{
                  padding: '7px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: view === key ? DARK : 'transparent',
                  color: view === key ? CREAM : 'rgba(77,38,34,0.6)',
                  fontSize: 13, fontWeight: 600, transition: 'all 0.22s ease',
                }}>{label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D view */}
        {view === '3d' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 12, fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(77,38,34,0.4)', letterSpacing: '0.05em' }}>
              USE ← → KEYS OR ARROWS TO BROWSE
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(77,38,34,0.15)', background: DARK }}>
              <ProjectCarousel3D />
            </div>
          </div>
        )}

        {/* Grid view */}
        {view === 'grid' && (
          <div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '7px 15px', borderRadius: 999, fontSize: 12.5, fontWeight: 600,
                  border: `1px solid ${filter === f ? 'transparent' : 'rgba(77,38,34,0.2)'}`,
                  background: filter === f ? DARK : 'transparent',
                  color: filter === f ? CREAM : 'rgba(77,38,34,0.6)',
                  transition: 'all 0.22s ease', cursor: 'pointer',
                }}>{f}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="projects-grid">
              {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 980px) { .projects-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
