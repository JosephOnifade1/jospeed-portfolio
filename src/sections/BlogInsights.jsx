import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '../utils/blog.js';

export default function BlogInsights() {
  const posts = getAllPosts();
  return (
    <section id="blog" className="folio-section notes-section" aria-labelledby="notes-title">
      <div className="wrap">
        <div className="journal-heading">
          <div>
            <div className="folio-kicker">03 / Journal</div>
            <h2 id="notes-title" className="support-title" data-section-title tabIndex={-1}>
              Field notes.
            </h2>
          </div>
          <Link className="text-link" to="/blog">
            All blog posts ({posts.length}) <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        {!posts.length && <p className="support-copy">New field notes will appear here.</p>}
        <ul className="note-list">
          {posts.slice(0, 4).map((post, index) => (
            <li key={post.slug} className={index === 0 ? 'lead-note' : undefined}>
              <Link to={`/blog/${post.slug}`}>
                <img src={post.coverImage} alt="" loading="lazy" decoding="async" />
                <span className="note-copy">
                  <small className="quiet-label">
                    {post.category} · {post.readingTime}
                  </small>
                  <strong>{post.title}</strong>
                  {index === 0 && <span className="note-dek">{post.description}</span>}
                </span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
