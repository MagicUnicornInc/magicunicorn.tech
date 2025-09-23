# Blog Post: One Command to Production: The Docker Compose Symphony

**Series:** From Engine to Enterprise: Building Meeting Ops

---

## The Deployment Nightmare We All Know

Every developer has been there. Your application works perfectly on your machine. The demo goes great. The customer loves it. Then comes the dreaded question: "How do we install this?"

Suddenly you're writing 20-page installation guides. Debugging why PostgreSQL won't start on their specific Linux distribution. Explaining environment variables over lengthy support calls. For AI applications with NPU requirements, it's even worse.

We refused to accept this reality for **Meeting Ops**. Our goal: one command from zero to fully operational. This is how we achieved it.

## The Docker Compose Orchestra

Instead of asking users to install PostgreSQL, Redis, Qdrant, Ollama, and configure them all correctly, we orchestrated everything with Docker Compose:

```yaml
# docker-compose-full-stack.yml
services:
  postgresql:
    image: postgres:16
    environment:
      POSTGRES_DB: meeting_sessions
      POSTGRES_USER: meetingops
      POSTGRES_PASSWORD: meetingops123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U meetingops"]

  redis:
    image: redis:alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]

  qdrant:
    image: qdrant/qdrant
    volumes:
      - qdrant_data:/qdrant/storage

  ollama:
    image: ollama/ollama:rocm
    environment:
      HSA_OVERRIDE_GFX_VERSION: 11.0.3
    devices:
      - /dev/kfd:/dev/kfd
      - /dev/dri:/dev/dri
    volumes:
      - ollama_models:/root/.ollama
    command: serve
```

Each service is configured with:
- **Health checks** to ensure proper startup sequencing
- **Named volumes** for data persistence across restarts
- **Optimized settings** for production workloads
- **Hardware passthrough** for GPU acceleration

## The Magic Launch Script

But Docker Compose alone isn't enough. We needed to handle:
- NPU permissions and setup
- SSL certificate generation
- Model downloading
- Database initialization
- Service startup sequencing

Enter `start-meeting-ops-https.sh`:

```bash
#!/bin/bash

echo "🦄 Starting Meeting Ops Production Deployment..."

# 1. Check NPU availability
if [ ! -e /dev/accel/accel0 ]; then
    echo "⚠️  Warning: NPU not detected. Transcription will use CPU fallback."
else
    echo "✅ NPU detected at /dev/accel/accel0"
    sudo chmod 666 /dev/accel/accel0
fi

# 2. Generate SSL certificates if needed
if [ ! -f frontend/certs/server.crt ]; then
    echo "🔐 Generating Magic Unicorn SSL certificates..."
    cd frontend && ./generate-magic-unicorn-cert.sh && cd ..
fi

# 3. Start Docker services
echo "🐳 Starting Docker services..."
docker compose -f docker-compose-full-stack.yml up -d

# 4. Wait for services to be healthy
echo "⏳ Waiting for services to initialize..."
for service in postgresql redis qdrant ollama; do
    while [ "$(docker compose -f docker-compose-full-stack.yml ps -q $service | xargs docker inspect -f '{{.State.Health.Status}}')" != "healthy" ]; do
        echo "   Waiting for $service..."
        sleep 2
    done
    echo "   ✅ $service is healthy"
done

# 5. Pull Ollama model if needed
echo "🤖 Ensuring Gemma3n model is available..."
docker compose -f docker-compose-full-stack.yml exec ollama ollama pull gemma3n:e4b

# 6. Start backend
echo "🚀 Starting backend on port 9050..."
cd backend
source venv/bin/activate
DATABASE_URL="postgresql://meetingops:meetingops123@localhost:5432/meeting_sessions" \
REDIS_URL="redis://localhost:6379" \
nohup python -m uvicorn main:app --host 0.0.0.0 --port 9050 > ../logs/backend.log 2>&1 &
cd ..

# 7. Serve certificate for download
echo "📜 Starting certificate server on port 8888..."
cd frontend
nohup python3 serve-certificate.py > ../logs/cert-server.log 2>&1 &
cd ..

# 8. Start frontend with HTTPS
echo "🎨 Starting frontend with HTTPS on port 7777..."
cd frontend
npm run build
nohup npx vite preview --host 0.0.0.0 --port 7777 --https \
    --cert certs/server.crt --key certs/server.key > ../logs/frontend.log 2>&1 &
cd ..

echo "
✨ Meeting Ops is now running! ✨

Access points:
- Frontend (HTTPS): https://$(hostname -I | cut -d' ' -f1):7777
- Backend API: http://$(hostname -I | cut -d' ' -f1):9050/docs
- Certificate: http://$(hostname -I | cut -d' ' -f1):8888

Default credentials:
- Username: admin
- Password: admin123

To stop all services: ./stop-meeting-ops.sh
"
```

