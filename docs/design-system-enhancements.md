# MagicUnicorn.tech Design System Enhancements

## Technology Studio Evolution

This document outlines the enhanced design system for MagicUnicorn.tech as it evolves from a services site to a comprehensive technology studio with platform showcases, accelerator pages, and a "command center" aesthetic.

---

## 1. New CSS Variables

Add these to `/src/styles/shared/variables.css`:

```css
:root {
  /* ===== EXISTING VARIABLES (Keep) ===== */
  --dark-bg: #0a0a0a;
  --dark-surface: #121212;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --unicorn-purple: #b66eff;
  --unicorn-blue: #00d4ff;
  --gradient-magic: linear-gradient(135deg, var(--unicorn-purple), var(--unicorn-blue));

  /* ===== NEW COLOR VARIATIONS ===== */

  /* Extended Purple Palette */
  --purple-50: #f5f0ff;
  --purple-100: #e9deff;
  --purple-200: #d4bfff;
  --purple-300: #c19fff;
  --purple-400: #b66eff;
  --purple-500: #9f4fff;
  --purple-600: #8432e6;
  --purple-700: #6a24bf;
  --purple-800: #511b99;
  --purple-900: #3a1373;

  /* Extended Blue Palette */
  --blue-50: #e6faff;
  --blue-100: #b3f0ff;
  --blue-200: #80e6ff;
  --blue-300: #4ddbff;
  --blue-400: #00d4ff;
  --blue-500: #00b8e6;
  --blue-600: #0099cc;
  --blue-700: #007ab3;
  --blue-800: #005c99;
  --blue-900: #003d66;

  /* Command Center Colors */
  --command-green: #00ff88;
  --command-amber: #ffb300;
  --command-red: #ff4757;
  --command-cyan: #00e5ff;

  /* Surface Variations */
  --surface-elevated: #1a1a1a;
  --surface-overlay: #1f1f1f;
  --surface-highlight: #242424;
  --surface-glass: rgba(18, 18, 18, 0.8);

  /* ===== SECTION-SPECIFIC GRADIENTS ===== */

  /* Platform Section */
  --gradient-platform: linear-gradient(135deg, #b66eff 0%, #00d4ff 50%, #00ff88 100%);
  --gradient-platform-subtle: linear-gradient(135deg, rgba(182, 110, 255, 0.15), rgba(0, 212, 255, 0.15));

  /* Accelerator Section */
  --gradient-accelerator: linear-gradient(135deg, #ffb300 0%, #ff6b35 50%, #b66eff 100%);
  --gradient-accelerator-subtle: linear-gradient(135deg, rgba(255, 179, 0, 0.15), rgba(182, 110, 255, 0.15));

  /* Consulting Section */
  --gradient-consulting: linear-gradient(135deg, #00d4ff 0%, #00ff88 100%);
  --gradient-consulting-subtle: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1));

  /* Command Center */
  --gradient-command: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  --gradient-terminal: linear-gradient(180deg, rgba(0, 255, 136, 0.05) 0%, transparent 100%);

  /* ===== ENHANCED SHADOWS ===== */

  /* Base Shadows */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.35);
  --shadow-2xl: 0 24px 48px rgba(0, 0, 0, 0.4);

  /* Magical/Glow Shadows */
  --shadow-magical: 0 0 20px rgba(182, 110, 255, 0.2);
  --shadow-magical-lg: 0 0 40px rgba(182, 110, 255, 0.3);
  --shadow-magical-intense: 0 0 60px rgba(182, 110, 255, 0.4);

  /* Colored Glow Shadows */
  --shadow-purple-glow: 0 4px 20px rgba(182, 110, 255, 0.3);
  --shadow-blue-glow: 0 4px 20px rgba(0, 212, 255, 0.3);
  --shadow-green-glow: 0 4px 20px rgba(0, 255, 136, 0.3);
  --shadow-amber-glow: 0 4px 20px rgba(255, 179, 0, 0.3);

  /* Card Shadows */
  --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.25), 0 0 1px rgba(255, 255, 255, 0.1);
  --shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 20px rgba(182, 110, 255, 0.15);
  --shadow-card-platform: 0 8px 32px rgba(182, 110, 255, 0.2), 0 0 60px rgba(0, 212, 255, 0.1);

  /* ===== NEW SPACING TOKENS ===== */

  /* Large Layout Spacing */
  --spacing-2xl: 4rem;
  --spacing-3xl: 6rem;
  --spacing-4xl: 8rem;
  --spacing-5xl: 10rem;
  --spacing-6xl: 12rem;

  /* Section Spacing */
  --section-padding-sm: 4rem 0;
  --section-padding-md: 6rem 0;
  --section-padding-lg: 8rem 0;
  --section-padding-xl: 10rem 0;

  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;

  /* ===== TRANSITIONS ===== */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
  --transition-slower: 0.7s ease;
  --transition-spring: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* ===== BORDER RADIUS ===== */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-full: 9999px;

  /* ===== Z-INDEX SCALE ===== */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-tooltip: 600;
  --z-notification: 700;
}
```

