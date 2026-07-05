import { useEffect, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import Scene3D from '../components/Scene3D.jsx';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from '../components/BrandIcons.jsx';
import MagneticHeading from '../components/MagneticHeading.jsx';

const ROLES = ['Full-Stack Developer','AI Automation Specialist','React & Supabase Expert','n8n Workflow Builder'];

function useTypewriter(words, typeSpeed=60, deleteSpeed=35, pause=1800) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIndex];
    let timeout;
    if (!deleting && text === current) timeout = setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === '') { setDeleting(false); setWordIndex(i => (i+1)%words.length); }
    else timeout = setTimeout(() => setText(t => deleting ? current.slice(0,t.length-1) : current.slice(0,t.length+1)), deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);
  return text;
}

const SOCIALS = [
  { Icon: GithubIcon,   href: 'https://github.com/JosephOnifade1',              label: 'GitHub'   },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/joseph-onifade-ol',  label: 'LinkedIn' },
  { Icon: XIcon,        href: 'https://x.com/Jospeed7',                         label: 'X'        },
  { Icon: DiscordIcon,  href: 'https://discord.com/users/1278856822555414549',   label: 'Discord'  },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);
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
        <div style={{ paddingRight:32 }}>
          {/* Status */}
          <div style={{ ...stagger(0), display:'flex', alignItems:'center', gap:8, marginBottom:28 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--signal)', boxShadow:'0 0 8px var(--signal)', flexShrink:0 }} />
            <span style={{ fontFamily:'var(--mono)', fontSize:12.5, color:'var(--text-faint)', letterSpacing:'0.04em' }}>
              Open to new projects — async only
            </span>
          </div>

          <MagneticHeading inView={loaded} style={stagger(1)} />

          {/* Typewriter */}
          <div style={{ ...stagger(2), fontFamily:'var(--mono)', fontSize:'clamp(13px,1.4vw,16px)', color:'var(--accent-gold)', marginBottom:18, minHeight:22 }}>
            {typed}<span style={{ borderRight:'2px solid var(--accent-gold)', marginLeft:1, animation:'blink 1s step-end infinite' }} />
          </div>

          <p style={{ ...stagger(3), fontSize:16, color:'var(--text-dim)', maxWidth:440, marginBottom:36, lineHeight:1.75 }}>
            Full-stack developer specializing in React, Supabase and AI automation.
            Helping startups and businesses ship faster with clean, scalable code.
          </p>

          <div style={{ ...stagger(4), display:'flex', gap:12, flexWrap:'wrap', marginBottom:40 }}>
            <a href="#projects" style={{
              display:'inline-flex', alignItems:'center', gap:7,
              padding:'13px 24px', borderRadius:6,
              background:'var(--accent)', color:'var(--bg-warm)',
              fontSize:14.5, fontWeight:700, transition:'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent-bright)'; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.transform='translateY(0)'; }}
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
        @keyframes blink { 50% { border-color: transparent; } }
        @media (max-width: 860px) {
          #hero-grid { grid-template-columns: 1fr !important; }
          #hero-grid > div:last-child { height: clamp(360px,80vw,500px) !important; }
          #hero-grid > div:first-child { padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}
