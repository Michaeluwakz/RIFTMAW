import React, { useState } from 'react';
import { LORE_ENTRIES } from '../data';
import { SectionId, LoreEntry } from '../types';
import { Database, Search, Folder, Terminal, ChevronRight, MessageSquareQuote } from 'lucide-react';

export const LoreCodex: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<LoreEntry | null>(null);

  const categories = ['All', 'Character', 'Entity', 'Faction', 'Location', 'Tech', 'Anomaly', 'Audio Intel'];

  const filteredEntries = LORE_ENTRIES.filter(entry => {
    const matchesCategory = activeCategory === 'All' || entry.category === activeCategory;
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id={SectionId.CODEX} className="py-24 bg-black border-t border-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <Database className="w-8 h-8 text-lime-500 mr-4 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            ARCHIVE <span className="text-lime-500">//</span> DATABASE
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px] border border-gray-800 rounded-lg overflow-hidden bg-[#0c0c0c]">
          
          {/* Sidebar: Search & List */}
          <div className="lg:col-span-4 bg-[#111] border-r border-gray-800 flex flex-col">
            
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-800 bg-[#0a0a0a]">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="SEARCH_QUERY..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black border border-gray-700 text-lime-500 placeholder-gray-700 px-4 py-2 pl-10 font-mono text-sm focus:border-lime-500 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
              </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto p-2 gap-2 border-b border-gray-800 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs font-mono whitespace-nowrap border rounded-sm transition-colors ${
                    activeCategory === cat 
                    ? 'bg-lime-900/30 text-lime-400 border-lime-600' 
                    : 'bg-black text-gray-500 border-gray-800 hover:border-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Entry List */}
            <div className="flex-grow overflow-y-auto p-2 space-y-1">
              {filteredEntries.map(entry => (
                <button
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className={`w-full text-left px-4 py-3 border-l-2 transition-all group flex justify-between items-center ${
                    selectedEntry?.id === entry.id
                    ? 'bg-lime-900/10 border-lime-500 text-white'
                    : 'border-transparent hover:bg-gray-900 hover:border-gray-700 text-gray-400'
                  }`}
                >
                  <div>
                    <div className="font-display font-bold text-sm tracking-wide group-hover:text-lime-400 transition-colors">
                      {entry.title.toUpperCase()}
                    </div>
                    <div className="text-[10px] font-mono text-gray-600 uppercase">{entry.category}</div>
                  </div>
                  {selectedEntry?.id === entry.id && <ChevronRight className="w-4 h-4 text-lime-500" />}
                </button>
              ))}
              {filteredEntries.length === 0 && (
                 <div className="p-4 text-center text-gray-600 font-mono text-xs">NO_DATA_FOUND</div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] relative flex flex-col">
            {/* Terminal Scanlines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.02),rgba(0,0,255,0.03))] bg-[size:100%_3px,3px_100%] pointer-events-none"></div>

            {selectedEntry ? (
              <div className="p-8 relative z-10 h-full overflow-y-auto">
                <div className="flex justify-between items-start mb-6 border-b border-lime-900/30 pb-4">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-1">{selectedEntry.title}</h3>
                    <div className="flex items-center gap-2">
                       <Folder className="w-4 h-4 text-lime-600" />
                       <span className="text-lime-600 font-mono text-xs uppercase">{selectedEntry.category} FILE</span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-gray-600">
                    ID: {selectedEntry.id.toUpperCase()} <br/>
                    ENC: AES-256
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  {selectedEntry.quote && (
                    <div className="mb-6 p-4 border-l-4 border-fuchsia-500 bg-fuchsia-900/10 italic text-gray-300 relative">
                       <MessageSquareQuote className="absolute top-2 right-2 text-fuchsia-500/20 w-8 h-8" />
                       {selectedEntry.quote}
                    </div>
                  )}
                  <p className="text-gray-300 leading-relaxed font-sans text-lg border-l-2 border-lime-500/50 pl-4 whitespace-pre-line">
                    {selectedEntry.content}
                  </p>
                </div>

                {selectedEntry.tags && (
                  <div className="mt-8">
                    <span className="text-xs font-mono text-gray-500 block mb-2">KEYWORDS</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-gray-400 font-mono">
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-700 z-10">
                <Terminal className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-mono text-sm tracking-widest">AWAITING_INPUT...</p>
                <p className="text-xs mt-2">SELECT A FILE TO DECRYPT</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
