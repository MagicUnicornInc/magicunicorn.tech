# MagicUnicorn.tech Component System - 2026 Edition

## Design System Architecture

### Philosophy
Our component system follows these core principles:
- **Composability**: Small, focused components that combine elegantly
- **Accessibility-First**: WCAG 2.1 AA compliance built-in
- **Performance**: Lazy loading, code splitting, optimized animations
- **Responsive**: Mobile-first with fluid scaling
- **Consistent**: Design tokens ensure visual harmony

---

## Design Tokens

### Color System
```css
/* Primary Palette */
--unicorn-purple: #b66eff;      /* Primary brand color */
--unicorn-blue: #00d4ff;        /* Secondary brand color */
--gradient-magic: linear-gradient(135deg, var(--unicorn-purple), var(--unicorn-blue));

/* Neutrals */
--dark-bg: #0a0a0a;             /* Primary background */
--dark-surface: #121212;        /* Card/surface background */
--text-primary: #ffffff;        /* Primary text */
--text-secondary: #b3b3b3;      /* Secondary text */

/* Status Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Typography Scale
```css
--font-size-xs: clamp(0.75rem, 0.8vw + 0.4rem, 0.875rem);
--font-size-sm: clamp(0.875rem, 0.9vw + 0.45rem, 1rem);
--font-size-base: clamp(1rem, 1vw + 0.5rem, 1.125rem);
--font-size-lg: clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem);
--font-size-xl: clamp(1.5rem, 2vw + 0.5rem, 2rem);
--font-size-2xl: clamp(2rem, 3vw + 0.5rem, 3rem);
--font-size-3xl: clamp(2.5rem, 4vw + 0.5rem, 4rem);
--font-size-4xl: clamp(3rem, 5vw + 0.5rem, 5rem);
```

### Spacing System
```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 1.5rem;   /* 24px */
--spacing-lg: 2rem;     /* 32px */
--spacing-xl: 3rem;     /* 48px */
--spacing-2xl: 4rem;    /* 64px */
--spacing-3xl: 6rem;    /* 96px */
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.2);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.4);
--shadow-magical: 0 0 20px rgba(182, 110, 255, 0.2);
--shadow-magical-lg: 0 0 40px rgba(182, 110, 255, 0.3);
```

### Transitions
```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
--transition-spring: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## Component Library

### 1. Button Component
**Variants**: primary, secondary, ghost, danger
**Sizes**: sm, md, lg, xl
**States**: default, hover, active, disabled, loading

**Usage**:
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Explore Magic
</Button>

<Button variant="secondary" size="md" loading>
  Processing...
</Button>
```

### 2. Card Component
**Variants**: base, elevated, interactive, gradient
**Features**: Hover effects, gradient borders, shadow transitions

**Usage**:
```jsx
<Card variant="interactive" hover="lift">
  <CardIcon><FaMagic /></CardIcon>
  <CardTitle>AI Solutions</CardTitle>
  <CardDescription>Intelligent systems that adapt</CardDescription>
</Card>
```

### 3. Input Components
**Types**: text, email, password, textarea, select
**States**: default, focus, error, success, disabled
**Features**: Floating labels, validation feedback, icon support

**Usage**:
```jsx
<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  leftIcon={<FaEnvelope />}
  required
/>
```

### 4. Container System
**Breakpoints**:
- Mobile: 0-640px
- Tablet: 641-1024px
- Desktop: 1025-1440px
- Wide: 1441px+

**Usage**:
```jsx
<Container maxWidth="lg" padding="responsive">
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="lg">
    {items.map(item => <GridItem key={item.id}>{item}</GridItem>)}
  </Grid>
