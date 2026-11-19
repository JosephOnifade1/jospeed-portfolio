import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail } from 'lucide-react';
import { UpworkIcon } from './BrandIcons.jsx';
import UpworkBrief from './UpworkBrief.jsx';
import UpworkProfileLink from './UpworkProfileLink.jsx';
import { locationLabel, profile } from '../data/profile.js';
import { recordInquiry } from '../utils/portfolioAnalytics.js';

const CONTACT_ENDPOINT = 'https://formspree.io/f/xpwzrpdb';

export default function Contact() {
  const { hash, state } = useLocation();
  const [projectNote, setProjectNote] = useState('');
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
      const res = await fetch(CONTACT_ENDPOINT, {
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
    setProjectNote('');
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
            Have a project or a role in mind? Let’s talk.
          </h2>
          <p>I’m based in {locationLabel}. Tell me what you want to build or what your team is hiring for.</p>
        </div>
        <div className="contact-fields">
          {status === 'done' ? (
            <div className="message-confirmed" ref={confirmation} tabIndex={-1} role="status">
              <CheckCircle2 size={28} aria-hidden="true" />
              <h3>Message sent.</h3>
              <p>Thanks for getting in touch. I’ll reply by email.</p>
            </div>
          ) : (
            <form
              method="post"
              action={CONTACT_ENDPOINT}
              onSubmit={submit}
              aria-labelledby="contact-title"
              aria-busy={status === 'sending'}
            >
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
              <div className="contact-message">
                <label htmlFor="message">About your project or role</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="What’s the project or opportunity?"
                  value={projectNote}
                  onChange={(event) => setProjectNote(event.target.value)}
                />
              </div>
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
              Prefer email? <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          </p>
        </div>
        <div className="upwork-handoff">
          <UpworkProfileLink
            className="upwork-card"
            aria-label="Hire me on Upwork (opens in a new tab)"
            aria-describedby="upwork-invite"
          >
            <span className="upwork-mark">
              <UpworkIcon size={28} />
            </span>
            <span className="upwork-copy">
              <span className="quiet-label">Freelance profile</span>
              <strong>Hire me on Upwork</strong>
              <span id="upwork-invite">Have a job post? Send me an invitation.</span>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </UpworkProfileLink>
          <UpworkBrief
            projectId={state?.briefProject}
            projectNote={projectNote}
            linked={hash === '#upwork-brief'}
          />
        </div>
      </div>
    </section>
  );
}
