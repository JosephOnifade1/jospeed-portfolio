import { ArrowUpRight, CornerDownRight, Layers2 } from 'lucide-react';

// Evidence is shared between the work index and the case study. An approved
// client capture can replace an illustration through the project's visual record.
export default function ProjectVisual({ project, detailed = false }) {
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
            <div className="dispatch-ticket" role="img" aria-label={visual.alt}>
              <div className="dispatch-top" aria-hidden="true">
                <span>Player request</span>
                <Layers2 size={15} />
              </div>
              <div className="dispatch-table" aria-hidden="true">
                Table <b>14</b>
              </div>
              <div className="dispatch-service" aria-hidden="true">
                Table-side massage
              </div>
              <div className="dispatch-queue" aria-hidden="true">
                <CornerDownRight size={15} />
                <span>Staff queue</span>
                <b>New</b>
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
            <>
              <br />
              <a className="figure-zoom" href={visual.src} target="_blank" rel="noreferrer">
                View full-size capture <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
