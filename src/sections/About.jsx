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
                Joseph Onifade
              </h2>
              <span className="quiet-label">Lagos, Nigeria</span>
            </div>
          </div>
          <p className="support-copy">
            I’m a full-stack developer and AI engineer. I build tools for the moments when work changes hands:
            a player reaching event staff, or a reader tracing an answer to its source.
          </p>
          <p className="learning-line">Currently exploring blockchain and 3D with Blender.</p>
        </div>
        <Skills />
      </div>
    </section>
  );
}
