import { Code2, Bot, Workflow, Box, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';
import { useState } from 'react';

const SERVICES = [
  { icon: Code2,     name:'Full-Stack Web App',        desc:'React + Supabase products with auth, real-time data, and clean deployments. From idea to shipped in days.', price:'From $250', features:['React + TypeScript','Supabase / PostgreSQL','Auth + RLS','Vercel deployment'] },
  { icon: Bot,       name:'AI Chatbot & Voice Agent',  desc:'Voiceflow and Vapi agents that qualify leads, book appointments and answer customers 24/7.', price:'From $150', features:['Voiceflow / Landbot','Vapi / Retell AI','Claude / GPT integration','CRM handoff'] },
  { icon: Workflow,  name:'n8n Workflow Automation',   desc:'Custom automations connecting your CRM, leads, payments, and messaging — zero manual work.', price:'From $120', features:['n8n self-hosted','Webhook pipelines','Twilio / WhatsApp','GoHighLevel / Sheets'] },
  { icon: Box,       name:'3D & No-Code Builds',       desc:'Blender renders, Three.js experiences, and full apps built in Lovable, Bubble or Adalo — fast.', price:'From $100', features:['Blender + Three.js','Lovable / Bubble','Adalo / FlutterFlow','Product configurators'] },
];

function ServiceCard({ s, i }) {
  const [ref, inView] = useReveal(0.15);
  const [hover, setHover] = useState(false);
  const Icon = s.icon;
  return (
    <div ref={ref} className={`reveal ${inView?'in-view':''}`} style={{ transitionDelay:`${i*0.08}s` }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{
        background: hover ? '#4D2622' : '#fff',
        border: `1px solid ${hover ? 'transparent' : 'rgba(77,38,34,0.15)'}`,
        borderRadius:14, padding:'28px 26px', height:'100%',
        display:'flex', flexDirection:'column',
        transition:'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: hover ? '0 20px 50px rgba(77,38,34,0.25)' : '0 2px 12px rgba(77,38,34,0.07)',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background: hover ? '#F2ECD1' : '#4D2622', transition:'background 0.3s' }} />
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
          <div style={{ width:48, height:48, borderRadius:12, background: hover ? 'rgba(242,236,209,0.15)' : 'rgba(77,38,34,0.08)', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.3s' }}>
            <Icon size={22} color={hover ? '#F2ECD1' : '#4D2622'} />
          </div>
          <span style={{ fontFamily:'var(--mono)', fontSize:13, color: hover ? 'rgba(242,236,209,0.7)' : 'rgba(77,38,34,0.5)', fontWeight:600 }}>{s.price}</span>
        </div>
        <h3 style={{ fontSize:18, marginBottom:10, lineHeight:1.3, color: hover ? '#F2ECD1' : '#4D2622' }}>{s.name}</h3>
        <p style={{ fontSize:14, color: hover ? 'rgba(242,236,209,0.65)' : 'rgba(77,38,34,0.6)', lineHeight:1.65, marginBottom:20, flex:1 }}>{s.desc}</p>
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:22 }}>
          {s.features.map(f => (
            <div key={f} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <CheckCircle size={13} color={hover ? '#F2ECD1' : '#4D2622'} />
              <span style={{ fontSize:13.5, color: hover ? 'rgba(242,236,209,0.7)' : 'rgba(77,38,34,0.65)' }}>{f}</span>
            </div>
          ))}
        </div>
        <a href="#contact" style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:6,
          padding:'11px 0', borderRadius:8,
          background: hover ? '#F2ECD1' : '#4D2622',
          border:'none', color: hover ? '#4D2622' : '#F2ECD1',
          fontSize:13.5, fontWeight:700, transition:'background 0.25s ease, color 0.25s ease',
        }}>Get a quote <ArrowUpRight size={14} /></a>
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
          <div className="eyebrow" style={{ color:'#4D2622' }}>
            <span style={{ width:18, height:1, background:'#4D2622', display:'inline-block' }} />
            What I Offer
          </div>
          <h2 style={{ fontSize:'clamp(30px,4vw,50px)', color:'#4D2622', marginBottom:12, fontFamily:'var(--display)', fontWeight:700 }}>
            Services built around outcomes.
          </h2>
          <p style={{ color:'rgba(77,38,34,0.6)', fontSize:16, maxWidth:500 }}>
            Every engagement starts with a clear scope doc before any code is written.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }} className="services-grid">
          {SERVICES.map((s,i) => <ServiceCard key={s.name} s={s} i={i} />)}
        </div>
      </div>
      <style>{`@media(max-width:1024px){.services-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:560px){.services-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
