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
import BlogInsights from './sections/BlogInsights.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import Gallery from './pages/Gallery.jsx';
import BlogIndex from './pages/BlogIndex.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NotFound from './pages/NotFound.jsx';
import Footer from './components/Footer.jsx';

function Portfolio() {
  return (
    <SmoothScroll>
      <div className="grain" />
      <CustomCursor />
      <FormCursor />
      <Navbar />
      <main role="main" aria-label="Joseph Onifade Portfolio" style={{ background: '#070906' }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <BlogInsights />
        <Contact />
      </main>
      <Footer />
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
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
