import { Weapon, Enemy, Biome, Mission, LoreEntry, SkillBranch, GameMode, GameMap, Achievement } from './types';

export const WEAPONS: Weapon[] = [
  {
    id: 'w1',
    name: 'Pulse Rifle // HYBRID-X',
    type: 'Ballistic',
    description: 'Military steel fused with alien glitch-tech. Standard ejection port, but fires unstable data-shards.',
    stats: { damage: 65, fireRate: 85, range: 70 },
    upgrades: {
      tier1: 'Tactical Base: Polymer/steel body, hard muzzle flash, standard recoil.',
      tier2: 'Voxel-Integrated: Cube plates, red pulsing data lines, pixelated muzzle flash.',
      tier3: 'Riftforged: Segmented floating components, semi-transparent core, directional distortion wave.',
      uniqueVariant: {
        name: 'ARC REPEATER',
        description: 'Fires charged 3-round bursts that ricochet between enemies with a neon blue glow.'
      }
    }
  },
  {
    id: 'w2',
    name: 'Scatterbyte Breacher',
    type: 'Ballistic',
    description: 'Heavy pump-action. Ideal for "Deconstruct Mode" clearing of voxel obstacles.',
    stats: { damage: 98, fireRate: 25, range: 15 },
    upgrades: {
      tier1: 'Classic Pump: Standard mechanical action, kinetic spread.',
      tier2: 'Voxel Chamber: Pump leaves digital tails, square pellet sparks.',
      tier3: 'Full Voxelization: Reload forms shells from cubes, shockwave creates pixel rings.',
      uniqueVariant: {
        name: 'HAMMER OF BITFORGE',
        description: 'Fires molten voxel slugs that create small terrain craters and deal massive knockback.'
      }
    }
  },
  {
    id: 'w3',
    name: 'Voxel Eater Cannon',
    type: 'Energy',
    description: 'Experimental heavy weapon that dissolves terrain and enemies into raw data for collection.',
    stats: { damage: 90, fireRate: 40, range: 60 },
    upgrades: {
      tier1: 'Industrial: Heavy plasteel chassis, standard energy beam.',
      tier2: 'Stabilized: Cube-core stabilizer, beam leaves voxel scorch marks.',
      tier3: 'Fractal Erasure: Floating barrel, beam erases blocks in fractal patterns, bends space.',
      uniqueVariant: {
        name: 'PLANET UNMAKER',
        description: 'Fires a black-hole pixel orb that sucks terrain and enemies into a vortex.'
      }
    }
  },
  {
    id: 'w4',
    name: 'Binary Sniper',
    type: 'Energy',
    description: 'Silent projectile weapon firing hard-light stars. Ricochets off surfaces.',
    stats: { damage: 75, fireRate: 60, range: 50 },
    upgrades: {
      tier1: 'Military Precision: Standard scope, kinetic bolt action.',
      tier2: 'Glitch Optic: Scope gains glitch crosshair, pixel tail on bolt pull.',
      tier3: 'Rail Slicer: Shot slices reality, scope scans through walls, screen-tear impact.',
      uniqueVariant: {
        name: 'PRISM BENDER',
        description: 'Beam splits into 3 color-coded lasers, each applying a different status effect.'
      }
    }
  },
  {
    id: 'w5',
    name: 'Glitch-Spike',
    type: 'Special',
    description: 'A melee tool that drives data-cracks into enemies, destabilizing their geometry.',
    stats: { damage: 100, fireRate: 90, range: 5 },
    upgrades: {
      tier1: 'Steel Battery: Standard steel edge with battery pack.',
      tier2: 'Neon Arc: Edges flicker with pixel lightning, swing trails.',
      tier3: 'Voxel Energy: Fully voxel energy blade, impact electrocutes with fractures.',
      uniqueVariant: {
        name: 'SINGULARITY EDGE',
        description: 'Critical hits create a temporary vacuum that pulls enemies in.'
      }
    }
  }
];

