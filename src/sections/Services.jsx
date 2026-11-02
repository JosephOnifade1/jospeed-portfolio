import { useReveal } from '../hooks/useReveal.js';

const SERVICES = [
  {
    num: '01',
    title: 'Fullstack Web Applications',
    desc: 'End-to-end product development from database schema to deployed UI. React, Node.js, Supabase, TypeScript.',
    tags: ['SaaS', 'Dashboards', 'Complex UIs'],
  },
  {
    num: '02',
    title: 'AI Engineering & Agents',
    desc: 'RAG systems, LLM integrations, voice agents, automation pipelines. Claude, OpenAI, Groq, n8n.',
    tags: ['RAG', 'Voice AI', 'Automation'],
  },
  {
    num: '03',
    title: 'Marketplace & Platform Builds',
    desc: 'Two-sided marketplaces with payment routing, real-time sync, and multi-tenant architecture.',
    tags: ['Payments', 'Realtime', 'Multi-tenant'],
  },
  {
    num: '04',
    title: 'Blockchain (Learning)',
    desc: 'Exploring smart contract development with Solidity and Web3.js. Actively building knowledge in decentralized tech.',
    tags: ['Solidity', 'Web3', 'Ethereum'],
  },
];

function ServiceRow({ s, i }) {
  const [ref, inView] = useReveal(0.08);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{
        transitionDelay: `${i * 0.07}s`,
        borderBottom: '1px solid rgba(245,244,238,0.07)',
        padding: '32px 0',
        display: 'grid',
        gridTemplateColumns: '56px 1fr auto',
        gap: 24,
        alignItems: 'start',
        transition: 'background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.paddingLeft = '12px';
        e.currentTarget.style.paddingRight = '12px';
        e.currentTarget.style.background = 'rgba(216,243,106,0.03)';
        e.currentTarget.style.borderRadius = '12px';
        e.currentTarget.style.marginLeft = '-12px';
        e.currentTarget.style.marginRight = '-12px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.paddingLeft = '0';
        e.currentTarget.style.paddingRight = '0';
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderRadius = '0';
        e.currentTarget.style.marginLeft = '0';
        e.currentTarget.style.marginRight = '0';
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--citron)',
          opacity: 0.5,
          paddingTop: 4,
        }}
      >
        {s.num}
      </div>

      {/* Content */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 'clamp(17px, 2vw, 22px)',
            color: 'var(--paper)',
            margin: '0 0 10px',
            letterSpacing: '-0.02em',
          }}
        >
          {s.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14.5,
            color: 'rgba(245,244,238,0.5)',
            lineHeight: 1.65,
            margin: '0 0 14px',
          }}
        >
          {s.desc}
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {s.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: 'rgba(216,243,106,0.6)',
                background: 'rgba(216,243,106,0.07)',
                border: '1px solid rgba(216,243,106,0.14)',
                padding: '3px 8px',
                borderRadius: 4,
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 22,
          color: 'rgba(216,243,106,0.3)',
          paddingTop: 2,
        }}
      >
        →
      </div>
    </div>
  );
}

export default function Services() {
  const [headRef, headIn] = useReveal();

  return (
    <section
      id="services"
      style={{
        padding: 'clamp(72px, 9vw, 120px) 0',
        background: 'var(--ink)',
      }}
    >
      <div className="wrap">
        {/* Header */}
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{ marginBottom: 'clamp(40px, 6vw, 60px)' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              color: 'var(--citron)',
              textTransform: 'uppercase',
              marginBottom: 14,
              opacity: 0.8,
            }}
          >
            What I Build
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: 'var(--paper)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: 0,
              maxWidth: 600,
            }}
          >
            Software engineered for scale,{' '}
            <span style={{ color: 'var(--citron)' }}>shipped with purpose.</span>
          </h2>
        </div>

        {/* Service rows */}
        <div style={{ borderTop: '1px solid rgba(245,244,238,0.07)' }}>
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.num} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
