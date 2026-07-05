import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Contact from './components/Contact.jsx';
import ArchDivider from './components/ArchDivider.jsx';
import Hero from './sections/Hero.jsx';
import StatsBar from './sections/StatsBar.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';
import Services from './sections/Services.jsx';
import Testimonials from './sections/Testimonials.jsx';

export default function App() {
  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain" />
      <CustomCursor />
      <Navbar />

      <main>
        {/* Hero — dark bg */}
        <div style={{ background: 'var(--bg)' }}>
          <Hero />
        </div>

        {/* Dark → dark-surface arch */}
        <ArchDivider fromColor="var(--bg)" toColor="var(--surface)" direction="down" height={72} />

        {/* Stats — surface */}
        <div style={{ background: 'var(--surface)', paddingBottom: 0 }}>
          <StatsBar />
        </div>

        {/* Surface → bg arch */}
        <ArchDivider fromColor="var(--surface)" toColor="var(--bg)" direction="up" height={72} />

        {/* About — dark */}
        <div style={{ background: 'var(--bg)' }}>
          <About />
        </div>

        {/* Dark → surface-2 arch */}
        <ArchDivider fromColor="var(--bg)" toColor="var(--surface-2)" direction="down" height={72} />

        {/* Projects — surface-2 */}
        <div style={{ background: 'var(--surface-2)' }}>
          <Projects />
        </div>

        {/* Surface-2 → bg arch */}
        <ArchDivider fromColor="var(--surface-2)" toColor="var(--bg)" direction="up" height={72} />

        {/* Skills — dark */}
        <div style={{ background: 'var(--bg)' }}>
          <Skills />
        </div>

        {/* Dark → surface arch */}
        <ArchDivider fromColor="var(--bg)" toColor="var(--surface)" direction="down" height={72} />

        {/* Services — surface */}
        <div style={{ background: 'var(--surface)' }}>
          <Services />
        </div>

        {/* Surface → bg arch */}
        <ArchDivider fromColor="var(--surface)" toColor="var(--bg)" direction="up" height={72} />

        {/* Testimonials — dark */}
        <div style={{ background: 'var(--bg)' }}>
          <Testimonials />
        </div>

        {/* Dark → surface-2 arch */}
        <ArchDivider fromColor="var(--bg)" toColor="var(--surface-2)" direction="down" height={72} />

        {/* Contact — surface-2 */}
        <div style={{ background: 'var(--surface-2)' }}>
          <Contact />
        </div>
      </main>
    </>
  );
}
