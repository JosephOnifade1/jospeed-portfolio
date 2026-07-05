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
import AutomationDemo from './sections/AutomationDemo.jsx';

export default function App() {
  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <Navbar />
      <main>

        {/* DARK: Hero */}
        <div style={{ background: '#4D2622' }}>
          <Hero />
        </div>

        <ArchDivider type="dome-up" height={130} />

        {/* CREAM: Stats */}
        <div style={{ background: '#F2ECD1' }}>
          <StatsBar />
        </div>

        <ArchDivider type="dome-down" height={130} />

        {/* DARK: About */}
        <div style={{ background: '#4D2622' }}>
          <About />
        </div>

        <ArchDivider type="dome-up" height={130} />

        {/* CREAM: Projects */}
        <div style={{ background: '#F2ECD1' }}>
          <Projects />
        </div>

        <ArchDivider type="dome-down" height={130} />

        {/* DARK: Automation Demo */}
        <div style={{ background: '#4D2622' }}>
          <AutomationDemo />
        </div>

        <ArchDivider type="dome-up" height={130} />

        {/* CREAM: Skills */}
        <div style={{ background: '#F2ECD1' }}>
          <Skills />
        </div>

        <ArchDivider type="dome-down" height={130} />

        {/* DARK: Services */}
        <div style={{ background: '#4D2622' }}>
          <Services />
        </div>

        <ArchDivider type="dome-up" height={130} />

        {/* CREAM: Testimonials */}
        <div style={{ background: '#F2ECD1' }}>
          <Testimonials />
        </div>

        <ArchDivider type="dome-down" height={130} />

        {/* DARK: Contact */}
        <div style={{ background: '#4D2622' }}>
          <Contact />
        </div>

      </main>
    </>
  );
}