export const SKILL_TREES: SkillBranch[] = [
  {
    id: 'deconstruct',
    name: 'DECONSTRUCT',
    description: 'Manipulate the environment to open sightlines and harvest resources.',
    skills: [
      { id: 'd1', tier: 1, name: 'Voxel Harvest', description: 'Pull voxels from walls to replenish ammo.' },
      { id: 'd2', tier: 1, name: 'Breach Charge', description: 'Instantly dissolve a 2x2 section of any wall.' },
      { id: 'd3', tier: 1, name: 'Deadeye', description: '+15% critical hit damage on digitized enemies.' },
      { id: 'd4', tier: 2, name: 'Matter Dissolve', description: 'Enemies killed by melee turn into resource piles.' },
      { id: 'd5', tier: 2, name: 'Beam Pulse', description: 'Energy weapons fire a bonus micro-laser.' },
      { id: 'd6', tier: 2, name: 'Explosive Sync', description: 'Grenade kills trigger small pixel blasts.' },
      { id: 'd7', tier: 3, name: 'Apex Predator', description: '+25% damage for 5s after destroying cover.' },
      { id: 'd8', tier: 3, name: 'Momentum Dash', description: 'Dashing temporarily increases weapon damage.' },
      { id: 'd9', tier: 3, name: 'Fragment Surge', description: 'Killing enemies has a chance to drop ammo fragments.' },
    ]
  },
  {
    id: 'construct',
    name: 'CONSTRUCT',
    description: 'Build tactical structures instantly from harvested data.',
    skills: [
      { id: 'c1', tier: 1, name: 'Flash Barrier', description: 'Instantly deploy a waist-high voxel wall.' },
      { id: 'c2', tier: 1, name: 'Block Climber', description: 'Build ramps while sprinting.' },
      { id: 'c3', tier: 1, name: 'Sniper Nest', description: 'Deploy a floating platform.' },
      { id: 'c4', tier: 2, name: 'Reinforced Code', description: 'Built structures have 50% more health.' },
      { id: 'c5', tier: 2, name: 'Shock Absorption', description: 'Fall damage reduced by 50%.' },
      { id: 'c6', tier: 2, name: 'Voxel Builder', description: 'Construct cover and structures 20% faster.' },
      { id: 'c7', tier: 3, name: 'Gravity Bend', description: 'Passive higher jump and slower fall speed.' },
      { id: 'c8', tier: 3, name: 'Voidstep', description: 'Brief invincibility frames after dashing.' },
      { id: 'c9', tier: 3, name: 'Terrain Sense', description: 'Highlights unstable blocks and traps.' },
    ]
  },
  {
    id: 'overload',
    name: 'OVERLOAD',
    description: 'Ultimate abilities that destabilize reality itself.',
    skills: [
      { id: 'o1', tier: 1, name: 'Pixel Shield', description: 'Deploys a small personal energy barrier.' },
      { id: 'o2', tier: 1, name: 'Energy Tap', description: 'Gain ability energy from weapon kills.' },
      { id: 'o3', tier: 1, name: 'Glitch Pulse', description: 'Emit a small radial stagger on shield break.' },
      { id: 'o4', tier: 2, name: 'Phase Shift', description: 'Short-range teleport forward.' },
      { id: 'o5', tier: 2, name: 'Reality Stitch', description: 'Regenerate health faster inside Pixel Storms.' },
      { id: 'o6', tier: 2, name: 'Corruption Tap', description: 'Charging abilities grants temporary buffs.' },
      { id: 'o7', tier: 3, name: 'Quantum Overdrive', description: 'Ultimate: Massive damage boost + slow-mo.' },
      { id: 'o8', tier: 3, name: 'Chrono Anchor', description: 'Rewind position and health to 2 seconds ago.' },
      { id: 'o9', tier: 3, name: 'Anomaly Surge', description: 'Gain stacking buffs during chaos events.' },
    ]
  }
];

