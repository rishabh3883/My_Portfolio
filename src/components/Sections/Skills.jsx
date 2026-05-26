import React from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDocker, FaGithub, FaGitAlt, FaCogs } from 'react-icons/fa';
import { SiJavascript, SiExpress, SiMongodb, SiPostman, SiGithubactions } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { MdSecurity } from 'react-icons/md';
import { FiDatabase } from 'react-icons/fi';
import { BsDatabase } from 'react-icons/bs';

const skillsData = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: FaJava },
      { name: 'Python', icon: FaPython },
      { name: 'JavaScript', icon: SiJavascript }
    ]
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'HTML', icon: FaHtml5 },
      { name: 'CSS', icon: FaCss3Alt },
      { name: 'React.js', icon: FaReact },
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Express.js', icon: SiExpress }
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'REST APIs', icon: TbApi },
      { name: 'JWT Auth', icon: MdSecurity },
      { name: 'CRUD Ops', icon: FiDatabase }
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'SQL', icon: BsDatabase }
    ]
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: FaGithub },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Docker', icon: FaDocker },
      { name: 'Postman', icon: SiPostman },
      { name: 'CI/CD', icon: FaCogs }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-white/5 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Technical Skills</h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="glass p-8 rounded-3xl flex flex-col h-full hover:bg-white/10 transition-colors duration-300"
            >
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.title}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.skills.map((skill, sIdx) => {
                  const Icon = skill.icon;
                  return (
                    <div 
                      key={sIdx}
                      className="flex flex-col items-center justify-center p-5 bg-black/40 border border-white/5 rounded-xl hover:bg-white/10 hover:border-primary/40 transition-all duration-300 group shadow-lg"
                    >
                      <Icon className="text-4xl text-primary mb-3 group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                      <span className="text-xs font-semibold text-gray-300 text-center tracking-wide">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
