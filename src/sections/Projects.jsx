import { useState, Suspense } from 'react';
import { ArrowUpRight, ExternalLink, LayoutGrid, Layers } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { PROJECTS, FILTERS } from '../data/projects.js';
import ProjectCarousel3D from '../components/ProjectCarousel3D.jsx';

// ── Grid card ───────────────────────────────────────────────
function ProjectCard({ p, i }) {
  const [hover, setHover] = useState(false);
  const [ref, inView] = useReveal(0.08);
  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{
        background: '#fff',
        border: `1px solid ${hover ? 'rgba(77,38,34,0.4)' : 'rgba(77,38,34,0.15)'}`,
        borderRadius: 16, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hover ? '0 16px 40px -12px rgba(77,38,34,0.2)' : 'none',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease',
      }}>
        <div style={{
          height: 140, background: p.gradient || 'linear-gradient(160deg,#1a1b2e,#11121c)',
          position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(1px)' }} />
          <div style={{ fontFamily: 'var(--display)', fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.4)', zIndex: 1 }}>{p.name}</div>
          <div style={{ position: 'absolute', top: 12, left: 14, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.06em', color: '#fff', background: 'rgba(0,0,0,0.42)', border: '1px solid rgba(255,255,255,0.18)', padding: '4px 10px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>{p.tag}</div>
        </div>
        <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.65, flex: 1, marginBottom: 14 }}>{p.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
            {p.stack.map(s => (
              <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--cyan)', background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)', padding: '3px 8px', borderRadius: 4 }}>{s}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
            <button onClick={() => window.location.href = `/case-study/${p.id}`} style={{
              flex: 1, padding: '8px 0', borderRadius: 7,
              background: hover ? '#4D2622' : 'rgba(77,38,34,0.08)',
              border: '1px solid rgba(77,38,34,0.2)',
              color: hover ? '#fff' : '#4D2622',
              fontSize: 12.5, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              transition: 'background 0.22s, color 0.22s', cursor: 'pointer',
            }}>Case study <ArrowUpRight size={13} /></button>
            <a href={p.live || p.github || '#'} target="_blank" rel="noreferrer" style={{
              width: 36, height: 36, borderRadius: 7, background: 'var(--surface-2)',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-faint)', flexShrink: 0, transition: 'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color='var(--cyan)'; e.currentTarget.style.borderColor='var(--cyan)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='var(--text-faint)'; e.currentTarget.style.borderColor='var(--border)'; }}
            >
              {p.live ? <ExternalLink size={14} /> : <GithubIcon size={14} color="currentColor" />}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main section ────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('3d'); // '3d' | 'grid'
  const [headRef, headIn] = useReveal();
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects">
      <div className="wrap">
        {/* Header row */}
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 36 }}>
          <div className="eyebrow">// Selected Work</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 className={`section-heading ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 0 }}>
              Built for performance.
              <span className="rule" />
            </h2>

            {/* View toggle */}
            <div style={{ display: 'flex', background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: 4, gap: 4 }}>
              {[
                { key: '3d', Icon: Layers, label: '3D View' },
                { key: 'grid', Icon: LayoutGrid, label: 'Grid' },
              ].map(({ key, Icon, label }) => (
                <button key={key} onClick={() => setView(key)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  background: view === key ? 'var(--indigo)' : 'transparent',
                  color: view === key ? '#fff' : 'var(--text-faint)',
                  fontSize: 13, fontWeight: 600,
                  transition: 'background 0.22s, color 0.22s',
                }}>
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Carousel view */}
        {view === '3d' && (
          <div style={{ position: 'relative' }}>
            {/* Subtle instruction */}
            <div style={{ textAlign: 'center', marginBottom: 12, fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
              USE ← → KEYS OR CLICK ARROWS TO BROWSE
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-deep)' }}>
              <ProjectCarousel3D />
            </div>
          </div>
        )}

        {/* Grid view */}
        {view === 'grid' && (
          <div>
            {/* Filters — only show in grid view */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '7px 15px', borderRadius: 999, fontSize: 12.5, fontWeight: 600,
                  border: `1px solid ${filter === f ? 'transparent' : 'rgba(77,38,34,0.25)'}`,
                  background: filter === f ? '#4D2622' : 'transparent',
                  color: filter === f ? '#F2ECD1' : 'rgba(77,38,34,0.6)',
                  transition: 'all 0.22s ease', cursor: 'pointer',
                }}>{f}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="projects-grid">
              {filtered.map((p, i) => <ProjectCard key={p.id || p.name} p={p} i={i} />)}
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