## The Server-Side Recording Revolution

One of our biggest deployment wins was moving audio recording from the browser to the server. This eliminated an entire class of deployment issues:

### Before (Browser Recording):
- Required HTTPS for microphone access
- Different permissions per browser
- Inconsistent quality across devices
- Complex WebRTC setup

### After (Server-Side Recording):
- USB microphone directly on server
- Consistent 44.1kHz quality
- No browser permissions needed
- Works over HTTP for development

The implementation is elegantly simple:

```python
class DirectUSBAudioMonitor:
    def __init__(self, device="hw:0,0", sample_rate=44100):
        self.process = subprocess.Popen(
            ["arecord", "-D", device, "-f", "cd", "-t", "raw"],
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL
        )

    def get_audio_level(self):
        data = self.process.stdout.read(4096)
        samples = np.frombuffer(data, dtype=np.int16)
        return np.abs(samples).mean() * 100  # Scale for visualization
```

## The Certificate Story

HTTPS is required for production, but managing certificates is painful. Our solution:

1. **Generate a Custom CA**: "Magic Unicorn Unconventional Technology & Stuff Inc."
2. **Create Server Certificates**: Signed by our CA, valid for 1 year
3. **Serve CA Certificate**: Simple HTTP server for users to download and trust
4. **Automatic Trust**: Once installed, all devices trust our certificates

```bash
# Generate CA
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt \
    -subj "/CN=Magic Unicorn Unconventional Technology & Stuff Inc./O=Magic Unicorn Inc."

# Users visit http://YOUR_IP:8888 and follow simple instructions
```

## Production Monitoring and Maintenance

The deployment includes comprehensive monitoring:

```bash
# Check service status
docker compose -f docker-compose-full-stack.yml ps

# View logs
docker compose -f docker-compose-full-stack.yml logs -f

# Monitor NPU usage
watch -n 1 'cat /sys/class/accel/accel0/device/npu_power'

# Database backup
docker compose -f docker-compose-full-stack.yml exec postgresql \
    pg_dump -U meetingops meeting_sessions > backup.sql
```

## The Result: True One-Command Deployment

From a fresh Ubuntu installation to a fully operational Meeting Ops appliance:

```bash
# Clone repository
git clone https://github.com/MagicUnicornInc/Meeting-Ops.git
cd Meeting-Ops

# Run setup (installs Docker, Python, Node.js if needed)
./setup-environment.sh

# Start everything
./start-meeting-ops-https.sh

# Done! The system is running
```

Total time: Under 5 minutes.

## Lessons Learned

1. **Docker Compose is Your Friend**: But only for stateful services. Keep your application code native for easier debugging.

2. **Health Checks are Critical**: Don't just start services; wait for them to be actually ready.

3. **Automate Certificate Management**: Self-signed certificates are fine for appliances if you make them easy to trust.

4. **Server-Side is Simpler**: Moving complexity from the browser to the server simplifies deployment dramatically.

5. **One Script to Rule Them All**: A well-crafted launch script that handles all edge cases is worth its weight in gold.

## Conclusion: Complexity Hidden is Simplicity Delivered

The final `start-meeting-ops-https.sh` script is 100 lines of bash that orchestrates:
- 4 Docker containers
- 2 Node.js processes
- 1 Python backend
- SSL certificate generation
- NPU hardware setup
- Model downloading
- Health monitoring

But to the user, it's just one command. That's the goal: hide the complexity, deliver the simplicity.

When you're building an AI appliance, the deployment experience is as important as the AI itself. A 220x speedup means nothing if users can't get the system running. By investing in deployment automation, we turned Meeting Ops from a complex AI system into a product that truly "just works."

**Ship it once. Run it anywhere. Make it simple.** 🦄🚀