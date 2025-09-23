# Blog Post: The Memory Wall is Real: Our APU's Counter-Intuitive Bottleneck

**Series:** Forging the Silicon: A Deep Dive into the Unicorn Execution Engine

---

## The Anomaly: When 1 + 1 Made 0.9

In the world of high-performance computing, there's a simple, seductive logic: more processors equals more power. So when we first architected the **Unicorn Execution Engine** on the AMD Phoenix APU, the path seemed obvious. We had a powerful Radeon 780M iGPU for parallel compute and a specialized 16 TOPS NPU for AI tasks. The plan was simple: split the work, run them in parallel, and reap the rewards. A classic divide-and-conquer strategy.

So we did it. We assigned the massive FFN (Feed-Forward Network) layers of our LLM to the iGPU's shaders and the specialized attention computations to the NPU's AI Engines. We ran the benchmarks, and the results made no sense.

The hybrid NPU+iGPU pipeline was *slower* than running everything on the iGPU alone.

It was a baffling result that defied conventional wisdom. Both processors were firing, `radeontop` and `xrt-smi` showed activity, yet the final tokens-per-second number had dropped. We had added a second engine to our car, and it had somehow made it slower. This wasn't a bug in our code; it was a flaw in our understanding of the machine itself.

## The Hunt for the Real Bottleneck

Our investigation turned from code profiling to system-level analysis. The compute units weren't waiting; they were working hard. The problem had to be the step in between: the data.

That's when we found it. The smoking gun. We used low-level system monitors to track the data moving across the system's memory bus. The results were stark: the combined demand from the CPU, iGPU, and NPU was completely saturating the **87.5 GB/s bandwidth** of the shared DDR5 memory. 

They were, quite simply, starving each other.

## The APU's Double-Edged Sword: Unified Memory

AMD's unified memory architecture is a modern marvel. It allows the CPU, iGPU, and NPU to access the same pool of RAM, eliminating the slow, power-hungry data transfers across a PCIe bus that are necessary with a discrete GPU. It’s a huge advantage for efficiency.

But we had discovered its Achilles' heel. That shared bus is a single, finite resource. Think of it as a single, very wide conveyor belt feeding three incredibly fast machines. Our iGPU, when running the massive matrix multiplications of an LLM, was already fast enough to consume most of that conveyor belt's capacity. 

When the NPU fired up and also demanded its own stream of data from the *same belt*, neither machine got what it needed. They both sputtered, waiting for their next meal. The overhead of coordinating and scheduling between two starved processors was greater than the benefit of their parallel work.

## The Strategic Pivot: Workload-Aware Hardware Assignment

This discovery forced a fundamental shift in our strategy. The question was no longer "How do we use all the processors?" but "Which processor is right for which workload?"

- **For LLMs (Memory-Bandwidth Bound):** The workload is dominated by huge matrix operations that are limited by how fast you can feed them data. The iGPU is a fantastic general-purpose engine that can use the entire memory bus effectively. **Conclusion: Use the iGPU only.**

- **For Specialized Kernels (Compute-Bound):** The workload for **Unicorn Amanuensis** (Whisper) was different. Its core operations were smaller but more specialized, a perfect fit for the NPU's INT8 units. It could perform its magic without completely saturating the memory bus, leaving room for the CPU and other components. **Conclusion: Use the NPU.**

This insight was the key. We stopped trying to force a hybrid model on the LLM and instead focused on perfecting the iGPU-only pipeline, which led to our final, stable performance of **39.4 TPS on Gemma 2B**—a number the hybrid model could never touch.

## Know Your Architecture

The journey was a humbling lesson in systems engineering. The spec sheet—TFLOPS, TOPS—tells only part of the story. True performance comes from understanding how every component interacts, and from identifying the one, single bottleneck that governs the entire system. For us, it wasn't the compute. It was the memory.