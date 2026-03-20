# AI Assistant RAG Setup für Raspberry Pi

Hier ist die vollständige Anleitung, um dein AI Assistant System mit RAG (Retrieval-Augmented Generation) auf deinem Pi zu hosten.

## **Voraussetzungen**

- Raspberry Pi 4 (4GB+ RAM empfohlen) oder höher
- Ubuntu 22.04 LTS (oder ähnlich)
- Docker installiert
- Node.js 18+
- ~50GB freier Speicherplatz

---

## **Phase 1: Ollama Setup (LLM)**

### 1.1 Ollama installieren

```bash
# Ollama für Linux herunterladen und installieren
curl https://ollama.ai/install.sh | sh

# Service starten
sudo systemctl start ollama
sudo systemctl enable ollama

# Status prüfen
sudo systemctl status ollama
```

### 1.2 Mistral Modell pullen

```bash
# Mistral 7B (schneller & speichersparend)
ollama pull mistral

# Oder Llama 2 (besser, aber langsamer)
# ollama pull llama2

# Lokale API unter http://localhost:11434 verfügbar
```

---

## **Phase 2: Weaviate Setup (Vector Database)**

Weaviate speichert die Embeddings deiner Dokumente für RAG.

### 2.1 Docker Compose installieren

```bash
# Docker Compose v2
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Oder manuell:
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2.2 Weaviate starten

```bash
# docker-compose.yml erstellen
mkdir -p ~/ai-assistant
cd ~/ai-assistant

cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  weaviate:
    image: semitechnologies/weaviate:latest
    container_name: weaviate
    ports:
      - "8080:8080"
      - "50051:50051"
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
    volumes:
      - weaviate_data:/var/lib/weaviate

volumes:
  weaviate_data:
EOF

# Weaviate starten
docker-compose up -d
```

### 2.3 Weaviate prüfen

```bash
# API sollte unter http://localhost:8080/v1/objects verfügbar sein
curl http://localhost:8080/v1/objects
```

---

## **Phase 3: Node.js Backend auf Pi**

### 3.1 RAG Service erstellen

```bash
# Im AI-Verzeichnis
mkdir -p ~/ai-assistant/backend
cd ~/ai-assistant/backend

# Node Projekt initialisieren
npm init -y

# Abhängigkeiten installieren
npm install \
  express \
  cors \
  dotenv \
  axios \
  weaviate-client \
  uuid \
  body-parser \
  helmet \
  rate-limit
```

### 3.2 server.js erstellen

Erstelle `~/ai-assistant/backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { client } = require('weaviate-client');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Weaviate Client
const weaviateClient = client.connectToLocal();

// System Prompt (wird später mit Dokumenten angereichert)
const SYSTEM_PROMPT_EN = `You are Benjamin Oehrli. Answer based on the provided context about Benjamin.
If the context doesn't help, you can use general knowledge but mention it.`;

