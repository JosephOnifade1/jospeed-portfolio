import { useEffect, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import Scene3D from '../components/Scene3D.jsx';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from '../components/BrandIcons.jsx';
import MagneticHeading from '../components/MagneticHeading.jsx';
import MechanicalRolodex from '../components/MechanicalRolodex.jsx';

const ROLES = [
  'Full-Stack Developer',
  'AI Automation Specialist',
  'React & Supabase Architect',
  'n8n Workflow Specialist',
];

const SOCIALS = [
  { Icon: GithubIcon,   href: 'https://github.com/JosephOnifade1',              label: 'GitHub'   },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/joseph-onifade-ol',  label: 'LinkedIn' },
  { Icon: XIcon,        href: 'https://x.com/buildwithjospeed',                  label: 'X'        },
  { Icon: DiscordIcon,  href: 'https://discord.com/users/1278856822555414549',   label: 'Discord'  },
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const stagger = i => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${i*0.11}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i*0.11}s`,
  });

  return (
    <section id="top" style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:76 }}>
      <div className="wrap" style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:0, alignItems:'center', width:'100%' }} id="hero-grid">
        <div style={{ paddingRight: 32 }}>
          <MagneticHeading inView={loaded} style={stagger(0)} />

          {/* Mechanical Rolodex */}
          <div style={stagger(1)}>
            <MechanicalRolodex roles={ROLES} />
          </div>

          <p id="hero-sub" style={{ ...stagger(2), fontSize:16, color:'var(--text-dim)', maxWidth:460, marginBottom:36, lineHeight:1.75 }}>
            Full-stack engineer specializing in React, Supabase, and autonomous AI pipelines.
            Turning product concepts and Figma designs into production-ready software in days — without agency bloat or meeting overhead.
          </p>

          <div style={{ ...stagger(4), display:'flex', gap:12, flexWrap:'wrap', marginBottom:40 }}>
            <a href="#projects" style={{
              display:'inline-flex', alignItems:'center', gap:7,
              padding:'13px 24px', borderRadius:6,
              background:'#F2ECD1', color:'#4D2622',
              fontSize:14.5, fontWeight:700, transition:'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#F2ECD1'; e.currentTarget.style.transform='translateY(0)'; }}
            >View my work <ArrowUpRight size={15} /></a>

            <a href="/resume.pdf" style={{
              display:'inline-flex', alignItems:'center', gap:7,
              padding:'13px 24px', borderRadius:6,
              background:'transparent', color:'var(--text-dim)',
              fontSize:14.5, fontWeight:500,
              border:'1px solid var(--border-strong)',
              transition:'color 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.borderColor='var(--text-dim)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='var(--text-dim)'; e.currentTarget.style.borderColor='var(--border-strong)'; }}
            ><Download size={14} /> Resume</a>
          </div>

          <div style={{ ...stagger(5), display:'flex', gap:20, alignItems:'center' }}>
            <span style={{ fontFamily:'var(--mono)', fontSize:11.5, color:'var(--text-faint)', letterSpacing:'0.03em' }}>FIND ME ON</span>
            {SOCIALS.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                style={{ color:'var(--text-faint)', transition:'color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--accent-gold)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--text-faint)'; e.currentTarget.style.transform='none'; }}
              ><Icon size={19} color="currentColor" /></a>
            ))}
          </div>
        </div>

        <div style={{ ...stagger(1), position:'relative', height:'clamp(480px,58vw,680px)' }}>
          <Scene3D />
          <span style={{ position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', fontFamily:'var(--mono)', fontSize:11, color:'var(--text-faint)', whiteSpace:'nowrap', pointerEvents:'none' }}>
            drag to rotate
          </span>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          #hero-grid { grid-template-columns: 1fr !important; }
          #hero-grid > div:last-child { height: clamp(360px,80vw,500px) !important; }
          #hero-grid > div:first-child { padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}
