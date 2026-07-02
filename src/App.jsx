import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Contact from './components/Contact.jsx';
import AIChat from './components/AIChat.jsx';
import Hero from './sections/Hero.jsx';
import StatsBar from './sections/StatsBar.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';
import Services from './sections/Services.jsx';
import Testimonials from './sections/Testimonials.jsx';
import AutomationDemo from './sections/AutomationDemo.jsx';
import CaseStudy from './pages/CaseStudy.jsx';

function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <About />
      <Projects />
      <AutomationDemo />
      <Skills />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain" />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
      </Routes>
      <AIChat />
    </BrowserRouter>
  );
}
