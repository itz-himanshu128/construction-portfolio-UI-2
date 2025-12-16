import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateProjectBrief = async (
  projectType: string,
  location: string,
  scale: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Error: API Key is missing. Please check your configuration.";

  try {
    const prompt = `
      You are a senior project director at Vanguard Infrastructure, a top-tier global construction firm.
      Write a preliminary internal risk and opportunity assessment (approx 150 words) for a potential new project.
      
      Project Type: ${projectType}
      Location: ${location}
      Scale/Budget: ${scale}
      
      Tone: Professional, authoritative, data-driven, cautious but visionary. 
      Structure:
      1. Executive Summary
      2. Key Engineering Risks
      3. Strategic Value
      
      Do not use markdown formatting like bolding or headers, just plain text with line breaks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Error: Unable to generate brief at this time. Please try again later.";
  }
};