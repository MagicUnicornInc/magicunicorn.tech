# "Steal These Ideas" - MagicUnicorn.tech Implementation Guide
**Ready-to-Use Code Snippets from 2026 Trends Research**
**Priority**: Immediate Implementation
**Difficulty**: Beginner to Intermediate

---

## Table of Contents
1. [Glassmorphism Components](#1-glassmorphism-components)
2. [Scroll-Based Animations](#2-scroll-based-animations)
3. [Magnetic Interactions](#3-magnetic-interactions)
4. [Network Visualizations](#4-network-visualizations)
5. [Variable Typography](#5-variable-typography)
6. [Micro-interactions](#6-micro-interactions)
7. [Loading States](#7-loading-states)
8. [Dark Mode Toggle](#8-dark-mode-toggle)
9. [Performance Utilities](#9-performance-utilities)
10. [Accessibility Helpers](#10-accessibility-helpers)

---

## 1. Glassmorphism Components

### 1.1 Glass Card Component

**Difficulty**: ⭐ Beginner
**Files**: `components/GlassCard.jsx`, `styles/glass.css`

```jsx
// components/GlassCard.jsx
import { motion } from 'framer-motion';
import './glass.css';

export const GlassCard = ({
  children,
  className = '',
  hover = true,
  ...props
}) => {
  const hoverAnimation = hover ? {
    scale: 1.02,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
  } : {};

  return (
    <motion.div
      className={`glass-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Usage Example:
// <GlassCard>
//   <h3>Feature Title</h3>
//   <p>Feature description goes here.</p>
// </GlassCard>
```

```css
/* styles/glass.css */
.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

/* Subtle gradient overlay for depth */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
}

/* Performance fallback for mobile */
@media (max-width: 768px) {
  .glass-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
}

/* Disable glass on low-performance devices */
@media (prefers-reduced-motion: reduce) {
  .glass-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: rgba(255, 255, 255, 0.1);
  }
}
```

### 1.2 Glass Navigation Bar

**Difficulty**: ⭐⭐ Intermediate
**Files**: `components/GlassNav.jsx`

```jsx
// components/GlassNav.jsx
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const GlassNav = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className="glass-nav"
      initial={{ y: -100 }}
      animate={{
        y: 0,
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        background: isScrolled
          ? 'rgba(10, 10, 15, 0.8)'
          : 'rgba(10, 10, 15, 0.4)'
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.nav>
  );
};
```

```css
/* Add to glass.css */
.glass-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  will-change: transform, backdrop-filter;
}
```

---

## 2. Scroll-Based Animations

### 2.1 Fade-In on Scroll (Staggered)

**Difficulty**: ⭐⭐ Intermediate
**Files**: `components/FadeInGrid.jsx`

```jsx
// components/FadeInGrid.jsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const FadeInGrid = ({ items, columns = 3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px" // Trigger before element is fully in view
  });

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={`grid grid-cols-1 md:grid-cols-${columns} gap-8`}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id || index}
          variants={item}
          className="glass-card"
        >
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Usage:
// const features = [
//   { id: 1, content: <Feature1 /> },
//   { id: 2, content: <Feature2 /> },
//   { id: 3, content: <Feature3 /> }
// ];
// <FadeInGrid items={features} columns={3} />
```

### 2.2 Parallax Section with GSAP

**Difficulty**: ⭐⭐⭐ Advanced
**Files**: `components/ParallaxSection.jsx`

```jsx
// components/ParallaxSection.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxSection = ({ children, speed = 0.5 }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    gsap.to(content, {
      y: () => section.offsetHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className="parallax-section">
      <div ref={contentRef} className="parallax-content">
        {children}
      </div>
    </div>
  );
};

// Usage:
// <ParallaxSection speed={0.3}>
//   <h2>This moves slower than scroll</h2>
// </ParallaxSection>
```

```css
.parallax-section {
  position: relative;
  overflow: hidden;
}

.parallax-content {
  will-change: transform;
}
```

### 2.3 Scroll Progress Indicator

**Difficulty**: ⭐ Beginner
**Files**: `components/ScrollProgress.jsx`

```jsx
// components/ScrollProgress.jsx
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
};
```

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #7c3aed, #ec4899);
  transform-origin: 0%;
  z-index: 9999;
}
```

---

## 3. Magnetic Interactions

### 3.1 Magnetic Button

**Difficulty**: ⭐⭐ Intermediate
**Files**: `components/MagneticButton.jsx`

```jsx
// components/MagneticButton.jsx
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const MagneticButton = ({
  children,
  strength = 0.3,
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    // Calculate distance from center
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;

    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      className={`magnetic-button ${className}`}
      {...props}
    >
      <span className="magnetic-button-content">
        {children}
      </span>
    </motion.button>
  );
};
```

```css
.magnetic-button {
  position: relative;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
  transition: box-shadow 0.3s ease;
  overflow: hidden;
}

.magnetic-button:hover {
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
}

.magnetic-button-content {
  position: relative;
  z-index: 1;
}

/* Shine effect on hover */
.magnetic-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.magnetic-button:hover::before {
  left: 100%;
}
```

### 3.2 Magnetic Card Lift

**Difficulty**: ⭐⭐ Intermediate

```jsx
// Add to any card component
import { motion } from 'framer-motion';

export const MagneticCard = ({ children }) => {
  return (
    <motion.div
      className="glass-card"
      whileHover={{
        y: -10,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
};
```

---

## 4. Network Visualizations

### 4.1 Simple Network Graph (D3.js)

**Difficulty**: ⭐⭐⭐ Advanced
**Files**: `components/NetworkGraph.jsx`

```jsx
// components/NetworkGraph.jsx
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const NetworkGraph = ({ nodes, links }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!nodes || !links) return;

    const width = 800;
    const height = 600;

    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Draw links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'rgba(124, 58, 237, 0.3)')
      .attr('stroke-width', 2);

    // Draw nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 12)
      .attr('fill', '#7c3aed')
      .attr('stroke', '#ec4899')
      .attr('stroke-width', 2)
      .call(drag(simulation));

    // Add labels
    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.label)
      .attr('font-size', 10)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('dy', -15);

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    return () => simulation.stop();
  }, [nodes, links]);

  return (
    <div className="network-graph-container">
      <svg ref={svgRef} className="network-graph" />
    </div>
  );
};

// Drag behavior
function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}

// Usage Example:
// const nodes = [
//   { id: 'agent1', label: 'Researcher' },
//   { id: 'agent2', label: 'Coder' },
//   { id: 'agent3', label: 'Tester' }
// ];
//
// const links = [
//   { source: 'agent1', target: 'agent2' },
//   { source: 'agent2', target: 'agent3' }
// ];
//
// <NetworkGraph nodes={nodes} links={links} />
```

```css
.network-graph-container {
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(10, 10, 15, 0.5);
}

.network-graph {
  display: block;
}
```

### 4.2 Animated Connection Lines

**Difficulty**: ⭐⭐ Intermediate

```jsx
// components/AnimatedConnection.jsx
import { motion } from 'framer-motion';

export const AnimatedConnection = ({ from, to }) => {
  return (
    <svg className="connection-line">
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="url(#gradient)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
};
```

---

## 5. Variable Typography

### 5.1 Setup Variable Fonts

**Difficulty**: ⭐ Beginner
**Files**: `styles/typography.css`, `public/fonts/`

```css
/* styles/typography.css */

/* 1. Add variable font */
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}

/* 2. Define CSS variables */
:root {
  --font-sans: 'InterVariable', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Fluid type scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
  --text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);
  --text-6xl: clamp(3.75rem, 3rem + 3.75vw, 6rem);
  --text-7xl: clamp(4.5rem, 3.5rem + 5vw, 7rem);
}

/* 3. Apply to elements */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.6;
  font-weight: 400;
  font-variation-settings: 'wght' 400;
}

h1 {
  font-size: var(--text-6xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-variation-settings: 'wght' 800;
}

h2 {
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  font-variation-settings: 'wght' 700;
}

h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.3;
  font-variation-settings: 'wght' 600;
}

code, pre {
  font-family: var(--font-mono);
  font-size: 0.9em;
}
```

### 5.2 Animated Variable Weight

**Difficulty**: ⭐⭐ Intermediate

```jsx
// components/AnimatedHeading.jsx
import { motion } from 'framer-motion';

export const AnimatedHeading = ({ children, level = 1 }) => {
  const Tag = `h${level}`;

  return (
    <motion.div
      initial={{ fontVariationSettings: "'wght' 300" }}
      animate={{ fontVariationSettings: "'wght' 800" }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ fontFamily: 'InterVariable' }}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
};
```

---

## 6. Micro-interactions

### 6.1 Button States

**Difficulty**: ⭐ Beginner

```jsx
// components/InteractiveButton.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

export const InteractiveButton = ({ children, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <motion.button
      className="interactive-button"
      onClick={handleClick}
      disabled={isLoading || isSuccess}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      {isLoading && <Spinner />}
      {isSuccess && <CheckIcon />}
      {!isLoading && !isSuccess && children}
    </motion.button>
  );
};

const Spinner = () => (
  <motion.div
    className="spinner"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);

const CheckIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}
  >
    <motion.path
      d="M5 13l4 4L19 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.svg>
);
```

### 6.2 Toggle Switch

**Difficulty**: ⭐ Beginner

```jsx
// components/Toggle.jsx
import { motion } from 'framer-motion';

export const Toggle = ({ isOn, onToggle, label }) => {
  return (
    <button
      className="toggle-container"
      onClick={onToggle}
      aria-checked={isOn}
      role="switch"
    >
      {label && <span className="toggle-label">{label}</span>}
      <motion.div
        className="toggle-track"
        animate={{
          backgroundColor: isOn ? '#7c3aed' : '#374151'
        }}
      >
        <motion.div
          className="toggle-thumb"
          animate={{ x: isOn ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </button>
  );
};
```

```css
.toggle-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.toggle-track {
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  padding: 2px;
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

---

## 7. Loading States

### 7.1 Skeleton Screen

**Difficulty**: ⭐ Beginner

```jsx
// components/Skeleton.jsx
import { motion } from 'framer-motion';

export const Skeleton = ({ width = '100%', height = '1rem', borderRadius = '4px' }) => {
  return (
    <motion.div
      className="skeleton"
      style={{ width, height, borderRadius }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Usage:
// <Skeleton width="200px" height="24px" />
// <Skeleton width="100%" height="100px" />
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### 7.2 Progress Bar

**Difficulty**: ⭐ Beginner

```jsx
// components/ProgressBar.jsx
import { motion } from 'framer-motion';

export const ProgressBar = ({ progress = 0, height = '4px' }) => {
  return (
    <div className="progress-container" style={{ height }}>
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};
```

```css
.progress-container {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #ec4899);
  border-radius: 2px;
}
```

---

## 8. Dark Mode Toggle

### 8.1 Theme Provider

**Difficulty**: ⭐⭐ Intermediate

```jsx
// context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage
    const stored = localStorage.getItem('theme');
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'dark'; // Default to dark for tech audience
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

```css
/* styles/themes.css */

/* Dark theme (default) */
:root[data-theme="dark"] {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
}

/* Light theme */
:root[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #4b5563;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s ease, color 0.3s ease;
}
```

### 8.2 Theme Toggle Button

**Difficulty**: ⭐ Beginner

```jsx
// components/ThemeToggle.jsx
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.div>
    </button>
  );
};

const MoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
```

---

## 9. Performance Utilities

### 9.1 Feature Detection

**Difficulty**: ⭐ Beginner

```javascript
// utils/featureDetection.js

export const supportsBackdropFilter = () => {
  return CSS.supports('backdrop-filter', 'blur(10px)') ||
         CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
};

export const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

export const isHighPerformanceDevice = () => {
  // Check for hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return false;
  }

  // Check for device memory (if available)
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    return false;
  }

  return true;
};

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Usage:
// import { supportsBackdropFilter, isHighPerformanceDevice } from './utils/featureDetection';
//
// const shouldUseGlass = supportsBackdropFilter() && isHighPerformanceDevice();
```

### 9.2 Lazy Load Component

**Difficulty**: ⭐⭐ Intermediate

```jsx
// components/LazyLoad.jsx
import { Suspense, lazy } from 'react';
import { Skeleton } from './Skeleton';

