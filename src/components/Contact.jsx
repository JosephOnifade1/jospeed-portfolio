import { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from './BrandIcons.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { playTactileClick } from '../utils/audioHaptics.js';

const DARK  = '#4D2622';
const CREAM = '#F2ECD1';
const GOLD  = '#c9922a';
const GOLD_DIM = 'rgba(201,146,42,0.18)';

const SOCIALS = [
  { Icon: GithubIcon,   href: 'https://github.com/JosephOnifade1',             label: 'GitHub'   },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/joseph-onifade-ol', label: 'LinkedIn' },
  { Icon: XIcon,        href: 'https://x.com/Jospeed7',                        label: 'X'        },
  { Icon: DiscordIcon,  href: 'https://discord.com/users/1278856822555414549', label: 'Discord'  },
];

const PROJECT_TYPES = [
  { id: 'web-app',      badge: 'WA', label: 'Web Application',       sub: 'SaaS, dashboards, complex UIs' },
  { id: 'ai',           badge: 'AI', label: 'AI / Chatbot',           sub: 'LLMs, RAG, custom assistants' },
  { id: 'automation',   badge: 'AU', label: 'Automation Pipeline',    sub: 'n8n workflows, data flows' },
  { id: 'marketplace',  badge: 'MP', label: 'Marketplace / Platform', sub: 'Two-sided apps, payments' },
  { id: 'landing',      badge: 'LP', label: 'Landing Page',           sub: 'High-conversion, fast builds' },
  { id: 'other',        badge: '?',  label: 'Something Else',         sub: "Let's talk about it" },
];

const BUDGETS = [
  { id: 'under-500',   label: 'Under $500',         sub: 'Quick builds, focused scope' },
  { id: '500-1500',    label: '$500 – $1,500',       sub: 'Mid-tier, solid quality' },
  { id: '1500-5000',   label: '$1,500 – $5,000',     sub: 'Full-stack, AI-integrated' },
  { id: '5000-plus',   label: '$5,000+',             sub: 'Flagship engineering' },
];

const TIMELINES = [
  { id: 'asap',     dot: '#e05252', label: 'ASAP', sub: 'Within 2 weeks' },
  { id: 'soon',     dot: GOLD,      label: 'Soon', sub: '1–4 weeks out' },
  { id: 'flexible', dot: '#5cd65c', label: 'Flexible', sub: 'Quality over speed' },
];

const TOTAL_STEPS = 5;

// ─── Animated Step Transition Container ────────────────────────────────────────
function StepWrapper({ children, stepKey, direction }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const prevKey = useRef(stepKey);

  useEffect(() => {
    if (prevKey.current !== stepKey) {
      setExiting(true);
      const t = setTimeout(() => {
        setExiting(false);
        setVisible(false);
        prevKey.current = stepKey;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
      }, 220);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setVisible(true), 30);
      return () => clearTimeout(t);
    }
  }, [stepKey]);

  return (
    <div
      style={{
        opacity: visible && !exiting ? 1 : 0,
        transform: visible && !exiting
          ? 'translateX(0) scale(1)'
          : exiting
          ? `translateX(${direction === 'forward' ? '-40px' : '40px'}) scale(0.98)`
          : `translateX(${direction === 'forward' ? '40px' : '-40px'}) scale(0.98)`,
        transition: 'opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

// ─── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
      <div style={{ flex: 1, height: 3, background: 'rgba(242,236,209,0.1)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${GOLD}, #e8b84b)`,
          borderRadius: 99,
          transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: `0 0 10px rgba(201,146,42,0.5)`,
        }} />
      </div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: '0.06em', flexShrink: 0 }}>
        {String(step).padStart(2,'0')} / {String(TOTAL_STEPS).padStart(2,'0')}
      </span>
    </div>
  );
}

// ─── Step Label ─────────────────────────────────────────────────────────────────
function StepLabel({ label }) {
  return (
    <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'rgba(201,146,42,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
      {label}
    </div>
  );
}

