import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Image as ImageIcon,
  CheckCircle, 
  AlertCircle, 
  User, 
  FileCode, 
  GraduationCap, 
  Trophy, 
  Briefcase, 
  Mail, 
  Download,
  Eye,
  EyeOff,
  BarChart3
} from 'lucide-react';
import defaultProfileImg from '../assets/146321370.jpg';
import initialPortfolioData from '../data/portfolioData.json';

const AVAILABLE_ICONS = [
  { name: 'Java', value: 'FaJava' },
  { name: 'Python', value: 'FaPython' },
  { name: 'JavaScript', value: 'SiJavascript' },
  { name: 'HTML', value: 'FaHtml5' },
  { name: 'CSS', value: 'FaCss3Alt' },
  { name: 'React.js', value: 'FaReact' },
  { name: 'Node.js', value: 'FaNodeJs' },
  { name: 'Express.js', value: 'SiExpress' },
  { name: 'MongoDB', value: 'SiMongodb' },
  { name: 'REST APIs', value: 'TbApi' },
  { name: 'JWT Auth', value: 'MdSecurity' },
  { name: 'CRUD Ops', value: 'FiDatabase' },
  { name: 'SQL', value: 'BsDatabase' },
  { name: 'Git', value: 'FaGitAlt' },
  { name: 'GitHub', value: 'FaGithub' },
  { name: 'GitHub Actions', value: 'SiGithubactions' },
  { name: 'Docker', value: 'FaDocker' },
  { name: 'Postman', value: 'SiPostman' },
  { name: 'CI/CD', value: 'FaCogs' },
  { name: 'Generic Code', value: 'FaCode' },
  { name: 'Server/Backend', value: 'FaServer' },
  { name: 'Terminal', value: 'FaTerminal' },
  { name: 'Laptop/Web', value: 'FaLaptopCode' }
];

