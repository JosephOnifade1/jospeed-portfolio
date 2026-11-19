import { useRef, useState } from 'react';
import { ArrowRight, Check, Inbox, ListOrdered, RotateCcw, Smartphone } from 'lucide-react';
import '../styles/request-demo.css';

// An illustrative, in-memory handoff. No client accounts, real requests or persistence.
export default function ReviveTouchDemo() {
  const [stage, setStage] = useState('ready');
  const requestButton = useRef(null);
  const queued = stage !== 'ready';
  const seen = stage === 'seen';

  function reset() {
    setStage('ready');
    requestButton.current?.focus({ preventScroll: true });
  }

  return (
    <section className="request-demo" id="demo" aria-labelledby="demo-title">
      <div className="folio-kicker">Interactive demo / Sample workflow</div>
      <h2 className="support-title" id="demo-title" data-section-title tabIndex={-1}>
        Try a table request.
      </h2>
      <p className="demo-intro">
        Play both sides: send a table-side massage request, then acknowledge it as event staff.
      </p>
      <div className="demo-board">
        <div className="demo-player" role="group" aria-label="Player view">
          <div className="demo-panel-heading">
            <Smartphone size={16} aria-hidden="true" /> Player view
          </div>
          <div className="demo-seat">
            <span>Table</span> 14
          </div>
          <p>Table-side massage</p>
          <button
            type="button"
            ref={requestButton}
            className="demo-send"
            aria-disabled={queued}
            aria-controls="demo-queue"
            onClick={() => {
              if (!queued) setStage('queued');
            }}
          >
            {queued ? (
              <>
                <Check size={16} aria-hidden="true" /> {seen ? 'Seen by staff' : 'Request queued'}
              </>
            ) : (
              <>
                Request service at Table 14 <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        <div className="demo-staff" id="demo-queue" role="group" aria-label="Staff queue">
          <div className="demo-panel-heading">
            <ListOrdered size={17} aria-hidden="true" /> Staff queue <span>{queued ? '01' : '00'}</span>
          </div>
          {queued ? (
            <div className="demo-ticket">
              <div className="demo-ticket-top">
                <span>Request / 001</span>
                <b>{seen ? 'Seen' : 'New'}</b>
              </div>
              <strong>Table 14</strong>
              <p>Table-side massage</p>
              <button
                type="button"
                aria-disabled={seen}
                onClick={() => {
                  if (!seen) setStage('seen');
                }}
              >
                <Check size={15} aria-hidden="true" /> {seen ? 'Acknowledged' : 'Acknowledge request'}
              </button>
            </div>
          ) : (
            <div className="demo-empty">
              <Inbox size={24} aria-hidden="true" />
              <strong>Queue is empty</strong>
              <p>Your sample ticket will appear here.</p>
            </div>
          )}
        </div>
      </div>
      <div className="demo-foot">
        <p>Sample data only. No real service request is sent.</p>
        <button type="button" onClick={reset} disabled={!queued}>
          <RotateCcw size={14} aria-hidden="true" /> Reset demo
        </button>
      </div>
      <p className="demo-announcement" role="status" aria-atomic="true">
        {seen
          ? 'Staff acknowledged the request from Table 14.'
          : queued
            ? 'New request from Table 14 added to the staff queue.'
            : 'The sample staff queue is empty.'}
      </p>
    </section>
  );
}
