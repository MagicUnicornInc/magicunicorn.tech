# Blog Post: Your First 220x Speed Transcription with Unicorn Amanuensis

**Series:** Unicorn Unleashed: A Hacker's Guide

---

## Go From Audio File to Full Transcript in Seconds

Ever wanted to play with world-class AI transcription without signing up for a cloud service or paying per minute? The **Unicorn Amanuensis** engine, which powers our enterprise-grade **Meeting Ops** appliance, uses custom NPU acceleration to process audio 220 times faster than a standard CPU. And now you can use it too.

This guide will walk you through setting up the engine and transcribing your first audio file in just a few minutes.

### Step 1: Your Environment

To get started, you'll need a machine with an AMD Ryzen AI (Phoenix) NPU. We've written a detailed guide on setting up the complete development environment [here](./05_Setting_Up_Your_AMD_Ryzen_AI_Dev_Environment.md), but if you have the drivers and a working Python environment, you can get started right away.

```bash
# 1. Make sure you have the XRT runtime and a Python environment.

# 2. Install the Unicorn Amanuensis client library
# This is a simplified, hypothetical package name
pip install unicorn-amanuensis-client

# 3. Download a pre-quantized Whisper model
# We've hosted an optimized INT8 model for you on Hugging Face.
wget https://huggingface.co/magicunicorn/whisper-base-npu-int8/resolve/main/whisper-base-npu.onnx
```

### Step 2: Your First Transcription Script

Create a new Python file called `test_transcription.py`. The code is designed to be as simple as possible to get you started.

```python
from unicorn_amanuensis import Transcriber
import sys

# Check if an audio file was provided
if len(sys.argv) < 2:
    print("Usage: python test_transcription.py <path_to_your_audio_file>")
    sys.exit(1)

audio_file_path = sys.argv[1]

# 1. Load the engine with our NPU-optimized model
print("Loading the Unicorn Amanuensis engine...")
# The engine automatically detects and uses the NPU if available.
amanuensis = Transcriber(model_path="./whisper-base-npu.onnx")

# 2. Transcribe your audio file
print(f"Transcribing '{audio_file_path}'...")
result = amanuensis.transcribe(audio_file_path)

# 3. Print the results!
print("\n--- Transcription Complete! ---")
print(f"Detected Language: {result.language}")
print("\nTranscript:")
for segment in result.segments:
    # Format the timestamps to be more readable
    start_time = f"{int(segment.start // 60):02d}:{int(segment.start % 60):02d}"
    end_time = f"{int(segment.end // 60):02d}:{int(segment.end % 60):02d}"
    print(f"[{start_time} -> {end_time}] {segment.text}")

```

### Step 3: Run It!

Now, run the script from your terminal, passing it the path to any audio file (`.wav`, `.mp3`, `.m4a`, etc.).

```bash
python test_transcription.py "/path/to/my/meeting.mp3"
```

You should see the full, formatted transcript appear on your screen almost instantly.

### What's Next?

You've just scratched the surface. The `result` object also contains word-level timestamps and speaker diarization data. In our next tutorial, we'll show you how to access this rich metadata to build an application that can highlight words as the audio plays.

Welcome to the world of on-premise, hardware-accelerated AI. Happy hacking!

