import EditorialManifesto from '../components/EditorialManifesto.jsx';
import FlowerBorder from '../components/originkit/ui/flower-border.tsx';
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


export default function About() {
  const [headRef, headIn] = useReveal();
  const [leftRef, leftIn] = useReveal(0.15);
  const [rightRef, rightIn] = useReveal(0.15);

  return (
    <section id="about" style={{ position: 'relative', overflow: 'hidden', paddingBottom: 80 }}>
      {/* Flower Border Background Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.45,
        }}
        aria-hidden="true"
      >
        <FlowerBorder
          sides={{ top: false, bottom: false, left: true, right: true }}
          petal="#632f2b"
          line="#2a100e"
          heart="#c9922a"
          flowers={7}
          petals={6}
          size={11}
          spread={92}
          sway={10}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            minWidth: 0,
            minHeight: 0,
          }}
        />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
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
            <EditorialManifesto />
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
