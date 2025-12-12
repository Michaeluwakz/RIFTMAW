import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CharacterCreator } from './components/CharacterCreator';
import { MultiplayerSection } from './components/MultiplayerSection';
import { SkillTree } from './components/SkillTree';
import { WorldSection } from './components/WorldSection';
import { ArsenalSection } from './components/ArsenalSection';
import { EnemySection } from './components/EnemySection';
import { AchievementsSection } from './components/AchievementsSection';
import { LoreCodex } from './components/LoreCodex';
import { StoryTimeline } from './components/StoryTimeline';
import { Footer } from './components/Footer';
import { ArchitectChat } from './components/ArchitectChat';
import { SectionId } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main>
        <Hero onNavigate={handleNavigate} />
        <CharacterCreator />
        <MultiplayerSection />
        <SkillTree />
        <WorldSection />
        <ArsenalSection />
        <EnemySection />
        <AchievementsSection />
        <LoreCodex />
        <StoryTimeline />
      </main>

      <Footer />
      <ArchitectChat />
    </div>
  );
};

export default App;
