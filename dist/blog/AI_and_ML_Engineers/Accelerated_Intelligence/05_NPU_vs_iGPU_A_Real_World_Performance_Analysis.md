# Blog Post: NPU vs. iGPU: A Surprising Tale of Two Processors

**Series:** Accelerated Intelligence: Optimizing Models for the Edge

---

## The Assumption

When we began developing the **Unicorn Execution Engine**, we started with a simple, powerful assumption. Our AMD APU had two AI-capable processors: a flexible, high-TFLOPS iGPU and a specialized, high-TOPS NPU. The obvious path to maximum performance was to use both. We envisioned a sophisticated hybrid system where different parts of a neural network would run on the hardware best suited for them.

For our LLM tests, the plan was clear: the massive matrix multiplications of the FFN layers would run on the iGPU, while the specialized attention mechanisms would run on the NPU. It was a beautiful theory. And it was wrong.

## The Experiment: LLMs on an APU

We put our theory to the test with the Gemma family of models. We ran three sets of benchmarks:

1.  **CPU-Only:** The baseline.
2.  **iGPU-Only:** Offloading the entire model to the Radeon 780M iGPU.
3.  **Hybrid NPU+iGPU:** The "perfect" system, running attention on the NPU and the rest on the iGPU.

The results were not what we expected.

| Configuration (Gemma 2B) | Tokens/Second | The Story |
|---|---|---|
| CPU Only | 28.5 TPS | The Slow Baseline |
| **iGPU Only** | **39.4 TPS** | **A solid 38% speedup. It works!** |
| NPU + iGPU | 29.4 TPS | Slower than iGPU-only. What? |

Our elegant hybrid theory had failed. Adding the NPU not only didn't help, it actually made things *worse*. To understand why, we had to look beyond the processors and at the roads between them.

## The Culprit: The Memory Bus

The root cause was not the processors themselves, but the single, shared resource they were all fighting over: the **87.5 GB/s system memory bus**. 

LLMs are uniquely memory-bandwidth-bound. The main bottleneck isn't how fast you can compute, but how fast you can shuttle the gigabytes of model weights from RAM to the processor. Our iGPU was already powerful enough to nearly saturate the entire memory bus by itself. 

When we asked the NPU to also start pulling data for its attention calculations, it was like opening a second, massive fire hydrant on a single, small water main. The pressure dropped for everyone. The two processors spent more time waiting for data than they saved by working in parallel. The overhead of coordinating the starved processors was greater than the benefit.

## The Exception: Why the NPU Won for Whisper

This discovery was initially disheartening, until we looked at the results from **Unicorn Amanuensis**. There, the NPU provided a massive 220x speedup for the Whisper model. Why the difference?

**It's a different workload.** Whisper, while large, has a different computational profile. It is more compute-bound and less memory-bandwidth-bound than a massive LLM. The NPU's specialized INT8 engines provided a huge advantage, and the work was efficient enough that it didn't saturate the memory bus. It was the right tool for that specific job.

## The Lesson: There is No "Best" Processor

Our journey delivered a crucial insight for any engineer working on modern heterogeneous systems. There is no universally "best" AI accelerator. The optimal choice depends entirely on the specific workload and its interaction with the entire system architecture.

- **For memory-heavy LLMs on this APU:** The iGPU is king. Let it use the whole memory bus.
- **For specialized, compute-heavy tasks like Whisper:** The NPU is the clear winner.

This deep, data-driven understanding of our hardware is what allows the **Unicorn Execution Engine** to intelligently deploy workloads to the right processor, delivering the best possible performance for every task.