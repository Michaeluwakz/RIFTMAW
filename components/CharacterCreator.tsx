import React, { useState } from 'react';
import { SectionId } from '../types';
import { User, Shield, Palette, Sparkles, Hexagon, Save, RotateCcw, RotateCw, Crosshair } from 'lucide-react';

export const CharacterCreator: React.FC = () => {
  // State for character customization
  const [faceId, setFaceId] = useState(0);
  const [hairId, setHairId] = useState(0);
  const [armorColor, setArmorColor] = useState('#374151'); // Default tactical gray
  const [secondaryColor, setSecondaryColor] = useState('#0891b2'); // Accent
  const [camoId, setCamoId] = useState(0);
  const [emblemId, setEmblemId] = useState(0);
  const [name, setName] = useState('OPERATIVE');
  const [rotation, setRotation] = useState(0);

  // Options Data
  const HEADGEAR = [
    { label: 'Ops-Core', type: 'tactical_helmet' },
    { label: 'Pilot', type: 'pilot_helmet' },
    { label: 'Hood', type: 'hood' },
    { label: 'Recon', type: 'headset' }
  ];

  const FACE_ACC = [
    { label: 'Gas Mask', type: 'mask' },
    { label: 'Ballistic', type: 'visor' },
    { label: 'Skull', type: 'skull_paint' },
    { label: 'Cyber', type: 'cyber_eye' }
  ];

  const EMBLEMS = [
    { label: 'Rift', icon: Hexagon },
    { label: 'Ops', icon: Shield },
    { label: 'Kill', icon: Crosshair },
    { label: 'Ghost', icon: User }
  ];

  const CAMO_PATTERNS = [
    { label: 'Solid', id: 'none' },
    { label: 'Digital', id: 'digital' },
    { label: 'Tiger', id: 'tiger' },
    { label: 'Hex', id: 'hex' }
  ];

  const PALETTE = [
    '#1f2937', // Dark Ops
    '#3f3f46', // Gunmetal
    '#57534e', // Coyote
    '#0891b2', // Cyan
    '#991b1b', // Red
    '#365314', // Olive
    '#1e3a8a', // Navy
    '#e5e7eb', // Snow
  ];

  const SelectedEmblemIcon = EMBLEMS[emblemId].icon;

  return (
    <section id={SectionId.CREATOR} className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-gray-900">
       <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
         <User className="w-96 h-96 text-white" />
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
           <div className="flex items-center mb-2">
            <User className="w-8 h-8 text-cyan-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              ENLISTMENT <span className="text-cyan-500">//</span> OPERATOR
            </h2>
          </div>
          <p className="text-gray-400 font-mono text-sm">
            GENERATE_TACTICAL_PROFILE // ASSET_LOADOUT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: PREVIEW (ID CARD) */}
          <div className="flex flex-col items-center">
            <div className="relative bg-gray-900 border-2 border-cyan-500/50 rounded-sm p-6 w-full max-w-md shadow-[0_0_30px_rgba(8,145,178,0.2)]">
              {/* Card Header */}
              <div className="flex justify-between items-end mb-6 border-b border-gray-800 pb-4">
                <div>
                  <div className="text-xs text-cyan-500 font-mono mb-1">CALLSIGN</div>
                  <div className="text-2xl font-display font-bold text-white tracking-wider">{name || 'UNKNOWN'}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-mono">FACTION</div>
                  <div className="text-sm font-bold text-gray-300">RIFT SEC</div>
                </div>
              </div>

              {/* Character Visualization (SVG Composition) */}
              <div className="relative h-96 bg-black/50 rounded-sm border border-gray-800 mb-6 flex items-center justify-center overflow-hidden perspective-[1000px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/30 to-transparent"></div>
                
                {/* SVG Character */}
                <div 
                  className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
                  style={{ transform: `rotateY(${rotation}deg)` }}
                >
                  <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <pattern id="camo-digital" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                         <rect x="0" y="0" width="10" height="10" fill="rgba(0,0,0,0.2)" />
                         <rect x="10" y="10" width="10" height="10" fill="rgba(0,0,0,0.2)" />
                      </pattern>
                      <pattern id="camo-hex" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                         <path d="M10 0 L20 5 L20 15 L10 20 L0 15 L0 5 Z" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                      </pattern>
                      <linearGradient id="visorshine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                    </defs>

                    {/* --- BODY BASE (Tactical Uniform) --- */}
                    <g transform="translate(75, 120)">
                       {/* Arms */}
                       <path d="M-10,30 L-20,150 L20,150 L25,40" fill={armorColor} stroke="#111" />
                       <path d="M160,30 L170,150 L130,150 L125,40" fill={armorColor} stroke="#111" />
                       
                       {/* Torso Base */}
                       <path d="M20,20 L130,20 L135,160 L15,160 Z" fill={armorColor} />
                       {/* Camo Overlay */}
                       {camoId !== 0 && (
                          <path d="M20,20 L130,20 L135,160 L15,160 Z" fill={`url(#camo-${CAMO_PATTERNS[camoId].id})`} opacity="0.5" />
                       )}
                    </g>

                    {/* --- PLATE CARRIER (Vest) --- */}
                    <g transform="translate(90, 140)">
                       <path d="M10,0 L110,0 L115,110 L90,120 L30,120 L5,110 Z" fill="#1f2937" stroke="#000" strokeWidth="2" />
                       {/* Molle Webbing */}
                       <line x1="20" y1="40" x2="100" y2="40" stroke="#374151" strokeWidth="3" />
                       <line x1="20" y1="60" x2="100" y2="60" stroke="#374151" strokeWidth="3" />
                       <line x1="20" y1="80" x2="100" y2="80" stroke="#374151" strokeWidth="3" />
                       {/* Magazines */}
                       <rect x="25" y="45" width="20" height="30" fill="#111" />
                       <rect x="50" y="45" width="20" height="30" fill="#111" />
                       <rect x="75" y="45" width="20" height="30" fill="#111" />
                       {/* Emblem Badge */}
                       <rect x="45" y="10" width="30" height="20" fill={secondaryColor} opacity="0.8" rx="2" />
                       <foreignObject x="50" y="12" width="20" height="16">
                          <div className="flex justify-center items-center h-full text-white">
                             <SelectedEmblemIcon size={14} />
                          </div>
                       </foreignObject>
                    </g>

                    {/* --- HEAD & NECK --- */}
                    <g transform="translate(100, 40)">
                       {/* Neck */}
                       <rect x="35" y="80" width="30" height="20" fill="#2d2d2d" />
                       
                       {/* Head Shape */}
                       <path d="M20,20 L80,20 L85,85 L70,100 L30,100 L15,85 Z" fill="#e5bb9e" /> {/* Skin base */}

                       {/* FACE ACCESSORY */}
                       {faceId === 0 && ( // Gas Mask
                          <g>
                             <path d="M25,50 L75,50 L80,90 L50,105 L20,90 Z" fill="#1f2937" stroke="#000" />
                             <circle cx="35" cy="65" r="8" fill="#374151" stroke="#111" />
                             <circle cx="65" cy="65" r="8" fill="#374151" stroke="#111" />
                             <rect x="45" y="80" width="10" height="15" fill="#111" rx="2" />
                          </g>
                       )}
                       {faceId === 1 && ( // Ballistic Visor
                          <g>
                             <path d="M20,20 L80,20 L80,60 L20,60 Z" fill="rgba(0,0,0,0.8)" />
                             <rect x="20" y="40" width="60" height="15" fill={secondaryColor} opacity="0.5" />
                             <path d="M20,20 L80,20 L80,60 L20,60 Z" fill="url(#visorshine)" />
                          </g>
                       )}
                       {faceId === 2 && ( // Skull Paint
                          <g>
                             <path d="M35,60 L45,55 L55,60 L65,55 L75,60 L75,80 L65,90 L45,90 L35,80 Z" fill="#fff" />
                             <circle cx="40" cy="50" r="4" fill="#111" />
                             <circle cx="60" cy="50" r="4" fill="#111" />
                             <rect x="45" y="70" width="2" height="10" fill="#111" />
                             <rect x="55" y="70" width="2" height="10" fill="#111" />
                          </g>
                       )}
                       {faceId === 3 && ( // Cyber Eye
                          <g>
                             <path d="M15,40 L40,40 L35,60 L15,55 Z" fill="#111" />
                             <circle cx="28" cy="48" r="4" fill="red" className="animate-pulse" />
                             <path d="M20,20 L80,20 L85,90 L15,90 Z" fill="none" stroke={secondaryColor} strokeWidth="1" strokeDasharray="2,2" />
                          </g>
                       )}

                       {/* HEADGEAR */}
                       {hairId === 0 && ( // Ops-Core Helmet
                          <g>
                             <path d="M10,10 L90,10 L95,50 L50,45 L5,50 Z" fill={armorColor} stroke="#111" />
                             {/* Rails */}
                             <rect x="5" y="25" width="10" height="20" fill="#111" />
                             <rect x="85" y="25" width="10" height="20" fill="#111" />
                             {/* NVG Mount */}
                             <rect x="45" y="10" width="10" height="10" fill="#333" />
                          </g>
                       )}
                       {hairId === 1 && ( // Pilot Helmet
                          <g>
                             <path d="M10,5 L90,5 L95,80 L5,80 Z" fill={armorColor} stroke="#111" />
                             <rect x="20" y="30" width="60" height="30" fill="url(#visorshine)" stroke={secondaryColor} />
                          </g>
                       )}
                       {hairId === 2 && ( // Hood
                           <path d="M5,0 L95,0 L100,100 L0,100 Z" fill={armorColor} stroke="#000" opacity="0.9" mask="url(#face-mask)" />
                       )}
                       {hairId === 3 && ( // Headset
                          <g>
                             <path d="M10,10 L90,10 C90,-10 10,-10 10,10" fill="none" stroke="#111" strokeWidth="8" />
                             <rect x="0" y="30" width="15" height="30" rx="5" fill="#1f2937" />
                             <rect x="85" y="30" width="15" height="30" rx="5" fill="#1f2937" />
                             <path d="M20,15 L80,15 L80,30 L20,30 Z" fill={secondaryColor} /> {/* Cap */}
                          </g>
                       )}

                    </g>
                  </svg>
                </div>
              </div>

              {/* Stats / Footer */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-800/50 p-2 rounded border border-gray-700">
                  <div className="text-[10px] text-gray-500 font-mono">MOBILITY</div>
                  <div className="text-cyan-400 font-bold font-mono">HIGH</div>
                </div>
                <div className="bg-gray-800/50 p-2 rounded border border-gray-700">
                  <div className="text-[10px] text-gray-500 font-mono">ARMOR</div>
                  <div className="text-cyan-400 font-bold font-mono">MEDIUM</div>
                </div>
                <div className="bg-gray-800/50 p-2 rounded border border-gray-700">
                  <div className="text-[10px] text-gray-500 font-mono">TECH</div>
                  <div className="text-cyan-400 font-bold font-mono">SpecOps</div>
                </div>
              </div>
            </div>

            {/* Rotation Controls */}
            <div className="mt-4 w-full max-w-md flex items-center gap-4 bg-gray-900/50 p-3 rounded-sm border border-gray-800">
              <button onClick={() => setRotation(prev => prev - 45)} className="text-gray-400 hover:text-white transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
              <input 
                type="range" 
                min="-45" 
                max="45" 
                value={rotation} 
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="flex-grow h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <button onClick={() => setRotation(prev => prev + 45)} className="text-gray-400 hover:text-white transition-colors">
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: CONTROLS */}
          <div className="space-y-8 bg-gray-900/30 p-8 rounded-lg border border-gray-800">
             
             {/* Name Input */}
             <div>
               <label className="block text-xs font-mono text-cyan-500 mb-2">OPERATIVE CALLSIGN</label>
               <input 
                 type="text" 
                 value={name} 
                 onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 12))}
                 className="w-full bg-black border border-gray-700 text-white px-4 py-2 font-display tracking-wider focus:border-cyan-500 focus:outline-none rounded-sm"
               />
             </div>

             {/* Style Selectors */}
             <div className="grid grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2">FACE ACCESSORY</label>
                  <div className="flex flex-wrap gap-2">
                    {FACE_ACC.map((face, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFaceId(idx)}
                        className={`px-3 py-1 text-xs border rounded-sm transition-all ${
                          faceId === idx 
                          ? 'bg-cyan-900/40 border-cyan-400 text-cyan-300' 
                          : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        {face.label}
                      </button>
                    ))}
                  </div>
               </div>
               <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2">HEADGEAR</label>
                  <div className="flex flex-wrap gap-2">
                    {HEADGEAR.map((hair, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHairId(idx)}
                        className={`px-3 py-1 text-xs border rounded-sm transition-all ${
                          hairId === idx 
                          ? 'bg-cyan-900/40 border-cyan-400 text-cyan-300' 
                          : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        {hair.label}
                      </button>
                    ))}
                  </div>
               </div>
             </div>

             {/* Camo & Colors */}
             <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-mono text-gray-500 mb-2 flex items-center">
                     <Palette className="w-3 h-3 mr-2" /> UNIFORM COLOR
                   </label>
                   <div className="flex flex-wrap gap-2">
                     {PALETTE.map((color) => (
                       <button
                         key={color}
                         onClick={() => setArmorColor(color)}
                         className={`w-6 h-6 rounded-sm border-2 transition-transform hover:scale-110 ${
                           armorColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                         }`}
                         style={{ backgroundColor: color }}
                       />
                     ))}
                   </div>
                </div>
                <div>
                   <label className="block text-xs font-mono text-gray-500 mb-2">CAMO PATTERN</label>
                   <div className="flex flex-wrap gap-2">
                     {CAMO_PATTERNS.map((camo, idx) => (
                       <button
                         key={idx}
                         onClick={() => setCamoId(idx)}
                         className={`px-2 py-1 text-[10px] border rounded-sm ${
                           camoId === idx ? 'border-cyan-400 text-cyan-300' : 'border-gray-700 text-gray-500'
                         }`}
                       >
                         {camo.label}
                       </button>
                     ))}
                   </div>
                </div>
             </div>

             {/* Emblem Selector */}
             <div>
               <label className="block text-xs font-mono text-gray-500 mb-2">UNIT PATCH</label>
               <div className="flex gap-4">
                  {EMBLEMS.map((emblem, idx) => {
                    const Icon = emblem.icon;
                    return (
                      <button 
                        key={idx}
                        onClick={() => setEmblemId(idx)}
                        className={`p-3 rounded border transition-all ${
                          emblemId === idx 
                          ? 'bg-cyan-900/40 text-cyan-300 border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                          : 'bg-gray-800 text-gray-500 border-gray-700 hover:bg-gray-700'
                        }`}
                      >
                        <Icon size={20} />
                      </button>
                    );
                  })}
               </div>
             </div>

             {/* Action */}
             <button className="w-full py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-bold font-display tracking-widest rounded-sm border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2">
               <Save className="w-4 h-4" />
               CONFIRM LOADOUT
             </button>

          </div>
        </div>
      </div>
    </section>
  );
};
