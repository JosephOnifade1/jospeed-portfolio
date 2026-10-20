import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: 'Budget: under $500',
    message: '',
    _gotcha: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const input = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(242,236,209,0.06)',
    border: '1px solid rgba(242,236,209,0.15)',
    borderRadius: 8, color: CREAM,
    fontSize: 14.5, fontFamily: 'var(--body)', outline: 'none',
    transition: 'border-color 0.25s ease',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Anti-spam honeypot
    if (formData._gotcha) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      setStatus('error');
      setErrorMessage('n8n Webhook URL is not configured yet. Please add VITE_N8N_WEBHOOK_URL to your .env file.');
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          budget: formData.budget,
          message: formData.message,
          submittedAt: new Date().toISOString(),
          source: 'jospeed-portfolio',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        budget: 'Budget: under $500',
        message: '',
        _gotcha: '',
      });
    } catch (err) {
      console.error('Failed to submit form to n8n webhook:', err);
      setStatus('error');
      setErrorMessage('Could not send message. Please try again or reach out at josephonifade21@gmail.com directly.');
    }
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

          {/* Form / Success State */}
          {status === 'success' ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '48px 32px', textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(20, 168, 0, 0.08) 0%, rgba(242, 236, 209, 0.03) 100%)',
              border: '1px solid rgba(20, 168, 0, 0.3)',
              borderRadius: 12, minHeight: 340,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(20, 168, 0, 0.15)', border: '1px solid rgba(20, 168, 0, 0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
                boxShadow: '0 0 20px rgba(20, 168, 0, 0.25)',
              }}>
                <CheckCircle size={28} color="#65d448" />
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: 22, color: CREAM, marginBottom: 8, fontWeight: 700 }}>
                Message received!
              </h3>
              <p style={{ color: 'rgba(242,236,209,0.65)', fontSize: 15, maxWidth: 380, lineHeight: 1.6, marginBottom: 24 }}>
                Thanks for reaching out! Your inquiry has been routed into my automated workflow. I'll get back to you within 2 hours.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                style={{
                  padding: '10px 22px', borderRadius: 8,
                  background: 'rgba(242,236,209,0.08)', border: '1px solid rgba(242,236,209,0.2)',
                  color: CREAM, fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(242,236,209,0.16)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(242,236,209,0.08)'}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Honeypot anti-spam field */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <input
                  style={input}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  disabled={status === 'loading'}
                  onFocus={e => e.target.style.borderColor = 'rgba(242,236,209,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.15)'}
                />
                <input
                  style={input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  disabled={status === 'loading'}
                  onFocus={e => e.target.style.borderColor = 'rgba(242,236,209,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.15)'}
                />
              </div>

              <select
                style={{ ...input, color: 'rgba(242,236,209,0.7)' }}
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={status === 'loading'}
                onFocus={e => e.target.style.borderColor = 'rgba(242,236,209,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.15)'}
              >
                <option>Budget: under $500</option>
                <option>Budget: $500 – $1,500</option>
                <option>Budget: $1,500+</option>
              </select>

              <textarea
                style={{ ...input, minHeight: 130, resize: 'vertical' }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project"
                required
                disabled={status === 'loading'}
                onFocus={e => e.target.style.borderColor = 'rgba(242,236,209,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(242,236,209,0.15)'}
              />

              {status === 'error' && (
                <div style={{
                  padding: '11px 14px', borderRadius: 8,
                  background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 8, width: 'fit-content',
                  background: CREAM, color: DARK,
                  fontSize: 14.5, fontWeight: 700, border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.75 : 1,
                  transition: 'background 0.2s, transform 0.2s, opacity 0.2s',
                }}
                onMouseEnter={e => {
                  if (status !== 'loading') {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = CREAM;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    Sending message...
                  </>
                ) : (
                  <>
                    Send message <Send size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Info panel */}
          <div>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'rgba(242,236,209,0.35)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
              <a href="mailto:josephonifade21@gmail.com" style={{ fontSize: 17, color: CREAM, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={16} color={CREAM} /> josephonifade21@gmail.com
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

            {/* Upwork CTA */}
            <a
              href="https://www.upwork.com/freelancers/~01a476791ed9f8b084?mp_source=share"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 18px',
                borderRadius: 12,
                border: '1px solid rgba(20, 168, 0, 0.3)',
                background: 'linear-gradient(135deg, rgba(20, 168, 0, 0.08) 0%, rgba(242, 236, 209, 0.03) 100%)',
                backdropFilter: 'blur(8px)',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 168, 0, 0.16) 0%, rgba(242, 236, 209, 0.06) 100%)';
                e.currentTarget.style.borderColor = 'rgba(20, 168, 0, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 28px -4px rgba(20, 168, 0, 0.25)';
                const arrow = e.currentTarget.querySelector('.upwork-cta-arrow');
                if (arrow) arrow.style.transform = 'translate(2px, -2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 168, 0, 0.08) 0%, rgba(242, 236, 209, 0.03) 100%)';
                e.currentTarget.style.borderColor = 'rgba(20, 168, 0, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.25)';
                const arrow = e.currentTarget.querySelector('.upwork-cta-arrow');
                if (arrow) arrow.style.transform = 'translate(0, 0)';
              }}
            >
              {/* Upwork Brand Badge */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #14A800 0%, #108A00 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(20, 168, 0, 0.35)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.793 0-6.16 2.477-6.852 5.097-1.282-1.92-2.022-4.249-2.091-6.115H5.852v7.194c0 2.126-1.724 3.856-3.855 3.856H0v3.832h2.247c3.856 0 6.994-3.138 6.994-6.994V7.477c.484 1.576 1.472 4.041 3.167 6.331l-2.472 11.192h3.918l1.776-8.038c1.085.715 2.37 1.146 3.731 1.146 3.792 0 6.842-3.05 6.842-6.843-.001-3.791-3.05-6.248-7.842-6.248z" />
                </svg>
              </div>

              {/* Text / Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#14A800',
                      boxShadow: '0 0 8px #14A800',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#65d448',
                      fontWeight: 700,
                    }}
                  >
                    Available for Contracts
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14.5,
                    color: CREAM,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                  }}
                >
                  Hire via Upwork
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(242,236,209,0.5)',
                    marginTop: 2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Escrow, milestones & hourly contracts
                </div>
              </div>

              {/* Action Indicator Arrow */}
              <div
                className="upwork-cta-arrow"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: 'rgba(242,236,209,0.06)',
                  border: '1px solid rgba(242,236,209,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: CREAM,
                  flexShrink: 0,
                  transition: 'transform 0.25s ease, background 0.25s ease',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
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
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
