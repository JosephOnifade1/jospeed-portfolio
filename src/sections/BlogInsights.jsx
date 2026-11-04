import { useReveal } from '../hooks/useReveal.js';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURED_POST = {
  slug: 'getting-started-with-rag-2025',
  badge: '01 / FEATURED ESSAY',
  title: 'Getting Started with RAG in 2025: From Architecture to Production',
  description:
    'A practical architectural blueprint for building resilient Retrieval-Augmented Generation workflows — navigating chunking strategies, hybrid search, and vector storage guardrails.',
  date: 'Oct 28, 2025',
  readTime: '6 min read',
  category: 'AI & Retrieval Systems',
  tags: ['RAG', 'Supabase pgvector', 'LangChain', 'Hybrid Search'],
};

const ARCHIVE_POSTS = [
  {
    index: '02',
    slug: 'why-im-learning-blockchain',
    title: "Why I'm Learning Blockchain as an AI & Fullstack Developer",
    excerpt:
      'Exploring the convergence of decentralized protocols, EVM smart contracts with Solidity, and autonomous AI agents navigating on-chain incentives.',
    date: 'Oct 18, 2025',
    readTime: '5 min read',
    category: 'Web3 & Solidity',
    color: '#60A5FA',
    tags: ['Solidity', 'EVM', 'AI Agents'],
  },
  {
    index: '03',
    slug: 'creative-workflows-with-blender',
    title: 'Creative Workflows with Blender & Three.js for Creative Developers',
    excerpt:
      'How 3D spatial modeling in Blender and real-time WebGL rendering in Three.js unlock a new dimension of web storytelling and interface craft.',
    date: 'Oct 10, 2025',
    readTime: '5 min read',
    category: '3D Design & WebGL',
    color: '#A78BFA',
    tags: ['Blender', 'Three.js', 'WebGL'],
  },
];

// Clean technical architectural vector schematic for RAG systems (no cartoon graphics)
function RagArchitectureSchematic() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        maxWidth: 380,
        height: 240,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 380 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="ragLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(216, 243, 106, 0.15)" />
            <stop offset="50%" stopColor="rgba(216, 243, 106, 0.7)" />
            <stop offset="100%" stopColor="rgba(216, 243, 106, 0.2)" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(216, 243, 106, 0.35)" />
            <stop offset="100%" stopColor="rgba(216, 243, 106, 0)" />
          </radialGradient>
        </defs>

        {/* Outer schematic frame */}
        <rect
          x="10"
          y="10"
          width="360"
          height="220"
          rx="14"
          fill="rgba(10, 14, 10, 0.65)"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeDasharray="3 3"
        />

        {/* Coordinate / technical ticks */}
        <text x="24" y="28" fill="rgba(245, 244, 238, 0.35)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.08em">
          SYS.DIAGRAM // RAG.PIPELINE.v25
        </text>
        <text x="312" y="28" fill="var(--citron)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.05em">
          ACTIVE
        </text>

        {/* Node 1: Unstructured Docs */}
        <g transform="translate(30, 60)">
          <rect width="84" height="50" rx="8" fill="rgba(18, 24, 18, 0.9)" stroke="rgba(255, 255, 255, 0.14)" />
          <text x="12" y="24" fill="rgba(245, 244, 238, 0.9)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">Raw Docs</text>
          <text x="12" y="38" fill="rgba(245, 244, 238, 0.45)" fontFamily="var(--font-mono)" fontSize="8.5">MD / PDF / Web</text>
        </g>

        {/* Node 2: Chunk & Embed */}
        <g transform="translate(148, 60)">
          <rect width="88" height="50" rx="8" fill="rgba(18, 24, 18, 0.9)" stroke="rgba(216, 243, 106, 0.4)" />
          <circle cx="76" cy="14" r="3" fill="var(--citron)" />
          <text x="10" y="24" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">Chunk & Embed</text>
          <text x="10" y="38" fill="var(--citron)" fontFamily="var(--font-mono)" fontSize="8.5">Semantic 512d</text>
        </g>

        {/* Node 3: Vector Index (pgvector) */}
        <g transform="translate(268, 60)">
          <rect width="84" height="50" rx="8" fill="rgba(18, 24, 18, 0.9)" stroke="rgba(255, 255, 255, 0.14)" />
          <text x="10" y="24" fill="rgba(245, 244, 238, 0.9)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">pgvector</text>
          <text x="10" y="38" fill="rgba(245, 244, 238, 0.45)" fontFamily="var(--font-mono)" fontSize="8.5">HNSW Index</text>
        </g>

        {/* Connecting pipeline paths */}
        <path d="M 114 85 L 148 85" stroke="url(#ragLineGrad)" strokeWidth="1.5" />
        <polygon points="144,82 149,85 144,88" fill="var(--citron)" />

        <path d="M 236 85 L 268 85" stroke="url(#ragLineGrad)" strokeWidth="1.5" />
        <polygon points="264,82 269,85 264,88" fill="var(--citron)" />

        {/* Lower flow: Query -> Similarity Retrieval -> LLM Generation */}
        <path d="M 310 110 L 310 148 L 272 148" stroke="rgba(216, 243, 106, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Node 4: Hybrid Re-ranking */}
        <g transform="translate(148, 140)">
          <rect width="112" height="58" rx="8" fill="rgba(14, 22, 14, 0.95)" stroke="rgba(216, 243, 106, 0.6)" />
          <circle cx="56" cy="29" r="32" fill="url(#nodeGlow)" />
          <text x="12" y="24" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700">Re-rank & Filter</text>
          <text x="12" y="38" fill="rgba(245, 244, 238, 0.7)" fontFamily="var(--font-mono)" fontSize="8.5">BM25 + Cosine</text>
          <text x="12" y="50" fill="var(--citron)" fontFamily="var(--font-mono)" fontSize="8.5">Top-k Grounding</text>
        </g>

        {/* Node 5: Synthesized Output */}
        <g transform="translate(30, 145)">
          <rect width="84" height="48" rx="8" fill="rgba(18, 24, 18, 0.9)" stroke="rgba(255, 255, 255, 0.14)" />
          <text x="12" y="23" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">Answer Node</text>
          <text x="12" y="37" fill="rgba(216, 243, 106, 0.85)" fontFamily="var(--font-mono)" fontSize="8.5">Zero Hallucination</text>
        </g>

        <path d="M 148 169 L 114 169" stroke="url(#ragLineGrad)" strokeWidth="1.5" />
        <polygon points="118,166 113,169 118,172" fill="var(--citron)" />
      </svg>
    </div>
  );
}

