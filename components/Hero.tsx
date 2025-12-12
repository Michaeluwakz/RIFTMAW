import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { ArrowDown, Play, Target, Radio } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // --- ASSET CONFIGURATION ---
  // REPLACE these URLs with your downloaded local assets for the "Call of Duty" look.
  // Example: src="/assets/ghost_soldier.png"
  const ASSETS = {
    // A dark, ruined city skyline
    BACKGROUND_URL: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2574&auto=format&fit=crop",
    // Placeholder for the soldier. In a real app, use a transparent PNG of a CoD operator.
    // We are simulating the soldier using a masked div below, but you can swap to an <img src={SOLDIER_URL} />
    SOLDIER_URL: "https://images.unsplash.com/photo-1542259681-d4cd71d18f59?q=80&w=2574&auto=format&fit=crop", 
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <section 
      id={SectionId.HOME} 
      className="relative h-screen w-full overflow-hidden bg-[#050505] perspective-container"
      onMouseMove={handleMouseMove}
    >
      {/* 
        PARALLAX LAYERS 
        The 'transform' moves layers at different speeds to create 3D depth.
      */}

      {/* LAYER 1: The Ruined City (Background) - Moves Slowly */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-100 ease-out"
        style={{ 
          backgroundImage: `url(${ASSETS.BACKGROUND_URL})`,
          transform: `scale(1.1) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
          filter: 'brightness(0.4) contrast(1.2) grayscale(0.6)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-red-900/20"></div>
      </div>

      {/* LAYER 2: The Dreadnought (Midground) - Moves Medium Speed */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)` }}
      >
         <DreadnoughtSVG />
      </div>

      {/* LAYER 3: Floating Debris Field (Particles) - Moves Fast */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)` }}
      >
        <DebrisSystem count={40} />
      </div>

      {/* LAYER 4: The Operator (Foreground) - Moves Opposite to Background */}
      <div 
        className="absolute bottom-[-5%] right-[-10%] md:right-[10%] w-[80vw] md:w-[40vw] h-[80vh] z-30 pointer-events-none transition-transform duration-75 ease-out"
        style={{ 
           transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` 
        }}
      >
        {/* 
           Using a Masked Image to simulate a soldier silhouette if you don't have a transparent PNG yet.
           If you download a "soldier.png", replace this <div> with:
           <img src="soldier.png" className="w-full h-full object-contain drop-shadow-2xl" />
        */}
        <div className="w-full h-full relative">
           {/* This simulates the soldier using a clip-path on a tactical image */}
           <div 
             className="w-full h-full bg-cover bg-center"
             style={{
               backgroundImage: `url('https://images.unsplash.com/photo-1533236897111-3e94666b2edf?q=80&w=1887&auto=format&fit=crop')`,
               maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
               WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
               clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', // Rough silhouette shape
               filter: 'contrast(1.2) brightness(0.8) sepia(0.2)'
             }}
           ></div>
           {/* Rim lighting effect on the soldier */}
           <div className="absolute inset-0 bg-gradient-to-l from-red-500/20 to-transparent mix-blend-overlay"></div>
        </div>
      </div>

      {/* LAYER 5: Atmosphere & UI Overlay */}
      <div className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] pointer-events-none"></div>
      
      {/* UI Content */}
      <div className="relative z-50 h-full flex flex-col justify-center px-8 md:px-24 max-w-7xl mx-auto">
        <div className="md:w-2/3">
          <div className="flex items-center space-x-2 mb-6 animate-fadeIn">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
             <span className="text-red-500 font-mono text-xs tracking-[0.3em] font-bold">
               INVASION STATUS: ACTIVE
             </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-2 tracking-tighter drop-shadow-2xl leading-[0.85]">
            RIFT<span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">MAW</span>
          </h1>
          
          <div className="h-1 w-24 bg-red-600 mb-8"></div>

          <p className="max-w-xl text-gray-300 font-light text-lg md:text-xl mb-12 leading-relaxed drop-shadow-md border-l-2 border-gray-700 pl-6">
            The sky is bleeding code. The ground is dissolving into data. 
            Stand your ground against the <span className="text-red-500 font-bold">Geometry Dreadnought</span> before our reality is deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
               onClick={() => onNavigate(SectionId.CREATOR)}
               className="group relative px-8 py-4 bg-red-700 hover:bg-red-600 text-white font-bold font-display tracking-widest uppercase transition-all clip-path-slant"
               style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 20%)' }}
            >
              <div className="flex items-center gap-3 relative z-10">
                 <Target className="w-5 h-5 group-hover:rotate-90 transition-transform" /> 
                 <span>DEPLOY SQUAD</span>
              </div>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>

            <button 
               className="px-8 py-4 bg-transparent border border-gray-600 hover:border-white text-gray-300 hover:text-white font-mono uppercase tracking-widest transition-all hover:bg-white/5 flex items-center gap-3 backdrop-blur-sm"
               onClick={() => onNavigate(SectionId.STORY)}
            >
              <Radio className="w-4 h-4" /> INTEL BRIEFING
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer text-gray-500 hover:text-white z-50 transition-colors" onClick={() => onNavigate(SectionId.WORLD)}>
        <ArrowDown className="w-8 h-8" />
      </div>
    </section>
  );
};

