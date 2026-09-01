import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const sections = ['Home', 'About', 'Certifications', 'Projects', 'Achievements', 'Skills', 'Education', 'Contact'];

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
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false); // Close mobile menu when clicked
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-black/50 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 text-xl font-bold tracking-tighter text-white group" onClick={(e) => { e.preventDefault(); scrollToSection('Home'); }}>
          <img src="/favicon.svg" alt="RG Logo" className="w-8 h-8 rounded-lg shadow-[0_0_12px_rgba(56,189,248,0.4)] group-hover:scale-110 transition-transform duration-300" />
          <span>Rishabh<span className="text-primary">.</span></span>
        </a>

        {/* Desktop Menu */}
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

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-white focus:outline-none p-1.5 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="w-full text-left py-3 px-4 rounded-xl text-base font-medium transition-all flex items-center justify-between hover:bg-white/5"
                  style={{ 
                    color: active === section ? '#38bdf8' : '#9ca3af',
                    background: active === section ? 'rgba(56, 189, 248, 0.08)' : 'transparent'
                  }}
                >
                  <span>{section}</span>
                  {active === section && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
