# Blog Post: The Anatomy of an AI Appliance: Deconstructing the Meeting Ops Stack

**Series:** From Engine to Enterprise: Building Meeting Ops

---

## It's More Than Just the AI

A breakthrough AI model is like a world-class engine. It's incredibly powerful, but it can't get you anywhere without a chassis, a transmission, a steering wheel, and a comfortable interior. For our **Unicorn Amanuensis** transcription engine, the vehicle we built to carry it is **Meeting Ops**.

Many developers are fascinated by the AI core, but the real challenge of building a product lies in the vast landscape of supporting technologies that turn a cool demo into a reliable, scalable, and user-friendly application. This is a tour of the full stack—the anatomy of our AI appliance.

## The Blueprint: A High-Level View

From 30,000 feet, our architecture is a clean, modern, service-oriented system designed for reliability and scalability.

```
+----------------------------------------------------+
|         Frontend (React + TypeScript)              |
|        (Running in User's Browser)                 |
+----------------------------------------------------+
                        | (HTTPS / WSS)
+----------------------------------------------------+
|         Nginx Reverse Proxy                        |
+----------------------------------------------------+
      | (Forward Auth)        | (API Gateway)
+------------------+    +-----------------------------+
|  Authentik (SSO) |    |   Backend API (FastAPI)     |
+------------------+    +-----------------------------+
                            | (Connects to...)
+------------------+    +------------------+    +------------------+
| PostgreSQL (Data)|    |   Redis (Cache)  |    |   Qdrant (Vectors)|
+------------------+    +------------------+    +------------------+
|    Unicorn Amanuensis (AI Engine / NPU Service)    |
+----------------------------------------------------+
```

Let's break down each piece.

### The Foundation: Dockerized Services

Everything starts with our `docker-compose-full-stack.yml`. We believe in immutable infrastructure; all our stateful services are containerized for easy deployment and management.

-   **PostgreSQL:** This is our single source of truth. It holds all the structured data: user accounts, meeting metadata, finalized transcripts, and application settings. We chose a robust relational database because data integrity is non-negotiable.
-   **Redis:** This is the central nervous system for our real-time features. It acts as a high-speed message broker. When the audio service captures a new chunk of audio, it publishes it to a Redis channel. The transcription service is listening, and our WebSocket service is *also* listening. This pub/sub architecture decouples our services beautifully.
-   **Qdrant:** This is the engine for our **Center-Deep** platform. It stores the vector embeddings of every transcript, enabling powerful semantic search capabilities in the future. 

### The Brains: The FastAPI Backend

We chose Python and FastAPI for our backend for its raw performance, async capabilities, and automatic OpenAPI documentation. Its responsibilities are vast:

-   **Business Logic:** Manages all the rules for creating, starting, and stopping meeting sessions.
-   **Authentication & Authorization:** While Authentik handles the login, our backend is still responsible for checking the trusted headers and enforcing role-based access control (RBAC) on every API call.
-   **The Grand Orchestrator:** It's the glue that connects everything. It takes a request from the frontend, fetches data from Postgres, coordinates with the **Unicorn Amanuensis** engine, and caches results in Redis.

### The Face: The React & TypeScript Frontend

Users don't interact with an AI engine; they interact with a UI. Our frontend is a modern Single-Page Application (SPA) built with React, TypeScript, and Vite.

-   **User Experience:** Its primary job is to make the powerful backend technology simple and intuitive. A user shouldn't need to know what an NPU is; they just want to click a "Record" button.
-   **Real-Time Interaction:** It maintains a persistent WebSocket connection to receive live transcription updates and audio level data, creating a dynamic and responsive experience.
-   **Component-Based:** Built from over 17 major components, from the login screen to the live audio visualizer, all styled with Tailwind CSS for a clean, modern look.

## Conclusion: Building the Vehicle

The **Unicorn Amanuensis** engine may be the star of the show, but the supporting cast of databases, services, APIs, and frontend components are what make it a product. Building a successful AI application requires expertise not just in machine learning, but in solid, scalable, full-stack software engineering.