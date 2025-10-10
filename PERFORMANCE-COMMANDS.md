# Performance Optimization Commands Quick Reference

Quick reference for all performance-related commands and scripts.

---

## 🔧 Development Commands

### Build & Preview
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Build Analysis
```bash
# Build with detailed analysis
./scripts/build-and-analyze.sh

# View bundle visualization (after build)
open dist/stats.html

# Check bundle sizes manually
ls -lh dist/assets/js/*.js
ls -lh dist/assets/js/*.js.gz
```

---

## 🖼️ Image Optimization

### Optimize All Images
```bash
# Install sharp-cli (one-time)
npm install -g sharp-cli

# Run optimization script
./scripts/optimize-images.sh

# View results
ls -lh public/portfolio-assets/optimized/
ls -lh public/portfolio-assets/webp/
```

### Manual Image Optimization
```bash
# Compress single image
sharp -i input.jpg -o output.jpg --quality 85 --progressive

# Convert to WebP
sharp -i input.jpg -o output.webp --format webp --quality 85

# Create 2x version
sharp -i input.jpg -o output@2x.webp --format webp --quality 85 --resize 2000
```

---

## 🧪 Testing & Auditing

### Lighthouse Audit
```bash
# Option 1: Chrome DevTools
# Open DevTools → Lighthouse → Generate Report

# Option 2: Install Lighthouse CLI
npm install -g lighthouse

# Run audit on local preview
lighthouse http://localhost:4173 --view

# Run on production
lighthouse https://magicunicorn.tech --view

# Save results
lighthouse https://magicunicorn.tech --output html --output-path ./lighthouse-report.html
```

### Performance Testing
```bash
# Test on different network speeds
# Chrome DevTools → Network tab → Throttling

# Test Core Web Vitals
# Open DevTools → Console
# Check logs after page load (1 second delay)
```

---

## 📊 Monitoring & Analysis

### Check Bundle Sizes
```bash
# All JavaScript bundles
ls -lh dist/assets/js/*.js

# All CSS bundles
ls -lh dist/assets/css/*.css

# Compressed versions
ls -lh dist/assets/**/*.gz
ls -lh dist/assets/**/*.br

# Total size
du -sh dist/
```

### Verify Compression
```bash
# Count compressed files
find dist -name "*.gz" | wc -l
find dist -name "*.br" | wc -l

# Compare sizes
for file in dist/assets/js/*.js; do
  orig=$(stat -f%z "$file")
  gz=$(stat -f%z "${file}.gz")
  echo "$(basename $file): $((orig/1024))KB → $((gz/1024))KB"
done
```

---

## 🚀 Deployment

### Deploy to Hostinger
```bash
# Build production
npm run build

# Deploy (using existing script)
./scripts/deploy.sh

# Or manual SSH
ssh u721187998@46.202.198.233 -p 65002
# Path: domains/shafenkhan.com/public_html/
```

### Verify Deployment
```bash
# Check headers
curl -I https://magicunicorn.tech

# Check compression
curl -H "Accept-Encoding: gzip" -I https://magicunicorn.tech

# Check specific file
curl -H "Accept-Encoding: gzip" -I https://magicunicorn.tech/assets/js/index-*.js
```

---

## 🔍 Debugging

### Check for Issues
```bash
# Check for large files
find dist -type f -size +500k

# Check for missing compression
find dist/assets -name "*.js" ! -name "*.gz" -size +10k

# Verify all routes built
ls dist/assets/js/ | grep -E "(Home|About|Services|Portfolio|Blog|Contact)"
```

### Development Console
```javascript
// Check Web Vitals (in browser console)
// Wait for page load, then check console logs

// Performance marks
performance.getEntriesByType('mark')

// Performance measures
performance.getEntriesByType('measure')

// Navigation timing
performance.getEntriesByType('navigation')[0]
```

---

## 📈 Google Analytics

### Verify Web Vitals Tracking
```javascript
// Check if gtag is loaded
typeof gtag !== 'undefined'

// View dataLayer
console.log(window.dataLayer)

// Test event
gtag('event', 'test', { test_param: 'value' })
```

### View in GA4
1. Go to Google Analytics
2. Reports → Engagement → Events
3. Look for Web Vitals events (CLS, FID, FCP, LCP, TTFB)

---

## 🛠️ Maintenance

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update performance packages
npm update rollup-plugin-visualizer vite-plugin-compression web-vitals

# Update all (carefully)
npm update
```

### Clean Build
```bash
# Remove all build artifacts
rm -rf dist/
rm -rf node_modules/.vite/

# Fresh build
npm run build
```

---

## 📚 Performance Metrics Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s ⭐
- **FID** (First Input Delay): < 100ms ⭐
- **CLS** (Cumulative Layout Shift): < 0.1 ⭐

### Additional Metrics
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.5s
- **TBT** (Total Blocking Time): < 200ms
- **TTFB** (Time to First Byte): < 600ms

### Lighthouse Scores
- Performance: 95+ ⭐
- Accessibility: 95+ ⭐
- Best Practices: 95+ ⭐
- SEO: 95+ ⭐

---

## 🔗 Useful Links

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [React Performance](https://react.dev/learn/render-and-commit)
- [WebPageTest](https://www.webpagetest.org/)

---

## 📝 Quick Checklist

Before deploying:
- [ ] `npm run build` succeeds
- [ ] Bundle size < 400KB gzipped
- [ ] Images optimized (run script)
- [ ] Lighthouse audit > 95
- [ ] Test on mobile device
- [ ] Verify Web Vitals tracking
- [ ] Check compression headers
- [ ] Test all routes work

---

**Last Updated**: October 10, 2025
**Status**: Ready for production
