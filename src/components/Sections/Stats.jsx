import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Folder, Trophy, Award, GraduationCap, Code, Terminal } from 'lucide-react';
import portfolioData from '../../data/portfolioData.json';

// Dynamic icon mapper
const iconMap = {
  Folder: Folder,
  Code: Code,
  Trophy: Trophy,
  Terminal: Terminal,
  Award: Award,
  GraduationCap: GraduationCap
};

// Animated Counter Sub-component using requestAnimationFrame
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const numericStr = String(value).replace(/[^0-9]/g, '');
    const numValue = parseInt(numericStr, 10);
    
    if (isNaN(numValue)) {
      setCount(value);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // easeOutCubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * numValue);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(numValue);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration]);

  // Extract non-digit suffix (like "+")
  const suffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : '';

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const { stats, contact } = portfolioData;

  if (!stats || stats.length === 0) return null;

  const getLinkInfo = (index) => {
    switch (index) {
      case 0: // Projects
        return { href: "#projects", target: "_self" };
      case 1: // LeetCode
        return { href: contact?.leetcode || "https://leetcode.com/u/rishabh3883/", target: "_blank", rel: "noreferrer" };
      case 2: // Certifications
        return { href: "#achievements", target: "_self" };
      case 3: // Graduation
        return { href: "#education", target: "_self" };
      default:
        return { href: null };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <section className="py-6 md:py-8 relative overflow-hidden z-10 w-full">
      {/* Subtle top divider and background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Code;
            const linkInfo = getLinkInfo(index);
            
            return (
              <motion.a
                key={index}
                href={linkInfo.href}
                target={linkInfo.target}
                rel={linkInfo.rel}
                variants={cardVariants}
                className="group relative overflow-hidden bg-white/[0.015] hover:bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-primary/30 rounded-[24px] p-8 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(56,189,248,0.1)] cursor-pointer"
              >
                {/* Background glow circle */}
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500 pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all duration-500 pointer-events-none" />

                {/* Icon Container */}
                <div className="bg-primary/10 border border-primary/20 text-primary rounded-2xl p-4 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40 shadow-[0_0_15px_rgba(56,189,248,0.1)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]">
                  <IconComponent size={24} strokeWidth={2} />
                </div>

                {/* Stat Value */}
                <div className="text-4xl lg:text-5xl font-extrabold text-white mt-6 tracking-tight font-sans transition-colors duration-300 group-hover:text-primary flex items-center">
                  <AnimatedCounter value={stat.value} />
                </div>

                {/* Stat Label */}
                <span className="text-sm font-semibold text-textMuted uppercase tracking-wider mt-2.5 block">
                  {stat.label}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
