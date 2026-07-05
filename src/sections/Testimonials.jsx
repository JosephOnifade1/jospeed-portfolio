import { Star, Quote } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';

const TESTIMONIALS = [
  { quote:"Jospeed rebuilt our booking flow in days, not weeks. Communication was async and effortless across time zones.", name:'Jurre B.', place:'Netherlands 🇳🇱', platform:'Via Fiverr' },
  { quote:"Fast, clean Supabase work and he actually explains decisions instead of just shipping code blindly.", name:'Kenneth M.', place:'USA 🇺🇸', platform:'Via Fiverr' },
  { quote:"The automation he built saves our team hours every week. Exactly the kind of builder you want on a lean team.", name:'Raj P.', place:'UAE 🇦🇪', platform:'Direct client' },
];

function TestimonialCard({ t, i }) {
  const [ref, inView] = useReveal(0.15);
  return (
    <div ref={ref} className={`reveal ${inView?'in-view':''}`} style={{ transitionDelay:`${i*0.1}s` }}>
      <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:12, padding:28, height:'100%', position:'relative' }}>
        <Quote size={26} color="var(--accent)" style={{ opacity:0.3, marginBottom:14 }} />
        <div style={{ display:'flex', gap:3, marginBottom:14 }}>
          {Array.from({length:5}).map((_,idx) => <Star key={idx} size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />)}
        </div>
        <p style={{ fontSize:15, color:'var(--text)', lineHeight:1.65, marginBottom:22 }}>"{t.quote}"</p>
        <div>
          <div style={{ fontWeight:600, fontSize:14.5 }}>{t.name}</div>
          <div style={{ fontSize:13, color:'var(--text-faint)' }}>{t.place} · {t.platform}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="testimonials">
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn?'in-view':''}`} style={{ marginBottom:40 }}>
          <div className="eyebrow">// Client Words</div>
          <h2 className={`section-heading ${headIn?'in-view':''}`}>
            Trusted across time zones.<span className="rule" />
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }} className="testimonial-grid">
          {TESTIMONIALS.map((t,i) => <TestimonialCard key={t.name} t={t} i={i} />)}
        </div>
      </div>
      <style>{`@media(max-width:860px){.testimonial-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}
