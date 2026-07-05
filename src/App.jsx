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

// Pattern from reference site:
// Dark section → cream dome arches UP → cream section → dark dome arches UP → dark section → repeat

export default function App() {
  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <Navbar />
      <main>

        {/* ── DARK: Hero ── */}
        <div style={{ background: '#4D2622' }}>
          <Hero />
        </div>

        {/* Dark → Cream: cream dome rises up into dark */}
        <ArchDivider type="dome-up" height={130} />

        {/* ── CREAM: Stats ── */}
        <div style={{ background: '#F2ECD1' }} className="on-cream">
          <StatsBar />
        </div>

        {/* Cream → Dark: dark dome rises up into cream */}
        <ArchDivider type="dome-down" height={130} />

        {/* ── DARK: About ── */}
        <div style={{ background: '#4D2622' }}>
          <About />
        </div>

        {/* Dark → Cream */}
        <ArchDivider type="dome-up" height={130} />

        {/* ── CREAM: Projects ── */}
        <div style={{ background: '#F2ECD1' }} className="on-cream">
          <Projects />
        </div>

        {/* Cream → Dark */}
        <ArchDivider type="dome-down" height={130} />

        {/* ── DARK: Skills ── */}
        <div style={{ background: '#4D2622' }}>
          <Skills />
        </div>

        {/* Dark → Cream */}
        <ArchDivider type="dome-up" height={130} />

        {/* ── CREAM: Services ── */}
        <div style={{ background: '#F2ECD1' }} className="on-cream">
          <Services />
        </div>

        {/* Cream → Dark */}
        <ArchDivider type="dome-down" height={130} />

        {/* ── DARK: Testimonials ── */}
        <div style={{ background: '#4D2622' }}>
          <Testimonials />
        </div>

        {/* Dark → Cream */}
        <ArchDivider type="dome-up" height={130} />

        {/* ── CREAM: Contact ── */}
        <div style={{ background: '#F2ECD1' }} className="on-cream">
          <Contact />
        </div>

      </main>
    </>
  );
}
