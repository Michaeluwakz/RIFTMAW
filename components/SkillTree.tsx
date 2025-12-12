import React, { useState } from 'react';
import { SKILL_TREES } from '../data';
import { SectionId, SkillBranch } from '../types';
import { Brain, Shield, Crosshair, Zap } from 'lucide-react';

export const SkillTree: React.FC = () => {
  const [activeBranchId, setActiveBranchId] = useState<string>(SKILL_TREES[0].id);
  
  const activeBranch = SKILL_TREES.find(b => b.id === activeBranchId) || SKILL_TREES[0];

  const getBranchIcon = (id: string) => {
    switch(id) {
      case 'combat': return Crosshair;
      case 'movement': return Shield;
      case 'tech': return Zap;
      default: return Brain;
    }
  };

  return (
    <section id={SectionId.SKILLS} className="py-24 bg-[#080a0b] relative border-t border-gray-900 overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
             <pattern id="hex" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z" fill="none" stroke="white" strokeWidth="1"/>
             </pattern>
             <rect width="100%" height="100%" fill="url(#hex)"/>
          </svg>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <div className="inline-flex items-center justify-center p-3 bg-cyan-900/10 rounded-full mb-4">
            <Brain className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
            NEURAL <span className="text-cyan-500">//</span> UPGRADES
          </h2>
          <p className="text-cyan-400/60 font-mono tracking-widest text-sm">
            SELECT_MODULE // OPTIMIZE_OPERATIVE
          </p>
        </div>

        {/* Branch Selection */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {SKILL_TREES.map(branch => {
            const Icon = getBranchIcon(branch.id);
            const isActive = activeBranchId === branch.id;
            return (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`flex items-center px-6 py-3 rounded-sm border-2 transition-all duration-300 font-display font-bold tracking-wide uppercase ${
                  isActive 
                  ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' 
                  : 'bg-black/50 border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                {branch.name}
              </button>
            );
          })}
        </div>

        {/* Tree Visualization */}
        <div className="bg-black/40 border border-gray-800 rounded-lg p-8 md:p-12 relative min-h-[500px]">
           <h3 className="text-2xl font-display font-bold text-white mb-2">{activeBranch.name}</h3>
           <p className="text-gray-400 text-sm mb-12 max-w-2xl">{activeBranch.description}</p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Lines for Desktop */}
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gray-800 -z-10"></div>
              
              {/* Tier Columns */}
              {[1, 2, 3].map(tier => (
                <div key={tier} className="flex flex-col gap-6 relative">
                   <div className="text-center font-mono text-cyan-500 text-sm mb-4 tracking-widest border-b border-cyan-900/50 pb-2">
                      TIER 0{tier}
                   </div>
                   
                   {activeBranch.skills.filter(s => s.tier === tier).map(skill => (
                      <div key={skill.id} className="bg-gray-900/80 border border-gray-700 p-5 rounded-sm hover:border-cyan-500 hover:bg-gray-800 transition-all group cursor-default">
                         <div className="font-display font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                            {skill.name}
                         </div>
                         <div className="text-xs text-gray-400 group-hover:text-gray-300">
                            {skill.description}
                         </div>
                      </div>
                   ))}
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};
