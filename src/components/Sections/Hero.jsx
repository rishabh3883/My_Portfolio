import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { FaJava, FaReact, FaNodeJs, FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaRocket } from 'react-icons/fa';
import { SiMongodb, SiLeetcode } from 'react-icons/si';
import { X, Eye, Download, ExternalLink } from 'lucide-react';
import defaultProfileImg from '../../assets/146321370.jpg';
import portfolioData from '../../data/portfolioData.json';
import Stats from './Stats';

// Custom typewriter component with blinking cursor
const Typewriter = ({ words, speed = 80, delay = 2000, deleteSpeed = 40 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, delay, deleteSpeed]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 font-extrabold relative">
      {text}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[1.1em] bg-primary ml-1.5 align-middle"
      />
    </span>
  );
};

// Canvas-based slow drifting particles
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];
    const particleCount = 45;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.6;
        this.speedX = Math.random() * 0.25 - 0.125;
        this.speedY = Math.random() * 0.25 - 0.125;
        this.opacity = Math.random() * 0.45 + 0.15;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#38bdf8'; // Sky blue neon particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />;
};

const ResumeModal = ({ resumes, onClose }) => {
  const [activePreview, setActivePreview] = useState('');

  useEffect(() => {
    if (resumes && resumes.length > 0) {
      const firstValid = resumes.find(r => r.url);
      setActivePreview(firstValid ? firstValid.url : '');
    }
  }, [resumes]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[85vh] bg-[#020c1a] border border-white/10 rounded-3xl shadow-[0_45px_100px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-white"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-white">Select a Resume</h3>
            <p className="text-xs text-textMuted mt-1">Preview or download the version that fits your needs.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Grid Layout */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col gap-4 overflow-y-auto">
            {resumes && resumes.map((resume, idx) => {
              const isValid = !!resume.url;
              return (
                <div 
                  key={idx}
                  onClick={() => { if (isValid) setActivePreview(resume.url); }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                    !isValid 
                      ? 'opacity-40 border-dashed border-white/5 cursor-not-allowed'
                      : activePreview === resume.url 
                        ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(56,189,248,0.15)]' 
                        : 'bg-white/[0.015] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">Resume #{idx + 1}</span>
                    {isValid ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ) : (
                      <span className="text-[9px] font-mono text-amber-500 font-medium">Not Uploaded</span>
                    )}
                  </div>
                  <div className="font-extrabold text-sm text-white line-clamp-1">{resume.name}</div>
                  
                  {isValid && (
                    <div className="flex items-center gap-2 mt-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActivePreview(resume.url); }}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-1 ${
                          activePreview === resume.url 
                            ? 'bg-primary text-background border-primary hover:bg-sky-400'
                            : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <Eye size={10} /> Preview
                      </button>
                      <a 
                        href={resume.url}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-1.5 rounded-lg text-[10px] font-bold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-1"
                      >
                        <Download size={10} /> Download
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Preview */}
          <div className="flex-1 bg-slate-950/40 p-6 flex flex-col justify-center items-center relative min-h-0">
            {activePreview ? (
              <object 
                data={activePreview} 
                type="application/pdf" 
                className="w-full h-full rounded-2xl border border-white/5 shadow-inner"
              >
                <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
                  <p className="text-sm text-textMuted">Unable to preview PDF directly in your browser.</p>
                  <a 
                    href={activePreview}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-primary text-background font-bold rounded-xl text-xs hover:bg-sky-400 transition-all flex items-center gap-1.5"
                  >
                    <ExternalLink size={14} /> Open in New Tab
                  </a>
                </div>
              </object>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center text-white/35">
                <FaDownload size={48} className="mb-3.5 opacity-40 animate-pulse text-primary" />
                <p className="text-sm font-medium">Select an uploaded resume from the sidebar to preview.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { hero, contact } = portfolioData;
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const socialLinks = [
    {
      name: 'GitHub',
      url: contact.github,
      icon: FaGithub,
      glow: '0 0 20px rgba(255, 255, 255, 0.15)'
    },
    {
      name: 'LinkedIn',
      url: contact.linkedin,
      icon: FaLinkedin,
      glow: '0 0 20px rgba(56, 189, 248, 0.35)'
    },
    {
      name: 'LeetCode',
      url: contact.leetcode || 'https://leetcode.com/u/rishabhgupta3883/',
      icon: SiLeetcode,
      glow: '0 0 20px rgba(245, 158, 11, 0.35)'
    },
    {
      name: 'Email',
      url: `mailto:${contact.email}`,
      icon: FaEnvelope,
      glow: '0 0 20px rgba(239, 68, 68, 0.25)'
    }
  ];

  // Mouse Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxXProfile = useTransform(mouseX, [-400, 400], [-15, 15]);
  const parallaxYProfile = useTransform(mouseY, [-400, 400], [-15, 15]);

  const parallaxXIcons = useTransform(mouseX, [-400, 400], [-30, 30]);
  const parallaxYIcons = useTransform(mouseY, [-400, 400], [-30, 30]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    animate(mouseX, 0, { type: 'spring', stiffness: 80, damping: 20 });
    animate(mouseY, 0, { type: 'spring', stiffness: 80, damping: 20 });
  };

  // Parent layout stagger animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Headline Line Reveal animation variants
  const headlineContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Button Group Stagger Animations
  const buttonGroupVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const headlineLines = [
    "Full Stack Developer &",
    "A.I & M.L  Engineer ."
  ];


  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-8 overflow-hidden bg-background"
    >
      {/* Background Canvas Particles */}
      <ParticleCanvas />

      {/* Background ambient glowing blobs */}
      <div className="absolute top-1/4 -left-1/4 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-[pulse_10s_infinite]" />
      <div className="absolute bottom-1/4 -right-1/4 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none animate-[pulse_12s_infinite]" style={{ animationDelay: '2s' }} />

      {/* Main Grid row (Introduction & Profile Card) */}
      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 mb-6">

        {/* Left Column (Greeting, Headline, Typewriter, Description, CTA Buttons) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start select-none"
        >

          {/* Animated Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-primary font-mono text-lg md:text-xl font-medium mb-3.5 flex items-center gap-2"
          >
            <span>Hi, I'm Rishabh Gupta</span>
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
              className="inline-block origin-bottom-right"
            >
              👋
            </motion.span>
          </motion.p>

          {/* Powerful Headline with Line Reveal and Blue Gradient highlights */}
          <motion.div
            variants={headlineContainerVariants}
            className="flex flex-col gap-1.5 mb-5"
          >
            {headlineLines.map((line, idx) => (
              <div key={idx} className="overflow-hidden py-0.5">
                <motion.h1
                  variants={lineVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none font-sans"
                >
                  {line.split(" ").map((word, wIdx) => {
                    if (word === "Machine") {
                      return (
                        <span key={wIdx} className="mr-3 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                          Machine Learning
                        </span>
                      );
                    }
                    if (word === "Learning") {
                      return null;
                    }
                    return <span key={wIdx} className="mr-3">{word}</span>;
                  })}
                </motion.h1>
              </div>
            ))}
          </motion.div>

          {/* Typewriter Rotating Sub-headline */}
          <motion.div
            variants={itemVariants}
            className="text-lg md:text-xl font-semibold mb-5 text-gray-300 flex items-center gap-2 h-8"
          >
            <span>I am a</span>
            <Typewriter words={["MERN Stack Developer", "AI/ML Developer", "Software Engineer"]} />
          </motion.div>

          {/* Description Animation with sequence delay */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-textMuted max-w-lg mb-8 leading-relaxed"
          >
            Passionate about developing scalable web applications, intelligent systems, and data-driven solutions using modern technologies.
          </motion.p>

          {/* Animated CTA Buttons with spring scaling & blue glows */}
          <motion.div
            variants={buttonGroupVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
          >
            {/* Primary Button */}
            <motion.button
              onClick={() => setResumeModalOpen(true)}
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.45)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="relative overflow-hidden px-8 h-14 rounded-[16px] bg-gradient-to-r from-primary via-blue-500 to-indigo-500 text-background font-bold flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:text-white transition-colors duration-300 text-sm cursor-pointer"
            >
              {/* Highlight Sweep effect */}
              <motion.div
                variants={{
                  hover: { x: "250%" }
                }}
                transition={{ duration: 0.85, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-[150%] pointer-events-none"
              />
              <FaDownload size={15} />
              <span>Download / View Resume</span>
            </motion.button>

            {/* Secondary Button */}
            <motion.a
              href="#projects"
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="relative overflow-hidden px-8 h-14 rounded-[16px] border-2 border-primary/40 bg-white/[0.02] backdrop-blur-md text-white font-bold flex items-center justify-center gap-2.5 hover:border-primary hover:bg-white/[0.04] transition-all duration-300 text-sm cursor-pointer"
            >
              {/* Highlight Sweep effect */}
              <motion.div
                variants={{
                  hover: { x: "250%" }
                }}
                transition={{ duration: 0.85, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-[150%] pointer-events-none"
              />
              <FaRocket size={15} className="text-primary group-hover:text-white" />
              <span>View Projects</span>
            </motion.a>

            {/* Tertiary Button */}
            <motion.a
              href="#contact"
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="relative overflow-hidden px-8 h-14 rounded-[16px] border border-white/10 bg-white/[0.01] text-white/80 font-semibold flex items-center justify-center gap-2.5 hover:border-white/20 hover:bg-white/[0.03] hover:text-white transition-all duration-300 text-sm cursor-pointer"
            >
              {/* Highlight Sweep effect */}
              <motion.div
                variants={{
                  hover: { x: "250%" }
                }}
                transition={{ duration: 0.85, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-[150%] pointer-events-none"
              />
              <FaEnvelope size={15} />
              <span>Contact Me</span>
            </motion.a>
          </motion.div>

        </motion.div>

        {/* Right Column (Profile image card with float, pulse rings, and floating brand icons) */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center relative mt-2 lg:-mt-10 lg:translate-y-[-15px] select-none"
        >
          <div className="relative p-10">

            {/* Radial blue glow behind avatar */}
            <div className="absolute inset-0 m-auto w-64 h-64 bg-primary/20 rounded-full blur-[90px] pointer-events-none" />

            {/* Profile Avatar Card with float & Mouse Parallax (Orbiting Icons nested inside) */}
            <motion.div
              style={{ x: parallaxXProfile, y: parallaxYProfile }}
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative group cursor-pointer z-10"
            >
              {/* Pulsing glow neon rings */}
              <div className="absolute inset-0 rounded-full border border-primary/25 animate-[ping_3.5s_infinite] pointer-events-none" />
              <div className="absolute -inset-4 rounded-full border border-primary/15 animate-[pulse_4s_infinite] pointer-events-none" />

              {/* Circular Border with Glowing Gradient */}
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full p-1 bg-gradient-to-tr from-primary via-purple-500 to-cyan-400 group-hover:rotate-180 transition-transform duration-[1800ms] shadow-[0_0_40px_rgba(56,189,248,0.2)] group-hover:shadow-[0_0_60px_rgba(56,189,248,0.4)]">
                {/* Inner Image Container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-[#020617] relative">
                  <img
                    src={hero.profileImg || '/profile.jpg'}
                    alt={hero.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = defaultProfileImg; }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Orbiting Tech Icons (Locked to the avatar's coordinates & float animations) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {[
                  { icon: FaReact, color: '#61dafb', angle: 0 },
                  { icon: FaNodeJs, color: '#339933', angle: 72 },
                  { icon: SiMongodb, color: '#47a248', angle: 144 },
                  { icon: FaJava, color: '#ea2d2e', angle: 216 },
                  { icon: FaGithub, color: '#ffffff', angle: 288 }
                ].map((tech, idx) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={idx}
                      animate={{ rotate: [tech.angle, tech.angle + 360] }}
                      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                      className="absolute left-1/2 top-1/2 w-[145px] sm:w-[170px] md:w-[225px] h-0 origin-left flex items-center justify-end pointer-events-none -translate-y-1/2"
                    >
                      <motion.div
                        animate={{ rotate: [-tech.angle, -tech.angle - 360] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        className="absolute p-3 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-2xl opacity-75 shadow-lg pointer-events-auto hover:opacity-100 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                        style={{
                          color: tech.color,
                          boxShadow: `0 0 15px ${tech.color}25`
                        }}
                      >
                        <Icon size={24} />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Social Links Section (Moved below the profile photo) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-6 flex flex-col items-center w-full gap-4"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-sm select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to Internships & Opportunities
            </div>

            {/* Connect Title */}
            <h4 className="text-xs uppercase tracking-[0.2em] text-textMuted font-bold mt-2 mb-1">
              Connect With Me
            </h4>

            {/* Social Icons row */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + idx * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1, y: -4, boxShadow: social.glow }}
                    className="group relative w-12 h-12 rounded-full bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-primary/40 text-textMuted hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md"
                  >
                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/20 group-hover:animate-ping opacity-50 pointer-events-none" />

                    <Icon size={20} strokeWidth={2} />

                    {/* Tooltip */}
                    <div className="absolute -top-10 scale-0 group-hover:scale-100 bg-slate-900 border border-white/10 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-transform duration-200 select-none shadow-xl pointer-events-none tracking-wide z-20">
                      {social.name}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

        </motion.div>

      </div>

      {/* Nesting Statistics Cards at the bottom of Hero layout */}
      <Stats />

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="flex flex-col items-center gap-1.5 cursor-pointer z-10 mx-auto select-none mt-2"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-textMuted font-bold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-down"><path d="m7 6 5 5 5-5" /><path d="m7 13 5 5 5-5" /></svg>
        </motion.div>
      </motion.div>

      {/* Selectable Resumes Modal */}
      <AnimatePresence>
        {resumeModalOpen && (
          <ResumeModal 
            resumes={hero.resumes} 
            onClose={() => setResumeModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
