import { useReveal } from '../hooks/useReveal.js';

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'Supabase', 'PostgreSQL'],
  },
  {
    title: 'AI & Data',
    skills: ['OpenAI', 'LangChain', 'RAG', 'Groq', 'Claude API'],
  },
  {
    title: 'Blockchain',
    skills: ['Solidity', 'Web3.js', 'Smart Contracts', 'Ethers.js'],
  },
  {
    title: '3D Tools',
    skills: ['Blender', 'Three.js', '3D Design'],
  },
  {
    title: 'Dev Tools',
    skills: ['Git', 'Docker', 'Supabase', 'Vercel', 'n8n'],
  },
];

const ALWAYS_LEARNING = [
  { icon: '⬡', label: 'Web3' },
  { icon: '◈', label: 'Blender' },
  { icon: '⬡', label: 'AI Agents' },
  { icon: '◈', label: 'Next.js' },
];

function SkillGroup({ group, i }) {
  const [ref, inView] = useReveal(0.1);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${i * 0.07}s` }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(245,244,238,0.07)',
          borderRadius: 14,
          padding: '22px 20px',
          height: '100%',
          transition: 'border-color 0.25s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(216,243,106,0.2)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,244,238,0.07)'; }}
      >
        <div
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 14,
            color: 'var(--paper)',
            marginBottom: 14,
            letterSpacing: '-0.01em',
          }}
        >
          {group.title}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {group.skills.map((s) => (
            <div
              key={s}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13.5,
                color: 'rgba(245,244,238,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--citron)',
                  flexShrink: 0,
                  opacity: 0.7,
                }}
              />
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [headRef, headIn] = useReveal();
  const [learningRef, learningIn] = useReveal(0.12);

  return (
    <section
      id="skills"
      style={{
        padding: 'clamp(72px, 9vw, 120px) 0',
        background: 'var(--ink)',
        position: 'relative',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,243,106,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
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
            My Skills
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
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
              Tools I
              <br />
              <span style={{ color: 'var(--citron)' }}>Master.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.4vw, 16px)',
                color: 'rgba(245,244,238,0.55)',
                maxWidth: 380,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              A blend of modern technologies across development, AI and more.
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
            gap: 16,
            marginBottom: 60,
          }}
        >
          {SKILL_GROUPS.map((g, i) => (
            <SkillGroup key={g.title} group={g} i={i} />
          ))}
        </div>

        {/* Always Learning */}
        <div
          ref={learningRef}
          className={`reveal ${learningIn ? 'in-view' : ''}`}
        >
          <div
            style={{
              borderTop: '1px solid rgba(245,244,238,0.07)',
              paddingTop: 40,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                color: 'var(--citron)',
                textTransform: 'uppercase',
                marginBottom: 8,
                opacity: 0.8,
              }}
            >
              Always Learning
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'rgba(245,244,238,0.45)',
                marginBottom: 24,
                marginTop: 0,
              }}
            >
              Exploring new technologies to stay ahead.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {ALWAYS_LEARNING.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 18px',
                    borderRadius: 100,
                    border: '1px solid rgba(216,243,106,0.2)',
                    background: 'rgba(216,243,106,0.05)',
                  }}
                >
                  <span style={{ color: 'var(--citron)', fontSize: 14 }}>{item.icon}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 13,
                      color: 'var(--paper)',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
