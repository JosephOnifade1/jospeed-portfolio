import { useReveal } from '../hooks/useReveal.js';
import { 
  Code2, 
  Server, 
  Database, 
  Terminal, 
  Cpu, 
  Brain, 
  Workflow, 
  Compass, 
  Box, 
  Blocks,
  ArrowUpRight 
} from 'lucide-react';

// Section 1: Core Engineering (Primary Development Work)
const CORE_ENGINEERING = [
  {
    icon: Code2,
    name: 'Frontend Development',
    meta: 'Client Architectures',
    skills: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: Server,
    name: 'Backend & APIs',
    meta: 'Server & Logic',
    skills: ['Node.js', 'Express', 'Python', 'RESTful Endpoints', 'Edge Workers'],
  },
  {
    icon: Database,
    name: 'Databases & Storage',
    meta: 'Persistence & RLS',
    skills: ['PostgreSQL', 'Supabase', 'pgvector', 'Full-Text Search (FTS)'],
  },
  {
    icon: Terminal,
    name: 'DevOps & Tooling',
    meta: 'Workflow & Build',
    skills: ['Git & GitHub', 'Docker', 'Vite', 'Vercel Deployment'],
  },
];

// Section 2: AI Engineering (Active Systems & Applied Work)
const AI_ENGINEERING = [
  {
    icon: Brain,
    name: 'RAG & Retrieval Engines',
    meta: 'Grounded Intelligence',
    description: 'Document ingestion pipelines, semantic chunking, embeddings, and vector similarity search for hallucination-free knowledge workspaces.',
    tech: ['LangChain', 'pgvector', 'Document Parsers', 'OpenAI Embeddings'],
  },
  {
    icon: Cpu,
    name: 'LLM Orchestration & APIs',
    meta: 'Models & Reasoning',
    description: 'Structured output schemas, prompt pipelines, and multi-turn conversational agents with state persistence.',
    tech: ['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Flash', 'Groq (Llama 3)'],
  },
  {
    icon: Workflow,
    name: 'Autonomous Workflows',
    meta: 'Execution & Pipelines',
    description: 'High-frequency webhook handlers, automated lead scrapers, CRM syncs, and event-driven notification dispatchers.',
    tech: ['n8n Self-Hosted', 'Telegram Bot API', 'Twilio Voice', 'Webhooks'],
  },
];

// Section 3: Exploring (Active Exploration & Experiments — Not Claimed as Mastery)
const EXPLORATION_DOMAINS = [
  {
    icon: Blocks,
    title: 'Blockchain & Smart Contracts',
    stage: 'In-Depth Exploration',
    summary: 'Learning Solidity, EVM fundamentals, contract testing, and Web3 RPC integrations for decentralized applications.',
    topics: ['Solidity', 'Web3.js', 'Smart Contract Auditing', 'EVM Architecture'],
  },
  {
    icon: Box,
    title: '3D Design & WebGL Graphics',
    stage: 'Creative Experimentation',
    summary: 'Hands-on practice with Blender modeling, lighting studies, procedural textures, and real-time Three.js canvas shaders.',
    topics: ['Blender 4', 'Three.js', 'Procedural GLSL', 'PBR Materials'],
  },
];