const SYSTEM_PROMPT_DE = `Du bist Benjamin Oehrli. Antworte basierend auf dem bereitgestellten Kontext über Benjamin.
Falls der Kontext nicht hilft, kannst du allgemeines Wissen nutzen, aber erwähne es.`;

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory, language } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    // 1. Embeddings für User Message mit Ollama erstellen
    const embeddingResponse = await axios.post('http://localhost:11434/api/embed', {
      model: 'mistral',
      input: message,
    });

    const userEmbedding = embeddingResponse.data.embeddings[0];

    // 2. Ähnliche Dokumente aus Weaviate abrufen
    const contextQuery = `
    {
      Get {
        Portfolio(
          limit: 3
          where: {
            path: ["vector"]
            operator: WithinDistance
            valueDistance: 0.5
          }
        ) {
          content
          source
          _additional {
            distance
          }
        }
      }
    }
    `;

    let context = '';
    try {
      const searchResult = await weaviateClient.graphql
        .raw()
        .withQuery(contextQuery)
        .do();

      if (searchResult.data?.Get?.Portfolio) {
        context = searchResult.data.Get.Portfolio
          .map((item: { content: string; source: string }) =>
            `Source: ${item.source}\n${item.content}`
          )
          .join('\n\n');
      }
    } catch (e) {
      console.error('Weaviate search error:', e);
      // Continue without context
    }

    // 3. Ollama für Chat-Antwort verwenden
    const systemPrompt = language === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_DE;

    const promptWithContext = `${systemPrompt}

CONTEXT:
${context || 'No specific context found.'}

USER: ${message}

Answer naturally as Benjamin:`;

    const chatResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: promptWithContext,
      stream: false,
      temperature: 0.7,
    });

    res.json({ message: chatResponse.data.response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Document Upload Endpoint (für dein Portfolio Training)
app.post('/api/upload-document', async (req, res) => {
  try {
    const { content, source } = req.body;

    if (!content || !source) {
      return res.status(400).json({ error: 'Content and source required' });
    }

    // Embedding erstellen
    const embeddingResponse = await axios.post('http://localhost:11434/api/embed', {
      model: 'mistral',
      input: content,
    });

    const embedding = embeddingResponse.data.embeddings[0];

    // In Weaviate speichern
    const result = await weaviateClient.data
      .creator()
      .withClassName('Portfolio')
      .withProperties({
        content,
        source,
        timestamp: new Date().toISOString(),
      })
      .withVector(embedding)
      .do();

    res.json({ id: result.id, message: 'Document uploaded' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

app.listen(PORT, () => {
  console.log(`AI Assistant API listening on port ${PORT}`);
});
```

### 3.3 .env Datei

```bash
# ~/ai-assistant/backend/.env
PORT=3001
OLLAMA_BASE_URL=http://localhost:11434
WEAVIATE_URL=http://localhost:8080
```

### 3.4 Service starten

```bash
# Teste lokal
npm start

# Oder mit systemd (Produktion)
sudo nano /etc/systemd/system/ai-assistant.service
```

Füge ein:

```ini
[Unit]
Description=AI Assistant Backend
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/ai-assistant/backend
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable ai-assistant
sudo systemctl start ai-assistant
```

---

## **Phase 4: Training Data hochladen**

### 4.1 Portfolio Dokumente sammeln

Erstelle Dokumente mit deinen Infos:

```
- CV / Resume
- Projektbeschreibungen (aus src/data/projects.ts)
- Skill-Übersicht
- Erfahrungen
```

### 4.2 Script zum Hochladen

```bash
# create-knowledge-base.js
const axios = require('axios');
const fs = require('fs');

const documents = [
  {
    content: `Benjamin Oehrli is a Master's student in Financial Management at University of Bern.
Skills: Python, R, Finance, Operations Research, Quantitative Analysis`,
    source: 'Biography',
  },
  // Weitere Dokumente...
];

async function uploadDocuments() {
  for (const doc of documents) {
    try {
      const response = await axios.post('http://localhost:3001/api/upload-document', doc);
      console.log(`✓ Uploaded: ${doc.source}`);
    } catch (error) {
      console.error(`✗ Failed: ${doc.source}`, error.message);
    }
  }
}

uploadDocuments();
```

---

## **Phase 5: Nginx Reverse Proxy (Optional)**

```bash
sudo nano /etc/nginx/sites-available/ai-assistant

# Füge ein:
server {
    listen 443 ssl http2;
    server_name your-domain.ch;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location /api/chat {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## **Phase 6: Frontend Anpassung**

Ändere in `AIAssistant.tsx` die API URL:

```typescript
// Bei Self-Hosted Pi:
const response = await fetch(`https://your-domain.ch/api/chat`, {
  // ...
});

// Oder lokal für Tests:
const response = await fetch(`http://localhost:3001/api/chat`, {
  // ...
});
```

---

## **Zusammenfassung des Setups**

```
┌─────────────────────────────────────────────────────────┐
│ DEINE WEBSITE (Vercel oder lokal)                      │
│ ├─ AIAssistant React Component                         │
│ └─ API Call zu /api/chat                               │
└──────────────┬──────────────────────────────────────────┘
               │
        ┌──────▼─────────────────────────────────────┐
        │ RASPBERRY PI (Self-Hosted)                 │
        ├─────────────────────────────────────────── │
        │ Node.js Server (Port 3001)                 │
        │   ├─ Chat Endpoint                         │
        │   └─ Document Upload                       │
        ├─ Ollama (Port 11434) - LLM                │
        │   └─ Mistral 7B Model                     │
        ├─ Weaviate (Port 8080) - Vector DB         │
        │   └─ Portfolio Knowledge Base              │
        └─────────────────────────────────────────── ┘
```

---

## **Testing**

```bash
# Test Ollama
curl http://localhost:11434/api/tags

# Test Weaviate
curl http://localhost:8080/v1/objects

# Test Chat API
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hi","conversationHistory":[],"language":"en"}'
```

---

## **Troubleshooting**

**Ollama lädt nicht?**
```bash
sudo systemctl restart ollama
journalctl -u ollama -f
```

**Weaviate verbindet sich nicht?**
```bash
docker-compose logs -f weaviate
```

**Pi zu langsam?**
- Mistral durch Phi oder Orca reduzieren (`ollama pull phi`)
- Weniger maximale Tokens konfigurieren

---

Fertig! 🚀 Dein AI ist dann vollständig privat, lokal gehostet und kostenlos!
