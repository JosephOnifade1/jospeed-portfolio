import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import LanternLotus from '../components/originkit/ui/lantern-lotus';
import {
  Play, CheckCircle, Loader, ArrowRight, Zap,
  Phone, MessageSquare, Bot, ClipboardList, Calendar,
  ShoppingCart, Mail, Tag, BarChart2, Home,
  FileSignature, FolderOpen, Target, Receipt,
  TrendingDown, Gift, Activity,
} from 'lucide-react';

const BUSINESS_TYPES = [
  { label: 'Dental Clinic', value: 'dental' },
  { label: 'E-commerce Store', value: 'ecommerce' },
  { label: 'Real Estate Agency', value: 'realestate' },
  { label: 'Freelance Agency', value: 'agency' },
  { label: 'SaaS Product', value: 'saas' },
];

const AUTOMATION_FLOWS = {
  dental: {
    title: 'Missed-Call Recovery System',
    steps: [
      { icon: Phone,         label: 'Missed call detected',    detail: 'Twilio webhook fires in real-time',                         delay: 0 },
      { icon: Zap,           label: 'n8n workflow triggers',   detail: 'Decision node checks business hours',                       delay: 700 },
      { icon: MessageSquare, label: 'SMS sent in 60 seconds',  detail: '"Hi, we missed your call! How can we help?"',               delay: 1400 },
      { icon: Bot,           label: 'AI qualifies the patient',detail: 'Detects urgency: emergency vs routine',                     delay: 2100 },
      { icon: ClipboardList, label: 'Lead logged to CRM',      detail: 'GoHighLevel pipeline updated automatically',                delay: 2800 },
      { icon: Calendar,      label: 'Appointment link sent',   detail: 'Calendly link delivered if patient is ready',               delay: 3500 },
    ],
    outcome: '~32% of missed calls recovered as booked appointments',
    tools: ['n8n', 'Twilio', 'GoHighLevel', 'Calendly'],
  },
  ecommerce: {
    title: 'Abandoned Cart Recovery Pipeline',
    steps: [
      { icon: ShoppingCart,  label: 'Cart abandoned detected', detail: 'Shopify webhook triggers after 30 min',                     delay: 0 },
      { icon: Zap,           label: 'n8n flow activates',      detail: 'Customer data pulled from Shopify',                        delay: 700 },
      { icon: Mail,          label: 'Recovery email #1 sent',  detail: '"You left something behind..." — 1hr later',               delay: 1400 },
      { icon: Bot,           label: 'AI personalizes copy',    detail: 'Product-specific message using Groq API',                  delay: 2100 },
      { icon: Tag,           label: 'Discount code triggered', detail: '10% code if no purchase after 24hrs',                      delay: 2800 },
      { icon: BarChart2,     label: 'Revenue logged to sheet', detail: 'Recovery rate tracked in Google Sheets',                   delay: 3500 },
    ],
    outcome: '~18% average cart recovery rate on automated sequences',
    tools: ['n8n', 'Shopify', 'Groq', 'Gmail', 'Google Sheets'],
  },
  realestate: {
    title: 'Lead Nurturing Automation',
    steps: [
      { icon: Home,          label: 'New lead form submitted', detail: 'Website form captured via webhook',                        delay: 0 },
      { icon: Zap,           label: 'n8n scores the lead',     detail: 'Budget + timeline signals assessed',                      delay: 700 },
      { icon: MessageSquare, label: 'WhatsApp message sent',   detail: '"Thanks for reaching out! Here\'s what matches..."',      delay: 1400 },
      { icon: Bot,           label: 'AI matches properties',   detail: 'Claude API filters listings by preference',               delay: 2100 },
      { icon: Calendar,      label: 'Viewing auto-scheduled',  detail: 'Calendly link with agent pre-assigned',                   delay: 2800 },
      { icon: ClipboardList, label: 'CRM pipeline updated',    detail: 'Lead stage moved to "Viewing Booked"',                   delay: 3500 },
    ],
    outcome: '3x faster response time vs manual follow-up',
    tools: ['n8n', 'WhatsApp API', 'Claude API', 'Calendly', 'HubSpot'],
  },
  agency: {
    title: 'Client Onboarding Automation',
    steps: [
      { icon: FileSignature, label: 'Contract signed',         detail: 'DocuSign webhook fires on completion',                    delay: 0 },
      { icon: Zap,           label: 'n8n onboarding starts',   detail: 'Client data extracted from contract',                    delay: 700 },
      { icon: FolderOpen,    label: 'Workspace auto-created',  detail: 'Notion + Slack channel + Drive folder',                  delay: 1400 },
      { icon: Mail,          label: 'Welcome sequence sent',   detail: '5-email drip over 7 days via Gmail',                     delay: 2100 },
      { icon: Target,        label: 'Kickoff call scheduled',  detail: 'Calendly invite with briefing doc attached',             delay: 2800 },
      { icon: Receipt,       label: 'Invoice generated',       detail: 'Stripe payment link + receipt auto-sent',                delay: 3500 },
    ],
    outcome: 'Saves 4+ hours per client onboarding. Zero manual steps.',
    tools: ['n8n', 'Notion', 'Slack', 'Stripe', 'Gmail'],
  },
  saas: {
    title: 'Churn Prevention Workflow',
    steps: [
      { icon: TrendingDown,  label: 'Usage drop detected',     detail: 'User inactive for 7 days — Supabase trigger',            delay: 0 },
      { icon: Zap,           label: 'n8n risk assessment',     detail: 'Plan type + feature adoption scored',                    delay: 700 },
      { icon: Bot,           label: 'AI drafts re-engagement', detail: 'Personalized email based on unused features',            delay: 1400 },
      { icon: Mail,          label: 'Re-engagement email sent',detail: '"Here\'s what you haven\'t tried yet..."',               delay: 2100 },
      { icon: Activity,      label: 'In-app nudge triggered',  detail: 'Intercom message on next login',                        delay: 2800 },
      { icon: Gift,          label: 'Loyalty offer sent',      detail: '30% off if still inactive after 14 days',               delay: 3500 },
    ],
    outcome: '~22% of at-risk users reactivated before churning',
    tools: ['n8n', 'Supabase', 'Groq', 'Intercom', 'SendGrid'],
  },
};

