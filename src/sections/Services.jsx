import { Code2, Bot, Workflow, Box, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';
import { useState } from 'react';

const SERVICES = [
  {
    icon: Code2,
    name: 'Full-Stack Web App',
    desc: 'React + Supabase products with auth, real-time data, and clean deployments. From idea to shipped in days.',
    price: 'From $250',
    features: ['React + TypeScript', 'Supabase / PostgreSQL', 'Auth + RLS', 'Vercel deployment'],
    accent: 'var(--indigo)',
  },
  {
    icon: Bot,
    name: 'AI Chatbot & Voice Agent',
    desc: 'Voiceflow, Vapi and ManyChat agents that qualify leads, book appointments and answer customers 24/7.',
    price: 'From $150',
    features: ['Voiceflow / Landbot', 'Vapi / Retell AI', 'Claude / GPT integration', 'CRM handoff'],
    accent: 'var(--cyan)',
  },
  {
    icon: Workflow,
    name: 'n8n Workflow Automation',
    desc: 'Custom automations connecting your CRM, leads, payments, and messaging — zero manual work.',
    price: 'From $120',
    features: ['n8n self-hosted', 'Webhook pipelines', 'Twilio / WhatsApp', 'GoHighLevel / Sheets'],
    accent: 'var(--signal)',
  },
  {
    icon: Box,
    name: '3D & No-Code Builds',
    desc: 'Blender renders, Three.js web experiences, and full apps built in Lovable, Bubble or Adalo — fast.',
    price: 'From $100',
    features: ['Blender + Three.js', 'Lovable / Bubble', 'Adalo / FlutterFlow', 'Product configurators'],
    accent: 'var(--indigo-bright)',
  },
];

function ServiceCard({ s, i }) {
  const [ref, inView] = useReveal(0.15);
  const [hover, setHover] = useState(false);
  const Icon = s.icon;

  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`} style={{ transitionDelay: `${i * 0.08}s` }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{
        background: 'var(--surface)',
        border: `1px solid ${hover ? s.accent : 'var(--border)'}`,
        borderRadius: 14,
        padding: '28px 26px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hover ? `0 16px 40px -12px ${s.accent}30` : 'none',
      }}>
        {/* Top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.accent, transform: hover ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={22} color={s.accent} />
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: s.accent, fontWeight: 600 }}>{s.price}</span>
        </div>

        <h3 style={{ fontSize: 18, marginBottom: 10, lineHeight: 1.3 }}>{s.name}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{s.desc}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
          {s.features.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={13} color={s.accent} />
              <span style={{ fontSize: 13.5, color: 'var(--text-dim)' }}>{f}</span>
            </div>
          ))}
        </div>

        <a href="#contact" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '11px 0', borderRadius: 8,
          background: hover ? s.accent : 'transparent',
          border: `1px solid ${s.accent}`,
          color: hover ? '#fff' : s.accent,
          fontSize: 13.5, fontWeight: 600,
          transition: 'background 0.25s ease, color 0.25s ease',
        }}>
          Get a quote <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="services">
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 44 }}>
          <div className="eyebrow">// What I Offer</div>
          <h2 className={`section-heading ${headIn ? 'in-view' : ''}`}>
            Services built around outcomes.
            <span className="rule" />
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 500, marginTop: 12 }}>
            Every engagement starts with a clear scope doc. You know exactly what you're getting before I write a single line.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="services-grid">
          {SERVICES.map((s, i) => <ServiceCard key={s.name} s={s} i={i} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
