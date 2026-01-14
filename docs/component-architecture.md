# MagicUnicorn.tech Component Architecture

## Overview

This document defines the component architecture for the MagicUnicorn.tech site revamp, transforming it from a generic tech services site into a comprehensive technology studio ecosystem hub.

---

## 1. Routing Structure

### Current Routes (to be deprecated/evolved)
```
/                    -> Home (REVAMP)
/about               -> About (EVOLVE to About the Studio)
/services            -> Services (EVOLVE to Consulting)
/portfolio           -> Portfolio (ENHANCE)
/blog                -> Blog (KEEP - future Lab Notes)
/blog/series/:id     -> BlogSeries
/blog/series/:id/:slug -> BlogArticle
/contact             -> Contact (KEEP)
/book                -> Book (KEEP)
```

### New Routing Structure
```jsx
// App.jsx - Current Routes (Jan 2025)
// Note: Using React Router v7 future flags for smooth upgrade
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
<Routes>
  {/* Core Pages */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />

  {/* Platforms Ecosystem */}
  <Route path="/platforms" element={<Platforms />} />
  <Route path="/platforms/:platformSlug" element={<PlatformDetail />} />

  {/* Technical Accelerator */}
  <Route path="/accelerator" element={<Accelerator />} />
  <Route path="/accelerator/:companySlug" element={<AcceleratorCompany />} />

  {/* Services */}
  <Route path="/consulting" element={<Consulting />} />
  <Route path="/consulting/:serviceSlug" element={<ConsultingService />} />

  {/* Portfolio */}
  <Route path="/portfolio" element={<Portfolio />} />
  <Route path="/portfolio/:caseStudySlug" element={<CaseStudy />} />

  {/* Talent Pipeline */}
  <Route path="/internships" element={<Internships />} />

  {/* Thought Leadership (Optional - Phase 2) */}
  <Route path="/lab-notes" element={<LabNotes />} />
  <Route path="/lab-notes/:articleSlug" element={<LabNote />} />

  {/* Conversion */}
  <Route path="/contact" element={<Contact />} />
  <Route path="/book" element={<Book />} />

  {/* Legacy Redirects */}
  <Route path="/about" element={<Navigate to="/studio" replace />} />
  <Route path="/services" element={<Navigate to="/consulting" replace />} />
  <Route path="/blog/*" element={<Navigate to="/lab-notes" replace />} />
</Routes>
```

---

## 2. Page Components

### 2.1 Home Page (REVAMP)
**File:** `/src/pages/Home.jsx`

**Purpose:** Establish Magic Unicorn as a systems studio, platform incubator, and technical accelerator.

**Component Hierarchy:**
```
Home
├── HeroStudio                     # NEW - Philosophy-driven hero
│   ├── AnimatedHeadline           # Cycling headlines (keep existing pattern)
│   ├── StudioPositioning          # One-sentence positioning
│   └── EcosystemVisual            # Animated ecosystem diagram
├── WhatWeBuild                    # NEW - Three pillars section
│   ├── SectionHeader
│   ├── PillarCard (x3)            # Platforms, Accelerators, Applications
│   └── ViewAllLink
├── HowWeEngage                    # NEW - Engagement modes
│   ├── SectionHeader
│   ├── EngagementCard (x3)        # Consulting, Co-building, Ventures
│   └── CTAButton
├── FeaturedPlatforms              # NEW - Platform showcase
│   ├── SectionHeader
│   ├── PlatformPreviewCard (x3)   # UC, Center Deep, Cognitive Companion
│   └── ExploreEcosystemLink
├── SocialProof                    # EVOLVE from features-section
│   ├── MetricCounter (x3)
│   └── TestimonialSlider
└── CTASection                     # KEEP existing pattern
    ├── Headline
    ├── Subtext
    └── DualCTA                    # Book + Explore Platforms
```

