import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Briefcase,
  Folder,
  Trophy,
  Award,
  Cloud,
  Cpu,
  Shield,
  Music,
  BookOpen,
  Sparkles,
  Code,
  Terminal,
  Activity,
  Layers,
  Brain,
  BarChart,
  Eye,
  Rocket
} from 'lucide-react';
import {
  FaJava,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaLaptopCode,
  FaGitAlt,
  FaDocker,
  FaCogs,
  FaDatabase
} from 'react-icons/fa';
import {
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiTailwindcss,
  SiBootstrap,
  SiFlask,
  SiMysql,
  SiTensorflow,
  SiOpencv,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiJupyter,
  SiKaggle,
  SiStreamlit,
  SiOpenai
} from 'react-icons/si';
import portfolioData from '../../data/portfolioData.json';

// Local Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    if (typeof value !== 'number') {
      setCount(value);
      return;
    }

    let startTime = null;
    let frameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  if (typeof value !== 'number') {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>{count}{suffix}</span>;
};

// Canvas-based secondary particles for background depth
const SubtleParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let particles = [];
    const count = 20;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Sparkle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = Math.random() * 0.12 - 0.06;
        this.vy = Math.random() * 0.12 - 0.06;
        this.alpha = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Sparkle());
    }

    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      frameId = requestAnimationFrame(run);
    };
    run();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" />;
};

