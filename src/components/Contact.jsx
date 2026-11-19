import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { recordInquiry } from '../utils/portfolioAnalytics.js';

const EMAIL = 'josephonifade21@gmail.com';

export default function Contact() {
  const { hash } = useLocation();
  const [status, setStatus] = useState('idle');
  const confirmation = useRef(null);
  useEffect(() => {
    if (status === 'done') confirmation.current?.focus({ preventScroll: true });
  }, [status]);

  async function submit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xpwzrpdb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Message not accepted');
    } catch {
      setStatus('error');
      return;
    }
    form.reset();
    setStatus('done');
    recordInquiry();
  }

  return (
    <section
      id="contact"
      className="folio-section contact-section"
      aria-labelledby="contact-title"
      data-arrival={hash === '#contact' ? '' : undefined}
    >
      <div className="wrap contact-layout">
        <div className="contact-invitation">
          <div className="folio-kicker">04 / Get in touch</div>
          <h2 id="contact-title" data-section-title tabIndex={-1}>
            What would you
            <br /> like to build?
          </h2>
          <p>Who is it for, and what should it help them do? A rough idea is a good place to start.</p>
        </div>
        <div className="contact-fields">
          {status === 'done' ? (
            <div className="message-confirmed" ref={confirmation} tabIndex={-1} role="status">
              <CheckCircle2 size={28} aria-hidden="true" />
              <h3>Message sent.</h3>
              <p>Thanks for telling me about your project. I’ll reply by email.</p>
            </div>
          ) : (
            <form onSubmit={submit} aria-labelledby="contact-title" aria-busy={status === 'sending'}>
              <div className="contact-pair">
                <label htmlFor="name">
                  Your name
                  <input id="name" name="name" autoComplete="name" required placeholder="Name" />
                </label>
                <label htmlFor="email">
                  Email address
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label htmlFor="message">
                About your project
                <textarea id="message" name="message" rows={4} required placeholder="I’d like to build…" />
              </label>
              {status === 'error' && (
                <p className="message-error" role="alert">
                  Your message didn’t send. Try again or use the email link below.
                </p>
              )}
              <button className="btn-citron-pill" disabled={status === 'sending'} type="submit">
                {status === 'sending' ? 'Sending…' : 'Send message'}{' '}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>
          )}
          <p className="email-fallback">
            <Mail size={15} aria-hidden="true" />
            <span>
              Prefer email? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