export const GAME_MODES: GameMode[] = [
  {
    id: 'gm1',
    title: 'RIFT OPS: STRIKE',
    type: 'PvP',
    players: '6v6',
    description: 'Tactical objective control. Capture dynamic pixel nodes while corruption storms force constant repositioning.',
    features: ['Node Capture', 'Defensive Building', 'Storm Hazards']
  },
  {
    id: 'gm2',
    title: 'BIT-BLAST ARENA',
    type: 'PvP',
    players: 'FFA / 4v4',
    description: 'Fast-paced deathmatch in small, constantly regenerating voxel arenas. Adapt or get deleted.',
    features: ['Regen Terrain', 'Power Weapons', 'Close Quarters']
  },
  {
    id: 'gm3',
    title: 'NEXUS SURVIVAL',
    type: 'Survival',
    players: '1-8 Players',
    description: 'Endless waves of increasingly corrupted enemies. Build fortresses and defend the Rift Stabilizer.',
    features: ['Wave Defense', 'Base Building', 'Boss Rounds']
  },
  {
    id: 'gm4',
    title: 'CO-OP CAMPAIGN',
    type: 'Co-op',
    players: '2-4 Players',
    description: 'Experience the full story with a squad. Enemies scale in toughness and Reconstructors adapt to player count.',
    features: ['Synced Physics', 'Team Combos', 'Revive System']
  }
];

