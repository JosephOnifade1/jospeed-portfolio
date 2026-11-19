import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '../utils/blog.js';

const notes = getAllPosts().slice(0, 2);

export default function BlogInsights() {
  return (
    <section id="blog" className="folio-section notes-section" aria-labelledby="notes-title">
      <div className="wrap notes-layout">
        <div>
          <div className="folio-kicker">03 / Journal</div>
          <h2 id="notes-title" className="support-title" data-section-title tabIndex={-1}>
            Field notes.
          </h2>
          <Link className="text-link" to="/blog">
            All blog posts <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="note-list">
          {notes.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>
                <span>
                  <small className="quiet-label">
                    {post.category} · {post.readingTime}
                  </small>
                  <strong>{post.title}</strong>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
