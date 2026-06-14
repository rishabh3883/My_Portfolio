import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Terminal, Sparkles, Laptop, Cpu, Eye, Activity, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData.json';

// Import project images
import smartCampusImg from '../../assets/smart_campus.jpg';
import airbnbCloneImg from '../../assets/airbnb_clone.jpg';
import aiAttendanceImg from '../../assets/ai_attendance.jpg';
import aiGymImg from '../../assets/ai_gym.jpg';
import gamingEventImg from '../../assets/gaming_event.jpg';
import zerodhaCloneImg from '../../assets/zerodha_clone.jpg';

// Import AI Attendance system new screenshots
import aiAttendanceImg1 from '../../assets/ai_attendance_1.png';
import aiAttendanceImg2 from '../../assets/ai_attendance_2.png';
import aiAttendanceImg3 from '../../assets/ai_attendance_3.png';
import aiAttendanceImg4 from '../../assets/ai_attendance_4.png';

// Import AI Text Summarizer app screenshots
import textSummarizerImg1 from '../../assets/text_summarizer_1.png';
import textSummarizerImg2 from '../../assets/text_summarizer_2.png';

// Import Airbnb Clone screenshots
import airbnbImg1 from '../../assets/airbnb_1.png';
import airbnbImg2 from '../../assets/airbnb_2.png';
import airbnbImg3 from '../../assets/airbnb_3.png';

// Import Zerodha screenshots
import zerodhaImg1 from '../../assets/zerodha_1.png';
import zerodhaImg2 from '../../assets/zerodha_2.png';
import zerodhaImg3 from '../../assets/zerodha_3.png';
import zerodhaImg4 from '../../assets/zerodha_4.png';

