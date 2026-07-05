import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from './BrandIcons.jsx';

const SOCIALS = [
  { Icon: GithubIcon, href: 'https://github.com/JosephOnifade1' },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/joseph-onifade-ol' },
  { Icon: XIcon, href: 'https://x.com/Jospeed7' },
  { Icon: DiscordIcon, href: 'https://discord.com/users/1278856822555414549' },
];
import { useReveal } from '../hooks/useReveal.js';

export default function Contact() {
  const [headRef, headIn] = useReveal();
  const [formRef, formIn] = useReveal();
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    background: '#fff',
    border: '1px solid rgba(77,38,34,0.15)',
    borderRadius: 8,
    color: '#4D2622',
    fontSize: 14.5,
    fontFamily: 'var(--body)',
    outline: 'none',
    transition: 'border-color 0.25s ease',
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 48, textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>// Get In Touch</div>
          <h2 className={`section-heading ${headIn ? 'in-view' : ''}`} style={{ display: 'inline-block' }}>
            Let's build something together.
            <span className="rule" style={{ margin: '14px auto 0' }} />
          </h2>
        </div>

        <div ref={formRef} className={`reveal ${formIn ? 'in-view' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 50 }} id="contact-grid">
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <input style={inputStyle} placeholder="Your name" required onFocus={(e) => (e.target.style.borderColor = 'var(--indigo)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
              <input style={inputStyle} type="email" placeholder="Your email" required onFocus={(e) => (e.target.style.borderColor = 'var(--indigo)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
            </div>
            <select style={{ ...inputStyle, color: 'rgba(77,38,34,0.6)' }} onFocus={(e) => (e.target.style.borderColor = 'var(--indigo)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}>
              <option>Budget: under $500</option>
              <option>Budget: $500 – $1,500</option>
              <option>Budget: $1,500+</option>
            </select>
            <textarea style={{ ...inputStyle, minHeight: 130, resize: 'vertical' }} placeholder="Tell me about your project" required onFocus={(e) => (e.target.style.borderColor = 'var(--indigo)')} onBlur={(e) => (e.target.style.borderColor = 'var(--border)')} />
            <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
              {sent ? 'Message sent' : 'Send message'} <Send size={15} />
            </button>
          </form>

          <div>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 13, color: 'rgba(77,38,34,0.4)', marginBottom: 6, fontFamily: 'var(--mono)' }}>EMAIL</p>
              <a href="mailto:hello@jospeed.dev" style={{ fontSize: 17, color: '#4D2622', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={16} /> hello@jospeed.dev
              </a>
            </div>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 13, color: 'rgba(77,38,34,0.4)', marginBottom: 6, fontFamily: 'var(--mono)' }}>RESPONSE TIME</p>
              <p style={{ fontSize: 15, color: 'rgba(77,38,34,0.6)' }}>Usually replies within 2 hours</p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: 'rgba(77,38,34,0.4)', marginBottom: 10, fontFamily: 'var(--mono)' }}>ELSEWHERE</p>
              <div style={{ display: 'flex', gap: 18 }}>
                {SOCIALS.map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer"
                    style={{ color: 'rgba(77,38,34,0.6)', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
                    <Icon size={20} color="currentColor" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', marginTop: 100, padding: '28px 0' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13.5, color: 'rgba(77,38,34,0.4)' }}>© 2026 Jospeed · Built with React & Three.js</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['About', 'Projects', 'Skills', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13.5, color: 'rgba(77,38,34,0.4)' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 800px) {
          #contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
