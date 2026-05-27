import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Terminal, Sparkles, Laptop, Cpu, Eye, Activity } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData.json';

// Import project images
import smartCampusImg from '../../assets/smart_campus.jpg';
import airbnbCloneImg from '../../assets/airbnb_clone.jpg';
import aiAttendanceImg from '../../assets/ai_attendance.jpg';
import aiGymImg from '../../assets/ai_gym.jpg';
import gamingEventImg from '../../assets/gaming_event.jpg';
import zerodhaCloneImg from '../../assets/zerodha_clone.jpg';

// Mapping images to JSON file schema keys
const imageMap = {
  "smart_campus.jpg": smartCampusImg,
  "airbnb_clone.jpg": airbnbCloneImg,
  "ai_attendance.jpg": aiAttendanceImg,
  "ai_gym.jpg": aiGymImg,
  "gaming_event.jpg": gamingEventImg,
  "zerodha_clone.jpg": zerodhaCloneImg
};

const Projects = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState("All");

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
            {filteredProjects && filteredProjects.map((project, idx) => {
              const projectImage = project.image && (project.image.startsWith('/') || project.image.startsWith('http'))
                ? project.image
                : (imageMap[project.image] || smartCampusImg);
              
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
                  key={project.title + '-' + idx}
                  className="group relative overflow-hidden bg-white/[0.015] hover:bg-white/[0.035] border border-white/5 hover:border-primary/20 rounded-[28px] flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500"
                >
                  {/* Top card border highlight */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none" />

                  {/* 1. Card Top Section: Project Image with Zoom & Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-[28px] w-full bg-slate-950">
                    
                    {/* Shadow overlay gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent z-10 pointer-events-none" />
                    
                    <img
                      src={projectImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

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
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
