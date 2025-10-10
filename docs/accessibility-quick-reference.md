# Accessibility Quick Reference Guide

**For**: MagicUnicorn.tech Development Team
**Purpose**: Quick lookup for accessibility best practices

---

## Quick Wins Checklist

When adding new features, always:

- [ ] Add proper focus styles
- [ ] Test keyboard navigation
- [ ] Add ARIA labels to icon buttons
- [ ] Check color contrast
- [ ] Support reduced motion
- [ ] Use semantic HTML
- [ ] Test with screen reader

---

## Common Patterns

### Button vs Link

```jsx
// ✅ Use Link for navigation
<Link to="/about">About Us</Link>

// ✅ Use button for actions
<button onClick={handleClick}>Submit</button>

// ❌ Don't use button for navigation
<button onClick={() => navigate('/about')}>About</button>
```

### Icon Buttons

```jsx
// ✅ Always add aria-label
<button aria-label="Close dialog">
  <FaTimes aria-hidden="true" />
</button>

// ❌ Don't forget labels
<button>
  <FaTimes />
</button>
```

### Form Fields

```jsx
// ✅ Proper form field
<div>
  <label htmlFor="email">
    Email <span aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <div id="email-error" role="alert">
      Please enter a valid email
    </div>
  )}
</div>

// ❌ Bad form field
<div>
  <div>Email</div>
  <input type="email" />
</div>
```

### Reduced Motion

```jsx
// ✅ Check reduced motion preference
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  setPrefersReducedMotion(mediaQuery.matches)

  const handleChange = (e) => setPrefersReducedMotion(e.matches)
  mediaQuery.addEventListener('change', handleChange)
  return () => mediaQuery.removeEventListener('change', handleChange)
}, [])

// Apply conditionally
const motionProps = prefersReducedMotion ? {} : {
  whileHover: { scale: 1.05 }
}

<motion.div {...motionProps}>Content</motion.div>
```

### Decorative Elements

```jsx
// ✅ Hide decorative elements
<div className="sparkles" aria-hidden="true" role="presentation">
  <span>✨</span>
</div>

// ✅ Decorative icons
<FaStar aria-hidden="true" />
<span>Favorite</span>
```

---

## ARIA Patterns

### Live Regions

```jsx
// Announcements
<div role="status" aria-live="polite" aria-atomic="true">
  {announcement}
</div>

// Urgent alerts
<div role="alert" aria-live="assertive">
  Error: Form submission failed
</div>
```

### Modal/Dialog

```jsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-description">Are you sure?</p>
</div>
```

### Navigation

```jsx
<nav aria-label="Main navigation">
  <div role="menu">
    <Link role="menuitem">Home</Link>
    <Link role="menuitem">About</Link>
  </div>
</nav>
```

---

## Keyboard Support

### Required Keys

- **Tab**: Move to next element
- **Shift+Tab**: Move to previous element
- **Enter**: Activate links and buttons
- **Space**: Activate buttons, toggle checkboxes
- **Escape**: Close modals/menus
- **Arrow Keys**: Navigate within components

### Focus Trap Implementation

```javascript
useEffect(() => {
  if (!isOpen) return

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
      returnFocusRef.current?.focus()
    }

    if (e.key === 'Tab') {
      const focusable = container.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [isOpen])
```

---

## Color Contrast

### Minimum Ratios (WCAG AA)

- Normal text: **4.5:1**
- Large text (18pt+): **3.1**
- UI components: **3:1**

### Testing

```bash
# WebAIM Contrast Checker
https://webaim.org/resources/contrastchecker/

# Current palette (verified)
✅ #ffffff on #0a0a0a = 20.5:1 (AAA)
✅ #b3b3b3 on #0a0a0a = 8.4:1 (AAA)
```

---

## Common Mistakes to Avoid

### ❌ Bad Practices

```jsx
// Missing alt text
<img src="logo.png" />

// Unlabeled button
<button><FaTimes /></button>

// Div as button
<div onClick={handleClick}>Click me</div>

// Color only for meaning
<span style={{color: 'red'}}>Error</span>

// Missing focus styles
button { outline: none; }

// Redundant ARIA
<button aria-label="Submit">Submit</button>

// Disabled without alternative
<button disabled>Submit</button>
```

