import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, X, BadgeCheck, Calendar, Clock, Hash, Maximize2 } from 'lucide-react';
import portfolioData from '../../data/portfolioData.json';

// ── Issuer SVG Logos ───────────────────────────────────────
const OracleLogo = ({ size = 36 }) => (
  <svg viewBox="0 0 48 48" style={{ width: size, height: size }} xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#F80000" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
      fontSize="12" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">OCI</text>
  </svg>
);
const AWSLogo = ({ size = 36 }) => (
  <svg viewBox="0 0 48 48" style={{ width: size, height: size }} xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#232F3E" />
    <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle"
      fontSize="10" fontWeight="bold" fill="#FF9900" fontFamily="Arial, sans-serif">AWS</text>
  </svg>
);
const KaggleLogo = ({ size = 36 }) => (
  <svg viewBox="0 0 48 48" style={{ width: size, height: size }} xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#20BEFF" />
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
      fontSize="18" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">K</text>
  </svg>
);
const logoMap = { oracle: OracleLogo, aws: AWSLogo, kaggle: KaggleLogo };

// ── Card dimensions ────────────────────────────────────────
const CW = 260;
const CH = 380;

// ── Cert Detail Modal ──────────────────────────────────────
const CertModal = ({ cert, onClose }) => {
  const Logo = logoMap[cert.icon] || (() => null);
  const c = cert.color;

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#020c1a] rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
        style={{ border: `1px solid ${c}25` }}
      >
        {/* Top color bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />

        {/* Close */}
        <button onClick={onClose} className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer">
          <X size={18} />
        </button>

        <div className="p-8 space-y-6">
          {/* Logo + category */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${c}15`, border: `1.5px solid ${c}30` }}>
              <Logo size={36} />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full block mb-2"
                style={{ color: c, background: `${c}12`, border: `1px solid ${c}28` }}>
                {cert.category}
              </span>
              <p className="text-sm font-bold" style={{ color: c }}>{cert.issuer}</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-white leading-snug tracking-tight">
            {cert.title}
          </h2>

          {/* Centered Badge Image */}
          {cert.badge && (
            <div className="flex justify-center items-center py-4 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
              <motion.img
                src={cert.badge}
                alt={cert.title}
                className="w-28 h-28 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
              />
            </div>
          )}

          {/* Focus tags */}
          {cert.focus?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {cert.focus.map((tag, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full text-white/60 bg-white/[0.04] border border-white/[0.08]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Credential info grid */}
          <div className="grid grid-cols-2 gap-3">
            {cert.issued && (
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-widest font-bold">
                  <Calendar size={10} style={{ color: c }} /> Issued
                </div>
                <p className="text-sm font-bold text-white/80">{cert.issued}</p>
              </div>
            )}
            {cert.validUntil && (
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-widest font-bold">
                  <Clock size={10} style={{ color: c }} /> Valid Until
                </div>
                <p className="text-sm font-bold text-white/80">{cert.validUntil}</p>
              </div>
            )}
            {cert.credentialId && (
              <div className="col-span-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-widest font-bold">
                  <Hash size={10} style={{ color: c }} /> Credential ID
                </div>
                <p className="text-sm font-mono font-bold text-white/80">{cert.credentialId}</p>
              </div>
            )}
          </div>

          {/* Verify button */}
          <motion.a
            href={cert.credentialUrl} target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer"
            style={{ color: c, background: `${c}15`, border: `1px solid ${c}35` }}
          >
            <ExternalLink size={15} /> Verify Credential
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── 3D Carousel ────────────────────────────────────────────
const Carousel3D = ({ certs, onCertClick }) => {
  const count = certs.length;
  const angleStep = count > 1 ? 360 / count : 0;
  const angleRad = count > 1 ? (2 * Math.PI) / count : 1;
  const noOverlapRadius = count > 1 ? Math.round(CW / Math.sin(angleRad)) + 20 : 0;
  const baseRadius = count > 1 ? Math.round((CW / 2) / Math.tan(Math.PI / count)) + 40 : 0;
  const radius = Math.max(baseRadius, noOverlapRadius);

  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);
  const safeIdx = count > 0 ? Math.min(activeIdx, count - 1) : 0;

  const goNext = useCallback(() => setActiveIdx(p => (p + 1) % count), [count]);
  const goPrev = useCallback(() => setActiveIdx(p => (p - 1 + count) % count), [count]);

  useEffect(() => {
    if (hovered || count <= 1) return;
    timerRef.current = setInterval(goNext, 3200);
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

  if (count === 0) return <div className="text-center py-20 text-white/30 text-sm">No certifications found</div>;

  const rotation = -(safeIdx * angleStep);
  const active = certs[safeIdx];

  return (
    <div className="relative select-none" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* ── 3D STAGE ── */}
      <div style={{ perspective: '1400px', perspectiveOrigin: '50% 50%', width: '100%', height: CH + 140, position: 'relative', overflow: 'visible' }}>

        {/* Ground glow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: CW * 2.2, height: 70, background: `radial-gradient(ellipse, ${active.color}18 0%, transparent 70%)`, borderRadius: '50%', transition: 'background 0.8s ease' }} />

        {/* Prev */}
        <button onClick={goPrev} style={{ zIndex: 30 }}
          className="absolute left-0 lg:left-6 top-[46%] -translate-y-1/2 p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-slate-950 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg">
          <ChevronLeft size={22} />
        </button>

        {/* Next */}
        <button onClick={goNext} style={{ zIndex: 30 }}
          className="absolute right-0 lg:right-6 top-[46%] -translate-y-1/2 p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-slate-950 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg">
          <ChevronRight size={22} />
        </button>

        {/* Ring */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          marginLeft: -CW / 2, marginTop: -(CH / 2) - 10,
          width: CW, height: CH,
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
          transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {certs.map((cert, idx) => {
            const angle = idx * angleStep;
            const diff = ((idx - safeIdx) % count + count) % count;
            const normalized = diff > count / 2 ? diff - count : diff;
            const absDiff = Math.abs(normalized);
            const isActive = absDiff === 0;
            const opacityVal = isActive ? 1 : absDiff === 1 ? 0.88 : 0;
            const brightnessVal = isActive ? 1 : absDiff === 1 ? 0.9 : 0.55;
            const Logo = logoMap[cert.icon] || (() => null);
            const c = cert.color;

            return (
              <div
                key={cert.title + idx}
                onClick={() => { if (opacityVal === 0) return; if (!isActive) setActiveIdx(idx); else onCertClick(cert); }}
                style={{
                  position: 'absolute', inset: 0,
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  cursor: opacityVal === 0 ? 'default' : 'pointer',
                  pointerEvents: opacityVal === 0 ? 'none' : 'auto',
                }}
              >
                {/* Counter-rotate content so it always faces the viewer */}
                <div style={{
                  width: '100%', height: '100%',
                  transform: `rotateY(${(safeIdx - idx) * angleStep}deg)`,
                  transition: 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                }}>
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden relative flex flex-col transition-all duration-500"
                    style={{
                      background: `linear-gradient(160deg, ${c}10 0%, rgba(8,18,38,0.97) 40%)`,
                      border: isActive ? `2px solid ${c}60` : `1px solid ${c}30`,
                      boxShadow: isActive
                        ? `0 0 55px ${c}40, 0 20px 60px rgba(0,0,0,0.8)`
                        : `0 0 25px ${c}18, 0 8px 30px rgba(0,0,0,0.6)`,
                      opacity: opacityVal,
                      filter: `brightness(${brightnessVal})`,
                      transition: 'opacity 0.85s ease, filter 0.85s ease, border 0.5s ease, box-shadow 0.5s ease',
                    }}
                  >
                    {/* Color top bar */}
                    <div className="h-1.5 w-full flex-shrink-0"
                      style={{ background: `linear-gradient(90deg, ${c}00, ${c}, ${c}00)`, opacity: isActive ? 1 : 0.4 }} />

                    {/* BG glow blob */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${c}10 0%, transparent 60%)` }} />

                     {/* Logo + category */}
                    <div className="flex items-center justify-between p-6 pb-3 relative z-10">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${c}14`, border: `1.5px solid ${c}28` }}>
                        <Logo size={30} />
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                        style={{ color: c, background: `${c}12`, border: `1px solid ${c}28` }}>
                        {cert.category}
                      </span>
                    </div>

                    {/* Title + issuer */}
                    <div className="px-6 pb-2 relative z-10">
                      <h3 className="text-[14px] font-extrabold text-white leading-snug mb-1">{cert.title}</h3>
                      <p className="text-[11px] font-bold" style={{ color: c }}>{cert.issuer}</p>
                    </div>

                    {/* Centered Badge Image */}
                    {cert.badge && (
                      <div className="flex justify-center items-center my-3 relative z-10 flex-1">
                        <img
                          src={cert.badge}
                          alt={cert.title}
                          className="w-20 h-20 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}

                    {/* Focus tags */}
                    {cert.focus?.length > 0 && (
                      <div className="px-6 pb-3 flex flex-wrap gap-1 relative z-10">
                        {cert.focus.slice(0, 3).map((tag, ti) => (
                          <span key={ti} className="text-[7px] font-semibold px-2 py-0.5 rounded-full text-white/40 bg-white/[0.04] border border-white/[0.06]">{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Issued date */}
                    <div className="px-6 pb-5 relative z-10">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/35">
                        <Calendar size={10} style={{ color: c, opacity: 0.7 }} />
                        <span>Issued: <span className="text-white/55 font-medium">{cert.issued}</span></span>
                      </div>
                    </div>

                    {/* Active CTA */}
                    {isActive && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                        className="px-6 pb-5 relative z-10">
                        <div className="text-[9px] text-white/35 font-semibold flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full inline-block" style={{ background: c }} />
                          Click to view details
                        </div>
                      </motion.div>
                    )}

                    {/* Hover overlay */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/25 transition-colors duration-300 group z-20">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-full bg-slate-950/70 border border-white/15 backdrop-blur-sm shadow-xl">
                          <Maximize2 size={24} className="text-white" />
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

      {/* ── Active title strip ── */}
      <div className="mt-2 mb-6 text-center px-4" style={{ minHeight: 72 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active.title}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}>
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-1">{active.title}</h3>
            <p className="text-sm font-semibold" style={{ color: active.color }}>{active.issuer}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dots ── */}
      <div className="flex items-center justify-center gap-2">
        {certs.map((cert, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === safeIdx ? 28 : 8,
              height: 8,
              background: i === safeIdx ? cert.color : 'rgba(255,255,255,0.2)',
              boxShadow: i === safeIdx ? `0 0 10px ${cert.color}80` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ── Main Section ───────────────────────────────────────────
const Certifications = () => {
  const { certifications } = portfolioData;
  const [selectedCert, setSelectedCert] = useState(null);

  const headV = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const itemV = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-background">

      {/* Ambient glows */}
      <div className="absolute top-[15%] left-[-8%] w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-8%] w-[360px] h-[360px] bg-primary/[0.05] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-[50%] left-[40%] w-[300px] h-[300px] bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div variants={headV} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="mb-14 text-center select-none">
          <motion.span variants={itemV} className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-3 block">
            Verified Credentials
          </motion.span>
          <motion.h2 variants={itemV} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Certifications
          </motion.h2>
          <motion.p variants={itemV} className="text-base text-textMuted max-w-xl mx-auto leading-relaxed">
            Industry-recognized credentials from Oracle, AWS &amp; Kaggle — use arrows to explore, click to verify.
          </motion.p>
        </motion.div>

        {/* 3D Carousel */}
        <Carousel3D certs={certifications || []} onCertClick={setSelectedCert} />
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
