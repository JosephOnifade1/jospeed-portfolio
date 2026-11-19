import { Link, useLocation } from 'react-router-dom';
import { CornerDownRight, CornerUpLeft, FileText } from 'lucide-react';

// A walk through the recorded sample, not a live model or a pretend PDF viewer.
export default function CitedAnswer({ exchange }) {
  const { search, hash, state } = useLocation();
  const { question, answer, citation } = exchange;
  const reference = `citation-${citation.number}`;
  const source = `source-${citation.number}`;
  const atSource = hash === `#${source}`;

  return (
    <section id="sample-answer" className="sample-exchange" aria-labelledby="sample-question">
      <div className="exchange-answer">
        <div className="folio-kicker">Sample question &amp; answer</div>
        <h2 id="sample-question" data-section-title tabIndex={-1}>
          {question}
        </h2>
        <p>
          {answer}{' '}
          <Link
            className="citation-link"
            id={reference}
            tabIndex={0}
            to={{ search, hash: `#${source}` }}
            state={state}
            aria-label={`[${citation.number}] View source: ${citation.document}, page ${citation.page}`}
          >
            <span>[{citation.number}]</span> View source <CornerDownRight size={14} aria-hidden="true" />
          </Link>
        </p>
      </div>
      <figure
        id={source}
        tabIndex={-1}
        className="source-slip"
        data-selected={atSource ? '' : undefined}
        aria-labelledby={`${source}-caption`}
        aria-describedby={`${source}-passage`}
      >
        <figcaption id={`${source}-caption`}>
          <span className="source-file">
            <FileText size={17} aria-hidden="true" /> <cite>{citation.document}</cite>
          </span>
          <span className="source-page">page {citation.page}</span>
        </figcaption>
        <blockquote id={`${source}-passage`}>
          “<mark>{citation.passage}</mark>”
        </blockquote>
        <div className="source-foot">
          <span>Sample policy · Source [{citation.number}]</span>
          <Link to={{ search, hash: `#${reference}` }} state={state}>
            <CornerUpLeft size={14} aria-hidden="true" /> Back to answer
          </Link>
        </div>
      </figure>
    </section>
  );
}
