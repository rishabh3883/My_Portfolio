import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    title: 'Languages',
    skills: ['Java', 'Python', 'JavaScript']
  },
  {
    title: 'Web Development',
    skills: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js']
  },
  {
    title: 'Backend',
    skills: ['REST API Development', 'JWT Authentication', 'CRUD Operations']
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'SQL']
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Postman', 'CI/CD']
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-white/5 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-4 py-2 bg-black/40 border border-white/5 text-textMuted rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