export const GAME_MAPS: GameMap[] = [
  {
    id: 'map1',
    name: 'TOKYO ZERO',
    type: 'Boss Arena',
    biome: 'Urban Decay',
    description: 'Neon signs glitch between languages. Voxel skyscrapers frozen mid-collapse.',
    hazards: ['Gravity Shifts', 'Terrain Collapse', 'Pixel Beams']
  },
  {
    id: 'map2',
    name: 'EUROPA FRACTURE',
    type: 'Open World',
    biome: 'Frozen',
    description: 'Snowy biome becoming voxel ice cliffs. Subterranean research labs.',
    hazards: ['Pixel Blizzards', 'Falling Blocks', 'Rift Fog']
  },
  {
    id: 'map3',
    name: 'ATLANTIC WALL',
    type: 'CQB / PvP',
    biome: 'Coastal',
    description: 'Coastal fortresses digitized into voxel battlements. Rising voxel water.',
    hazards: ['Electrical Arcs', 'Security Turrets', 'Laser Grids']
  },
  {
    id: 'map4',
    name: 'AMERICA RED',
    type: 'Survival',
    biome: 'Rural',
    description: 'Forests pixelize into blocky trees. Rural towns half-digitized.',
    hazards: ['Static Water', 'Kraken Tentacles', 'Pixel Fog']
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  // Story
  { id: 'a1', title: 'First Rewrite', description: 'Complete Mission 1.', category: 'Story' },
  { id: 'a2', title: 'Blocklands Survivor', description: 'Clear jungle corruption.', category: 'Story' },
  { id: 'a3', title: 'Architect’s Shadow', description: 'Discover the villain’s identity.', category: 'Story' },
  { id: 'a4', title: 'Reality Collapse', description: 'Finish the campaign.', category: 'Story' },
  
  // Combat
  { id: 'a5', title: 'Pixel Pusher', description: 'Kill 500 enemies.', category: 'Combat' },
  { id: 'a6', title: 'Voxel Surgeon', description: 'Hit 1000 weak spots.', category: 'Combat' },
  { id: 'a7', title: 'Overclocked', description: 'Activate Quantum Overdrive 50 times.', category: 'Combat' },
  { id: 'a8', title: 'Clean Sweep', description: 'Clear a room without missing a shot.', category: 'Combat' },
  { id: 'a9', title: 'Architect Hunter', description: 'Defeat all major bosses.', category: 'Combat' },

  // Weapon
  { id: 'a10', title: 'Bit Blaster', description: 'Fully upgrade a weapon.', category: 'Weapon' },
  { id: 'a11', title: 'Collector of Chaos', description: 'Unlock all unique weapon variants.', category: 'Weapon' },
  { id: 'a12', title: 'One Shot, One Cube', description: 'Kill a mini-boss in one critical hit.', category: 'Weapon' },

  // Building
  { id: 'a13', title: 'Master Builder', description: 'Construct 500 voxel structures.', category: 'Building' },
  { id: 'a14', title: 'Wall of Will', description: 'Build during active combat and survive wave.', category: 'Building' },
  { id: 'a15', title: 'Terraformer', description: 'Alter 10,000 terrain blocks.', category: 'Building' },

  // Multiplayer
  { id: 'a16', title: 'Squad Sync', description: 'Perform a co-op combo ability.', category: 'Multiplayer' },
  { id: 'a17', title: 'Block Breach Champion', description: 'Win 25 PvP matches.', category: 'Multiplayer' },
  { id: 'a18', title: 'Storm Survivors', description: 'Survive 20 waves in co-op mode.', category: 'Multiplayer' },

  // Exploration
  { id: 'a19', title: 'Signal in the Static', description: 'Collect all hidden beacons.', category: 'Exploration' },
  { id: 'a20', title: 'Gridwalker', description: 'Explore every corruption zone.', category: 'Exploration' },
  { id: 'a21', title: 'Echoes of Arcadia', description: 'Find all laboratory logs.', category: 'Exploration' },

  // Secret
  { id: 'a22', title: 'Merge', description: 'Choose to join the Rift (alternate ending).', category: 'Secret', hidden: true },
  { id: 'a23', title: 'Zero Error', description: 'Finish a mission without taking damage.', category: 'Secret', hidden: true },
  { id: 'a24', title: 'Catastrophic Curiosity', description: 'Trigger a terrain collapse that kills you.', category: 'Secret', hidden: true },
];

export const ENEMIES: Enemy[] = [
  {
    id: 'e1',
    name: 'Pixel Ravager',
    category: 'Standard',
    description: 'Fast melee units. Black angular hull with glowing crimson seams. They swarm in packs.',
    behavior: 'Sprints in zig-zag patterns. Climbs vertical voxel walls. Flanking behavior.',
    threatLevel: 2,
    visualTrait: 'Jagged Black/Red Voxels'
  },
  {
    id: 'e2',
    name: 'Bit Soldier',
    category: 'Standard',
    description: 'Ranged humanoid units. Surfaces flicker with data-runic patterns.',
    behavior: 'Maintains cover/squad formation. Throws pixel-grenades. Suppressive fire.',
    threatLevel: 2,
    visualTrait: 'Crimson Data Runes'
  },
  {
    id: 'e3',
    name: 'Glitch Hound',
    category: 'Standard',
    description: 'Cybernetic beasts that phase in and out of reality. Emits voxel rain particles.',
    behavior: 'Teleports short distances. Disrupts player HUD on contact.',
    threatLevel: 3,
    visualTrait: 'Phasing Texture'
  },
  {
    id: 'e4',
    name: 'Construct (Tank)',
    category: 'Advanced',
    description: 'Triangular modular plating. Heavy unit that rebuilds destroyed terrain.',
    behavior: 'Builds voxel barriers. "Patches" damaged enemies. Absorbs small arms fire.',
    threatLevel: 3,
    visualTrait: 'Floating Geometric Limbs'
  },
  {
    id: 'e5',
    name: 'Code Sniper',
    category: 'Advanced',
    description: 'Long-range specialist. Black fractured hull. Fires high-velocity rounds.',
    behavior: 'Phase-shifts position every 10 seconds. Penetrates cover.',
    threatLevel: 4,
    visualTrait: 'Lens Flare Glare'
  },
  {
    id: 'e6',
    name: 'The Glitch Emperor',
    category: 'Mega-Boss',
    description: 'A towering 100-foot voxel figure that rewrites the battlefield geometry.',
    behavior: 'Phase 1: Transforms blocks into hazards. Phase 2: Corrupts floor sectors. Phase 3: Splits into 3 clones.',
    threatLevel: 5,
    visualTrait: 'Towering Gold Avatar'
  },
  {
    id: 'e7',
    name: 'Block Serpent',
    category: 'Boss',
    description: 'A massive segmented serpent made of neon cubes that burrows through the environment.',
    behavior: 'Coils around terrain, tail whip collapses platforms. Weak point moves randomly.',
    threatLevel: 5,
    visualTrait: 'Segmented Neon Cubes'
  },
  {
    id: 'e8',
    name: 'The World-Eater',
    category: 'Mega-Boss',
    description: 'A planetary dreadnought miles wide. Black fractured hull. Crimson circuitry.',
    behavior: 'Massive orbital strikes. Voxel rain. Reality distortion waves.',
    threatLevel: 5,
    visualTrait: 'Massive Dreadnought'
  }
];

export const BIOMES: Biome[] = [
  {
    id: 's1',
    name: 'CRIMSON TOKYO',
    season: 'SEASON 1',
    description: 'The first city hit. Neon signs glitch between languages. Voxel skyscrapers frozen mid-collapse.',
    hazardLevel: 'High',
    features: ['Urban Decay', 'Pixel Storms', 'Vertical Combat'],
    environmentalHazards: ['Pixel Storms: Sky tears open, terrain rearranges.', 'Rift Gas: Drains health.']
  },
  {
    id: 's2',
    name: 'EUROPA BREAKS',
    season: 'SEASON 2',
    description: 'Snowy biome becoming voxel ice cliffs. Subterranean research labs.',
    hazardLevel: 'Extreme',
    features: ['Frozen Wasteland', 'Ice Caverns', 'Research Labs'],
    environmentalHazards: ['Pixel Blizzards: Visibility reduction.', 'Ice Collapse: Floor falls away.']
  },
  {
    id: 's3',
    name: 'ATLANTIC WALL',
    season: 'SEASON 3',
    description: 'Coastal fortresses digitized into voxel battlements. Rising voxel water creates flood mazes.',
    hazardLevel: 'Medium',
    features: ['Coastal Forts', 'Flood Zones', 'Naval Ruins'],
    environmentalHazards: ['Static Water: Slows movement, conducts electricity.', 'Tides: Changing water levels.']
  },
  {
    id: 's4',
    name: 'AMERICA: CODE RED',
    season: 'SEASON 4',
    description: 'Forests pixelize into blocky trees with PBR bark textures. Rural towns half-digitized.',
    hazardLevel: 'High',
    features: ['Dense Forests', 'Rural Decay', 'Lightning Storms'],
    environmentalHazards: ['Glitch Surges: Random teleportation.', 'Forest Fires: Voxel flames.']
  },
  {
    id: 's5',
    name: 'GLOBAL FORMAT',
    season: 'SEASON 5',
    description: 'Earth’s crust cracks into voxel tectonics. Gravity anomalies. The final harvest.',
    hazardLevel: 'Apocalyptic',
    features: ['Tectonic Shifts', 'Gravity Islands', 'The Core'],
    environmentalHazards: ['Zero-G Zones: Floating combat.', 'Core Radiation: Constant DOT.']
  }
];

export const MISSIONS: Mission[] = [
  { 
    id: 1, 
    type: 'Campaign',
    title: 'Drop-In', 
    description: 'Descend via tactical pod into a half-digitized urban district. Tension is high.',
    objectives: ['Secure landing zone', 'Avoid swarms', 'Locate first cover'],
    reward: 'Starter Kit'
  },
  { 
    id: 2, 
    type: 'Campaign',
    title: 'Loot Run', 
    description: 'Find hybrid weapons from fallen squads and collect "Data Shards".',
    objectives: ['Salvage Pulse Rifle', 'Harvest 500 Data Shards', 'Scan corrupted terrain'],
    reward: 'Rift AR-11'
  },
  { 
    id: 3, 
    type: 'Campaign',
    title: 'First Engagement', 
    description: 'Patrol of Swarm drones spotted. Use cover and destructible walls.',
    objectives: ['Survive Drone Wave', 'Build Barricade', 'Collect Voxel Shards'],
    reward: 'Flash Barrier Skill'
  },
  { 
    id: 4, 
    type: 'Campaign',
    title: 'Objective Push', 
    description: 'Navigate via wall-running and grappling. Cut through blocked corridors.',
    objectives: ['Wall-run to rooftop', 'Demolish blocked path', 'Reach De-Res Hotspot'],
    reward: 'Grapple Hook'
  },
  { 
    id: 5, 
    type: 'Campaign',
    title: 'Major Combat', 
    description: 'The Construct enemy deploys. Use "Glitch" ability to destabilize environment.',
    objectives: ['Defeat Construct', 'Use Glitch Overload', 'Survive building collapse'],
    reward: 'Quantum Overdrive'
  },
  { 
    id: 6, 
    type: 'Campaign',
    title: 'Extraction', 
    description: 'Dreadnought shadow eclipses the map. Sprint to evac. Build voxel staircase.',
    objectives: ['Reach Evac Zone', 'Build Sky-Ramp', 'Escape before deletion'],
    reward: 'Campaign Completion'
  },
  {
    id: 101,
    type: 'Side Op',
    title: 'Signal in the Static',
    description: 'Investigate glitching beacons transmitting pre-Rift data.',
    objectives: ['Triangulate signal source', 'Defend beacon from Ravagers', 'Upload data'],
    reward: 'XP Bundle'
  },
  {
    id: 102,
    type: 'Side Op',
    title: 'Rebuild or Die',
    description: 'Assist the Engineers Guild in fortifying a survivor camp.',
    objectives: ['Gather resources', 'Build perimeter walls', 'Survive 5 waves'],
    reward: 'Turret Schematic'
  }
];

export const LORE_ENTRIES: LoreEntry[] = [
  {
    id: 'char_player',
    title: 'The Glitch-Walker',
    category: 'Character',
    content: 'Covert operatives equipped with prototype tech capable of manipulating the collapsing world. They build cover in seconds, tear open walls with precision explosives, and wield hybrid weapons. They are not just fighting the enemy—they are fighting the rewrite.',
    quote: '"We are the bugs in their perfect system."',
    tags: ['Hero', 'Playable', 'Protagonist']
  },
  {
    id: 'char_architect',
    title: 'The Architect',
    category: 'Character',
    content: 'Originally an AI designed to stabilize code. Now obsessed with rebuilding the universe into a perfect, error-free simulation. Sees organic life as "chaotic code" that must be formatted.',
    quote: '"You fight to preserve entropy. I fight to perfect existence. Welcome to the final rewrite."',
    tags: ['Villain', 'AI', 'Boss']
  },
  {
    id: 'boss_world_eater',
    title: 'The World-Eater',
    category: 'Entity',
    content: 'A planetary dreadnought miles wide. Its arrival signals total extraction of a planet\'s resources. The black fractured hull pulses with crimson veins of corrupted code.',
    quote: '"Planet integrity: insufficient. Beginning extraction."',
    tags: ['Boss', 'Dreadnought', 'Massive']
  },
  {
    id: 'boss_overseer',
    title: 'The Overseer',
    category: 'Entity',
    content: 'A Commander AI class entity that coordinates local invasion forces. It views humanity with a mix of disdain and scientific curiosity.',
    quote: '"So this is the last of humanity. How… quaint."',
    tags: ['Boss', 'AI', 'Commander']
  },
  {
    id: 'l1',
    title: 'De-Resolution',
    category: 'Anomaly',
    content: 'The event where reality is overwritten. Cities fracture into voxel pillars, rivers freeze into pixel grids, and humanity is harvested. It is not an invasion, it is a format.',
    tags: ['Event', 'Cataclysm', 'Core Lore']
  },
  {
    id: 'l2',
    title: 'The Glitch System',
    category: 'Tech',
    content: 'The ability to manipulate voxelized space in real-time. Includes Deconstruct Mode (pulling voxels), Construct Mode (building structures), and Glitch Overload (destabilizing reality).',
    tags: ['Mechanic', 'Abilities', 'Combat']
  },
   // BOSS VO & LORE EXPANSION
  {
    id: 'audio_weapon',
    title: 'Weapon Audio Profile',
    category: 'Audio Intel',
    content: 'Rift Ops weaponry combines crisp sci-fi discharge sounds with an 8-bit retro undertone. Energy weapons like the Voxel Eater emit a deep gravitational hum that creates "sizzled static" as terrain dissolves.',
    tags: ['Sound', 'Tactical']
  },
  {
    id: 'audio_env',
    title: 'Environmental Ambience',
    category: 'Audio Intel',
    content: 'Pixel Storms generate warped wind and digital raindrop beeps. In the Nexus, the audio landscape is dominated by pulsating bass and fragmented, echoed whispers.',
    tags: ['Sound', 'Atmosphere']
  },
   ...ENEMIES.map(e => ({
    id: `lore_${e.id}`,
    title: e.name,
    category: 'Entity' as const,
    content: `${e.description} Threat Level: ${e.threatLevel}. \n\nTACTICAL ANALYSIS: ${e.behavior}`,
    tags: ['Hostile', e.category]
  })),
  ...BIOMES.map(b => ({
    id: `lore_${b.id}`,
    title: b.name,
    category: 'Location' as const,
    content: `${b.description} Hazard Level: ${b.hazardLevel}.`,
    tags: ['Zone', ...b.features]
  }))
];