export default function EditorialManifesto() {
  return (
    <div
      style={{
        background: 'linear-gradient(165deg, rgba(77, 38, 34, 0.38) 0%, rgba(45, 18, 16, 0.82) 100%)',
        border: '1px solid rgba(201, 146, 42, 0.28)',
        borderRadius: 22,
        padding: 'clamp(28px, 4vw, 44px)',
        boxShadow: '0 24px 50px -12px rgba(20, 8, 7, 0.55), 0 0 20px rgba(201, 146, 42, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      {/* Header Eyebrow / Running Head */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(242, 236, 209, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: '#c9922a',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Engineering Manifesto
          </span>
        </div>

        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'rgba(242, 236, 209, 0.45)',
            letterSpacing: '0.06em',
          }}
        >
          CORE PHILOSOPHY
        </span>
      </div>

      {/* Bold Display Lead */}
      <h3
        style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(22px, 2.7vw, 32px)',
          fontWeight: 700,
          color: '#F2ECD1',
          lineHeight: 1.25,
          letterSpacing: '-0.025em',
          margin: 0,
        }}
      >
        "I build software the way architects design buildings: rock-solid foundations, zero bloat, and interfaces that feel effortless to touch."
      </h3>

      {/* Narrative Paragraphs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p
          style={{
            fontSize: 15.5,
            lineHeight: 1.72,
            color: 'rgba(242, 236, 209, 0.8)',
            margin: 0,
          }}
        >
          I’m Joseph — known online as <strong style={{ color: '#F2ECD1', fontWeight: 600 }}>Jospeed</strong>. Over the past 4+ years, I’ve partnered with startup founders, operators, and lean engineering teams across the US, UK, Canada, and Europe to turn product ambitions into living, high-converting software.
        </p>
        <p
          style={{
            fontSize: 15.5,
            lineHeight: 1.72,
            color: 'rgba(242, 236, 209, 0.8)',
            margin: 0,
          }}
        >
          I bridge the gap between rigorous full-stack development (React, Supabase, PostgreSQL) and high-leverage AI automation (n8n workflows, Vapi voice agents). When founders hire me, they get senior-level execution without agency bloat: clean schema, airtight auth rules, and tactile micro-interactions that make your product feel venture-backed from day one.
        </p>
      </div>

      {/* The 3 Non-Negotiables Pillars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          {/* Pillar 1 */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              background: 'rgba(242, 236, 209, 0.04)',
              border: '1px solid rgba(242, 236, 209, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              transition: 'border-color 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 146, 42, 0.4)';
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.07)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.1)';
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.04)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10.5,
                  color: '#c9922a',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                // ENGAGEMENT
              </span>
            </div>
            <div style={{ color: '#F2ECD1', fontSize: 14.5, fontWeight: 700, lineHeight: 1.3 }}>
              Direct Senior Access
            </div>
            <p style={{ color: 'rgba(242, 236, 209, 0.62)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
              Zero project managers, zero junior outsourcing. You collaborate directly with the engineer writing every line of code.
            </p>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              background: 'rgba(242, 236, 209, 0.04)',
              border: '1px solid rgba(242, 236, 209, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              transition: 'border-color 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 146, 42, 0.4)';
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.07)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.1)';
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.04)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10.5,
                  color: '#c9922a',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                // WORKFLOW
              </span>
            </div>
            <div style={{ color: '#F2ECD1', fontSize: 14.5, fontWeight: 700, lineHeight: 1.3 }}>
              Async Velocity
            </div>
            <p style={{ color: 'rgba(242, 236, 209, 0.62)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
              Concise daily Loom recordings, detailed GitHub pull requests, and clear milestones. High shipping velocity with zero meeting fatigue.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              background: 'rgba(242, 236, 209, 0.04)',
              border: '1px solid rgba(242, 236, 209, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              transition: 'border-color 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 146, 42, 0.4)';
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.07)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(242, 236, 209, 0.1)';
              e.currentTarget.style.background = 'rgba(242, 236, 209, 0.04)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10.5,
                  color: '#c9922a',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                // GUARANTEE
              </span>
            </div>
            <div style={{ color: '#F2ECD1', fontSize: 14.5, fontWeight: 700, lineHeight: 1.3 }}>
              100% IP & Warranty
            </div>
            <p style={{ color: 'rgba(242, 236, 209, 0.62)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
              Complete repository, environment, and domain transfer upon launch — backed by 14 days of complimentary post-launch bug warranty.
            </p>
          </div>
        </div>
      </div>

      {/* Signature Lockup */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid rgba(242, 236, 209, 0.1)',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: '#F2ECD1', fontSize: 14.5 }}>
          "Ship clean, ship fast, and never ship code you can't explain."
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: '#c9922a',
            letterSpacing: '0.06em',
          }}
        >
          — JOSEPH ONIFADE
        </div>
      </div>
    </div>
  );
}