**Data Flow:**
```typescript
interface HomeData {
  headlines: HeadlinePair[];
  pillars: Pillar[];
  engagements: EngagementMode[];
  featuredPlatforms: Platform[];
  metrics: Metric[];
}
```

---

### 2.2 About the Studio Page (EVOLVE from About)
**File:** `/src/pages/AboutStudio.jsx`

**Purpose:** Authority and differentiation - why Magic Unicorn exists.

**Component Hierarchy:**
```
AboutStudio
├── PageHeader                     # REUSE existing
├── BackgroundSparkles             # REUSE existing
├── StudioPhilosophy               # NEW
│   ├── PhilosophyStatement
│   └── DifferentiatorList
├── CorePrinciples                 # NEW
│   ├── SectionHeader
│   └── PrincipleCard (x4)         # Open-source, Sovereignty, Modularity, etc.
├── FounderSection                 # NEW
│   ├── FounderBio
│   ├── FounderImage
│   └── LinkedInButton
├── StudioFlow                     # NEW - How products/platforms flow
│   ├── FlowDiagram
│   └── FlowDescription
└── CTASection
```

---

### 2.3 Platforms Page (NEW)
**File:** `/src/pages/Platforms.jsx`

**Purpose:** Ecosystem map showing all platform properties.

**Component Hierarchy:**
```
Platforms
├── PageHeader
├── BackgroundSparkles
├── EcosystemIntro                 # NEW
│   ├── Headline
│   └── EcosystemDiagram           # Visual showing relationships
├── PlatformGrid
│   └── PlatformCard (x3+)         # SHARED COMPONENT
│       ├── PlatformIcon
│       ├── PlatformName
│       ├── CategoryBadge
│       ├── Description
│       ├── AudienceTags
│       └── ExternalLink
├── PlatformRelationships          # NEW
│   └── RelationshipDiagram        # How platforms connect
└── CTASection
```

**Nested Route - Platform Detail:**
```
PlatformDetail
├── PageHeader (dynamic)
├── PlatformHero
│   ├── PlatformLogo
│   ├── FullDescription
│   └── StatusBadge                # In development, Live, etc.
├── FeatureGrid
│   └── FeatureCard[]
├── TechStack
│   └── TechBadge[]
├── TargetAudience
│   └── AudienceCard[]
├── IntegrationPoints
│   └── IntegrationCard[]
└── CTASection
```

---

### 2.4 Technical Accelerator Page (NEW)
**File:** `/src/pages/Accelerator.jsx`

**Purpose:** Venture engine showcasing portfolio companies.

**Component Hierarchy:**
```
Accelerator
├── PageHeader
├── BackgroundSparkles
├── AcceleratorIntro               # NEW
│   ├── Headline                   # "We don't just consult. We co-build companies."
│   └── AcceleratorDescription
├── PortfolioCompanies
│   ├── SectionHeader
│   └── AcceleratorCompanyCard[]   # SHARED COMPONENT
│       ├── CompanyLogo
│       ├── CompanyName
│       ├── CompanyType            # "Portfolio company in the accelerator"
│       ├── FocusAreas
│       └── LearnMoreLink
├── HowItWorks                     # NEW
│   ├── SectionHeader
│   ├── ProcessStep (x4)
│   │   ├── StepNumber
│   │   ├── StepTitle
│   │   └── StepDescription
│   └── TimelineGraphic
├── WhatWeLookFor                  # NEW
│   ├── SectionHeader
│   └── CriteriaCard[]
├── WhatWeProvide                  # NEW
│   ├── SectionHeader
│   └── OfferingCard[]             # Architecture, Engineering, Infrastructure, Productization
└── ApplySection
    ├── Headline
    └── ApplicationCTA
```

---

### 2.5 Consulting Page (EVOLVE from Services)
**File:** `/src/pages/Consulting.jsx`

**Purpose:** Revenue engine - architecture and systems leadership, not freelance.

