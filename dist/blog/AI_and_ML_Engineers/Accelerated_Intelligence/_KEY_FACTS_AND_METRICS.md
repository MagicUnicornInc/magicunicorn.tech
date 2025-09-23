# Key AI & ML Facts & Metrics

This document contains the essential quantitative data about model performance, speedups, and efficiency.

### Unicorn Amanuensis (Whisper Transcription)
- **Core Model:** Whisper Large-v3, INT8 Quantized
- **Hardware:** AMD Phoenix NPU
- **Performance vs. CPU:**
  - **Speedup:** 220x
  - **Processing Time (8.7 min audio):** 0.175 seconds (vs. 38.49s on CPU)
  - **Real-Time Factor (RTF):** 2,985x (vs. 13.6x on CPU)
  - **Tokens per Second:** 4,789 (vs. 22 on CPU)
- **Power Efficiency vs. CPU:** 1,658x more efficient (2W vs. 25W).
- **Accuracy:** >96% (less than 1% degradation from original FP32 model).
- **Features:** Word-level timestamps and speaker diarization (up to 4 speakers).

### Unicorn Orator (Kokoro TTS)
- **Core Model:** Kokoro TTS
- **Hardware:** Intel iGPU (via OpenVINO)
- **Performance vs. CPU:**
  - **Speedup:** 3-5x
  - **Latency:** ~150ms (vs. 450ms on CPU)
- **Power Efficiency:** Runs within a 15W power envelope (vs. 35W on CPU).
- **Features:** Supports a library of 50+ professional voices.

### Unicorn Execution Engine (LLM Inference)
- **Core Models:** Gemma family (2B, 3n, 9B, 27B)
- **Hardware:** AMD Radeon 780M iGPU
- **Performance vs. CPU:**
  - **Speedup:** 25-40%
  - **Example (Gemma 2B):** 39.4 TPS on iGPU (vs. 28.5 TPS on CPU).
  - **Example (Gemma 3n):** 13.6 TPS on iGPU (vs. 10.3 TPS on CPU).
- **Key Insight:** For LLMs on this hardware, iGPU-only is superior to a hybrid NPU+iGPU approach due to memory bandwidth limitations.

### Meeting Ops Production System (Complete Appliance)
- **NPU Performance:** 220x faster transcription, 2,985x real-time factor
- **Audio Capture:** USB M-305 mic at 44.1kHz (server-side)
- **LLM Performance:** Gemma3n:e4b via Ollama+ROCm, 0.7-4s response time
- **System Specs:** AMD Ryzen AI (16 cores), 76GB RAM, 1.8TB storage
- **Infrastructure:** PostgreSQL, Redis, Qdrant, Docker Compose
- **Production Status:** 100% complete as of January 7, 2025
- **End-to-End Latency:** <100ms for live transcription
- **Power Consumption:** NPU: 2W, iGPU: 15W (during inference)