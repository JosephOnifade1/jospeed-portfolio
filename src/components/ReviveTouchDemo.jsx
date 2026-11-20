import { useReducer, useRef } from 'react';
import { ArrowRight, CalendarDays, Check, RotateCcw, Smartphone } from 'lucide-react';
import '../styles/booking-demo.css';

// Both views read one fictional schedule. Nothing is persisted or sent to Convex.
const initial = { selected: null, booked: null, closed: [], notice: 'Choose an open time to get started.' };
function update(schedule, { type, time }) {
  const { selected, booked, closed } = schedule;
  switch (type) {
    case 'select':
      if (booked || closed.includes(time)) return schedule;
      return { ...schedule, selected: time, notice: `${time} selected. Confirm to book this session.` };
    case 'confirm':
      if (!selected || booked || closed.includes(selected)) return schedule;
      return {
        ...schedule,
        booked: selected,
        selected: null,
        notice: `${selected} confirmed. The booking is on the therapist’s schedule.`,
      };
    case 'toggle': {
      if (time === booked) return schedule;
      const reopening = closed.includes(time);
      return {
        ...schedule,
        closed: reopening ? closed.filter((t) => t !== time) : [...closed, time],
        selected: selected === time ? null : selected,
        notice: reopening ? `${time} is open again.` : `${time} is closed and cannot be booked.`,
      };
    }
    case 'reset':
      return initial;
    default:
      return schedule;
  }
}

export default function ReviveTouchDemo({ sample }) {
  const { service, times, exampleTime } = sample;
  const [schedule, dispatch] = useReducer(update, initial);
  const { selected, booked, closed, notice } = schedule;
  const title = useRef(null);

  function reset() {
    dispatch({ type: 'reset' });
    title.current?.focus({ preventScroll: true });
  }

  return (
    <section className="booking-demo" id="demo" aria-labelledby="demo-title">
      <div className="folio-kicker">Revive Touch / Interactive sample</div>
      <h2 ref={title} id="demo-title" className="support-title" data-section-title tabIndex={-1}>
        Try a sample booking.
      </h2>
      <p className="demo-intro">
        Choose a massage time as a player, then check the therapist’s schedule. The times are fictional;
        no real booking is made.
      </p>
      <noscript>
        <p className="demo-intro">
          For example, selecting {exampleTime} leaves the slot open. Confirming it gives the player a{' '}
          {exampleTime} booking and marks that time as booked for the therapist. Enable JavaScript to try both views.
        </p>
      </noscript>
      <div data-needs-js className="booking-board">
        <div className="booking-player" role="group" aria-label="Player view">
          <div className="booking-kicker"><Smartphone size={16} aria-hidden="true" /> Player view</div>
          <h3>{service}</h3>
          {booked ? (
            <div className="booking-receipt">
              <span>Session booked</span>
              <strong>{booked}</strong>
              <span>Sample tournament · {service}</span>
            </div>
          ) : (
            <fieldset className="booking-choices">
              <legend>
                {closed.length === times.length
                  ? 'No times open — reopen a slot in the therapist view'
                  : 'Choose a start time'}
              </legend>
              {times.map((time) => (
                <label key={time}>
                  <input
                    type="radio"
                    name="sample-time"
                    value={time}
                    checked={selected === time}
                    disabled={closed.includes(time)}
                    onChange={() => dispatch({ type: 'select', time })}
                  />
                  <span>
                    {time}
                    <small>{closed.includes(time) ? 'Closed' : selected === time ? 'Selected' : 'Open'}</small>
                  </span>
                </label>
              ))}
            </fieldset>
          )}
          <button
            type="button"
            className="booking-confirm"
            disabled={!selected && !booked}
            aria-disabled={booked ? true : undefined}
            aria-controls="therapist-schedule"
            onClick={() => dispatch({ type: 'confirm' })}
          >
            {booked ? (
              <><Check size={16} aria-hidden="true" /> Booking confirmed</>
            ) : (
              <>Confirm booking <ArrowRight size={16} aria-hidden="true" /></>
            )}
          </button>
        </div>
        <div className="booking-schedule" role="group" aria-label="Therapist view">
          <div className="booking-kicker"><CalendarDays size={16} aria-hidden="true" /> Therapist view</div>
          <h3>Session schedule</h3>
          <p>Close or reopen an unbooked time.</p>
          <ul id="therapist-schedule" aria-label="Sample session times">
            {times.map((time) => {
              const status = booked === time ? 'Booked' : closed.includes(time) ? 'Closed' : 'Open';
              const action = status === 'Closed' ? 'Reopen' : 'Close';
              return (
                <li key={time}>
                  <strong>{time}</strong>
                  <span className={`slot-status is-${status.toLowerCase()}`}>{status}</span>
                  {status === 'Booked' ? (
                    <span className="slot-service"><Check size={14} aria-hidden="true" /> {service}</span>
                  ) : (
                    <button
                      type="button"
                      aria-label={`${action} ${time} slot`}
                      onClick={() => dispatch({ type: 'toggle', time })}
                    >
                      {action}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div data-needs-js className="booking-foot">
        <p role="status" aria-atomic="true">{notice}</p>
        <button type="button" disabled={schedule === initial} onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" /> Reset demo
        </button>
      </div>
    </section>
  );
}
