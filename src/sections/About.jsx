import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal.js';

const WHAT_I_DO = [
  {
    icon: '⬡',
    label: 'Fullstack Development',
    desc: 'React, Node.js, TypeScript, Supabase — end-to-end web applications.',
  },
  {
    icon: '◈',
    label: 'AI Engineering',
    desc: 'RAG systems, LLM integrations, AI agents, voice automation.',
  },
  {
    icon: '⬡',
    label: 'Blockchain (Learning)',
    desc: 'Solidity, Web3.js, smart contracts — actively exploring decentralized tech.',
  },
  {
    icon: '◈',
    label: '3D Creation (Blender)',
    desc: 'Blender, Three.js, 3D design — creative experiments and renders.',
  },
];

const METRICS = [
  { value: '2+', label: 'Years Learning' },
  { value: '∞', label: 'Curiosity' },
  { value: '100%', label: 'Async-First' },
];

export default function About() {
  const [headRef, headIn] = useReveal();
  const [leftRef, leftIn] = useReveal(0.1);
  const [rightRef, rightIn] = useReveal(0.1);
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
    hourOfDay >= 8 && hourOfDay < 18 ? 'Available' : hourOfDay >= 18 ? 'Deep Work' : 'Async';

  return (
    <section
      id="about"
      style={{
        padding: 'clamp(72px, 9vw, 120px) 0',
        background: 'var(--ink)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle citron ambient */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,243,106,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              color: 'var(--citron)',
              textTransform: 'uppercase',
              marginBottom: 16,
              opacity: 0.8,
            }}
          >
            About Me
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--paper)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            I'm Joseph
            <br />
            <span style={{ color: 'var(--citron)' }}>Onifade.</span>
          </h2>
        </div>

        {/* 2-col layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: 'clamp(32px, 5vw, 72px)',
            alignItems: 'start',
          }}
          className="about-cols"
        >
          {/* Left — photo + bio */}
          <div ref={leftRef} className={`reveal ${leftIn ? 'in-view' : ''}`}>
            {/* Photo card */}
            <div
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                aspectRatio: '3 / 4',
                maxHeight: 520,
                background: '#0d1010',
                border: '1px solid rgba(216,243,106,0.12)',
                marginBottom: 32,
              }}
            >
              <img
                src="/profile.jpg"
                alt="Joseph Onifade"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'grayscale(15%) contrast(1.05)',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              {/* Status pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(10,13,9,0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(216,243,106,0.25)',
                  borderRadius: 100,
                  padding: '6px 14px 6px 10px',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 6px rgba(74,222,128,0.7)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--paper)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {statusLabel} · WAT {timeStr}
                </span>
              </div>
            </div>

            {/* Metrics row */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 800,
                      fontSize: 'clamp(28px, 3.5vw, 40px)',
                      color: 'var(--citron)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'rgba(245,244,238,0.5)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginTop: 4,
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bio + what I do */}
          <div
            ref={rightRef}
            className={`reveal ${rightIn ? 'in-view' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            {/* Bio paragraph */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.6vw, 17px)',
                color: 'rgba(245,244,238,0.75)',
                lineHeight: 1.75,
                marginBottom: 36,
                marginTop: 0,
              }}
            >
              A fullstack developer and AI engineer with a passion for building intelligent,
              beautiful and useful products. I'm also exploring blockchain and 3D tools like
              Blender to expand what I can create.
            </p>

            {/* Signature */}
            <div
              style={{
                fontFamily: 'cursive, Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 42px)',
                color: 'var(--citron)',
                letterSpacing: '-0.01em',
                marginBottom: 40,
                lineHeight: 1,
              }}
            >
              JOspeed
            </div>

            {/* What I Do */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                color: 'var(--citron)',
                textTransform: 'uppercase',
                marginBottom: 20,
                opacity: 0.8,
              }}
            >
              What I Do
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {WHAT_I_DO.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '18px 0',
                    borderBottom:
                      i < WHAT_I_DO.length - 1
                        ? '1px solid rgba(245,244,238,0.07)'
                        : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'rgba(216,243,106,0.08)',
                      border: '1px solid rgba(216,243,106,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      color: 'var(--citron)',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 15,
                        color: 'var(--paper)',
                        marginBottom: 3,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13.5,
                        color: 'rgba(245,244,238,0.5)',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
