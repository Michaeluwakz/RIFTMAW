import React, { useState } from 'react';
import { MISSIONS } from '../data';
import { SectionId } from '../types';
import { FileText, ChevronRight, Target, Gift, Crosshair, List } from 'lucide-react';

export const StoryTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Campaign' | 'Side Ops'>('Campaign');

  const campaignMissions = MISSIONS.filter(m => m.type === 'Campaign');
  const sideOps = MISSIONS.filter(m => m.type !== 'Campaign');
  
  const displayMissions = activeTab === 'Campaign' ? campaignMissions : sideOps;

  return (
    <section id={SectionId.STORY} className="py-24 bg-[#020202] relative overflow-hidden">
       {/* Decorative scanlines */}
       <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] z-0"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-lime-400 mr-4" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              MISSION <span className="text-lime-500">//</span> LOGS
            </h2>
          </div>

          <div className="flex space-x-2 mt-4 md:mt-0">
             <button 
                onClick={() => setActiveTab('Campaign')}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border rounded-sm transition-all ${
                  activeTab === 'Campaign' 
                  ? 'bg-lime-900/30 border-lime-500 text-lime-400' 
                  : 'bg-transparent border-gray-800 text-gray-500 hover:text-white'
                }`}
             >
               Main Campaign
             </button>
             <button 
                onClick={() => setActiveTab('Side Ops')}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border rounded-sm transition-all ${
                  activeTab === 'Side Ops' 
                  ? 'bg-lime-900/30 border-lime-500 text-lime-400' 
                  : 'bg-transparent border-gray-800 text-gray-500 hover:text-white'
                }`}
             >
               Side Ops
             </button>
          </div>
        </div>

        <div className="relative border-l-2 border-gray-800 ml-4 md:ml-0 space-y-12 md:space-y-0">
          {displayMissions.map((mission, idx) => (
            <div key={mission.id} className="mb-8 md:flex items-start justify-between w-full md:mb-12 group">
              {/* Timeline Dot */}
              <div className={`absolute left-[-9px] w-4 h-4 rounded-full border-2 transition-colors z-20 ${
                 mission.type === 'Campaign' ? 'bg-gray-800 border-black group-hover:bg-lime-500' : 'bg-gray-800 border-black group-hover:bg-cyan-500'
              }`}></div>
              
              <div className={`w-full ${idx % 2 === 0 ? 'md:order-1 md:pr-8' : 'md:order-3 md:pl-8'}`}>
                <div className="bg-gray-900/50 backdrop-blur border border-gray-800 p-6 rounded-sm hover:border-lime-500/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-mono text-xs tracking-wider mb-2 block ${
                      mission.type === 'Campaign' ? 'text-lime-500' : 'text-cyan-500'
                    }`}>
                      {mission.type === 'Campaign' ? `OPERATION 0${mission.id}` : mission.type.toUpperCase()}
                    </span>
                    {mission.reward && (
                       <span className="text-[10px] bg-yellow-900/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-900/50 flex items-center gap-1">
                          <Gift className="w-3 h-3" /> REWARD: {mission.reward}
                       </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-white mb-2">{mission.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{mission.description}</p>
                  
                  {mission.objectives && (
                    <div className="bg-black/30 p-3 rounded border border-gray-800">
                      <div className="text-[10px] text-gray-500 font-mono mb-2 flex items-center">
                        <List className="w-3 h-3 mr-1" /> OBJECTIVES
                      </div>
                      <ul className="space-y-1">
                        {mission.objectives.map((obj, i) => (
                           <li key={i} className="text-xs text-gray-300 font-mono flex items-start">
                             <Target className="w-3 h-3 mr-2 mt-0.5 text-gray-600" />
                             {obj}
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Center Icon (Desktop only) */}
              <div className="hidden md:flex md:w-[10%] justify-center items-center order-2 mt-6">
                <div className="bg-black border border-gray-800 p-2 rounded-full z-10 group-hover:border-lime-500 transition-colors">
                  {mission.type === 'Campaign' ? <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-lime-500" /> : <Crosshair className="w-4 h-4 text-gray-600 group-hover:text-cyan-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
