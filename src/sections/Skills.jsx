import { useReveal } from '../hooks/useReveal.js';
import { Code2, Server, Brain, Blocks, Box, Terminal, Sparkles } from 'lucide-react';

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Python'],
  },
  {
    icon: Brain,
    title: 'AI & Data',
    skills: ['OpenAI', 'LangChain', 'RAG', 'Dify'],
  },
  {
    icon: Blocks,
    title: 'Blockchain',
    skills: ['Solidity', 'Web3', 'Smart Contracts'],
  },
  {
    icon: Box,
    title: '3D Tools',
    skills: ['Blender', 'Three.js', '3D Design'],
  },
  {
    icon: Terminal,
    title: 'Dev Tools',
    skills: ['Git', 'Docker', 'Supabase'],
  },
];

const ALWAYS_LEARNING = [
  { emoji: '⬡', label: 'Web3' },
  { emoji: '◈', label: 'Blender' },
  { emoji: '⬡', label: 'AI Agents' },
  { emoji: '◈', label: 'Next.js' },
];

// CSS SVG 3D Laptop Illustration
function LaptopIllustration() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 180,
        height: 160,
        flexShrink: 0,
        animation: 'floatLaptop 7s ease-in-out infinite',
        filter: 'drop-shadow(0 12px 40px rgba(216, 243, 106, 0.28))',
      }}
    >
      <svg viewBox="0 0 200 170" fill="none" xmlns="http://www.w3.org/2000/svg" width="200" height="170">
        <rect x="30" y="10" width="140" height="90" rx="8" fill="#0e1810" stroke="rgba(216,243,106,0.5)" strokeWidth="1.5" />
        <rect x="38" y="18" width="124" height="74" rx="4" fill="#070906" />
        <rect x="48" y="28" width="60" height="4" rx="2" fill="rgba(216,243,106,0.7)" />
        <rect x="48" y="38" width="90" height="3" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="56" y="46" width="70" height="3" rx="2" fill="rgba(216,243,106,0.4)" />
        <rect x="56" y="54" width="50" height="3" rx="2" fill="rgba(255,255,255,0.15)" />
        <rect x="48" y="62" width="80" height="3" rx="2" fill="rgba(216,243,106,0.5)" />
        <rect x="56" y="70" width="60" height="3" rx="2" fill="rgba(255,255,255,0.18)" />
        <rect x="48" y="78" width="40" height="3" rx="2" fill="rgba(216,243,106,0.35)" />
        <rect x="92" y="78" width="3" height="10" rx="1" fill="#D8F36A" opacity="0.9" />
        <path d="M20 100 L30 100 L170 100 L180 100 L192 115 L8 115 Z" fill="#0e1810" stroke="rgba(216,243,106,0.4)" strokeWidth="1.5" />
        <rect x="85" y="104" width="30" height="6" rx="3" fill="rgba(216,243,106,0.15)" stroke="rgba(216,243,106,0.3)" strokeWidth="1" />
        <ellipse cx="100" cy="118" rx="80" ry="6" fill="rgba(216,243,106,0.07)" />
      </svg>
    </div>
  );
}

function SkillCard({ group, i }) {
  const [ref, inView] = useReveal(0.06);
  const Icon = group.icon;

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${i * 0.07}s` }}
    >
      <div className="skill-card-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'rgba(216, 243, 106, 0.1)',
              border: '1px solid rgba(216, 243, 106, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--citron)',
              flexShrink: 0,
            }}
          >
            <Icon size={18} />
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 15,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {group.title}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {group.skills.map((skill) => (
            <div
              key={skill}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13.5,
                color: 'rgba(245, 244, 238, 0.68)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--citron)',
                  boxShadow: '0 0 7px rgba(216, 243, 106, 0.65)',
                  flexShrink: 0,
                }}
              />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [headRef, headIn] = useReveal();
  const [learningRef, learningIn] = useReveal(0.1);

  return (
    <section
      id="skills"
      style={{
        padding: 'clamp(80px, 9vw, 130px) 0',
        background: '#070906',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '0%',
          right: '-8%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,243,106,0.05) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 32,
            marginBottom: 'clamp(36px, 5vw, 60px)',
          }}
        >
          <div style={{ flex: 1 }}>
            <div className="eyebrow-tag" style={{ marginBottom: 18 }}>My Skills</div>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(38px, 5.2vw, 72px)',
                color: '#FFFFFF',
                letterSpacing: '-0.038em',
                lineHeight: 1.05,
                margin: '0 0 18px',
              }}
            >
              Tools I<br />
              <span style={{ color: 'var(--citron)' }}>Master.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.3vw, 17px)',
                color: 'rgba(245, 244, 238, 0.62)',
                maxWidth: 480,
                lineHeight: 1.68,
                margin: 0,
              }}
            >
              A blend of modern technologies across development, AI and more.
            </p>
          </div>

          <div className="skills-laptop-wrap">
            <LaptopIllustration />
          </div>
        </div>

        {/* 6-Card Skills Grid */}
        <div className="skills-grid" style={{ marginBottom: 52 }}>
          {SKILL_GROUPS.map((g, i) => (
            <SkillCard key={g.title} group={g} i={i} />
          ))}
        </div>

        {/* Always Learning Banner */}
        <div
          ref={learningRef}
          className={`reveal ${learningIn ? 'in-view' : ''}`}
        >
          <div
            style={{
              background: 'rgba(14, 18, 14, 0.6)',
              border: '1px solid rgba(216, 243, 106, 0.14)',
              borderRadius: 20,
              padding: 'clamp(22px, 3vw, 32px) clamp(20px, 3vw, 36px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 17,
                  color: '#FFFFFF',
                  marginBottom: 5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>Always Learning</span>
                <Sparkles size={15} color="var(--citron)" />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13.5,
                  color: 'rgba(245, 244, 238, 0.5)',
                  margin: 0,
                }}
              >
                Exploring new technologies to stay ahead.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {ALWAYS_LEARNING.map(({ emoji, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 18px',
                    borderRadius: 100,
                    background: 'rgba(216, 243, 106, 0.07)',
                    border: '1px solid rgba(216, 243, 106, 0.22)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 13,
                    transition: 'all 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(216, 243, 106, 0.14)';
                    e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(216, 243, 106, 0.07)';
                    e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.22)';
                  }}
                >
                  <span style={{ color: 'var(--citron)', fontSize: 12 }}>{emoji}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes floatLaptop {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .skills-laptop-wrap {
          flex-shrink: 0;
          align-self: flex-start;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }
        .skill-card-inner {
          background: rgba(14, 18, 14, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 18px;
          padding: 22px 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .skill-card-inner:hover {
          border-color: rgba(216, 243, 106, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 20px rgba(216, 243, 106, 0.07);
        }
        @media (max-width: 1100px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .skills-laptop-wrap { display: none !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
