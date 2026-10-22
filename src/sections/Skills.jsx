import { useReveal } from '../hooks/useReveal.js';
import GitHubStats from '../components/GitHubStats.jsx';

const DARK = '#4D2622';
const GOLD = '#c9922a';

const STACK_GROUPS = [
  {
    title: 'Frontend & UI Systems',
    badge: 'CLIENT LAYER',
    desc: 'Type-safe, component-driven interfaces built for performance and micro-animations.',
    skills: [
      { name: 'React 19', tag: 'Core' },
      { name: 'TypeScript', tag: 'Type-Safe' },
      { name: 'Next.js', tag: 'SSR / SSG' },
      { name: 'Three.js', tag: '3D Canvas' },
      { name: 'Tailwind / CSS-in-JS', tag: 'Design Tokens' },
    ],
  },
  {
    title: 'Backend & Data Architecture',
    badge: 'DATA & AUTH',
    desc: 'Relational databases, airtight authentication policies, and resilient serverless APIs.',
    skills: [
      { name: 'Supabase', tag: 'Primary BaaS' },
      { name: 'PostgreSQL', tag: 'Relational Schema' },
      { name: 'Row-Level Security', tag: 'Auth & RLS' },
      { name: 'Node.js / Express', tag: 'API Engine' },
      { name: 'Redis', tag: 'Cache & Queue' },
    ],
  },
  {
    title: 'Conversational AI & Voice',
    badge: 'AUTONOMOUS AGENTS',
    desc: 'Low-latency voice agents and structured LLM toolchains integrated into business workflows.',
    skills: [
      { name: 'Vapi Voice AI', tag: 'Sub-800ms' },
      { name: 'Voiceflow', tag: 'Dialog Trees' },
      { name: 'Claude 3.5 Sonnet', tag: 'Reasoning' },
      { name: 'OpenAI API', tag: 'Embeddings' },
      { name: 'Groq Cloud', tag: 'Ultra-Fast Inference' },
    ],
  },
  {
    title: 'Workflow Automation & DevOps',
    badge: 'INTEGRATIONS',
    desc: 'Automating multi-system processes, webhook syncs, payment routing, and CI/CD pipelines.',
    skills: [
      { name: 'n8n Workflows', tag: 'Self-Hosted' },
      { name: 'Stripe & Paystack', tag: 'Payment APIs' },
      { name: 'Twilio & WhatsApp', tag: 'Messaging' },
      { name: 'Vercel & Netlify', tag: 'Global Edge' },
      { name: 'GoHighLevel & HubSpot', tag: 'CRM Sync' },
    ],
  },
];

function SkillGroupCard({ group, i }) {
  const [ref, inView] = useReveal(0.12);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${i * 0.08}s`, height: '100%' }}
    >
      <div
        style={{
          background: '#fff',
          border: '1px solid rgba(77, 38, 34, 0.12)',
          borderRadius: 16,
          padding: '26px 22px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(77, 38, 34, 0.04)',
          transition: 'border-color 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(77, 38, 34, 0.3)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(77, 38, 34, 0.12)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                color: GOLD,
                letterSpacing: '0.08em',
                fontWeight: 700,
              }}
            >
              // {group.badge}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--display)',
              fontSize: 19,
              fontWeight: 700,
              color: DARK,
              marginBottom: 8,
              letterSpacing: '-0.01em',
            }}
          >
            {group.title}
          </h3>

          <p
            style={{
              fontSize: 13,
              color: 'rgba(77, 38, 34, 0.65)',
              lineHeight: 1.55,
              marginBottom: 20,
            }}
          >
            {group.desc}
          </p>
        </div>

        {/* Technical Competency Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {group.skills.map((s) => (
            <div
              key={s.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 10px',
                background: 'rgba(77, 38, 34, 0.03)',
                borderRadius: 6,
                border: '1px solid rgba(77, 38, 34, 0.06)',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: DARK }}>{s.name}</span>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  color: 'rgba(77, 38, 34, 0.5)',
                  letterSpacing: '0.04em',
                }}
              >
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [headRef, headIn] = useReveal();

  return (
    <section id="skills" style={{ padding: '90px 0' }}>
      <div className="wrap">
        <div ref={headRef} className={`reveal ${headIn ? 'in-view' : ''}`} style={{ marginBottom: 48 }}>
          <div className="eyebrow">// Technical Stack</div>
          <h2 className={`section-heading ${headIn ? 'in-view' : ''}`}>
            Engineered across the full product lifecycle.
            <span className="rule" />
          </h2>
          <p style={{ color: 'rgba(77, 38, 34, 0.7)', fontSize: 16, maxWidth: 560, marginTop: 12 }}>
            A battle-tested production toolchain optimized for shipping speed, strict type safety, and zero operational bloat.
          </p>
        </div>

        {/* 4 Architectural Stack Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18,
            marginBottom: 56,
          }}
          className="skills-grid"
        >
          {STACK_GROUPS.map((g, i) => (
            <SkillGroupCard key={g.title} group={g} i={i} />
          ))}
        </div>

        {/* GitHub Activity */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>// Codebase Telemetry</div>
          <GitHubStats />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