export const lazyLoad = (importFunc, fallback = <Skeleton />) => {
  const LazyComponent = lazy(importFunc);

  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Usage:
// const NetworkGraph = lazyLoad(
//   () => import('./NetworkGraph'),
//   <Skeleton width="800px" height="600px" />
// );
```

---

## 10. Accessibility Helpers

### 10.1 Keyboard Navigation Hook

**Difficulty**: ⭐⭐ Intermediate

```jsx
// hooks/useKeyboardNav.js
import { useEffect } from 'react';

export const useKeyboardNav = (ref, onEscape, onEnter) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
      }
      if (e.key === 'Enter' && onEnter) {
        onEnter();
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      return () => element.removeEventListener('keydown', handleKeyDown);
    }
  }, [ref, onEscape, onEnter]);
};

// Usage:
// const modalRef = useRef();
// useKeyboardNav(modalRef, closeModal, submitForm);
```

### 10.2 Focus Trap (for Modals)

**Difficulty**: ⭐⭐ Intermediate

```jsx
// hooks/useFocusTrap.js
import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    // Focus first element
    firstElement?.focus();

    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  }, [isActive]);

  return containerRef;
};

// Usage in Modal:
// const modalRef = useFocusTrap(isOpen);
// <div ref={modalRef}>Modal content</div>
```

---

## Quick Start Checklist

### Phase 1: Foundation (Day 1)
- [ ] Install dependencies: `npm install framer-motion gsap d3`
- [ ] Add variable font to `/public/fonts/`
- [ ] Create `styles/glass.css` with glassmorphism styles
- [ ] Set up `styles/typography.css` with variable font
- [ ] Create `context/ThemeContext.jsx` for dark mode

### Phase 2: Core Components (Day 2-3)
- [ ] Build `GlassCard` component
- [ ] Build `MagneticButton` component
- [ ] Build `FadeInGrid` for scroll animations
- [ ] Build `ScrollProgress` indicator
- [ ] Build `ThemeToggle` component

### Phase 3: Advanced (Day 4-5)
- [ ] Implement `NetworkGraph` for visualizations
- [ ] Add `ParallaxSection` with GSAP
- [ ] Create loading states (Skeleton, ProgressBar)
- [ ] Add micro-interactions to all buttons/cards
- [ ] Implement focus trap for modals

### Phase 4: Polish (Day 6-7)
- [ ] Performance audit (feature detection, lazy loading)
- [ ] Accessibility audit (keyboard nav, ARIA labels)
- [ ] Cross-browser testing
- [ ] Mobile optimization
- [ ] Final QA and bug fixes

---

## Installation Commands

```bash
# 1. Install core dependencies
npm install framer-motion gsap d3

