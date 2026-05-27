import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import portfolioData from '../../data/portfolioData.json';

const Achievements = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="py-24 bg-white/5 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Milestones</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Achievements</h3>
        </motion.div>

        <div className="flex flex-col gap-6">
          {achievements && achievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none text-yellow-500">
                <Trophy size={200} />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 text-yellow-500 flex items-center justify-center shrink-0">
                  <Trophy size={32} />
                </div>
                <div>
                  <div className="text-yellow-500 font-bold tracking-wider text-sm mb-2 uppercase">{achievement.year}</div>
                  <h4 className="text-2xl font-bold text-white mb-2">{achievement.title}</h4>
                  <p className="text-textMuted text-lg">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
