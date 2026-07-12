import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, X, Eye, Maximize2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData.json';

import smartCampusImg from '../../assets/smart_campus.jpg';
import airbnbCloneImg from '../../assets/airbnb_clone.jpg';
import aiAttendanceImg from '../../assets/ai_attendance.jpg';
import aiGymImg from '../../assets/ai_gym.jpg';
import gamingEventImg from '../../assets/gaming_event.jpg';
import zerodhaCloneImg from '../../assets/zerodha_clone.jpg';
import aiAttendanceImg1 from '../../assets/ai_attendance_1.png';
import aiAttendanceImg2 from '../../assets/ai_attendance_2.png';
import aiAttendanceImg3 from '../../assets/ai_attendance_3.png';
import aiAttendanceImg4 from '../../assets/ai_attendance_4.png';
import textSummarizerImg1 from '../../assets/text_summarizer_1.png';
import textSummarizerImg2 from '../../assets/text_summarizer_2.png';
import airbnbImg1 from '../../assets/airbnb_1.png';
import airbnbImg2 from '../../assets/airbnb_2.png';
import airbnbImg3 from '../../assets/airbnb_3.png';
import zerodhaImg1 from '../../assets/zerodha_1.png';
import zerodhaImg2 from '../../assets/zerodha_2.png';
import zerodhaImg3 from '../../assets/zerodha_3.png';
import zerodhaImg4 from '../../assets/zerodha_4.png';

const imageMap = {
  'smart_campus.jpg': smartCampusImg,
  'airbnb_clone.jpg': airbnbCloneImg,
  'ai_attendance.jpg': aiAttendanceImg,
  'ai_gym.jpg': aiGymImg,
  'gaming_event.jpg': gamingEventImg,
  'zerodha_clone.jpg': zerodhaCloneImg,
  'ai_attendance_1.png': aiAttendanceImg1,
  'ai_attendance_2.png': aiAttendanceImg2,
  'ai_attendance_3.png': aiAttendanceImg3,
  'ai_attendance_4.png': aiAttendanceImg4,
  'text_summarizer_1.png': textSummarizerImg1,
  'text_summarizer_2.png': textSummarizerImg2,
  'airbnb_1.png': airbnbImg1,
  'airbnb_2.png': airbnbImg2,
  'airbnb_3.png': airbnbImg3,
  'zerodha_1.png': zerodhaImg1,
  'zerodha_2.png': zerodhaImg2,
  'zerodha_3.png': zerodhaImg3,
  'zerodha_4.png': zerodhaImg4,
};

const resolveImage = (key) => {
  if (key && (key.startsWith('/') || key.startsWith('http'))) return key;
  return imageMap[key] || smartCampusImg;
};

// ─── CARD DIMENSIONS ────────────────────────────────────────
const CW = 280;
const CH = 400;

// ─── LIGHTBOX ───────────────────────────────────────────────
const slideV = {
  enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0 }),
};

