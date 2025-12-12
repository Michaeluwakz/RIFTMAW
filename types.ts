export interface Weapon {
  id: string;
  name: string;
  type: 'Ballistic' | 'Energy' | 'Special';
  description: string;
  stats: {
    damage: number;
    fireRate: number;
    range: number;
  };
  upgrades?: {
    tier1: string;
    tier2: string;
    tier3: string;
    uniqueVariant: {
      name: string;
      description: string;
    };
  };
}

export interface Enemy {
  id: string;
  name: string;
  category: 'Standard' | 'Advanced' | 'Boss' | 'Mega-Boss';
  description: string;
  behavior: string; // AI Logic description
  threatLevel: 1 | 2 | 3 | 4 | 5;
  visualTrait: string;
}

export interface Biome {
  id: string;
  name: string;
  season: string;
  description: string;
  hazardLevel: string;
  features: string[];
  environmentalHazards?: string[];
}

export interface Mission {
  id: number;
  type: 'Campaign' | 'Side Op' | 'Contract';
  title: string;
  description: string;
  objectives?: string[];
  reward?: string;
}

export interface LoreEntry {
  id: string;
  title: string;
  category: 'Entity' | 'Location' | 'Tech' | 'Anomaly' | 'Faction' | 'Character' | 'Hazard' | 'Audio Intel';
  content: string;
  quote?: string; // Character dialogue/voice line
  tags?: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  tier: 1 | 2 | 3;
}

export interface SkillBranch {
  id: string;
  name: string;
  description: string;
  skills: SkillNode[];
}

export interface GameMode {
  id: string;
  title: string;
  type: 'Co-op' | 'PvP' | 'Survival';
  players: string;
  description: string;
  features: string[];
}

export interface GameMap {
  id: string;
  name: string;
  type: string;
  biome: string;
  description: string;
  hazards: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Story' | 'Combat' | 'Weapon' | 'Building' | 'Multiplayer' | 'Exploration' | 'Secret';
  hidden?: boolean;
}

export enum SectionId {
  HOME = 'home',
  MULTIPLAYER = 'multiplayer',
  WORLD = 'world',
  ARSENAL = 'arsenal',
  SKILLS = 'skills',
  ENEMIES = 'enemies',
  CREATOR = 'creator',
  CODEX = 'codex',
  ACHIEVEMENTS = 'achievements',
  STORY = 'story',
}