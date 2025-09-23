# Building Your Own Meeting Ops: From Zero to Production in 5 Minutes

**Series:** Unicorn Unleashed: Open Source Guides

---

## The Promise: Enterprise AI on Your Hardware

Imagine having the same AI-powered meeting transcription that Fortune 500 companies pay thousands for, running on your own hardware, completely free. No subscriptions. No cloud APIs. No privacy concerns.

This isn't a dream—it's what we shipped in January 2025. And today, we're showing you exactly how to build it yourself.

## Prerequisites: What You Actually Need

### Hardware Requirements (Minimum)
- **CPU:** Any x86_64 processor (AMD Ryzen recommended)
- **RAM:** 16GB (32GB+ recommended)
- **Storage:** 50GB free space
- **OS:** Ubuntu 22.04+ or any modern Linux

### Hardware Requirements (Optimal)
- **CPU:** AMD Ryzen AI (for NPU acceleration)
- **GPU:** AMD iGPU or any ROCm-compatible GPU
- **RAM:** 64GB+
- **Audio:** USB microphone (any model)

### Software Requirements
- Docker and Docker Compose
- Node.js 18+
- Python 3.11+
- Git

That's it. No proprietary SDKs. No expensive licenses. Just open-source tools.

## Step 1: Clone and Setup (30 seconds)

```bash
# Clone the repository
git clone https://github.com/MagicUnicornInc/Meeting-Ops.git
cd Meeting-Ops

# Check your hardware
./scripts/check_hardware.sh
```

The hardware check will tell you:
- If you have an NPU (great! 220x speedup)
- If you have a compatible GPU (good! 40% LLM speedup)
- If you only have CPU (still works, just slower)

## Step 2: Install Dependencies (2 minutes)

We've automated everything:

```bash
# This installs Docker, Python, Node.js if missing
./setup-environment.sh

# Install Python dependencies
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Step 3: Configure Your Setup (1 minute)

Edit the `.env` file with your preferences:

```bash
# Basic configuration
DATABASE_URL=postgresql://meetingops:meetingops123@localhost:5432/meeting_sessions
REDIS_URL=redis://localhost:6379

# Audio configuration (auto-detected if USB mic present)
AUDIO_DEVICE=hw:0,0
AUDIO_SAMPLE_RATE=44100

# AI Model (smaller models for limited RAM)
OLLAMA_MODEL=gemma2:2b  # 8GB RAM minimum
# OLLAMA_MODEL=gemma3n:e4b  # 16GB RAM recommended
# OLLAMA_MODEL=granite3.1:8b  # 32GB RAM optimal
```

## Step 4: Launch Everything (1 minute)

One command to rule them all:

```bash
./start-meeting-ops-https.sh
```

This single command:
1. Starts PostgreSQL, Redis, Qdrant in Docker
2. Launches Ollama with GPU acceleration (if available)
3. Downloads the AI models (~8GB first time)
4. Generates SSL certificates
5. Starts the backend API
6. Builds and serves the frontend
7. Opens your browser to the login page

## Step 5: Access Your AI Meeting Assistant

After about 60 seconds, you'll see:

```
✨ Meeting Ops is now running! ✨

Access points:
- Frontend: https://192.168.1.100:7777
- API Docs: http://192.168.1.100:9050/docs
- Certificate: http://192.168.1.100:8888

Login: admin / admin123
```

## What You Can Do Now

### 1. Record Meetings with AI Transcription
- Click "Start Recording"
- Speak naturally
- Watch real-time transcription appear
- Get AI-generated summaries

### 2. Search Past Meetings Semantically
- "Find when we discussed the Q3 budget"
- "Show me all action items for John"
- "What decisions were made about the product launch?"

### 3. Export in Any Format
- PDF reports with insights
- TXT transcripts with timestamps
- JSON for integration with other tools
- Audio files for archival

### 4. Integrate with Your Tools
Every feature has an API:

```python
import requests

# Start a recording session
response = requests.post(
    "http://localhost:9050/api/recording-sessions",
    json={"title": "Team Standup"},
    headers={"Authorization": "Bearer YOUR_TOKEN"}
)
session_id = response.json()["id"]

# Get the transcript
transcript = requests.get(
    f"http://localhost:9050/api/recording-sessions/{session_id}"
).json()
```

## Advanced: NPU Acceleration (Optional)

If you have an AMD Phoenix NPU, unlock 220x speedup:

```bash
# Check NPU availability
ls /dev/accel/accel0

