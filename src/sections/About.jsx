import { Check, MapPin, Clock, Zap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';
import profileImg from '../assets/profile.jpg';

const HIGHLIGHTS = [
  'Async-first — no calls, full clarity over text & Loom',
  'End-to-end delivery from schema design to deployed UI',
  'AI-native build process using Claude, Gemini & Groq',
];

const BADGES = [
  { icon: MapPin, label: 'Nigeria (WAT)', sub: 'UTC+1' },
  { icon: Clock, label: '< 2hr response', sub: 'Mon–Sat' },
  { icon: Zap, label: 'Async-only', sub: 'No calls' },
];

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

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 52, alignItems: 'start' }} className="about-grid">
          {/* Left — avatar card */}
          <div ref={leftRef} className={`reveal ${leftIn ? 'in-view' : ''}`}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 18,
              overflow: 'hidden',
            }}>
              {/* Avatar area */}
              <div style={{
                height: 220,
                background: 'linear-gradient(135deg, #1a1b2e 0%, #0d0e1a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Glow rings */}
                <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(99,102,241,0.15)', animation: 'ringPulse 3s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', border: '1px solid rgba(34,211,238,0.15)', animation: 'ringPulse 3s ease-in-out infinite 1s' }} />
                {/* Avatar circle */}
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--indigo), var(--cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--display)',
                  fontSize: 34,
                  fontWeight: 700,
                  color: '#fff',
                  boxShadow: '0 0 40px rgba(99,102,241,0.5)',
                  zIndex: 1,
                }}>
                  <img
                    src={profileImg}
                    alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '22px 24px' }}>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 19, marginBottom: 4 }}>Joseph Onifade</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--cyan)', marginBottom: 18 }}>@buildwithjospeed</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {BADGES.map(({ icon: Icon, label, sub }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={14} color="var(--indigo-bright)" />
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                  <a href="https://fiverr.com" target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 8, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', fontSize: 12.5, fontWeight: 600, color: 'var(--indigo-bright)' }}>
                    Fiverr
                  </a>
                  <a href="https://upwork.com" target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 8, background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', fontSize: 12.5, fontWeight: 600, color: 'var(--cyan)' }}>
                    Upwork
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div ref={rightRef} className={`reveal ${rightIn ? 'in-view' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <h3 style={{ fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.3, marginBottom: 20 }}>
              Building for clients who don't<br />compromise on quality.
            </h3>

            <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.75, marginBottom: 14 }}>
              I'm Joseph — known online as Jospeed. I build full-stack web apps, AI chatbots, and
              automation systems for founders and businesses across the US, UK, Canada, EU and UAE.
            </p>
            <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>
              My process is async-first: detailed scoping doc before any line of code, Loom walkthrough
              at every milestone, and no surprises at delivery. I operate on Nigerian time but my output
              is built for global standards.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {HIGHLIGHTS.map((h) => (
                <div key={h} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(163,230,53,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={13} color="var(--signal)" />
                  </span>
                  <span style={{ color: 'var(--text)', fontSize: 14.5 }}>{h}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(34,211,238,0.05))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, borderLeft: '3px solid var(--indigo)' }}>
              <p style={{ fontFamily: 'var(--display)', fontSize: 17, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.5 }}>
                "Ship clean, ship fast, never ship what you can't explain."
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-faint)', marginTop: 10 }}>— Joseph Onifade</p>
            </div>
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