---

## 2. New Component Styles

### 2.1 PlatformCard

For showcasing platforms like Unicorn Commander, Center Deep, etc.

```css
/* ===== PLATFORM CARD ===== */
.platform-card {
  position: relative;
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transition: all var(--transition-smooth);
}

/* Gradient border effect */
.platform-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: var(--gradient-platform);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.3;
  transition: opacity var(--transition-base);
}

/* Ambient glow */
.platform-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(182, 110, 255, 0.08) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity var(--transition-slow);
  pointer-events: none;
}

.platform-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-card-platform);
}

.platform-card:hover::before {
  opacity: 0.6;
}

.platform-card:hover::after {
  opacity: 1;
}

/* Platform Card Header */
.platform-card__header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.platform-card__icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-platform-subtle);
  border-radius: var(--radius-lg);
  font-size: 2rem;
}

.platform-card__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  background: var(--gradient-magic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-xs);
}

.platform-card__subtitle {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

/* Platform Card Content */
.platform-card__content {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

/* Platform Features List */
.platform-card__features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.platform-card__feature {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.platform-card__feature::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gradient-magic);
}

/* Platform Card Actions */
.platform-card__actions {
  display: flex;
  gap: var(--spacing-md);
}

/* Status Badge */
.platform-card__status {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.platform-card__status--live {
  background: rgba(0, 255, 136, 0.15);
  color: var(--command-green);
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.platform-card__status--beta {
  background: rgba(255, 179, 0, 0.15);
  color: var(--command-amber);
  border: 1px solid rgba(255, 179, 0, 0.3);
}

.platform-card__status--coming {
  background: rgba(0, 212, 255, 0.15);
  color: var(--unicorn-blue);
  border: 1px solid rgba(0, 212, 255, 0.3);
}

/* Platform Card Grid */
.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: var(--spacing-xl);
}

@media (max-width: 768px) {
  .platform-card {
    padding: var(--spacing-lg);
  }

  .platform-card__features {
    grid-template-columns: 1fr;
  }

  .platform-grid {
    grid-template-columns: 1fr;
  }
}
```

### 2.2 AcceleratorCard

For portfolio companies and ventures.

```css
/* ===== ACCELERATOR CARD ===== */
.accelerator-card {
  position: relative;
  background: var(--dark-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-smooth);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Top accent bar */
.accelerator-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-accelerator);
  transform: scaleX(0.3);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.accelerator-card:hover::before {
  transform: scaleX(1);
}

.accelerator-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-amber-glow);
}

/* Card Image/Logo Area */
.accelerator-card__visual {
  position: relative;
  height: 180px;
  background: var(--gradient-accelerator-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.accelerator-card__visual::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, var(--dark-surface) 100%);
}

.accelerator-card__logo {
  max-width: 60%;
  max-height: 60%;
  object-fit: contain;
  filter: brightness(1.1);
  z-index: 1;
}

/* Card Body */
.accelerator-card__body {
  padding: var(--spacing-lg);
}

.accelerator-card__category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--gradient-accelerator-subtle);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--command-amber);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-sm);
}

.accelerator-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.accelerator-card__description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

/* Investment/Status Info */
.accelerator-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.accelerator-card__metric {
  text-align: center;
}

.accelerator-card__metric-value {
  font-size: 1.1rem;
  font-weight: 700;
  background: var(--gradient-accelerator);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.accelerator-card__metric-label {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Stage Indicator */
.accelerator-card__stage {
  display: flex;
  gap: 4px;
}

.accelerator-card__stage-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.accelerator-card__stage-dot--active {
  background: var(--gradient-accelerator);
}

/* Accelerator Grid */
.accelerator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .accelerator-card__visual {
    height: 140px;
  }

  .accelerator-grid {
    grid-template-columns: 1fr;
  }
}
```

### 2.3 ConsultingServiceCard

For consulting and professional services.

