# Blog Post: Speaking Assembly to an AI Engine: A Guide to MLIR-AIE2

**Series:** Forging the Silicon: A Deep Dive into the Unicorn Execution Engine

---

## Beyond the Compiler

In modern software, we live layers upon layers of abstraction away from the hardware. We write Python, which is interpreted, which calls a C++ library, which calls a driver, which finally tells the silicon what to do. But what if you could skip the middlemen? What if you could write the assembly code for an AI engine yourself?

For the **Unicorn Amanuensis** project, to achieve our goal of a 220x speedup, that's exactly what we had to do. This is the story of how we used the MLIR/AIE2 dialect to write programs directly for the AMD Phoenix NPU.

## The NPU: A Grid of Tiny, Powerful Brains

First, you have to understand what an NPU is. Unlike a CPU or GPU, which are general-purpose, the Phoenix NPU is a grid of 20 highly specialized "AI Engines" (AIEs). Each AIE is a small VLIW (Very Long Instruction Word) processor with its own local memory (SRAM) and DMA controllers. They are designed to do one thing exceptionally well: high-speed, low-power vector math, especially on integers.

To program them, you can't just write C++. You have to define the data flow, memory transfers, and computations for each tile individually. You have to think like the hardware.

## Our Tool: The MLIR-AIE2 Dialect

This is where LLVM's MLIR project comes in. MLIR is a framework for building compilers, and it includes an "AIE2 dialect" which is effectively the human-readable assembly language for the NPU. It gives us the power to control every aspect of the hardware.

Let's look at a simplified kernel for a single attention head in Whisper:

```mlir
// Define the specific AIE tile we are programming (e.g., column 1, row 2)
%tile = AIE.tile(1, 2)

// Define a 16KB buffer in the tile's local SRAM
%query_buffer = AIE.buffer(%tile) : memref<16384xi8>
%key_buffer = AIE.buffer(%tile) : memref<16384xi8>

// Define the program for the tile's core
AIE.core(%tile) {
  // 1. Configure the DMA to pull the Query vector from system RAM
  //    into our local %query_buffer.
  AIE.dma_start(MM2S, 0, ...)

  // 2. Configure the DMA for the Key vector.
  AIE.dma_start(MM2S, 1, ...)

  // 3. Wait for both DMAs to finish.
  AIE.dma_wait_all()

  // 4. Execute the vectorized INT8 matrix multiplication.
  // This is a single, powerful instruction.
  AIE.vector_mac_int8(%query_buffer, %key_buffer, ...)

  // 5. Signal that the program is complete.
  AIE.end
}
```

This level of control is unheard of in most AI frameworks. We are manually defining memory buffers, orchestrating DMA transfers, and executing specific vector instructions.

## The Breakthrough: Vectorizing Across Attention Heads

Our key optimization was realizing that since each AIE tile is independent, we could write a kernel that didn't just process one attention head, but 8 of them at the same time. We designed our MLIR program to load the data for 8 different heads into the local SRAM of a single tile and then use the NPU's SIMD (Single Instruction, Multiple Data) capabilities to perform the matrix multiplications for all 8 heads in one pass.

This single, hardware-aware design choice was responsible for a massive portion of the final 220x speedup.

## Conclusion: The Art of Hardware-Software Co-Design

Writing MLIR-AIE2 kernels is not for the faint of heart. It's a painstaking process that requires a deep understanding of the underlying hardware. But the results speak for themselves. By moving beyond traditional compilers and writing code that was designed in concert with the hardware architecture, we unlocked a level of performance that would have been impossible otherwise. It's the ultimate form of optimization, and it's what makes **Unicorn Amanuensis** a truly unique piece of technology.