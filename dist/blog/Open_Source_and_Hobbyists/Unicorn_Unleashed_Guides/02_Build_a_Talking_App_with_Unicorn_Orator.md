# Blog Post: Build a Talking Python App in 15 Minutes

**Series:** Unicorn Unleashed: A Hacker's Guide

---

## Give Your Scripts a Voice

Ever wanted to make your Python scripts talk back to you? Whether it's for build notifications, a personal voice assistant, or just for fun, adding a high-quality voice can make any application feel more alive. With the **Unicorn Orator** engine, you can do it in just a few lines of code, using the Intel iGPU that's already in your laptop.

This guide will show you how to build a simple "talking clock" that sounds amazing.

### Step 1: Setup

This tutorial is for anyone with a modern Intel-based laptop or PC (usually 8th gen or newer). You don't need a fancy discrete GPU.

```bash
# 1. Make sure you have the latest Intel graphics drivers.
# We recommend following Intel's OpenVINO setup guide for your OS.

# 2. Install the Unicorn Orator library
pip install unicorn-orator-client

# 3. Install PyAudio to play the sound
pip install pyaudio
```

### Step 2: The Talking Clock Script

Create a new Python file called `talking_clock.py`. This script will get the current time and use **Unicorn Orator** to announce it through your speakers.

```python
import time
from datetime import datetime
import pyaudio
import io

from unicorn_orator import Orator

# 1. Initialize the Orator engine.
# It will automatically detect and use your Intel iGPU via OpenVINO.
print("Initializing Unicorn Orator... This may take a moment on first run.")
orator = Orator(voice="en_professional_male_1") # Try "en_professional_female_1" too!

# 2. A helper function to play our audio bytes
def play_audio(audio_bytes, rate=24000):
    p = pyaudio.PyAudio()
    stream = p.open(format=pyaudio.paInt16, channels=1, rate=rate, output=True)
    stream.write(audio_bytes)
    stream.stop_stream()
    stream.close()
    p.terminate()

# 3. Get the current time and generate the speech audio
current_time_str = datetime.now().strftime("The current time is %I:%M %p")
print(f"Generating audio for: '{current_time_str}'")

# This one call does all the work, running inference on your iGPU
audio_data = orator.synthesize_to_bytes(current_time_str)

# 4. Announce the time!
print("Speaking...")
play_audio(audio_data)

print("Done!")
```

### Step 3: Run It!

Run the script from your terminal:

```bash
python talking_clock.py
```

You should hear a clear, low-latency, professional voice announce the current time. The best part? Your CPU barely broke a sweat, and your laptop fan probably didn't even spin up. That's the power of efficient iGPU acceleration.

### What's Next?

Now you have a simple but powerful tool. Try integrating it into other projects:

-   Make a script that reads you the weather every morning.
-   Get an audible notification when a long-running process or build finishes.
-   Create a simple chatbot that speaks its responses.

Have fun building!