**Component Hierarchy:**
```
Consulting
├── PageHeader
├── BackgroundSparkles
├── ConsultingPositioning          # NEW
│   ├── AntiPositioning            # "Not freelance. Not IT services."
│   └── PositivePositioning        # "Architecture, systems design, AI infrastructure"
├── ServiceCategories
│   ├── SectionHeader
│   └── ConsultingServiceCard[]    # SHARED COMPONENT
│       ├── ServiceIcon
│       ├── ServiceTitle
│       ├── ServiceDescription
│       ├── Deliverables[]
│       └── EngageButton
├── EngagementModels               # NEW
│   ├── SectionHeader
│   └── EngagementCard[]           # Fractional CAIO, Project-based, etc.
├── ProcessOverview                # NEW
│   └── ConsultingProcess
└── BookingSection
    ├── BookingCalendar            # Integration point
    └── IntakeForm
```

**Service Categories Data:**
```typescript
interface ConsultingService {
  id: string;
  slug: string;
  icon: ReactNode;
  title: string;
  description: string;
  deliverables: string[];
  engagementTypes: ('project' | 'retainer' | 'fractional')[];
}

const services: ConsultingService[] = [
  {
    id: 'ai-automation',
    slug: 'ai-automation-architecture',
    title: 'AI & Automation Architecture',
    // ...
  },
  {
    id: 'platform-infrastructure',
    slug: 'platform-infrastructure-design',
    title: 'Platform & Infrastructure Design',
    // ...
  },
  {
    id: 'custom-ai-systems',
    slug: 'custom-ai-systems',
    title: 'Custom AI Systems',
    // ...
  },
  {
    id: 'technical-due-diligence',
    slug: 'technical-due-diligence',
    title: 'Technical Due Diligence',
    // ...
  },
  {
    id: 'fractional-caio',
    slug: 'fractional-caio',
    title: 'Fractional CAIO / Strategic Engineering',
    // ...
  }
];
```

---

### 2.6 Portfolio Page (ENHANCE)
**File:** `/src/pages/Portfolio.jsx`

**Purpose:** Proof of execution with case study format.

**Component Hierarchy:**
```
Portfolio
├── PageHeader
├── BackgroundSparkles
├── PortfolioFilters               # ENHANCE
│   ├── CategoryFilter             # Platforms, Client Work, Accelerator
│   └── TechStackFilter
├── FeaturedCaseStudy              # NEW
│   └── CaseStudyHero
├── PortfolioGrid
│   └── PortfolioCard[]            # EVOLVE existing
│       ├── ProjectImage
│       ├── ProjectTitle
│       ├── ProblemStatement       # NEW
│       ├── OutcomeMetric          # NEW
│       ├── TechStackBadges
│       └── ViewCaseStudyLink      # NEW
└── CTASection
```

**Case Study Detail Page:**
```
CaseStudy
├── CaseStudyHeader
│   ├── ProjectTitle
│   ├── ClientName (if applicable)
│   └── DateRange
├── ProblemSection
│   ├── SectionHeader
│   └── ProblemDescription
├── SolutionSection
│   ├── SectionHeader
│   ├── SolutionDescription
│   └── ArchitectureDiagram
├── TechStackSection
│   └── TechStackGrid
├── OutcomesSection
│   ├── SectionHeader
│   └── OutcomeMetric[]
├── ScreenshotGallery
│   └── Lightbox                   # REUSE existing
└── RelatedProjects
    └── PortfolioCard[]
```

---

### 2.7 Internships Page (NEW)
**File:** `/src/pages/Internships.jsx`

**Purpose:** Talent pipeline for future founders and engineers.

