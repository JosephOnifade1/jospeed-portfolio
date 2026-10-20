import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lightbulb, Target, RotateCcw, ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons.jsx';
import { PROJECTS } from '../data/projects.js';
import { useEffect, useRef, useState } from 'react';
import CustomCursor from '../components/CustomCursor.jsx';
import FormCursor from '../components/FormCursor.jsx';

const DARK  = '#4D2622';
const CREAM = '#F2ECD1';

function CaseStudyHeroImage({ project, name, stagger }) {
  const [loaded, setLoaded] = useState(false);
  const imgSrc = project.image || `/projects/${project.id}.png`;

  return (
    <div
      style={{
        ...stagger(2.5),
        width: '100%',
        maxWidth: 820,
        borderRadius: 14,
        overflow: 'hidden',
        border: loaded ? '1px solid rgba(242,236,209,0.2)' : 'none',
        boxShadow: loaded ? '0 24px 60px rgba(0,0,0,0.6)' : 'none',
        marginBottom: loaded ? 36 : 0,
        display: loaded ? 'block' : 'none',
      }}
    >
      <img
        src={imgSrc}
        alt={name}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
      />
    </div>
  );
}

// Scroll reveal hook
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Reading progress bar
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 9000, background: 'rgba(242,236,209,0.1)' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${CREAM}, #c9922a)`, transition: 'width 0.1s linear' }} />
    </div>
  );
}

// Animated section block
function CsBlock({ icon, iconBg, label, children, delay = 0 }) {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {icon}
        </div>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: 20, fontWeight: 700, color: CREAM, letterSpacing: '-0.01em' }}>{label}</h3>
      </div>
      {children}
    </div>
  );
}

