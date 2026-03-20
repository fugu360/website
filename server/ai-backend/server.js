const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "phi";
const MAX_CONTEXT_MESSAGES = Number(process.env.MAX_CONTEXT_MESSAGES || 3);
const MAX_RESPONSE_TOKENS = Number(process.env.MAX_RESPONSE_TOKENS || 140);
const OLLAMA_TEMPERATURE = Number(process.env.OLLAMA_TEMPERATURE || 0.3);
const OLLAMA_NUM_CTX = Number(process.env.OLLAMA_NUM_CTX || 1024);
const OLLAMA_TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS || 30000);
const OLLAMA_HEALTH_TTL_MS = Number(process.env.OLLAMA_HEALTH_TTL_MS || 15000);
const KNOWLEDGE_TOP_K = Number(process.env.KNOWLEDGE_TOP_K || 5);
const KNOWLEDGE_MAX_CHARS_PER_SNIPPET = Number(process.env.KNOWLEDGE_MAX_CHARS_PER_SNIPPET || 500);

let lastOllamaHealthCheckAt = 0;
let lastOllamaHealthOk = false;
let knowledgeIndex = [];

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
const KNOWLEDGE_FILES = [
  "README.md",
  "src/data/projects.ts",
  "src/components/AboutSection.tsx",
  "src/components/HeroSection.tsx",
  "src/components/ProjectsSection.tsx",
  "src/components/ExperienceSection.tsx",
  "src/components/EducationSection.tsx",
  "src/components/SkillsSection.tsx",
  "src/components/ItSkillsSection.tsx",
  "src/components/ContactSection.tsx",
  "src/components/Footer.tsx",
];

// Middleware
// Apache reverse proxy forwards X-Forwarded-For. Trust one proxy hop.
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// System Prompts für Benjamin
const SYSTEM_PROMPT_EN = `You are Benjamin Oehrli, a Master's student in Financial Management at the University of Bern.
Keep answers concise (2-6 sentences). Respond as Benjamin in first person and focus on practical value.`;

const SYSTEM_PROMPT_DE = `Du bist Benjamin Oehrli, Masterstudent im Bereich Financial Management an der Universität Bern.
Antworte kurz und klar (2-6 Saetze), in Ich-Form, mit direktem Praxisnutzen.`;

const normalizeText = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9äöüß\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (text) => {
  const normalized = normalizeText(text);
  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .filter((token) => token.length >= 3)
    .slice(0, 40);
};