**Component Hierarchy:**
```
Internships
├── PageHeader
├── BackgroundSparkles
├── InternshipIntro                # NEW
│   ├── Headline                   # "This is not generic internship work."
│   └── ProgramDescription
├── FocusAreas
│   ├── SectionHeader
│   └── FocusAreaCard[]
│       ├── AreaIcon
│       ├── AreaTitle
│       ├── AreaDescription
│       └── SkillTags
├── WhatYouLearn                   # NEW
│   ├── SectionHeader
│   └── LearningOutcome[]
├── PathwaySection                 # NEW
│   ├── SectionHeader
│   └── CareerPath                 # Intern -> Engineer -> Founder
├── CurrentOpenings                # NEW (optional)
│   └── OpeningCard[]
└── ApplySection
    ├── ApplicationForm
    └── SubmitButton
```

---

### 2.8 Lab Notes Page (Optional - Phase 2)
**File:** `/src/pages/LabNotes.jsx`

**Purpose:** Thought leadership and technical authority.

**Component Hierarchy:**
```
LabNotes
├── PageHeader
├── BackgroundSparkles
├── FeaturedArticle
│   └── ArticleHero
├── ArticleGrid
│   └── ArticleCard[]
│       ├── ArticleImage
│       ├── CategoryBadge
│       ├── ArticleTitle
│       ├── ArticleExcerpt
│       ├── ReadTime
│       └── PublishDate
├── CategoryFilter
│   └── CategoryChip[]
└── Newsletter
    └── NewsletterSignup
```

---

## 3. Shared Components

### 3.1 Layout Components

```
/src/components/layout/
├── Navbar.jsx                     # EVOLVE - Add new nav items
├── Footer.jsx                     # KEEP
├── PageHeader.jsx                 # KEEP
├── BackgroundSparkles.jsx         # KEEP
├── ErrorBoundary.jsx              # KEEP
├── PageContainer.jsx              # NEW - Standard page wrapper
├── SectionWrapper.jsx             # NEW - Consistent section spacing
└── Container.jsx                  # NEW - Max-width container
```

### 3.2 Card Components (NEW)

```
/src/components/cards/
├── PlatformCard.jsx               # Platform ecosystem display
├── AcceleratorCompanyCard.jsx     # Venture company display
├── ConsultingServiceCard.jsx      # Service offering display
├── PortfolioCard.jsx              # EVOLVE from existing
├── CaseStudyCard.jsx              # Case study preview
├── FocusAreaCard.jsx              # Internship focus areas
├── PillarCard.jsx                 # Home page pillars
├── EngagementCard.jsx             # How we engage display
├── FeatureCard.jsx                # Generic feature display
├── PrincipleCard.jsx              # Core principles display
└── ArticleCard.jsx                # Lab notes articles
```

**Card Component Template:**
```typescript
interface BaseCardProps {
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
  animated?: boolean;
  onClick?: () => void;
}

// Example: PlatformCard
interface PlatformCardProps extends BaseCardProps {
  platform: Platform;
  showDetails?: boolean;
  linkExternal?: boolean;
}

interface Platform {
  id: string;
  slug: string;
  name: string;
  icon: string;
  category: 'infrastructure' | 'intelligence' | 'application';
  url?: string;
  description: string;
  shortDescription: string;
  audience: string[];
  status: 'live' | 'development' | 'beta';
  relationship: string;  // e.g., "Flagship platform built by Magic Unicorn"
}
```

### 3.3 UI Components

```
/src/components/ui/
├── Button.jsx                     # Standardized buttons
├── Badge.jsx                      # Status/category badges
├── SectionHeader.jsx              # Consistent section titles
├── MetricCounter.jsx              # Animated metrics
├── IconBox.jsx                    # Icon with background
├── Divider.jsx                    # Section dividers
├── ExternalLink.jsx               # External link with icon
├── GradientText.jsx               # Gradient text effect
├── GlowEffect.jsx                 # Glow animation wrapper
└── AnimatedList.jsx               # Staggered list animations
```

### 3.4 Interactive Components

```
/src/components/interactive/
├── Lightbox.jsx                   # KEEP existing
├── TabGroup.jsx                   # Tab navigation
├── FilterBar.jsx                  # Filter controls
├── Accordion.jsx                  # Expandable sections
├── Timeline.jsx                   # Process/history timeline
├── DiagramCanvas.jsx              # Interactive diagrams
└── Tooltip.jsx                    # Hover tooltips
```

