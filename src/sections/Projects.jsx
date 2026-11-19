import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SELECTED_WORK, WORK_INDEX } from '../data/projects.js';
import ProjectVisual from '../components/ProjectVisual.jsx';
import { recordWorkView } from '../utils/portfolioAnalytics.js';

function WorkCard({ project, featured = false }) {
  return (
    <article className={`work-card ${featured ? 'work-feature' : 'work-secondary'}`}>
      <ProjectVisual project={project} />
      <div className="work-copy">
        <div className="work-meta">
          <span>{String(project.selection).padStart(2, '0')}</span>
          <i aria-hidden="true" />
          {featured ? 'Featured client project' : project.discipline}
          {project.demo && <span className="work-demo-note">Demo inside</span>}
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <Link
          to={`/case-study/${project.id}`}
          state={{ entry: 'selected_work' }}
          className={`work-link ${featured ? 'btn-citron-pill' : 'text-link'}`}
          aria-label={`Read the ${project.name} case study`}
        >
          Read case study <ArrowRight size={17} aria-hidden="true" />
        </Link>
        {featured && (
          <dl className="work-facts">
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{project.delivery}</dd>
            </div>
          </dl>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const work = useRef(null);
  useEffect(() => {
    if (!work.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          recordWorkView();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(work.current);
    return () => observer.disconnect();
  }, []);
  const [lead, ...others] = SELECTED_WORK;
  return (
    <section ref={work} id="projects" className="folio-section work-section" aria-labelledby="work-title">
      <div className="wrap">
        <div className="work-heading">
          <div>
            <div className="folio-kicker">01 / Portfolio</div>
            <h2 id="work-title" data-section-title tabIndex={-1}>
              Selected work<span className="folio-dot">.</span>
            </h2>
          </div>
          <p>
            Client work and independent builds.
            <br /> A closer look at what shipped.
          </p>
        </div>
        <WorkCard project={lead} featured />
        <div className="work-pair">
          {others.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
        <Link className="archive-invite" to="/work">
          <span className="archive-swatches" aria-hidden="true">
            {WORK_INDEX.filter((project) => !project.selection)
              .slice(0, 3)
              .map((project) => (
                <img key={project.id} src={project.image} loading="lazy" alt="" />
              ))}
          </span>
          <span>
            <span className="quiet-label">The project archive</span>
            <strong>Explore all {WORK_INDEX.length} projects</strong>
          </span>
          <ArrowRight className="archive-invite-arrow" size={23} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
