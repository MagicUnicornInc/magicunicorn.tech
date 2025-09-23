# Key Application Facts & Metrics

This document contains the essential quantitative data about the **Meeting Ops** application stack.

### Backend (FastAPI)
- **API Endpoints:** 40+
- **Core Technologies:** Python 3.13, FastAPI, SQLAlchemy, Uvicorn.
- **Real-Time:** Full WebSocket support for live audio and transcription streaming.
- **Database:** PostgreSQL for structured data, Redis for caching and pub/sub, Qdrant for vector search.

### Frontend (React)
- **Core Technologies:** React 19, TypeScript, Vite.
- **Component Count:** 17+ major components.
- **Styling:** Tailwind CSS.
- **Production Build Size:** 865KB (optimized bundle).

### Infrastructure & Deployment
- **Containerization:** Fully containerized with Docker Compose (`docker-compose-full-stack.yml`).
- **Services:** Nginx (reverse proxy), PostgreSQL, Redis, Qdrant, FastAPI Backend, React Frontend.
- **Authentication:** Enterprise-grade SSO via Authentik with a forward auth proxy model.

### Development Status (as of last update)
- **Backend:** 100% Complete.
- **Frontend:** 75-95% Complete (Core features implemented, polish and advanced features pending).
- **Lines of Code:** ~15,000 (Backend), ~10,000 (Frontend).
- **Known Technical Debt:** 42 blocking TypeScript errors in the production build process (functionality is intact but requires resolution).