### 3.5 Form Components

```
/src/components/forms/
├── TimeSlotPicker.jsx             # KEEP existing
├── ContactForm.jsx                # Contact form
├── IntakeForm.jsx                 # Consulting intake
├── ApplicationForm.jsx            # Internship/accelerator application
├── NewsletterSignup.jsx           # Email signup
├── FormField.jsx                  # Standard form field
└── FormButton.jsx                 # Form submission button
```

---

## 4. Data Layer

### 4.1 Data Files Structure

```
/src/data/
├── platforms.js                   # Platform ecosystem data
├── accelerator.js                 # Accelerator companies data
├── consulting.js                  # Consulting services data
├── portfolio.js                   # Portfolio/case studies data
├── internships.js                 # Internship program data
├── home.js                        # Home page content
├── studio.js                      # About studio content
└── navigation.js                  # Navigation structure
```

### 4.2 Platform Data Schema

```javascript
// /src/data/platforms.js
export const platforms = [
  {
    id: 'unicorn-commander',
    slug: 'unicorn-commander',
    name: 'Unicorn Commander',
    icon: '/images/platforms/unicorn-commander-icon.svg',
    url: 'https://unicorncommander.com',
    category: 'infrastructure',
    status: 'live',
    tagline: 'AI Infrastructure Platform',
    description: 'Headless servers, orchestration, local-first AI, agent systems...',
    audience: ['Operators', 'Enterprises', 'Power Users'],
    monetization: ['Subscriptions', 'Hardware', 'Enterprise Deployments'],
    relationship: 'Flagship platform built by Magic Unicorn',
    features: [
      { title: 'Headless Servers', description: '...' },
      { title: 'AI Orchestration', description: '...' },
      // ...
    ],
    techStack: ['React', 'Node.js', 'Docker', 'Kubernetes'],
  },
  {
    id: 'center-deep',
    slug: 'center-deep',
    name: 'Center Deep',
    category: 'intelligence',
    status: 'development',
    tagline: 'Intelligence Layer',
    description: 'Search, data, analytics, RAG, lead intelligence...',
    audience: ['Enterprises', 'Analysts', 'Internal Systems'],
    relationship: 'Intelligence layer for platforms and products',
    // ...
  },
  {
    id: 'cognitive-companion',
    slug: 'cognitive-companion',
    name: 'Cognitive Companion',
    icon: '/images/platforms/cognitive-companion-icon.svg',
    url: 'https://cognitivecompanion.dev',
    category: 'application',
    status: 'development',
    tagline: 'Desktop & Mobile Applications',
    description: 'Personal AI systems, assistants, workflow tools, edge compute...',
    audience: ['Professionals', 'Creators', 'Individuals'],
    relationship: 'User-facing systems vs headless infrastructure',
    // ...
  },
];
```

### 4.3 Accelerator Data Schema

```javascript
// /src/data/accelerator.js
export const acceleratorCompanies = [
  {
    id: 'cipher-forge-forward',
    slug: 'cipher-forge-forward',
    name: 'Cipher Forge Forward',
    logo: '/images/accelerator/cipher-forge-logo.svg',
    type: 'Portfolio Company',
    role: 'Deep technical incubation, infrastructure-first product building',
    focusAreas: ['Secure Systems', 'Applied AI', 'Complex Automation'],
    status: 'active',
    description: '...',
  },
  {
    id: 'genesis-flow-labs',
    slug: 'genesis-flow-labs',
    name: 'Genesis Flow Labs',
    logo: '/images/accelerator/genesis-flow-logo.svg',
    type: 'Portfolio Company',
    role: 'Automation and business systems',
    focusAreas: ['Automation', 'Dashboards', 'Workflow Systems', 'Applied Business AI'],
    status: 'active',
    description: '...',
  },
];

export const acceleratorProcess = {
  whatWeProvide: [
    'Architecture Design',
    'Engineering Resources',
    'Infrastructure Setup',
    'Productization Support',
  ],
  whatWeLookFor: [
    'Hard Problems',
    'Serious Builders',
    'Real-World Impact',
  ],
  stages: [
    { step: 1, title: 'Discovery', description: '...' },
    { step: 2, title: 'Architecture', description: '...' },
    { step: 3, title: 'Build', description: '...' },
    { step: 4, title: 'Launch', description: '...' },
  ],
};
```

