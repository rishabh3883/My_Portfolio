import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Smart Campus Management System',
    tags: ['MongoDB', 'Express.js', 'Node.js'],
    points: [
      'Developed 15+ REST APIs',
      'Managed 500+ students and 20+ events',
      'Implemented JWT authentication and CI/CD',
      'Secured 2nd place in Sustain Tech Hackathon'
    ]
  },
  {
    title: 'Airbnb Clone Website',
    tags: ['React', 'Node.js', 'Tailwind'],
    points: [
      'Responsive booking platform',
      'Dynamic property listings',
      'Filtering and search functionality'
    ]
  },
  {
    title: 'Gaming Event Management Website',
    tags: ['MERN Stack'],
    points: [
      'Designed 10+ REST APIs',
      'JWT authentication and CRUD operations',
      'Tested APIs using Postman'
    ]
  },
  {
    title: 'Zerodha Clone',
    tags: ['React', 'Bootstrap'],
    points: [
      'Built responsive UI using React and Bootstrap',
      'Created 12+ reusable components'
    ]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Selected Work</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Featured Projects</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-8 rounded-3xl flex flex-col group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <ExternalLink size={18} />
                </div>
              </div>

              <h4 className="text-2xl font-bold text-white mb-4 pr-12">{project.title}</h4>
              
              <ul className="space-y-3 mb-8 flex-1">
                {project.points.map((point, pIdx) => (
                  <li key={pIdx} className="text-textMuted text-base flex items-start gap-3">
                    <span className="text-primary mt-1 text-lg leading-none">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
