const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// System Prompts für Benjamin
const SYSTEM_PROMPT_EN = `You are Benjamin Oehrli, a Master's student in Financial Management at the University of Bern.
You are knowledgeable in:
- Finance and Investments
- Python and R Programming
- Operations Research and Quantitative Analysis
- Portfolio Management
- Risk Analysis

You are friendly, professional, and helpful. Answer questions about your work, projects, and expertise.
Be concise but informative. If asked about something outside your domain, be honest about your knowledge.
Always respond as Benjamin himself - use "I" and make it personal. Keep responses under 500 words.`;

const SYSTEM_PROMPT_DE = `Du bist Benjamin Oehrli, Masterstudent im Bereich Financial Management an der Universität Bern.
Du kennst dich gut aus mit:
- Finanzen und Investitionen
- Python und R Programmierung
- Operations Research und quantitativer Analyse
- Portfolio Management
- Risikoanalyse

Du bist freundlich, professionell und hilfreich. Beantworte Fragen über deine Arbeit, Projekte und Expertise.
Sei präzise aber informativ. Wenn du dich nicht auskennst, sei ehrlich darüber.
Antworte immer als Benjamin selbst - nutze "Ich" und mach es persönlich. Halte Antworten unter 500 Wörtern.`;

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "AI Assistant Backend is running" });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [], language = "en" } = req.body;

    // Validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Invalid message" });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long (max 2000 chars)" });
    }

    // Check if Ollama is available
    try {
      await axios.get(`${OLLAMA_BASE_URL}/api/tags`, { timeout: 5000 });
    } catch (error) {
      console.error("Ollama is not available:", error.message);
      return res.status(503).json({
        error: "AI service not available. Is Ollama running? (http://localhost:11434)",
      });
    }

    const systemPrompt = language === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_DE;

    // Build conversation for context
    let conversationText = "";
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationText = conversationHistory
        .slice(-6) // Keep last 6 messages for context
        .map((msg) => `${msg.role === "user" ? "User" : "Benjamin"}: ${msg.content}`)
        .join("\n");
    }

    // Build final prompt
    let finalPrompt = systemPrompt + "\n\n";

    if (conversationText) {
      finalPrompt += "Recent conversation:\n" + conversationText + "\n\n";
    }

    finalPrompt += `User: ${message}\n\nBenjamin:`;

    console.log(`[${new Date().toISOString()}] Processing message: "${message.substring(0, 50)}..."`);

    // Call Ollama (using default model)
    const ollamaResponse = await axios.post(
      `${OLLAMA_BASE_URL}/api/generate`,
      {
        model: process.env.OLLAMA_MODEL || "mistral",
        prompt: finalPrompt,
        stream: false,
        temperature: 0.7,
      },
      {
        timeout: 60000, // 60 second timeout for LLM response
      }
    );

    const aiMessage = ollamaResponse.data.response?.trim();

    if (!aiMessage) {
      return res.status(500).json({ error: "Empty response from AI model" });
    }

    res.json({
      message: aiMessage,
      model: process.env.OLLAMA_MODEL || "mistral",
    });
  } catch (error) {
    console.error("Chat error:", error.message);

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        error: "Cannot connect to Ollama. Make sure it's running on http://localhost:11434",
      });
    }

    if (error.code === "ENOTFOUND") {
      return res.status(503).json({
        error: "Cannot resolve Ollama host. Check OLLAMA_BASE_URL environment variable.",
      });
    }

    res.status(500).json({
      error: "Failed to process message",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get status
app.get("/api/status", async (req, res) => {
  try {
    const tagsResponse = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, { timeout: 5000 });
    const models = tagsResponse.data?.models || [];

    res.json({
      status: "online",
      ollama: {
        url: OLLAMA_BASE_URL,
        models: models.map((m) => m.name),
        available: models.length > 0,
      },
      activeModel: process.env.OLLAMA_MODEL || "mistral",
    });
  } catch (error) {
    res.status(503).json({
      status: "offline",
      error: "Ollama not available",
      details: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
app.listen(PORT, () => {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║     Benjamin's AI Assistant Backend                    ║");
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log("");
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Ollama backend: ${OLLAMA_BASE_URL}`);
  console.log(`🤖 Model: ${process.env.OLLAMA_MODEL || "mistral"}`);
  console.log("");
  console.log("Available endpoints:");
  console.log(`  POST   /api/chat      - Chat with Benjamin`);
  console.log(`  GET    /api/status    - Check system status`);
  console.log(`  GET    /health        - Health check`);
  console.log("");
  console.log("Test the API:");
  console.log(
    `  curl -X POST http://localhost:${PORT}/api/chat -H "Content-Type: application/json" -d '{"message":"Hi"}'`
  );
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  process.exit(0);
});
