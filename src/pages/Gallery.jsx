import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Smooth3DSlideshow from '../components/originkit/ui/coverflowgallery.tsx';

// One active index drives the existing coverflow, its controls and its case link.
export default function Gallery({ projects, index, onSelect, category }) {
  const current = projects[index];
  const slides = projects.map((project) => ({
    image: {
      src: project.visual?.src || project.image,
      alt: project.visual?.kind === 'screenshot' ? project.visual.alt : `${project.name} artwork`,
      fit: project.visual?.kind === 'workflow' ? 'cover' : 'contain',
    },
    background: project.gradient,
    title: project.name,
  }));
  const step = (by) => onSelect((index + by + projects.length) % projects.length);

  return (
    <div data-needs-js className="archive-deck">
      <div className="archive-stage">
        <Smooth3DSlideshow
          slides={slides}
          activeIndex={index}
          onActiveChange={onSelect}
          label="Project covers"
          showTitle={false}
          radius={2}
          gap={7}
          tilt={14}
          sideTilt={7}
          opacity={64}
        />
        <Link
          className="deck-case-link"
          to={`/case-study/${current.id}`}
          state={{ entry: 'work_gallery', category }}
          aria-label={`Read the ${current.name} case study`}
        >
          <span className="deck-medium quiet-label">
            {current.visual?.kind === 'screenshot' ? 'UI capture · Sample data' : 'Project artwork'}
          </span>
          <span className="deck-open">
            Read case study <ArrowRight size={15} aria-hidden="true" />
          </span>
        </Link>
        {projects.length > 1 && (
          <div className="deck-controls" role="group" aria-label="Choose a project">
            <button type="button" onClick={() => step(-1)} aria-label="Previous project">
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next project">
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <div className="deck-caption">
        <div aria-live="polite" aria-atomic="true">
          <span className="quiet-label">
            Cover {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <h2>{current.name}</h2>
          <p>{current.summary || current.description}</p>
        </div>
      </div>
    </div>
  );
}