const Lightbox = ({ isOpen, images, initialIndex, onClose }) => {
  const [idx, setIdx] = useState(initialIndex);
  useEffect(() => { if (isOpen) setIdx(initialIndex); }, [initialIndex, isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(p => (p + 1) % images.length);
      if (e.key === 'ArrowLeft') setIdx(p => (p - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, images, onClose]);

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"><X size={22} /></button>
        <div className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
          <motion.img
            key={idx} src={resolveImage(images[idx])} alt="" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/5"
          />
          {images.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); setIdx(p => (p - 1 + images.length) % images.length); }} className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-slate-950 transition-all cursor-pointer"><ChevronLeft size={22} /></button>
              <button onClick={e => { e.stopPropagation(); setIdx(p => (p + 1) % images.length); }} className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-slate-950 transition-all cursor-pointer"><ChevronRight size={22} /></button>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/5 text-xs text-white/70 font-medium">{idx + 1} / {images.length}</div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── PROJECT DETAIL MODAL ───────────────────────────────────
const ProjectModal = ({ project, onClose, onImgClick }) => {
  const images = project.images || [project.image];
  const [imgIdx, setImgIdx] = useState(0);
  const [dir, setDir] = useState(0);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const next = (e) => { e.stopPropagation(); setDir(1); setImgIdx(p => (p + 1) % images.length); };
  const prev = (e) => { e.stopPropagation(); setDir(-1); setImgIdx(p => (p - 1 + images.length) % images.length); };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#020c1a] border border-white/10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(56,189,248,0.2) transparent' }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer"><X size={20} /></button>

        {/* Image area */}
        <div className="relative aspect-[16/8] overflow-hidden rounded-t-3xl bg-slate-950 group cursor-zoom-in" onClick={() => onImgClick(images, imgIdx)}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020c1a] via-[#020c1a]/40 to-transparent z-10 pointer-events-none" />
          <AnimatePresence custom={dir} initial={false} mode="popLayout">
            <motion.img key={imgIdx} src={resolveImage(images[imgIdx])} alt="" custom={dir} variants={slideV} initial="enter" animate="center" exit="exit" transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} className="absolute inset-0 w-full h-full object-cover" />
          </AnimatePresence>
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-all pointer-events-none">
            <div className="p-3 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md"><Eye size={22} className="text-primary" /></div>
          </div>
          {images.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); prev(e); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary hover:text-slate-950 transition-all cursor-pointer"><ChevronLeft size={16} /></button>
              <button onClick={e => { e.stopPropagation(); next(e); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary hover:text-slate-950 transition-all cursor-pointer"><ChevronRight size={16} /></button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
                {images.map((_, i) => <button key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }} className={`rounded-full transition-all cursor-pointer ${i === imgIdx ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`} />)}
              </div>
            </>
          )}
          {project.badge && (
            <div className="absolute top-5 left-5 z-20 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-primary/20 border border-primary/40 text-white backdrop-blur-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />{project.badge}
            </div>
          )}
        </div>

        {/* Content grid */}
        <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">
          <div className="space-y-5">
            <div>
              <div className="inline-flex text-[9px] font-bold uppercase tracking-widest text-primary/70 bg-primary/5 border border-primary/10 px-3 py-1 rounded-md mb-3">{project.category}</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">{project.title}</h2>
            </div>
            <p className="text-sm text-white/55 leading-relaxed">{project.description}</p>
            {project.metadata && (
              <div className="flex flex-wrap gap-2">
                {project.metadata.map((m, i) => <span key={i} className="text-[11px] text-gray-400 bg-white/[0.025] border border-white/5 px-3 py-1.5 rounded-full">{m}</span>)}
              </div>
            )}
            {project.points && (
              <div>
                <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-widest">Key Features</h4>
                <ul className="space-y-2">
                  {project.points.map((p, i) => <li key={i} className="flex items-start gap-3 text-sm text-white/55"><span className="text-primary mt-0.5">▸</span><span>{p}</span></li>)}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-5">
            {project.tags && (
              <div>
                <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-widest">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t, i) => <span key={i} className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-primary bg-primary/5 border border-primary/15 px-2.5 py-1 rounded-lg">{t}</span>)}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 pt-2">
              <motion.a href={project.github} target="_blank" rel="noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-sm font-bold text-white transition-all">
                <FaGithub size={15} /> View on GitHub
              </motion.a>
              <motion.a href={project.live} target="_blank" rel="noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-slate-950 font-bold text-sm hover:text-white transition-all">
                <ExternalLink size={15} /> Live Demo
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── 3D CIRCULAR CAROUSEL ───────────────────────────────────
const Carousel3D = ({ projects, onProjectClick }) => {
  const count = projects.length;
  const angleStep = count > 1 ? 360 / count : 0;
  // Ensure cards never overlap: radius must be >= CW / sin(angleStep)
  // so adjacent cards are separated by at least one card-width.
  const angleRad = count > 1 ? (2 * Math.PI) / count : 1;
  const noOverlapRadius = count > 1 ? Math.round(CW / Math.sin(angleRad)) + 20 : 0;
  const baseRadius = count > 1 ? Math.round((CW / 2) / Math.tan(Math.PI / count)) + 40 : 0;
  const radius = Math.max(baseRadius, noOverlapRadius);

  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);

  // Clamp index so it never goes out-of-bounds during filter transitions
  const safeIdx = count > 0 ? Math.min(activeIdx, count - 1) : 0;

  const goNext = useCallback(() => setActiveIdx(p => (p + 1) % count), [count]);
  const goPrev = useCallback(() => setActiveIdx(p => (p - 1 + count) % count), [count]);

  useEffect(() => {
    if (hovered || count <= 1) return;
    timerRef.current = setInterval(goNext, 3500);
    return () => clearInterval(timerRef.current);
  }, [hovered, goNext, count]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [goNext, goPrev]);

  if (count === 0) return (
    <div className="text-center py-24 text-white/30 text-sm">No projects in this category</div>
  );

  const rotation = -(safeIdx * angleStep);
  const active = projects[safeIdx];

  return (
    <div className="relative select-none" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* ── 3D STAGE ── */}
      <div style={{ perspective: '1400px', perspectiveOrigin: '50% 50%', width: '100%', height: CH + 140, position: 'relative', overflow: 'visible' }}>

        {/* Ambient ground glow */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: CW * 2.5, height: 80, background: 'radial-gradient(ellipse, rgba(56,189,248,0.14) 0%, transparent 70%)', borderRadius: '50%' }} />

        {/* Prev button */}
        <button onClick={goPrev} className="absolute left-0 lg:left-6 top-[46%] -translate-y-1/2 z-30 p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-slate-950 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg" style={{ zIndex: 30 }}>
          <ChevronLeft size={22} />
        </button>

        {/* Next button */}
        <button onClick={goNext} className="absolute right-0 lg:right-6 top-[46%] -translate-y-1/2 z-30 p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-slate-950 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg" style={{ zIndex: 30 }}>
          <ChevronRight size={22} />
        </button>

        {/* Rotating ring */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -CW / 2,
            marginTop: -(CH / 2) - 10,
            width: CW,
            height: CH,
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {projects.map((project, idx) => {
            const angle = idx * angleStep;
            const diff = ((idx - safeIdx) % count + count) % count;
            const normalized = diff > count / 2 ? diff - count : diff;
            const absDiff = Math.abs(normalized);
            const isActive = absDiff === 0;
            const images = project.images || [project.image];
            const opacityVal = isActive ? 1 : absDiff === 1 ? 0.68 : 0.32;
            const brightnessVal = isActive ? 1 : absDiff === 1 ? 0.7 : 0.45;

            return (
              <div
                key={project.title + idx}
                onClick={() => { if (!isActive) { setActiveIdx(idx); } else { onProjectClick(project); } }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformStyle: 'preserve-3d',
                  // Position card in the 3D ring
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  cursor: 'pointer',
                }}
              >
                {/* Counter-rotate so the card FACE always points at the viewer
                    Net world rotation = ring_rot + card_angle + counter = 0.
                    This gives the classic coverflow fan effect and fixes the
                    backface-hiding bug when count < 4 (few filtered results). */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  transform: `rotateY(${(safeIdx - idx) * angleStep}deg)`,
                  transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                }}>
                  <div 
                    className={`w-full h-full rounded-2xl overflow-hidden relative transition-all duration-500 ${isActive ? 'border-2 border-primary/60 shadow-[0_0_55px_rgba(56,189,248,0.4),0_20px_60px_rgba(0,0,0,0.8)]' : 'border border-white/8 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'}`}
                    style={{
                      opacity: opacityVal,
                      filter: `brightness(${brightnessVal})`,
                      transition: 'opacity 0.85s ease, filter 0.85s ease, border 0.5s ease, box-shadow 0.5s ease',
                    }}
                  >

                    {/* bg image */}
                    <img src={resolveImage(project.image || images[0])} alt={project.title} className="absolute inset-0 w-full h-full object-cover" draggable={false} />

                    {/* gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/5 pointer-events-none" />

                    {/* Active top glow line */}
                    {isActive && <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10 pointer-events-none" />}

                    {/* Badge */}
                    {project.badge && (
                      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full text-[8px] font-extrabold uppercase tracking-widest bg-primary/20 border border-primary/40 text-white backdrop-blur-md flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full bg-primary ${isActive ? 'animate-pulse' : ''}`} />
                        {project.badge}
                      </div>
                    )}

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary mb-1">{project.category}</div>
                      <h3 className="text-[15px] font-extrabold text-white leading-snug mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tags?.slice(0, 3).map((tag, ti) => (
                          <span key={ti} className="text-[7px] font-mono font-bold uppercase tracking-wider text-primary/75 bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                      {isActive && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-[9px] text-white/45 font-semibold flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                          Click to view details
                        </motion.div>
                      )}
                    </div>

                    {/* Hover overlay for active */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors duration-300 group z-20">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-full bg-slate-950/70 border border-white/15 backdrop-blur-sm shadow-xl">
                          <Maximize2 size={26} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ACTIVE PROJECT TITLE STRIP ── */}
      <div className="mt-2 mb-6 text-center px-4" style={{ minHeight: 80 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-1">{active.title}</h3>
            <p className="text-sm text-white/45 max-w-xl mx-auto leading-relaxed line-clamp-2">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── DOTS ── */}
      <div className="flex items-center justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${i === activeIdx ? 'bg-primary shadow-[0_0_10px_rgba(56,189,248,0.55)]' : 'bg-white/20 hover:bg-white/40'}`}
            style={{ width: i === activeIdx ? 28 : 8, height: 8 }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── MAIN SECTION ───────────────────────────────────────────
const Projects = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], initialIndex: 0 });

  const filters = ['All', 'Full Stack', 'AI / ML', 'Frontend'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const headVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11 } },
  };
  const itemV = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">

      {/* Ambient glows */}
      <div className="absolute top-[15%] right-[-12%] w-[420px] h-[420px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-12%] w-[360px] h-[360px] bg-blue-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div variants={headVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mb-12 text-center select-none">
          <motion.span variants={itemV} className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-3 block">Selected Work</motion.span>
          <motion.h2 variants={itemV} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Featured Projects</motion.h2>
          <motion.p variants={itemV} className="text-base md:text-lg text-textMuted max-w-2xl mx-auto leading-relaxed">
            Showcasing Full Stack, AI/ML, and modern web applications — use arrow keys or buttons to explore.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-14 select-none">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 backdrop-blur-md cursor-pointer ${activeFilter === f ? 'border-primary/40 text-white shadow-[0_0_20px_rgba(56,189,248,0.15)]' : 'border-white/5 text-textMuted bg-white/[0.015] hover:border-white/15 hover:text-white'}`}
            >
              {activeFilter === f && (
                <motion.div layoutId="filterPill" className="absolute inset-0 bg-primary/10 rounded-full border border-primary/30 pointer-events-none" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>

        {/* 3D Carousel */}
        <Carousel3D
          key={activeFilter}
          projects={filteredProjects}
          onProjectClick={setSelectedProject}
        />
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onImgClick={(imgs, i) => setLightbox({ isOpen: true, images: imgs, initialIndex: i })}
          />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        onClose={() => setLightbox({ isOpen: false, images: [], initialIndex: 0 })}
      />
    </section>
  );
};

export default Projects;
