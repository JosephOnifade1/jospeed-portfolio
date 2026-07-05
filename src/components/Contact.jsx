import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from './BrandIcons.jsx';
import { useReveal } from '../hooks/useReveal.js';

const DARK = '#4D2622';
const CREAM = '#F2ECD1';

const SOCIALS = [
  { Icon: GithubIcon,   href: 'https://github.com/JosephOnifade1',             label: 'GitHub'   },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/joseph-onifade-ol', label: 'LinkedIn' },
  { Icon: XIcon,        href: 'https://x.com/Jospeed7',                        label: 'X'        },
  { Icon: DiscordIcon,  href: 'https://discord.com/users/1278856822555414549',  label: 'Discord'  },
];

export default function Contact() {
  const [headRef, headIn] = useReveal();
  const [formRef, formIn] = useReveal();
  const [sent, setSent] = useState(false);

  const input = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(242,236,209,0.06)',
    border: '1px solid rgba(242,236,209,0.15)',
    borderRadius: 8, color: CREAM,
    fontSize: 14.5, fontFamily: 'var(--body)', outline: 'none',
    transition: 'border-color 0.25s ease',
  };

  return (
    <section id="contact">
      <div className="wrap">
        {/* Heading */}
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 52, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.1em', color: 'rgba(242,236,209,0.4)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ width: 18, height: 1, background: CREAM, opacity: 0.3, display: 'inline-block' }} />
            Get In Touch
            <span style={{ width: 18, height: 1, background: CREAM, opacity: 0.3, display: 'inline-block' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(28px,4vw,50px)', color: CREAM, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Let's build something together.
          </h2>
          <p style={{ color: 'rgba(242,236,209,0.55)', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
            Async-first. Usually responds in under 2 hours.
          </p>
        </div>

        <div ref={formRef} className={`reveal ${formIn ? 'in-view' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 52 }} id="contact-grid">

          {/* Form */}
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input style={input} placeholder="Your name" required
                onFocus={e => e.target.style.borderColor = 'rgba(242,236,209,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.15)'}
              />
              <input style={input} type="email" placeholder="Your email" required
                onFocus={e => e.target.style.borderColor = 'rgba(242,236,209,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.15)'}
              />
            </div>
            <select style={{ ...input, color: 'rgba(242,236,209,0.6)' }}
              onFocus={e => e.target.style.borderColor = 'rgba(242,236,209,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.15)'}
            >
              <option>Budget: under $500</option>
              <option>Budget: $500 – $1,500</option>
              <option>Budget: $1,500+</option>
            </select>
            <textarea style={{ ...input, minHeight: 130, resize: 'vertical' }} placeholder="Tell me about your project" required
              onFocus={e => e.target.style.borderColor = 'rgba(242,236,209,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.15)'}
            />
            <button type="submit" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 8, width: 'fit-content',
              background: CREAM, color: DARK,
              fontSize: 14.5, fontWeight: 700, border: 'none', cursor: 'pointer',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {sent ? 'Message sent ✓' : 'Send message'} {!sent && <Send size={15} />}
            </button>
          </form>

          {/* Info panel */}
          <div>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'rgba(242,236,209,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
              <a href="mailto:hello@jospeed.dev" style={{ fontSize: 17, color: CREAM, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={16} color={CREAM} /> hello@jospeed.dev
              </a>
            </div>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'rgba(242,236,209,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Response time</p>
              <p style={{ fontSize: 15, color: 'rgba(242,236,209,0.65)' }}>Usually replies within 2 hours, Mon–Sat</p>
            </div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'rgba(242,236,209,0.35)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Find me on</p>
              <div style={{ display: 'flex', gap: 16 }}>
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                    style={{ color: 'rgba(242,236,209,0.45)', transition: 'color 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = CREAM; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,236,209,0.45)'; e.currentTarget.style.transform = 'none'; }}
                  ><Icon size={20} color="currentColor" /></a>
                ))}
              </div>
            </div>

            {/* Fiverr CTA */}
            <a href="https://fiverr.com" target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 20px', borderRadius: 10,
              border: '1px solid rgba(242,236,209,0.15)',
              background: 'rgba(242,236,209,0.05)',
              transition: 'background 0.25s, border-color 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.1)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,236,209,0.05)'; e.currentTarget.style.borderColor = 'rgba(242,236,209,0.15)'; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#1DBF73', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 16, color: '#fff' }}>f</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: CREAM }}>Hire me on Fiverr</div>
                <div style={{ fontSize: 12.5, color: 'rgba(242,236,209,0.45)' }}>Direct orders welcome</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(242,236,209,0.08)', marginTop: 80, padding: '28px 0' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13.5, color: 'rgba(242,236,209,0.3)' }}>© 2026 Jospeed · Built with React & Three.js</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['About','Projects','Skills','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13.5, color: 'rgba(242,236,209,0.3)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = CREAM}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,236,209,0.3)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 800px) { #contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