```css
/* ===== CONSULTING SERVICE CARD ===== */
.consulting-card {
  position: relative;
  background: var(--dark-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all var(--transition-smooth);
  overflow: hidden;
}

/* Subtle corner accent */
.consulting-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: var(--gradient-consulting);
  opacity: 0.05;
  border-radius: 0 0 100% 0;
  transition: all var(--transition-slow);
}

.consulting-card:hover::before {
  width: 150px;
  height: 150px;
  opacity: 0.1;
}

.consulting-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: var(--shadow-blue-glow);
}

/* Icon */
.consulting-card__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-consulting-subtle);
  border-radius: var(--radius-md);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
  position: relative;
  z-index: 1;
}

/* Title */
.consulting-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

/* Description */
.consulting-card__description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

/* Service List */
.consulting-card__services {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-lg) 0;
}

.consulting-card__services li {
  position: relative;
  padding-left: var(--spacing-md);
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-xs);
}

.consulting-card__services li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 6px;
  height: 6px;
  background: var(--gradient-consulting);
  border-radius: 50%;
}

/* Pricing */
.consulting-card__pricing {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.consulting-card__price {
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--gradient-consulting);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.consulting-card__price-unit {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

/* Featured Badge */
.consulting-card--featured {
  border-color: rgba(0, 212, 255, 0.3);
}

.consulting-card--featured::after {
  content: 'Popular';
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  padding: 0.25rem 0.75rem;
  background: var(--gradient-consulting);
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--dark-bg);
}

/* Consulting Grid */
.consulting-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .consulting-card {
    padding: var(--spacing-lg);
  }

  .consulting-grid {
    grid-template-columns: 1fr;
  }
}
```

### 2.4 TimelineSection

For "How it works" flows and process visualization.

```css
/* ===== TIMELINE SECTION ===== */
.timeline-section {
  padding: var(--spacing-4xl) 0;
  position: relative;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

/* Central line */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--unicorn-purple) 10%,
    var(--unicorn-blue) 90%,
    transparent 100%
  );
  transform: translateX(-50%);
}

/* Timeline Item */
.timeline-item {
  position: relative;
  padding: var(--spacing-lg) 0;
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  align-items: center;
  gap: var(--spacing-lg);
}

/* Alternating layout */
.timeline-item:nth-child(odd) .timeline-item__content {
  grid-column: 1;
  text-align: right;
}

.timeline-item:nth-child(odd) .timeline-item__visual {
  grid-column: 3;
}

.timeline-item:nth-child(even) .timeline-item__content {
  grid-column: 3;
  text-align: left;
}

.timeline-item:nth-child(even) .timeline-item__visual {
  grid-column: 1;
}

/* Center node */
.timeline-item__node {
  grid-column: 2;
  width: 60px;
  height: 60px;
  background: var(--dark-surface);
  border: 3px solid transparent;
  background-image: linear-gradient(var(--dark-surface), var(--dark-surface)), var(--gradient-magic);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  z-index: 2;
  transition: all var(--transition-base);
}

.timeline-item:hover .timeline-item__node {
  transform: scale(1.1);
  box-shadow: var(--shadow-magical);
}

/* Content */
.timeline-item__content {
  opacity: 0.9;
  transition: all var(--transition-base);
}

.timeline-item:hover .timeline-item__content {
  opacity: 1;
}

.timeline-item__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.timeline-item__description {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Visual preview */
.timeline-item__visual {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all var(--transition-base);
}

.timeline-item:hover .timeline-item__visual {
  border-color: rgba(182, 110, 255, 0.3);
  box-shadow: var(--shadow-purple-glow);
}

/* Mobile Layout */
@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }

  .timeline-item {
    grid-template-columns: 60px 1fr;
    padding-left: 0;
  }

  .timeline-item__node {
    grid-column: 1;
    width: 50px;
    height: 50px;
  }

  .timeline-item:nth-child(odd) .timeline-item__content,
  .timeline-item:nth-child(even) .timeline-item__content {
    grid-column: 2;
    text-align: left;
  }

  .timeline-item:nth-child(odd) .timeline-item__visual,
  .timeline-item:nth-child(even) .timeline-item__visual {
    grid-column: 2;
    margin-top: var(--spacing-sm);
  }
}
```

### 2.5 FeatureShowcase

For highlighting platform features.

