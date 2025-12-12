import React from 'react';
import { SectionId } from '../types';
import { Menu, X, Cpu } from 'lucide-react';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: SectionId.HOME, label: 'HOME' },
    { id: SectionId.CREATOR, label: 'ENLIST' },
    { id: SectionId.MULTIPLAYER, label: 'ONLINE' },
    { id: SectionId.SKILLS, label: 'SKILLS' },
    { id: SectionId.WORLD, label: 'WORLD' },
    { id: SectionId.ARSENAL, label: 'GEAR' },
    { id: SectionId.ENEMIES, label: 'THREATS' },
    { id: SectionId.ACHIEVEMENTS, label: 'RECORDS' },
    { id: SectionId.CODEX, label: 'DATA' },
    { id: SectionId.STORY, label: 'OPS' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-cyan-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(SectionId.HOME)}>
            <Cpu className="h-8 w-8 text-cyan-400 mr-2 group-hover:animate-spin" />
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              RIFTMAW
            </span>
          </div>
          
          <div className="hidden xl:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-[10px] font-mono tracking-widest transition-all duration-300 uppercase ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-cyan-900/20 border border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="xl:hidden bg-black/95 border-b border-cyan-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium font-mono ${
                  activeSection === item.id ? 'text-cyan-400 bg-cyan-900/20' : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
