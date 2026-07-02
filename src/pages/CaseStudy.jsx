import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lightbulb, Target, RotateCcw } from 'lucide-react';
import { PROJECTS } from '../data/projects.js';
import { useEffect } from 'react';

export default function CaseStudy() {
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project || !project.caseStudy) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
        <p style={{ color: 'var(--text-dim)' }}>Case study not found.</p>
        <Link to="/" className="btn btn-ghost">← Back home</Link>
      </div>
    );
  }

  const { caseStudy, stack, gradient, tag } = project;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(7,7,12,0.8)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/#projects" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
            <ArrowLeft size={16} /> Back to projects
          </Link>
          <span style={{ color: 'var(--border-strong)' }}>·</span>
          <span className="tag">{tag}</span>
        </div>
      </div>

      {/* Hero banner */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '72px 0 56px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {stack.map(s => <span key={s} className="tag">{s.toUpperCase()}</span>)}
          </div>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20, background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {project.name}
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', maxWidth: 600, lineHeight: 1.7 }}>{project.description}</p>
        </div>
      </div>

      {/* Case study body */}
      <div className="wrap" style={{ padding: '72px 32px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 60, alignItems: 'start' }} id="cs-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {/* Problem */}
          <CsBlock icon={<Target size={18} color="var(--cyan)" />} color="var(--cyan)" label="The Problem">
            <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.8 }}>{caseStudy.problem}</p>
          </CsBlock>

          {/* Approach */}
          <CsBlock icon={<Lightbulb size={18} color="var(--indigo-bright)" />} color="var(--indigo-bright)" label="The Approach">
            <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.8 }}>{caseStudy.approach}</p>
          </CsBlock>

          {/* Key decisions */}
          <CsBlock icon={<CheckCircle size={18} color="var(--signal)" />} color="var(--signal)" label="Key Technical Decisions">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {caseStudy.decisions.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--signal)', marginTop: 1 }}>{i + 1}</span>
                  <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.75 }}>{d}</p>
                </div>
              ))}
            </div>
          </CsBlock>

          {/* Outcome */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--indigo)', borderRadius: 12, padding: '28px 28px 28px 24px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--indigo-bright)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>// Outcome</div>
            <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.8 }}>{caseStudy.outcome}</p>
          </div>

          {/* Retrospective */}
          <CsBlock icon={<RotateCcw size={18} color="var(--text-faint)" />} color="var(--text-faint)" label="What I'd Do Differently">
            <p style={{ color: 'var(--text-dim)', fontSize: 15.5, lineHeight: 1.8, fontStyle: 'italic' }}>{caseStudy.retrospective}</p>
          </CsBlock>
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 90 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {stack.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
          <Link to="/#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Start a similar project
          </Link>
          <Link to="/#projects" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
            ← All projects
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #cs-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function CsBlock({ icon, color, label, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <span style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600 }}>{label}</h3>
      </div>
      {children}
    </div>
  );
}
