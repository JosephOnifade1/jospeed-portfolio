import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import { getAllPosts, getAllCategories } from '../utils/blog.js';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allPosts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const query = searchQuery.trim().toLowerCase();
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, query]);

  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];
  const showFeatured = selectedCategory === 'All' && !query && Boolean(featuredPost);
  const gridPosts = showFeatured ? filteredPosts.filter((p) => p !== featuredPost) : filteredPosts;

  return (
    <div style={{ background: '#070906', minHeight: '100vh', color: '#F5F4EE' }}>
      <CustomCursor />
      <Navbar />

      <main style={{ paddingTop: 130, paddingBottom: 100 }}>
        <div className="wrap">
          {/* Header */}
          <div style={{ marginBottom: 48, maxWidth: 680 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.16em',
                color: 'var(--citron)',
                textTransform: 'uppercase',
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              Journal / {allPosts.length} articles
            </div>
            <h1
              data-route-title
              tabIndex={-1}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(40px, 5vw, 68px)',
                lineHeight: 1.05,
                color: '#FFFFFF',
                letterSpacing: '-0.035em',
                margin: '0 0 20px',
              }}
            >
              Ideas, Systems &amp;<br />
              <span style={{ color: 'var(--citron)' }}>Technical Notes.</span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.3vw, 17px)',
                color: 'rgba(245, 244, 238, 0.7)',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Build notes on the work behind the demos: how a staff ticket changes hands, what an AI citation
              actually proves, and how to turn a project idea into a first delivery.
            </p>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div
            data-needs-js
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
              flexWrap: 'wrap',
              marginBottom: 44,
              paddingBottom: 28,
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    aria-pressed={active}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 13,
                      padding: '8px 18px',
                      borderRadius: 100,
                      border: `1px solid ${active ? 'var(--citron)' : 'rgba(255, 255, 255, 0.12)'}`,
                      background: active ? 'var(--citron)' : 'rgba(14, 18, 14, 0.6)',
                      color: active ? '#0A0D09' : 'rgba(245, 244, 238, 0.75)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 300,
              }}
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(245, 244, 238, 0.4)',
                }}
              />
              <input
                type="search"
                aria-label="Search articles and tags"
                placeholder="Search articles & tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(14, 18, 14, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 100,
                  padding: '10px 16px 10px 38px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13.5,
                  color: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(216, 243, 106, 0.4)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
              />
            </div>
          </div>

          {/* Featured Hero Article (when showing all and no search query) */}
          {showFeatured && (
            <div style={{ marginBottom: 48 }}>
              <Link
                to={`/blog/${featuredPost.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div
                  style={{
                    background: 'rgba(14, 18, 14, 0.75)',
                    border: '1px solid rgba(216, 243, 106, 0.28)',
                    borderRadius: 24,
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 0.9fr',
                    gap: 32,
                    alignItems: 'center',
                    padding: 'clamp(28px, 4vw, 44px)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 24px rgba(216, 243, 106, 0.08)',
                  }}
                  className="featured-post-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--citron)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.28)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#0A0D09',
                        background: 'var(--citron)',
                        padding: '4px 12px',
                        borderRadius: 100,
                        textTransform: 'uppercase',
                        marginBottom: 16,
                      }}
                    >
                      <Sparkles size={13} />
                      <span>Featured Article</span>
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 800,
                        fontSize: 'clamp(22px, 2.5vw, 32px)',
                        color: '#FFFFFF',
                        lineHeight: 1.18,
                        letterSpacing: '-0.025em',
                        margin: '0 0 14px',
                      }}
                    >
                      {featuredPost.title}
                    </h2>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 15,
                        color: 'rgba(245, 244, 238, 0.68)',
                        lineHeight: 1.65,
                        margin: '0 0 24px',
                      }}
                    >
                      {featuredPost.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        color: 'rgba(245, 244, 238, 0.5)',
                        marginBottom: 20,
                      }}
                    >
                      <span style={{ color: 'var(--citron)' }}>{featuredPost.category}</span>
                      <span>•</span>
                      <time dateTime={featuredPost.date}>{featuredPost.date}</time>
                      <span>•</span>
                      <span>{featuredPost.readingTime}</span>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 700,
                        fontSize: 14,
                        color: 'var(--citron)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      Read featured article <ArrowRight size={15} />
                    </div>
                  </div>

                  {/* Featured Cover Graphic */}
                  <div
                    style={{
                      borderRadius: 16,
                      overflow: 'hidden',
                      aspectRatio: '16 / 10',
                      background: '#101612',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <img
                      src={featuredPost.coverImage}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of Articles */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
              gap: 28,
            }}
          >
            {gridPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div
                  style={{
                    background: 'rgba(14, 18, 14, 0.72)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 18,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(216, 243, 106, 0.35)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Article Thumbnail */}
                  <div
                    style={{
                      aspectRatio: '16 / 9',
                      background: '#101511',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={post.coverImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#0A0D09',
                        background: 'var(--citron)',
                        padding: '3px 9px',
                        borderRadius: 4,
                        textTransform: 'uppercase',
                      }}
                    >
                      {post.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div
                    style={{
                      padding: '24px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'rgba(245, 244, 238, 0.45)',
                        marginBottom: 10,
                      }}
                    >
                      <time dateTime={post.date}>{post.date}</time>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 700,
                        fontSize: 19,
                        color: '#FFFFFF',
                        lineHeight: 1.25,
                        margin: '0 0 10px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {post.title}
                    </h2>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        color: 'rgba(245, 244, 238, 0.6)',
                        lineHeight: 1.6,
                        margin: '0 0 20px',
                        flex: 1,
                      }}
                    >
                      {post.description}
                    </p>

                    {/* Tag list */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 10.5,
                            color: 'rgba(216, 243, 106, 0.8)',
                            background: 'rgba(216, 243, 106, 0.08)',
                            border: '1px solid rgba(216, 243, 106, 0.16)',
                            padding: '2px 8px',
                            borderRadius: 4,
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read link */}
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 13.5,
                        color: 'var(--citron)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      Read Article <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'rgba(245, 244, 238, 0.5)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {!allPosts.length ? 'No articles are published yet.' : 'No articles match these filters. Try another category or search term.'}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 880px) {
          .featured-post-card {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