export default function Skills() {
  const [headRef, headIn] = useReveal();
  const [coreRef, coreIn] = useReveal(0.08);
  const [aiRef, aiIn] = useReveal(0.08);
  const [exploreRef, exploreIn] = useReveal(0.08);

  return (
    <section
      id="skills"
      style={{
        padding: 'clamp(90px, 10vw, 150px) 0 clamp(80px, 9vw, 130px)',
        background: '#090D08', // Clean, technical dark background
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Soft Transition from Projects Section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, #070906 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Subtle Technical Precision Grid Lines (Workspace Aesthetic) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(216, 243, 106, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(216, 243, 106, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 40%, #000 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 40%, #000 25%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section Header (Renamed per brief) ── */}
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{
            marginBottom: 'clamp(48px, 6vw, 76px)',
          }}
        >
          <div className="eyebrow-tag" style={{ marginBottom: 18 }}>Technical Toolkit</div>
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
            Tools in my <span style={{ color: 'var(--citron)' }}>orbit.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.35vw, 17px)',
              color: 'rgba(245, 244, 238, 0.65)',
              maxWidth: 620,
              lineHeight: 1.68,
              margin: 0,
            }}
          >
            The technologies, frameworks, and workflows I build with every day — separated
            honestly by core production expertise, active AI engineering, and ongoing technical exploration.
          </p>
        </div>

        {/* ── Group 1: Core Engineering ── */}
        <div
          ref={coreRef}
          className={`reveal ${coreIn ? 'in-view' : ''}`}
          style={{ marginBottom: 'clamp(44px, 5vw, 64px)' }}
        >
          <div className="group-category-header">
            <span className="group-category-pill">01 / PRODUCTION ENGINEERING</span>
            <span className="group-category-title">Core Development Stack</span>
          </div>

          <div className="core-grid">
            {CORE_ENGINEERING.map(({ icon: Icon, name, meta, skills }) => (
              <div key={name} className="core-tool-card">
                <div className="tool-card-top">
                  <div className="tool-icon-box">
                    <Icon size={17} />
                  </div>
                  <div>
                    <h3 className="tool-card-name">{name}</h3>
                    <div className="tool-card-meta">{meta}</div>
                  </div>
                </div>

                <div className="tool-skills-list">
                  {skills.map((skill) => (
                    <div key={skill} className="tool-skill-item">
                      <span className="skill-dot" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Group 2: AI Engineering (Applied Work) ── */}
        <div
          ref={aiRef}
          className={`reveal ${aiIn ? 'in-view' : ''}`}
          style={{ marginBottom: 'clamp(44px, 5vw, 64px)' }}
        >
          <div className="group-category-header">
            <span className="group-category-pill">02 / APPLIED AI SYSTEMS</span>
            <span className="group-category-title">AI Engineering & Automation</span>
          </div>

          <div className="ai-engineering-grid">
            {AI_ENGINEERING.map(({ icon: Icon, name, meta, description, tech }) => (
              <div key={name} className="ai-system-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div className="ai-icon-box">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="ai-card-title">{name}</h3>
                    <div className="tool-card-meta">{meta}</div>
                  </div>
                </div>

                <p className="ai-card-desc">{description}</p>

                <div className="ai-tech-row">
                  {tech.map((t) => (
                    <span key={t} className="ai-tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Group 3: Exploring (Transparently Labeled as Active Learning) ── */}
        <div
          ref={exploreRef}
          className={`reveal ${exploreIn ? 'in-view' : ''}`}
        >
          <div className="group-category-header">
            <span className="group-category-pill" style={{ color: 'rgba(245, 244, 238, 0.7)' }}>
              03 / ACTIVE EXPLORATION
            </span>
            <span className="group-category-title">Domains Under Study</span>
          </div>

          <div className="explore-grid">
            {EXPLORATION_DOMAINS.map(({ icon: Icon, title, stage, summary, topics }) => (
              <div key={title} className="explore-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="explore-icon-box">
                      <Icon size={17} />
                    </div>
                    <h3 className="explore-card-title">{title}</h3>
                  </div>
                  <span className="explore-stage-badge">{stage}</span>
                </div>

                <p className="explore-summary">{summary}</p>

                <div className="explore-topics-row">
                  {topics.map((t) => (
                    <span key={t} className="explore-topic-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        /* ── Category Headers ── */
        .group-category-header {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 12px;
          flex-wrap: wrap;
        }

        .group-category-pill {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          color: var(--citron);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .group-category-title {
          font-family: var(--font-ui);
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.015em;
        }

        /* ── Core Grid (4 columns) ── */
        .core-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .core-tool-card {
          background: rgba(14, 19, 13, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .core-tool-card:hover {
          border-color: rgba(216, 243, 106, 0.3);
          transform: translateY(-2px);
          background: rgba(18, 25, 17, 0.75);
        }

        .tool-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tool-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: rgba(216, 243, 106, 0.08);
          border: 1px solid rgba(216, 243, 106, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--citron);
          flex-shrink: 0;
        }

        .tool-card-name {
          font-family: var(--font-ui);
          font-size: 14.5px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 2px;
          letter-spacing: -0.01em;
        }

        .tool-card-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(245, 244, 238, 0.45);
          letter-spacing: 0.04em;
        }

        .tool-skills-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .tool-skill-item {
          font-family: var(--font-body);
          font-size: 13px;
          color: rgba(245, 244, 238, 0.72);
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .skill-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--citron);
          flex-shrink: 0;
          opacity: 0.8;
        }

        /* ── AI Engineering Grid (3 columns) ── */
        .ai-engineering-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .ai-system-card {
          background: rgba(14, 19, 13, 0.75);
          border: 1px solid rgba(216, 243, 106, 0.16);
          border-radius: 16px;
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ai-system-card:hover {
          border-color: rgba(216, 243, 106, 0.4);
          transform: translateY(-2px);
          background: rgba(18, 25, 17, 0.85);
        }

        .ai-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(216, 243, 106, 0.12);
          border: 1px solid rgba(216, 243, 106, 0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--citron);
          flex-shrink: 0;
        }

        .ai-card-title {
          font-family: var(--font-ui);
          font-size: 15.5px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 2px;
          letter-spacing: -0.015em;
        }

        .ai-card-desc {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: rgba(245, 244, 238, 0.65);
          line-height: 1.6;
          margin: 0 0 18px;
          flex: 1;
        }

        .ai-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ai-tech-pill {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: rgba(216, 243, 106, 0.9);
          background: rgba(216, 243, 106, 0.06);
          border: 1px solid rgba(216, 243, 106, 0.18);
          padding: 3px 9px;
          border-radius: 4px;
        }

        /* ── Exploration Grid (2 columns) ── */
        .explore-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .explore-card {
          background: rgba(14, 18, 14, 0.5);
          border: 1px dashed rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 24px 22px;
          transition: all 0.22s ease;
        }

        .explore-card:hover {
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(17, 22, 17, 0.65);
        }

        .explore-icon-box {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(245, 244, 238, 0.8);
          flex-shrink: 0;
        }

        .explore-card-title {
          font-family: var(--font-ui);
          font-size: 15px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .explore-stage-badge {
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.08em;
          color: rgba(245, 244, 238, 0.55);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3px 8px;
          border-radius: 100px;
          text-transform: uppercase;
        }

        .explore-summary {
          font-family: var(--font-body);
          font-size: 13.5px;
          color: rgba(245, 244, 238, 0.6);
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .explore-topics-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .explore-topic-tag {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: rgba(245, 244, 238, 0.65);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3px 9px;
          border-radius: 4px;
        }

        /* ── Responsive Adaptations ── */
        @media (max-width: 1050px) {
          .core-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ai-engineering-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 680px) {
          .core-grid {
            grid-template-columns: 1fr !important;
          }
          .explore-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
