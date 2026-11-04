import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal.js';
import { Code2, Cpu, Box, Sparkles } from 'lucide-react';

const WHAT_I_DO = [
  {
    icon: Code2,
    label: 'Fullstack Development',
    desc: 'React, Node.js, TypeScript, Supabase — modern end-to-end web apps.',
  },
  {
    icon: Cpu,
    label: 'AI Engineering',
    desc: 'RAG pipelines, LLMs, autonomous agents, and voice workflows.',
  },
  {
    icon: Box,
    label: 'Blockchain (Learning)',
    desc: 'Solidity, Web3.js, smart contracts — decentralized exploration.',
  },
  {
    icon: Sparkles,
    label: '3D Creation (Blender)',
    desc: 'Blender modeling, procedural materials, and Three.js scenes.',
  },
];

const METRICS = [
  { value: '10+', label: 'Projects Built' },
  { value: 'Ongoing', label: 'Active Learning' },
  { value: '100%', label: 'Curiosity & Drive' },
];

export default function About() {
  const [headRef, headIn] = useReveal();
  const [leftRef, leftIn] = useReveal(0.08);
  const [rightRef, rightIn] = useReveal(0.08);
  const [timeStr, setTimeStr] = useState('');
  const [hourOfDay, setHourOfDay] = useState(12);

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        const fmt = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        const parts = fmt.formatToParts(now);
        const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
        setTimeStr(fmt.format(now));
        setHourOfDay(hour);
      } catch {
        setTimeStr('WAT');
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const statusLabel =
    hourOfDay >= 8 && hourOfDay < 18 ? 'Available for work' : hourOfDay >= 18 ? 'Deep Work' : 'Async Standby';

  return (
    <section
      id="about"
      className="about-grain-section"
      style={{
        padding: 'clamp(90px, 10vw, 150px) 0 clamp(80px, 9vw, 130px)',
        background: '#0B0E0A', // Warmer, softer near-black tone
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Soft Top Transition from Hero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, #070906 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Faint Architectural Alignment Lines (Subtle Environmental Texture) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '140px 140px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{ marginBottom: 'clamp(44px, 5.5vw, 72px)' }}
        >
          <div className="eyebrow-tag" style={{ marginBottom: 18 }}>About Me</div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(38px, 5.2vw, 72px)',
              color: '#FFFFFF',
              letterSpacing: '-0.038em',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Hi, I'm Joseph<br />
            <span style={{ color: 'var(--citron)' }}>Onifade.</span>
          </h2>
        </div>

        {/* 2-Column Main Layout */}
        <div className="about-main-grid">

          {/* ─── Left Column: Story & Expertise ─── */}
          <div ref={leftRef} className={`reveal ${leftIn ? 'in-view' : ''}`}>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 1.4vw, 18px)',
                color: 'rgba(245, 244, 238, 0.76)',
                lineHeight: 1.8,
                margin: '0 0 32px',
                maxWidth: 560,
              }}
            >
              I'm a fullstack developer and AI engineer with a passion for building intelligent,
              practical and useful digital products. I combine solid web architecture with RAG pipelines
              and autonomous agents — exploring blockchain and 3D creative tools to push what's possible.
            </p>

            {/* Signature */}
            <div
              style={{
                fontFamily: "'Dancing Script', cursive, Georgia, serif",
                fontSize: 'clamp(38px, 4vw, 54px)',
                color: 'var(--citron)',
                letterSpacing: '-0.01em',
                marginBottom: 44,
                lineHeight: 1,
                textShadow: '0 0 25px rgba(216,243,106,0.2)',
              }}
            >
              JOspeed
            </div>

            {/* What I Do - Structured Grid */}
            <div>
              <div className="eyebrow-tag" style={{ marginBottom: 20 }}>What I Do</div>
              <div className="what-i-do-grid">
                {WHAT_I_DO.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="what-i-do-card"
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: 'rgba(216, 243, 106, 0.08)',
                        border: '1px solid rgba(216, 243, 106, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--citron)',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          fontSize: 13.5,
                          color: '#FFFFFF',
                          marginBottom: 4,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 12.5,
                          color: 'rgba(245, 244, 238, 0.52)',
                          lineHeight: 1.5,
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right Column: Profile Image Placeholder Frame ───
              Note: Built as a resilient, flexible portrait container designed to easily receive
              a future high-fidelity photograph without breaking framing or aspect ratios. */}
          <div
            ref={rightRef}
            className={`reveal ${rightIn ? 'in-view' : ''}`}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            <div
              className="about-portrait-frame"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 400,
                borderRadius: 22,
                overflow: 'hidden',
                background: '#0E130D',
                border: '1px solid rgba(216, 243, 106, 0.22)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 35px rgba(216, 243, 106, 0.05)',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Joseph Onifade"
                className="about-portrait-img"
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'contrast(1.04) brightness(1.02)',
                }}
              />
              {/* Bottom Vignette */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11, 14, 10, 0.9) 0%, transparent 40%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Live Status Pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(10, 13, 9, 0.88)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(216, 243, 106, 0.22)',
                  borderRadius: 100,
                  padding: '9px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#4ade80',
                      boxShadow: '0 0 10px rgba(74, 222, 128, 0.9)',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: '#FFFFFF',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {statusLabel}
                  </span>
                </div>
                {timeStr && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'rgba(216, 243, 106, 0.85)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    WAT {timeStr}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            marginTop: 'clamp(44px, 5.5vw, 68px)',
            background: 'rgba(16, 21, 15, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 18,
            overflow: 'hidden',
          }}
          className="about-metrics-row"
        >
          {METRICS.map(({ value, label }, i) => (
            <div
              key={label}
              style={{
                padding: 'clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 28px)',
                textAlign: 'center',
                borderRight: i < METRICS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  color: 'var(--citron)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'rgba(245, 244, 238, 0.5)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .about-grain-section::before {
          content: "";
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+");
          background-repeat: repeat;
          background-size: 160px 160px;
          opacity: 0.035;
          mix-blend-mode: screen;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }

        .about-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        .what-i-do-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .what-i-do-card {
          background: rgba(16, 21, 15, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 16px 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .what-i-do-card:hover {
          border-color: rgba(216, 243, 106, 0.3);
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
          .what-i-do-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .what-i-do-grid {
            grid-template-columns: 1fr !important;
          }
          .about-metrics-row {
            grid-template-columns: 1fr !important;
          }
          .about-metrics-row > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .about-metrics-row > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
