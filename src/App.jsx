import React, { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Sections/Hero';
import { AboutHero, Achievements, Skills, Education } from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Certifications from './components/Sections/Certifications';
import Contact from './components/Sections/Contact';
import Background from './components/Background';
import AdminPanel from './components/AdminPanel';

function App() {
  const adminPath = import.meta.env.VITE_ADMIN_PATH || 'admin';
  const [route, setRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const trimmedPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    const adminPathLower = adminPath.toLowerCase();

    if (trimmedPath === adminPathLower || trimmedPath.startsWith(`${adminPathLower}/`)) {
      window.history.replaceState(null, '', `/#${adminPath}`);
      setRoute(`#${adminPath}`);
    }
  }, [adminPath]);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to section on initial load and during back/forward navigation
  useEffect(() => {
    const handleScrollToSection = () => {
      const path = window.location.pathname.replace('/', '').toLowerCase() || 'home';
      const targetSection = document.getElementById(path);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    };

    // Slight delay to allow layout and Lenis initialization
    const timer = setTimeout(handleScrollToSection, 400);

    const handlePopState = () => {
      handleScrollToSection();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const isAdmin = route === `#${adminPath}` || route.startsWith(`#${adminPath}`);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <SmoothScroll>
      <div className="bg-background text-textMain min-h-screen selection:bg-primary/30 selection:text-white relative z-0">
        <Background />
        <Navbar />
        
        <main>
          <Hero />
          <AboutHero />
          <Certifications />
          <Projects />
          <Achievements />
          <Skills />
          <Education />
          <Contact />
        </main>
        
        <footer className="py-8 text-center border-t border-white/5 bg-surface text-textMuted text-sm flex flex-col items-center gap-2 justify-center">
          <p>&copy; {new Date().getFullYear()} Rishabh Gupta. All rights reserved.</p>
          <a href={`#${adminPath}`} className="text-[10px] text-white/5 hover:text-primary/40 transition-colors mt-1 font-mono">
            /{adminPath}
          </a>
        </footer>
      </div>
    </SmoothScroll>
  );
}

export default App;