### ✅ Good Practices

```jsx
// Proper alt text
<img src="logo.png" alt="Magic Unicorn Tech logo" />

// Labeled icon button
<button aria-label="Close dialog">
  <FaTimes aria-hidden="true" />
</button>

// Real button
<button onClick={handleClick}>Click me</button>

// Icon + text for meaning
<span>
  <FaExclamationCircle aria-hidden="true" />
  Error: Invalid input
</span>

// Custom focus styles
button:focus-visible {
  outline: 3px solid var(--unicorn-purple);
  outline-offset: 3px;
}

// ARIA only when needed
<button>Submit</button>

// Provide feedback
<button disabled aria-disabled="true">
  Submitting...
</button>
```

---

## Testing Quick Commands

### Keyboard Test
1. **Tab** through entire page
2. Check all elements are reachable
3. Verify focus is visible
4. Test **Enter**/**Space** on interactive elements
5. Test **Escape** on modals

### Screen Reader Test (VoiceOver)
```bash
# Enable
Cmd + F5

# Navigate
Control + Option + Arrow Keys

# Read all
Control + Option + A

# Headings
Control + Option + Cmd + H

# Landmarks
Control + Option + U
```

### Automated Test
```bash
# Chrome DevTools Lighthouse
1. F12 → Lighthouse tab
2. Select "Accessibility"
3. Click "Generate report"
4. Target: 90+ score
```

---

## File Locations

```
/src/
  styles/
    accessibility.css          ← Focus styles, reduced motion
  components/
    Navbar.jsx                 ← Focus trap example
    Hero.jsx                   ← Reduced motion example
  pages/
    Contact.jsx                ← Form accessibility example
  App.jsx                      ← Skip link, ARIA live regions

/docs/
  accessibility-report.md              ← Full audit
  accessibility-testing-checklist.md   ← Testing guide
  accessibility-implementation-summary.md  ← Implementation details
  accessibility-quick-reference.md     ← This file
```

---

## Resources

### Daily Use
- **WCAG Quick Ref**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **A11y Project**: https://www.a11yproject.com/

### Testing Tools
- **Lighthouse**: Built into Chrome DevTools
- **axe DevTools**: Browser extension
- **WAVE**: https://wave.webaim.org/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Screen Readers
- **NVDA** (Windows, free): https://www.nvaccess.org/
- **VoiceOver** (macOS/iOS, built-in): Cmd+F5
- **JAWS** (Windows, paid): https://www.freedomscientific.com/

---

## Quick Decision Tree

### Is it interactive?
- **Yes** → Use `<button>` or `<a>`
- **No** → Use semantic HTML (`<p>`, `<div>`)

### Does it navigate?
- **Yes** → Use `<Link>` or `<a>`
- **No** → Use `<button>`

### Is it visible?
- **Yes, but decorative** → Add `aria-hidden="true"`
- **Yes, and meaningful** → Ensure accessible
- **No** → Use `.sr-only` class for screen readers only

### Does it move?
- **Yes** → Add reduced motion support
- **No** → You're good

### Is it a form field?
- **Yes** → Add label, validation, ARIA
- **No** → Proceed

---

## Emergency Fixes

### "Lighthouse score dropped!"
1. Run axe DevTools to find issues
2. Check focus styles are visible
3. Verify ARIA labels present
4. Test keyboard navigation
5. Check color contrast

### "Screen reader can't find it!"
1. Check element is in DOM
2. Verify not `aria-hidden`
3. Add proper label/role
4. Test with live regions if dynamic
5. Ensure not `display: none` or `visibility: hidden`

### "Focus indicator missing!"
1. Never use `outline: none` without replacement
2. Add custom focus styles to `/src/styles/accessibility.css`
3. Test with Tab key
4. Ensure 3:1 contrast ratio

---

## Support

**Questions?** Ask the Accessibility Specialist or check:
- Full audit: `/docs/accessibility-report.md`
- Testing guide: `/docs/accessibility-testing-checklist.md`
- Implementation summary: `/docs/accessibility-implementation-summary.md`

**Remember**: Accessibility is not optional. It's a core feature that makes our product better for everyone.

---

**Last Updated**: 2025-10-10
**Version**: 1.0.0