```css
/* ===== FEATURE SHOWCASE ===== */
.feature-showcase {
  padding: var(--spacing-4xl) 0;
}

.feature-showcase__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-lg);
}

/* Large Feature Card */
.feature-showcase__item--large {
  grid-column: span 8;
  position: relative;
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all var(--transition-smooth);
}

.feature-showcase__item--large::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-platform-subtle);
  opacity: 0.5;
}

.feature-showcase__item--large:hover {
  border-color: rgba(182, 110, 255, 0.3);
  box-shadow: var(--shadow-card-platform);
}

/* Medium Feature Card */
.feature-showcase__item--medium {
  grid-column: span 4;
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all var(--transition-smooth);
}

.feature-showcase__item--medium:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: var(--shadow-blue-glow);
}

/* Small Feature Card */
.feature-showcase__item--small {
  grid-column: span 3;
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all var(--transition-smooth);
}

.feature-showcase__item--small:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: var(--shadow-green-glow);
}

/* Feature Content */
.feature-showcase__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-platform-subtle);
  border-radius: var(--radius-md);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
}

.feature-showcase__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  position: relative;
  z-index: 1;
}

.feature-showcase__description {
  color: var(--text-secondary);
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* Feature Image/Demo */
.feature-showcase__demo {
  position: absolute;
  top: var(--spacing-xl);
  right: var(--spacing-xl);
  width: 50%;
  max-height: 280px;
  object-fit: contain;
  opacity: 0.3;
  transition: all var(--transition-slow);
}

.feature-showcase__item--large:hover .feature-showcase__demo {
  opacity: 0.5;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 1024px) {
  .feature-showcase__item--large {
    grid-column: span 12;
  }

  .feature-showcase__item--medium {
    grid-column: span 6;
  }

  .feature-showcase__item--small {
    grid-column: span 6;
  }
}

@media (max-width: 768px) {
  .feature-showcase__item--medium,
  .feature-showcase__item--small {
    grid-column: span 12;
  }
}
```

---

## 3. Animation Patterns

### 3.1 Entry Animations

```css
/* ===== ENTRY ANIMATIONS ===== */

/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade In Down */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade In Left */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Fade In Right */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Blur In */
@keyframes blurIn {
  from {
    opacity: 0;
    filter: blur(10px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

/* Stagger Reveal */
@keyframes staggerReveal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Animation Classes */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
}

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.6s ease forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.6s ease forwards;
}

.animate-scale-in {
  animation: scaleIn 0.5s ease forwards;
}

.animate-blur-in {
  animation: blurIn 0.8s ease forwards;
}

/* Stagger Delays */
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
.stagger-6 { animation-delay: 0.6s; }

/* Initially hidden for animations */
[class*="animate-"] {
  opacity: 0;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  [class*="animate-"] {
    animation: none !important;
    opacity: 1;
    transform: none;
    filter: none;
  }
}
```

### 3.2 Scroll-Triggered Reveals

```css
/* ===== SCROLL REVEAL SYSTEM ===== */

/* Base state for scroll reveal elements */
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Reveal Variants */
.scroll-reveal--left {
  transform: translateX(-40px);
}

.scroll-reveal--left.revealed {
  transform: translateX(0);
}

.scroll-reveal--right {
  transform: translateX(40px);
}

.scroll-reveal--right.revealed {
  transform: translateX(0);
}

.scroll-reveal--scale {
  transform: scale(0.9);
}

.scroll-reveal--scale.revealed {
  transform: scale(1);
}

.scroll-reveal--blur {
  filter: blur(10px);
}

.scroll-reveal--blur.revealed {
  filter: blur(0);
}

/* Stagger children */
.scroll-reveal-stagger > * {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-reveal-stagger.revealed > *:nth-child(1) { transition-delay: 0.1s; }
.scroll-reveal-stagger.revealed > *:nth-child(2) { transition-delay: 0.2s; }
.scroll-reveal-stagger.revealed > *:nth-child(3) { transition-delay: 0.3s; }
.scroll-reveal-stagger.revealed > *:nth-child(4) { transition-delay: 0.4s; }
.scroll-reveal-stagger.revealed > *:nth-child(5) { transition-delay: 0.5s; }
.scroll-reveal-stagger.revealed > *:nth-child(6) { transition-delay: 0.6s; }

.scroll-reveal-stagger.revealed > * {
  opacity: 1;
  transform: translateY(0);
}
```

### 3.3 JavaScript for Scroll Reveals

```javascript
// Add to your main.js or a dedicated animations.js file
// Scroll Reveal Observer
const scrollRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optionally unobserve after revealing
        // scrollRevealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
);

// Initialize scroll reveals
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger');
  revealElements.forEach((el) => scrollRevealObserver.observe(el));
});
```

### 3.4 Hover States for New Card Types

