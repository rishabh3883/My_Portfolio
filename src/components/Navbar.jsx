import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = ['Home', 'About', 'Projects', 'Achievements', 'Skills', 'Education', 'Contact'];

const Navbar = () => {
  const [active, setActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace('/', '').toLowerCase();
      const match = sections.find(s => s.toLowerCase() === path);
      if (match) return match;
    }
    return 'Home';
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple scroll spy logic
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      if (current && current !== active) {
        setActive(current);

        // Update URL path dynamically based on scroll position for all sections
        const targetPath = current.toLowerCase() === 'home' ? '/' : `/${current.toLowerCase()}`;
        if (window.location.pathname !== targetPath) {
          window.history.pushState({ section: current.toLowerCase() }, '', targetPath);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tighter text-white" onClick={(e) => { e.preventDefault(); scrollToSection('Home'); }}>
          Rishabh<span className="text-primary">.</span>
        </a>

        <div className="hidden md:flex items-center gap-2 glass px-2 py-2 rounded-full">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="relative px-4 py-1.5 text-sm font-medium transition-colors"
              style={{ color: active === section ? '#fff' : '#9ca3af' }}
            >
              {active === section && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{section}</span>
            </button>
          ))}
        </div>

        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