# If present, give permissions
sudo usermod -a -G render $USER
sudo chmod 666 /dev/accel/accel0

# Download optimized models
cd backend
./scripts/download_npu_models.sh

# Restart with NPU enabled
NPU_ENABLED=true ./start-meeting-ops-https.sh
```

## Customization Guide

### Change the AI Model

Edit `docker-compose-full-stack.yml`:

```yaml
ollama:
  image: ollama/ollama:rocm
  environment:
    - OLLAMA_MODEL=llama3.3:70b  # For powerful servers
    # - OLLAMA_MODEL=phi4:3.8b    # For edge devices
    # - OLLAMA_MODEL=granite3.1:2b # For minimal resources
```

### Add Your Branding

Replace logos and colors in `frontend/src/assets/`:
- `logo.png` - Your company logo
- `theme.css` - Your brand colors

### Extend the API

Add custom endpoints in `backend/routers/custom.py`:

```python
@router.post("/api/custom/analyze")
async def custom_analysis(session_id: str):
    # Your custom logic here
    return {"insight": "Custom analysis result"}
```

## Deployment Options

### Option 1: Single Machine (Easiest)
What we've shown above. Perfect for small teams.

### Option 2: Kubernetes (Scalable)
```bash
# Use our Kubernetes manifests
kubectl apply -f kubernetes/
```

### Option 3: Raspberry Pi Cluster (Fun!)
```bash
# ARM64 compatible images available
docker compose -f docker-compose-arm64.yml up
```

## Troubleshooting

### "No audio detected"
```bash
# List audio devices
arecord -l

# Test recording
arecord -d 5 test.wav && aplay test.wav
```

### "Transcription is slow"
```bash
# Check if NPU is being used
cat /sys/class/accel/accel0/device/npu_power

# Fall back to smaller model
OLLAMA_MODEL=gemma2:2b ./start-meeting-ops-https.sh
```

### "Out of memory"
```bash
# Use quantized models
OLLAMA_MODEL=gemma3n:e4b  # 4-bit quantized

# Or reduce concurrent features
DISABLE_DIARIZATION=true ./start-meeting-ops-https.sh
```

## The Open Source Stack

Every component is open source:

| Component | License | Purpose |
|-----------|---------|---------|
| FastAPI | MIT | Backend API |
| React | MIT | Frontend UI |
| PostgreSQL | PostgreSQL | Database |
| Redis | BSD | Caching/PubSub |
| Qdrant | Apache 2.0 | Vector Search |
| Ollama | MIT | LLM Inference |
| Whisper | MIT | Transcription |
| Docker | Apache 2.0 | Containerization |

## Performance You Can Achieve

With the complete stack running:

### On CPU-Only Hardware
- Transcription: 10-15x realtime
- LLM Summary: 5-10 seconds
- Search: <100ms

### With GPU Acceleration
- Transcription: 50-100x realtime
- LLM Summary: 2-5 seconds
- Search: <50ms

### With NPU (AMD Phoenix)
- Transcription: 220x realtime (2,985x with optimizations)
- LLM Summary: 1-3 seconds
- Search: <20ms

## Join the Community

This is just the beginning. We're building a community of developers pushing the boundaries of on-device AI:

- **GitHub:** [github.com/MagicUnicornInc/Meeting-Ops](https://github.com/MagicUnicornInc/Meeting-Ops)
- **Discord:** [discord.gg/unicorn-ai](https://discord.gg/unicorn-ai)
- **Documentation:** [docs.meetingops.ai](https://docs.meetingops.ai)

### Ways to Contribute

- Add new AI models
- Create integrations (Slack, Teams, Zoom)
- Improve NPU kernels
- Port to new hardware (Apple Silicon, Intel Arc)
- Translate the UI
- Write documentation

## Conclusion: Your AI, Your Hardware, Your Control

In 5 minutes, you've deployed the same technology that powers enterprise meeting rooms. No subscriptions. No cloud dependencies. No privacy concerns.

This is the power of open source. This is the future we're building together.

Welcome to the revolution. Welcome to Meeting Ops.

**Start building. Start recording. Start owning your AI.** 🦄🚀

---

*P.S. - If you build something cool with Meeting Ops, tell us about it! We feature community projects every month.*