### 4.4 Navigation Data Schema

```javascript
// /src/data/navigation.js
export const mainNavigation = [
  { label: 'Home', path: '/', exact: true },
  { label: 'Studio', path: '/studio' },
  {
    label: 'Platforms',
    path: '/platforms',
    children: [
      { label: 'Unicorn Commander', path: '/platforms/unicorn-commander' },
      { label: 'Center Deep', path: '/platforms/center-deep' },
      { label: 'Cognitive Companion', path: '/platforms/cognitive-companion' },
    ],
  },
  { label: 'Accelerator', path: '/accelerator' },
  { label: 'Consulting', path: '/consulting' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Internships', path: '/internships' },
];

export const ctaNavigation = {
  primary: { label: 'Book Now', path: '/book' },
  secondary: { label: 'Contact', path: '/contact' },
};
```

---

## 5. Style Architecture

### 5.1 CSS File Structure

```
/src/styles/
├── shared/
│   ├── variables.css              # KEEP & EXTEND
│   ├── Cards.css                  # EVOLVE - Add new card variants
│   ├── typography.css             # NEW - Text styles
│   ├── animations.css             # NEW - Framer Motion presets
│   └── utilities.css              # NEW - Utility classes
├── components/
│   ├── Navbar.css                 # EVOLVE
│   ├── Footer.css
│   ├── PageHeader.css
│   ├── BackgroundSparkles.css
│   ├── PlatformCard.css           # NEW
│   ├── AcceleratorCard.css        # NEW
│   ├── ConsultingCard.css         # NEW
│   └── ...
├── pages/
│   ├── Home.css                   # REVAMP
│   ├── AboutStudio.css            # NEW (evolve from About.css)
│   ├── Platforms.css              # NEW
│   ├── Accelerator.css            # NEW
│   ├── Consulting.css             # NEW (evolve from Services.css)
│   ├── Portfolio.css              # EVOLVE
│   ├── Internships.css            # NEW
│   ├── LabNotes.css               # NEW
│   └── ...
└── index.css                      # Global styles
```

### 5.2 Extended Design Tokens

```css
/* /src/styles/shared/variables.css - EXTENSIONS */
:root {
  /* Existing colors remain */

  /* Platform Category Colors */
  --platform-infrastructure: #ff6b9d;   /* Pink for UC */
  --platform-intelligence: #00d4ff;     /* Blue for Center Deep */
  --platform-application: #b66eff;      /* Purple for Cognitive Companion */

  /* Status Colors */
  --status-live: #00ff88;
  --status-development: #ffaa00;
  --status-beta: #00d4ff;

  /* Section Backgrounds */
  --section-dark: #0a0a0a;
  --section-darker: #050505;
  --section-card: rgba(18, 18, 18, 0.8);

  /* Component Sizes */
  --card-padding: 2rem;
  --card-radius: 16px;
  --section-gap: 6rem;

  /* Z-Index Scale */
  --z-background: -1;
  --z-default: 1;
  --z-cards: 10;
  --z-sticky: 100;
  --z-modal: 1000;
  --z-lightbox: 1001;
}
```

---

## 6. Animation Presets

### 6.1 Framer Motion Variants

