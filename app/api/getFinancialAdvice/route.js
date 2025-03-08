import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    console.log("API Key available:", !!process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const { totalBudget, totalIncome, totalSpend } = await req.json();

    // Initialize Gemini API with the API key
    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error("Gemini API key is not configured");
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const userPrompt = `Provide financial advice based on:
      - Budget: ${totalBudget} USD
      - Expenses: ${totalSpend} USD
      - Income: ${totalIncome} USD
      Give the advice in 2 sentences.`;

    try {
      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      const advice = response.text();
      return NextResponse.json({ advice: advice });
    } catch (genError) {
      console.error("Generation Error:", genError);
      return NextResponse.json(
        { error: "Failed to generate advice", details: genError.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}
