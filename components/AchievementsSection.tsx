import React, { useState } from 'react';
import { ACHIEVEMENTS } from '../data';
import { SectionId } from '../types';
import { Trophy, Lock, Medal } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  
  const categories = ['All', 'Story', 'Combat', 'Weapon', 'Building', 'Multiplayer', 'Exploration', 'Secret'];
  
  const filteredAchievements = filter === 'All' 
    ? ACHIEVEMENTS 
    : ACHIEVEMENTS.filter(a => a.category === filter);

  return (
    <section id={SectionId.ACHIEVEMENTS} className="py-24 bg-[#050505] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="flex items-center mb-6 md:mb-0">
            <Trophy className="w-8 h-8 text-yellow-500 mr-4" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              SERVICE <span className="text-yellow-500">//</span> RECORDS
            </h2>
          </div>

          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded transition-colors whitespace-nowrap ${
                  filter === cat 
                  ? 'bg-yellow-900/20 border-yellow-500 text-yellow-500' 
                  : 'bg-transparent border-gray-800 text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAchievements.map((ach) => (
            <div key={ach.id} className={`p-4 rounded border flex items-start space-x-4 transition-all ${
               ach.hidden 
               ? 'bg-black/50 border-gray-900 opacity-60' 
               : 'bg-gray-900/30 border-gray-800 hover:bg-gray-800 hover:border-yellow-500/30'
            }`}>
              <div className={`p-2 rounded-full shrink-0 ${
                ach.hidden ? 'bg-gray-800 text-gray-600' : 'bg-yellow-900/20 text-yellow-500'
              }`}>
                {ach.hidden ? <Lock className="w-5 h-5" /> : <Medal className="w-5 h-5" />}
              </div>
              
              <div>
                <h4 className={`font-display font-bold text-sm mb-1 ${
                  ach.hidden ? 'text-gray-600' : 'text-gray-200'
                }`}>
                  {ach.title}
                </h4>
                <p className={`text-xs ${
                  ach.hidden ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {ach.description}
                </p>
                {ach.hidden && <span className="text-[10px] text-red-900 font-mono mt-2 block">CLASSIFIED RECORD</span>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
