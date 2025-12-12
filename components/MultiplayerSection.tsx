import React, { useState } from 'react';
import { GAME_MODES, GAME_MAPS } from '../data';
import { SectionId } from '../types';
import { Globe, Users, MapPin, Radio } from 'lucide-react';

export const MultiplayerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Modes' | 'Maps'>('Modes');

  return (
    <section id={SectionId.MULTIPLAYER} className="py-24 bg-[#0a0a0c] border-t border-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-900/10 rounded-full mb-4">
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
            TACTICAL <span className="text-blue-500">//</span> NETWORK
          </h2>
          <p className="text-blue-400/60 font-mono tracking-widest text-sm">
            MULTIPLAYER_LOBBY // MAP_DATA_LOADED
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
           <div className="bg-gray-900 p-1 rounded-full border border-gray-800 flex">
             <button 
               onClick={() => setActiveTab('Modes')}
               className={`px-8 py-2 rounded-full font-display font-bold text-sm tracking-wide transition-all ${
                 activeTab === 'Modes' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
               }`}
             >
               GAME MODES
             </button>
             <button 
               onClick={() => setActiveTab('Maps')}
               className={`px-8 py-2 rounded-full font-display font-bold text-sm tracking-wide transition-all ${
                 activeTab === 'Maps' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
               }`}
             >
               SECTOR MAPS
             </button>
           </div>
        </div>

        {/* Content */}
        {activeTab === 'Modes' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GAME_MODES.map((mode) => (
              <div key={mode.id} className="bg-gray-900/50 border border-gray-800 p-8 rounded hover:border-blue-500/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-900/20 text-blue-400 px-3 py-1 rounded text-xs font-mono font-bold flex items-center">
                    <Radio className="w-3 h-3 mr-2 animate-pulse" /> {mode.type.toUpperCase()}
                  </div>
                  <div className="text-gray-500 font-mono text-xs">{mode.players}</div>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{mode.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{mode.description}</p>
                
                <div className="space-y-2">
                  {mode.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-xs text-gray-300 font-mono">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {GAME_MAPS.map((map) => (
              <div key={map.id} className="relative group bg-black border border-gray-800 rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
                
                {/* Visual Placeholder (Simulating Map View) */}
                <div className="h-64 bg-gray-900 relative opacity-60 group-hover:opacity-80 transition-opacity">
                   <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                      {[...Array(36)].map((_, i) => (
                        <div key={i} className="border border-blue-500/20"></div>
                      ))}
                   </div>
                   <MapPin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 w-12 h-12" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                   <div className="flex justify-between items-end mb-2">
                     <h3 className="text-2xl font-display font-bold text-white">{map.name}</h3>
                     <span className="text-xs font-mono text-blue-400 border border-blue-900 bg-blue-900/20 px-2 py-1 rounded">{map.type}</span>
                   </div>
                   <div className="text-gray-400 text-xs font-mono mb-4">{map.biome} Biome</div>
                   <p className="text-gray-300 text-sm mb-4">{map.description}</p>
                   
                   <div className="flex gap-2">
                      {map.hazards.map((h, i) => (
                         <span key={i} className="text-[10px] bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-900/50">
                           ! {h}
                         </span>
                      ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
