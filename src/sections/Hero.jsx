import { useEffect, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import Scene3D from '../components/Scene3D.jsx';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from '../components/BrandIcons.jsx';

const ROLES = ['Full-Stack Developer', 'AI Automation Specialist', 'React & Supabase Expert', 'n8n Workflow Builder'];

function useTypewriter(words, typeSpeed = 60, deleteSpeed = 35, pause = 1600) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const stagger = (i) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
  });

  return (
    <section id="top" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, overflow: 'hidden' }}>
      <div
        className="wrap"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 40,
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div>
          <div
            style={{
              ...stagger(0),
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px',
              border: '1px solid rgba(163,230,53,0.3)',
              borderRadius: 999,
              fontFamily: 'var(--mono)',
              fontSize: 12.5,
              color: 'var(--signal)',
              marginBottom: 28,
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--signal)', animation: 'ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
              <span style={{ position: 'relative', width: 7, height: 7, borderRadius: '50%', background: 'var(--signal)' }} />
            </span>
            Available for freelance projects
          </div>

          <h1 style={{ ...stagger(1), fontSize: 'clamp(40px, 5.6vw, 68px)', lineHeight: 1.05, marginBottom: 22 }}>
            I Build Products<br />That <span style={{ color: 'var(--indigo-bright)' }}>Scale.</span>
          </h1>

          <div style={{ ...stagger(2), fontFamily: 'var(--mono)', fontSize: 'clamp(15px, 1.6vw, 19px)', color: 'var(--cyan)', marginBottom: 22, minHeight: 28 }}>
            {typed}
            <span style={{ borderRight: '2px solid var(--cyan)', marginLeft: 2, animation: 'blink 1s step-end infinite' }} />
          </div>

          <p style={{ ...stagger(3), fontSize: 17, color: 'var(--text-dim)', maxWidth: 480, marginBottom: 36 }}>
            Full-stack developer specializing in React, Supabase and AI automation. Helping startups and businesses ship faster with clean, scalable code.
          </p>

          <div style={{ ...stagger(4), display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
            <a href="#projects" className="btn btn-primary">
              View my work <ArrowUpRight size={16} />
            </a>
            <a href="/resume.pdf" className="btn btn-ghost">
              Download resume <Download size={16} />
            </a>
          </div>

          <div style={{ ...stagger(5), display: 'flex', gap: 22 }}>
            {[
              { Icon: GithubIcon, href: 'https://github.com/JosephOnifade1', label: 'GitHub' },
              { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/joseph-onifade-ol', label: 'LinkedIn' },
              { Icon: XIcon, href: 'https://x.com/Jospeed7', label: 'X' },
              { Icon: DiscordIcon, href: 'https://discord.com/users/1278856822555414549', label: 'Discord' },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text-faint)', transition: 'color 0.25s ease, transform 0.25s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Icon size={20} color="currentColor" />
              </a>
            ))}
          </div>
        </div>

        <div style={{ ...stagger(2), height: 'clamp(340px, 46vw, 520px)', position: 'relative' }}>
          <Scene3D />
          <p style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
            drag to rotate
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ping { 75%, 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes blink { 50% { border-color: transparent; } }
        @media (max-width: 860px) {
          #top .wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
