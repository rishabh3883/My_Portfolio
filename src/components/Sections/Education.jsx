import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import portfolioData from '../../data/portfolioData.json';

const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Background</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Education</h3>
        </motion.div>

        <div className="flex flex-col gap-6">
          {education && education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass p-8 md:p-10 rounded-3xl relative border-l-4 border-l-primary"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{edu.degree}</h4>
                    <p className="text-primary font-medium text-lg">{edu.institution}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-textMuted font-medium bg-white/5 px-4 py-2 rounded-lg inline-block">{edu.period}</div>
                </div>
              </div>
              
              {edu.cgpa && (
                <div className="bg-black/30 rounded-xl p-4 inline-block mt-2 border border-white/5">
                  <p className="text-textMuted font-medium">
                    Current CGPA: <span className="text-white text-xl font-bold ml-2">{edu.cgpa}</span>
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
