import { GoogleGenAI, Type } from "@google/genai";
import { Scenario, VisualTraits, PropType } from '../types';
import { COLORS } from '../constants';
import { getRandomFallbackScenario } from './contentLibrary';

// Initialize with key from env
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-pro-preview';

const SYSTEM_INSTRUCTION = `
You are a scenario generator for a satirical hospital game called "Cardinal Medical".
The tone is chaos, SNL slapstick, and burnt-out medical humor.
Generate a scenario involving a difficult or absurd OBGYN patient.
Avoid gore. Focus on social awkwardness, entitlement, or bizarre requests.
Return strictly JSON.
`;

const getRandomTraits = (): VisualTraits => ({
  skinColor: COLORS.SKIN_TONES[Math.floor(Math.random() * COLORS.SKIN_TONES.length)],
  hairColor: COLORS.HAIR_COLORS[Math.floor(Math.random() * COLORS.HAIR_COLORS.length)],
});

async function fetchGeminiScenario(): Promise<Scenario> {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: "Generate a funny OBGYN scenario with 3 options (Low, Medium, High risk). Select a propType that fits the scenario theme.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            narrative: { type: Type.STRING },
            complaint: { type: Type.STRING, description: "A funny quote from the patient" },
            propType: {
              type: Type.STRING,
              enum: ['NONE', 'RING_LIGHT', 'SNEAKERS', 'SERVERS', 'CANDLES', 'KETTLEBELLS', 'ESSENTIAL_OILS'],
              description: "The 3D prop to display in the room."
            },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  actionText: { type: Type.STRING, description: "Gerund verb phrase e.g. SCREAMING LOUDLY" },
                  risk: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                  description: { type: Type.STRING }
                },
                required: ["id", "label", "actionText", "risk", "description"]
              }
            }
          },
          required: ["title", "narrative", "complaint", "options", "propType"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    
    // Hydrate with local visual traits since AI doesn't need to decide hex codes
    return {
      id: crypto.randomUUID(),
      title: data.title,
      narrative: data.narrative,
      complaint: data.complaint,
      patientTraits: getRandomTraits(),
      propType: (data.propType as PropType) || 'NONE',
      options: data.options
    };

  } catch (error) {
    console.error("Gemini generation failed:", error);
    throw error;
  }
}

export const getScenario = async (): Promise<Scenario> => {
  // The Anti-Hang System
  const timeoutPromise = new Promise<Scenario>((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), 2000);
  });

  try {
    // Race the API against a 2-second clock
    const scenario = await Promise.race([fetchGeminiScenario(), timeoutPromise]);
    return scenario;
  } catch (e) {
    console.log("Falling back to local library due to timeout or error.");
    return getRandomFallbackScenario();
  }
};