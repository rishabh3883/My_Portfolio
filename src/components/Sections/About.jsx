import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">About Me</h2>
          
          <div className="text-2xl md:text-4xl font-medium leading-tight text-white mb-8">
            Computer Science undergraduate skilled in <span className="text-primary">MERN stack</span> development, REST APIs, backend systems, authentication, and CI/CD pipelines.
          </div>
          
          <div className="text-lg text-textMuted max-w-3xl leading-relaxed">
            Passionate about software development, problem-solving, and modern web technologies. I focus on bridging the gap between complex backend logic and seamless frontend user experiences, ensuring every product I build is not only highly performant but also visually engaging.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
