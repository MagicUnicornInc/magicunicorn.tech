# Hobbyist & Open Source Timeline

This document outlines a simplified timeline highlighting when key technologies became stable and accessible enough for hobbyists and open-source developers to use.

- **July 3, 2025:**
  - **Event:** Initial whisper_npu_project repository created, beginning open research.
  - **Importance:** Start of community-accessible NPU acceleration research for Whisper models.

- **August 1, 2025:**
  - **Event:** Discovery that Linux kernel 6.14 has mainlined the `amdxdna` NPU driver.
  - **Importance:** NPU becomes accessible without proprietary drivers, democratizing access for hobbyists.

- **August 3, 2025:**
  - **Event:** Custom NPU runtime bypassing vendor tools is completed and documented.
  - **Importance:** Community can now access NPU directly via /dev/accel/accel0 with IOCTL, achieving **220x speedup** without expensive toolchains.

- **August 4, 2025:**
  - **Event:** Complete switch to open-source components (llama.cpp, Vulkan).
  - **Importance:** Entire stack uses open-source tools, making replication accessible to hobbyists.

- **August 5-6, 2025:**
  - **Event:** **Meeting Ops** reaches 95% completion with full API documentation.
  - **Importance:** REST and WebSocket APIs stable for community integrations, PostgreSQL/Redis stack documented.

- **January 7, 2025:**
  - **Event:** **100% Production Release** with one-command deployment.
  - **Importance:** Complete Docker Compose stack with `./start-meeting-ops-https.sh` makes deployment trivial for hobbyists.
  - **Open Source Stack:**
    - PostgreSQL (database)
    - Redis (caching/pubsub)
    - Qdrant (vector search)
    - Ollama with ROCm (LLM inference)
    - React + FastAPI (web stack)
    - All configuration in simple YAML files