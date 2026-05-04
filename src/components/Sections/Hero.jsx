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
        className="max-w-4xl mx-auto px-6 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
          <img
            src={profileImg}
            alt="Rishabh Gupta"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/20 relative z-10 object-cover"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          Rishabh Gupta
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-3xl text-primary font-medium mb-6"
        >
          Full Stack Developer (MERN)
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-textMuted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          "Building scalable web applications and modern digital experiences"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#projects" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10 transition-colors duration-300">
            Contact Me
          </a>
          <a href="/resume.pdf" download className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors duration-300">
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
