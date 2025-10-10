# Social Media Image Specifications

## Overview
This document provides detailed specifications for creating social media sharing images for MagicUnicorn.tech. These images ensure professional, branded appearance when content is shared across various platforms.

## 1. OpenGraph Image (Primary)

### Specifications
- **Filename**: `og-image-1200x630.jpg` or `og-image-1200x630.png`
- **Dimensions**: 1200 x 630 pixels (1.91:1 aspect ratio)
- **File Size**: Maximum 8MB (recommended < 300KB for fast loading)
- **Format**: JPEG (recommended) or PNG
- **Color Space**: sRGB
- **Location**: `/public/images/og-image-1200x630.jpg`

### Design Requirements
1. **Branding Elements**
   - Magic Unicorn logo prominently displayed (top-left or center)
   - Company name: "Magic Unicorn Tech" in brand font
   - Tagline: "Transforming Ideas into Magic" or current tagline

2. **Visual Style**
   - Background: Gradient from purple (#b66eff) to blue (#6366f1)
   - Include sparkle/particle effects consistent with site design
   - Subtle unicorn silhouette or icon (not overwhelming)
   - Modern, tech-forward aesthetic

3. **Typography**
   - Primary text: 60-80px bold font
   - Secondary text: 40-50px regular weight
   - Ensure text is readable at thumbnail sizes (200px wide)
   - High contrast between text and background

4. **Safe Zones**
   - Keep all text and important elements within 1050 x 530px center area
   - 75px margin on all sides for platform cropping
   - Test how image appears when cropped to square (600x600)

5. **Text Guidelines**
   - Minimum font size: 40px for readability
   - Maximum 2-3 lines of text
   - Use sentence case, not all caps
   - Avoid overly long phrases

### Platform Display
- **Facebook**: Displays as 1200x630 in feed
- **LinkedIn**: Displays as 1200x627 (very similar)
- **Slack/Discord**: Displays as 1200x630
- **Email clients**: Various sizes, but 1200x630 works well

## 2. Twitter Card Image

### Specifications
- **Filename**: `twitter-card-1200x630.jpg`
- **Dimensions**: 1200 x 630 pixels (can reuse OG image)
- **Alternative**: 1200 x 675 pixels for "summary_large_image"
- **File Size**: Maximum 5MB
- **Format**: JPEG, PNG, or WebP
- **Location**: `/public/images/twitter-card-1200x630.jpg`

### Twitter-Specific Considerations
- Displays well on mobile devices
- Preview in Twitter Card Validator before publishing
- Can be identical to OG image (recommended for consistency)
- Twitter also supports 2:1 ratio (1200x600)

## 3. Logo Variants

### Square Logo (512x512)
- **Filename**: `logo-512x512.png`
- **Dimensions**: 512 x 512 pixels
- **Format**: PNG with transparency
- **Use Cases**: Schema.org markup, app icons
- **Background**: Transparent
- **Icon**: Centered unicorn mark or full logo lockup

### Apple Touch Icon (180x180)
- **Filename**: `apple-touch-icon-180x180.png`
- **Dimensions**: 180 x 180 pixels
- **Format**: PNG
- **Background**: Solid color (brand purple #b66eff)
- **Icon**: Simplified unicorn mark
- **Corners**: Already rounded by iOS (use square image)

### Favicons
Multiple sizes for different contexts:

1. **favicon-32x32.png**
   - 32 x 32 pixels
   - PNG format
   - Used in browser tabs (desktop)

2. **favicon-16x16.png**
   - 16 x 16 pixels
   - PNG format
   - Used in browser tabs (small size)

3. **favicon.ico**
   - Multi-resolution ICO file (16x16, 32x32, 48x48)
   - Classic format for broad browser support

## 4. Page-Specific Images (Optional)

### Services Page
- **Filename**: `og-services-1200x630.jpg`
- **Content**: Showcase AI/tech services visually
- **Text overlay**: "AI-Powered Solutions"

### Portfolio Page
- **Filename**: `og-portfolio-1200x630.jpg`
- **Content**: Collage of project screenshots
- **Text overlay**: "Our Work Speaks"

### Blog Default
- **Filename**: `og-blog-default-1200x630.jpg`
- **Content**: Blog branding
- **Text overlay**: "Tech Insights & Innovation"

### Individual Blog Posts
- **Naming**: `og-blog-[slug]-1200x630.jpg`
- **Content**: Post-specific imagery
- **Text overlay**: Article title (max 60 characters)

## 5. Design Tools & Templates

### Recommended Design Software
1. **Figma** (recommended)
   - Free tier available
   - Template: [Link to Figma template if created]
   - Collaborative, web-based

2. **Adobe Photoshop**
   - Professional tool
   - PSD template available

3. **Canva**
   - User-friendly
   - Pre-made templates for social media
   - Free tier available

4. **GIMP**
   - Free, open-source alternative

### AI-Generated Options
- **DALL-E 3**: Generate branded imagery
- **Midjourney**: Create artistic backgrounds
- **Stable Diffusion**: Custom imagery generation

**Prompt Example**:
```
"Create a professional tech company social media banner image, 1200x630px,
featuring a magical unicorn silhouette, purple to blue gradient background,
with sparkle effects, modern and clean design, high contrast, tech-forward
aesthetic, space for text overlay"
```

## 6. Brand Colors & Assets

### Primary Colors
- **Purple**: #b66eff (Primary brand color)
- **Blue**: #6366f1 (Secondary brand color)
- **Dark Background**: #1a1a2e
- **Light Text**: #ffffff
- **Accent**: #a855f7

### Typography
- **Primary Font**: [Specify your primary font]
- **Secondary Font**: [Specify your secondary font]
- **Fallbacks**: system-ui, -apple-system, sans-serif

### Logo Files
Location of source files:
- Vector logo: `/src/images/unicorn.svg`
- High-res PNG: [To be created]
- Logo lockup variations: [To be created]

## 7. Image Optimization

### Compression Tools
1. **TinyPNG**: https://tinypng.com/
2. **Squoosh**: https://squoosh.app/
3. **ImageOptim** (Mac): https://imageoptim.com/
4. **Sharp** (CLI): For automated optimization

### Optimization Guidelines
- Compress JPEG to 80-85% quality
- Use progressive JPEG encoding
- Strip metadata (EXIF data) to reduce size
- Target < 200KB for fast loading

### Command-line Optimization (Sharp)
```bash
# Install Sharp
npm install -g sharp-cli

# Optimize image
sharp -i input.jpg -o og-image-1200x630.jpg --quality 85 --progressive
```

## 8. Testing Checklist

### Before Deployment
- [ ] Check dimensions exactly match specs
- [ ] Test image on light and dark backgrounds
- [ ] Verify text is readable at 200px width
- [ ] Confirm file size < 300KB
- [ ] Test in grayscale (for accessibility)
- [ ] Preview on mobile device screen

### Platform Testing Tools
1. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test OG image display
   - Clear cache after updates

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter Card display
   - Preview how card appears in feed

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Verify LinkedIn display
   - Clear cache if needed

4. **Social Media Preview Tools**
   - https://socialsharepreview.com/
   - https://www.opengraph.xyz/
   - Preview across multiple platforms

## 9. Dynamic Image Generation (Future Enhancement)

### For Blog Posts
Consider implementing dynamic OG image generation:

**Tools**:
- **Puppeteer**: Render HTML to image
- **Canvas API**: Generate images programmatically
- **Cloudinary**: Dynamic image transformation
- **Vercel OG Image**: Serverless OG image generation

**Example Use Case**:
```javascript
// Generate OG image with post title
https://magicunicorn.tech/api/og?title=Post+Title&author=Author+Name
```

## 10. Image Audit & Maintenance

### Regular Checks
- **Quarterly**: Review all social sharing images
- **After Rebranding**: Update all OG images
- **New Content**: Create custom images for major launches
- **Performance**: Monitor image loading times

### Image Inventory
Maintain a spreadsheet tracking:
- Image filename
- Page/use case
- Creation date
- Last updated
- File size
- Dimensions
- Source file location

## 11. Accessibility Considerations

### Alt Text Strategy
- Provide descriptive alt text in meta tags
- Use `og:image:alt` for OpenGraph
- Use `twitter:image:alt` for Twitter
- Keep alt text under 125 characters
- Describe what's in the image, not just branding

**Example**:
```html
<meta property="og:image:alt"
      content="Magic Unicorn Tech logo with purple gradient and sparkles" />
```

### Color Contrast
- Ensure text meets WCAG AA standards (4.5:1 contrast ratio)
- Test with color blindness simulators
- Avoid relying solely on color to convey information

## 12. Implementation Checklist

### Phase 1: Core Images (Critical)
- [ ] Create primary OG image (1200x630)
- [ ] Create Twitter Card image (can reuse OG)
- [ ] Create square logo (512x512)
- [ ] Create Apple Touch Icon (180x180)
- [ ] Create favicons (32x32, 16x16, .ico)

### Phase 2: Page-Specific (High Priority)
- [ ] Services page OG image
- [ ] Portfolio page OG image
- [ ] Blog default OG image
- [ ] About page OG image

### Phase 3: Blog Content (Ongoing)
- [ ] Create template for blog post OG images
- [ ] Generate images for top 5 blog posts
- [ ] Set up dynamic image generation (optional)

## 13. File Structure

```
/public/
  /images/
    og-image-1200x630.jpg          # Primary OpenGraph image
    twitter-card-1200x630.jpg      # Twitter Card image
    logo-512x512.png               # Square logo
    apple-touch-icon-180x180.png   # iOS icon
    favicon-32x32.png              # Favicon 32px
    favicon-16x16.png              # Favicon 16px
    favicon.ico                    # Multi-res favicon

    /og/                           # Page-specific OG images
      services-1200x630.jpg
      portfolio-1200x630.jpg
      blog-default-1200x630.jpg
      about-1200x630.jpg

    /blog/                         # Blog post images
      [slug]-og-1200x630.jpg
```

## 14. Quick Reference

| Platform | Recommended Size | Aspect Ratio | Max File Size |
|----------|-----------------|--------------|---------------|
| Facebook | 1200 x 630 | 1.91:1 | 8 MB |
| Twitter | 1200 x 630 | 1.91:1 | 5 MB |
| LinkedIn | 1200 x 627 | 1.91:1 | 5 MB |
| Pinterest | 1000 x 1500 | 2:3 | 20 MB |
| Instagram | 1080 x 1080 | 1:1 | 30 MB |
| Schema.org Logo | 512 x 512 | 1:1 | 1 MB |

## Resources

### Design Inspiration
- [Facebook Creative Hub](https://www.facebook.com/ads/creativehub)
- [Twitter Media Best Practices](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
- [LinkedIn Image Specifications](https://www.linkedin.com/help/linkedin/answer/a521928)

### Validation Tools
- [Social Share Preview](https://socialsharepreview.com/)
- [OpenGraph.xyz](https://www.opengraph.xyz/)
- [Metatags.io](https://metatags.io/)

### Image Resources
- [Unsplash](https://unsplash.com/) - Free stock photos
- [Pexels](https://www.pexels.com/) - Free stock photos & videos
- [unDraw](https://undraw.co/) - Free illustrations

---

**Next Steps**:
1. Design primary OG image (1200x630)
2. Create logo variants
3. Implement images on site
4. Test with validation tools
5. Document creation process
6. Set up ongoing maintenance schedule

*Document Version: 1.0*
*Last Updated: 2026-01-15*
*Status: Ready for Design Phase*
