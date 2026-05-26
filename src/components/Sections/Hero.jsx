import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImg from '../../assets/146321370.jpg';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        style={{ y: y1, opacity }}
        className="max-w-7xl mx-auto px-6 z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
      >
        {/* Left Column (Text & Buttons) */}
        <motion.div 
          className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
          >
            Full Stack & <span className="text-primary">MERN</span> Developer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-textMuted max-w-xl mb-10 leading-relaxed"
          >
            "Building scalable web applications and modern digital experiences"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a href="/resume.pdf" download className="px-8 py-4 rounded-full bg-primary text-background font-semibold hover:bg-primary/90 hover:scale-105 transition-all duration-300">
              Download Resume
            </a>
            <a href="#projects" className="px-8 py-4 rounded-full border border-primary/40 text-primary font-semibold hover:bg-primary/10 hover:scale-105 transition-all duration-300">
              View Projects
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/20 transition-colors duration-300">
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column (Profile Area) */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 relative inline-block"
          >
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
            <img
              src={profileImg}
              alt="Rishabh Gupta"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-primary/40 shadow-[0_0_40px_rgba(56,189,248,0.4)] relative z-10 object-cover"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-3xl font-bold text-white mb-2"
          >
            Rishabh Gupta
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-xl text-primary font-medium mb-3"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-textMuted text-sm mb-6"
          >
            B.Tech • Session 2023 - 2027
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm">Frontend</span>
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm">Backend</span>
            <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium border border-purple-500/20 backdrop-blur-sm">MERN Stack</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
