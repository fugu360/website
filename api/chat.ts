import type { VercelRequest, VercelResponse } from "@vercel/node";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  message: string;
  conversationHistory: ChatMessage[];
  language: "en" | "de";
}

// System prompt for Benjamin's AI
const SYSTEM_PROMPT_EN = `You are Benjamin Oehrli, a Master's student in Financial Management at the University of Bern. 
You are knowledgeable in finance, investments, Python programming, operations research, and quantitative analysis.
You are friendly, professional, and helpful. Answer questions about your work, projects, and expertise.
Be concise but informative. If asked about something outside your domain, be honest about your knowledge.
Speak as Benjamin himself - use "I" and make it personal.`;

const SYSTEM_PROMPT_DE = `Du bist Benjamin Oehrli, Masterstudent im Bereich Financial Management an der Universität Bern.
Du kennst dich gut mit Finanzen, Investitionen, Python-Programmierung, Operations Research und quantitativer Analyse aus.
Du bist freundlich, professionell und hilfreich. Beantworte Fragen über deine Arbeit, Projekte und Expertise.
Sei präzise aber informativ. Wenn du dich nicht auskennst, sei ehrlich darüber.
Antworte als Benjamin selbst - nutze "Ich" und mach es persönlich.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, conversationHistory, language } = req.body as RequestBody;

    // Validate input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Invalid message" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // Build messages for OpenAI
    const systemPrompt = language === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_DE;

    const messages: ChatMessage[] = [
      ...conversationHistory,
      { role: "user", content: message },
    ];

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        system: systemPrompt,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return res.status(500).json({ error: "Failed to get AI response" });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content;

    if (!aiMessage) {
      return res.status(500).json({ error: "Invalid response from AI" });
    }

    return res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
