import { Code2, Bot, Workflow, Box, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';
import { useState } from 'react';

const DARK = '#4D2622';
const CREAM = '#F2ECD1';

const SERVICES = [
  { icon: Code2,    name:'Full-Stack Web App',       desc:'React + Supabase products with auth, real-time data, and clean deployments. From idea to shipped fast.', price:'From $250', features:['React + TypeScript','Supabase / PostgreSQL','Auth + RLS','Vercel deployment'] },
  { icon: Bot,      name:'AI Chatbot & Voice Agent', desc:'Voiceflow and Vapi agents that qualify leads, book appointments and answer customers 24/7.', price:'From $150', features:['Voiceflow / Landbot','Vapi / Retell AI','Claude / GPT integration','CRM handoff'] },
  { icon: Workflow, name:'n8n Workflow Automation',  desc:'Custom automations connecting your CRM, leads, payments, and messaging — zero manual work.', price:'From $120', features:['n8n self-hosted','Webhook pipelines','Twilio / WhatsApp','GoHighLevel / Sheets'] },
  { icon: Box,      name:'3D & No-Code Builds',      desc:'Blender renders, Three.js experiences, and full apps built in Lovable, Bubble or Adalo — fast.', price:'From $100', features:['Blender + Three.js','Lovable / Bubble','Adalo / FlutterFlow','Product configurators'] },
];

function ServiceCard({ s, i }) {
  const [ref, inView] = useReveal(0.15);
  const [hover, setHover] = useState(false);
  const Icon = s.icon;
  return (
    <div ref={ref} className={`reveal ${inView?'in-view':''}`} style={{ transitionDelay:`${i*0.08}s` }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{
        background: hover ? CREAM : 'rgba(242,236,209,0.05)',
        border: `1px solid ${hover ? 'transparent' : 'rgba(242,236,209,0.12)'}`,
        borderRadius: 14, padding:'28px 24px', height:'100%', display:'flex', flexDirection:'column',
        transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: hover ? `0 20px 50px rgba(0,0,0,0.35)` : 'none',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background: hover ? DARK : CREAM, opacity: hover ? 1 : 0.25, transition:'all 0.3s' }} />

        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18 }}>
          <div style={{ width:46, height:46, borderRadius:10, background: hover ? 'rgba(77,38,34,0.1)' : 'rgba(242,236,209,0.08)', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.3s' }}>
            <Icon size={22} color={hover ? DARK : CREAM} />
          </div>
          <span style={{ fontFamily:'var(--mono)', fontSize:12.5, color: hover ? 'rgba(77,38,34,0.5)' : 'rgba(242,236,209,0.4)', fontWeight:600 }}>{s.price}</span>
        </div>

        <h3 style={{ fontSize:17, marginBottom:10, lineHeight:1.3, color: hover ? DARK : CREAM }}>{s.name}</h3>
        <p style={{ fontSize:13.5, color: hover ? 'rgba(77,38,34,0.6)' : 'rgba(242,236,209,0.55)', lineHeight:1.65, marginBottom:18, flex:1 }}>{s.desc}</p>

        <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:20 }}>
          {s.features.map(f => (
            <div key={f} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <CheckCircle size={13} color={hover ? DARK : 'rgba(242,236,209,0.5)'} />
              <span style={{ fontSize:13, color: hover ? 'rgba(77,38,34,0.65)' : 'rgba(242,236,209,0.55)' }}>{f}</span>
            </div>
          ))}
        </div>

        <a href="#contact" style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          padding:'11px 0', borderRadius:8,
          background: hover ? DARK : CREAM,
          color: hover ? CREAM : DARK,
          fontSize:13.5, fontWeight:700,
          transition:'all 0.25s ease', textDecoration:'none',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Get a quote <ArrowUpRight size={14} /></a>
      </div>
    </div>
  );
}

export default function Services() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="services">
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn?'in-view':''}`} style={{ marginBottom:44 }}>
          <div style={{ fontFamily:'var(--mono)', fontSize:11.5, letterSpacing:'0.1em', color:'rgba(242,236,209,0.4)', textTransform:'uppercase', display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <span style={{ width:18, height:1, background:CREAM, opacity:0.3, display:'inline-block' }} />
            What I Offer
          </div>
          <h2 style={{ fontSize:'clamp(28px,4vw,48px)', color:CREAM, fontFamily:'var(--display)', fontWeight:700, letterSpacing:'-0.02em', marginBottom:12 }}>
            Services built around outcomes.
          </h2>
          <p style={{ color:'rgba(242,236,209,0.5)', fontSize:16, maxWidth:500 }}>
            Every engagement starts with a clear scope doc before any code is written.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }} className="services-grid">
          {SERVICES.map((s,i) => <ServiceCard key={s.name} s={s} i={i} />)}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.services-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:560px){.services-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}
