import { useEffect } from 'react';
import { Link, useLinkClickHandler, useLocation, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CustomCursor from '../components/CustomCursor.jsx';
import ProjectVisual from '../components/ProjectVisual.jsx';
import WorkFacts from '../components/WorkFacts.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import CitedAnswer from '../components/CitedAnswer.jsx';
import CaseStudyNote from '../components/CaseStudyNote.jsx';
import ReviveTouchDemo from '../components/ReviveTouchDemo.jsx';
import { WORK_INDEX } from '../data/projects.js';
import { companionFor } from '../utils/companionReading.js';
import { getAllPosts } from '../utils/blog.js';
import { archiveSearch } from '../utils/workArchive.js';
import { recordCaseView } from '../utils/portfolioAnalytics.js';

export default function CaseStudy() {
  const { id } = useParams();
  const { search, state } = useLocation();
  const index = WORK_INDEX.findIndex((record) => record.id === id);
  const project = WORK_INDEX[index];
  const next = WORK_INDEX[(index + 1) % WORK_INDEX.length];
  // Keep the existing /#contact handoff on a normal click. A copied link or
  // modifier click can't carry history state, so its href carries the public slug.
  const startSimilar = useLinkClickHandler('/#contact', { state: { briefProject: id } });
  useEffect(() => {
    if (project?.caseStudy) recordCaseView(project.id, state?.entry);
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
  const buildNote = companionFor(`/case-study/${id}`, getAllPosts());
  const { sample } = project;
  const hasBooking = sample?.kind === 'booking';
  const citedExchange = sample?.kind === 'citation' && visual?.exchange;
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="case-page">
        <div className="wrap">
          <nav className="case-breadcrumb" aria-label="Breadcrumb">
            <Link to={returnPath}>
              <ArrowLeft size={16} />{' '}
              {fromGallery
                ? 'Back to 3D gallery'
                : fromArchive
                  ? 'Back to project archive'
                  : 'Back to selected work'}
            </Link>
            <span className="quiet-label" aria-current="page">Case study / {name}</span>
          </nav>
          <article aria-labelledby="case-title">
            <div className="case-opening">
              <div className="case-lead">
                <div className="folio-kicker">{project.discipline || project.category}</div>
                <h1 id="case-title" data-route-title tabIndex={-1}>
                  {name}
                </h1>
                <p>{project.summary || project.description}</p>
                <WorkFacts project={project} />
                {hasBooking && (
                  <Link to={{ search, hash: sample.hash }} state={state} className="text-link demo-jump">
                    {sample.label} <ArrowDown size={16} aria-hidden="true" />
                  </Link>
                )}
                {(buildNote || project.live || project.github) && (
                  <div className="case-resources">
                    {buildNote && (
                      <Link className="text-link build-note-link" to={buildNote.href}>
                        {buildNote.label} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    )}
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
                <ProjectVisual project={project} detailed>
                  {citedExchange && (
                    <Link className="figure-trace" to={{ search, hash: sample.hash }} state={state}>
                      Trace the sample citation <ArrowDown size={14} aria-hidden="true" />
                    </Link>
                  )}
                </ProjectVisual>
              </div>
            </div>
            {citedExchange && <CitedAnswer exchange={citedExchange} />}
            <div className="case-result">
              <h2 className="quiet-label">{study.outcomeLabel || 'What shipped'}</h2>
              <div>
                <p className="case-outcome">{study.outcome}</p>
                <CaseStudyNote
                  projectNote={study.projectNote}
                  approvedTestimonial={study.approvedTestimonial}
                />
              </div>
            </div>
            {hasBooking && <ReviveTouchDemo sample={sample} />}
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
                {study.retrospective && (
                  <div>
                    <h2>What I’d change</h2>
                    <p>{study.retrospective}</p>
                  </div>
                )}
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
              <h2 id="case-inquiry-title">Have a similar project?</h2>
            </div>
            <a
              data-needs-js
              className="btn-citron-pill"
              href={`/?reference=${encodeURIComponent(project.id)}#contact`}
              onClick={startSimilar}
            >
              Start a similar project <ArrowRight size={17} aria-hidden="true" />
            </a>
            <noscript>
              <details className="case-native-inquiry contact-fields">
                <summary>Start a similar project</summary>
                <InquiryForm project={project} labelledBy="case-inquiry-title" native />
                <a className="text-link" href="/#contact">Other contact options</a>
              </details>
            </noscript>
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
