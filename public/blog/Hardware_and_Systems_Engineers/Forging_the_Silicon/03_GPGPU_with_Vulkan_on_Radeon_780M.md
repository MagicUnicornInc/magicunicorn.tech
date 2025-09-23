# Blog Post: Hacking the Radeon 780M: A GPGPU Journey with Vulkan

**Series:** Forging the Silicon: A Deep Dive into the Unicorn Execution Engine

---

## Unleashing the Beast Within the APU

Integrated GPUs have a reputation for being the underpowered sibling of their discrete counterparts. But hidden inside the AMD Ryzen 8945HS is a beast: a Radeon 780M with 12 RDNA3 compute units and a staggering 8.9 TFLOPS of potential compute. Our mission for the **Unicorn Execution Engine** was to tame this beast and turn it from a graphics renderer into a raw, number-crunching engine for our LLMs.

Our tool of choice was not a high-level AI framework, but the bare-metal graphics and compute API: **Vulkan**.

## Why Vulkan? The Path of Most Resistance, and Most Reward

We could have used ROCm or OpenCL, but we chose Vulkan for one reason: **uncompromising control**. Vulkan doesn't hold your hand. It doesn't have a magic scheduler or automatic memory manager. It gives you the keys to the hardware and expects you to know how to drive. For us, this was perfect.

This control allowed us to architect our engine around two critical concepts:

1.  **Explicit Memory Heaps:** Vulkan exposes the GPU's memory layout. We could choose to place our tensors in `DEVICE_LOCAL` memory (the fastest on-chip VRAM) or `HOST_VISIBLE` memory (the GTT, which is part of system RAM). This allowed us to manually orchestrate data placement for maximum throughput.
2.  **Pre-compiled Compute Pipelines:** We could define our entire compute workflow—from data bindings to the shader code itself—into a pipeline object that could be created once and reused thousands of times with near-zero overhead.

## The Engine's Core: A Vulkan Compute Pipeline

At the heart of our engine (`real_vulkan_matrix_compute.py`) is a simple but powerful loop:

1.  **Load a Shader:** We write our algorithms in GLSL (OpenGL Shading Language), compile them to SPIR-V bytecode, and load them into Vulkan.
2.  **Bind the Data:** We use Descriptor Sets to tell the shader which memory buffers to use as inputs and outputs. This is where we point the GPU to our tensor data in VRAM or GTT.
3.  **Record a Command:** We record a command buffer with a single instruction: `vkCmdDispatch`. This tells the GPU to execute our shader across thousands of threads.
4.  **Submit to the Queue:** We submit the command buffer to the GPU's compute queue and wait for the magic to happen.

Here is a taste of what our matrix multiplication shader looks like:

```glsl
#version 450

layout(local_size_x = 16, local_size_y = 16, local_size_z = 1) in;

layout(set = 0, binding = 0) readonly buffer MatrixA { float A[]; };
layout(set = 0, binding = 1) readonly buffer MatrixB { float B[]; };
layout(set = 0, binding = 2) writeonly buffer ResultC { float C[]; };

void main() {
    // ... optimized matrix multiplication logic ...
}
```

## The Breakthrough That Unlocked Everything

Our first implementation was naive and slow. Each matrix multiplication created its own buffers and descriptor sets. The result? A staggering **50ms of overhead** for an operation that should take microseconds. 

The breakthrough was the **Persistent Buffer Strategy**. 

Instead of creating and destroying resources for every operation, we did it once. During model load, we created a pool of all the GPU buffers we would ever need. During inference, we simply grabbed handles to these pre-existing buffers. The `compute_matrix_multiply_persistent` function we wrote doesn't move data; it just points the GPU to the *right* pre-allocated memory.

The result was a **13.5x reduction in latency**, from 54ms down to just 4ms per operation. This was the key that unlocked the performance of the entire LLM pipeline.

## Conclusion: The Rewarding Complexity of Vulkan

Vulkan is not for the faint of heart. It is verbose, complex, and unforgiving. But for those willing to master it, it provides an unparalleled level of control over the hardware. By taming the Radeon 780M with Vulkan, we built a GPGPU engine that is not only incredibly fast but also perfectly tailored to our specific needs, forming the powerful core of the **Unicorn Execution Engine**.