```css
/* ===== ENHANCED HOVER STATES ===== */

/* Lift Effect */
.hover-lift {
  transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

/* Glow Effect */
.hover-glow {
  transition: box-shadow var(--transition-smooth);
}

.hover-glow:hover {
  box-shadow: var(--shadow-magical-lg);
}

/* Border Highlight */
.hover-border {
  transition: border-color var(--transition-base);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hover-border:hover {
  border-color: rgba(182, 110, 255, 0.4);
}

/* Scale Subtle */
.hover-scale {
  transition: transform var(--transition-spring);
}

.hover-scale:hover {
  transform: scale(1.02);
}

/* Shine Effect */
.hover-shine {
  position: relative;
  overflow: hidden;
}

.hover-shine::after {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 50%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(25deg);
  transition: all 0.5s ease;
}

.hover-shine:hover::after {
  left: 150%;
}

/* Icon Bounce */
.hover-icon-bounce .icon {
  transition: transform var(--transition-spring);
}

.hover-icon-bounce:hover .icon {
  transform: translateY(-4px);
}

/* Text Gradient Reveal */
.hover-gradient-text {
  color: var(--text-primary);
  transition: all var(--transition-base);
}

.hover-gradient-text:hover {
  background: var(--gradient-magic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Button Pulse */
.hover-pulse {
  animation: none;
}

.hover-pulse:hover {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(182, 110, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(182, 110, 255, 0);
  }
}
```

---

## 4. Layout Patterns

### 4.1 Two-Column Platform Layout

```css
/* ===== TWO-COLUMN PLATFORM LAYOUT ===== */
.platform-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
  padding: var(--spacing-4xl) 0;
}

/* Reverse for alternating */
.platform-layout--reverse {
  direction: rtl;
}

.platform-layout--reverse > * {
  direction: ltr;
}

/* Content Column */
.platform-layout__content {
  max-width: 540px;
}

.platform-layout__eyebrow {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--gradient-platform-subtle);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--unicorn-purple);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-lg);
}

.platform-layout__title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
}

.platform-layout__title-gradient {
  background: var(--gradient-magic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.platform-layout__description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.platform-layout__features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.platform-layout__feature {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.platform-layout__feature-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-magic);
  border-radius: 50%;
  font-size: 0.75rem;
}

.platform-layout__feature-text {
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Visual Column */
.platform-layout__visual {
  position: relative;
}

.platform-layout__image-wrapper {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-card-platform);
}

.platform-layout__image {
  width: 100%;
  height: auto;
  display: block;
}

/* Decorative elements */
.platform-layout__visual::before {
  content: '';
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  background: var(--gradient-magic);
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(40px);
}

.platform-layout__visual::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: -30px;
  width: 150px;
  height: 150px;
  background: var(--unicorn-blue);
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(50px);
}

/* Floating badge */
.platform-layout__badge {
  position: absolute;
  bottom: -20px;
  right: 20px;
  background: var(--dark-surface);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.platform-layout__badge-value {
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--gradient-magic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.platform-layout__badge-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .platform-layout {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }

  .platform-layout--reverse {
    direction: ltr;
  }

  .platform-layout__content {
    max-width: 100%;
    text-align: center;
  }

  .platform-layout__features {
    align-items: center;
  }

  .platform-layout__feature {
    justify-content: center;
    text-align: left;
    max-width: 400px;
  }
}
```

### 4.2 Alternating Feature Sections

```css
/* ===== ALTERNATING FEATURE SECTIONS ===== */
.alternating-features {
  padding: var(--spacing-4xl) 0;
}

.alternating-feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
  padding: var(--spacing-3xl) 0;
}

/* Even items reverse */
.alternating-feature:nth-child(even) {
  direction: rtl;
}

.alternating-feature:nth-child(even) > * {
  direction: ltr;
}

/* Content */
.alternating-feature__content {
  padding: var(--spacing-xl);
}

.alternating-feature__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--gradient-magic);
  border-radius: 50%;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-bg);
  margin-bottom: var(--spacing-lg);
}

.alternating-feature__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.alternating-feature__description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

/* Visual */
.alternating-feature__visual {
  position: relative;
  background: var(--surface-elevated);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Connecting line between features */
.alternating-features::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(182, 110, 255, 0.3) 20%,
    rgba(0, 212, 255, 0.3) 80%,
    transparent 100%
  );
  transform: translateX(-50%);
}

/* Responsive */
@media (max-width: 1024px) {
  .alternating-feature {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .alternating-feature:nth-child(even) {
    direction: ltr;
  }

  .alternating-features::before {
    display: none;
  }
}
```

