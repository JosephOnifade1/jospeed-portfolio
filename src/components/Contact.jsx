import { useState } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import { GithubIcon, LinkedinIcon, XIcon, DiscordIcon } from './BrandIcons.jsx';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

const SOCIALS = [
  {
    Icon: Mail,
    href: 'mailto:josephonifade21@gmail.com',
    label: 'Direct Email',
    handle: 'josephonifade21@gmail.com',
    note: 'Response within 24h',
  },
  {
    Icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/joseph-onifade-ol',
    label: 'LinkedIn',
    handle: '/in/joseph-onifade-ol',
    note: 'Professional network',
  },
  {
    Icon: GithubIcon,
    href: 'https://github.com/JosephOnifade1',
    label: 'GitHub',
    handle: '/JosephOnifade1',
    note: 'Code repositories & PRs',
  },
];

const EXTRA_SOCIALS = [
  { Icon: XIcon, href: 'https://x.com/buildwithjospeed', label: 'X (Twitter)' },
  { Icon: DiscordIcon, href: 'https://discord.com/users/1278856822555414549', label: 'Discord' },
];

export default function Contact() {
  const [headRef, headIn] = useReveal();
  const [formRef, formIn] = useReveal(0.08);

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
    background: 'rgba(10, 14, 10, 0.72)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: '14px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: 14.5,
    color: '#FFFFFF',
    outline: 'none',
    transition: 'all 0.2s ease',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(90px, 10vw, 140px) 0 clamp(80px, 8vw, 120px)',
        background: '#080A07', // Grounded arrival dark tone — visual destination leading into footer
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Subtle arrival ambient aura */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          height: 380,
          background: 'radial-gradient(ellipse at bottom, rgba(216, 243, 106, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-layout-grid">

          {/* Left Column: Direct Invitation & Verified Channels */}
          <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`}>
            {/* Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(216, 243, 106, 0.08)',
                border: '1px solid rgba(216, 243, 106, 0.25)',
                padding: '6px 14px',
                borderRadius: 100,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--citron)',
                  boxShadow: '0 0 10px var(--citron)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--citron)',
                  textTransform: 'uppercase',
                }}
              >
                Available for New Work & Roles
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 4.8vw, 64px)',
                color: '#FFFFFF',
                letterSpacing: '-0.038em',
                lineHeight: 1.06,
                margin: '0 0 18px',
              }}
            >
              Let's build<br />
              <span style={{ color: 'var(--citron)' }}>something real.</span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'rgba(245, 244, 238, 0.65)',
                lineHeight: 1.72,
                margin: '0 0 36px',
                maxWidth: 440,
              }}
            >
              Whether you need to ship a production AI workflow, architect a modern web application, or discuss high-impact technical initiatives — my inbox is open.
            </p>

            {/* Direct Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {SOCIALS.map(({ Icon, href, label, handle, note }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="contact-channel-row"
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: 'rgba(216, 243, 106, 0.08)',
                      border: '1px solid rgba(216, 243, 106, 0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--citron)',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          fontSize: 14.5,
                          color: '#FFFFFF',
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10.5,
                          color: 'rgba(245, 244, 238, 0.35)',
                        }}
                      >
                        {note}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        color: 'rgba(245, 244, 238, 0.55)',
                        letterSpacing: '0.01em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Extra Networks & Base Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 16,
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div style={{ display: 'flex', gap: 10 }}>
                {EXTRA_SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    className="extra-social-pill"
                  >
                    <Icon size={16} color="currentColor" />
                  </a>
                ))}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'rgba(245, 244, 238, 0.38)',
                  letterSpacing: '0.04em',
                }}
              >
                LOC: LAGOS, NG · WAT (UTC+1)
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Container (No cartoon graphics) */}
          <div
            ref={formRef}
            className={`reveal ${formIn ? 'in-view' : ''}`}
            style={{ position: 'relative' }}
          >
            <div className="contact-form-card">
              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                  paddingBottom: 16,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                      marginBottom: 3,
                    }}
                  >
                    Direct Dispatch
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'rgba(245, 244, 238, 0.42)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    MESSAGING GATEWAY // FORMSPREE ENCRYPTED
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10.5,
                    color: 'var(--citron)',
                    background: 'rgba(216, 243, 106, 0.08)',
                    border: '1px solid rgba(216, 243, 106, 0.25)',
                    padding: '3px 9px',
                    borderRadius: 6,
                  }}
                >
                  24H SLA
                </div>
              </div>

              {status === 'done' ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '48px 20px',
                    color: 'var(--citron)',
                  }}
                >
                  <CheckCircle2 size={46} style={{ margin: '0 auto 16px' }} />
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#FFFFFF' }}>
                    Message Dispatched Successfully
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(245, 244, 238, 0.65)', maxWidth: 360, margin: '0 auto' }}>
                    Thank you. Your message has reached Joseph Onifade. You will receive a response shortly.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-cols">
                    <div>
                      <label
                        htmlFor="name"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'rgba(245, 244, 238, 0.5)',
                          marginBottom: 6,
                          letterSpacing: '0.03em',
                        }}
                      >
                        YOUR NAME
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(216, 243, 106, 0.55)';
                          e.target.style.background = 'rgba(14, 20, 14, 0.9)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.background = 'rgba(10, 14, 10, 0.72)';
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'rgba(245, 244, 238, 0.5)',
                          marginBottom: 6,
                          letterSpacing: '0.03em',
                        }}
                      >
                        EMAIL ADDRESS
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(216, 243, 106, 0.55)';
                          e.target.style.background = 'rgba(14, 20, 14, 0.9)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.target.style.background = 'rgba(10, 14, 10, 0.72)';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'rgba(245, 244, 238, 0.5)',
                        marginBottom: 6,
                        letterSpacing: '0.03em',
                      }}
                    >
                      PROJECT SCOPE / MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Outline your project scope, timeline, engineering requirements, or open roles..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(216, 243, 106, 0.55)';
                        e.target.style.background = 'rgba(14, 20, 14, 0.9)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.background = 'rgba(10, 14, 10, 0.72)';
                      }}
                    />
                  </div>

                  {status === 'error' && (
                    <div style={{ color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                      Dispatch error — please write directly to josephonifade21@gmail.com.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-citron-pill"
                    style={{
                      padding: '14px 34px',
                      fontSize: 14.5,
                      fontWeight: 700,
                      alignSelf: 'flex-start',
                      boxShadow: '0 0 28px rgba(216, 243, 106, 0.2)',
                      border: 'none',
                      opacity: status === 'sending' ? 0.7 : 1,
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    {status === 'sending' ? 'Transmitting...' : 'Send Message'} <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(40px, 6vw, 84px);
          align-items: start;
        }
        .contact-channel-row {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          padding: 16px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(14, 20, 14, 0.65);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .contact-channel-row:hover {
          border-color: rgba(216, 243, 106, 0.32);
          transform: translateY(-2px);
          background: rgba(18, 26, 18, 0.88);
        }
        .contact-form-card {
          background: rgba(13, 18, 13, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 22px;
          padding: clamp(26px, 3.8vw, 42px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
          position: relative;
        }
        .extra-social-pill {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(14, 20, 14, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(245, 244, 238, 0.55);
          transition: all 0.2s;
          text-decoration: none;
        }
        .extra-social-pill:hover {
          border-color: rgba(216, 243, 106, 0.35);
          color: var(--citron);
          background: rgba(216, 243, 106, 0.08);
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