const AdminPanel = () => {
  const [data, setData] = useState(initialPortfolioData);
  const [activeTab, setActiveTab] = useState('hero');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  // Notification states
  const [status, setStatus] = useState({ type: '', message: '' });
  const [showProductionModal, setShowProductionModal] = useState(false);

  // Simple authentication: user can change this password or bypass
  const handleLogin = (e) => {
    e.preventDefault();
    const envPasscode = import.meta.env.VITE_ADMIN_PASSCODE;
    const isCorrect = envPasscode 
      ? password === envPasscode 
      : (password === 'admin123' || password === 'rishabh123');

    if (isCorrect) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const notify = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: '', message: '' }), 4000);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/save-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        notify('success', 'Changes saved successfully to local files!');
      } else {
        // Fallback for static deployment / production
        setShowProductionModal(true);
      }
    } catch (err) {
      console.error(err);
      setShowProductionModal(true);
    }
  };

  const downloadJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'portfolioData.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    notify('success', 'Configuration file downloaded!');
  };

  const handleFileUpload = async (e, type, projIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;

    let fileName;
    if (type === 'resume') {
      fileName = 'resume.pdf';
    } else if (type === 'avatar') {
      fileName = 'profile.jpg';
    } else if (type === 'project') {
      const fileExt = file.name.split('.').pop() || 'jpg';
      fileName = `project_${projIndex}_${Date.now()}.${fileExt}`;
    }

    notify('info', `Uploading ${file.name}...`);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;

      try {
        const response = await fetch('/api/upload-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName, base64Data })
        });

        if (response.ok) {
          const resData = await response.json();
          if (type === 'resume') {
            setData(prev => ({
              ...prev,
              hero: { ...prev.hero, resumeUrl: resData.url }
            }));
            notify('success', 'Resume PDF uploaded successfully!');
          } else if (type === 'avatar') {
            setData(prev => ({
              ...prev,
              hero: { ...prev.hero, profileImg: `${resData.url}?t=${Date.now()}` }
            }));
            notify('success', 'Profile image uploaded successfully!');
          } else if (type === 'project') {
            setData(prev => ({
              ...prev,
              projects: prev.projects.map((proj, pIdx) => 
                pIdx === projIndex ? { ...proj, image: resData.url } : proj
              )
            }));
            notify('success', 'Project image uploaded successfully!');
          }
        } else {
          notify('error', 'Upload failed. File uploads are only supported in local development.');
        }
      } catch (err) {
        notify('error', 'Upload failed. File uploads are only supported in local development.');
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper functions for updating specific nested fields
  const handleHeroChange = (key, value) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, [key]: value }
    }));
  };

  const handleAboutChange = (key, value) => {
    setData(prev => ({
      ...prev,
      about: { ...prev.about, [key]: value }
    }));
  };

  const handleContactChange = (key, value) => {
    setData(prev => ({
      ...prev,
      contact: { ...prev.contact, [key]: value }
    }));
  };

  const handleStatChange = (index, key, value) => {
    setData(prev => ({
      ...prev,
      stats: prev.stats ? prev.stats.map((stat, idx) => 
        idx === index ? { ...stat, [key]: value } : stat
      ) : []
    }));
  };

  // Lists (tags, skills, projects, education, achievements) helpers
  const handleTagAdd = (tag) => {
    if (!tag.trim()) return;
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, tags: [...prev.hero.tags, tag.trim()] }
    }));
  };

  const handleTagRemove = (index) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, tags: (prev.hero?.tags || []).filter((_, i) => i !== index) }
    }));
  };

  // Skills
  const handleAddSkillCategory = () => {
    setData(prev => ({
      ...prev,
      skills: [...(prev.skills || []), { title: 'New Category', skills: [] }]
    }));
  };

  const handleRemoveSkillCategory = (catIndex) => {
    setData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== catIndex)
    }));
  };

  const handleSkillCategoryNameChange = (catIndex, newTitle) => {
    setData(prev => ({
      ...prev,
      skills: (prev.skills || []).map((cat, idx) => 
        idx === catIndex ? { ...cat, title: newTitle } : cat
      )
    }));
  };

  const handleAddSkill = (catIndex) => {
    setData(prev => ({
      ...prev,
      skills: (prev.skills || []).map((cat, idx) => 
        idx === catIndex 
          ? { ...cat, skills: [...(cat.skills || []), { name: 'New Skill', icon: 'FaCode' }] }
          : cat
      )
    }));
  };

  const handleRemoveSkill = (catIndex, skillIndex) => {
    setData(prev => ({
      ...prev,
      skills: (prev.skills || []).map((cat, idx) => 
        idx === catIndex 
          ? { ...cat, skills: (cat.skills || []).filter((_, i) => i !== skillIndex) }
          : cat
      )
    }));
  };

  const handleSkillDetailsChange = (catIndex, skillIndex, field, value) => {
    setData(prev => ({
      ...prev,
      skills: (prev.skills || []).map((cat, idx) => 
        idx === catIndex 
          ? {
              ...cat,
              skills: (cat.skills || []).map((skill, sIdx) => 
                sIdx === skillIndex ? { ...skill, [field]: value } : skill
              )
            }
          : cat
      )
    }));
  };

  // Projects
  const handleAddProject = () => {
    setData(prev => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        { 
          title: 'New Project', 
          category: 'Full Stack',
          description: 'A brief description of your awesome project.',
          badge: '⭐ Featured',
          image: 'smart_campus.jpg',
          github: 'https://github.com/rishabh3883',
          live: 'https://github.com/rishabh3883',
          metadata: ['⚡ Modern Design', '📡 REST APIs'],
          points: ['Implemented core features', 'Optimized application behavior'],
          tags: ['React', 'Node.js'] 
        }
      ]
    }));
  };

  const handleRemoveProject = (index) => {
    setData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index)
    }));
  };

  const handleProjectFieldChange = (index, field, value) => {
    setData(prev => ({
      ...prev,
      projects: (prev.projects || []).map((proj, idx) => 
        idx === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const handleProjectTagAdd = (projIndex, tag) => {
    if (!tag.trim()) return;
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projIndex 
          ? { ...proj, tags: [...proj.tags, tag.trim()] }
          : proj
      )
    }));
  };

  const handleProjectTagRemove = (projIndex, tagIndex) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projIndex 
          ? { ...proj, tags: proj.tags.filter((_, i) => i !== tagIndex) }
          : proj
      )
    }));
  };

  const handleProjectPointAdd = (projIndex, point) => {
    if (!point.trim()) return;
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projIndex 
          ? { ...proj, points: [...(proj.points || []), point.trim()] }
          : proj
      )
    }));
  };

  const handleProjectPointRemove = (projIndex, pointIndex) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projIndex 
          ? { ...proj, points: proj.points.filter((_, i) => i !== pointIndex) }
          : proj
      )
    }));
  };

  const handleProjectPointChange = (projIndex, pointIndex, value) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projIndex 
          ? {
              ...proj,
              points: proj.points.map((pt, pIdx) => pIdx === pointIndex ? value : pt)
            }
          : proj
      )
    }));
  };

  const handleProjectMetadataAdd = (projIndex, meta) => {
    if (!meta.trim()) return;
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projIndex 
          ? { ...proj, metadata: [...(proj.metadata || []), meta.trim()] }
          : proj
      )
    }));
  };

  const handleProjectMetadataRemove = (projIndex, metaIndex) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, idx) => 
        idx === projIndex 
          ? { ...proj, metadata: (proj.metadata || []).filter((_, i) => i !== metaIndex) }
          : proj
      )
    }));
  };

  // Education
  const handleAddEducation = () => {
    setData(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        { degree: 'Degree Name', institution: 'University Name', period: '2023 - 2027', cgpa: '0.0' }
      ]
    }));
  };

  const handleRemoveEducation = (index) => {
    setData(prev => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setData(prev => ({
      ...prev,
      education: (prev.education || []).map((edu, idx) => 
        idx === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  // Achievements
  const handleAddAchievement = () => {
    setData(prev => ({
      ...prev,
      achievements: [
        ...(prev.achievements || []),
        { year: '2026', title: 'Achievement Title', description: 'Achievement Details' }
      ]
    }));
  };

  const handleRemoveAchievement = (index) => {
    setData(prev => ({
      ...prev,
      achievements: (prev.achievements || []).filter((_, i) => i !== index)
    }));
  };

  const handleAchievementChange = (index, field, value) => {
    setData(prev => ({
      ...prev,
      achievements: (prev.achievements || []).map((ach, idx) => 
        idx === index ? { ...ach, [field]: value } : ach
      )
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 -left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass max-w-md w-full p-8 rounded-3xl border border-white/10 flex flex-col items-center relative z-10 shadow-2xl"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center mb-6">
            <Briefcase size={32} />
          </div>
          
          <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight">Admin Portal</h2>
          <p className="text-sm text-textMuted text-center mb-8">Enter your passcode to manage your portfolio</p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
            <div className="relative">
              <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Passcode</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center tracking-widest font-mono text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-400 text-xs font-medium mt-2 text-center">
                  Incorrect passcode. Please check your environment configuration.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-sky-500 text-background font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <a 
            href="#home" 
            className="flex items-center gap-2 text-sm text-textMuted hover:text-white transition-colors mt-8 font-medium"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col lg:flex-row relative">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Notifications toast */}
      <AnimatePresence>
        {status.message && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 px-6 py-4 rounded-2xl flex items-center gap-3 border shadow-2xl text-sm font-semibold max-w-md ${
              status.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : status.type === 'error' 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                  : 'bg-primary/10 text-primary border-primary/20'
            }`}
          >
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{status.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20 backdrop-blur-xl p-8 flex flex-col relative z-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Rishabh<span className="text-primary">.</span> <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">Admin</span>
            </h1>
            <p className="text-xs text-textMuted mt-1">Manage Portfolio Details</p>
          </div>
          <a href="#home" className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-textMuted hover:text-white transition-all shadow-md">
            <ArrowLeft size={18} />
          </a>
        </div>

        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none shrink-0">
          {[
            { id: 'hero', label: 'Hero Section', icon: User },
            { id: 'stats', label: 'Statistics', icon: BarChart3 },
            { id: 'about', label: 'About Info', icon: FileCode },
            { id: 'skills', label: 'Tech Skills', icon: FileCode },
            { id: 'projects', label: 'Projects List', icon: Briefcase },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'achievements', label: 'Milestones', icon: Trophy },
            { id: 'contact', label: 'Contact Details', icon: Mail }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all shrink-0 border ${
                  activeTab === tab.id 
                    ? 'bg-primary text-background border-primary shadow-lg shadow-primary/20 font-bold scale-[1.02]' 
                    : 'text-textMuted hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <IconComp size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto hidden lg:flex flex-col gap-3 shrink-0 pt-8 border-t border-white/5">
          <button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-sky-500 text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Save size={18} /> Save Changes
          </button>
          <button
            onClick={downloadJSON}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Download size={18} /> Download Config
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-8 lg:p-12 relative z-10 max-w-5xl mx-auto w-full pb-28 lg:pb-12 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider font-sans">
              Edit {activeTab}
            </h2>
            <div className="flex lg:hidden gap-3">
              <button 
                onClick={handleSave}
                className="p-3 bg-primary text-background rounded-xl hover:bg-sky-500 transition-all flex items-center gap-2 font-bold shadow-lg"
              >
                <Save size={18} />
              </button>
              <button 
                onClick={downloadJSON}
                className="p-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
              >
                <Download size={18} />
              </button>
            </div>
          </div>

          {/* Form Fields according to activeTab */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">Name</label>
                  <input
                    type="text"
                    value={data.hero.name}
                    onChange={(e) => handleHeroChange('name', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">Professional Role</label>
                  <input
                    type="text"
                    value={data.hero.role}
                    onChange={(e) => handleHeroChange('role', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">Hero Header Title</label>
                  <input
                    type="text"
                    value={data.hero.title}
                    onChange={(e) => handleHeroChange('title', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">Title Highlight Word</label>
                  <input
                    type="text"
                    value={data.hero.highlight}
                    onChange={(e) => handleHeroChange('highlight', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="e.g. MERN"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Tagline Subtitle</label>
                <textarea
                  value={data.hero.subtitle}
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-24 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">Education Period Tagline</label>
                  <input
                    type="text"
                    value={data.hero.educationPeriod}
                    onChange={(e) => handleHeroChange('educationPeriod', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="e.g. B.Tech • Session 2023 - 2027"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">Resume Path / Link</label>
                  <input
                    type="text"
                    value={data.hero.resumeUrl}
                    onChange={(e) => handleHeroChange('resumeUrl', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Tag Badges editor */}
              <div>
                <label className="block text-sm font-medium text-textMuted mb-3">Skill Tags (Hero Badges)</label>
                <div className="flex flex-wrap gap-2 mb-4 bg-black/30 p-4 border border-white/5 rounded-2xl">
                  {data.hero.tags && data.hero.tags.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                      {tag}
                      <button type="button" onClick={() => handleTagRemove(idx)} className="hover:text-white transition-colors">
                        <Trash2 size={12} className="text-red-400" />
                      </button>
                    </span>
                  ))}
                  {(!data.hero.tags || data.hero.tags.length === 0) && (
                    <span className="text-xs text-textMuted py-1">No badges added yet.</span>
                  )}
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="new-tag-input"
                    placeholder="Add new tag"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleTagAdd(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('new-tag-input');
                      handleTagAdd(el.value);
                      el.value = '';
                    }}
                    className="px-4 py-2.5 bg-primary text-background font-bold rounded-xl text-sm hover:bg-sky-500 transition-colors flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Tag
                  </button>
                </div>
              </div>

              {/* Uploads row */}
              <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Image Uploader */}
                <div className="p-6 bg-black/30 border border-white/5 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={data.hero.profileImg || '/profile.jpg'}
                    onError={(e) => { e.target.onerror = null; e.target.src = defaultProfileImg; }}
                    className="w-20 h-20 rounded-full border border-primary/20 object-cover"
                    alt="avatar"
                  />
                  <div className="flex-1 w-full">
                    <h4 className="font-bold text-white flex items-center gap-1.5 text-sm mb-1">
                      <ImageIcon size={16} className="text-primary" /> Profile Picture
                    </h4>
                    <p className="text-xs text-textMuted mb-4">Upload a high quality square JPEG/PNG</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold cursor-pointer hover:bg-white/10 transition-colors shadow-md">
                      <Upload size={14} /> Upload Image
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, 'avatar')} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                {/* Resume PDF Uploader */}
                <div className="p-6 bg-black/30 border border-white/5 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                    <FileText size={32} />
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="font-bold text-white flex items-center gap-1.5 text-sm mb-1">
                      <FileText size={16} className="text-primary" /> Resume PDF
                    </h4>
                    <p className="text-xs text-textMuted mb-4">Upload PDF resume. Overwrites existing</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold cursor-pointer hover:bg-white/10 transition-colors shadow-md">
                      <Upload size={14} /> Upload PDF
                      <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={(e) => handleFileUpload(e, 'resume')} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Introduction Hook Statement</label>
                <textarea
                  value={data.about.intro}
                  onChange={(e) => handleAboutChange('intro', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-28 leading-relaxed"
                  placeholder="e.g. Computer Science undergraduate skilled in..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Full Description Bio</label>
                <textarea
                  value={data.about.description}
                  onChange={(e) => handleAboutChange('description', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-48 leading-relaxed"
                  placeholder="e.g. Passionate about software development..."
                />
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-textMuted">Group and organize skills into technical blocks</p>
                <button
                  type="button"
                  onClick={handleAddSkillCategory}
                  className="px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary font-bold rounded-xl text-sm hover:bg-primary/25 transition-all flex items-center gap-1.5"
                >
                  <Plus size={16} /> Add Category
                </button>
              </div>

              <div className="space-y-6">
                {data.skills && data.skills.map((category, catIdx) => (
                  <div key={catIdx} className="bg-black/30 border border-white/5 rounded-2xl p-6 relative group">
                    <button
                      type="button"
                      onClick={() => handleRemoveSkillCategory(catIdx)}
                      className="absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 border border-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="mb-6 max-w-md">
                      <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Category Title</label>
                      <input
                        type="text"
                        value={category.title}
                        onChange={(e) => handleSkillCategoryNameChange(catIdx, e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white font-semibold text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>

                    <div className="border-t border-white/5 pt-6">
                      <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-4">Skills & Icons</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {category.skills && category.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex gap-3 bg-black/40 border border-white/10 rounded-xl p-3 items-center">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleSkillDetailsChange(catIdx, sIdx, 'name', e.target.value)}
                              className="flex-1 min-w-0 bg-transparent border-b border-transparent focus:border-primary py-1 text-sm focus:outline-none text-white font-medium"
                              placeholder="Skill Name"
                            />
                            
                            <select
                              value={skill.icon}
                              onChange={(e) => handleSkillDetailsChange(catIdx, sIdx, 'icon', e.target.value)}
                              className="bg-black border border-white/10 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary text-gray-300 font-semibold"
                            >
                              {AVAILABLE_ICONS.map(ic => (
                                <option key={ic.value} value={ic.value}>{ic.name}</option>
                              ))}
                            </select>

                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(catIdx, sIdx)}
                              className="p-1.5 rounded-md hover:bg-red-500/10 text-red-400/80 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddSkill(catIdx)}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 text-white font-semibold rounded-lg text-xs hover:bg-white/10 transition-colors flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Skill Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-textMuted">Create, delete and reorder featured projects</p>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary font-bold rounded-xl text-sm hover:bg-primary/25 transition-all flex items-center gap-1.5"
                >
                  <Plus size={16} /> Add Project
                </button>
              </div>

              <div className="space-y-8">
                {data.projects && data.projects.map((project, idx) => (
                  <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-6 relative group">
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(idx)}
                      className="absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 border border-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleProjectFieldChange(idx, 'title', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Project Category</label>
                        <select
                          value={project.category || 'Full Stack'}
                          onChange={(e) => handleProjectFieldChange(idx, 'category', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-slate-900"
                        >
                          <option value="Full Stack">Full Stack</option>
                          <option value="AI / ML">AI / ML</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Project Badge (e.g. ⭐ Featured)</label>
                        <input
                          type="text"
                          value={project.badge || ''}
                          onChange={(e) => handleProjectFieldChange(idx, 'badge', e.target.value)}
                          placeholder="e.g. ⭐ Featured Project"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">GitHub Code URL</label>
                        <input
                          type="text"
                          value={project.github || ''}
                          onChange={(e) => handleProjectFieldChange(idx, 'github', e.target.value)}
                          placeholder="https://github.com/..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Live Demo URL</label>
                        <input
                          type="text"
                          value={project.live || ''}
                          onChange={(e) => handleProjectFieldChange(idx, 'live', e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Project Description</label>
                      <textarea
                        value={project.description || ''}
                        onChange={(e) => handleProjectFieldChange(idx, 'description', e.target.value)}
                        placeholder="Detailed description of the project"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all h-24 resize-none leading-relaxed"
                      />
                    </div>

                    {/* Project Image Section */}
                    <div className="mb-6 p-5 bg-black/20 border border-white/5 rounded-2xl">
                      <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-3">Project Banner Image</label>
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Preview */}
                        <div className="w-36 h-20 rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0">
                          <img
                            src={project.image && (project.image.startsWith('/') || project.image.startsWith('http'))
                              ? project.image
                              : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80'
                            }
                            alt="project-preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
                            }}
                          />
                        </div>

                        <div className="flex-1 w-full space-y-3">
                          {/* Image Path input */}
                          <div>
                            <input
                              type="text"
                              value={project.image || ''}
                              onChange={(e) => handleProjectFieldChange(idx, 'image', e.target.value)}
                              placeholder="Image filename (e.g. smart_campus.jpg) or URL"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                          
                          {/* Upload button */}
                          <label className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold cursor-pointer hover:bg-white/10 transition-colors shadow-md">
                            <Upload size={12} /> Upload New Image
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileUpload(e, 'project', idx)} 
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="mb-6">
                      <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-3">Key Highlights / Bullet Points</label>
                      <div className="space-y-3 mb-4">
                        {project.points && project.points.map((point, pIdx) => (
                          <div key={pIdx} className="flex gap-3 items-center">
                            <span className="text-primary text-lg">•</span>
                            <input
                              type="text"
                              value={point}
                              onChange={(e) => handleProjectPointChange(idx, pIdx, e.target.value)}
                              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => handleProjectPointRemove(idx, pIdx)}
                              className="p-2 text-red-400/80 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <input
                          type="text"
                          id={`new-point-input-${idx}`}
                          placeholder="Add new detail point"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleProjectPointAdd(idx, e.target.value);
                              e.target.value = '';
                            }
                          }}
                          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById(`new-point-input-${idx}`);
                            handleProjectPointAdd(idx, el.value);
                            el.value = '';
                          }}
                          className="px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-xl hover:bg-white/10 transition-colors"
                        >
                          Add Point
                        </button>
                      </div>
                    </div>

                    {/* Feature Metadata Tags */}
                    <div className="mb-6">
                      <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-3">Feature Metadata Tags (e.g. ⚡ Responsive Design)</label>
                      <div className="flex flex-wrap gap-2 mb-4 bg-black/40 p-3 border border-white/10 rounded-xl">
                        {project.metadata && project.metadata.map((meta, mIdx) => (
                          <span key={mIdx} className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                            {meta}
                            <button type="button" onClick={() => handleProjectMetadataRemove(idx, mIdx)}>
                              <Trash2 size={10} className="text-red-400 ml-1" />
                            </button>
                          </span>
                        ))}
                        {(!project.metadata || project.metadata.length === 0) && (
                          <span className="text-xs text-textMuted py-1">No feature metadata tags configured.</span>
                        )}
                      </div>
                      <div className="flex gap-3 max-w-sm">
                        <input
                          type="text"
                          id={`new-proj-meta-${idx}`}
                          placeholder="Add metadata (e.g. 🔐 Authentication)"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleProjectMetadataAdd(idx, e.target.value);
                              e.target.value = '';
                            }
                          }}
                          className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById(`new-proj-meta-${idx}`);
                            handleProjectMetadataAdd(idx, el.value);
                            el.value = '';
                          }}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-xl hover:bg-white/10 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Tech tags */}
                    <div>
                      <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-3">Technology Tags</label>
                      <div className="flex flex-wrap gap-2 mb-4 bg-black/40 p-3 border border-white/10 rounded-xl">
                        {project.tags && project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="flex items-center gap-1 px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                            {tag}
                            <button type="button" onClick={() => handleProjectTagRemove(idx, tIdx)}>
                              <Trash2 size={10} className="text-red-400 ml-1" />
                            </button>
                          </span>
                        ))}
                        {(!project.tags || project.tags.length === 0) && (
                          <span className="text-xs text-textMuted py-1">No tags configured.</span>
                        )}
                      </div>
                      <div className="flex gap-3 max-w-sm">
                        <input
                          type="text"
                          id={`new-proj-tag-${idx}`}
                          placeholder="Add tag (e.g. React)"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleProjectTagAdd(idx, e.target.value);
                              e.target.value = '';
                            }
                          }}
                          className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById(`new-proj-tag-${idx}`);
                            handleProjectTagAdd(idx, el.value);
                            el.value = '';
                          }}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-xl hover:bg-white/10 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-textMuted">Manage academic credentials and scores</p>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary font-bold rounded-xl text-sm hover:bg-primary/25 transition-all flex items-center gap-1.5"
                >
                  <Plus size={16} /> Add Credentials
                </button>
              </div>

              <div className="space-y-6">
                {data.education && data.education.map((edu, idx) => (
                  <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-6 relative group">
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(idx)}
                      className="absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 border border-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Degree Name</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">School / University</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Academic Session Period</label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) => handleEducationChange(idx, 'period', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                          placeholder="e.g. 2023 - 2027"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">CGPA / Score</label>
                        <input
                          type="text"
                          value={edu.cgpa}
                          onChange={(e) => handleEducationChange(idx, 'cgpa', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                          placeholder="e.g. 7.4"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-textMuted">Highlight hackathons, prizes and key highlights</p>
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary font-bold rounded-xl text-sm hover:bg-primary/25 transition-all flex items-center gap-1.5"
                >
                  <Plus size={16} /> Add Milestone
                </button>
              </div>

              <div className="space-y-6">
                {data.achievements && data.achievements.map((ach, idx) => (
                  <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-6 relative group">
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(idx)}
                      className="absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 border border-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                      <div className="md:col-span-1">
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Year</label>
                        <input
                          type="text"
                          value={ach.year}
                          onChange={(e) => handleAchievementChange(idx, 'year', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-primary transition-all"
                          placeholder="e.g. 2026"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Title</label>
                        <input
                          type="text"
                          value={ach.title}
                          onChange={(e) => handleAchievementChange(idx, 'title', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-primary transition-all"
                          placeholder="2nd place in hackathon"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Detailed Description</label>
                      <textarea
                        value={ach.description}
                        onChange={(e) => handleAchievementChange(idx, 'description', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all h-20 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">Email Address</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={data.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={data.contact.github}
                    onChange={(e) => handleContactChange('github', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={data.contact.linkedin}
                    onChange={(e) => handleContactChange('linkedin', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textMuted mb-2">LeetCode Profile URL</label>
                  <input
                    type="url"
                    value={data.contact.leetcode || ''}
                    onChange={(e) => handleContactChange('leetcode', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all"
                    placeholder="https://leetcode.com/u/your-username/"
                  />
                </div>
              </div>

              <div className="border-t border-white/5 pt-6">
                <label className="block text-sm font-medium text-textMuted mb-2">Web3Forms API Access Key</label>
                <input
                  type="text"
                  value={data.contact.web3formsKey}
                  onChange={(e) => handleContactChange('web3formsKey', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-mono focus:outline-none focus:border-primary transition-all"
                  placeholder="Paste Web3Forms key here for contact form to work"
                />
                <p className="text-xs text-textMuted mt-2">Get a free key from <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-primary underline">web3forms.com</a> to receive contact form emails instantly.</p>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <p className="text-sm text-textMuted mb-6">Modify the statistics cards on the homepage.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.stats && data.stats.map((stat, idx) => (
                  <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-6 relative">
                    <h3 className="text-lg font-bold text-primary mb-4">
                      Card {idx + 1}: {stat.label || 'Stat Card'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Card Label</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-sm font-semibold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Card Value</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-sm font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-textMuted tracking-wider mb-2">Icon Type</label>
                          <select
                            value={stat.icon}
                            onChange={(e) => handleStatChange(idx, 'icon', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-all text-sm bg-slate-900"
                          >
                            <option value="Folder">Folder</option>
                            <option value="Code">Code</option>
                            <option value="Trophy">Trophy</option>
                            <option value="Terminal">Terminal</option>
                            <option value="Award">Award</option>
                            <option value="GraduationCap">Graduation Cap</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Floating Save Actions bar for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-white/5 p-4 flex gap-4 z-40">
        <button
          onClick={handleSave}
          className="flex-1 bg-primary hover:bg-sky-500 text-background font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Save size={18} /> Save Changes
        </button>
        <button
          onClick={downloadJSON}
          className="flex-1 bg-white/5 border border-white/10 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Download size={18} /> Config JSON
        </button>
      </div>

      {/* Production Sandboxing Modal */}
      {showProductionModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-white">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass max-w-lg w-full p-8 rounded-3xl border border-white/15 flex flex-col relative"
          >
            <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
              <AlertCircle className="text-amber-400" />
              Direct Save Not Available
            </h3>
            
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              You are running the portfolio application in a production environment (like Vercel/Netlify) or as a built artifact. In this environment, the server cannot write file changes directly back to your local workspace disk.
            </p>

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl mb-6">
              <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle size={16} /> How to save your changes:
              </h4>
              <ol className="text-xs text-gray-300 list-decimal list-inside space-y-2 leading-relaxed">
                <li>Click the **Download Config** button below.</li>
                <li>Save the downloaded `portfolioData.json` file.</li>
                <li>Replace the file at `src/data/portfolioData.json` inside your local workspace codebase.</li>
                <li>Commit and redeploy/push to update your live site!</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  downloadJSON();
                  setShowProductionModal(false);
                }}
                className="flex-1 bg-primary hover:bg-sky-500 text-background font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Download size={18} /> Download Config
              </button>
              <button
                onClick={() => setShowProductionModal(false)}
                className="px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 font-semibold rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
