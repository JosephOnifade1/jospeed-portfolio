import { useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from './BrandIcons.jsx';
import { Mail, CheckCircle2 } from 'lucide-react';

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
    handle: '/in/joseph-onifade-ol',
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

// SVG Envelope Illustration
function EnvelopeIllustration() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 120,
        height: 100,
        animation: 'floatEnvelope 6s ease-in-out infinite',
        filter: 'drop-shadow(0 8px 30px rgba(216, 243, 106, 0.35))',
      }}
    >
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="100">
        {/* Envelope body */}
        <rect x="4" y="20" width="112" height="72" rx="8" fill="#0e1810" stroke="rgba(216,243,106,0.55)" strokeWidth="1.5" />
        {/* Envelope flap */}
        <path d="M4 20 L60 58 L116 20" stroke="rgba(216,243,106,0.55)" strokeWidth="1.5" fill="none" />
        {/* Left diagonal */}
        <line x1="4" y1="92" x2="44" y2="55" stroke="rgba(216,243,106,0.2)" strokeWidth="1" />
        {/* Right diagonal */}
        <line x1="116" y1="92" x2="76" y2="55" stroke="rgba(216,243,106,0.2)" strokeWidth="1" />
        {/* Stamp */}
        <rect x="88" y="28" width="18" height="14" rx="2" fill="rgba(216,243,106,0.15)" stroke="rgba(216,243,106,0.5)" strokeWidth="1" />
        <rect x="91" y="31" width="12" height="8" rx="1" fill="rgba(216,243,106,0.3)" />
        {/* Glow line */}
        <line x1="4" y1="20" x2="60" y2="58" stroke="rgba(216,243,106,0.6)" strokeWidth="1.5" />
        <line x1="116" y1="20" x2="60" y2="58" stroke="rgba(216,243,106,0.6)" strokeWidth="1.5" />
        {/* @ symbol in envelope */}
        <text x="52" y="80" fontFamily="monospace" fontSize="14" fill="rgba(216,243,106,0.4)" fontWeight="bold">@</text>
        {/* Shadow/glow */}
        <ellipse cx="60" cy="96" rx="50" ry="5" fill="rgba(216,243,106,0.06)" />
      </svg>
    </div>
  );
}

export default function Contact() {
  const [headRef, headIn] = useReveal();
  const [formRef, formIn] = useReveal(0.1);

  const [status, setStatus] = useState('idle');
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
    background: 'rgba(10, 13, 9, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: '14px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: 14.5,
    color: '#FFFFFF',
    outline: 'none',
    transition: 'border-color 0.2s',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(80px, 9vw, 130px) 0',
        background: '#070906',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,243,106,0.055) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-layout-grid">

          {/* Left Column */}
          <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`}>
            <div className="eyebrow-tag" style={{ marginBottom: 18 }}>Let's Work Together</div>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: '#FFFFFF',
                letterSpacing: '-0.038em',
                lineHeight: 1.05,
                margin: '0 0 20px',
              }}
            >
              Got a project<br />
              <span style={{ color: 'var(--citron)' }}>or idea?</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'rgba(245, 244, 238, 0.62)',
                lineHeight: 1.72,
                margin: '0 0 40px',
                maxWidth: 420,
              }}
            >
              I'm always open to discussing new opportunities, collaborations, or just having a tech chat.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SOCIALS.map(({ Icon, href, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'rgba(216, 243, 106, 0.1)',
                      border: '1px solid rgba(216, 243, 106, 0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--citron)',
                    }}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 14,
                        color: '#FFFFFF',
                        marginBottom: 2,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11.5,
                        color: 'rgba(245, 244, 238, 0.45)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Extra socials */}
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              {EXTRA_SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(14, 18, 14, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(245, 244, 238, 0.55)',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.35)';
                    e.currentTarget.style.color = 'var(--citron)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'rgba(245, 244, 238, 0.55)';
                  }}
                >
                  <Icon size={17} color="currentColor" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div
            ref={formRef}
            className={`reveal ${formIn ? 'in-view' : ''}`}
            style={{ position: 'relative' }}
          >
            {/* Floating envelope graphic */}
            <div
              style={{
                position: 'absolute',
                top: -50,
                right: 24,
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              <EnvelopeIllustration />
            </div>

            {/* Form container */}
            <div
              style={{
                background: 'rgba(14, 18, 14, 0.78)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 24,
                padding: 'clamp(28px, 4vw, 44px)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 19,
                  color: '#FFFFFF',
                  marginBottom: 26,
                  letterSpacing: '-0.02em',
                }}
              >
                Send a Message
              </div>

              {status === 'done' ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '48px 20px',
                    color: 'var(--citron)',
                  }}
                >
                  <CheckCircle2 size={48} style={{ margin: '0 auto 18px' }} />
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#FFFFFF' }}>
                    Message Dispatched!
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(245, 244, 238, 0.65)' }}>
                    Thank you! I'll review your note and respond shortly.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-cols">
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(216, 243, 106, 0.45)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(216, 243, 106, 0.45)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                    />
                  </div>

                  <textarea
                    name="message"
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(216, 243, 106, 0.45)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                  />

                  {status === 'error' && (
                    <div style={{ color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                      Submission failed — please email josephonifade21@gmail.com directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-citron-pill"
                    style={{
                      padding: '14px 36px',
                      fontSize: 15,
                      fontWeight: 700,
                      alignSelf: 'flex-start',
                      boxShadow: '0 0 28px rgba(216, 243, 106, 0.22)',
                      border: 'none',
                      opacity: status === 'sending' ? 0.7 : 1,
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                    }}
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
        @keyframes floatEnvelope {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .contact-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        .contact-social-link {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          padding: 16px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(14, 18, 14, 0.72);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .contact-social-link:hover {
          border-color: rgba(216, 243, 106, 0.3);
          transform: translateY(-2px);
          background: rgba(18, 24, 18, 0.88);
        }
        @media (max-width: 880px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
          .form-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