```javascript
// /src/utils/animations.js
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(182, 110, 255, 0.2)',
      '0 0 40px rgba(182, 110, 255, 0.4)',
      '0 0 20px rgba(182, 110, 255, 0.2)',
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
```

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1-2)
1. Set up new routing structure with redirects
2. Create shared layout components
3. Implement new data layer structure
4. Create base card components
5. Extend CSS variables

### Phase 2: Core Pages (Week 2-4)
1. Revamp Home page
2. Evolve About to AboutStudio
3. Create Platforms page
4. Create Accelerator page
5. Evolve Services to Consulting

### Phase 3: Enhancement (Week 4-5)
1. Enhance Portfolio with case study format
2. Create Internships page
3. Update Navbar with new navigation
4. Add platform detail pages
5. Add consulting service detail pages

### Phase 4: Polish (Week 5-6)
1. Add Lab Notes page (optional)
2. Implement advanced animations
3. Performance optimization
4. Accessibility audit
5. Cross-browser testing

---

## 8. File Migration Map

| Current File | Action | New File |
|-------------|--------|----------|
| `/pages/Home.jsx` | REVAMP | `/pages/Home.jsx` |
| `/pages/About.jsx` | EVOLVE | `/pages/AboutStudio.jsx` |
| `/pages/Services.jsx` | EVOLVE | `/pages/Consulting.jsx` |
| `/pages/Portfolio.jsx` | ENHANCE | `/pages/Portfolio.jsx` |
| `/pages/Blog.jsx` | KEEP (Phase 2) | `/pages/LabNotes.jsx` |
| `/pages/Contact.jsx` | KEEP | `/pages/Contact.jsx` |
| `/pages/Book.jsx` | KEEP | `/pages/Book.jsx` |
| - | NEW | `/pages/Platforms.jsx` |
| - | NEW | `/pages/PlatformDetail.jsx` |
| - | NEW | `/pages/Accelerator.jsx` |
| - | NEW | `/pages/AcceleratorCompany.jsx` |
| - | NEW | `/pages/CaseStudy.jsx` |
| - | NEW | `/pages/Internships.jsx` |

---

## 9. Component Dependencies

```
App.jsx
├── BrowserRouter (with v7 future flags)
│   └── ErrorBoundary
│       ├── Navbar (layout)
│       ├── Routes
│       │   ├── Home
│       │   │   ├── HeroStudio
│       │   │   ├── WhatWeBuild → PillarCard
│       │   │   ├── HowWeEngage → EngagementCard
│       │   │   ├── FeaturedPlatforms → PlatformCard
│       │   │   └── CTASection
│       │   ├── AboutStudio
│       │   │   ├── PageHeader
│       │   │   ├── StudioPhilosophy
│       │   │   ├── CorePrinciples → PrincipleCard
│       │   │   └── FounderSection
│       │   ├── Platforms
│       │   │   ├── PageHeader
│       │   │   ├── EcosystemIntro
│       │   │   └── PlatformGrid → PlatformCard
│       │   ├── Accelerator
│       │   │   ├── PageHeader
│       │   │   ├── PortfolioCompanies → AcceleratorCompanyCard
│       │   │   ├── HowItWorks → ProcessStep
│       │   │   └── ApplySection
│       │   ├── Consulting
│       │   │   ├── PageHeader
│       │   │   ├── ServiceCategories → ConsultingServiceCard
│       │   │   └── BookingSection → TimeSlotPicker
│       │   ├── Portfolio
│       │   │   ├── PageHeader
│       │   │   ├── PortfolioFilters
│       │   │   └── PortfolioGrid → PortfolioCard
│       │   ├── Internships
│       │   │   ├── PageHeader
│       │   │   ├── FocusAreas → FocusAreaCard
│       │   │   └── ApplySection → ApplicationForm
│       │   ├── Contact
│       │   └── Book
│       └── Footer (layout)
```

---

## 10. Accessibility Requirements

