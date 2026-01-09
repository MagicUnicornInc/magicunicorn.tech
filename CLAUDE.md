# CLAUDE.md - Magic Unicorn Tech Website

## Project Overview

This is the official website for **Magic Unicorn Unconventional Technology & Stuff Inc** — a technology studio building AI infrastructure, platforms, and accelerator ventures.

**Live Site**: https://magicunicorn.tech

## Quick Commands

```bash
# Development
npm run dev              # Start dev server (localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build

# Docker Deployment
docker compose build web --no-cache    # Rebuild frontend
docker compose up -d web               # Deploy/restart frontend
docker compose logs -f                 # View logs

# Git
git push forgejo main    # Push to Forgejo
git push origin main     # Push to GitHub
```

## Architecture

### Frontend (React + Vite)
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Main navigation
│   ├── Footer.jsx       # Site footer
│   ├── PageHeader.jsx   # Page headers with background variants
│   ├── BackgroundSparkles.jsx  # Animated particles
│   └── TimeSlotPicker.jsx      # Booking calendar
├── pages/               # Route pages
│   ├── Home.jsx         # / - Main landing with rotating headlines
│   ├── About.jsx        # /about - "About the Studio"
│   ├── Platforms.jsx    # /platforms - Platform ecosystem
│   ├── Accelerator.jsx  # /accelerator - Technical accelerator
│   ├── Consulting.jsx   # /consulting - Services
│   ├── Portfolio.jsx    # /portfolio - Work showcase
│   ├── Internships.jsx  # /internships - Talent pipeline
│   ├── Blog.jsx         # /blog - Research/Lab Notes
│   ├── Book.jsx         # /book - Consultation booking
│   └── Contact.jsx      # /contact - Contact form
├── styles/              # Component CSS files
└── images/              # Image assets
```

### Backend (Express.js - Booking API)
```
server/
├── index.js             # Express server entry
├── calendar.js          # Microsoft Graph calendar integration
├── email.js             # Email notifications
└── lib/
    ├── turnstile.js     # Cloudflare Turnstile verification
    └── spam-protection.js
```

## Key Information

### Platform Ecosystem
- **Unicorn Commander** - AI Infrastructure Command Center (unicorncommander.com)
- **Center Deep** - Intelligence Layer for search, RAG, analytics
- **Cognitive Companion** - Personal AI Interface (cognitivecompanion.dev)

### Technical Accelerator Portfolio
- **Cipher Forge Forward** - Founded by Ryan Cabading (Secure Systems & Applied AI)
- **Genesis Flow Labs** - Founded by Shafen Khan (Automation & Workflow Intelligence)

### Founder
- **Aaron Stransky** - Founder & Unconventional Technologist
- LinkedIn: https://www.linkedin.com/in/aaronstransky/

## Design System

### Colors
```css
--unicorn-purple: #b66eff;
--unicorn-blue: #00d4ff;
--unicorn-pink: #ff6b9d;
--dark-bg: #0a0a0f;
--dark-surface: #12121a;
--gradient-magic: linear-gradient(135deg, #b66eff 0%, #00d4ff 100%);
```

### Brand Voice
- **Avoid**: SaaS language ("pricing", "sign up", "free trial", "buy now")
- **Use**: "Engage", "Co-build", "Architect", "Explore the ecosystem"
- **Tone**: Strategic, architectural, visionary — playful but professional

### Rotating Headlines
The Home page has 25 witty headline/tagline pairs that rotate randomly. These are in `/src/pages/Home.jsx` in the `headlinePairs` array. **DO NOT replace these** - they're part of the brand personality.

## Environment Variables

Required in `.env` for booking system:
```env
MS365_CLIENT_ID=xxx
MS365_TENANT_ID=xxx
MS365_CLIENT_SECRET=xxx
MS365_USER_EMAIL=xxx
TURNSTILE_SECRET_KEY=xxx
```

## Deployment

### Docker Services
- **magicunicorn-tech** - Frontend (nginx, port 3000)
- **magicunicorn-booking-api** - Backend API (Express, port 3333)

### Traefik Labels
Site is exposed via Traefik reverse proxy with automatic SSL:
- Host: `magicunicorn.tech` and `www.magicunicorn.tech`
- Networks: `magic-network` (internal), `web` (traefik)

## Repositories

- **GitHub**: https://github.com/MagicUnicornInc/magicunicorn.tech
- **Forgejo**: https://git.unicorncommander.ai/MagicUnicorn/magicunicorn.tech

## Documentation

Additional docs in `/docs/`:
- `company-profile.md` - Full company profile
- `founder-profile.md` - Aaron Stransky bio
- `site-architecture.md` - Detailed sitemap
- `content-strategy.md` - Copy and brand voice guidelines
- `design-system-enhancements.md` - Extended CSS components

## Important Notes

1. **Rotating Headlines**: Keep the original witty catchphrases in Home.jsx
2. **Brand Identity**: Technology studio, NOT a product/SaaS company
3. **Open Source Philosophy**: Emphasized throughout the site
4. **Booking System**: Uses MS365 Graph API - requires valid credentials
5. **Analytics**: Umami (self-hosted, privacy-focused) at umami.unicorncommander.ai

## Common Tasks

### Add a new page
1. Create `src/pages/NewPage.jsx`
2. Create `src/styles/NewPage.css`
3. Add route in `src/App.jsx`
4. Add nav link in `src/components/Navbar.jsx`

### Update portfolio companies
Edit `portfolioCompanies` array in `src/pages/Accelerator.jsx`

### Modify platform information
Edit `platforms` array in `src/pages/Platforms.jsx`

### Deploy changes
```bash
npm run build
docker compose build web --no-cache
docker compose up -d web
```