// Decision item with staggered reveal
function Decision({ text, index }) {
  const [ref, inView] = useReveal(0.1);
  return (
    <div ref={ref} style={{
      display: 'flex', gap: 14, alignItems: 'flex-start',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0)' : 'translateX(-20px)',
      transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.12}s`,
      padding: '16px 18px',
      background: 'rgba(242,236,209,0.04)',
      border: '1px solid rgba(242,236,209,0.08)',
      borderRadius: 10,
    }}>
      <span style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: '50%',
        background: 'rgba(201,146,42,0.15)', border: '1px solid rgba(201,146,42,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', fontWeight: 700,
      }}>{index + 1}</span>
      <p style={{ color: 'rgba(242,236,209,0.7)', fontSize: 15, lineHeight: 1.75, margin: 0 }}>{text}</p>
    </div>
  );
}

// Stat card
function StatCard({ value, label, delay }) {
  const [ref, inView] = useReveal(0.2);
  const [count, setCount] = useState(0);
  const num = parseFloat(value);
  const isNum = !isNaN(num);

  useEffect(() => {
    if (!inView || !isNum) return;
    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * num * 10) / 10);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, num, isNum]);

  return (
    <div ref={ref} style={{
      textAlign: 'center',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
      transition: `all 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`,
      padding: '24px 16px',
      background: 'rgba(242,236,209,0.04)',
      border: '1px solid rgba(242,236,209,0.1)',
      borderRadius: 12,
    }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: 36, fontWeight: 800, color: CREAM, lineHeight: 1, marginBottom: 8 }}>
        {isNum ? (Number.isInteger(num) ? count : count.toFixed(1)) : value}
        {value.includes('%') ? '%' : value.includes('+') ? '+' : ''}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'rgba(242,236,209,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  );
}

export default function CaseStudy() {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);
  const heroRef = useRef(null);
  const [headIn, setHeadIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setHeadIn(true), 100);
    return () => clearTimeout(t);
  }, [id]);

  // Parallax on hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.28}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!project || !project.caseStudy) {
    return (
      <div style={{ minHeight: '100vh', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
        <CustomCursor />
        <p style={{ color: 'rgba(242,236,209,0.55)', fontFamily: 'var(--body)' }}>Case study not found.</p>
        <Link to="/" style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(242,236,209,0.2)', color: CREAM, fontFamily: 'var(--body)', fontWeight: 600 }}>← Back home</Link>
      </div>
    );
  }

  const { caseStudy, stack, gradient, tag, name, description, live, github } = project;

  // Extract stats from outcome text
  const stats = [
    { value: caseStudy.outcome.match(/\d+[\-–]\d+%|\d+%/) ?
        caseStudy.outcome.match(/\d+[\-–]\d+%|\d+%/)[0].replace('%','') : '100',
      label: 'Efficiency gain' },
    { value: stack.length.toString(), label: 'Technologies' },
    { value: caseStudy.decisions.length.toString(), label: 'Key decisions' },
  ];

  const stagger = (i, axis = 'Y') => ({
    opacity: headIn ? 1 : 0,
    transform: headIn ? 'none' : axis === 'Y' ? 'translateY(24px)' : 'translateX(-16px)',
    transition: `opacity 0.75s ease ${i * 0.1}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${i * 0.1}s`,
  });

  return (
    <div style={{ minHeight: '100vh', background: DARK, color: CREAM }}>
      <CustomCursor />
      <FormCursor />
      <ProgressBar />

      {/* ── Sticky top bar ── */}
      <nav style={{
        position: 'fixed', top: 3, left: 0, right: 0, zIndex: 200,
        background: 'rgba(77,38,34,0.88)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(242,236,209,0.08)',
        padding: '14px 0',
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/#projects" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'rgba(242,236,209,0.55)', fontSize: 14, fontWeight: 500,
            fontFamily: 'var(--body)', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = CREAM}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,236,209,0.55)'}
          >
            <ArrowLeft size={15} /> Back to projects
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.07em',
              color: '#c9922a', background: 'rgba(201,146,42,0.12)',
              border: '1px solid rgba(201,146,42,0.25)', padding: '4px 10px', borderRadius: 999,
            }}>{tag}</span>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', minHeight: '82vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', paddingTop: 80 }}>
        {/* Parallax gradient background */}
        <div ref={heroRef} style={{
          position: 'absolute', inset: '-20%', background: gradient,
          filter: 'blur(0px)', willChange: 'transform',
        }} />
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(77,38,34,0.97) 0%, rgba(77,38,34,0.55) 50%, rgba(77,38,34,0.2) 100%)' }} />

        {/* Content */}
        <div className="wrap" style={{ position: 'relative', zIndex: 1, paddingBottom: 72, width: '100%' }}>
          {/* Stack chips */}
          <div style={{ ...stagger(0), display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {stack.map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.05em',
                color: CREAM, background: 'rgba(242,236,209,0.1)',
                border: '1px solid rgba(242,236,209,0.2)', padding: '5px 12px', borderRadius: 999,
              }}>{s}</span>
            ))}
          </div>

          <h1 style={{
            ...stagger(1),
            fontFamily: 'var(--display)', fontWeight: 900,
            fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.03em',
            lineHeight: 1.05, color: CREAM, marginBottom: 20, maxWidth: 800,
          }}>{name}</h1>

          <p style={{
            ...stagger(2),
            fontSize: 18, color: 'rgba(242,236,209,0.65)',
            maxWidth: 600, lineHeight: 1.75, marginBottom: 28,
          }}>{description}</p>

          <CaseStudyHeroImage project={project} name={name} stagger={stagger} />

          {/* CTAs */}
          <div style={{ ...stagger(3), display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {live && (
              <a href={live} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '12px 22px', borderRadius: 8,
                background: CREAM, color: DARK,
                fontSize: 14, fontWeight: 700, fontFamily: 'var(--body)',
                transition: 'background 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = 'none'; }}
              >Live demo <ExternalLink size={14} /></a>
            )}
            <a href={github || '#'} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '12px 22px', borderRadius: 8,
              background: 'rgba(242,236,209,0.08)', color: CREAM,
              border: '1px solid rgba(242,236,209,0.2)',
              fontSize: 14, fontWeight: 600, fontFamily: 'var(--body)',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.08)'; e.currentTarget.style.transform = 'none'; }}
            ><GithubIcon size={15} color="currentColor" /> View code</a>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ borderTop: '1px solid rgba(242,236,209,0.08)', borderBottom: '1px solid rgba(242,236,209,0.08)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }} className="stats-row">
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="wrap" style={{ padding: '80px 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 64, alignItems: 'start' }} id="cs-body">

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

            {/* Problem */}
            <CsBlock
              icon={<Target size={17} color="#c9922a" />}
              iconBg="rgba(201,146,42,0.12)"
              label="The Problem"
              delay={0}
            >
              <p style={{ color: 'rgba(242,236,209,0.65)', fontSize: 16, lineHeight: 1.85, borderLeft: '2px solid rgba(201,146,42,0.4)', paddingLeft: 20 }}>
                {caseStudy.problem}
              </p>
            </CsBlock>

            {/* Approach */}
            <CsBlock
              icon={<Lightbulb size={17} color={CREAM} />}
              iconBg="rgba(242,236,209,0.08)"
              label="The Approach"
              delay={0.05}
            >
              <p style={{ color: 'rgba(242,236,209,0.65)', fontSize: 16, lineHeight: 1.85 }}>
                {caseStudy.approach}
              </p>
            </CsBlock>

            {/* Decisions */}
            <CsBlock
              icon={<CheckCircle size={17} color="#c9922a" />}
              iconBg="rgba(201,146,42,0.1)"
              label="Key Technical Decisions"
              delay={0.1}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
                {caseStudy.decisions.map((d, i) => (
                  <Decision key={i} text={d} index={i} />
                ))}
              </div>
            </CsBlock>

            {/* Outcome */}
            <OutcomeBlock outcome={caseStudy.outcome} />

            {/* Retrospective */}
            <CsBlock
              icon={<RotateCcw size={17} color="rgba(242,236,209,0.45)" />}
              iconBg="rgba(242,236,209,0.06)"
              label="What I'd Do Differently"
              delay={0.1}
            >
              <p style={{ color: 'rgba(242,236,209,0.5)', fontSize: 15.5, lineHeight: 1.85, fontStyle: 'italic' }}>
                {caseStudy.retrospective}
              </p>
            </CsBlock>
          </div>

          {/* Sidebar */}
          <Sidebar stack={stack} projectName={name} />
        </div>
      </div>

      {/* ── Next project ── */}
      <NextProject currentId={id} />

      <style>{`
        @media (max-width: 860px) {
          #cs-body { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// Outcome with animated highlight
function OutcomeBlock({ outcome }) {
  const [ref, inView] = useReveal(0.15);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      transition: 'all 0.7s cubic-bezier(.22,1,.36,1)',
    }}>
      <div style={{
        background: 'rgba(242,236,209,0.05)',
        border: '1px solid rgba(242,236,209,0.12)',
        borderLeft: `3px solid ${CREAM}`,
        borderRadius: 12, padding: '28px 28px 28px 24px',
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
          // Outcome
        </div>
        <p style={{ fontSize: 16.5, color: CREAM, lineHeight: 1.8, fontFamily: 'var(--display)', fontWeight: 600 }}>
          {outcome}
        </p>
      </div>
    </div>
  );
}

// Sticky sidebar
function Sidebar({ stack, projectName }) {
  const [ref, inView] = useReveal(0.1);
  return (
    <div ref={ref} style={{
      position: 'sticky', top: 90,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateX(0)' : 'translateX(20px)',
      transition: 'all 0.7s cubic-bezier(.22,1,.36,1) 0.2s',
    }}>
      {/* Stack */}
      <div style={{
        background: 'rgba(242,236,209,0.04)',
        border: '1px solid rgba(242,236,209,0.1)',
        borderRadius: 12, padding: 22, marginBottom: 14,
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(242,236,209,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>Tech stack</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {stack.map(s => (
            <span key={s} style={{
              fontFamily: 'var(--mono)', fontSize: 11, color: CREAM,
              background: 'rgba(242,236,209,0.08)', border: '1px solid rgba(242,236,209,0.15)',
              padding: '4px 10px', borderRadius: 5,
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link to="/#contact" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        width: '100%', padding: '13px 0', borderRadius: 8, marginBottom: 10,
        background: CREAM, color: DARK,
        fontSize: 14, fontWeight: 700, fontFamily: 'var(--body)',
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = '#fff'}
        onMouseLeave={e => e.currentTarget.style.background = CREAM}
      >Start a similar project <ArrowUpRight size={14} /></Link>

      <Link to="/#projects" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        width: '100%', padding: '12px 0', borderRadius: 8,
        background: 'transparent', color: 'rgba(242,236,209,0.55)',
        border: '1px solid rgba(242,236,209,0.12)',
        fontSize: 14, fontWeight: 500, fontFamily: 'var(--body)',
        transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.color = CREAM; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.3)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,236,209,0.55)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.12)'; }}
      ><ArrowLeft size={14} /> All projects</Link>
    </div>
  );
}

// Next project teaser
function NextProject({ currentId }) {
  const [ref, inView] = useReveal(0.1);
  const idx = PROJECTS.findIndex(p => p.id === currentId);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <div ref={ref} style={{
      borderTop: '1px solid rgba(242,236,209,0.1)',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: 'all 0.7s cubic-bezier(.22,1,.36,1)',
    }}>
      <Link to={`/case-study/${next.id}`} style={{
        display: 'block', padding: '48px 0',
        transition: 'background 0.3s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(242,236,209,0.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(242,236,209,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Next case study</div>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, color: CREAM, letterSpacing: '-0.02em' }}>{next.name}</h3>
          </div>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: CREAM, color: DARK,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'transform 0.3s cubic-bezier(.22,1,.36,1)',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <ArrowUpRight size={22} />
          </div>
        </div>
      </Link>
    </div>
  );
}
