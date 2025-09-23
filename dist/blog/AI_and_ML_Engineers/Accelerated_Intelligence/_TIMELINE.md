# AI & ML Engineering Timeline

This document outlines the key dates and milestones related to the optimization and application of AI models.

- **July 3, 2025:**
  - **Project:** Whisper NPU Project
  - **Milestone:** Initial whisper_npu_project repository created, beginning NPU acceleration research.

- **July 23, 2025:**
  - **Project:** Meeting-Ops
  - **Milestone:** Initial commit for Unicorn Commander Meeting Ops appliance project.

- **July 29-August 3, 2025:**
  - **Project:** Unicorn Amanuensis / Meeting-Ops
  - **Breakthrough:** Complete NPU hardware acceleration implementation achieved. Custom MLIR-AIE2 kernels integrated, achieving **220x speedup** over CPU, real-time factor of **2,985x**, and throughput of **4,789 tokens/second**.
  - **Technical Achievement:** Direct hardware access via IOCTL interface to /dev/accel/accel0, bypassing all vendor dependencies.

- **August 4, 2025:**
  - **Project:** Meeting-Ops Integration
  - **Milestone:** USB M-305 microphone integration complete with direct ALSA access at 44.1kHz.
  - **LLM Integration:** Replaced Ollama with llama.cpp for Vulkan-accelerated inference on iGPU, achieving 30-40% speedup.

- **August 5-6, 2025:**
  - **Project:** Meeting-Ops
  - **Milestone:** Frontend integration complete with role-based dashboard system. PostgreSQL, Redis, and Qdrant integration operational.
  - **Achievement:** 95% feature complete with full NPU acceleration, real-time transcription, and speaker diarization.

- **January 7, 2025:**
  - **Project:** Meeting-Ops Production Release
  - **Milestone:** **100% PRODUCTION READY** - Complete HTTPS support with Magic Unicorn Inc. certificates, server-side recording via USB mic, Gemma3n:e4b LLM integration via Ollama with ROCm.
  - **Infrastructure:** Full Docker stack orchestration, certificate management system, production-grade deployment.

- **July 2025 (Kokoro TTS):**
  - **Project:** Unicorn Orator
  - **Milestone:** Kokoro TTS integration with Intel iGPU via OpenVINO, achieving **3-5x speedup** over CPU with ~150ms latency.