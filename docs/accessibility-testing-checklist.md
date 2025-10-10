# Accessibility Testing Checklist

**Project**: MagicUnicorn.tech
**Standard**: WCAG 2.1 AA Compliance
**Last Updated**: 2025-10-10

## Quick Testing Guide

Use this checklist to verify accessibility compliance before deployment.

---

## 1. Keyboard Navigation Testing

### Basic Navigation
- [ ] Tab through entire site without using mouse
- [ ] Tab order is logical and follows visual flow
- [ ] All interactive elements are reachable via keyboard
- [ ] No keyboard traps (except intentional modal traps)
- [ ] Skip to content link appears on first Tab press
- [ ] Skip link successfully moves focus to main content

### Interactive Elements
- [ ] Links activate with Enter key
- [ ] Buttons activate with Enter or Space key
- [ ] Form inputs can be focused and edited
- [ ] Dropdowns/selects work with arrow keys
- [ ] Escape key closes modals/lightboxes
- [ ] Arrow keys navigate through image galleries

### Focus Indicators
- [ ] Focus outline visible on all interactive elements
- [ ] Focus outline has sufficient contrast (3:1 minimum)
- [ ] Focus outline doesn't get cut off by overflow
- [ ] Custom focus styles more visible than browser default
- [ ] Focus visible on navigation links
- [ ] Focus visible on form inputs
- [ ] Focus visible on buttons

### Mobile Menu
- [ ] Mobile menu button keyboard accessible
- [ ] Focus trapped inside open mobile menu
- [ ] Escape key closes mobile menu
- [ ] Focus returns to menu button on close

---

## 2. Screen Reader Testing

### VoiceOver (macOS/iOS)
- [ ] Enable VoiceOver: Cmd+F5
- [ ] Navigate with VO+Arrow keys
- [ ] Test heading navigation (VO+Cmd+H)
- [ ] Test landmark navigation (VO+U)
- [ ] Verify all images have alt text
- [ ] Check form labels are announced
- [ ] Test button and link announcements

### NVDA (Windows - Free)
- [ ] Download from nvaccess.org
- [ ] Navigate with arrow keys
- [ ] Test heading list (Insert+F7)
- [ ] Test landmarks list (Insert+F7, then Landmarks)
- [ ] Verify form field associations
- [ ] Check ARIA labels are announced

### Key Tests
- [ ] Page title read on load
- [ ] Landmarks properly identified
- [ ] Headings in logical order
- [ ] Form labels associated with inputs
- [ ] Required fields announced
- [ ] Error messages announced
- [ ] Dynamic content changes announced
- [ ] Route changes announced

---

## 3. Visual Testing

### Zoom and Scaling
- [ ] Test at 200% zoom (browser zoom)
- [ ] All content remains visible
- [ ] No horizontal scrolling required
- [ ] Text doesn't overlap
- [ ] Interactive elements remain clickable

### Color Contrast
- [ ] Run WebAIM Contrast Checker on key text
- [ ] Normal text: 4.5:1 minimum contrast
- [ ] Large text (18pt+): 3:1 minimum contrast
- [ ] Interactive element indicators: 3:1 minimum
- [ ] Check purple gradient text on dark background
- [ ] Check text on particle animation backgrounds

### High Contrast Mode
- [ ] Test with Windows High Contrast Mode
- [ ] Test with macOS Increase Contrast setting
- [ ] Borders and outlines visible
- [ ] Text remains readable
- [ ] Icons remain distinguishable

### Color Blindness
- [ ] Don't rely on color alone to convey meaning
- [ ] Test with color blindness simulator
- [ ] Error states have icons, not just red color
- [ ] Success states have icons, not just green color

---

## 4. Motion and Animation

### Reduced Motion Preference
- [ ] **macOS**: System Preferences > Accessibility > Display > Reduce motion
- [ ] **Windows**: Settings > Ease of Access > Display > Show animations
- [ ] Test with reduced motion enabled
- [ ] Sparkle animations disabled
- [ ] Background particles hidden
- [ ] Hero animations simplified
- [ ] Page transitions still work smoothly
- [ ] Focus indicators still animate (allowed)

