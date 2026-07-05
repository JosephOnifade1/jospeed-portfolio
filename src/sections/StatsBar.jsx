import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';

const STATS = [
  { value:4,  suffix:'+', label:'Years experience',   desc:'Building full-stack products'   },
  { value:40, suffix:'+', label:'Projects delivered', desc:'Shipped on time, every time'    },
  { value:15, suffix:'+', label:'Happy clients',      desc:'Across 5 countries'             },
  { value:5,  suffix:'',  label:'Countries served',   desc:'US · UK · CA · EU · UAE'        },
];

function CountUp({ target, inView, suffix }) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    const duration = 1400;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <>{val}{suffix}</>;
}

export default function StatsBar() {
  const [ref, inView] = useReveal();
  return (
    <div className="wrap" ref={ref} style={{ paddingTop:80, paddingBottom:80 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden' }} className="stats-grid">
        {STATS.map((s, i) => (
          <div key={s.label} style={{ padding:'32px 20px', textAlign:'center', borderLeft: i!==0?'1px solid var(--border)':'none', position:'relative' }}>
            <div style={{ fontFamily:'var(--display)', fontSize:'clamp(28px,3.2vw,44px)', fontWeight:700, color:'var(--text)', lineHeight:1, marginBottom:8 }}>
              <CountUp target={s.value} inView={inView} suffix={s.suffix} />
            </div>
            <div style={{ fontWeight:600, fontSize:14, color:'var(--text)', marginBottom:4 }}>{s.label}</div>
            <div style={{ fontFamily:'var(--mono)', fontSize:11.5, color:'var(--text-faint)' }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width:640px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .stats-grid > div:nth-child(3) { border-left: none !important; }
        }
      `}</style>
    </div>
  );
}
