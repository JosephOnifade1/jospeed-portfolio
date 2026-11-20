import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { UpworkIcon } from './BrandIcons.jsx';
import UpworkBrief from './UpworkBrief.jsx';
import UpworkProfileLink from './UpworkProfileLink.jsx';
import { locationLabel, profile } from '../data/profile.js';
import { WORK_INDEX } from '../data/projects.js';
import InquiryForm from './InquiryForm.jsx';

export default function Contact() {
  const { hash, search, state } = useLocation();
  const [projectNote, setProjectNote] = useState('');
  const referenceId = hash === '#contact'
    ? state?.briefProject ?? new URLSearchParams(search).get('reference')
    : null;
  const project = WORK_INDEX.find((item) => item.id === referenceId);

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
          <InquiryForm project={project} labelledBy="contact-title" onNoteChange={setProjectNote} />
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
            project={project}
            projectNote={projectNote}
            linked={hash === '#upwork-brief'}
          />
        </div>
      </div>
    </section>
  );
}