// ─── Step Heading ───────────────────────────────────────────────────────────────
function StepHeading({ children }) {
  return (
    <h3 style={{
      fontFamily: 'var(--display)',
      fontSize: 'clamp(22px,2.8vw,30px)',
      fontWeight: 800,
      color: CREAM,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      marginBottom: 24,
    }}>
      {children}
    </h3>
  );
}

// ─── Summary Chips Rail ──────────────────────────────────────────────────────────
function SummaryChips({ types, budget, timeline }) {
  const chips = [
    ...types.map(id => PROJECT_TYPES.find(p => p.id === id)?.label).filter(Boolean),
    BUDGETS.find(b => b.id === budget)?.label,
    TIMELINES.find(t => t.id === timeline)?.label,
  ].filter(Boolean);

  if (!chips.length) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
      {chips.map(chip => (
        <span key={chip} style={{
          padding: '4px 10px',
          borderRadius: 99,
          background: GOLD_DIM,
          border: `1px solid rgba(201,146,42,0.3)`,
          fontFamily: 'var(--mono)',
          fontSize: 10.5,
          color: '#e8b84b',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}>
          {chip}
        </span>
      ))}
    </div>
  );
}

// ─── NavBar ─────────────────────────────────────────────────────────────────────
function NavRow({ onBack, onNext, canNext, nextLabel = 'Continue', loading = false, step }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
      {step > 1 ? (
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 14px', borderRadius: 8,
            background: 'rgba(242,236,209,0.06)',
            border: '1px solid rgba(242,236,209,0.14)',
            color: 'rgba(242,236,209,0.6)', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.1)'; e.currentTarget.style.color = CREAM; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.06)'; e.currentTarget.style.color = 'rgba(242,236,209,0.6)'; }}
        >
          <ArrowLeft size={13} /> Back
        </button>
      ) : <div />}

      <button
        onClick={onNext}
        disabled={!canNext || loading}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '11px 22px', borderRadius: 10,
          background: canNext ? CREAM : 'rgba(242,236,209,0.08)',
          border: `1px solid ${canNext ? CREAM : 'rgba(242,236,209,0.12)'}`,
          color: canNext ? DARK : 'rgba(242,236,209,0.25)',
          fontSize: 13.5, fontWeight: 800,
          cursor: canNext ? 'pointer' : 'not-allowed',
          transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
          letterSpacing: '-0.01em',
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={e => { if (canNext && !loading) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(242,236,209,0.2)'; }}}
        onMouseLeave={e => { if (canNext && !loading) { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}}
      >
        {loading ? <><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</> : <>{nextLabel} <ArrowRight size={14} /></>}
      </button>
    </div>
  );
}

// ─── The Wizard ──────────────────────────────────────────────────────────────────
function ProjectBriefWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('forward');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [typedIn, setTypedIn] = useState(false);

  // Step data
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [deadlineNote, setDeadlineNote] = useState('');
  const [brief, setBrief] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const briefPlaceholders = [
    'e.g. We need a Supabase-backed B2B portal with role-based access…',
    'e.g. I have a Notion doc with the spec, need it shipped in 3 weeks…',
    'e.g. Replace our Zapier stack with a self-hosted n8n pipeline…',
  ];
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPlaceholderIdx(i => (i + 1) % briefPlaceholders.length), 3200);
    return () => clearInterval(t);
  }, []);

  const go = (dir) => {
    playTactileClick('pop');
    setDirection(dir === 'next' ? 'forward' : 'back');
    setStep(s => dir === 'next' ? s + 1 : s - 1);
  };

  const toggleType = (id) => {
    playTactileClick('light');
    setSelectedTypes(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
    setStatus('loading');
    setErrorMsg('');

    const selectedBudget = BUDGETS.find(b => b.id === budget)?.label || budget;
    const selectedTimeline = TIMELINES.find(t => t.id === timeline)?.label || timeline;
    const projectTypes = selectedTypes.map(id => PROJECT_TYPES.find(p => p.id === id)?.label).filter(Boolean).join(', ');

    if (!webhookUrl) {
      // Simulate success for demo
      setTimeout(() => setStatus('success'), 900);
      return;
    }

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          projectTypes,
          budget: selectedBudget,
          timeline: selectedTimeline,
          deadlineNote,
          brief,
          submittedAt: new Date().toISOString(),
          source: 'jospeed-portfolio-wizard',
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Could not send your brief. Please email josephonifade21@gmail.com directly.');
    }
  };

  const reset = () => {
    setStep(1); setDirection('forward');
    setSelectedTypes([]); setBudget(''); setTimeline('');
    setDeadlineNote(''); setBrief(''); setName(''); setEmail('');
    setStatus('idle'); setErrorMsg('');
  };

  // ── Success Screen ────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: '52px 36px', minHeight: 440,
        background: 'linear-gradient(165deg, rgba(77,38,34,0.5) 0%, rgba(36,16,14,0.95) 100%)',
        border: '1px solid rgba(201,146,42,0.35)',
        borderRadius: 22,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Radial glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(201,146,42,0.12), transparent 65%)', pointerEvents: 'none' }} />

        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(201,146,42,0.15)',
          border: '1px solid rgba(201,146,42,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 22,
          boxShadow: '0 0 30px rgba(201,146,42,0.25)',
          position: 'relative', zIndex: 1,
        }}>
          <CheckCircle size={30} color={GOLD} />
        </div>

        <h3 style={{ fontFamily: 'var(--display)', fontSize: 26, color: CREAM, marginBottom: 10, fontWeight: 800, position: 'relative', zIndex: 1 }}>
          Brief received.
        </h3>
        <p style={{ color: 'rgba(242,236,209,0.65)', fontSize: 15, lineHeight: 1.65, maxWidth: 360, marginBottom: 28, position: 'relative', zIndex: 1 }}>
          Your project brief has been routed into the intake pipeline. Expect a response within 2 hours.
        </p>

        {/* Summary recap */}
        <div style={{
          background: 'rgba(36,16,14,0.75)', border: '1px solid rgba(242,236,209,0.1)',
          borderRadius: 12, padding: '14px 18px', width: '100%', maxWidth: 360,
          textAlign: 'left', marginBottom: 24, position: 'relative', zIndex: 1,
        }}>
          {[
            { label: 'Project', value: selectedTypes.map(id => PROJECT_TYPES.find(p => p.id === id)?.label).filter(Boolean).join(', ') },
            { label: 'Budget', value: BUDGETS.find(b => b.id === budget)?.label },
            { label: 'Timeline', value: TIMELINES.find(t => t.id === timeline)?.label },
          ].map(({ label, value }) => value ? (
            <div key={label} style={{ display: 'flex', gap: 10, fontSize: 12.5, marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', color: GOLD, flexShrink: 0, width: 70 }}>{label}:</span>
              <span style={{ color: 'rgba(242,236,209,0.8)' }}>{value}</span>
            </div>
          ) : null)}
        </div>

        <button onClick={reset} style={{
          padding: '9px 20px', borderRadius: 8,
          background: 'rgba(242,236,209,0.06)', border: '1px solid rgba(242,236,209,0.15)',
          color: CREAM, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          transition: 'background 0.2s', position: 'relative', zIndex: 1,
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(242,236,209,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(242,236,209,0.06)'}
        >
          Submit another brief
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(165deg, rgba(77,38,34,0.5) 0%, rgba(36,16,14,0.95) 100%)',
      border: '1px solid rgba(201,146,42,0.28)',
      borderRadius: 22,
      padding: '30px 32px 28px 32px',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 24px 60px -12px rgba(15,5,4,0.6)',
      minHeight: 440,
    }}>
      {/* Background radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 0%, rgba(201,146,42,0.07), transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <ProgressBar step={step} />

        <StepWrapper stepKey={step} direction={direction}>

          {/* ── STEP 1: Project Type ── */}
          {step === 1 && (
            <div>
              <StepLabel label="// Step 01 of 05 — Project Scope" />
              <StepHeading>What are you trying to build?</StepHeading>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {PROJECT_TYPES.map(pt => {
                  const sel = selectedTypes.includes(pt.id);
                  return (
                    <button
                      key={pt.id}
                      onClick={() => toggleType(pt.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 14px', borderRadius: 12,
                        background: sel ? 'rgba(201,146,42,0.16)' : 'rgba(242,236,209,0.04)',
                        border: `1px solid ${sel ? 'rgba(201,146,42,0.6)' : 'rgba(242,236,209,0.1)'}`,
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                        boxShadow: sel ? '0 0 20px rgba(201,146,42,0.12)' : 'none',
                        transform: sel ? 'scale(1.015)' : 'scale(1)',
                      }}
                      onMouseEnter={e => { if (!sel) { e.currentTarget.style.background = 'rgba(242,236,209,0.08)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.2)'; }}}
                      onMouseLeave={e => { if (!sel) { e.currentTarget.style.background = 'rgba(242,236,209,0.04)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.1)'; }}}
                    >
                      <div style={{
                        width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                        background: sel ? GOLD_DIM : 'rgba(242,236,209,0.06)',
                        border: `1px solid ${sel ? 'rgba(201,146,42,0.5)' : 'rgba(242,236,209,0.12)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 800,
                        color: sel ? GOLD : 'rgba(242,236,209,0.45)',
                        transition: 'all 0.2s',
                      }}>
                        {pt.badge}
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: sel ? CREAM : 'rgba(242,236,209,0.85)', marginBottom: 2, transition: 'color 0.2s' }}>{pt.label}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: sel ? 'rgba(201,146,42,0.8)' : 'rgba(242,236,209,0.35)', lineHeight: 1.3, transition: 'color 0.2s' }}>{pt.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedTypes.length > 0 && (
                <div style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 11, color: GOLD }}>
                  {selectedTypes.length} selected
                </div>
              )}
              <NavRow step={step} onBack={() => go('back')} onNext={() => go('next')} canNext={selectedTypes.length > 0} />
            </div>
          )}

          {/* ── STEP 2: Budget ── */}
          {step === 2 && (
            <div>
              <StepLabel label="// Step 02 of 05 — Investment Range" />
              <StepHeading>What's the budget range?</StepHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {BUDGETS.map(b => {
                  const sel = budget === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => { playTactileClick('light'); setBudget(b.id); }}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '15px 18px', borderRadius: 12,
                        background: sel ? 'rgba(201,146,42,0.14)' : 'rgba(242,236,209,0.04)',
                        border: `1px solid ${sel ? 'rgba(201,146,42,0.55)' : 'rgba(242,236,209,0.1)'}`,
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                        boxShadow: sel ? '0 0 24px rgba(201,146,42,0.1)' : 'none',
                      }}
                      onMouseEnter={e => { if (!sel) { e.currentTarget.style.background = 'rgba(242,236,209,0.07)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.18)'; }}}
                      onMouseLeave={e => { if (!sel) { e.currentTarget.style.background = 'rgba(242,236,209,0.04)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.1)'; }}}
                    >
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: sel ? CREAM : 'rgba(242,236,209,0.8)', letterSpacing: '-0.01em' }}>{b.label}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: sel ? '#e8b84b' : 'rgba(242,236,209,0.35)', marginTop: 3 }}>{b.sub}</div>
                      </div>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        border: `2px solid ${sel ? GOLD : 'rgba(242,236,209,0.2)'}`,
                        background: sel ? GOLD : 'transparent',
                        flexShrink: 0, transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {sel && <div style={{ width: 7, height: 7, borderRadius: '50%', background: DARK }} />}
                      </div>
                    </button>
                  );
                })}
              </div>
              <NavRow step={step} onBack={() => go('back')} onNext={() => go('next')} canNext={!!budget} />
            </div>
          )}

          {/* ── STEP 3: Timeline ── */}
          {step === 3 && (
            <div>
              <StepLabel label="// Step 03 of 05 — Timeline" />
              <StepHeading>When do you need to start?</StepHeading>

              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                {TIMELINES.map(t => {
                  const sel = timeline === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => { playTactileClick('light'); setTimeline(t.id); }}
                      style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        gap: 8, padding: '16px 10px', borderRadius: 14,
                        background: sel ? 'rgba(201,146,42,0.14)' : 'rgba(242,236,209,0.04)',
                        border: `1px solid ${sel ? 'rgba(201,146,42,0.55)' : 'rgba(242,236,209,0.1)'}`,
                        cursor: 'pointer', transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                        boxShadow: sel ? `0 0 20px rgba(201,146,42,0.12)` : 'none',
                      }}
                      onMouseEnter={e => { if (!sel) { e.currentTarget.style.background = 'rgba(242,236,209,0.07)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.18)'; }}}
                      onMouseLeave={e => { if (!sel) { e.currentTarget.style.background = 'rgba(242,236,209,0.04)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.1)'; }}}
                    >
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.dot, boxShadow: sel ? `0 0 10px ${t.dot}` : 'none', flexShrink: 0, transition: 'box-shadow 0.2s' }} />
                      <div style={{ fontSize: 14, fontWeight: 800, color: sel ? CREAM : 'rgba(242,236,209,0.7)' }}>{t.label}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: sel ? '#e8b84b' : 'rgba(242,236,209,0.3)', textAlign: 'center', lineHeight: 1.35 }}>{t.sub}</div>
                    </button>
                  );
                })}
              </div>

              <div style={{ marginBottom: 6, fontFamily: 'var(--mono)', fontSize: 10.5, color: 'rgba(242,236,209,0.4)', letterSpacing: '0.06em' }}>
                HARD DEADLINE OR LAUNCH DATE? (optional)
              </div>
              <textarea
                value={deadlineNote}
                onChange={e => setDeadlineNote(e.target.value)}
                placeholder="e.g. Product Hunt launch on Dec 1st, or client call Dec 15th…"
                rows={2}
                style={{
                  width: '100%', padding: '11px 14px',
                  background: 'rgba(242,236,209,0.05)',
                  border: '1px solid rgba(242,236,209,0.12)',
                  borderRadius: 10, color: CREAM,
                  fontSize: 13.5, fontFamily: 'var(--body)', outline: 'none',
                  resize: 'none', transition: 'border-color 0.2s',
                  lineHeight: 1.55,
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,146,42,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.12)'}
              />

              <NavRow step={step} onBack={() => go('back')} onNext={() => go('next')} canNext={!!timeline} />
            </div>
          )}

          {/* ── STEP 4: Brief ── */}
          {step === 4 && (
            <div>
              <StepLabel label="// Step 04 of 05 — Project Brief" />
              <StepHeading>Paint me a picture.</StepHeading>
              <SummaryChips types={selectedTypes} budget={budget} timeline={timeline} />

              <div style={{ position: 'relative' }}>
                <textarea
                  value={brief}
                  onChange={e => setBrief(e.target.value)}
                  placeholder={briefPlaceholders[placeholderIdx]}
                  rows={6}
                  style={{
                    width: '100%', padding: '14px 16px',
                    background: 'rgba(242,236,209,0.05)',
                    border: '1px solid rgba(242,236,209,0.12)',
                    borderRadius: 12, color: CREAM,
                    fontSize: 14, fontFamily: 'var(--body)', outline: 'none',
                    resize: 'none', lineHeight: 1.65,
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(201,146,42,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,146,42,0.08)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(242,236,209,0.12)'; e.target.style.boxShadow = 'none'; }}
                />
                <div style={{
                  position: 'absolute', bottom: 10, right: 12,
                  fontFamily: 'var(--mono)', fontSize: 10,
                  color: brief.length > 20 ? GOLD : 'rgba(242,236,209,0.25)',
                  transition: 'color 0.3s',
                }}>
                  {brief.length} chars
                </div>
              </div>

              <NavRow step={step} onBack={() => go('back')} onNext={() => go('next')} canNext={brief.trim().length > 10} nextLabel="Almost done" />
            </div>
          )}

          {/* ── STEP 5: Contact Details ── */}
          {step === 5 && (
            <div>
              <StepLabel label="// Step 05 of 05 — Your Details" />
              <StepHeading>Where do I reach you?</StepHeading>

              {/* Summary Recap Card */}
              <div style={{
                background: 'rgba(36,16,14,0.75)',
                border: '1px solid rgba(201,146,42,0.2)',
                borderRadius: 12, padding: '12px 16px', marginBottom: 20,
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(201,146,42,0.7)', letterSpacing: '0.08em', marginBottom: 8 }}>
                  BRIEF SUMMARY
                </div>
                {[
                  { label: 'Type', value: selectedTypes.map(id => PROJECT_TYPES.find(p => p.id === id)?.badge).filter(Boolean).join(' + ') },
                  { label: 'Budget', value: BUDGETS.find(b => b.id === budget)?.label },
                  { label: 'Timeline', value: TIMELINES.find(t => t.id === timeline)?.label },
                  { label: 'Brief', value: brief.length > 60 ? brief.slice(0, 60) + '…' : brief },
                ].map(({ label, value }) => value ? (
                  <div key={label} style={{ display: 'flex', gap: 10, fontSize: 12, marginBottom: 4, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--mono)', color: 'rgba(242,236,209,0.4)', flexShrink: 0, width: 58 }}>{label}:</span>
                    <span style={{ color: 'rgba(242,236,209,0.85)', lineHeight: 1.4 }}>{value}</span>
                  </div>
                ) : null)}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                {[
                  { key: 'name', val: name, setter: setName, placeholder: 'Your name', type: 'text' },
                  { key: 'email', val: email, setter: setEmail, placeholder: 'Your email', type: 'email' },
                ].map(({ key, val, setter, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    value={val}
                    onChange={e => setter(e.target.value)}
                    placeholder={placeholder}
                    style={{
                      width: '100%', padding: '12px 14px',
                      background: 'rgba(242,236,209,0.05)',
                      border: '1px solid rgba(242,236,209,0.12)',
                      borderRadius: 10, color: CREAM,
                      fontSize: 14, fontFamily: 'var(--body)', outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(201,146,42,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,146,42,0.07)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(242,236,209,0.12)'; e.target.style.boxShadow = 'none'; }}
                  />
                ))}
              </div>

              {status === 'error' && (
                <div style={{
                  padding: '10px 14px', borderRadius: 8, marginBottom: 12,
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                  color: '#fca5a5', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <AlertCircle size={15} color="#ef4444" style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <NavRow
                step={step}
                onBack={() => go('back')}
                onNext={handleSubmit}
                canNext={name.trim().length > 1 && email.includes('@')}
                nextLabel="Send Brief"
                loading={status === 'loading'}
              />
            </div>
          )}
        </StepWrapper>
      </div>
    </div>
  );
}

// ─── Main Contact Export ─────────────────────────────────────────────────────────
export default function Contact() {
  const [headRef, headIn] = useReveal();
  const [formRef, formIn] = useReveal();

  return (
    <section id="contact">
      <div className="wrap">
        {/* Heading */}
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 52, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.1em', color: 'rgba(242,236,209,0.4)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ width: 18, height: 1, background: CREAM, opacity: 0.3, display: 'inline-block' }} />
            Get In Touch
            <span style={{ width: 18, height: 1, background: CREAM, opacity: 0.3, display: 'inline-block' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(28px,4vw,50px)', color: CREAM, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Let's build something together.
          </h2>
          <p style={{ color: 'rgba(242,236,209,0.55)', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
            Walk me through your project — takes under 2 minutes.
          </p>
        </div>

        <div ref={formRef} className={`reveal ${formIn ? 'in-view' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 52 }} id="contact-grid">

          {/* Wizard */}
          <ProjectBriefWizard />

          {/* Info panel */}
          <div>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'rgba(242,236,209,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
              <a href="mailto:josephonifade21@gmail.com" style={{ fontSize: 17, color: CREAM, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={16} color={CREAM} /> josephonifade21@gmail.com
              </a>
            </div>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'rgba(242,236,209,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Response time</p>
              <p style={{ fontSize: 15, color: 'rgba(242,236,209,0.65)' }}>Usually replies within 2 hours, Mon–Sat</p>
            </div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'rgba(242,236,209,0.35)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Find me on</p>
              <div style={{ display: 'flex', gap: 16 }}>
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                    style={{ color: 'rgba(242,236,209,0.45)', transition: 'color 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = CREAM; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,236,209,0.45)'; e.currentTarget.style.transform = 'none'; }}
                  ><Icon size={20} color="currentColor" /></a>
                ))}
              </div>
            </div>

            {/* Upwork CTA */}
            <a
              href="https://www.upwork.com/freelancers/~01a476791ed9f8b084?mp_source=share"
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                borderRadius: 12, border: '1px solid rgba(20, 168, 0, 0.3)',
                background: 'linear-gradient(135deg, rgba(20, 168, 0, 0.08) 0%, rgba(242, 236, 209, 0.03) 100%)',
                backdropFilter: 'blur(8px)', textDecoration: 'none', position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 168, 0, 0.16) 0%, rgba(242, 236, 209, 0.06) 100%)';
                e.currentTarget.style.borderColor = 'rgba(20, 168, 0, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 28px -4px rgba(20, 168, 0, 0.25)';
                const arrow = e.currentTarget.querySelector('.upwork-cta-arrow');
                if (arrow) arrow.style.transform = 'translate(2px, -2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 168, 0, 0.08) 0%, rgba(242, 236, 209, 0.03) 100%)';
                e.currentTarget.style.borderColor = 'rgba(20, 168, 0, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.25)';
                const arrow = e.currentTarget.querySelector('.upwork-cta-arrow');
                if (arrow) arrow.style.transform = 'translate(0, 0)';
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #14A800 0%, #108A00 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 4px 12px rgba(20, 168, 0, 0.35)',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.793 0-6.16 2.477-6.852 5.097-1.282-1.92-2.022-4.249-2.091-6.115H5.852v7.194c0 2.126-1.724 3.856-3.855 3.856H0v3.832h2.247c3.856 0 6.994-3.138 6.994-6.994V7.477c.484 1.576 1.472 4.041 3.167 6.331l-2.472 11.192h3.918l1.776-8.038c1.085.715 2.37 1.146 3.731 1.146 3.792 0 6.842-3.05 6.842-6.843-.001-3.791-3.05-6.248-7.842-6.248z" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#14A800', boxShadow: '0 0 8px #14A800', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#65d448', fontWeight: 700 }}>
                    Available for Contracts
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: CREAM, letterSpacing: '-0.01em', lineHeight: 1.25 }}>Hire via Upwork</div>
                <div style={{ fontSize: 12, color: 'rgba(242,236,209,0.5)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Escrow, milestones & hourly contracts
                </div>
              </div>
              <div className="upwork-cta-arrow" style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'rgba(242,236,209,0.06)', border: '1px solid rgba(242,236,209,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: CREAM, flexShrink: 0,
                transition: 'transform 0.25s ease, background 0.25s ease',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(242,236,209,0.08)', marginTop: 80, padding: '28px 0' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13.5, color: 'rgba(242,236,209,0.3)' }}>© 2026 Jospeed · Built with React & Three.js</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['About','Projects','Skills','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13.5, color: 'rgba(242,236,209,0.3)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = CREAM}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,236,209,0.3)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 800px) { #contact-grid { grid-template-columns: 1fr !important; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
