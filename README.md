# 🦄 Magic Unicorn Tech Website

> **A Technology Studio That Builds Systems, Not Products**

![Magic Unicorn Tech Website](./public/magicunicorn.tech.jpeg)

## 🚀 Overview

Magic Unicorn Tech is the official website for **Magic Unicorn Unconventional Technology & Stuff Inc** — a technology studio building AI infrastructure, platforms, and accelerator ventures. This site showcases our ecosystem of platforms, technical accelerator program, and consulting services.

### ✨ What Makes This Special

- **🎭 Dynamic Cycling Headlines**: 25 witty headline/tagline pairs that rotate randomly on each page visit
- **🏢 Technology Studio Identity**: Showcases platforms, accelerator ventures, and consulting services
- **🎨 Glassmorphic Design**: Modern frosted glass effects with purple/blue gradients and glowing elements
- **📅 Integrated Booking System**: Microsoft 365 calendar integration for scheduling consultations
- **⚡ Blazing Fast Performance**: Built with Vite for lightning-fast development and production builds
- **📱 Fully Responsive**: Looks stunning on everything from phones to ultrawide monitors
- **🎬 Smooth Animations**: Framer Motion powers elegant transitions and micro-interactions

## 🏗️ Site Architecture

### Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Studio overview with rotating headlines, platform previews, engagement modes |
| **Studio** | `/about` | Philosophy, open-source stance, founder bio (Aaron Stransky) |
| **Platforms** | `/platforms` | Unicorn Commander, Center Deep, Cognitive Companion showcase |
| **Accelerator** | `/accelerator` | Technical accelerator program with portfolio companies |
| **Consulting** | `/consulting` | Services, engagement models, differentiators |
| **Portfolio** | `/portfolio` | Showcase of completed projects and work |
| **Research** | `/blog` | Lab notes, research, and technical writing |
| **Internships** | `/internships` | Talent pipeline and internship program |
| **Book** | `/book` | Calendar-integrated consultation booking |

### Platform Ecosystem

