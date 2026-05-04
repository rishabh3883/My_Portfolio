import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Achievements from './components/Sections/Achievements';
import Education from './components/Sections/Education';
import Contact from './components/Sections/Contact';
import Background from './components/Background';

function App() {
  return (
    <SmoothScroll>
      <div className="bg-background text-textMain min-h-screen selection:bg-primary/30 selection:text-white relative z-0">
        <Background />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Education />
          <Contact />
        </main>
        
        <footer className="py-8 text-center border-t border-white/5 bg-surface text-textMuted text-sm">
          <p>&copy; {new Date().getFullYear()} Rishabh Gupta. All rights reserved.</p>
        </footer>
      </div>
    </SmoothScroll>
  );
}

export default App;