### 4.3 Hero Variations

```css
/* ===== HERO VARIATIONS ===== */

/* Base Hero */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: var(--spacing-4xl) var(--spacing-lg);
}

/* Centered Hero (Default) */
.hero--centered {
  text-align: center;
  align-items: center;
}

.hero--centered .hero__content {
  max-width: 800px;
}

/* Split Hero (Text + Visual) */
.hero--split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: var(--spacing-3xl);
}

.hero--split .hero__content {
  max-width: 540px;
}

/* Minimal Hero (Page headers) */
.hero--minimal {
  min-height: 50vh;
  text-align: center;
  align-items: center;
}

.hero--minimal .hero__title {
  font-size: var(--font-size-2xl);
}

/* Command Center Hero */
.hero--command {
  background: var(--gradient-command);
}

.hero--command::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 49.9%, rgba(0, 255, 136, 0.03) 50%, transparent 50.1%),
    linear-gradient(transparent 49.9%, rgba(0, 255, 136, 0.03) 50%, transparent 50.1%);
  background-size: 50px 50px;
  animation: gridPan 20s linear infinite;
}

@keyframes gridPan {
  from { transform: translateY(0); }
  to { transform: translateY(50px); }
}

/* Platform Hero */
.hero--platform {
  background: radial-gradient(
    ellipse at center top,
    rgba(182, 110, 255, 0.15) 0%,
    transparent 50%
  );
}

/* Hero Content */
.hero__eyebrow {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: var(--gradient-platform-subtle);
  border: 1px solid rgba(182, 110, 255, 0.2);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--unicorn-purple);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-lg);
}

.hero__title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
}

.hero__title-gradient {
  background: var(--gradient-magic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.hero--centered .hero__actions {
  justify-content: center;
}

/* Hero Visual */
.hero__visual {
  position: relative;
}

.hero__visual-main {
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card-platform);
  overflow: hidden;
}

/* Floating Elements */
.hero__float {
  position: absolute;
  background: var(--surface-glass);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  animation: float 6s ease-in-out infinite;
}

.hero__float--1 {
  top: 10%;
  right: -10%;
  animation-delay: 0s;
}

.hero__float--2 {
  bottom: 20%;
  left: -10%;
  animation-delay: 2s;
}

.hero__float--3 {
  top: 50%;
  right: -5%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

/* Responsive */
@media (max-width: 1024px) {
  .hero--split {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero--split .hero__content {
    max-width: 100%;
    order: 1;
  }

  .hero--split .hero__visual {
    order: 2;
  }

  .hero--split .hero__actions {
    justify-content: center;
  }

  .hero__float {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: calc(80px + var(--spacing-2xl)) var(--spacing-md) var(--spacing-2xl);
  }

  .hero__actions {
    flex-direction: column;
    width: 100%;
  }

  .hero__actions .btn {
    width: 100%;
  }
}
```

---

## 5. Section Dividers

```css
/* ===== SECTION DIVIDERS ===== */

/* Gradient Line */
.divider-gradient {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--unicorn-purple) 30%,
    var(--unicorn-blue) 70%,
    transparent 100%
  );
  margin: var(--spacing-3xl) 0;
}

/* Glowing Orb */
.divider-orb {
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider-orb::before {
  content: '';
  width: 10px;
  height: 10px;
  background: var(--gradient-magic);
  border-radius: 50%;
  box-shadow: var(--shadow-magical-lg);
}

.divider-orb::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(182, 110, 255, 0.3) 40%,
    transparent 50%,
    rgba(0, 212, 255, 0.3) 60%,
    transparent 100%
  );
}

/* Wave Divider */
.divider-wave {
  height: 80px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23121212'/%3E%3C/svg%3E");
  background-size: cover;
  background-position: center;
}

/* Diagonal Stripe */
.divider-diagonal {
  height: 100px;
  background: linear-gradient(
    -5deg,
    var(--dark-bg) 49.5%,
    var(--dark-surface) 49.5%
  );
}

/* Terminal Line */
.divider-terminal {
  position: relative;
  padding: var(--spacing-lg) 0;
  text-align: center;
}

.divider-terminal::before {
  content: '// ----------------------------------------';
  font-family: monospace;
  color: rgba(0, 255, 136, 0.3);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
}

/* Dots Divider */
.divider-dots {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-2xl) 0;
}

.divider-dots::before,
.divider-dots::after,
.divider-dots span {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gradient-magic);
  opacity: 0.5;
}

.divider-dots::before { opacity: 0.3; }
.divider-dots span { opacity: 0.5; }
.divider-dots::after { opacity: 0.3; }
```