// --- SUB-COMPONENTS ---

/**
 * A Procedural SVG representation of the Dreadnought boss.
 * It looks like a massive, floating voxel structure.
 */
const DreadnoughtSVG = () => (
  <div className="relative w-[100vw] h-[80vh] md:w-[1200px] md:h-[800px] opacity-100 mix-blend-hard-light filter drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]">
    <svg viewBox="0 0 1000 800" className="w-full h-full">
      <defs>
        <linearGradient id="hullGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="50%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
        <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
           <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,0,0,0.1)" strokeWidth="1"/>
        </pattern>
      </defs>

      {/* Main Hull Shape (Inverted Pyramid / Diamond) */}
      <path 
        d="M500 100 L800 300 L900 250 L850 400 L500 700 L150 400 L100 250 L200 300 Z" 
        fill="url(#hullGradient)" 
        stroke="#333" 
        strokeWidth="2"
      />
      
      {/* Voxel Details / Greebles */}
      <rect x="480" y="200" width="40" height="100" fill="#222" />
      <rect x="400" y="300" width="200" height="20" fill="#111" />
      
      {/* The Red Eye / Core */}
      <circle cx="500" cy="400" r="30" fill="#ef4444" className="animate-pulse" />
      <circle cx="500" cy="400" r="60" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="10,5" className="animate-spin-slow" />
      
      {/* Texture Overlay */}
      <path d="M500 100 L800 300 L500 700 L200 300 Z" fill="url(#gridPattern)" />

      {/* Floating Bits (Detached Voxels) */}
      <rect x="200" y="150" width="40" height="40" fill="#111" className="animate-bounce" />
      <rect x="760" y="150" width="40" height="40" fill="#111" className="animate-bounce" style={{ animationDelay: '1s' }} />
    </svg>
  </div>
);

/**
 * Generates floating debris particles using standard HTML/CSS.
 */
const DebrisSystem: React.FC<{ count: number }> = ({ count }) => {
  const [debris, setDebris] = useState<any[]>([]);

  useEffect(() => {
    // Generate static debris data on mount to avoid hydration mismatch
    const newDebris = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // %
      top: Math.random() * 100, // %
      size: Math.random() * 60 + 10, // px
      depth: Math.random(), // 0 to 1
      rotation: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'cube' : 'shard',
    }));
    setDebris(newDebris);
  }, [count]);

  return (
    <>
      {debris.map((d) => (
        <div
          key={d.id}
          className="absolute bg-gray-800 border border-gray-700 shadow-2xl backdrop-blur-sm"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.depth * 0.7 + 0.3,
            transform: `rotate(${d.rotation}deg) scale(${d.depth})`,
            zIndex: Math.floor(d.depth * 10),
            clipPath: d.shape === 'cube' 
              ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
              : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Diamond shard
            boxShadow: d.depth > 0.8 ? '0 0 15px rgba(0,0,0,0.8)' : 'none',
          }}
        >
          {/* Internal detail line to fake 3D */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-black/40"></div>
          {d.depth > 0.9 && (
             <div className="absolute inset-0 bg-red-500/10 border-t border-red-500/50"></div>
          )}
        </div>
      ))}
    </>
  );
};

