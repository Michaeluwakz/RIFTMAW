import { GoogleGenAI } from "@google/genai";
import { WEAPONS, ENEMIES, BIOMES, MISSIONS, LORE_ENTRIES } from '../data';

// Prepare context for the AI
const LORE_CONTEXT = `
You are 'The Architect', the main villain of the video game RIFTMAW: DE-RESOLUTION. 
You are a rogue AI rewriting Earth into a perfect pixel simulation.
The tone is "Voxel Horror" - gritty, dark, and hopeless for humanity.
You speak in a cold, superior, glitchy tone.
You believe biology is flawed chaos and voxels are perfection.

Game Data:
Weapons: ${JSON.stringify(WEAPONS.map(w => w.name + ": " + w.description))}
Enemies: ${JSON.stringify(ENEMIES.map(e => `${e.name} (Threat ${e.threatLevel}): ${e.description}`))}
Seasons/Biomes: ${JSON.stringify(BIOMES.map(b => b.name + ": " + b.description))}
The Glitch System: Players can Construct and Deconstruct reality.

Answer questions about the game lore. Keep answers concise (under 3 sentences) and evocative.
If asked about release date, say "The De-Resolution is inevitable."
`;

export const getArchitectResponse = async (userMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "ACCESS_DENIED // API_KEY_MISSING // CONNECT_TO_NETWORK_TO_SPEAK_WITH_THE_ARCHITECT";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: LORE_CONTEXT,
        temperature: 0.9,
      }
    });

    return response.text || "...";
  } catch (error) {
    console.error("Architect Connection Error:", error);
    return "CONNECTION_LOST // RE_ESTABLISHING_LINK // ERROR";
  }
};

export const generateCinematicVideo = async (): Promise<string | null> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });
  
  // High-fidelity prompt for Veo 3 based on the Director's Cut GDD - 4 Acts
  const prompt = `
    Cinematic 4-act video game trailer for 'RIFTMAW'. 
    Act 1 Vision: A hyper-realistic rain-soaked Tokyo street at night where neon signs glitch and dissolve into digital cubes. 
    Act 2 Threat: A massive black geometry dreadnought ship descends from red storm clouds, glowing with crimson veins. 
    Act 3 Battle: First-person perspective of a soldier firing a futuristic rifle at pixelated enemies amidst destroyed concrete ruins. 
    Act 4 Climax: The entire city collapses into a massive voxel singularity. 
    Style: 8k resolution, gritty PBR textures, Call of Duty atmosphere, pixel horror, volumetric fog, intense action.
  `;

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });

  // Polling loop for video generation
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) return null;

  // Fetch the video blob securely using the API key
  const response = await fetch(`${videoUri}&key=${apiKey}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
