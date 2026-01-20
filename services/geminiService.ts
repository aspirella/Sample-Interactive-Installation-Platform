
import { GoogleGenAI, Type } from "@google/genai";
import { Step } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async troubleshoot(query: string, currentStep: Step | null): Promise<string> {
    const context = currentStep 
      ? `The user is currently on step: "${currentStep.title}". Description: ${currentStep.fullDesc}. Expected tools: ${currentStep.tools.join(', ')}.` 
      : "The user is browsing the installation guide.";

    const prompt = `
      You are an expert technical assistant for a complex hardware installation guide.
      Context: ${context}
      User Question: "${query}"
      
      Provide a concise, helpful, and safety-first response. Use bullet points if necessary.
      If you don't know the specific answer, suggest checking the connections or contacting support.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while reaching the AI assistant. Please try again later.";
    }
  }

  async searchSteps(query: string, allSteps: Step[]): Promise<string[]> {
    const prompt = `
      Given this list of installation steps: ${JSON.stringify(allSteps.map(s => ({id: s.id, title: s.title, desc: s.shortDesc})))}
      The user is searching for: "${query}"
      Identify the most relevant step IDs. Return only a JSON array of step IDs.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      return [];
    }
  }
}