export default function AutomationDemo() {
  const [headRef, headIn] = useReveal();
  const [selected, setSelected] = useState('dental');
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [done, setDone] = useState(false);
  const timerRefs = useRef([]);

  const flow = AUTOMATION_FLOWS[selected];

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  const runDemo = () => {
    clearTimers();
    setRunning(true);
    setDone(false);
    setActiveStep(-1);

    flow.steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setActiveStep(i);
        if (i === flow.steps.length - 1) {
          const t2 = setTimeout(() => { setRunning(false); setDone(true); }, 600);
          timerRefs.current.push(t2);
        }
      }, step.delay + 300);
      timerRefs.current.push(t);
    });
  };

  useEffect(() => {
    setActiveStep(-1);
    setRunning(false);
    setDone(false);
    clearTimers();
  }, [selected]);

  useEffect(() => () => clearTimers(), []);

  return (
    <section id="automation-demo" style={{ background: 'rgba(242,236,209,0.06)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
      {/* Two-column header: text+pills left, Lantern Lotus right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 0, alignItems: 'stretch', marginBottom: 32 }} className="automation-header-grid">

          {/* Left: eyebrow + heading + description + pills */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 32 }}>
            <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 28 }}>
              <div className="eyebrow">// Live Demo</div>
              <h2 className={`section-heading ${headIn ? 'in-view' : ''}`}>
                Watch automation in action.
                <span className="rule" />
              </h2>
              <p style={{ color: 'rgba(242,236,209,0.6)', fontSize: 16, maxWidth: 520, marginTop: 12 }}>
                Pick a business type and run a real simulation of the automation I'd build for it.
              </p>
            </div>

            {/* Business type selector */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {BUSINESS_TYPES.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setSelected(b.value)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 999,
                    fontSize: 13.5,
                    fontWeight: 600,
                    border: `1px solid ${selected === b.value ? '#c9922a' : 'rgba(242,236,209,0.2)'}`,
                    background: selected === b.value ? '#c9922a' : 'transparent',
                    color: selected === b.value ? '#24100e' : 'rgba(242,236,209,0.7)',
                    transition: 'all 0.22s ease',
                    cursor: 'pointer',
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Lantern Lotus — fills the empty space */}
          <div style={{ position: 'relative', height: 300, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
            <LanternLotus
              background="transparent"
              petals={12}
              layers={4}
              flowerSize={170}
              glow={6}
              unfurl
              spin={0.7}
              float={3}
              speed={4}
              colors={{
                petal: '#8b1a1a',
                light: '#c9922a',
                sheen: '#F2ECD1',
              }}
              pointer={{ follow: true, tilt: 6, hoverGlow: 6, smoothing: 5 }}
              style={{ background: 'transparent' }}
            />
          </div>
        </div>


        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }} className="demo-grid">
          {/* Flow visualiser */}
          <div style={{ background: '#2d1412', border: '1px solid rgba(242,236,209,0.14)', borderRadius: 14, overflow: 'hidden' }}>
            {/* Top bar */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(242,236,209,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>// WORKFLOW PIPELINE</span>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 17, color: '#F2ECD1', marginTop: 2 }}>{flow.title}</div>
              </div>
              <button
                onClick={runDemo}
                disabled={running}
                style={{
                  background: '#c9922a',
                  color: '#24100e',
                  border: 'none',
                  borderRadius: 7,
                  padding: '9px 18px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: running ? 'not-allowed' : 'pointer',
                  opacity: running ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  transition: 'all 0.2s',
                }}
              >
                {running ? <><Loader size={13} style={{ animation: 'spin 1s linear infinite' }} /> Running...</> : <><Play size={13} /> Run simulation</>}
              </button>
            </div>

            {/* Steps */}
            <div style={{ padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {flow.steps.map((step, i) => {
                const isActive = activeStep >= i;
                const isCurrent = activeStep === i;
                return (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative' }}>
                    {/* Connector line */}
                    {i < flow.steps.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: 19,
                        top: 40,
                        width: 2,
                        height: 36,
                        background: isActive && activeStep > i ? '#c9922a' : 'rgba(242,236,209,0.12)',
                        transition: 'background 0.4s ease',
                      }} />
                    )}

                    {/* Node */}
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: isActive ? (isCurrent ? '#c9922a' : 'rgba(201,146,42,0.18)') : 'rgba(36,16,14,0.7)',
                      border: `2px solid ${isActive ? '#c9922a' : 'rgba(242,236,209,0.16)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0,
                      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                      boxShadow: isCurrent ? '0 0 16px rgba(201,146,42,0.5)' : 'none',
                      zIndex: 1,
                    }}>
                      {isActive && activeStep > i
                        ? <CheckCircle size={16} color="#c9922a" />
                        : (() => { const Icon = step.icon; return <Icon size={16} color={isActive ? (isCurrent ? '#24100e' : '#e8b84b') : 'rgba(242,236,209,0.3)'} />; })()
                      }
                    </div>

                    <div style={{ paddingBottom: 28, opacity: isActive ? 1 : 0.4, transition: 'opacity 0.4s ease' }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: '#F2ECD1', marginBottom: 3 }}>{step.label}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(242,236,209,0.5)' }}>{step.detail}</div>
                    </div>
                  </div>
                );
              })}

              {/* Result */}
              {done && (
                <div style={{
                  marginTop: 8,
                  padding: '14px 18px',
                  background: 'rgba(201,146,42,0.14)',
                  border: '1px solid rgba(201,146,42,0.35)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  animation: 'fadeUp 0.4s ease',
                }}>
                  <Zap size={16} color="#c9922a" />
                  <span style={{ fontSize: 13.5, color: '#F2ECD1', fontWeight: 600 }}>{flow.outcome}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#2d1412', border: '1px solid rgba(242,236,209,0.12)', borderRadius: 12, padding: 20 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Production Stack</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {flow.tools.map(t => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      padding: '4px 9px',
                      borderRadius: 4,
                      background: 'rgba(242,236,209,0.08)',
                      border: '1px solid rgba(242,236,209,0.16)',
                      color: '#F2ECD1',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: '#2d1412', border: '1px solid rgba(242,236,209,0.12)', borderRadius: 12, padding: 20 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Architecture SLA</div>
              {['Autonomous triggers — zero human intervention', '24/7 uptime on dedicated cloud instances', 'Live monitoring & webhook failure retries', 'Version-controlled n8n JSON nodes'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                  <CheckCircle size={13} color="#c9922a" />
                  <span style={{ fontSize: 13, color: 'rgba(242,236,209,0.75)' }}>{f}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 8,
                background: '#F2ECD1',
                color: '#4D2622',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F2ECD1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Engineer this workflow <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 860px) {
          .demo-grid { grid-template-columns: 1fr !important; }
          .automation-header-grid { grid-template-columns: 1fr !important; }
          .automation-header-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
