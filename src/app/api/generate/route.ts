import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { businessName, industry, description, audience } = body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const prompt = `
You are an expert social media marketer.

Business Name: ${businessName}

Industry: ${industry}

Description: ${description}

Target Audience: ${audience}

Generate:

1 Instagram post

10 hashtags

5 content ideas

Return ONLY valid JSON in this format:

{
  "post": "",
  "hashtags": [],
  "ideas": []
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    return Response.json({
      success: true,
      data: response.text,
    });
  } catch (error) {
    console.error("BLOOMLY ERROR:", error);

    return Response.json({
      success: false,
      error: String(error),
    });
  }
}