---

## 6. Command Center Aesthetic Elements

```css
/* ===== COMMAND CENTER ELEMENTS ===== */

/* Terminal Window */
.terminal-window {
  background: var(--dark-bg);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(0, 255, 136, 0.2);
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.1);
}

.terminal-window__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(0, 255, 136, 0.05);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
}

.terminal-window__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-window__dot--red { background: var(--command-red); }
.terminal-window__dot--yellow { background: var(--command-amber); }
.terminal-window__dot--green { background: var(--command-green); }

.terminal-window__title {
  flex: 1;
  text-align: center;
  font-family: monospace;
  font-size: 0.8rem;
  color: rgba(0, 255, 136, 0.6);
}

.terminal-window__body {
  padding: var(--spacing-lg);
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.9rem;
  color: var(--command-green);
  min-height: 200px;
}

.terminal-window__line {
  display: flex;
  margin-bottom: var(--spacing-xs);
}

.terminal-window__prompt {
  color: var(--unicorn-purple);
  margin-right: var(--spacing-sm);
}

.terminal-window__cursor {
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background: var(--command-green);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

/* Status Indicator */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
}

.status-indicator__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: statusPulse 2s infinite;
}

.status-indicator__dot--active {
  background: var(--command-green);
  box-shadow: 0 0 10px var(--command-green);
}

.status-indicator__dot--warning {
  background: var(--command-amber);
  box-shadow: 0 0 10px var(--command-amber);
}

.status-indicator__dot--error {
  background: var(--command-red);
  box-shadow: 0 0 10px var(--command-red);
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Data Grid */
.data-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.data-grid__cell {
  background: var(--dark-surface);
  padding: var(--spacing-lg);
  text-align: center;
}

.data-grid__value {
  font-size: 2rem;
  font-weight: 700;
  font-family: monospace;
  background: var(--gradient-magic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.data-grid__label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: var(--spacing-xs);
}

/* Scan Lines Effect */
.scanlines {
  position: relative;
}

.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
}

/* Holographic Effect */
.holographic {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(182, 110, 255, 0.1),
    rgba(0, 212, 255, 0.1),
    rgba(0, 255, 136, 0.1)
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.holographic::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 70%
  );
  animation: holographicShine 3s ease-in-out infinite;
}

@keyframes holographicShine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## 7. Utility Classes

```css
/* ===== UTILITY CLASSES ===== */

