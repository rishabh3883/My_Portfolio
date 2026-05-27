import React, { useEffect, useRef } from 'react';

const Background = () => {
  const blobRef = useRef(null);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (blobRef.current) {
        requestAnimationFrame(() => {
          blobRef.current.style.left = `${e.clientX}px`;
          blobRef.current.style.top = `${e.clientY}px`;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020617] select-none">
      
      {/* 1. Subtle Futuristic Blue Grid Layer with Blur */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
          `,
          backgroundSize: '4.5rem 4.5rem',
          filter: 'blur(0.8px)',
          maskImage: 'radial-gradient(ellipse 90% 60% at 50% 50%, #000 65%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 50%, #000 65%, transparent 100%)'
        }}
      />

      {/* 2. Vignette Depth Overlay (Darker corners, lighter center) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(2, 6, 23, 0.8) 100%)'
        }}
      />

      {/* 3. Soft Cyan Glow Behind Hero Text Area (Fixed Left-ish) */}
      <div className="absolute top-[15%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-cyan-500/[0.04] blur-[130px] pointer-events-none" />

      {/* 4. Soft Blue Glow Behind Profile Image Area (Fixed Right-ish) */}
      <div className="absolute top-[10%] right-[5%] w-[50vw] h-[50vw] max-w-[700px] rounded-full bg-blue-500/[0.05] blur-[150px] pointer-events-none" />

      {/* 5. Mouse-following Soft Neon Glow */}
      <div
        ref={blobRef}
        className="absolute w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.12] blur-[130px] pointer-events-none transition-opacity duration-300"
      />

      {/* 6. Ambient Moving Slow Gradients (Extremely low opacity, non-distracting) */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/[0.03] blur-[150px] mix-blend-screen animate-blob pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/[0.02] blur-[150px] mix-blend-screen animate-blob pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[25%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/[0.03] blur-[130px] mix-blend-screen animate-blob pointer-events-none" style={{ animationDelay: '6s' }} />

    </div>
  );
};

export default Background;
