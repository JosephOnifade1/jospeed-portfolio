import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import { getPostBySlug, getAllPosts } from '../utils/blog.js';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { XIcon, LinkedinIcon } from '../components/BrandIcons.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const allPosts = useMemo(() => getAllPosts(), []);

  // Compute Prev & Next articles
  const { prevPost, nextPost } = useMemo(() => {
    if (!post) return { prevPost: null, nextPost: null };
    const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
    const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    return { prevPost: prev, nextPost: next };
  }, [allPosts, post]);

  // Dynamic SEO Metadata & JSON-LD injection
  useEffect(() => {
    if (!post) return;

    // Document title
    document.title = `${post.title} | JOspeed Blog`;

    // Dynamic canonical
    const canonicalUrl = `https://jospeedtech.vercel.app/blog/${post.slug}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', post.description);

    // OpenGraph & Twitter tags
    const metaTags = [
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: `https://jospeedtech.vercel.app${post.coverImage}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.title },
      { name: 'twitter:description', content: post.description },
      { name: 'twitter:image', content: `https://jospeedtech.vercel.app${post.coverImage}` },
      { name: 'twitter:creator', content: '@buildwithjospeed' },
    ];

    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) tag.setAttribute('property', property);
        if (name) tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Inject JSON-LD Schema.org Structured Data
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: `https://jospeedtech.vercel.app${post.coverImage}`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
        url: 'https://jospeedtech.vercel.app/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'JOspeed',
        logo: {
          '@type': 'ImageObject',
          url: 'https://jospeedtech.vercel.app/apple-touch-icon.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    };

    let scriptLd = document.getElementById('jsonld-blog-post');
    if (!scriptLd) {
      scriptLd = document.createElement('script');
      scriptLd.id = 'jsonld-blog-post';
      scriptLd.type = 'application/ld+json';
      document.head.appendChild(scriptLd);
    }
    scriptLd.textContent = JSON.stringify(schemaData);

    return () => {
      // Cleanup script on unmount
      const s = document.getElementById('jsonld-blog-post');
      if (s) s.remove();
    };
  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!post) {
    return (
      <div style={{ background: '#070906', minHeight: '100vh', color: '#F5F4EE', paddingTop: 140 }}>
        <Navbar />
        <div className="wrap" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: 32, marginBottom: 16 }}>Article Not Found</h1>
          <p style={{ color: 'rgba(245,244,238,0.6)', marginBottom: 28 }}>The article you are looking for does not exist or has been relocated.</p>
          <Link to="/blog" className="btn-citron-pill">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div style={{ background: '#070906', minHeight: '100vh', color: '#F5F4EE' }}>
      <CustomCursor />
      <Navbar />

      <article style={{ paddingTop: 120, paddingBottom: 110 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          {/* Breadcrumb Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'rgba(245, 244, 238, 0.5)',
              marginBottom: 32,
            }}
          >
            <Link to="/blog" style={{ color: 'var(--citron)', textDecoration: 'none' }}>
              Blog
            </Link>
            <span>/</span>
            <span>{post.category}</span>
          </div>

          {/* Article Header */}
          <header style={{ marginBottom: 40 }}>
            {/* Category & Metadata Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                flexWrap: 'wrap',
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#0A0D09',
                  background: 'var(--citron)',
                  padding: '4px 12px',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                }}
              >
                {post.category}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'rgba(245, 244, 238, 0.5)',
                }}
              >
                {post.date}
              </span>
              <span style={{ color: 'rgba(245, 244, 238, 0.3)' }}>•</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'rgba(245, 244, 238, 0.5)',
                }}
              >
                {post.readingTime}
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 4.4vw, 54px)',
                lineHeight: 1.12,
                color: '#FFFFFF',
                letterSpacing: '-0.035em',
                margin: '0 0 20px',
              }}
            >
              {post.title}
            </h1>

            {/* Lead Description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 1.4vw, 19px)',
                color: 'rgba(245, 244, 238, 0.72)',
                lineHeight: 1.65,
                margin: '0 0 28px',
              }}
            >
              {post.description}
            </p>

            {/* Author Byline & Social Share Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img
                  src="/profile.jpg"
                  alt={post.author}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid rgba(216, 243, 106, 0.3)',
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 14.5,
                      color: '#FFFFFF',
                    }}
                  >
                    {post.author}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--citron)',
                    }}
                  >
                    Systems &amp; AI Architect
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Share on X"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(245, 244, 238, 0.75)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--citron)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245, 244, 238, 0.75)'; }}
                >
                  <XIcon size={15} />
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Share on LinkedIn"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(245, 244, 238, 0.75)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--citron)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245, 244, 238, 0.75)'; }}
                >
                  <LinkedinIcon size={15} />
                </a>

                <button
                  onClick={handleCopyLink}
                  title="Copy Link to Clipboard"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    borderRadius: 8,
                    background: copied ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${copied ? 'rgba(74, 222, 128, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: copied ? '#4ade80' : 'rgba(245, 244, 238, 0.75)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11.5,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied ? <Check size={14} /> : <Share2 size={14} />}
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Article Main Markdown Content */}
          <div className="blog-prose" style={{ lineHeight: 1.8, fontSize: 17, color: 'rgba(245, 244, 238, 0.85)' }}>
            <Markdown
              options={{
                overrides: {
                  h1: {
                    component: ({ children }) => (
                      <h2
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 800,
                          fontSize: 'clamp(26px, 3vw, 36px)',
                          color: '#FFFFFF',
                          letterSpacing: '-0.025em',
                          margin: '48px 0 20px',
                        }}
                      >
                        {children}
                      </h2>
                    ),
                  },
                  h2: {
                    component: ({ children }) => (
                      <h2
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          fontSize: 'clamp(22px, 2.4vw, 28px)',
                          color: '#FFFFFF',
                          letterSpacing: '-0.02em',
                          margin: '40px 0 16px',
                        }}
                      >
                        {children}
                      </h2>
                    ),
                  },
                  h3: {
                    component: ({ children }) => (
                      <h3
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 600,
                          fontSize: 20,
                          color: 'var(--citron)',
                          margin: '32px 0 14px',
                        }}
                      >
                        {children}
                      </h3>
                    ),
                  },
                  p: {
                    component: ({ children }) => (
                      <p style={{ fontFamily: 'var(--font-body)', margin: '0 0 24px', lineHeight: 1.78 }}>
                        {children}
                      </p>
                    ),
                  },
                  pre: {
                    component: ({ children }) => (
                      <div
                        style={{
                          background: '#0d110e',
                          border: '1px solid rgba(216, 243, 106, 0.2)',
                          borderRadius: 14,
                          padding: '20px 22px',
                          overflowX: 'auto',
                          margin: '28px 0',
                          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
                        }}
                      >
                        <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 13.5, color: '#D8F36A' }}>
                          {children}
                        </pre>
                      </div>
                    ),
                  },
                  code: {
                    component: ({ children }) => (
                      <code
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.88em',
                          color: 'var(--citron)',
                          background: 'rgba(216, 243, 106, 0.08)',
                          border: '1px solid rgba(216, 243, 106, 0.2)',
                          padding: '2px 6px',
                          borderRadius: 4,
                        }}
                      >
                        {children}
                      </code>
                    ),
                  },
                  blockquote: {
                    component: ({ children }) => (
                      <blockquote
                        style={{
                          margin: '28px 0',
                          padding: '18px 24px',
                          background: 'rgba(14, 18, 14, 0.85)',
                          borderLeft: '4px solid var(--citron)',
                          borderRadius: '0 12px 12px 0',
                          fontFamily: 'var(--font-editorial)',
                          fontStyle: 'italic',
                          fontSize: 18,
                          color: '#FFFFFF',
                        }}
                      >
                        {children}
                      </blockquote>
                    ),
                  },
                  ul: {
                    component: ({ children }) => (
                      <ul style={{ margin: '0 0 24px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {children}
                      </ul>
                    ),
                  },
                  ol: {
                    component: ({ children }) => (
                      <ol style={{ margin: '0 0 24px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {children}
                      </ol>
                    ),
                  },
                  hr: {
                    component: () => (
                      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '48px 0' }} />
                    ),
                  },
                },
              }}
            >
              {post.content}
            </Markdown>
          </div>

          {/* Tags Footer */}
          <div style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(245, 244, 238, 0.5)' }}>Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'rgba(216, 243, 106, 0.85)',
                    background: 'rgba(216, 243, 106, 0.08)',
                    border: '1px solid rgba(216, 243, 106, 0.18)',
                    padding: '4px 10px',
                    borderRadius: 100,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Next / Previous Article Navigation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
              marginTop: 52,
            }}
            className="prev-next-grid"
          >
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                style={{
                  textDecoration: 'none',
                  background: 'rgba(14, 18, 14, 0.72)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(245, 244, 238, 0.45)' }}>
                  ← Previous Article
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15, color: '#FFFFFF' }}>
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                style={{
                  textDecoration: 'none',
                  background: 'rgba(14, 18, 14, 0.72)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  alignItems: 'flex-end',
                  textAlign: 'right',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.35)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(245, 244, 238, 0.45)' }}>
                  Next Article →
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15, color: '#FFFFFF' }}>
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .prev-next-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
