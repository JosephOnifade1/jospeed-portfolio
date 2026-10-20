import { useState, useEffect } from 'react';
import { Check, Clock, Zap, Shield, Sun, Moon, Copy, ArrowUpRight, Sparkles, Workflow, Terminal } from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useTactileTilt } from '../hooks/useTactileTilt.js';
import { playTactileClick } from '../utils/audioHaptics.js';

const HIGHLIGHTS = [
  'Async-first — no calls, full clarity over text & Loom',
  'End-to-end delivery from schema design to deployed UI',
  'AI-native build process using Claude, Gemini & Groq',
];

function EngineerHardwareBadge() {
  const { cardRef, onMouseMove, onMouseLeave } = useTactileTilt({ maxTilt: 5, scale: 1.015 });
  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [hourOfDay, setHourOfDay] = useState(12);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        const parts = formatter.formatToParts(now);
        const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
        setTimeStr(formatter.format(now));
        setHourOfDay(hour);
      } catch {
        setTimeStr('WAT (UTC+1)');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    playTactileClick('pop');
    navigator.clipboard.writeText('josephonifade21@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const isNight = hourOfDay < 6 || hourOfDay >= 21;
  const statusLabel =
    hourOfDay >= 8 && hourOfDay < 18
      ? 'CORE LAB'
      : hourOfDay >= 18 && hourOfDay < 24
      ? 'NIGHT DEEP-WORK'
      : 'ASYNC STANDBY';

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        background: 'linear-gradient(165deg, rgba(77, 38, 34, 0.55) 0%, rgba(45, 18, 16, 0.92) 100%)',
        border: '1px solid rgba(201, 146, 42, 0.35)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 20px 45px -10px rgba(20, 8, 7, 0.65), 0 0 20px rgba(201, 146, 42, 0.08)',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Specular sheen overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle 260px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201, 146, 42, 0.16), transparent 75%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Lanyard Clip Slot Accent */}
      <div
        style={{
          width: 52,
          height: 5,
          borderRadius: 999,
          background: 'rgba(242, 236, 209, 0.18)',
          border: '1px solid rgba(242, 236, 209, 0.25)',
          margin: '12px auto 0 auto',
        }}
      />

      {/* Hardware Badge Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px 8px 18px',
          borderBottom: '1px solid rgba(242, 236, 209, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Shield size={12} color="#c9922a" />
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              color: '#c9922a',
              fontWeight: 700,
            }}
          >
            ENG-ID // JO-07
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(201, 146, 42, 0.12)',
            border: '1px solid rgba(201, 146, 42, 0.35)',
            padding: '3px 8px',
            borderRadius: 999,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#5cd65c',
              boxShadow: '0 0 8px #5cd65c',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#F2ECD1',
            }}
          >
            ACTIVE
          </span>
        </div>
      </div>

      {/* Avatar & Info Section */}
      <div
        style={{
          padding: '22px 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          background: 'radial-gradient(circle at 50% 25%, rgba(201, 146, 42, 0.1), transparent 70%)',
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(242, 236, 209, 0.15) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        />

        {/* Profile Avatar with metallic bezel ring */}
        <div
          style={{
            position: 'relative',
            width: 104,
            height: 104,
            borderRadius: '50%',
            padding: 3,
            background: 'linear-gradient(145deg, #c9922a, rgba(77, 38, 34, 0.8), #F2ECD1)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
            marginBottom: 14,
            zIndex: 1,
          }}
        >
          <img
            src="/profile.jpg"
            alt="Joseph Onifade"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              background: '#3a1a17',
            }}
          />
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#3a1a17',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--display)',
              fontSize: 32,
              fontWeight: 800,
              color: '#F2ECD1',
              letterSpacing: '-0.02em',
            }}
          >
            JO
          </div>
        </div>

        {/* Name & Title */}
        <div
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 800,
            fontSize: 22,
            color: '#F2ECD1',
            letterSpacing: '-0.02em',
            marginBottom: 3,
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          Joseph Onifade
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: '#c9922a',
            letterSpacing: '0.04em',
            marginBottom: 14,
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          @Jospeed7 • Systems & AI Architect
        </div>

        {/* Holographic Clearance Foil Accent */}
        <div
          style={{
            width: '100%',
            height: 2,
            background:
              'linear-gradient(90deg, transparent, rgba(201, 146, 42, 0.6), rgba(242, 236, 209, 0.8), rgba(201, 146, 42, 0.6), transparent)',
            opacity: 0.65,
            marginBottom: 16,
          }}
        />

        {/* Live Telemetry Display Board */}
        <div
          style={{
            width: '100%',
            background: 'rgba(36, 16, 14, 0.85)',
            border: '1px solid rgba(242, 236, 209, 0.12)',
            borderRadius: 12,
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            zIndex: 1,
          }}
        >
          {/* Telemetry Row 1: Real-time WAT Clock */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {isNight ? <Moon size={14} color="#c9922a" /> : <Sun size={14} color="#e8b84b" />}
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(242, 236, 209, 0.65)' }}>
                WAT (UTC+1)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#F2ECD1',
                  letterSpacing: '0.05em',
                }}
              >
                {timeStr || '12:00:00'}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontFamily: 'var(--mono)',
                  background: 'rgba(201, 146, 42, 0.2)',
                  color: '#e8b84b',
                  padding: '2px 5px',
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(242, 236, 209, 0.08)' }} />

          {/* Telemetry Row 2: Async SLA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Clock size={14} color="#c9922a" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(242, 236, 209, 0.65)' }}>
                Response SLA
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 600,
                color: '#F2ECD1',
              }}
            >
              &lt; 2hr (Mon–Sat)
            </span>
          </div>

          <div style={{ height: 1, background: 'rgba(242, 236, 209, 0.08)' }} />

          {/* Telemetry Row 3: Protocol */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Zap size={14} color="#c9922a" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(242, 236, 209, 0.65)' }}>
                Protocol
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 600,
                color: '#F2ECD1',
              }}
            >
              100% Async / Loom
            </span>
          </div>
        </div>

        {/* Quick Email Copy Chip */}
        <button
          onClick={handleCopyEmail}
          title="Click to copy email"
          style={{
            width: '100%',
            marginTop: 14,
            padding: '10px 14px',
            borderRadius: 10,
            background: copied ? 'rgba(92, 214, 92, 0.15)' : 'rgba(242, 236, 209, 0.07)',
            border: `1px solid ${copied ? 'rgba(92, 214, 92, 0.45)' : 'rgba(201, 146, 42, 0.35)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(201, 146, 42, 0.18)';
              e.currentTarget.style.borderColor = '#c9922a';
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.07)';
              e.currentTarget.style.borderColor = 'rgba(201, 146, 42, 0.35)';
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: '#F2ECD1' }}>
              josephonifade21@gmail.com
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {copied ? (
              <>
                <Check size={12} color="#5cd65c" />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: '#5cd65c', fontWeight: 700 }}>
                  COPIED
                </span>
              </>
            ) : (
              <>
                <Copy size={12} color="#c9922a" />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: '#c9922a', fontWeight: 600 }}>
                  COPY
                </span>
              </>
            )}
          </div>
        </button>

        {/* Channel Links */}
        <div style={{ display: 'flex', width: '100%', gap: 8, marginTop: 10, zIndex: 1 }}>
          <a
            href="https://github.com/JosephOnifade1"
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '8px 0',
              borderRadius: 8,
              background: 'rgba(242, 236, 209, 0.05)',
              border: '1px solid rgba(242, 236, 209, 0.15)',
              fontSize: 11.5,
              fontWeight: 600,
              fontFamily: 'var(--mono)',
              color: 'rgba(242, 236, 209, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 146, 42, 0.15)';
              e.currentTarget.style.borderColor = '#c9922a';
              e.currentTarget.style.color = '#F2ECD1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.15)';
              e.currentTarget.style.color = 'rgba(242, 236, 209, 0.85)';
            }}
          >
            <GithubIcon size={13} color="currentColor" /> GitHub
          </a>
          <a
            href="https://upwork.com"
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '8px 0',
              borderRadius: 8,
              background: 'rgba(242, 236, 209, 0.05)',
              border: '1px solid rgba(242, 236, 209, 0.15)',
              fontSize: 11.5,
              fontWeight: 600,
              fontFamily: 'var(--mono)',
              color: 'rgba(242, 236, 209, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 146, 42, 0.15)';
              e.currentTarget.style.borderColor = '#c9922a';
              e.currentTarget.style.color = '#F2ECD1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.15)';
              e.currentTarget.style.color = 'rgba(242, 236, 209, 0.85)';
            }}
          >
            Upwork <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

function OperatingProtocolDeck() {
  const [activeTab, setActiveTab] = useState('thesis');

  const tabs = [
    { id: 'thesis', label: '01. Philosophy', icon: Sparkles },
    { id: 'pipeline', label: '02. Delivery Pipeline', icon: Workflow },
    { id: 'radar', label: '03. Tech Radar', icon: Terminal },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(165deg, rgba(77, 38, 34, 0.45) 0%, rgba(45, 18, 16, 0.88) 100%)',
        border: '1px solid rgba(201, 146, 42, 0.3)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 20px 45px -10px rgba(20, 8, 7, 0.55)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Tab Controls Bar */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(242, 236, 209, 0.12)',
          background: 'rgba(36, 16, 14, 0.85)',
          padding: '8px 10px',
          gap: 6,
          flexWrap: 'wrap',
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playTactileClick('light');
                setActiveTab(tab.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '9px 15px',
                borderRadius: 8,
                background: isActive ? '#F2ECD1' : 'transparent',
                color: isActive ? '#4D2622' : 'rgba(242, 236, 209, 0.75)',
                border: `1px solid ${isActive ? '#F2ECD1' : 'transparent'}`,
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(242, 236, 209, 0.08)';
                  e.currentTarget.style.color = '#F2ECD1';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(242, 236, 209, 0.75)';
                }
              }}
            >
              <Icon size={13} color={isActive ? '#4D2622' : '#c9922a'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div style={{ padding: '26px 28px' }}>
        {activeTab === 'thesis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontWeight: 800,
                  color: '#F2ECD1',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  marginBottom: 12,
                }}
              >
                Building for founders who don't compromise on quality.
              </h3>
              <p style={{ color: 'rgba(242, 236, 209, 0.75)', fontSize: 15, lineHeight: 1.7, marginBottom: 10 }}>
                I'm Joseph — known online as Jospeed. I build high-conviction web applications, AI chatbots,
                and autonomous backend pipelines for founders across the US, UK, Canada, EU, and UAE.
              </p>
              <p style={{ color: 'rgba(242, 236, 209, 0.75)', fontSize: 15, lineHeight: 1.7 }}>
                Clients hire me when they want agency-grade architecture without the agency tax: no junior developers,
                no 5-person account management overhead, and zero meeting fatigue.
              </p>
            </div>

            {/* The 3 Non-Negotiables */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 4 }}>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  padding: '12px 16px',
                  background: 'rgba(242, 236, 209, 0.05)',
                  border: '1px solid rgba(242, 236, 209, 0.1)',
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(201, 146, 42, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Check size={13} color="#c9922a" />
                </span>
                <div>
                  <div style={{ color: '#F2ECD1', fontSize: 14, fontWeight: 700, marginBottom: 2 }}>
                    Zero Meeting Fatigue (Async-First)
                  </div>
                  <div style={{ color: 'rgba(242, 236, 209, 0.65)', fontSize: 13, lineHeight: 1.55 }}>
                    Clear Notion scoping docs and concise Loom screen walkthroughs at every milestone. Never waste 45 minutes on what takes a 90-second recording.
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  padding: '12px 16px',
                  background: 'rgba(242, 236, 209, 0.05)',
                  border: '1px solid rgba(242, 236, 209, 0.1)',
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(201, 146, 42, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Check size={13} color="#c9922a" />
                </span>
                <div>
                  <div style={{ color: '#F2ECD1', fontSize: 14, fontWeight: 700, marginBottom: 2 }}>
                    Single-Architect Ownership (No Hand-Offs)
                  </div>
                  <div style={{ color: 'rgba(242, 236, 209, 0.65)', fontSize: 13, lineHeight: 1.55 }}>
                    The same engineer architecting your PostgreSQL schemas and auth rules is writing your frontend and debugging production. Zero junior outsourcing.
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  padding: '12px 16px',
                  background: 'rgba(242, 236, 209, 0.05)',
                  border: '1px solid rgba(242, 236, 209, 0.1)',
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(201, 146, 42, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Check size={13} color="#c9922a" />
                </span>
                <div>
                  <div style={{ color: '#F2ECD1', fontSize: 14, fontWeight: 700, marginBottom: 2 }}>
                    AI-Native Delivery (3x Velocity)
                  </div>
                  <div style={{ color: 'rgba(242, 236, 209, 0.65)', fontSize: 13, lineHeight: 1.55 }}>
                    Leveraging modern LLM toolchains (Claude 3.5 Sonnet, Cursor, Groq) to compress 2 months of traditional agency turnaround into 2–3 weeks of focused build.
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Pill */}
            <div
              style={{
                padding: '14px 18px',
                background: 'rgba(36, 16, 14, 0.7)',
                border: '1px solid rgba(201, 146, 42, 0.25)',
                borderLeft: '3px solid #c9922a',
                borderRadius: 10,
                marginTop: 4,
              }}
            >
              <p style={{ fontFamily: 'var(--display)', fontSize: 15, fontStyle: 'italic', color: '#F2ECD1', lineHeight: 1.45 }}>
                "Ship clean, ship fast, never ship what you can't explain."
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', marginTop: 6 }}>
                — Joseph Onifade
              </p>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', letterSpacing: '0.08em', marginBottom: 4 }}>
                // DELIVERY PIPELINE
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 800, color: '#F2ECD1', marginBottom: 6 }}>
                From Concept to Production in 3 Predictable Stages
              </h3>
              <p style={{ color: 'rgba(242, 236, 209, 0.65)', fontSize: 14, lineHeight: 1.6 }}>
                Every engagement follows an explicit engineering playbook. No ambiguous invoices, no scope creep, and zero radio silence.
              </p>
            </div>

            {/* Stages Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Stage 1 */}
              <div
                style={{
                  padding: '16px 18px',
                  background: 'rgba(36, 16, 14, 0.7)',
                  border: '1px solid rgba(242, 236, 209, 0.1)',
                  borderRadius: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', fontWeight: 800 }}>
                      STAGE 01
                    </span>
                    <span style={{ color: '#F2ECD1', fontWeight: 700, fontSize: 15 }}>
                      Architecture & Schema Spec
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      background: 'rgba(201, 146, 42, 0.15)',
                      color: '#e8b84b',
                      padding: '2px 7px',
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    DAY 1–2
                  </span>
                </div>
                <p style={{ color: 'rgba(242, 236, 209, 0.65)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  We lock down database schemas (Postgres/Supabase), API routes, third-party integrations, and edge cases in a single technical document with a Loom walkthrough. Zero code is written until the blueprint is approved.
                </p>
              </div>

              {/* Stage 2 */}
              <div
                style={{
                  padding: '16px 18px',
                  background: 'rgba(36, 16, 14, 0.7)',
                  border: '1px solid rgba(242, 236, 209, 0.1)',
                  borderRadius: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', fontWeight: 800 }}>
                      STAGE 02
                    </span>
                    <span style={{ color: '#F2ECD1', fontWeight: 700, fontSize: 15 }}>
                      Rapid Build & Milestone Demos
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      background: 'rgba(201, 146, 42, 0.15)',
                      color: '#e8b84b',
                      padding: '2px 7px',
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    WEEK 1–2
                  </span>
                </div>
                <p style={{ color: 'rgba(242, 236, 209, 0.65)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  Frontend components and backend pipelines are constructed iteratively. You receive private staging preview links and async video demos at each checkpoint so you can test live progress in your own browser.
                </p>
              </div>

              {/* Stage 3 */}
              <div
                style={{
                  padding: '16px 18px',
                  background: 'rgba(36, 16, 14, 0.7)',
                  border: '1px solid rgba(201, 146, 42, 0.35)',
                  borderRadius: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', fontWeight: 800 }}>
                      STAGE 03
                    </span>
                    <span style={{ color: '#F2ECD1', fontWeight: 700, fontSize: 15 }}>
                      Production Launch & 14-Day Warranty
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      background: 'rgba(92, 214, 92, 0.15)',
                      color: '#5cd65c',
                      padding: '2px 7px',
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    WEEK 3 & BEYOND
                  </span>
                </div>
                <p style={{ color: 'rgba(242, 236, 209, 0.65)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  We deploy to your production domain, transfer 100% repository and environment ownership, and supply an operational handoff guide. Every project includes 14 days of post-launch bug warranty at zero extra cost.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'radar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#c9922a', letterSpacing: '0.08em', marginBottom: 4 }}>
                // ENGINEER TOOLCHAIN
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 800, color: '#F2ECD1', marginBottom: 6 }}>
                The Modern Tech Radar
              </h3>
              <p style={{ color: 'rgba(242, 236, 209, 0.65)', fontSize: 14, lineHeight: 1.6 }}>
                Production-tested frameworks, low-latency AI models, and resilient databases chosen for speed and maintainability.
              </p>
            </div>

            {/* Terminal Block */}
            <div
              style={{
                background: '#140807',
                border: '1px solid rgba(242, 236, 209, 0.15)',
                borderRadius: 12,
                overflow: 'hidden',
                fontFamily: 'var(--mono)',
                fontSize: 12,
              }}
            >
              {/* Terminal Title Bar */}
              <div
                style={{
                  background: 'rgba(77, 38, 34, 0.65)',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  borderBottom: '1px solid rgba(242, 236, 209, 0.1)',
                }}
              >
                <div style={{ display: 'flex', gap: 5 }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#c0392b' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#c9922a' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#27ae60' }} />
                </div>
                <span style={{ color: 'rgba(242, 236, 209, 0.6)', fontSize: 11 }}>
                  jospeed@station: ~/stack-radar
                </span>
              </div>

              {/* Terminal Content */}
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ color: '#e8b84b', fontWeight: 700, marginBottom: 5 }}>
                    &gt; AI & INFERENCE ENGINES
                  </div>
                  <div style={{ color: 'rgba(242, 236, 209, 0.75)', lineHeight: 1.65, paddingLeft: 12 }}>
                    • Claude 3.5 Sonnet (System Architecture & Complex Reasoning)<br />
                    • Gemini 1.5 Flash (Structured Scraper Pipelines & High-Token Context)<br />
                    • Groq Cloud Llama-3.3 (Sub-300ms Low-Latency Bot APIs)
                  </div>
                </div>

                <div>
                  <div style={{ color: '#e8b84b', fontWeight: 700, marginBottom: 5 }}>
                    &gt; CLIENT & WEB INTERFACE
                  </div>
                  <div style={{ color: 'rgba(242, 236, 209, 0.75)', lineHeight: 1.65, paddingLeft: 12 }}>
                    • React 19, TypeScript, Vite, CSS-in-JS, 3D Canvas / Transforms<br />
                    • Mobile-first Progressive Web Apps (PWAs) & Responsive Layouts
                  </div>
                </div>

                <div>
                  <div style={{ color: '#e8b84b', fontWeight: 700, marginBottom: 5 }}>
                    &gt; DATA, AUTH & AUTOMATION
                  </div>
                  <div style={{ color: 'rgba(242, 236, 209, 0.75)', lineHeight: 1.65, paddingLeft: 12 }}>
                    • PostgreSQL, Supabase Row-Level Security (RLS), Realtime WebSockets<br />
                    • Self-Hosted n8n, Twilio Voice/SMS, Paystack Multi-Gateway Routing
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  const [headRef, headIn] = useReveal();
  const [leftRef, leftIn] = useReveal(0.15);
  const [rightRef, rightIn] = useReveal(0.15);

  return (
    <section id="about" style={{ paddingBottom: 80 }}>
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 52 }}>
          <div className="eyebrow">// About me</div>
          <h2 className={`section-heading ${headIn ? 'in-view' : ''}`}>
            The person behind the code.
            <span className="rule" />
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 52, alignItems: 'start' }} className="about-grid">
          {/* Left — Hardware ID / Telemetry Dossier */}
          <div ref={leftRef} className={`reveal ${leftIn ? 'in-view' : ''}`}>
            <EngineerHardwareBadge />
          </div>

          {/* Right — Operating Protocol Switcher */}
          <div ref={rightRef} className={`reveal ${rightIn ? 'in-view' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <OperatingProtocolDeck />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ringPulse { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.06); opacity: 1; } }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