// Keyword highlighter for dynamic about section text
const HighlightedText = ({ text }) => {
  if (!text) return null;
  
  const highlights = [
    { word: "AI", classes: "from-primary to-blue-400" },
    { word: "Machine Learning", classes: "from-blue-400 to-indigo-400" },
    { word: "Computer Vision", classes: "from-primary to-cyan-400" },
    { word: "Full-Stack Development", classes: "from-purple-400 to-pink-400" },
    { word: "Full Stack Development", classes: "from-purple-400 to-pink-400" },
    { word: "Full Stack", classes: "from-purple-400 to-pink-400" },
    { word: "MERN Stack", classes: "from-primary to-blue-400" },
    { word: "Java", classes: "from-red-400 to-orange-400" },
    { word: "Python", classes: "from-blue-400 to-cyan-400" },
    { word: "React.js", classes: "from-sky-400 to-blue-500" },
    { word: "Node.js", classes: "from-green-400 to-emerald-500" },
    { word: "MongoDB", classes: "from-emerald-500 to-teal-500" },
    { word: "TensorFlow", classes: "from-orange-500 to-red-500" },
    { word: "innovative applications", classes: "from-pink-400 to-rose-400" },
    { word: "complex problems", classes: "from-amber-400 to-yellow-500" },
    { word: "real-world software solutions", classes: "from-emerald-400 to-cyan-500" }
  ];
  
  const sortedHighlights = [...highlights].sort((a, b) => b.word.length - a.word.length);
  const pattern = sortedHighlights.map(h => h.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
  
  if (!pattern) return <span>{text}</span>;
  
  const regex = new RegExp(`(${pattern})`, 'g');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, idx) => {
        const highlight = sortedHighlights.find(h => h.word.toLowerCase() === part.toLowerCase());
        if (highlight) {
          return (
            <span key={idx} className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${highlight.classes}`}>
              {part}
            </span>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
};

// ========================================================
// 1. ABOUT HERO COMPONENT
// ========================================================
export const AboutHero = () => {
  const profileSummary = [
    { icon: FaLaptopCode, text: "Full Stack Developer & AI/ML Engineer", color: "text-primary" },
    { icon: GraduationCap, text: "B.Tech CSE (2023–2027)", color: "text-blue-400" },
    { icon: MapPin, text: "India", color: "text-purple-400" },
    { icon: Briefcase, text: "Open to Internship Opportunities", color: "text-emerald-400", pulse: true }
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 z-0">
      <SubtleParticles />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-[8%] left-[10%] w-[380px] h-[380px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Brand Icons: React & Java */}
      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block text-sky-400/[0.04]"
        style={{ top: "12%", left: "5%" }}
        animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      >
        <FaReact className="text-8xl" />
      </motion.div>

      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block text-red-500/[0.03]"
        style={{ top: "25%", right: "12%" }}
        animate={{ y: [0, -15, 0], x: [0, 6, 0], rotate: [0, -8, 8, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
      >
        <FaJava className="text-8xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8">
          {/* Left Column (Introduce text) */}
          <div className="lg:col-span-7 flex flex-col items-start select-none">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-3.5 block"
            >
              ABOUT ME
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8"
            >
              Who I Am & What I Build
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-base md:text-lg text-textMuted max-w-2xl leading-relaxed"
            >
              <p>
                <HighlightedText text={portfolioData.about.intro} />
              </p>
              <p>
                <HighlightedText text={portfolioData.about.description} />
              </p>
            </motion.div>
          </div>

          {/* Right Column (Glass Profile Summary Card) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              className="relative w-full max-w-md group"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-[32px] blur-[70px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700 opacity-60" />
              <div className="relative overflow-hidden bg-white/[0.015] hover:bg-white/[0.035] backdrop-blur-xl border border-white/5 group-hover:border-primary/20 rounded-[32px] p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500">
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="flex items-center gap-4 border-b border-white/5 pb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all duration-500">
                    <Code size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Developer Profile</h3>
                    <p className="text-xs text-textMuted font-mono">portfolio_v2.json</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-4 text-sm font-medium text-gray-300">
                  {profileSummary.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={idx}
                        className="flex items-center gap-4 bg-black/20 hover:bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 select-none"
                      >
                        <div className={`shrink-0 ${item.color} relative`}>
                          <Icon size={18} />
                          {item.pulse && (
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                          )}
                        </div>
                        <span className="text-sm md:text-base">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========================================================
// 2. ACHIEVEMENTS COMPONENT (Highlights)
// ========================================================
export const Achievements = () => {
  const highlights = [
    { icon: Folder, value: 10, suffix: "+", label: "Projects Built", color: "rgba(56,189,248,0.25)" },
    { icon: Trophy, value: 300, suffix: "+", label: "LeetCode Problems Solved", color: "rgba(245,158,11,0.25)" },
    { icon: Award, value: 6, suffix: "+", label: "Certifications", color: "rgba(168,85,247,0.25)" },
    { icon: Briefcase, value: "MERN Stack", suffix: "", label: "Developer Specialty", color: "rgba(16,185,129,0.25)" }
  ];

  return (
    <section id="achievements" className="relative overflow-hidden bg-background py-24 z-0 border-t border-white/5">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute bottom-[10%] left-[8%] w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Brand Icons: MongoDB */}
      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block text-emerald-500/[0.04]"
        style={{ bottom: "15%", left: "6%" }}
        animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut", delay: 2 }}
      >
        <SiMongodb className="text-8xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 select-none"
        >
          <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-2.5 block">
            METRICS
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Personal Highlights
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none"
        >
          {highlights.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
                whileHover={{ y: -6, boxShadow: "0 15px 35px rgba(56, 189, 248, 0.08)" }}
                className="relative overflow-hidden bg-white/[0.01] hover:bg-white/[0.025] border border-white/5 hover:border-primary/25 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 group"
              >
                <div
                  className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundColor: card.color }}
                />
                <div className="p-3 bg-white/[0.02] border border-white/5 text-primary rounded-xl mb-4 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/25 transition-all duration-300">
                  <Icon size={22} />
                </div>
                <h4 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                  <AnimatedCounter value={card.value} suffix={card.suffix} />
                </h4>
                <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">
                  {card.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// ========================================================
// 3. TECHNICAL SKILLS COMPONENT
// ========================================================
export const Skills = () => {
  // 6 Premium Skill Categories with Technology Icons
  const skillCategories = [
    {
      title: "💻 Languages",
      skills: [
        { name: "Java", icon: FaJava, color: "text-[#ea2d2e]" },
        { name: "Python", icon: FaPython, color: "text-[#3776ab]" },
        { name: "JavaScript", icon: SiJavascript, color: "text-[#f7df1e]" },
        { name: "SQL", icon: FaDatabase, color: "text-[#00758f]" }
      ]
    },
    {
      title: "🌐 Frontend Development",
      skills: [
        { name: "React.js", icon: FaReact, color: "text-[#61dafb]" },
        { name: "HTML5", icon: FaHtml5, color: "text-[#e34f26]" },
        { name: "CSS3", icon: FaCss3Alt, color: "text-[#1572b6]" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06b6d4]" },
        { name: "Bootstrap", icon: SiBootstrap, color: "text-[#7952b3]" }
      ]
    },
    {
      title: "⚙ Backend Development",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
        { name: "Express.js", icon: SiExpress, color: "text-[#ffffff]" },
        { name: "REST APIs", icon: Terminal, color: "text-primary" },
        { name: "Flask", icon: SiFlask, color: "text-[#ffffff]" },
        { name: "JWT Auth", icon: Shield, color: "text-purple-400" }
      ]
    },
    {
      title: "🗄 Databases",
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "text-[#47a248]" },
        { name: "MySQL", icon: SiMysql, color: "text-[#00758f]" }
      ]
    },
    {
      title: "🤖 AI / Machine Learning",
      skills: [
        { name: "TensorFlow", icon: SiTensorflow, color: "text-[#ff6f00]" },
        { name: "OpenCV", icon: SiOpencv, color: "text-[#5c3ee8]" },
        { name: "Scikit-learn", icon: SiScikitlearn, color: "text-[#f7931e]" },
        { name: "NumPy", icon: SiNumpy, color: "text-[#013243]" },
        { name: "Pandas", icon: SiPandas, color: "text-[#150458]" },
        { name: "Matplotlib", icon: BarChart, color: "text-primary" },
        { name: "XGBoost", icon: Cpu, color: "text-blue-400" }
      ]
    },
    {
      title: "🛠 Tools & Platforms",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "text-[#f05032]" },
        { name: "GitHub", icon: FaGithub, color: "text-[#ffffff]" },
        { name: "Docker", icon: FaDocker, color: "text-[#2496ed]" },
        { name: "Postman", icon: SiPostman, color: "text-[#ff6c37]" },
        { name: "VS Code", icon: FaLaptopCode, color: "text-[#007acc]" },
        { name: "Jupyter", icon: SiJupyter, color: "text-[#f37626]" },
        { name: "Kaggle", icon: SiKaggle, color: "text-[#20beff]" },
        { name: "Streamlit", icon: SiStreamlit, color: "text-[#ff4b4b]" },
        { name: "OpenAI API", icon: SiOpenai, color: "text-[#74aa9c]" },
        { name: "CI/CD", icon: FaCogs, color: "text-primary" }
      ]
    }
  ];

  // 6 Core Competence Progress Bars
  const progressBars = [
    { name: "Java", level: 92, color: "from-red-500 to-orange-500" },
    { name: "React.js", level: 90, color: "from-sky-400 to-blue-500" },
    { name: "Python", level: 88, color: "from-blue-500 to-indigo-500" },
    { name: "Node.js", level: 85, color: "from-green-400 to-emerald-500" },
    { name: "MongoDB", level: 80, color: "from-emerald-500 to-teal-500" },
    { name: "Machine Learning", level: 82, color: "from-purple-500 to-indigo-500" }
  ];

  // Background floating icons properties
  const floatingTech = [
    { icon: FaReact, color: "text-sky-400/[0.04]", top: "8%", left: "5%", delay: 0 },
    { icon: FaNodeJs, color: "text-green-500/[0.03]", top: "35%", right: "8%", delay: 2 },
    { icon: SiMongodb, color: "text-emerald-500/[0.04]", top: "65%", left: "6%", delay: 4 },
    { icon: FaPython, color: "text-blue-500/[0.03]", top: "22%", right: "12%", delay: 1 },
    { icon: SiTensorflow, color: "text-orange-500/[0.04]", top: "50%", left: "80%", delay: 3 },
    { icon: FaGithub, color: "text-white/[0.03]", top: "82%", right: "6%", delay: 5 }
  ];

  return (
    <section id="skills" className="relative overflow-hidden bg-background py-24 z-0 border-t border-white/5">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-[20%] right-[5%] w-[450px] h-[450px] bg-purple-500/[0.03] rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Brand Icons */}
      {floatingTech.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            className={`absolute pointer-events-none z-0 hidden md:block ${item.color}`}
            style={{ top: item.top, left: item.left, right: item.right }}
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + idx * 2.5,
              ease: "easeInOut",
              delay: item.delay
            }}
          >
            <Icon className="text-8xl" />
          </motion.div>
        );
      })}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 select-none"
        >
          <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-2.5 block">
            EXPERTISE
          </span>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical Skills & Technologies
          </h3>
          <p className="text-base md:text-lg text-textMuted max-w-3xl mx-auto leading-relaxed">
            Technologies, frameworks, tools, and AI/ML technologies used across Full Stack and Machine Learning projects.
          </p>
        </motion.div>

        {/* 3-Column Premium Skills Card Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(56, 189, 248, 0.12)",
                borderColor: "rgba(56, 189, 248, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/[0.01] hover:bg-white/[0.025] border border-white/5 rounded-[24px] p-7 flex flex-col h-full transition-all duration-300 group shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {cat.title}
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {cat.skills.map((skill, sIdx) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div
                      key={sIdx}
                      className="flex flex-col items-center justify-center p-3.5 bg-black/40 border border-white/5 rounded-xl hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-300 group/item"
                    >
                      <SkillIcon className={`text-3xl ${skill.color} mb-2.5 transition-all duration-300 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]`} />
                      <span className="text-[10px] font-bold text-gray-300 text-center tracking-wide truncate max-w-full">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Competence Levels (Progress Bars) */}
        <div className="mt-20 max-w-4xl mx-auto bg-white/[0.015] border border-white/5 rounded-[28px] p-8 md:p-10 relative select-none shadow-xl">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <h4 className="text-xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2.5">
            <Activity size={18} className="text-primary animate-pulse" />
            Core Competence Levels
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {progressBars.map((bar, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-gray-300 px-1">
                  <span>{bar.name}</span>
                  <span className="text-primary">
                    <AnimatedCounter value={bar.level} suffix="%" />
                  </span>
                </div>
                <div className="w-full h-3 bg-white/[0.04] rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.08 }}
                    className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Premium Section: Specializations */}
        <div className="mt-28 border-t border-white/5 pt-20 select-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-2.5 block">
              AREAS
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Core Specializations
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Full Stack Development", desc: "Building scalable MERN applications and REST APIs", icon: Rocket, color: "text-primary", bg: "bg-primary/10" },
              { title: "Machine Learning", desc: "Developing intelligent systems using TensorFlow and Scikit-learn", icon: Brain, color: "text-blue-400", bg: "bg-blue-500/10" },
              { title: "Computer Vision", desc: "Working with OpenCV, image processing, and facial recognition", icon: Eye, color: "text-purple-400", bg: "bg-purple-500/10" },
              { title: "Data Analysis", desc: "Using Pandas, NumPy, and visualization libraries for data insights", icon: BarChart, color: "text-emerald-400", bg: "bg-emerald-500/10" }
            ].map((spec, idx) => {
              const SpecIcon = spec.icon;
              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(56, 189, 248, 0.15)",
                    borderColor: "rgba(56, 189, 248, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white/[0.015] hover:bg-white/[0.035] border border-white/5 rounded-[28px] p-8 flex flex-col gap-5 transition-all duration-300 relative overflow-hidden group shadow-lg"
                >
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className={`p-4 ${spec.bg} ${spec.color} rounded-2xl self-start group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300 shadow-md`}>
                    <SpecIcon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2.5 tracking-wide">{spec.title}</h4>
                    <p className="text-xs md:text-sm text-textMuted leading-relaxed">{spec.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// ========================================================
// 4. EDUCATION & FOCUS COMPONENT
// ========================================================
export const Education = () => {
  const timeline = [
    { year: "2023", title: "Started Programming Journey", desc: "Entered B.Tech Computer Science, learning programming fundamentals, Java core concepts, and basic structures." },
    { year: "2024", title: "Learned Data Structures & Algorithms", desc: "Mastered array manipulations, trees, recursion, and key design patterns. Solved 300+ coding challenges on LeetCode." },
    { year: "2025", title: "Built Full Stack MERN Projects", desc: "Developed comprehensive, secure Web APIs, connecting back-end services with Mongo databases, JWT auth, and interactive front-ends." },
    { year: "2026", title: "Preparing for Software Engineering Roles", desc: "Diving deeper into enterprise System Design patterns, cloud ecosystems, security compliance, and internship opportunities." }
  ];

  const focusAreas = [
    { title: "Machine Learning Engineering", icon: Cpu, desc: "Designing end-to-end ML pipelines, feature engineering workflows, model optimization techniques, and deployment strategies for real-world AI applications." },
    { title: "Data Science & Analytics", icon: BarChart, desc: "Applying statistical analysis, data visualization, Pandas, NumPy, and exploratory data analysis to uncover insights and support data-driven decisions." },
    { title: "Deep Learning & Neural Networks", icon: Brain, desc: "Exploring TensorFlow, CNNs, transfer learning, neural network architectures, and deep learning techniques for intelligent systems." },
    { title: "Computer Vision Systems", icon: Eye, desc: "Building AI-powered applications using OpenCV, image processing, facial recognition, object detection, and real-time visual analysis." }
  ];

  const interests = [
    { title: "Music", icon: Music, desc: "Vibing to ambient electronic tracks that keep me focused while coding." },
    { title: "Learning New Tech", icon: BookOpen, desc: "Constantly checking developer newsletters and blogs for modern software practices." },
    { title: "Problem Solving", icon: Trophy, desc: "Competing on LeetCode and writing clean, optimal, and performant logic solutions." },
    { title: "Building Side Projects", icon: Sparkles, desc: "Turning creative product thoughts into functioning full-stack repositories." }
  ];

  return (
    <section id="education" className="relative overflow-hidden bg-background py-24 z-0 border-t border-white/5">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Brand Icons: GitHub */}
      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block text-white/[0.03]"
        style={{ top: "20%", right: "6%" }}
        animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut", delay: 2 }}
      >
        <FaGithub className="text-8xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 select-none"
        >
          <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-2.5 block">
            JOURNEY
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Journey Timeline
          </h3>
        </motion.div>

        <div className="relative max-w-4xl mx-auto py-8">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10 -translate-x-[1px] pointer-events-none" />

          <div className="space-y-12">
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.05 }}
                  className={`relative flex flex-col md:flex-row items-stretch gap-6 ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center pointer-events-none">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-75" />
                  </div>

                  <div className="ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] select-none">
                    <motion.div
                      whileHover={{ y: -4, border: "1px solid rgba(56, 189, 248, 0.2)" }}
                      className="bg-white/[0.01] hover:bg-white/[0.025] border border-white/5 p-6 rounded-3xl backdrop-blur-md transition-all duration-300 relative group"
                    >
                      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      <span className="inline-block text-xs font-mono font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-3.5 shadow-[0_0_12px_rgba(56,189,248,0.15)]">
                        {item.year}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-textMuted">{item.desc}</p>
                    </motion.div>
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* CURRENT FOCUS                                            */}
        {/* ======================================================== */}
        <div className="mt-28 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 select-none"
          >
            <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-2.5 block">
              DIRECTIONS
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Current Focus
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {focusAreas.map((area, idx) => {
              const FocusIcon = area.icon;
              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(56, 189, 248, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white/[0.01] hover:bg-white/[0.025] border border-white/5 hover:border-primary/20 p-6 rounded-[24px] flex flex-col items-start gap-4 transition-all duration-300 group select-none relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="p-3 bg-white/[0.02] border border-white/5 text-primary rounded-xl group-hover:bg-primary/10 group-hover:border-primary/25 group-hover:scale-110 transition-all duration-300">
                    <FocusIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{area.title}</h4>
                    <p className="text-xs md:text-sm text-textMuted leading-relaxed">{area.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* BEYOND CODING                                            */}
        {/* ======================================================== */}
        <div className="mt-28 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 select-none"
          >
            <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase font-bold mb-2.5 block">
              HOBBIES
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Beyond Coding
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {interests.map((interest, idx) => {
              const InterestIcon = interest.icon;
              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  whileHover={{
                    scale: 1.03,
                    border: "1px solid rgba(56, 189, 248, 0.2)"
                  }}
                  className="bg-white/[0.01] hover:bg-white/[0.025] border border-white/5 rounded-[24px] p-6 flex flex-col gap-3.5 transition-all duration-300 select-none relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/[0.02] border border-white/5 text-primary rounded-lg">
                      <InterestIcon size={16} />
                    </div>
                    <h4 className="text-base font-bold text-white tracking-wide">{interest.title}</h4>
                  </div>
                  <p className="text-xs md:text-sm text-textMuted leading-relaxed">{interest.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