- **🖥️ Unicorn Commander** - AI Infrastructure Command Center ([unicorncommander.com](https://unicorncommander.com))
- **🧠 Center Deep** - Intelligence Layer for search, RAG, and analytics
- **👤 Cognitive Companion** - Personal AI Interface ([cognitivecompanion.dev](https://cognitivecompanion.dev))

### Technical Accelerator Portfolio

- **Cipher Forge Forward** (Ryan Cabading) - Secure Systems & Applied AI
- **Genesis Flow Labs** (Shafen Khan) - Automation & Workflow Intelligence

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend Framework | ^18.2.0 |
| **Vite** | Build Tool & Dev Server | ^4.5.5 |
| **Framer Motion** | Animation Library | ^10.12.16 |
| **React Router** | Client-side Routing | ^6.14.2 |
| **React Icons** | Icon Components | ^4.10.1 |
| **Express** | Booking API Server | ^4.18.0 |
| **Microsoft Graph** | Calendar Integration | ^3.0.0 |

## 📐 Component Architecture

```
src/
├── components/
│   ├── Navbar.jsx            # Responsive navigation
│   ├── Footer.jsx            # Site footer
│   ├── PageHeader.jsx        # Reusable page headers
│   ├── BackgroundSparkles.jsx # Animated particle effects
│   ├── TimeSlotPicker.jsx    # Calendar booking component
│   ├── ErrorBoundary.jsx     # Error handling
│   └── LazyImage.jsx         # Optimized image loading
├── pages/
│   ├── Home.jsx              # Homepage with studio narrative
│   ├── About.jsx             # About the Studio
│   ├── Platforms.jsx         # Platform ecosystem
│   ├── Accelerator.jsx       # Technical accelerator
│   ├── Consulting.jsx        # Consulting services
│   ├── Portfolio.jsx         # Work showcase
│   ├── Internships.jsx       # Internship program
│   ├── Blog.jsx              # Research & lab notes
│   ├── BlogSeries.jsx        # Blog series pages
│   ├── BlogArticle.jsx       # Individual articles
│   ├── Book.jsx              # Consultation booking
│   └── Contact.jsx           # Contact form
├── styles/
│   ├── index.css             # Global styles & CSS variables
│   ├── Home.css              # Homepage styles
│   ├── About.css             # Studio page styles
│   ├── Platforms.css         # Platforms page styles
│   ├── Accelerator.css       # Accelerator page styles
│   ├── Consulting.css        # Consulting page styles
│   ├── Internships.css       # Internships page styles
│   └── Book.css              # Booking page styles
└── images/
    └── index.js              # Image exports
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MagicUnicornInc/magicunicorn.tech.git
cd magicunicorn.tech

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development URLs
- **Local**: http://localhost:5173
- **Network**: Accessible on your local network for mobile testing

## 🐳 Docker Deployment

### Services

The application consists of two services:
1. **web** - Frontend React application served via nginx
2. **booking-api** - Express.js server for Microsoft 365 calendar integration

### Environment Variables

Create a `.env` file with the following:

```env
# Microsoft 365 Calendar Integration
MS365_CLIENT_ID=your_client_id
MS365_TENANT_ID=your_tenant_id
MS365_CLIENT_SECRET=your_client_secret
MS365_USER_EMAIL=your_calendar_email

# Cloudflare Turnstile (spam protection)
TURNSTILE_SECRET_KEY=your_turnstile_secret
```

### Deploy with Docker Compose

```bash
# Build and start services
docker compose up --build -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

The site will be available at http://localhost:3000

### Production Deployment

The site is deployed via Traefik reverse proxy with automatic SSL:
- **Production URL**: https://magicunicorn.tech
- **Traefik Integration**: Automatic HTTPS via Let's Encrypt

## 🎨 Design System

### Color Palette

```css
:root {
  --unicorn-purple: #b66eff;
  --unicorn-blue: #00d4ff;
  --unicorn-pink: #ff6b9d;
  --dark-bg: #0a0a0f;
  --dark-surface: #12121a;
  --gradient-magic: linear-gradient(135deg, #b66eff 0%, #00d4ff 100%);
}
```

### Typography

- **Headings**: Inter, system-ui (bold weights)
- **Body**: Inter, system-ui (regular/medium)
- **Code**: Monaco, monospace

### Components

- **Cards**: Glassmorphic with subtle borders and hover effects
- **Buttons**: Primary (gradient fill), Secondary (outline), CTA variants
- **Animations**: Framer Motion for smooth page transitions and micro-interactions

## 📊 Analytics

This website uses [Umami Analytics](https://umami.is) for privacy-friendly, GDPR-compliant website analytics.

- **Analytics Dashboard**: https://umami.unicorncommander.ai
- **Privacy**: No cookies, anonymous tracking, self-hosted
- **Implementation**: Tracking script integrated in main HTML file

## 📜 Documentation

Additional documentation available in `/docs`:

- `company-profile.md` - Full company profile and positioning
- `founder-profile.md` - Aaron Stransky bio and background
- `site-architecture.md` - Detailed sitemap and implementation notes
- `content-strategy.md` - Copy recommendations and brand voice
- `design-system-enhancements.md` - Extended CSS variables and components
- `research-findings.md` - Best practices from industry research

## 🏢 About Magic Unicorn Unconventional Technology & Stuff Inc

Magic Unicorn is a technology studio that builds AI platforms, automation systems, and production infrastructure that organizations can actually own. Not rent. Not license. **Own.**

### Core Philosophy

- **Systems-of-Systems Thinking** - Ecosystems, not apps
- **Open-Source First** - Transparency, modifiability, community leverage
- **Hardware-Aware AI** - Design around real compute constraints
- **Operator Experience as Product** - Tools that make operators confident

### Contact

- **Website**: https://magicunicorn.tech
- **Email**: aaron@magicunicorn.tech
- **LinkedIn**: [Aaron Stransky](https://www.linkedin.com/in/aaronstransky/)

## 📦 Repositories

- **GitHub**: https://github.com/MagicUnicornInc/magicunicorn.tech
- **Forgejo**: https://git.unicorncommander.ai/MagicUnicorn/magicunicorn.tech

---

*Built with ❤️ and a healthy dose of whimsy by Magic Unicorn Unconventional Technology & Stuff Inc*

**"Serious Systems. Approachable Wrapper."** ✨
