# Blog Post: Finding Free Performance: How We Got a 5x TTS Speedup from an Idle GPU

**Series:** Accelerated Intelligence: Optimizing Models for the Edge

---

## The Untapped Potential in Every Laptop

Every modern Intel-based laptop has a hidden, underutilized powerhouse: its integrated GPU (iGPU). While developers and users obsess over CPU cores and clock speeds, the iGPU often sits dormant, waiting for a game to be launched. For the **Unicorn Orator** project, we asked a simple question: what if we could use that dormant power for AI?

This is the story of how we used Intel's OpenVINO toolkit to offload our Kokoro TTS engine to the iGPU, resulting in a **3-5x performance boost** and a massive increase in power efficiency—all from hardware that was already there.

## The Problem: CPU-Bound TTS is a Battery Hog

Kokoro is a fantastic Text-to-Speech model, capable of producing expressive, professional voices. But running it on the CPU is a compromise. It's slow enough to introduce noticeable latency in interactive applications, and it's a battery hog. A 35W CPU running at full tilt will drain a laptop battery in no time.

We knew that for **Unicorn Orator** to be viable in mobile and edge applications, we had to find a more efficient solution.

## The Solution: OpenVINO and the iGPU

Instead of trying to optimize the CPU code further, we looked at the system holistically. The iGPU was our target.

Our **Unicorn Execution Engine** was designed to be multi-platform, so we added an OpenVINO execution provider. The workflow was surprisingly straightforward:

1.  **Model Conversion:** We took the standard Kokoro TTS ONNX model.
2.  **Engine Initialization:** When initializing the Orator engine, we specified the target device as `"igpu"`.
3.  **Automatic Optimization:** Behind the scenes, OpenVINO took over. It analyzed the model and compiled it into an intermediate representation optimized specifically for the architecture of the target iGPU (e.g., Intel Iris Xe).
4.  **Inference Offload:** From that point on, every time we called `orator.synthesize()`, the actual computation happened on the GPU, leaving the CPU free for other tasks.

## The Results: Faster, Cooler, Longer-Lasting

The difference was immediate and dramatic.

- **Performance:** Latency dropped from ~450ms on the CPU to **~150ms on the iGPU**—a 3x improvement that made the voice feel instantly responsive.
- **Power Efficiency:** The total power draw for the task dropped from 35W to just **15W**. For a laptop user, this translates directly to hours of additional battery life.
- **Zero-Copy Advantage:** Because the iGPU shares system memory with the CPU, we could use zero-copy techniques. The CPU prepares the input text, and the iGPU can access it directly without any time-wasting memory transfers.

## Conclusion: Look for the Idle Hardware

This project was a powerful lesson in resourcefulness. The biggest performance gains often come not from brute force, but from using the resources you already have more intelligently. Millions of devices have a capable AI accelerator sitting right next to the CPU, completely unused.

By leveraging it, **Unicorn Orator** can deliver a premium, low-latency voice experience on everyday hardware, opening the door for the next generation of interactive, voice-enabled applications.