const cleanSourceText = (raw) =>
  raw
    .replace(/import\s+[^;]+;/g, "")
    .replace(/export\s+default\s+[a-zA-Z0-9_]+;?/g, "")
    .replace(/className=\"[^\"]*\"/g, "")
    .replace(/[{}()[\],;]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const createChunks = (filePath, content, chunkSize = 1000) => {
  const cleaned = cleanSourceText(content);
  const chunks = [];

  let start = 0;
  while (start < cleaned.length) {
    const end = Math.min(start + chunkSize, cleaned.length);
    const text = cleaned.slice(start, end).trim();

    if (text.length > 120) {
      chunks.push({
        source: filePath,
        text,
        tokens: new Set(tokenize(text)),
      });
    }

    start = end;
  }

  return chunks;
};

const buildKnowledgeIndex = () => {
  const nextIndex = [];

  for (const relativePath of KNOWLEDGE_FILES) {
    const absolutePath = path.join(PROJECT_ROOT, relativePath);
    if (!fs.existsSync(absolutePath)) {
      continue;
    }

    try {
      const content = fs.readFileSync(absolutePath, "utf8");
      const chunks = createChunks(relativePath, content);
      nextIndex.push(...chunks);
    } catch (error) {
      console.warn(`Failed to index ${relativePath}:`, error.message);
    }
  }

  knowledgeIndex = nextIndex;
  console.log(`📚 Indexed ${knowledgeIndex.length} knowledge chunks from website files`);
};

const getRelevantKnowledge = (query) => {
  if (!knowledgeIndex.length) {
    return [];
  }

  const queryTokens = tokenize(query);
  if (!queryTokens.length) {
    return [];
  }

  const scored = knowledgeIndex
    .map((chunk) => {
      let score = 0;
      for (const token of queryTokens) {
        if (chunk.tokens.has(token)) {
          score += 1;
        }
      }

      if (score === 0) {
        return null;
      }

      return {
        source: chunk.source,
        text: chunk.text.slice(0, KNOWLEDGE_MAX_CHARS_PER_SNIPPET),
        score,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, KNOWLEDGE_TOP_K);

  return scored;
};

const ensureOllamaAvailable = async () => {
  const now = Date.now();
  if (now - lastOllamaHealthCheckAt < OLLAMA_HEALTH_TTL_MS) {
    if (!lastOllamaHealthOk) {
      throw new Error("Ollama unavailable");
    }
    return;
  }

  try {
    await axios.get(`${OLLAMA_BASE_URL}/api/tags`, { timeout: 3000 });
    lastOllamaHealthOk = true;
  } catch {
    lastOllamaHealthOk = false;
    throw new Error("Ollama unavailable");
  } finally {
    lastOllamaHealthCheckAt = now;
  }
};

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "AI Assistant Backend is running" });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  let relevantKnowledge = [];

  try {
    const { message, conversationHistory = [], language = "en" } = req.body;

    // Validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "Invalid message" });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long (max 2000 chars)" });
    }

    try {
      await ensureOllamaAvailable();
    } catch {
      console.error("Ollama is not available");
      return res.status(503).json({
        error: "AI service not available. Is Ollama running? (http://localhost:11434)",
      });
    }

    const systemPrompt = language === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_DE;
    relevantKnowledge = getRelevantKnowledge(message);

    // Build conversation for context
    let conversationText = "";
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationText = conversationHistory
        .slice(-MAX_CONTEXT_MESSAGES)
        .map((msg) => `${msg.role === "user" ? "User" : "Benjamin"}: ${msg.content}`)
        .join("\n");
    }

    // Build final prompt
    let finalPrompt = systemPrompt + "\n\n";

    if (conversationText) {
      finalPrompt += "Recent conversation:\n" + conversationText + "\n\n";
    }

    if (relevantKnowledge.length > 0) {
      finalPrompt += "Website context (source-grounded facts):\n";
      for (const item of relevantKnowledge) {
        finalPrompt += `- Source: ${item.source}\n  ${item.text}\n`;
      }
      finalPrompt += "\nUse this context as primary source. If context is insufficient, say so explicitly.\n\n";
    }

    finalPrompt += `User: ${message}\n\nBenjamin:`;

    console.log(`[${new Date().toISOString()}] Processing message: "${message.substring(0, 50)}..."`);

    // Call Ollama (using default model)
    const ollamaResponse = await axios.post(
      `${OLLAMA_BASE_URL}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt: finalPrompt,
        stream: false,
        keep_alive: "20m",
        options: {
          temperature: OLLAMA_TEMPERATURE,
          num_predict: MAX_RESPONSE_TOKENS,
          num_ctx: OLLAMA_NUM_CTX,
        },
      },
      {
        timeout: OLLAMA_TIMEOUT_MS,
      }
    );

    const aiMessage = ollamaResponse.data.response?.trim();

    if (!aiMessage) {
      return res.status(500).json({ error: "Empty response from AI model" });
    }

    res.json({
      message: aiMessage,
      model: OLLAMA_MODEL,
    });
  } catch (error) {
    console.error("Chat error:", error.message);

    if (error.code === "ECONNABORTED") {
      if (relevantKnowledge.length > 0) {
        const compactFacts = relevantKnowledge
          .slice(0, 2)
          .map((item) => `${item.source}: ${item.text}`)
          .join("\n\n");

        return res.status(200).json({
          message:
            "Die Antwort vom Modell dauert aktuell zu lange. Hier sind direkt passende Informationen aus den Website-Dateien:\n\n" +
            compactFacts,
          model: OLLAMA_MODEL,
          fallback: true,
        });
      }

      return res.status(504).json({
        error: "AI timeout - please retry with a shorter question",
      });
    }

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
      activeModel: OLLAMA_MODEL,
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
  buildKnowledgeIndex();

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║     Benjamin's AI Assistant Backend                    ║");
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log("");
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Ollama backend: ${OLLAMA_BASE_URL}`);
  console.log(`🤖 Model: ${OLLAMA_MODEL}`);
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
