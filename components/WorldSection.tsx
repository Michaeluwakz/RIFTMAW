import React from 'react';
import { BIOMES } from '../data';
import { SectionId } from '../types';
import { Map, AlertTriangle, CloudLightning, Calendar } from 'lucide-react';

export const WorldSection: React.FC = () => {
  return (
    <section id={SectionId.WORLD} className="py-24 bg-[#050505] relative border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <Map className="w-8 h-8 text-fuchsia-500 mr-4" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            SEASONAL <span className="text-fuchsia-500">//</span> ZONES
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BIOMES.map((biome, idx) => (
            <div key={biome.id} className="group relative bg-gray-900 border border-gray-800 hover:border-fuchsia-500/50 transition-all duration-300 overflow-hidden rounded-sm h-full flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-fuchsia-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={`https://picsum.photos/600/400?random=${idx + 20}`} 
                  alt={biome.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-0 left-0 bg-black/80 px-3 py-1 text-fuchsia-400 font-mono text-xs border-b border-r border-fuchsia-500/30 z-20 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> {biome.season}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-fuchsia-400 transition-colors">{biome.name}</h3>
                <p className="text-gray-400 mb-6 text-sm flex-grow leading-relaxed">{biome.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-xs font-mono text-gray-500">
                    <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                    HAZARD: <span className={`ml-2 px-2 py-0.5 rounded ${biome.hazardLevel === 'Extreme' || biome.hazardLevel === 'Apocalyptic' ? 'bg-red-900/50 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>{biome.hazardLevel.toUpperCase()}</span>
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {biome.features.map((feature, i) => (
                      <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-sm border border-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Environmental Hazards */}
                  {biome.environmentalHazards && (
                    <div className="pt-4 border-t border-gray-800">
                       <h4 className="text-[10px] font-mono text-fuchsia-400 mb-2 flex items-center">
                          <CloudLightning className="w-3 h-3 mr-1" /> ENVIRONMENTAL ANOMALIES
                       </h4>
                       <ul className="space-y-2">
                          {biome.environmentalHazards.map((hazard, i) => (
                             <li key={i} className="text-xs text-gray-400 flex items-start">
                                <span className="inline-block w-1 h-1 bg-fuchsia-500 rounded-full mt-1.5 mr-2 shrink-0"></span>
                                {hazard}
                             </li>
                          ))}
                       </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};