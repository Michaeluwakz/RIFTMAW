import React from 'react';
import { ENEMIES } from '../data';
import { SectionId } from '../types';
import { Skull, Radiation, Activity, Rocket } from 'lucide-react';

export const EnemySection: React.FC = () => {
  return (
    <section id={SectionId.ENEMIES} className="py-24 bg-[#080808] border-t border-gray-900 relative">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-red-900/10 rounded-full mb-4">
            <Skull className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-4">
            HOSTILE <span className="text-red-600">PIXELS</span>
          </h2>
          <p className="text-red-400/60 font-mono tracking-widest">
            INVASION_FLEET // SPRITE_DATA_LOADED
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ENEMIES.map((enemy) => (
            <div key={enemy.id} className="relative group bg-gray-900/80 border border-red-900/20 hover:border-red-600 transition-colors p-6 rounded-sm overflow-hidden flex flex-col hover:-translate-y-1 duration-300 shadow-lg hover:shadow-red-900/20">
              
              {/* Pixel Art Rendering Area */}
              <div className="h-48 bg-black border border-gray-800 mb-6 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),transparent)]"></div>
                 
                 {/* Pixel Sprite */}
                 <div className="transform scale-150 group-hover:scale-[1.7] transition-transform duration-300">
                    <PixelSprite type={enemy.category} seed={enemy.id} />
                 </div>

                 {/* Scanlines */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none opacity-50"></div>
              </div>

              <div className="relative z-10 flex-grow">
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-bold font-mono px-2 py-1 rounded border ${
                    enemy.category.includes('Boss') 
                      ? 'bg-red-950 text-red-500 border-red-800 animate-pulse' 
                      : 'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                    {enemy.category.toUpperCase()}
                  </span>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 ${i < enemy.threatLevel ? 'bg-red-500' : 'bg-gray-800'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-2">{enemy.name}</h3>
                <p className="text-gray-400 text-xs mb-6 min-h-[40px] leading-relaxed">{enemy.description}</p>
                
                {/* AI Behavior Analysis */}
                <div className="bg-red-900/5 border border-red-900/20 p-3 rounded mb-4">
                   <div className="flex items-center text-red-400 text-[10px] font-mono font-bold mb-1">
                      <Activity className="w-3 h-3 mr-1" /> BEHAVIOR PATTERN
                   </div>
                   <p className="text-gray-400 text-[10px] leading-relaxed font-mono">
                      {enemy.behavior}
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Generates an SVG Pixel Art sprite based on enemy type
const PixelSprite: React.FC<{ type: string, seed: string }> = ({ type, seed }) => {
   const color = type.includes('Boss') ? '#ef4444' : type === 'Advanced' ? '#f87171' : '#fca5a5';
   
   // Pixel size
   const s = 10;
   
   if (type.includes('Mega-Boss') || seed === 'e8') {
      // The World Eater / Spaceship Dreadnought
      return (
         <svg width="140" height="100" viewBox="0 0 140 100">
            {/* Pyramid Ship Shape */}
            <path d="M70,10 L120,80 L20,80 Z" fill="#111" stroke={color} strokeWidth="2" />
            <rect x="60" y="40" width="20" height="20" fill={color} className="animate-pulse" /> {/* Core */}
            <rect x="30" y="80" width="10" height="10" fill={color} />
            <rect x="100" y="80" width="10" height="10" fill={color} />
            {/* Voxel Rain */}
            <rect x="70" y="90" width="2" height="10" fill="red" className="animate-bounce" />
         </svg>
      );
   }

   if (type.includes('Boss')) {
      // Big Headed Pixel Boss
      return (
         <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Giant Head */}
            <rect x="20" y="10" width="60" height="60" fill={color} />
            {/* Eyes */}
            <rect x="30" y="30" width="10" height="10" fill="#000" />
            <rect x="60" y="30" width="10" height="10" fill="#000" />
            {/* Mouth */}
            <rect x="30" y="50" width="40" height="10" fill="#000" />
            <rect x="30" y="50" width="10" height="5" fill="#fff" /> {/* Tooth */}
            <rect x="60" y="50" width="10" height="5" fill="#fff" /> {/* Tooth */}
            {/* Tentacles */}
            <rect x="25" y="70" width="10" height="20" fill={color} />
            <rect x="45" y="70" width="10" height="20" fill={color} />
            <rect x="65" y="70" width="10" height="20" fill={color} />
         </svg>
      );
   }

   // Standard Space Invader style
   return (
      <svg width="80" height="60" viewBox="0 0 80 60">
         {/* Body */}
         <rect x="20" y="20" width="40" height="30" fill={color} />
         {/* Ears/Antenna */}
         <rect x="10" y="10" width="10" height="10" fill={color} />
         <rect x="60" y="10" width="10" height="10" fill={color} />
         {/* Eyes */}
         <rect x="30" y="30" width="5" height="5" fill="#000" />
         <rect x="50" y="30" width="5" height="5" fill="#000" />
         {/* Feet */}
         <rect x="20" y="50" width="10" height="10" fill={color} />
         <rect x="50" y="50" width="10" height="10" fill={color} />
      </svg>
   );
}
