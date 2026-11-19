import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import ProjectVisual from '../components/ProjectVisual.jsx';
import ReviveTouchDemo from '../components/ReviveTouchDemo.jsx';
import { WORK_INDEX } from '../data/projects.js';
import { archiveSearch } from '../utils/workArchive.js';
import { recordCaseView } from '../utils/portfolioAnalytics.js';

export default function CaseStudy() {
  const { id } = useParams();
  const { state } = useLocation();
  const index = WORK_INDEX.findIndex((record) => record.id === id);
  const project = WORK_INDEX[index];
  const next = WORK_INDEX[(index + 1) % WORK_INDEX.length];
  useEffect(() => {
    if (!project?.caseStudy) return;
    const previous = document.title;
    document.title = `${project.name} — Case study | JOspeed`;
    recordCaseView(project.id, state?.entry);
    return () => {
      document.title = previous;
    };
  }, [project, state?.entry]);

  if (!project?.caseStudy)
    return (
      <>
        <CustomCursor />
        <Navbar />
        <main className="wrap case-missing">
          <h1 data-route-title tabIndex={-1}>
            Case study not found.
          </h1>
          <Link className="text-link" to="/#projects">
            <ArrowLeft size={16} /> Back to selected work
          </Link>
        </main>
        <Footer />
      </>
    );
  const { name, caseStudy: study, visual } = project;
  const fromGallery = state?.entry === 'work_gallery';
  const fromArchive = state?.entry === 'work_archive' || fromGallery;
  const returnPath = fromArchive
    ? `${fromGallery ? '/gallery' : '/work'}${archiveSearch(state.category, fromGallery ? project.id : null)}`
    : '/#projects';
  const hasDemo = project.demo === 'table-request';
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="case-page">
        <div className="wrap">
          <div className="case-breadcrumb">
            <Link to={returnPath}>
              <ArrowLeft size={16} />{' '}
              {fromGallery
                ? 'Back to 3D gallery'
                : fromArchive
                  ? 'Back to project archive'
                  : 'Back to selected work'}
            </Link>
            <span className="quiet-label">JOspeed / Case study</span>
          </div>
          <article aria-labelledby="case-title">
            <div className="case-opening">
              <div className="case-lead">
                <div className="folio-kicker">{project.discipline || project.category}</div>
                <h1 id="case-title" data-route-title tabIndex={-1}>
                  {name}
                </h1>
                <p>{project.summary || project.description}</p>
                {(project.role || project.delivery) && (
                  <dl className="work-facts">
                    {project.role && (
                      <div>
                        <dt>My role</dt>
                        <dd>{project.role}</dd>
                      </div>
                    )}
                    {project.delivery && (
                      <div>
                        <dt>Delivery</dt>
                        <dd>{project.delivery}</dd>
                      </div>
                    )}
                  </dl>
                )}
                {hasDemo && (
                  <Link to="#demo" state={state} className="text-link demo-jump">
                    Try the sample workflow <ArrowDown size={16} aria-hidden="true" />
                  </Link>
                )}
                {(project.live || project.github) && (
                  <div className="case-resources">
                    {project.live && (
                      <a className="text-link" href={project.live} target="_blank" rel="noreferrer">
                        Visit product <ArrowUpRight size={15} />
                      </a>
                    )}
                    {project.github && (
                      <a className="text-link" href={project.github} target="_blank" rel="noreferrer">
                        Source code <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="case-media">
                <ProjectVisual project={project} detailed />
              </div>
            </div>
            {visual?.exchange && (
              <div className="sample-exchange">
                <div>
                  <span className="quiet-label">Sample question &amp; answer</span>
                  <h2>{visual.exchange.question}</h2>
                  <p>{visual.exchange.answer}</p>
                </div>
                <blockquote>
                  “{visual.exchange.passage}”<cite>[1] {visual.exchange.source}</cite>
                </blockquote>
              </div>
            )}
            <div className="case-result">
              <h2 className="quiet-label">What shipped</h2>
              <p>{study.outcome}</p>
            </div>
            {hasDemo && <ReviveTouchDemo />}
            <div className="case-body">
              <div className="case-narrative">
                <div>
                  <h2>The problem</h2>
                  <p>{study.problem}</p>
                </div>
                <div>
                  <h2>How I built it</h2>
                  <p>{study.approach}</p>
                </div>
                <div>
                  <h2>Key decisions</h2>
                  <ol className="case-decisions">
                    {study.decisions.map((choice) => (
                      <li key={choice}>{choice}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h2>What I’d change</h2>
                  <p>{study.retrospective}</p>
                </div>
              </div>
              <aside className="case-stack">
                <h2 className="quiet-label">Built with</h2>
                <ul>
                  {project.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </article>
          <div className="case-handoff">
            <div>
              <div className="folio-kicker">Work with Joseph</div>
              <h2>Have a similar project?</h2>
            </div>
            <Link className="btn-citron-pill" to="/#contact">
              Start a similar project <ArrowRight size={17} />
            </Link>
          </div>
          <Link className="next-story" to={`/case-study/${next.id}`} state={{ entry: 'next_case' }}>
            <span className="quiet-label">Next case study</span>
            <strong>{next.name}</strong>
            <ArrowRight size={20} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
