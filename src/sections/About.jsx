import { FileDown } from 'lucide-react';
import { locationLabel, profile } from '../data/profile.js';
import Skills from './Skills.jsx';

export default function About() {
  return (
    <section id="about" className="folio-section about-section" aria-labelledby="about-title">
      <div className="wrap about-layout">
        <div>
          <div className="folio-kicker">02 / About the developer</div>
          <div className="about-person">
            <img src="/profile.jpg" width="88" height="88" loading="lazy" alt="JOspeed’s astronaut avatar" />
            <div>
              <h2 id="about-title" className="support-title" data-section-title tabIndex={-1}>
                {profile.name}
              </h2>
              <span className="quiet-label">{locationLabel}</span>
            </div>
          </div>
          <p className="support-copy">
            I’m a full-stack software engineer and AI engineer. I build tools for the moments when work changes hands:
            a poker player booking a session with a therapist, or a reader tracing an answer to its source.
          </p>
          <p className="learning-line">Currently exploring blockchain and 3D with Blender.</p>
          <a className="about-resume" href={profile.resume} download>
            <FileDown size={16} aria-hidden="true" />
            <span>Download résumé</span>
            <small>PDF · 1 page</small>
          </a>
        </div>
        <Skills />
      </div>
    </section>
  );
}