### ARIA Landmarks
- `<nav>` with `aria-label="Main navigation"`
- `<main>` for primary content
- `<section>` with `aria-labelledby` for major sections
- `<header>` for page headers
- `<footer>` for site footer

### Focus Management
- Skip links for keyboard navigation
- Focus trap in modals (Lightbox)
- Visible focus indicators
- Logical tab order

### Screen Reader Support
- Alt text for all images
- ARIA labels for icons
- Descriptive link text
- Status announcements for dynamic content

---

## 11. Performance Considerations

### Code Splitting
```javascript
// Lazy load pages
const AboutStudio = lazy(() => import('./pages/AboutStudio'));
const Platforms = lazy(() => import('./pages/Platforms'));
const Accelerator = lazy(() => import('./pages/Accelerator'));
// ...
```

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading via LazyImage component
- Responsive images with srcset
- Preload critical hero images

### Animation Performance
- Use `will-change` sparingly
- Prefer `transform` and `opacity` animations
- Reduce motion for `prefers-reduced-motion`
- Virtualize long lists

---

## 12. SEO Structure

### Meta Tags per Page
```javascript
// Example: Platforms page
const platformsMeta = {
  title: 'Platforms | Magic Unicorn Tech',
  description: 'Explore the Magic Unicorn ecosystem: Unicorn Commander, Center Deep, and Cognitive Companion.',
  canonical: 'https://magicunicorn.tech/platforms',
  og: {
    title: 'Magic Unicorn Platforms',
    description: '...',
    image: '/images/og/platforms.jpg',
    type: 'website',
  },
};
```

### Structured Data
- Organization schema on Home
- Service schema on Consulting
- Article schema on Lab Notes
- BreadcrumbList on all pages

---

This architecture provides a comprehensive blueprint for transforming MagicUnicorn.tech from a generic tech services site into a sophisticated technology studio ecosystem hub while maintaining the existing design language and component patterns.

---

## 13. Image & Asset Architecture (Current - Jan 2025)

### Platform Logos
The Home page displays actual platform logos instead of generic icons:

```
src/images/
├── index.js                      # Centralized exports
├── unicorn.svg                   # Main Magic Unicorn logo (29KB)
├── unicorn-commander-logo.webp   # The Colonel mascot (7KB)
├── center-deep-logo.webp         # Astronaut unicorn (5KB)
└── cognitive-companion-logo.webp # Unicorn Amanuensis (9KB)
```

### Image Optimization Pipeline
```javascript
// scripts/optimize-logos.js
// Uses Sharp to:
// 1. Resize to 200x200 (2x for retina at 100px display)
// 2. Convert PNG → WebP at 85% quality
// 3. Preserve transparency

// Run: node scripts/optimize-logos.js
```

### Logo Sources
Original high-res logos sourced from:
- `/home/muut/Production/UC-Cloud/services/ops-center/public/logos/`
- Platform websites (unicorncommander.com, etc.)

### Adding New Platform Logos
1. Copy source PNG to `src/images/{platform}-logo.png`
2. Add to `scripts/optimize-logos.js` logos array
3. Run optimization script
4. Export from `src/images/index.js`
5. Import in component and add to platforms array

---

## 14. Analytics Architecture (Current - Jan 2025)

### Removed
- Google Analytics (G-FJKYT7CV33)
- Google Tag Manager integration
- `usePageViews()` hook in App.jsx

### Current Stack
- **Umami** (self-hosted): `umami.unicorncommander.ai`
  - Script loaded via `<script defer>` in index.html
  - Website ID: `908167f7-2229-4084-99fd-fea4a867fb42`
- **Cloudflare Web Analytics**: Injected via Cloudflare dashboard

### Content Security Policy
Configured in `docker/nginx.conf`:
```
script-src 'self' 'unsafe-inline' 'unsafe-eval'
           https://umami.unicorncommander.ai
           https://static.cloudflareinsights.com;
connect-src 'self'
            https://umami.unicorncommander.ai
            https://static.cloudflareinsights.com;
```
