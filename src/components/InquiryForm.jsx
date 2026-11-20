import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { recordInquiry } from '../utils/portfolioAnalytics.js';

const CONTACT_ENDPOINT = 'https://formspree.io/f/xwloqglp';

// The same named controls feed the enhanced JSON request and the native POST.
export default function InquiryForm({ project, labelledBy, native = false, onNoteChange }) {
  const [removedProject, setRemovedProject] = useState(null);
  const [status, setStatus] = useState('idle');
  const confirmation = useRef(null);
  const message = useRef(null);
  const reference = project && project.id !== removedProject ? project.name : null;

  useEffect(() => {
    if (status === 'done') confirmation.current?.focus({ preventScroll: true });
  }, [status]);

  function removeReference() {
    setRemovedProject(project.id);
    message.current?.focus();
  }

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
    onNoteChange?.('');
    setStatus('done');
    recordInquiry();
  }

  if (status === 'done') {
    return (
      <div className="message-confirmed" ref={confirmation} tabIndex={-1} role="status">
        <CheckCircle2 size={28} aria-hidden="true" />
        <h3>Message sent.</h3>
        <p>Thanks for getting in touch. I’ll reply by email.</p>
      </div>
    );
  }
  return (
    <form
      method="post"
      action={CONTACT_ENDPOINT}
      onSubmit={native ? undefined : submit}
      aria-labelledby={labelledBy}
      aria-busy={status === 'sending'}
    >
      <div className="contact-pair">
        <label htmlFor="name">
          Your name
          <input id="name" name="name" autoComplete="name" required placeholder="Name" />
        </label>
        <label htmlFor="email">
          Email address
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
      </div>
      <div className="contact-message">
        <label htmlFor="message">About your project or role</label>
        {reference && (native ? (
          <label className="native-reference">
            <input name="reference" type="checkbox" value={reference} defaultChecked />
            Include reference: {reference}
          </label>
        ) : (
          <div className="inquiry-reference">
            <input name="reference" type="hidden" value={reference} />
            <span id="message-reference">Reference: <strong>{reference}</strong></span>
            <button
              type="button"
              aria-label={`Remove ${reference} reference`}
              disabled={status === 'sending'}
              onClick={removeReference}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        ))}
        <textarea
          ref={message}
          id="message"
          name="message"
          rows={4}
          required
          aria-describedby={reference && !native ? 'message-reference' : undefined}
          placeholder="What’s the project or opportunity?"
          onChange={(event) => onNoteChange?.(event.target.value)}
        />
      </div>
      {status === 'error' && (
        <p className="message-error" role="alert">Your message didn’t send. Try again or use the email link below.</p>
      )}
      <button className="btn-citron-pill" disabled={status === 'sending'} type="submit">
        {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
