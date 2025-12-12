import React, { useState } from 'react';
import { WEAPONS } from '../data';
import { SectionId } from '../types';
import { Crosshair, Zap, Disc, ChevronDown, ChevronUp, Star } from 'lucide-react';

export const ArsenalSection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Ballistic' | 'Energy' | 'Special'>('All');
  const [expandedWeapon, setExpandedWeapon] = useState<string | null>(null);

  const filteredWeapons = filter === 'All' ? WEAPONS : WEAPONS.filter(w => w.type === filter);

  const toggleExpand = (id: string) => {
    setExpandedWeapon(expandedWeapon === id ? null : id);
  };

  return (
    <section id={SectionId.ARSENAL} className="py-24 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
             <div className="flex items-center mb-2">
              <Crosshair className="w-8 h-8 text-cyan-400 mr-4" />
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                ARMORY
              </h2>
            </div>
            <p className="text-gray-400 font-mono text-sm max-w-md">
              / WEAPON_SYSTEMS // BALLISTICS_AUTHORIZED
            </p>
          </div>
          
          <div className="flex space-x-2 mt-6 md:mt-0">
            {['All', 'Ballistic', 'Energy', 'Special'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                  filter === type
                    ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-transparent border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredWeapons.map((weapon) => (
            <div key={weapon.id} className="group bg-black/40 border border-gray-800 hover:border-cyan-500/50 rounded-sm p-1 transition-all duration-300">
              <div className="flex flex-col md:flex-row cursor-pointer" onClick={() => toggleExpand(weapon.id)}>
                {/* Visual Representation (SVG Weapons) */}
                <div className="w-full md:w-64 h-32 bg-gray-900 flex items-center justify-center relative overflow-hidden shrink-0 border-r border-gray-800">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-[shimmer_2s_infinite]"></div>
                  
                  <div className="w-full h-full p-6 transition-transform group-hover:scale-105">
                     <WeaponSVG id={weapon.id} type={weapon.type} />
                  </div>
                  
                  {/* Type Indicator */}
                  <div className="absolute bottom-2 right-2">
                     {weapon.type === 'Ballistic' && <Crosshair className="w-4 h-4 text-cyan-700" />}
                     {weapon.type === 'Energy' && <Zap className="w-4 h-4 text-fuchsia-700" />}
                     {weapon.type === 'Special' && <Disc className="w-4 h-4 text-lime-700" />}
                  </div>
                </div>

                <div className="flex-grow p-6 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors tracking-wide">{weapon.name.toUpperCase()}</h3>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                        weapon.type === 'Ballistic' ? 'text-blue-400 border-blue-900 bg-blue-900/10' :
                        weapon.type === 'Energy' ? 'text-fuchsia-400 border-fuchsia-900 bg-fuchsia-900/10' :
                        'text-lime-400 border-lime-900 bg-lime-900/10'
                      }`}>
                        {weapon.type.toUpperCase()} CLASS
                      </span>
                    </div>
                    {expandedWeapon === weapon.id ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                  </div>
                  <p className="text-gray-400 text-sm mb-4 font-mono leading-relaxed">{weapon.description}</p>
                  
                  {/* Stats Bars */}
                  <div className="grid grid-cols-3 gap-4">
                    <StatBar label="DAMAGE" value={weapon.stats.damage} color="bg-cyan-600" />
                    <StatBar label="FIRE RATE" value={weapon.stats.fireRate} color="bg-cyan-600" />
                    <StatBar label="RANGE" value={weapon.stats.range} color="bg-cyan-600" />
                  </div>
                </div>
              </div>

              {/* Expanded Upgrade Section */}
              {expandedWeapon === weapon.id && weapon.upgrades && (
                <div className="border-t border-gray-800 bg-gray-900/30 p-6 animate-fadeIn">
                   <h4 className="text-sm font-mono text-cyan-400 mb-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2" /> MODULAR ATTACHMENTS
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                      {/* Connection Line */}
                      <div className="hidden md:block absolute top-6 left-10 right-10 h-0.5 bg-gray-800 -z-10"></div>
                      
                      <UpgradeNode tier={1} title="MK 1" desc={weapon.upgrades.tier1} />
                      <UpgradeNode tier={2} title="MK 2" desc={weapon.upgrades.tier2} />
                      <UpgradeNode tier={3} title="MK 3" desc={weapon.upgrades.tier3} />
                      
                      {/* Unique Variant */}
                      <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/30 p-4 rounded-sm relative overflow-hidden group/variant">
                         <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover/variant:opacity-100 transition-opacity"></div>
                         <div className="text-[10px] font-mono text-cyan-300 mb-1 flex items-center">
                            <Star className="w-3 h-3 mr-1 fill-cyan-300" /> BLUEPRINT UNLOCKED
                         </div>
                         <div className="font-display font-bold text-white mb-1 group-hover/variant:text-cyan-400 transition-colors">
                            {weapon.upgrades.uniqueVariant.name}
                         </div>
                         <div className="text-xs text-gray-400">
                            {weapon.upgrades.uniqueVariant.description}
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WeaponSVG: React.FC<{ id: string, type: string }> = ({ id, type }) => {
  const color = type === 'Energy' ? '#d946ef' : '#9ca3af'; // Fuchsia or Gray
  
  // Tactical AR / Pulse Rifle (w1)
  if (id === 'w1') {
     return (
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg">
           <path d="M20,40 L60,40 L60,70 L40,80 L20,70 Z" fill="#1f2937" /> {/* Stock */}
           <rect x="60" y="35" width="80" height="25" fill="#374151" /> {/* Receiver */}
           <rect x="140" y="42" width="50" height="8" fill="#111" /> {/* Barrel */}
           <rect x="90" y="60" width="20" height="40" rx="2" fill="#111" transform="rotate(-10 100 60)" /> {/* Mag */}
           <path d="M70,60 L75,80 L65,80 Z" fill="#111" /> {/* Grip */}
           <rect x="70" y="25" width="60" height="5" fill="#111" /> {/* Rail */}
           <circle cx="120" cy="45" r="2" fill="cyan" className="animate-pulse" />
        </svg>
     );
  }
  // Shotgun (w2)
  if (id === 'w2') {
     return (
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg">
           <path d="M10,45 L40,45 L40,65 L10,65 Z" fill="#374151" /> {/* Stock */}
           <rect x="40" y="40" width="60" height="20" fill="#4b5563" /> {/* Receiver */}
           <rect x="100" y="45" width="80" height="10" fill="#111" /> {/* Barrel */}
           <rect x="100" y="58" width="50" height="8" fill="#2d2d2d" /> {/* Pump */}
           <path d="M50,60 L55,75 L45,75 Z" fill="#111" /> {/* Grip */}
        </svg>
     );
  }
  // Heavy Cannon (w3)
  if (id === 'w3') {
     return (
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg">
           <rect x="40" y="30" width="60" height="40" fill="#1f2937" /> {/* Body */}
           <circle cx="100" cy="50" r="15" fill="none" stroke={color} strokeWidth="3" className="animate-spin" /> {/* Core */}
           <rect x="100" y="40" width="80" height="20" fill="#333" /> {/* Barrel */}
           <path d="M40,50 L20,80 L60,80 Z" fill="#111" /> {/* Rear Grip */}
           <rect x="120" y="60" width="10" height="30" fill="#111" /> {/* Foregrip */}
        </svg>
     );
  }
  // Sniper (w4)
  if (id === 'w4') {
     return (
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg">
           <rect x="10" y="45" width="40" height="10" fill="#333" /> {/* Stock */}
           <rect x="50" y="40" width="50" height="15" fill="#4b5563" /> {/* Receiver */}
           <rect x="100" y="45" width="90" height="5" fill="#111" /> {/* Long Barrel */}
           <rect x="60" y="25" width="40" height="10" fill="#111" /> {/* Scope */}
           <line x1="100" y1="60" x2="120" y2="80" stroke="#333" strokeWidth="2" /> {/* Bipod */}
        </svg>
     );
  }
  // Knife (w5)
  return (
     <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg transform rotate-45">
        <path d="M60,60 L90,60 L90,70 L60,70 Z" fill="#111" /> {/* Handle */}
        <path d="M90,60 L160,50 L160,70 L90,70 Z" fill="#e5e7eb" /> {/* Blade */}
        <path d="M90,60 L160,50 L90,55 Z" fill="#9ca3af" /> {/* Edge Detail */}
     </svg>
  );
};

const StatBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col">
    <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1 tracking-wider">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-1 bg-gray-800 rounded-sm overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const UpgradeNode: React.FC<{ tier: number, title: string, desc: string }> = ({ tier, title, desc }) => (
   <div className="bg-black/60 border border-gray-700 p-4 rounded-sm flex flex-col h-full hover:border-gray-500 transition-colors group">
      <div className="flex justify-between items-start mb-2">
         <div className="text-[10px] font-mono text-cyan-600 font-bold">{title}</div>
         <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[8px] text-gray-400 group-hover:border-cyan-500 group-hover:text-cyan-500 transition-colors">
            {tier}
         </div>
      </div>
      <div className="text-xs text-gray-300 font-mono leading-tight">{desc}</div>
   </div>
);
