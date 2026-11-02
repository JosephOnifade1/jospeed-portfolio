import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import SmoothScroll from './components/SmoothScroll.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import FormCursor from './components/FormCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Contact from './components/Contact.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';
import Services from './sections/Services.jsx';
import Testimonials from './sections/Testimonials.jsx';
import AutomationDemo from './sections/AutomationDemo.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import Gallery from './pages/Gallery.jsx';

function Portfolio() {
  return (
    <SmoothScroll>
      <div className="grain" />
      <CustomCursor />
      <FormCursor />
      <Navbar />
      <main role="main" aria-label="Joseph Onifade Portfolio" style={{ background: 'var(--ink)' }}>
        <Hero />
        <About />
        <Projects />
        <AutomationDemo />
        <Skills />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/coverflow" element={<Gallery />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
