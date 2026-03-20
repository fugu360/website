# 🚀 Benjamin's AI Assistant - Rapid Pi Setup (0€)

**Ziel:** In 20 Minuten dein AI System auf dem Pi am Laufen haben.

---

## **Schritt 1: Pi SSH Access**

```bash
# Von deinem Computer aus
ssh pi@<pi-ip-address>
# oder wenn du auf dem Pi bist, skip this

# Pi IP finden:
# - Router Admin Panel
# - oder: hostname -I
```

---

## **Schritt 2: Ollama installieren (5 Min)**

```bash
# Ollama Download & Install
curl https://ollama.ai/install.sh | sh

# Starte den Ollama Service
systemctl start ollama
systemctl enable ollama

# Prüfe, ob es läuft
curl http://localhost:11434/api/tags
# ✓ Sollte `{"models":[]}` zurückgeben
```

---

## **Schritt 3: Mistral Model laden**

```bash
# Model herunterladen (ca. 4GB, ~10 Min)
ollama pull mistral

# Oder kleineres Modell (Falls Pi zu langsam):
ollama pull phi  # nur 1.4GB, super schnell

# Modelle prüfen
curl http://localhost:11434/api/tags
# ✓ Sollte dein Modell in der Liste zeigen
```

---

## **Schritt 4: Node.js Backend deployen**

```bash
# Gehe zum Backend Verzeichnis
cd ~/Lovable\ 2/server/ai-backend

# Dependencies installieren
npm install

# .env Datei erstellen
cp .env.example .env

# Inhalt prüfen/anpassen:
# nano .env
# PORT=3001
# OLLAMA_BASE_URL=http://localhost:11434
# OLLAMA_MODEL=mistral
```

---

## **Schritt 5: Backend starten**

```bash
# Lokaler Test
npm start

# ✓ Du solltest sehen:
# 🚀 Server running on http://localhost:3001
```

---

## **Schritt 6: Test der API**

```bash
# In neuem Terminal
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hi, wer bin ich?",
    "language": "de"
  }'

# ✓ Sollte eine Antwort von Benjamin zurückgeben
```

---

## **Schritt 7: Als Systemd Service einrichten (Produktion)**

```bash
# Service Datei erstellen
sudo nano /etc/systemd/system/ai-assistant.service
```

Füge das ein:

```ini
[Unit]
Description=Benjamin's AI Assistant Backend
After=network.target ollama.service
Wants=ollama.service

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/Lovable 2/server/ai-backend
Environment="PATH=/usr/local/bin:/usr/bin:/bin"
Environment="NODE_ENV=production"
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```bash
# Service aktivieren
sudo systemctl daemon-reload
sudo systemctl enable ai-assistant
sudo systemctl start ai-assistant

# Status prüfen
sudo systemctl status ai-assistant

# Logs anschauen
sudo journalctl -u ai-assistant -f
```

---

## **Schritt 8: Nginx Reverse Proxy (Optional aber empfohlen)**

Falls du es über HTTPS/Domain erreichbar machen willst:

```bash
# Nginx konfigurieren
sudo nano /etc/nginx/sites-available/benjamin-ai
```

```nginx
upstream ai_backend {
    server localhost:3001;
}

server {
    listen 443 ssl http2;
    server_name your-domain.ch;

    ssl_certificate /path/to/fullchain.pem;    # Let's Encrypt
    ssl_certificate_key /path/to/privkey.pem;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location /api/chat {
        proxy_pass http://ai_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
        proxy_connect_timeout 120s;
    }

    location /api/status {
        proxy_pass http://ai_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location /health {
        proxy_pass http://ai_backend;
        access_log off;
    }
}

server {
    listen 80;
    server_name your-domain.ch;
    return 301 https://$server_name$request_uri;
}
```

```bash
# Aktivieren
sudo ln -s /etc/nginx/sites-available/benjamin-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## **Schritt 9: Website Frontend konfigurieren**

In deinem Vite Projekt:

```bash
# .env.local (lokal für Tests)
VITE_AI_API_URL=http://localhost:3001

# .env.production (für Live)
VITE_AI_API_URL=https://your-domain.ch
```

Oder direkt in `AIAssistant.tsx`:

```typescript
const apiUrl = import.meta.env.VITE_AI_API_URL || 'http://localhost:3001';
```

---

## **Schritt 10: Testen**

```bash
# 1. Prüfe Ollama Gesundheit
curl http://localhost:11434/api/tags

# 2. Prüfe Backend Status
curl http://localhost:3001/api/status

# 3. Test Chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hallo","language":"de"}'

# 4. Öffne Website im Browser
# Klick auf AI Button unten rechts
# ✓ Chat sollte funktionieren
```

---

## **Performance Tuning**

Falls der Pi langsam ist:

```bash
# 1. Kleineres Modell nutzen
ollama pull phi
# Dann in .env: OLLAMA_MODEL=phi

# 2. System Upgrade
sudo apt update && sudo apt upgrade -y
sudo rpi-update  # Optional: Kernel Update

# 3. Swap erhöhen
sudo dphys-swapfile swapoff
sudo nano /etc/dphys-swapfile
# CONF_SWAPSIZE=2048  (statt default 100)
sudo dphys-swapfile setup
sudo dphys-swapfile swapon
```

---

## **Troubleshooting**

### "Ollama not available"

```bash
# Prüfe ob Ollama läuft
systemctl status ollama

# Starte neu falls nötig
sudo systemctl restart ollama

# Schau ins Log
sudo journalctl -u ollama -f
```

### "Model not found"

```bash
# Modelle auflisten
curl http://localhost:11434/api/tags

# Falls leer: Model laden
ollama pull mistral
```

### "Pi antwortet zu langsam"

```bash
# Nutze schnelleres Modell
ollama pull phi
# Setze in .env: OLLAMA_MODEL=phi

# Oder nutze Quantisierte Version
ollama pull mistral:q4_0  # 4-bit quantized
```

### "Nginx zeigt 502 Bad Gateway"

```bash
# Prüfe ob Backend läuft
curl http://localhost:3001/api/status

# Starte Service neu
sudo systemctl restart ai-assistant

# Schau ins Log
sudo journalctl -u ai-assistant -f
```

---

## **Monitoring**

```bash
# Laufende Services prüfen
sudo systemctl status ollama
sudo systemctl status ai-assistant
sudo systemctl status nginx

# System Ressourcen
top
free -h
df -h

# Logs folgen
sudo journalctl -u ai-assistant -f --lines=50
```

---

## **Fertig! 🎉**

Dein AI System läuft jetzt:

```
Browser → Website → AIAssistant.tsx 
  ↓
http://localhost:3001/api/chat (lokal)
oder https://your-domain.ch/api/chat (live)
  ↓
Node.js Express Server (auf Pi)
  ↓
Ollama (http://localhost:11434)
  ↓
Mistral/Phi LLM Model
```

**Kostenlos ✓**
**Privat ✓**
**Lokal gehostet ✓**

---

## **Nächste Schritte**

1. **RAG hinzufügen** (Doku uploaden):
   - Weaviate Docker aufsetzen
   - Knowledge Base trainieren
   - Siehe: PI_AI_SETUP.md für Details

2. **Push Notifications** (Optional):
   - Firebase Cloud Messaging
   - Benachrichtigungen auf iPhone

3. **Admin Dashboard** (Optional):
   - `/admin` Seite zum Überblick
   - Message History sehen
   - Model-Einstellungen ändern

---

💡 **Fragen?** Check die Logs: `sudo journalctl -u ai-assistant -f`
