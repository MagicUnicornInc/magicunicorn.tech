# Key Business & Product Facts & Metrics

This document contains the essential quantitative data and strategic differentiators for product and business discussions.

### Product-Market Fit & Value Proposition
- **Core Niche:** On-premise, hardware-accelerated AI for enterprises that prioritize data privacy, security, and predictable costs.
- **Primary Product Model:** Selling pre-configured hardware appliances (like **Meeting Ops**) rather than a pay-per-use SaaS API.
- **Key Differentiator:** The **Unicorn Execution Engine** provides a durable competitive advantage that is difficult to replicate, as it requires deep expertise in low-level hardware programming.

### Performance as a Business Metric
- **Unicorn Amanuensis (Transcription):**
  - **Speed:** 220x faster than CPU. A 1-hour meeting is processed in 1.2 seconds. This enables new, real-time workflows that are impossible with slower, cloud-based services.
  - **Power Efficiency:** 1,658x more efficient than CPU. This translates directly to lower operating costs (electricity) and enables deployment on low-power edge devices.
- **Unicorn Orator (TTS):**
  - **Speed:** 3-5x faster than CPU on a 15W power budget. This enables high-quality voice in battery-powered devices where cloud latency is unacceptable.

### Strategic Decisions
- **Build:**
  - The **Unicorn Execution Engine** was built in-house because performance on specialized hardware is the company's core competitive advantage.
- **Buy / Use Open Source:**
  - **LLMs (Gemma/Granite):** Treated as a commodity; integrated via Ollama to avoid the immense cost of training.
  - **Vector Database (Qdrant):** Used as the foundation for the **Center-Deep** platform, avoiding the need to re-invent a complex but non-differentiating technology.
  - **Authentication (Authentik):** Adopted for enterprise-grade SSO, providing a more secure and convenient solution than a custom-built one.