import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor.jsx';
import FormCursor from './components/FormCursor.jsx';
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
import CaseStudy from './pages/CaseStudy.jsx';

function Portfolio() {
  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <FormCursor />
      <Navbar />
      <main role="main" aria-label="Joseph Onifade Portfolio">

        <div style={{ background: '#4D2622' }}><Hero /></div>
        <ArchDivider type="dome-up" height={90} />

        <div style={{ background: '#F2ECD1' }}><StatsBar /></div>
        <ArchDivider type="dome-down" height={90} />

        <div style={{ background: '#4D2622' }}><About /></div>
        <ArchDivider type="dome-up" height={90} />

        <div style={{ background: '#F2ECD1' }}><Projects /></div>
        <ArchDivider type="dome-down" height={90} />

        <div style={{ background: '#4D2622' }}><AutomationDemo /></div>
        <ArchDivider type="dome-up" height={90} />

        <div style={{ background: '#F2ECD1' }}><Skills /></div>
        <ArchDivider type="dome-down" height={90} />

        <div style={{ background: '#4D2622' }}><Services /></div>
        <ArchDivider type="dome-up" height={90} />

        <div style={{ background: '#F2ECD1' }}><Testimonials /></div>
        <ArchDivider type="dome-down" height={90} />

        <div style={{ background: '#4D2622' }}><Contact /></div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}
