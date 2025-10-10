import React, { useEffect, useRef, useState } from 'react';
import './ParticleSystem.css';

// Particle class
class Particle {
  constructor(x, y, canvasWidth, canvasHeight) {
    this.id = Math.random().toString(36);
    this.x = x;
    this.y = y;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // Random velocity with slight upward bias
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.7) * 0.5; // Bias upward

    // Visual properties
    this.size = Math.random() > 0.7 ? 4 : Math.random() > 0.4 ? 3 : 2;
    this.color = this.randomColor();
    this.opacity = 0.4 + Math.random() * 0.4;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.02 + Math.random() * 0.03;
    this.glowIntensity = 5 + Math.random() * 5;
  }

  randomColor() {
    const rand = Math.random();
    if (rand < 0.7) return 'rgba(182, 110, 255, 0.6)'; // Purple
    if (rand < 0.95) return 'rgba(0, 212, 255, 0.6)'; // Blue
    return 'rgba(255, 215, 0, 0.4)'; // Gold (rare)
  }

  update(mousePos) {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Update pulse animation
    this.pulsePhase += this.pulseSpeed;

    // Mouse interaction
    if (mousePos) {
      const dx = mousePos.x - this.x;
      const dy = mousePos.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100 * 0.5;
        this.vx += (dx / distance) * force * 0.02;
        this.vy += (dy / distance) * force * 0.02;
      }
    }

    // Boundary wrapping
    if (this.x < -10) this.x = this.canvasWidth + 10;
    if (this.x > this.canvasWidth + 10) this.x = -10;
    if (this.y < -10) this.y = this.canvasHeight + 10;
    if (this.y > this.canvasHeight + 10) this.y = -10;

    // Velocity damping
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// Data pulse class
class DataPulse {
  constructor(startParticle, endParticle) {
    this.startParticle = startParticle;
    this.endParticle = endParticle;
    this.progress = 0;
    this.speed = 0.015 + Math.random() * 0.01;
  }

  update() {
    this.progress += this.speed;
  }

  getPosition() {
    return {
      x: this.startParticle.x + (this.endParticle.x - this.startParticle.x) * this.progress,
      y: this.startParticle.y + (this.endParticle.y - this.startParticle.y) * this.progress
    };
  }
}

// Spatial hash for performance optimization
class SpatialHash {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.grid = new Map();
  }

  getKey(x, y) {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX},${cellY}`;
  }

  insert(particle) {
    const key = this.getKey(particle.x, particle.y);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key).push(particle);
  }

  getNearby(particle) {
    const nearby = [];
    const centerKey = this.getKey(particle.x, particle.y);
    const [cx, cy] = centerKey.split(',').map(Number);

    // Check surrounding cells
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const key = `${cx + dx},${cy + dy}`;
        const particles = this.grid.get(key);
        if (particles) {
          nearby.push(...particles);
        }
      }
    }

    return nearby;
  }

  clear() {
    this.grid.clear();
  }
}

// Main Particle System Component
const ParticleSystem = ({ particleCount }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pulsesRef = useRef([]);
  const spatialHashRef = useRef(null);
  const mousePosRef = useRef(null);
  const animationRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Get responsive particle count
  const getParticleCount = () => {
    if (particleCount) return particleCount;
    const width = window.innerWidth;
    if (width < 768) return 30;
    if (width < 1024) return 50;
    return 80;
  };

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Initialize particles
    const count = getParticleCount();
    spatialHashRef.current = new SpatialHash(150);
    particlesRef.current = [];

    for (let i = 0; i < count; i++) {
      particlesRef.current.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          canvas.width,
          canvas.height
        )
      );
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update spatial hash
      spatialHashRef.current.clear();
      particlesRef.current.forEach(p => spatialHashRef.current.insert(p));

      // Update and render particles
      particlesRef.current.forEach(particle => {
        particle.update(mousePosRef.current);
        renderParticle(ctx, particle);
      });

      // Draw connections
      drawConnections(ctx);

      // Update and render data pulses
      updateDataPulses(ctx);

      animationRef.current = requestAnimationFrame(animate);
    };

    const renderParticle = (ctx, particle) => {
      const { x, y, size, color, opacity, pulsePhase, glowIntensity } = particle;

      // Pulsing scale
      const scale = 0.9 + Math.sin(pulsePhase) * 0.1;
      const finalSize = size * scale;

      // Glow effect
      ctx.shadowBlur = glowIntensity;
      ctx.shadowColor = color;

      // Draw particle
      ctx.beginPath();
      ctx.arc(x, y, finalSize, 0, Math.PI * 2);
      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${opacity})`);
      ctx.fill();

      // Reset shadow
      ctx.shadowBlur = 0;
    };

    const drawConnections = (ctx) => {
      const rendered = new Set();

      particlesRef.current.forEach(p1 => {
        const nearby = spatialHashRef.current.getNearby(p1);
        let connectionCount = 0;

        nearby.forEach(p2 => {
          if (p1 === p2 || connectionCount >= 3) return;

          const key = [p1.id, p2.id].sort().join('-');
          if (rendered.has(key)) return;

          const distance = p1.distanceTo(p2);
          if (distance < 150) {
            renderConnection(ctx, p1, p2, distance);
            rendered.add(key);
            connectionCount++;

            // Spawn data pulse occasionally
            if (Math.random() < 0.002) {
              pulsesRef.current.push(new DataPulse(p1, p2));
            }
          }
        });
      });
    };

    const renderConnection = (ctx, p1, p2, distance) => {
      const opacity = 0.3 * (1 - distance / 150);

      // Create gradient line
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      gradient.addColorStop(0, p1.color);
      gradient.addColorStop(1, p2.color);

      // Glow
      ctx.shadowBlur = 5;
      ctx.shadowColor = p1.color;

      // Draw line
      ctx.strokeStyle = gradient;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Reset
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const updateDataPulses = (ctx) => {
      pulsesRef.current = pulsesRef.current.filter(pulse => {
        pulse.update();
        renderDataPulse(ctx, pulse);
        return pulse.progress < 1;
      });
    };

    const renderDataPulse = (ctx, pulse) => {
      const { x, y } = pulse.getPosition();

      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    // Start animation
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [prefersReducedMotion, particleCount]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="particle-system-canvas"
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default ParticleSystem;
