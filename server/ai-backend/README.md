# Benjamin's AI Assistant Backend

Lokales Node.js + Ollama Backend für kostenlosen AI Chat auf dem Raspberry Pi.

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start server
npm start
```

Server läuft dann unter `http://localhost:3001`

## Endpoints

### POST /api/chat
Chat mit dem Benjamin AI.

**Request:**
```json
{
  "message": "Hallo, wer bist du?",
  "conversationHistory": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello!" }
  ],
  "language": "de"
}
```

**Response:**
```json
{
  "message": "Ich bin Benjamin Oehrli...",
  "model": "mistral"
}
```

### GET /api/status
System Status & verfügbare Models.

```bash
curl http://localhost:3001/api/status
```

### GET /health
Health Check.

## Environment Variables

```
PORT=3001
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral
NODE_ENV=production
```

## Production Setup

### Systemd Service

```bash
sudo cp ai-assistant.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable ai-assistant
sudo systemctl start ai-assistant
```

### Nginx Reverse Proxy

```nginx
location /api/chat {
    proxy_pass http://localhost:3001;
    proxy_read_timeout 120s;
}
```

## Troubleshooting

**"Cannot connect to Ollama"**
- Ist Ollama am Laufen? `systemctl status ollama`
- Läuft auf http://localhost:11434?
- Model vorhanden? `ollama pull mistral`

**"Message too long"**
- Max 2000 charaktere pro Message

**Timeout bei Response**
- Kleineres Modell benutzen: `ollama pull phi`
- GPU aktivieren für schnere Performance

## Performance

| Model  | Größe  | Speed  | Quality |
|--------|--------|--------|---------|
| phi    | 1.4GB  | ⚡⚡⚡ | ⭐⭐    |
| mistral| 4GB    | ⚡⚡   | ⭐⭐⭐  |
| llama2 | 7GB    | ⚡    | ⭐⭐⭐⭐ |

## License

MIT
