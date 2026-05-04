import React, { useEffect, useRef } from 'react';

const Background = () => {
  const blobRef = useRef(null);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (blobRef.current) {
        // Use requestAnimationFrame for smooth performance
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
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
      {/* 1. Subtle Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f4f4f 1px, transparent 1px),
            linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 100%)'
        }}
      />

      {/* 2. Mouse-following Soft Glow */}
      <div
        ref={blobRef}
        className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] pointer-events-none transition-opacity duration-300"
      />

      {/* 3. Ambient Moving Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/10 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-cyan-600/10 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default Background;
