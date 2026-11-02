import { useState, useRef } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from './BrandIcons.jsx';
import { Mail } from 'lucide-react';

const SOCIALS = [
  {
    Icon: Mail,
    href: 'mailto:josephonifade21@gmail.com',
    label: 'Email',
    handle: 'josephonifade21@gmail.com',
  },
  {
    Icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/joseph-onifade-ol',
    label: 'LinkedIn',
    handle: '/joseph-onifade-ol',
  },
  {
    Icon: GithubIcon,
    href: 'https://github.com/JosephOnifade1',
    label: 'GitHub',
    handle: '/JosephOnifade1',
  },
];

const EXTRA_SOCIALS = [
  { Icon: XIcon, href: 'https://x.com/buildwithjospeed', label: 'X / Twitter' },
  { Icon: DiscordIcon, href: 'https://discord.com/users/1278856822555414549', label: 'Discord' },
];

export default function Contact() {
  const [headRef, headIn] = useReveal();
  const [formRef, formIn] = useReveal(0.1);

  const formRef2 = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xpwzrpdb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('done');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(245,244,238,0.1)',
    borderRadius: 10,
    padding: '14px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    color: 'var(--paper)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(80px, 10vw, 140px) 0',
        background: 'var(--ink)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large ambient citron glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,243,106,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left — CTA text */}
          <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.16em',
                color: 'var(--citron)',
                textTransform: 'uppercase',
                marginBottom: 14,
                opacity: 0.8,
              }}
            >
              Let's Work Together
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 4.5vw, 58px)',
                color: 'var(--paper)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: '0 0 20px',
              }}
            >
              Got a project
              <br />
              <span style={{ color: 'var(--citron)' }}>or idea?</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'rgba(245,244,238,0.55)',
                lineHeight: 1.7,
                margin: '0 0 40px',
                maxWidth: 400,
              }}
            >
              I'm always open to discussing new opportunities, collaborations, or just having a
              tech chat.
            </p>

            {/* Direct contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {SOCIALS.map(({ Icon, href, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    textDecoration: 'none',
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: '1px solid rgba(245,244,238,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(216,243,106,0.3)';
                    e.currentTarget.style.background = 'rgba(216,243,106,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245,244,238,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'rgba(216,243,106,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={17} color="var(--citron)" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 14,
                        color: 'var(--paper)',
                        marginBottom: 1,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11.5,
                        color: 'rgba(245,244,238,0.4)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Extra socials row */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {EXTRA_SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    border: '1px solid rgba(245,244,238,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(216,243,106,0.35)';
                    e.currentTarget.style.background = 'rgba(216,243,106,0.07)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245,244,238,0.1)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon size={17} color="rgba(245,244,238,0.6)" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — message form */}
          <div
            ref={formRef}
            className={`reveal ${formIn ? 'in-view' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(245,244,238,0.08)',
                borderRadius: 20,
                padding: 'clamp(28px, 4vw, 40px)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 18,
                  color: 'var(--paper)',
                  marginBottom: 24,
                }}
              >
                Send a Message →
              </div>

              {status === 'done' ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    color: 'var(--citron)',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  ✓ Message sent! I'll get back to you soon.
                </div>
              ) : (
                <form ref={formRef2} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-2col">
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(216,243,106,0.4)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(245,244,238,0.1)'; }}
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(216,243,106,0.4)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(245,244,238,0.1)'; }}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project or idea..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(216,243,106,0.4)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(245,244,238,0.1)'; }}
                  />
                  {status === 'error' && (
                    <p style={{ color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: 12, margin: 0 }}>
                      Something went wrong. Try emailing directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background: status === 'sending' ? 'rgba(216,243,106,0.5)' : 'var(--citron)',
                      color: 'var(--ink)',
                      border: 'none',
                      borderRadius: 100,
                      padding: '15px 32px',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      transition: 'opacity 0.2s, transform 0.15s',
                      letterSpacing: '-0.01em',
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