export default function BlogInsights() {
  const [headRef, headIn] = useReveal();
  const [featRef, featIn] = useReveal(0.08);

  return (
    <section
      id="blog"
      style={{
        padding: 'clamp(84px, 9.5vw, 136px) 0',
        background: '#0D100C', // Editorial calm surface — provides visual reset after technical Skills section
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Subtle ambient editorial light */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: '12%',
          width: 500,
          height: 380,
          background: 'radial-gradient(circle, rgba(216, 243, 106, 0.035) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <div
          ref={headRef}
          className={`reveal ${headIn ? 'in-view' : ''}`}
          style={{
            maxWidth: 760,
            marginBottom: 'clamp(40px, 5.5vw, 64px)',
          }}
        >
          <div className="eyebrow-tag" style={{ marginBottom: 16 }}>
            04 / PERSPECTIVES & WRITING
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 4.8vw, 64px)',
              color: '#FFFFFF',
              letterSpacing: '-0.038em',
              lineHeight: 1.08,
              margin: '0 0 16px',
            }}
          >
            Engineering thoughts &<br />
            <span style={{ color: 'var(--citron)' }}>experiments.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.25vw, 17px)',
              color: 'rgba(245, 244, 238, 0.62)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 580,
            }}
          >
            Technical breakdowns, architectural notes, and honest observations from building real-world software, AI workflows, and exploratory prototypes.
          </p>
        </div>

        {/* FEATURED INSIGHT CARD */}
        <div
          ref={featRef}
          className={`reveal ${featIn ? 'in-view' : ''}`}
          style={{ marginBottom: 36 }}
        >
          <Link
            to={`/blog/${FEATURED_POST.slug}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div className="featured-insight-card">
              <div className="featured-insight-content">
                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10.5,
                      letterSpacing: '0.12em',
                      color: 'var(--citron)',
                      background: 'rgba(216, 243, 106, 0.1)',
                      border: '1px solid rgba(216, 243, 106, 0.28)',
                      padding: '4px 10px',
                      borderRadius: 100,
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--citron)' }} />
                    {FEATURED_POST.badge}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'rgba(245, 244, 238, 0.5)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {FEATURED_POST.category}
                  </span>

                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(245, 244, 238, 0.25)' }} />

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'rgba(245, 244, 238, 0.5)',
                    }}
                  >
                    {FEATURED_POST.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: 'clamp(22px, 2.6vw, 34px)',
                    color: '#FFFFFF',
                    lineHeight: 1.22,
                    letterSpacing: '-0.025em',
                    margin: '0 0 16px',
                  }}
                  className="featured-title-hover"
                >
                  {FEATURED_POST.title}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15.5,
                    lineHeight: 1.68,
                    color: 'rgba(245, 244, 238, 0.72)',
                    margin: '0 0 24px',
                    maxWidth: 580,
                  }}
                >
                  {FEATURED_POST.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 26 }}>
                  {FEATURED_POST.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'rgba(245, 244, 238, 0.6)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '4px 9px',
                        borderRadius: 6,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Call to action */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'var(--font-ui)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--citron)',
                  }}
                >
                  Read Full Architecture Analysis <ArrowRight size={15} />
                </div>
              </div>

              {/* Vector Architecture Diagram */}
              <div className="featured-schematic-wrap">
                <RagArchitectureSchematic />
              </div>
            </div>
          </Link>
        </div>

        {/* CURATED JOURNAL LIST (Remaining Articles) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
          {ARCHIVE_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="journal-list-row">
                {/* Index & Category */}
                <div className="journal-meta-left">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'rgba(245, 244, 238, 0.35)',
                    }}
                  >
                    {post.index}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      color: post.color,
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 'clamp(16px, 1.4vw, 18px)',
                      color: '#FFFFFF',
                      margin: '0 0 6px',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.35,
                    }}
                    className="journal-title"
                  >
                    {post.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      color: 'rgba(245, 244, 238, 0.55)',
                      margin: 0,
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                {/* Timing & Arrow */}
                <div className="journal-meta-right">
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'rgba(245, 244, 238, 0.45)',
                        marginBottom: 3,
                      }}
                    >
                      {post.date}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10.5,
                        color: 'rgba(245, 244, 238, 0.3)',
                      }}
                    >
                      {post.readTime}
                    </div>
                  </div>

                  <div className="journal-arrow-circle">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/blog"
            className="btn-ghost-pill"
            style={{
              textDecoration: 'none',
              padding: '13px 30px',
              fontSize: 14,
            }}
          >
            Explore All Notes & Articles →
          </Link>
        </div>

      </div>

      <style>{`
        .featured-insight-card {
          background: rgba(14, 20, 14, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: clamp(24px, 3.8vw, 44px);
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: center;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .featured-insight-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(216, 243, 106, 0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .featured-insight-card:hover {
          border-color: rgba(216, 243, 106, 0.35);
          transform: translateY(-3px);
          background: rgba(17, 24, 17, 0.85);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
        }
        .featured-insight-card:hover .featured-title-hover {
          color: #FFFFFF;
        }
        .featured-schematic-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .journal-list-row {
          background: rgba(14, 18, 14, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 24px;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .journal-list-row:hover {
          background: rgba(18, 24, 18, 0.8);
          border-color: rgba(216, 243, 106, 0.24);
          transform: translateY(-2px);
        }
        .journal-list-row:hover .journal-arrow-circle {
          background: rgba(216, 243, 106, 0.15);
          border-color: rgba(216, 243, 106, 0.4);
          color: var(--citron);
        }
        .journal-meta-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 140px;
          flex-shrink: 0;
        }
        .journal-meta-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .journal-arrow-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(245, 244, 238, 0.5);
          transition: all 0.2s;
        }

        @media (max-width: 900px) {
          .featured-insight-card {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .featured-schematic-wrap {
            order: -1;
            justify-content: flex-start;
          }
          .journal-list-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .journal-meta-left {
            width: auto;
            flex-direction: row;
            gap: 10px;
            align-items: center;
          }
          .journal-meta-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </section>
  );
}
