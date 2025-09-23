# Hardware & Systems Timeline

This document outlines the key dates and milestones related to the low-level hardware and systems engineering work on the Unicorn Execution Engine.

- **July 3, 2025:**
  - **Milestone:** Initial NPU research begins with whisper_npu_project.
  - **Details:** Started exploring AMD Phoenix NPU capabilities and MLIR-AIE2 toolchain.

- **July 29-30, 2025:**
  - **Breakthrough:** Custom NPU runtime development begins for Meeting Ops.
  - **Details:** Decision made to bypass vendor tools and create direct IOCTL interface to /dev/accel/accel0.

- **August 1, 2025:**
  - **Critical Discovery:** Linux kernel 6.14 has mainlined `amdxdna` driver for NPU.
  - **Details:** Enables direct hardware access without proprietary drivers, simplifying deployment.

- **August 3, 2025:**
  - **Major Achievement:** Complete custom NPU runtime operational.
  - **Details:** Direct hardware access via IOCTL, custom MLIR-AIE2 kernels compiled to whisperx_npu.bin, achieving **220x speedup** over CPU baseline.
  - **Hardware Specs:** AMD Phoenix NPU (16 TOPS INT8), AIE Version 1.1 confirmed.

- **August 4, 2025:**
  - **Strategic Pivot:** LLM inference strategy changed from NPU to iGPU.
  - **Details:** Memory bandwidth analysis shows iGPU-only approach superior for LLMs. Replaced Ollama with llama.cpp using Vulkan acceleration, achieving 30-40% speedup.

- **August 4, 2025:**
  - **Audio Hardware Integration:** USB M-305 microphone direct integration.
  - **Details:** Server-side recording at 44.1kHz via ALSA, bypassing browser microphone APIs entirely.

- **January 7, 2025:**
  - **Production Validation:** Complete hardware stack in production.
  - **Final Configuration:**
    - NPU: Whisper transcription at 2,985x real-time
    - iGPU: Gemma3n:e4b LLM via Ollama with ROCm (HSA_OVERRIDE_GFX_VERSION=11.0.3)
    - USB: M-305 mic with Texas Instruments PCM2902 chip
    - Memory: 76GB RAM enabling concurrent model execution