# 2. Install dev dependencies (if needed)
npm install --save-dev @types/d3

# 3. Download Inter Variable font
# Visit: https://rsms.me/inter/
# Download: Inter-Variable.woff2
# Place in: public/fonts/

# 4. Optional: Install Tailwind CSS (if not already)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## Testing Your Implementation

```jsx
// Create test page: pages/test-components.jsx

import { GlassCard } from '../components/GlassCard';
import { MagneticButton } from '../components/MagneticButton';
import { FadeInGrid } from '../components/FadeInGrid';
import { NetworkGraph } from '../components/NetworkGraph';

export default function TestComponents() {
  const items = [
    { id: 1, content: <div>Card 1</div> },
    { id: 2, content: <div>Card 2</div> },
    { id: 3, content: <div>Card 3</div> }
  ];

  const nodes = [
    { id: 'a', label: 'Node A' },
    { id: 'b', label: 'Node B' },
    { id: 'c', label: 'Node C' }
  ];

  const links = [
    { source: 'a', target: 'b' },
    { source: 'b', target: 'c' }
  ];

  return (
    <div className="test-page">
      <section>
        <h2>Glass Card</h2>
        <GlassCard>
          <h3>Test Card</h3>
          <p>This is a test of the glassmorphism effect.</p>
        </GlassCard>
      </section>

      <section>
        <h2>Magnetic Button</h2>
        <MagneticButton>Hover Me!</MagneticButton>
      </section>

      <section>
        <h2>Fade In Grid</h2>
        <FadeInGrid items={items} />
      </section>

      <section>
        <h2>Network Graph</h2>
        <NetworkGraph nodes={nodes} links={links} />
      </section>
    </div>
  );
}
```

---

## Troubleshooting

### Glassmorphism not working?
1. Check browser support: `backdrop-filter` not supported in Firefox < 103
2. Ensure parent container has background (not transparent)
3. Test without `-webkit-` prefix on non-Safari browsers
4. Try increasing blur amount (20px minimum for visible effect)

### Animations laggy?
1. Use `transform` and `opacity` only (GPU-accelerated)
2. Add `will-change: transform` to animated elements
3. Reduce particle count or blur radius
4. Check for layout thrashing (batch DOM reads/writes)

### Font not loading?
1. Verify font file path is correct
2. Check font-display is set to `swap`
3. Ensure CORS headers allow font loading
4. Test with browser dev tools network tab

---

**You now have everything needed to implement 2026-level design trends!**

**Start with Phase 1 and build incrementally. Test on mobile frequently.**

**Questions? Reference the main trends research document for context.**
