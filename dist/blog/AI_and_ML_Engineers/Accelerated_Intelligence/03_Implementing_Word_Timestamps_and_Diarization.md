# Blog Post: Beyond Words: The Tech Behind Timestamps and Diarization

**Series:** Accelerated Intelligence: Optimizing Models for the Edge

---

## The Unspoken Context

A raw transcript is a stream of consciousness. It tells you *what* was said, but it hides two crucial pieces of information: *when* it was said, and *who* said it. For an AI transcription to be truly useful, especially in a business context like **Meeting Ops**, it needs to be more than just a wall of text. It needs to be a structured, searchable record of a conversation.

This is why the **Unicorn Amanuensis** engine was built not just for speed, but for intelligence. Here’s a look at the technology we use to add that critical layer of context.

## The "When": Achieving Word-Level Timestamps

The Whisper model is fantastic, but it only provides timestamps for entire phrases or sentences. For a feature like clicking a word to jump to that point in the audio, we needed more granularity.

**The Challenge:** How do you align a sequence of words with a continuous audio waveform?

**Our Solution: Forced Alignment.** After our NPU-accelerated Whisper model generates the initial transcript, we kick off a second, lightweight process:

1.  **Phoneme Generation:** We take the transcribed text and generate a likely sequence of phonemes (the basic sounds of speech).
2.  **Audio-Phoneme Alignment:** We use a specialized model to find the most probable alignment between the phonemes and the raw audio waveform.
3.  **Word Boundary Mapping:** Since we know which phonemes belong to which word, we can now calculate the precise start and end time for every single word in the transcript.

This entire process is also hardware-accelerated, adding only a few milliseconds of latency to produce a vastly more useful result.

## The "Who": The Science of Speaker Diarization

Diarization, or identifying who is speaking, is a fascinating challenge in machine learning. It's a multi-stage pipeline that essentially fingerprints voices.

**Our Approach:**

1.  **Voice Activity Detection (VAD):** First, we run a simple model to chop the audio into segments that contain active speech, discarding silence.

2.  **Speaker Embedding:** This is the core magic. For each speech segment, we use a neural network to generate a "speaker embedding"—a vector of numbers that represents the unique characteristics of that person's voice (pitch, tone, timbre, etc.).

3.  **Clustering:** We now have a collection of these voice fingerprints. The final step is to use a clustering algorithm. The algorithm groups similar vectors together, automatically determining that all the vectors in "Cluster A" belong to one person, and all the vectors in "Cluster B" belong to another.

Our system is optimized for up to 4 speakers, which we found covers the vast majority of use cases for **Meeting Ops**. The result is a clean, readable transcript labeled with `Speaker 0`, `Speaker 1`, etc.

## Conclusion: From a Transcript to a Database

By adding timestamps and speaker labels, **Unicorn Amanuensis** transforms a simple text file into a structured database of a conversation. Each word has a time and a speaker associated with it. This is the foundation for all higher-level AI features: calculating speaker talk-time, summarizing a specific person's contributions, or searching for what was said at a particular moment.

It’s this deep commitment to metadata that elevates our transcription engine from a simple utility to a true intelligence platform.