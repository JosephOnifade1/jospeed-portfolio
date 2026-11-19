import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import PageHead from './components/PageHead.jsx';
import RouteNavigation from './components/RouteNavigation.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Contact from './components/Contact.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import BlogInsights from './sections/BlogInsights.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import ProjectArchive from './pages/ProjectArchive.jsx';
import BlogIndex from './pages/BlogIndex.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NotFound from './pages/NotFound.jsx';
import Footer from './components/Footer.jsx';

function Portfolio() {
  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <Navbar />
      <main role="main" aria-label="Joseph Onifade Portfolio" style={{ background: '#070906' }}>
        <Hero />
        <Projects />
        <About />
        <BlogInsights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <PageHead />
      <RouteNavigation />
      <Analytics />
      <Routes>
        <Route caseSensitive path="/" element={<Portfolio />} />
        <Route caseSensitive path="/work" element={<ProjectArchive />} />
        <Route caseSensitive path="/gallery" element={<ProjectArchive gallery />} />
        <Route caseSensitive path="/coverflow" element={<ProjectArchive gallery />} />
        <Route caseSensitive path="/case-study/:id" element={<CaseStudy />} />
        <Route caseSensitive path="/blog" element={<BlogIndex />} />
        <Route caseSensitive path="/blog/:slug" element={<BlogPost />} />
        <Route caseSensitive path="*" element={<NotFound />} />
      </Routes>
      <SpeedInsights />
    </>
  );
}
