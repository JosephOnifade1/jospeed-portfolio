import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, GalleryHorizontalEnd, LayoutGrid } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import ProjectVisual from '../components/ProjectVisual.jsx';
import { WORK_FILTERS, WORK_INDEX } from '../data/projects.js';
import { archiveFilter, archiveSearch } from '../utils/workArchive.js';
import Gallery from './Gallery.jsx';
import '../styles/archive.css';

function ArchiveCard({ project, category }) {
  return (
    <li className="archive-card">
      <Link
        to={`/case-study/${project.id}`}
        state={{ entry: 'work_archive', category }}
        aria-label={`Read the ${project.name} case study`}
      >
        <div
          className={`archive-cover ${project.visual ? '' : 'archive-cover-art'}`}
          style={{ background: project.gradient }}
        >
          <ProjectVisual project={project} />
          {!project.visual && <span className="cover-caption quiet-label">Project artwork</span>}
        </div>
        <div className="archive-card-copy">
          <span className="work-meta">
            <span>{String(WORK_INDEX.indexOf(project) + 1).padStart(2, '0')}</span>
            <i aria-hidden="true" />
            {project.discipline || project.category}
          </span>
          <h2>{project.name}</h2>
          <p>{project.summary || project.description}</p>
          <span className="text-link">
            Read case study <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function ProjectArchive({ gallery = false }) {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const filter = archiveFilter(params.get('category'));
  const results = filter.category ? WORK_INDEX.filter((p) => p.category === filter.category) : WORK_INDEX;
  const activeIndex = Math.max(
    0,
    results.findIndex((p) => p.id === params.get('project'))
  );
  const search = archiveSearch(filter.key);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="archive-page">
        <div className="wrap">
          <Link className="archive-back" to="/#projects">
            <ArrowLeft size={16} aria-hidden="true" /> Back to selected work
          </Link>
          <div className="archive-heading">
            <div>
              <div className="folio-kicker">Joseph Onifade / Work index</div>
              <h1 data-route-title tabIndex={-1}>
                {gallery ? '3D gallery' : 'Project archive'}
                <span className="folio-dot">.</span>
              </h1>
            </div>
            <p data-needs-js={gallery || undefined}>
              {gallery
                ? 'Pick a cover or use the arrow keys, then open its case study.'
                : 'Client projects and independent builds. Pick a discipline, or browse the full collection.'}
            </p>
          </div>
          <div className="archive-toolbar">
            <nav data-needs-js className="archive-filters" aria-label="Filter by discipline">
              {WORK_FILTERS.map(({ key, label, category }) => (
                <Link
                  key={key}
                  to={`${pathname}${archiveSearch(key)}`}
                  aria-current={filter.key === key ? 'true' : undefined}
                >
                  {label}
                  <small aria-hidden="true">
                    {category ? WORK_INDEX.filter((p) => p.category === category).length : WORK_INDEX.length}
                  </small>
                </Link>
              ))}
            </nav>
            <nav className="archive-views" aria-label="Archive views">
              <Link to={`/work${search}`} aria-current={!gallery ? 'page' : undefined}>
                <LayoutGrid size={16} aria-hidden="true" /> Grid
              </Link>
              <Link to={`/gallery${search}`} aria-current={gallery ? 'page' : undefined}>
                <GalleryHorizontalEnd size={17} aria-hidden="true" /> 3D gallery
              </Link>
            </nav>
          </div>
          <p className="archive-count quiet-label" role="status">
            Showing {results.length} of {WORK_INDEX.length} projects
          </p>
          {gallery && (
            <noscript>
              <nav aria-label="Gallery case studies">
                <p>Choose a case study below. The 3D cover controls require JavaScript.</p>
                <ul>
                  {results.map((project) => (
                    <li key={project.id}>
                      <Link className="text-link" to={`/case-study/${project.id}`}>
                        {project.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </noscript>
          )}
          {!results.length ? (
            <p>
              No projects in this discipline yet.{' '}
              <Link className="text-link" to={pathname}>
                Show all projects
              </Link>
            </p>
          ) : gallery ? (
            <Gallery
              projects={results}
              category={filter.key}
              index={activeIndex}
              onSelect={(index) => setParams(archiveSearch(filter.key, results[index].id), { replace: true })}
            />
          ) : (
            <ul className="archive-grid" aria-label="Project case studies">
              {results.map((project) => (
                <ArchiveCard key={project.id} project={project} category={filter.key} />
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
