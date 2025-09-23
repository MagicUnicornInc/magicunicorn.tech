# Blog Post: The Art and Science of INT8 Quantization

**Series:** Accelerated Intelligence: Optimizing Models for the Edge

---

## The AI Engineer's Dilemma

Every AI engineer faces the same fundamental trade-off: performance vs. precision. The original, massive models trained in data centers use 32-bit floating-point numbers (FP32) for their weights. They are highly accurate but also slow, bloated, and memory-intensive. To deploy them on edge devices, we must shrink them. The most powerful tool in our arsenal is quantization.

But quantization is not a simple, one-click process. It's an art form that requires a deep understanding of your model and your hardware. This is the story of how we developed our quantization strategy for the **Unicorn Amanuensis** engine.

## What is INT8 Quantization, Really?

At its core, quantization is about representing a wide range of numbers with a smaller set of numbers. In our case, it's converting billions of FP32 weights, each of which can represent a vast range of values, into simple 8-bit integers, which can only represent 256 different values.

**The Payoff is Huge:**
- **4x Smaller Model:** A 1.5GB Whisper model becomes ~375MB.
- **4x Less Memory Traffic:** A massive win when you're limited by memory bandwidth.
- **Access to Specialized Hardware:** It unlocks the NPU's 16 TOPS INT8 compute units, which are far faster and more efficient than its floating-point units.

**The Risk:** If done poorly, you can permanently damage the model, leading to a catastrophic loss in accuracy.

## The Key to Success: Per-Layer Calibration

Many quantization toolkits use a simple, model-wide approach. They look at the range of all values in the entire model and apply a single scaling factor. This is fast, easy, and often produces terrible results.

We knew we had to be more meticulous. Our approach is **per-tensor, post-training static quantization**.

1.  **Analyze, Don't Guess:** We don't just guess at the right way to shrink the numbers. We run a "calibration dataset" (a few hundred representative audio samples) through the original FP32 model.

2.  **Collect Activation Statistics:** As the calibration data flows through the model, we record the exact range of activation values—the outputs of the neurons—at *every single layer*.

3.  **Calculate Per-Tensor Scaling Factors:** Now, instead of one scaling factor, we have thousands. Each tensor (or weight matrix) in the model gets its own unique scaling factor, perfectly tailored to its specific distribution of values. A layer with a narrow range of values gets a different treatment than a layer with a wide range.

4.  **Simulate and Verify:** Before committing, we use a simulation framework to apply these scaling factors and test the model's accuracy on a validation set. This allows us to catch any layers that are particularly sensitive to quantization and fine-tune their parameters.

5.  **Convert and Deploy:** Only when we are satisfied that the accuracy loss is minimal (our target was <1% WER degradation) do we perform the final conversion to the INT8 ONNX format that our NPU kernels expect.

## Conclusion: Precision in, Performance out

This careful, data-driven approach is what allowed us to achieve the best of both worlds for **Unicorn Amanuensis**: the speed and efficiency of INT8 compute with virtually no perceptible loss in transcription quality. It's a testament to our philosophy that in AI engineering, true performance comes not from brute force, but from a deep and respectful understanding of the models you work with.