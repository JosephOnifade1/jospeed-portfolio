import { ArrowUpRight, Check } from 'lucide-react';
import { useReveal } from '../hooks/useReveal.js';

const CREAM = '#F2ECD1';
const DARK  = '#4D2622';
const GOLD  = '#c9922a';

export default function Services() {
  const [headRef, headIn] = useReveal();
  const [gridRef, gridIn] = useReveal(0.12);

  return (
    <section id="services" style={{ padding: '90px 0' }}>
      <div className="wrap">
        {/* Section Header */}
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 48 }}>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11.5,
              letterSpacing: '0.12em',
              color: GOLD,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            // ARCHITECTURAL PRACTICES
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              color: CREAM,
              fontFamily: 'var(--display)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Software engineered for scale,<br />
            shipped without agency overhead.
          </h2>
          <p style={{ color: 'rgba(242,236,209,0.65)', fontSize: 16, maxWidth: 540, lineHeight: 1.65 }}>
            Every engagement operates with direct engineer access, explicit deliverables, and a complete handoff package upon deployment.
          </p>
        </div>

        {/* Asymmetrical Practice Layout */}
        <div
          ref={gridRef}
          className={`reveal ${gridIn ? 'in-view' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            gap: 22,
            alignItems: 'stretch',
          }}
          id="services-asymmetric-grid"
        >
          {/* Flagship Hero Practice Card */}
          <div
            style={{
              background: 'linear-gradient(165deg, rgba(77, 38, 34, 0.45) 0%, rgba(45, 18, 16, 0.85) 100%)',
              border: '1px solid rgba(201, 146, 42, 0.35)',
              borderRadius: 20,
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 45px -10px rgba(20, 8, 7, 0.55)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    color: GOLD,
                    background: 'rgba(201, 146, 42, 0.12)',
                    border: '1px solid rgba(201, 146, 42, 0.25)',
                    padding: '4px 10px',
                    borderRadius: 4,
                    fontWeight: 700,
                  }}
                >
                  FLAGSHIP PRACTICE // 7–14 DAY SPRINT
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    color: 'rgba(242,236,209,0.5)',
                  }}
                >
                  FULL PRODUCTION BUILD
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: 'clamp(22px, 2.4vw, 30px)',
                  fontWeight: 700,
                  color: CREAM,
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  marginBottom: 14,
                }}
              >
                Full-Stack SaaS & MVP Architecture
              </h3>

              <p style={{ color: 'rgba(242,236,209,0.72)', fontSize: 15, lineHeight: 1.65, marginBottom: 24 }}>
                End-to-end production development for founders who need to launch fast without accumulating technical debt. From database schema, auth policies, and payments to pixel-perfect micro-interactions.
              </p>

              {/* Concrete deliverables */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 30 }}>
                {[
                  'React 19 & TypeScript frontend with custom styling and animations',
                  'PostgreSQL on Supabase with strict Row-Level Security (RLS) rules',
                  'Authentication (OAuth, Magic Link) & Stripe / Payment Gateway wiring',
                  'Full environment setup, Vercel CI/CD, and 14-day bug warranty included',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: 'rgba(201, 146, 42, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <Check size={11} color={GOLD} />
                    </span>
                    <span style={{ fontSize: 13.5, color: 'rgba(242,236,209,0.85)', lineHeight: 1.55 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary High-Contrast Action */}
            <div style={{ paddingTop: 20, borderTop: '1px solid rgba(242,236,209,0.1)' }}>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 8,
                  background: CREAM,
                  color: DARK,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = CREAM;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Start an MVP Project <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: 2 Specialized Practices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Practice 2: AI Voice & Agents */}
            <div
              style={{
                background: 'rgba(242, 236, 209, 0.04)',
                border: '1px solid rgba(242, 236, 209, 0.1)',
                borderRadius: 18,
                padding: '28px 26px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201, 146, 42, 0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.1)')}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10.5,
                      letterSpacing: '0.08em',
                      color: GOLD,
                      fontWeight: 700,
                    }}
                  >
                    // CONVERSATIONAL AI
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(242,236,209,0.45)' }}>
                    SUB-800MS LATENCY
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: CREAM,
                    marginBottom: 10,
                  }}
                >
                  Autonomous AI Voice & Dispatch
                </h4>
                <p style={{ color: 'rgba(242,236,209,0.68)', fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                  Low-latency voice agents using Vapi and Voiceflow that answer inbound phone calls, qualify customer requirements, and automatically book appointments into your calendar 24/7.
                </p>
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(242,236,209,0.08)' }}>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: GOLD,
                    fontFamily: 'var(--mono)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  Explore voice integration <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Practice 3: Enterprise n8n Workflows */}
            <div
              style={{
                background: 'rgba(242, 236, 209, 0.04)',
                border: '1px solid rgba(242, 236, 209, 0.1)',
                borderRadius: 18,
                padding: '28px 26px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201, 146, 42, 0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.1)')}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10.5,
                      letterSpacing: '0.08em',
                      color: GOLD,
                      fontWeight: 700,
                    }}
                  >
                    // BACKEND AUTOMATION
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(242,236,209,0.45)' }}>
                    SELF-HOSTED / CLOUD
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: CREAM,
                    marginBottom: 10,
                  }}
                >
                  Enterprise n8n Workflow Pipelines
                </h4>
                <p style={{ color: 'rgba(242,236,209,0.68)', fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                  Automate manual team workflows by connecting your CRMs (HubSpot, GoHighLevel), payment gateways, WhatsApp webhooks, and database mutations — eliminating 15+ hours of manual data entry every week.
                </p>
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(242,236,209,0.08)' }}>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: GOLD,
                    fontFamily: 'var(--mono)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  Explore automation pipelines <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #services-asymmetric-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
