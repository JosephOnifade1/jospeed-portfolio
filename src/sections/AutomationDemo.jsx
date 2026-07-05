import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import {
  Play, CheckCircle, Loader, ArrowRight, Zap,
  Phone, MessageSquare, Bot, ClipboardList, Calendar,
  ShoppingCart, Mail, Tag, BarChart2, Home, Users,
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
    <section id="automation-demo" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 40 }}>
          <div className="eyebrow">// Live Demo</div>
          <h2 className={`section-heading ${headIn ? 'in-view' : ''}`}>
            Watch automation in action.
            <span className="rule" />
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 560, marginTop: 12 }}>
            Pick a business type and run a real simulation of the automation I'd build for it.
          </p>
        </div>

        {/* Business type selector */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {BUSINESS_TYPES.map((b) => (
            <button
              key={b.value}
              onClick={() => setSelected(b.value)}
              style={{
                padding: '9px 18px',
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                border: `1px solid ${selected === b.value ? 'transparent' : 'var(--border-strong)'}`,
                background: selected === b.value ? 'var(--indigo)' : 'transparent',
                color: selected === b.value ? '#fff' : 'var(--text-dim)',
                transition: 'all 0.22s ease',
                cursor: 'pointer',
              }}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }} className="demo-grid">
          {/* Flow visualiser */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            {/* Top bar */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', textTransform: 'uppercase' }}>workflow</span>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 16, marginTop: 2 }}>{flow.title}</div>
              </div>
              <button
                onClick={runDemo}
                disabled={running}
                className="btn btn-primary btn-sm"
                style={{ opacity: running ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 7 }}
              >
                {running ? <><Loader size={13} style={{ animation: 'spin 1s linear infinite' }} /> Running...</> : <><Play size={13} /> Run demo</>}
              </button>
            </div>

            {/* Steps */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
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
                        background: isActive && activeStep > i ? 'var(--indigo)' : 'var(--border)',
                        transition: 'background 0.4s ease',
                      }} />
                    )}

                    {/* Node */}
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: isActive ? (isCurrent ? 'var(--indigo)' : 'rgba(99,102,241,0.15)') : 'var(--surface)',
                      border: `2px solid ${isActive ? 'var(--indigo)' : 'var(--border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0,
                      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                      boxShadow: isCurrent ? '0 0 16px rgba(99,102,241,0.5)' : 'none',
                      zIndex: 1,
                    }}>
                      {isActive && activeStep > i
                        ? <CheckCircle size={16} color="var(--signal)" />
                        : (() => { const Icon = step.icon; return <Icon size={16} color={isActive ? 'var(--cyan)' : 'var(--text-faint)'} />; })()
                      }
                    </div>

                    <div style={{ paddingBottom: 28, opacity: isActive ? 1 : 0.35, transition: 'opacity 0.4s ease' }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--text)', marginBottom: 3 }}>{step.label}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)' }}>{step.detail}</div>
                    </div>
                  </div>
                );
              })}

              {/* Result */}
              {done && (
                <div style={{
                  marginTop: 8,
                  padding: '14px 18px',
                  background: 'rgba(163,230,53,0.08)',
                  border: '1px solid rgba(163,230,53,0.25)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  animation: 'fadeUp 0.4s ease',
                }}>
                  <Zap size={16} color="var(--signal)" />
                  <span style={{ fontSize: 13.5, color: 'var(--signal)', fontWeight: 600 }}>{flow.outcome}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>Tools used</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {flow.tools.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>

            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>What you get</div>
              {['Fully automated — no manual steps', 'Runs 24/7 including weekends', 'Setup in 3–5 days', 'Easy to modify as you scale'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                  <CheckCircle size={13} color="var(--signal)" />
                  <span style={{ fontSize: 13.5, color: 'var(--text-dim)' }}>{f}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn-primary" style={{ justifyContent: 'center', textAlign: 'center' }}>
              Build this for my business <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 860px) {
          .demo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
