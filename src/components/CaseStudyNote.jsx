// Only store publication-ready words and credit in approvedTestimonial.
// Editorial notes use their own label and never get a client attribution.
export default function CaseStudyNote({ projectNote, approvedTestimonial }) {
  const hasFeedback = Boolean(approvedTestimonial?.quote?.trim() && approvedTestimonial?.credit?.trim());
  if (!hasFeedback && !projectNote) return null;

  return (
    <aside id="project-note" className="case-note" aria-labelledby="case-note-label">
      <h3 id="case-note-label" className="folio-kicker" data-section-title tabIndex={-1}>
        {hasFeedback ? 'Client feedback' : 'Project note'}
      </h3>
      {hasFeedback ? (
        <figure>
          <blockquote>{approvedTestimonial.quote}</blockquote>
          <figcaption>{approvedTestimonial.credit}</figcaption>
        </figure>
      ) : (
        <>
          <p className="case-note-title">{projectNote.title}</p>
          <p className="case-note-text">{projectNote.text}</p>
        </>
      )}
    </aside>
  );
}
