import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // TODO: Replace with your Web3Forms access key
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully!");
        event.target.reset();
        setTimeout(() => setResult(""), 3000);
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      setResult("Something went wrong!");
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-white/5 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Get In Touch</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Let's Connect</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="glass p-8 rounded-3xl flex items-center gap-6 group hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-textMuted text-sm uppercase tracking-wider font-semibold mb-1">Email</p>
                <a href="mailto:Rishabhgupta26225@gmail.com" className="text-lg md:text-xl text-white font-medium hover:text-primary transition-colors break-all">
                  Rishabhgupta26225@gmail.com
                </a>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl flex items-center gap-6 group hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone size={28} />
              </div>
              <div>
                <p className="text-textMuted text-sm uppercase tracking-wider font-semibold mb-1">Phone</p>
                <a href="tel:+919473570382" className="text-lg md:text-xl text-white font-medium hover:text-primary transition-colors">
                  +91 9473570382
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/rishabh3883" target="_blank" rel="noreferrer" className="flex-1 glass p-6 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:bg-white/10 transition-colors">
                <div className="text-textMuted group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </div>
                <span className="text-sm font-medium text-white">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/rishabh-gupta-5280832b7" target="_blank" rel="noreferrer" className="flex-1 glass p-6 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:bg-white/10 transition-colors">
                <div className="text-textMuted group-hover:text-[#0077b5] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <span className="text-sm font-medium text-white">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="glass p-8 md:p-10 rounded-3xl flex flex-col gap-6 h-full" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-medium text-textMuted mb-2">Message</label>
                <textarea 
                  name="message"
                  required
                  className="w-full flex-1 bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none min-h-[120px]"
                  placeholder="Hello Rishabh..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message <Send size={20} />
              </button>
              {result && (
                <p className="text-center mt-2 text-primary font-medium">{result}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