/* Text Gradients */
.text-gradient {
  background: var(--gradient-magic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.text-gradient-platform { background: var(--gradient-platform); }
.text-gradient-accelerator { background: var(--gradient-accelerator); }
.text-gradient-consulting { background: var(--gradient-consulting); }

/* Background Utilities */
.bg-surface { background: var(--dark-surface); }
.bg-elevated { background: var(--surface-elevated); }
.bg-overlay { background: var(--surface-overlay); }
.bg-glass {
  background: var(--surface-glass);
  backdrop-filter: blur(10px);
}

/* Glow Utilities */
.glow-purple { box-shadow: var(--shadow-purple-glow); }
.glow-blue { box-shadow: var(--shadow-blue-glow); }
.glow-green { box-shadow: var(--shadow-green-glow); }
.glow-magical { box-shadow: var(--shadow-magical); }

/* Border Utilities */
.border-subtle { border: 1px solid rgba(255, 255, 255, 0.06); }
.border-glow { border: 1px solid rgba(182, 110, 255, 0.3); }
.border-gradient {
  border: 1px solid transparent;
  background-image: linear-gradient(var(--dark-surface), var(--dark-surface)), var(--gradient-magic);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

/* Spacing Utilities */
.section-sm { padding: var(--section-padding-sm); }
.section-md { padding: var(--section-padding-md); }
.section-lg { padding: var(--section-padding-lg); }
.section-xl { padding: var(--section-padding-xl); }

/* Container Widths */
.container-sm { max-width: var(--container-sm); margin: 0 auto; }
.container-md { max-width: var(--container-md); margin: 0 auto; }
.container-lg { max-width: var(--container-lg); margin: 0 auto; }
.container-xl { max-width: var(--container-xl); margin: 0 auto; }
.container-2xl { max-width: var(--container-2xl); margin: 0 auto; }

/* Visibility */
.hidden { display: none !important; }
.visible { visibility: visible !important; }
.invisible { visibility: hidden !important; }

/* Overflow */
.overflow-hidden { overflow: hidden; }
.overflow-visible { overflow: visible; }

/* Position */
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }

/* Z-index */
.z-base { z-index: var(--z-base); }
.z-dropdown { z-index: var(--z-dropdown); }
.z-sticky { z-index: var(--z-sticky); }
.z-modal { z-index: var(--z-modal); }
```

---

## 8. Implementation Notes

### File Organization

```
src/styles/
  shared/
    variables.css      <- Add new variables here
    Cards.css          <- Existing card styles
    animations.css     <- NEW: Animation keyframes and utilities
    layout.css         <- NEW: Layout patterns
  components/
    PlatformCard.css   <- NEW: Platform card styles
    AcceleratorCard.css <- NEW: Accelerator card styles
    ConsultingCard.css <- NEW: Consulting card styles
    Timeline.css       <- NEW: Timeline component
    FeatureShowcase.css <- NEW: Feature showcase
    Dividers.css       <- NEW: Section dividers
    CommandCenter.css  <- NEW: Command center elements
  pages/
    Home.css
    Platforms.css      <- NEW: Platform page styles
    Accelerator.css    <- NEW: Accelerator page styles
    Consulting.css     <- NEW: Consulting page styles
```

### Import Order in main CSS

```css
/* 1. Variables (foundation) */
@import './shared/variables.css';

/* 2. Base/Reset */
@import './base/reset.css';

/* 3. Shared utilities */
@import './shared/animations.css';
@import './shared/layout.css';
@import './shared/Cards.css';
@import './shared/Dividers.css';

/* 4. Components */
@import './components/PlatformCard.css';
@import './components/AcceleratorCard.css';
@import './components/ConsultingCard.css';
@import './components/Timeline.css';
@import './components/FeatureShowcase.css';
@import './components/CommandCenter.css';

/* 5. Page-specific styles */
@import './pages/Home.css';
@import './pages/Platforms.css';
@import './pages/Accelerator.css';
@import './pages/Consulting.css';
```

---

## 9. Usage Examples

### Platform Card HTML

```html
<article class="platform-card scroll-reveal">
  <span class="platform-card__status platform-card__status--live">Live</span>
  <header class="platform-card__header">
    <div class="platform-card__icon">UC</div>
    <div>
      <h3 class="platform-card__title">Unicorn Commander</h3>
      <p class="platform-card__subtitle">AI Operations Platform</p>
    </div>
  </header>
  <p class="platform-card__content">
    Unified command center for AI workflows, agent orchestration,
    and intelligent automation across your entire stack.
  </p>
  <ul class="platform-card__features">
    <li class="platform-card__feature">Multi-agent coordination</li>
    <li class="platform-card__feature">Real-time monitoring</li>
    <li class="platform-card__feature">Custom workflows</li>
    <li class="platform-card__feature">Enterprise SSO</li>
  </ul>
  <div class="platform-card__actions">
    <a href="#" class="btn btn-primary">Launch Platform</a>
    <a href="#" class="btn btn-secondary">Learn More</a>
  </div>
</article>
```

### Two-Column Layout HTML

```html
<section class="platform-layout">
  <div class="platform-layout__content">
    <span class="platform-layout__eyebrow">Platform</span>
    <h2 class="platform-layout__title">
      Build with
      <span class="platform-layout__title-gradient">Unicorn Commander</span>
    </h2>
    <p class="platform-layout__description">
      The most powerful AI operations platform for teams who ship fast.
    </p>
    <div class="platform-layout__features">
      <div class="platform-layout__feature">
        <span class="platform-layout__feature-icon">✓</span>
        <span class="platform-layout__feature-text">Deploy AI agents in minutes</span>
      </div>
      <!-- More features -->
    </div>
    <div class="hero__actions">
      <a href="#" class="btn btn-primary">Get Started</a>
    </div>
  </div>
  <div class="platform-layout__visual">
    <div class="platform-layout__image-wrapper">
      <img src="platform-screenshot.png" alt="Platform" class="platform-layout__image">
    </div>
    <div class="platform-layout__badge">
      <span class="platform-layout__badge-value">99.9%</span>
      <span class="platform-layout__badge-label">Uptime</span>
    </div>
  </div>
</section>
```

---

This design system enhancement provides a comprehensive foundation for evolving MagicUnicorn.tech into a sophisticated technology studio website with platform showcases, accelerator sections, and command center aesthetics while maintaining consistency with the existing purple/blue gradient theme.