### Animation Testing
- [ ] Animations don't flash more than 3x per second
- [ ] No auto-playing video/audio
- [ ] Animations can be paused if > 5 seconds
- [ ] Parallax effects respect reduced motion

---

## 5. Form Accessibility

### Contact Form
- [ ] All labels properly associated with inputs
- [ ] Required fields marked with *
- [ ] Required announced to screen readers
- [ ] Error messages appear below fields
- [ ] Errors have aria-describedby linking
- [ ] Errors use role="alert" for announcement
- [ ] Field validation on blur
- [ ] Inline error messages
- [ ] Success message announced
- [ ] Form can be submitted with Enter key

### Form Validation
- [ ] Client-side validation present
- [ ] Error messages specific and helpful
- [ ] Focus moves to first error on submit
- [ ] Errors cleared when corrected
- [ ] Valid inputs show success state

---

## 6. Semantic HTML and ARIA

### Document Structure
- [ ] Single h1 per page
- [ ] Heading hierarchy logical (no skips)
- [ ] Main landmark present
- [ ] Navigation landmark present
- [ ] Contentinfo (footer) landmark present
- [ ] Complementary landmarks for sidebars
- [ ] No generic div-soup

### ARIA Usage
- [ ] aria-label on icon buttons
- [ ] aria-expanded on toggle buttons
- [ ] aria-hidden on decorative elements
- [ ] aria-live regions for dynamic content
- [ ] aria-required on required fields
- [ ] aria-invalid on error fields
- [ ] aria-describedby for field hints/errors
- [ ] No redundant ARIA (don't label visible text)

### Links vs Buttons
- [ ] Navigation uses <a> tags
- [ ] Actions use <button> tags
- [ ] Links have href attribute
- [ ] Buttons have type="button" or type="submit"

---

## 7. Images and Media

### Alt Text
- [ ] All images have alt attribute
- [ ] Decorative images have alt=""
- [ ] Informative images have descriptive alt
- [ ] Logo alt: "Magic Unicorn Logo"
- [ ] Icons have aria-hidden if decorative
- [ ] Complex images have long descriptions

### SVG Accessibility
- [ ] SVG has role="img" if meaningful
- [ ] SVG has aria-label if meaningful
- [ ] SVG has aria-hidden if decorative
- [ ] Logo SVG properly labeled

---

## 8. Mobile Accessibility

### Touch Targets
- [ ] Touch targets at least 44x44 pixels
- [ ] Adequate spacing between touch targets
- [ ] No small tap targets in mobile view

### Mobile Screen Readers
- [ ] Test with VoiceOver on iOS
- [ ] Test with TalkBack on Android
- [ ] Swipe gestures work properly
- [ ] Mobile menu accessible

### Orientation
- [ ] Works in portrait mode
- [ ] Works in landscape mode
- [ ] No content locked to orientation

---

## 9. Automated Testing Tools

### Lighthouse (Chrome DevTools)
```bash
# Run Lighthouse accessibility audit
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility" category
4. Click "Generate report"
5. Target: 90+ score
```
- [ ] Run Lighthouse audit
- [ ] Score 90+ on accessibility
- [ ] Fix all failing audits
- [ ] Review warnings

### axe DevTools (Browser Extension)
```bash
# Install axe DevTools extension
# Run scan on each page
```
- [ ] Install axe extension
- [ ] Run scan on Home page
- [ ] Run scan on About page
- [ ] Run scan on Services page
- [ ] Run scan on Portfolio page
- [ ] Run scan on Contact page
- [ ] Fix all critical issues
- [ ] Fix all serious issues

### WAVE (WebAIM)
```bash
# Use WAVE extension or website
# https://wave.webaim.org/
```
- [ ] Run WAVE scan
- [ ] Fix all errors (red)
- [ ] Review all alerts (yellow)
- [ ] Address contrast issues

### HTML Validator
```bash
# W3C HTML Validator
# https://validator.w3.org/
```
- [ ] Validate HTML markup
- [ ] Fix all errors
- [ ] Review warnings

---

## 10. Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Safari on iOS
- [ ] Chrome on Android
- [ ] Samsung Internet

### Assistive Technology
- [ ] NVDA + Firefox (Windows)
- [ ] JAWS + Chrome (Windows - if available)
- [ ] VoiceOver + Safari (macOS)
- [ ] TalkBack + Chrome (Android)
- [ ] VoiceOver + Safari (iOS)

---

## 11. Content Accessibility

### Reading Level
- [ ] Content at 8th grade reading level or lower
- [ ] Complex terms explained
- [ ] Jargon minimized or defined

### Language
- [ ] HTML lang attribute set (en)
- [ ] Language changes marked with lang attribute
- [ ] Text direction correct (LTR)

### Headings
- [ ] Headings describe content accurately
- [ ] No empty headings
- [ ] No heading-styled paragraphs

---

## 12. Performance and Accessibility

### Page Load
- [ ] Page loads in < 3 seconds
- [ ] Core content visible quickly
- [ ] No layout shifts that break accessibility
- [ ] Focus not stolen during load

### Network Conditions
- [ ] Test on slow 3G connection
- [ ] Loading states have proper ARIA
- [ ] Timeouts don't break keyboard navigation

---

## Testing Workflow

### Before Deployment
1. **Manual keyboard test** (15 min)
   - Tab through entire site
   - Test all interactions

2. **Screen reader spot check** (15 min)
   - Test 2-3 pages with VoiceOver/NVDA
   - Verify announcements

3. **Automated scan** (5 min)
   - Run axe DevTools
   - Run Lighthouse

4. **Reduced motion test** (5 min)
   - Enable reduced motion
   - Verify animations disabled

### After Major Changes
- Re-run automated tests
- Keyboard test changed areas
- Screen reader test if content changed

### Regular Audits
- Full accessibility audit quarterly
- Update this checklist with new findings

---

## Success Criteria

### Must Pass (Blocking)
- ✅ All automated tests pass
- ✅ Keyboard navigation works completely
- ✅ Screen reader announces all content
- ✅ Color contrast meets WCAG AA
- ✅ Forms fully accessible

### Should Pass (High Priority)
- ✅ Reduced motion respected
- ✅ Mobile screen readers work
- ✅ Focus indicators highly visible
- ✅ No ARIA errors

### Nice to Have (Enhancements)
- ✅ Keyboard shortcuts available
- ✅ Touch targets exceed minimums
- ✅ Content at 6th grade reading level
- ✅ Exceeds WCAG AA standards

---

## Resources

### Testing Tools
- **Lighthouse**: Built into Chrome DevTools
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/
- **NVDA**: https://www.nvaccess.org/download/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Documentation
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **WebAIM**: https://webaim.org/
- **A11y Project**: https://www.a11yproject.com/

### Screen Reader Commands

#### VoiceOver (macOS)
- **Enable**: Cmd+F5
- **Navigate**: VO+Arrow keys (VO = Control+Option)
- **Headings**: VO+Cmd+H
- **Links**: VO+Cmd+L
- **Landmarks**: VO+U
- **Read all**: VO+A

#### NVDA (Windows)
- **Enable**: Ctrl+Alt+N
- **Navigate**: Arrow keys
- **Browse mode**: Up/Down arrows
- **Element list**: Insert+F7
- **Read all**: Insert+Down arrow

---

## Sign-Off

- [ ] All critical issues resolved
- [ ] Manual testing completed
- [ ] Automated testing passed
- [ ] Documentation updated
- [ ] Team trained on accessibility

**Tester**: ________________
**Date**: ________________
**Notes**: ________________
