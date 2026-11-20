import { ArrowUpRight, CalendarCheck, Check } from 'lucide-react';

// Evidence is shared between the work index and the case study. An approved
// client capture can replace an illustration through the project's visual record.
export default function ProjectVisual({ project, detailed = false, children }) {
  const { visual, image, name } = project;
  if (!visual)
    return image ? (
      <figure className="project-figure">
        <img className="archive-art" src={image} alt={`${name} project overview`} />
      </figure>
    ) : null;

  const workflow = visual.kind === 'workflow';
  return (
    <figure className="project-figure">
      <div className={`project-plate ${workflow ? 'plate-workflow' : `plate-screen plate-${visual.theme}`}`}>
        {workflow ? (
          <>
            <img className="table-art" src={visual.src} alt="" width="1260" height="845" decoding="async" />
            <div className="plate-label">
              <span className="plate-cross" aria-hidden="true">
                +
              </span>{' '}
              {visual.label}
            </div>
            <div className="booking-slip" role="img" aria-label={visual.alt}>
              <div className="slip-heading" aria-hidden="true">
                <span>Sample booking</span>
                <CalendarCheck size={15} />
              </div>
              <div className="slip-time" aria-hidden="true">
                <b>{project.sample.exampleTime}</b>
              </div>
              <div className="slip-service" aria-hidden="true">
                {project.sample.service}
              </div>
              <div className="slip-status" aria-hidden="true">
                <Check size={15} /> Booking confirmed
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="plate-label">
              <span className="plate-cross" aria-hidden="true">
                +
              </span>{' '}
              {visual.label} {visual.note && <span>/ {visual.note}</span>}
            </div>
            <img
              className="screen-capture"
              src={visual.src}
              alt={visual.alt}
              loading="lazy"
              decoding="async"
            />
          </>
        )}
      </div>
      {detailed && (
        <figcaption>
          {visual.caption}
          {!workflow && (
            <div className="figure-actions">
              {children}
              <a className="figure-zoom" href={visual.src} target="_blank" rel="noreferrer">
                View full-size capture <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
}