</Container>
```

### 5. Loading Components
**Variants**: spinner, skeleton, pulse, progress

**Usage**:
```jsx
<Skeleton variant="card" count={3} />
<LoadingSpinner size="lg" />
<ProgressBar value={75} animated />
```

### 6. Navigation Components
**Features**:
- Scroll-aware transparency
- Active state indicators
- Mobile hamburger menu
- Smooth transitions

---

## Interaction Patterns

### Hover Effects
1. **Lift**: `transform: translateY(-4px)` + shadow increase
2. **Scale**: `transform: scale(1.02)`
3. **Glow**: Box-shadow with brand colors
4. **Shimmer**: Gradient animation overlay

### Focus States
- Keyboard navigation: 2px outline in brand color
- Tab order: Logical flow through interactive elements
- Skip links: Jump to main content

### Loading States
- Skeleton screens for content
- Spinners for actions
- Progress bars for uploads/downloads
- Shimmer effect for placeholders

### Error States
- Inline validation messages
- Error boundaries for crashes
- Toast notifications for system errors
- Retry mechanisms

---

## Responsive Strategy

### Mobile-First Approach
```css
/* Base styles for mobile */
.component { ... }

/* Tablet and up */
@media (min-width: 641px) { ... }

/* Desktop and up */
@media (min-width: 1025px) { ... }
```

### Touch Target Sizes
- Minimum: 44x44px for all interactive elements
- Spacing: 8px minimum between touch targets

### Viewport Units
- Use `dvh` (dynamic viewport height) for full-screen sections
- Clamp functions for fluid typography
- Container queries for component-level responsiveness

---

## Animation Guidelines

### Performance Rules
1. Only animate `transform` and `opacity` for 60fps
2. Use `will-change` sparingly and remove after animation
3. Reduce motion for accessibility: `prefers-reduced-motion`
4. Keep animations under 0.5s for micro-interactions

### Framer Motion Patterns
```jsx
// Entrance animation
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

// Hover effect
const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

// Stagger children
const container = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

## Accessibility Checklist

### Required for All Components
- [ ] Semantic HTML structure
- [ ] ARIA labels and roles where needed
- [ ] Keyboard navigation support
- [ ] Focus visible indicators
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Screen reader announcements
- [ ] Error messages associated with inputs
- [ ] Skip links for navigation

### Testing Tools
- axe DevTools
- Lighthouse accessibility audit
- Keyboard-only navigation test
- Screen reader test (VoiceOver/NVDA)

---

## File Structure

```
src/
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   └── Button.stories.jsx
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Container/
│   │   └── Loading/
│   ├── layout/                # Layout components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PageHeader.jsx
│   └── features/              # Feature-specific components
│       ├── ServiceOptions.jsx
│       └── PortfolioPreview.jsx
├── hooks/                     # Custom React hooks
│   ├── useMediaQuery.js
│   ├── useScrollPosition.js
│   └── useFormValidation.js
└── styles/
    ├── shared/
    │   ├── variables.css      # Design tokens
    │   ├── utilities.css      # Utility classes
    │   └── animations.css     # Reusable animations
    └── pages/                 # Page-specific styles
```

---

## Implementation Priority

### Phase 1: Foundation (Week 1)
1. Design tokens in CSS variables
2. Base typography system
3. Container and grid components
4. Button component library

### Phase 2: Forms & Inputs (Week 1)
1. Input components with validation
2. Form composition patterns
3. Error and success states
4. Loading indicators

### Phase 3: Advanced Components (Week 2)
1. Card variants
2. Navigation enhancements
3. Loading skeletons
4. Animation library

### Phase 4: Polish (Week 2)
1. Micro-interactions
2. Accessibility audit
3. Performance optimization
4. Documentation completion

---

## Code Quality Standards

### Component Template
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './ComponentName.css';

/**
 * ComponentName - Brief description
 * @param {Object} props - Component properties
 */
const ComponentName = ({
  variant = 'default',
  size = 'md',
  children,
  ...rest
}) => {
  return (
    <motion.div
      className={`component component--${variant} component--${size}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

ComponentName.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
};

export default ComponentName;
```

---

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 200KB initial (gzipped)

---

## Next Steps

1. Implement design token system in `/src/styles/shared/tokens.css`
2. Create base UI components in `/src/components/ui/`
3. Build custom hooks for common patterns
4. Document each component with examples
5. Conduct accessibility and performance audits
6. Refactor existing pages to use new component system

---

*Last Updated: 2025-10-10*
*Version: 2.0.0*
