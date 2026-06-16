import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Fallback logic structure for when key is missing or system limits reached
export async function POST(req: NextRequest) {
  try {
    const { breakdown } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        tips: [
          "Walk, bike or take public transit for short trips.",
          "Switch to LED bulbs and turn off unused appliances.",
          "Incorporate more plant-based meals into your weekly diet."
        ]
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an expert environmental consultant building a Carbon Footprint Awareness Platform. 
A user has submitted their carbon footprint breakdown:
- Transportation: ${breakdown.transportation} kg CO2e
- Home Energy: ${breakdown.energy} kg CO2e
- Diet: ${breakdown.diet} kg CO2e
Total: ${breakdown.total} kg CO2e.

Analyze their specific breakdown and provide exactly 3 practical, highly personalized, and actionable steps they can take to reduce their footprint. Don't use markdown styling if possible. Return the response strictly as a JSON array of 3 string items.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const textPayload = response.text || "[]";
    const tips = JSON.parse(textPayload);

    return NextResponse.json({ tips });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations", tips: ["Reduce driving", "Save energy", "Eat less meat"] },
      { status: 200 } // Send 200 to fail gracefully with fallbacks on demo
    );
  }
}