// Mapping images to JSON file schema keys
const imageMap = {
  "smart_campus.jpg": smartCampusImg,
  "airbnb_clone.jpg": airbnbCloneImg,
  "ai_attendance.jpg": aiAttendanceImg,
  "ai_gym.jpg": aiGymImg,
  "gaming_event.jpg": gamingEventImg,
  "zerodha_clone.jpg": zerodhaCloneImg,
  "ai_attendance_1.png": aiAttendanceImg1,
  "ai_attendance_2.png": aiAttendanceImg2,
  "ai_attendance_3.png": aiAttendanceImg3,
  "ai_attendance_4.png": aiAttendanceImg4,
  "text_summarizer_1.png": textSummarizerImg1,
  "text_summarizer_2.png": textSummarizerImg2,
  "airbnb_1.png": airbnbImg1,
  "airbnb_2.png": airbnbImg2,
  "airbnb_3.png": airbnbImg3,
  "zerodha_1.png": zerodhaImg1,
  "zerodha_2.png": zerodhaImg2,
  "zerodha_3.png": zerodhaImg3,
  "zerodha_4.png": zerodhaImg4
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

const resolveImage = (imgKey) => {
  if (imgKey && (imgKey.startsWith('/') || imgKey.startsWith('http'))) {
    return imgKey;
  }
  return imageMap[imgKey] || smartCampusImg;
};

const Lightbox = ({ isOpen, images, initialIndex, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(initialIndex);
    }
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIdx((prev) => (prev + 1) % images.length);
      }
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images, onClose]);

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl select-none"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Image Container */}
        <div className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <motion.img
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            src={resolveImage(images[currentIdx])}
            alt={`Fullscreen screenshot ${currentIdx + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/5"
          />

          {/* Navigation Arrows inside Lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-slate-950 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-slate-950 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Counter & Indicator */}
          {images.length > 1 && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/5 text-xs text-white/70 font-medium">
              {currentIdx + 1} / {images.length}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, idx, onImageClick }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const images = project.images || [project.image];
  const isCarousel = images.length > 1;

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(56, 189, 248, 0.15)"
      }}
      className="group relative overflow-hidden bg-white/[0.015] hover:bg-white/[0.035] border border-white/5 hover:border-primary/20 rounded-[28px] flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500"
    >
      {/* Top card border highlight */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none" />

      {/* 1. Card Top Section: Project Image with Zoom & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[28px] w-full bg-slate-950">
        
        {/* Shadow overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent z-10 pointer-events-none" />
        
        <div 
          className="relative w-full h-full overflow-hidden cursor-zoom-in group/img"
          onClick={() => onImageClick(images, currentIdx)}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={currentIdx}
              src={resolveImage(images[currentIdx])}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              alt={`${project.title} screenshot ${currentIdx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Zoom/Eye icon on hover */}
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
            <div className="p-3.5 rounded-full bg-slate-950/80 border border-white/10 text-white backdrop-blur-md transform scale-90 group-hover/img:scale-100 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <Eye size={20} className="text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Navigation Arrows for Carousel */}
        {isCarousel && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-slate-950 duration-300 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-slate-950 duration-300 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Carousel Dots Indicators */}
        {isCarousel && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDirection(i > currentIdx ? 1 : -1);
                  setCurrentIdx(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIdx ? "bg-primary w-3" : "bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Corner badge (e.g. Featured / AI Project) */}
        {project.badge && (
          <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md bg-primary/20 border border-primary/45 text-white shadow-[0_2px_10px_rgba(56,189,248,0.15)] flex items-center gap-1.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {project.badge}
          </div>
        )}
      </div>

      {/* 2. Card Middle Section: Info & Highlights */}
      <div className="p-6 md:p-7 flex-1 flex flex-col gap-4 select-none">
        
        {/* Title */}
        <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        
        {/* Category capsule */}
        <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-primary/70 bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-md self-start">
          {project.category}
        </div>

        {/* Description */}
        <p className="text-sm text-textMuted leading-relaxed">
          {project.description}
        </p>

        {/* Metadata tags grid */}
        <div className="flex flex-wrap gap-2 my-1">
          {project.metadata && project.metadata.map((meta, mIdx) => {
            const emoji = meta.split(" ")[0];
            const text = meta.substring(emoji.length + 1);
            return (
              <span 
                key={mIdx} 
                className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-full hover:border-white/10 transition-colors duration-300"
              >
                <span className="text-xs">{emoji}</span>
                <span>{text}</span>
              </span>
            );
          })}
        </div>

        {/* Key Highlights list */}
        <ul className="space-y-2 mt-1 border-t border-white/5 pt-4">
          {project.points && project.points.map((point, pIdx) => (
            <li key={pIdx} className="text-xs md:text-sm text-textMuted flex items-start gap-2.5 leading-relaxed">
              <span className="text-primary mt-1 select-none">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Card Bottom Section: Tech Badges & Action Buttons */}
      <div className="border-t border-white/5 mt-auto pt-6 px-6 md:px-7 pb-6 md:pb-7 flex flex-col gap-4 bg-[#020617]/40">
        
        {/* Tech Badges Row */}
        <div className="flex flex-wrap gap-1.5 select-none">
          {project.tags && project.tags.map((tag, tIdx) => (
            <span 
              key={tIdx} 
              className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-primary bg-primary/5 border border-primary/15 px-2.5 py-1 rounded transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons row */}
        <div className="flex gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 4px 12px rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.015] hover:bg-white/[0.035] text-xs font-bold text-white transition-all duration-300 cursor-pointer"
          >
            <FaGithub size={14} />
            <span>GitHub</span>
          </motion.a>

          <motion.a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 4px 15px rgba(56,189,248,0.2)" }}
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-slate-950 font-bold hover:text-white transition-all duration-300 text-xs cursor-pointer"
          >
            <ExternalLink size={14} />
            <span>Live Demo</span>
          </motion.a>
        </div>

      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], initialIndex: 0 });

  const handleOpenLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, initialIndex: index });
  };

  const handleCloseLightbox = () => {
    setLightbox({ isOpen: false, images: [], initialIndex: 0 });
  };

  // Filters options list
  const filters = ["All", "Full Stack", "AI / ML", "Frontend", "Backend"];

  // Filter project cards list based on selected category
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Staggered reveal animations for Section Header
  const headerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      
      {/* Ambient local glowing lights */}
      <div className="absolute top-[20%] right-[-15%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[380px] h-[380px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <motion.div
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center lg:text-left select-none"
        >
          <motion.span
            variants={headerItemVariants}
            className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-3.5 block"
          >
            SELECTED WORK
          </motion.span>
          
          <motion.h2
            variants={headerItemVariants}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Featured Projects
          </motion.h2>
          
          <motion.p
            variants={headerItemVariants}
            className="text-base md:text-lg text-textMuted max-w-3xl leading-relaxed"
          >
            Showcasing Full Stack, AI/ML, and modern web applications built using MERN Stack, Python, and Artificial Intelligence technologies.
          </motion.p>
        </motion.div>

        {/* ======================================================== */}
        {/* PROJECT FILTERS                                          */}
        {/* ======================================================== */}
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-16 select-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                activeFilter === filter
                  ? "border-primary/40 text-white shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                  : "border-white/5 text-textMuted bg-white/[0.015] hover:border-white/15 hover:text-white"
              }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-primary/10 rounded-full border border-primary/30 pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* PROJECT CARDS GRID                                       */}
        {/* ======================================================== */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects && filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.title + '-' + idx} 
                project={project} 
                idx={idx} 
                onImageClick={handleOpenLightbox}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Fullscreen Lightbox Overlay */}
      <Lightbox 
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        onClose={handleCloseLightbox}
      />
    </section>
  );
};

export default Projects;
