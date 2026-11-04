import { useReveal } from '../hooks/useReveal.js';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSTS = [
  {
    slug: 'getting-started-with-rag-2025',
    title: 'Getting Started with RAG in 2025',
    date: 'Oct 28, 2025',
    readTime: '6 min read',
    category: 'AI & Data',
    color: '#D8F36A',
  },
  {
    slug: 'why-im-learning-blockchain',
    title: "Why I'm Learning Blockchain",
    date: 'Oct 18, 2025',
    readTime: '5 min read',
    category: 'Web3 & Solidity',
    color: '#60A5FA',
  },
  {
    slug: 'creative-workflows-with-blender',
    title: 'Creative Workflows with Blender',
    date: 'Oct 10, 2025',
    readTime: '5 min read',
    category: '3D Design',
    color: '#A78BFA',
  },
];

// Open Book SVG illustration
function BookIllustration() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 180,
        height: 160,
        flexShrink: 0,
        animation: 'floatBook 7.5s ease-in-out infinite',
        filter: 'drop-shadow(0 12px 40px rgba(216, 243, 106, 0.25))',
      }}
    >
      <svg viewBox="0 0 200 170" fill="none" xmlns="http://www.w3.org/2000/svg" width="200" height="170">
        {/* Book base shadow */}
        <ellipse cx="100" cy="148" rx="72" ry="8" fill="rgba(216,243,106,0.08)" />
        {/* Left page */}
        <path d="M100 30 C80 28 40 35 20 50 L20 130 C40 115 80 108 100 110 Z" fill="#0e1810" stroke="rgba(216,243,106,0.5)" strokeWidth="1.5" />
        {/* Left page lines */}
        <line x1="35" y1="60" x2="90" y2="55" stroke="rgba(216,243,106,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="35" y1="72" x2="90" y2="68" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="35" y1="84" x2="85" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="35" y1="96" x2="90" y2="92" stroke="rgba(216,243,106,0.25)" strokeWidth="1" strokeLinecap="round" />
        <line x1="35" y1="108" x2="80" y2="104" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" />
        {/* Right page */}
        <path d="M100 30 C120 28 160 35 180 50 L180 130 C160 115 120 108 100 110 Z" fill="#0e1810" stroke="rgba(216,243,106,0.5)" strokeWidth="1.5" />
        {/* Right page lines */}
        <line x1="110" y1="55" x2="168" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="110" y1="68" x2="168" y2="72" stroke="rgba(216,243,106,0.3)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="110" y1="80" x2="165" y2="84" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="110" y1="92" x2="168" y2="96" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" />
        <line x1="110" y1="104" x2="165" y2="108" stroke="rgba(216,243,106,0.2)" strokeWidth="1" strokeLinecap="round" />
        {/* Spine glow */}
        <line x1="100" y1="28" x2="100" y2="112" stroke="rgba(216,243,106,0.8)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Top decorative element */}
        <circle cx="100" cy="24" r="5" fill="#D8F36A" />
        <circle cx="100" cy="24" r="10" fill="rgba(216,243,106,0.15)" />
        {/* Page curl effect top-right */}
        <path d="M162 42 Q175 40 178 52" stroke="rgba(216,243,106,0.4)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

function ArticleRow({ post, i }) {
  const [ref, inView] = useReveal(0.06);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${i * 0.09}s` }}
    >
      <Link
        to={`/blog/${post.slug}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <div className="article-row-card">
          {/* Color accent strip */}
          <div
            style={{
              width: 3,
              alignSelf: 'stretch',
              borderRadius: 3,
              background: post.color,
              opacity: 0.7,
              flexShrink: 0,
            }}
          />

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  color: post.color,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                {post.category}
              </span>
              <span
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: 'rgba(245,244,238,0.3)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'rgba(245,244,238,0.4)',
                  letterSpacing: '0.04em',
                }}
              >
                {post.date}
              </span>
              <span
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: 'rgba(245,244,238,0.3)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'rgba(245,244,238,0.4)',
                  letterSpacing: '0.04em',
                }}
              >
                {post.readTime}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 16,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.015em',
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </h3>
          </div>

          {/* Arrow */}
          <div
            className="article-arrow"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(216, 243, 106, 0.08)',
              border: '1px solid rgba(216, 243, 106, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--citron)',
              flexShrink: 0,
              transition: 'all 0.22s',
            }}
          >
            <ArrowUpRight size={16} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function BlogInsights() {
  const [headRef, headIn] = useReveal();

  return (
    <section
      id="blog"
      style={{
        padding: 'clamp(80px, 9vw, 130px) 0',
        background: '#070906',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,243,106,0.04) 0%, transparent 70%)',
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
            marginBottom: 'clamp(36px, 5vw, 60px)',
            gap: 32,
          }}
        >
          <div style={{ flex: 1 }}>
            <div className="eyebrow-tag" style={{ marginBottom: 18 }}>Blog / Insights</div>
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
              Insights &<br />
              <span style={{ color: 'var(--citron)' }}>Updates.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.3vw, 17px)',
                color: 'rgba(245, 244, 238, 0.62)',
                maxWidth: 460,
                lineHeight: 1.68,
                margin: 0,
              }}
            >
              Thoughts, tutorials and experiences from my journey.
            </p>
          </div>

          {/* Book graphic */}
          <div className="blog-book-wrap">
            <BookIllustration />
          </div>
        </div>

        {/* Article Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {POSTS.map((post, i) => (
            <ArticleRow key={post.slug} post={post} i={i} />
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/blog"
            className="btn-ghost-pill"
            style={{ textDecoration: 'none' }}
          >
            View All Articles →
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes floatBook {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .blog-book-wrap {
          flex-shrink: 0;
          align-self: flex-start;
        }
        .article-row-card {
          background: rgba(14, 18, 14, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .article-row-card:hover {
          border-color: rgba(216, 243, 106, 0.28);
          transform: translateY(-2px);
          background: rgba(18, 24, 18, 0.88);
        }
        .article-row-card:hover .article-arrow {
          background: rgba(216, 243, 106, 0.15);
          border-color: rgba(216, 243, 106, 0.45);
        }
        @media (max-width: 768px) {
          .blog-book-wrap { display: none !important; }
        }
      `}</style>
    </section>
  );
}
