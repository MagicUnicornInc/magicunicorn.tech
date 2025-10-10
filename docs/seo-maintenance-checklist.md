# SEO Maintenance Checklist

## Daily Tasks (5 minutes)

### Google Search Console Quick Check
- [ ] Log into [Google Search Console](https://search.google.com/search-console)
- [ ] Check "Overview" for any critical issues
- [ ] Review "Coverage" for new errors
- [ ] Check for manual actions (should be zero)

### Google Analytics Quick Check
- [ ] Review traffic for anomalies (sudden drops/spikes)
- [ ] Check for unusual 404 error rates
- [ ] Verify tracking is working

### Site Health Check
```bash
# Quick accessibility test
curl -I https://magicunicorn.tech
# Expected: HTTP/2 200

# Robots.txt test
curl https://magicunicorn.tech/robots.txt | head -3
# Expected: User-agent: *

# Sitemap test
curl -I https://magicunicorn.tech/sitemap.xml
# Expected: HTTP/2 200
```

**Time Required**: 5 minutes
**Priority**: High

---

## Weekly Tasks (30 minutes)

### Performance Monitoring
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on homepage
- [ ] Check Core Web Vitals in Search Console
- [ ] Review "Experience" report for mobile usability issues
- [ ] Target: Mobile > 90, Desktop > 95

### Content Review
- [ ] Check for broken links (use [Dead Link Checker](https://www.deadlinkchecker.com/))
- [ ] Review new blog posts for SEO optimization
- [ ] Update sitemap.xml if new pages were added
- [ ] Verify new content has proper meta tags

### Social Media Validation
- [ ] Test latest blog post share on Facebook
- [ ] Test share on Twitter
- [ ] Verify images display correctly
- [ ] Check that titles and descriptions are accurate

### Backlink Monitoring
- [ ] Check Google Search Console "Links" report
- [ ] Review new backlinks (quality check)
- [ ] Look for any suspicious or spammy links
- [ ] Document high-quality backlinks

**Time Required**: 30 minutes
**Priority**: Medium

---

## Monthly Tasks (2-3 hours)

### Comprehensive SEO Audit

#### 1. Technical SEO Review (30 minutes)
- [ ] Run full Screaming Frog crawl (if available)
- [ ] Check all pages return 200 status code
- [ ] Verify no redirect chains (301 → 301)
- [ ] Ensure all pages have canonical tags
- [ ] Check for duplicate content issues
- [ ] Verify robots.txt is optimized
- [ ] Validate sitemap.xml completeness

**Tool**: [Screaming Frog SEO Spider](https://www.screamingfrogseoseo.com/)

#### 2. On-Page SEO Review (45 minutes)
- [ ] Review all page titles (unique, 50-60 chars)
- [ ] Check all meta descriptions (unique, 150-160 chars)
- [ ] Audit heading hierarchy (H1-H6 proper structure)
- [ ] Verify all images have alt text
- [ ] Check keyword optimization on key pages
- [ ] Review internal linking structure
- [ ] Ensure CTAs are present and clear

**Checklist for Each Page**:
```markdown
- [ ] Unique H1 present
- [ ] Title tag optimized
- [ ] Meta description compelling
- [ ] Images have alt text
- [ ] Internal links present (3-5 per page)
- [ ] External links open in new tab
- [ ] CTA present and clear
- [ ] Schema.org markup appropriate
```

#### 3. Content Performance Analysis (30 minutes)
- [ ] Review top 10 landing pages in Google Analytics
- [ ] Identify pages with high bounce rates
- [ ] Find pages with low average time on page
- [ ] Review search queries in Search Console
- [ ] Identify opportunities for new content
- [ ] Find underperforming content to improve

**Key Metrics**:
- Organic traffic trends
- Average position in search results
- Click-through rate (CTR) from search
- Pages per session
- Bounce rate

#### 4. Schema.org Validation (15 minutes)
- [ ] Test homepage with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate Organization schema
- [ ] Check breadcrumb schema on subpages
- [ ] Verify blog post schema (if applicable)
- [ ] Ensure all required properties are present
- [ ] Fix any warnings or errors

#### 5. Mobile Experience Review (15 minutes)
- [ ] Test on real mobile device (iOS)
- [ ] Test on real mobile device (Android)
- [ ] Use [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] Check Core Web Vitals (mobile)
- [ ] Review mobile usability in Search Console
- [ ] Verify touch targets are appropriately sized

#### 6. Social Media Optimization (15 minutes)
- [ ] Validate OpenGraph tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Validate Twitter Cards with [Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test LinkedIn share with [Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Verify all social share images are working
- [ ] Check social share counts (if tracked)

#### 7. Competitor Analysis (30 minutes)
- [ ] Identify top 3-5 competitors
- [ ] Review their meta tags
- [ ] Analyze their content strategy
- [ ] Check their backlink profile
- [ ] Identify keyword gaps
- [ ] Find opportunities to outrank

**Competitor Research Template**:
```markdown
## Competitor: [Name]
- URL: [url]
- Title Strategy: [format]
- Content Types: [blog, case studies, etc.]
- Estimated Traffic: [using SimilarWeb or Ahrefs]
- Key Keywords: [list]
- Strengths: [what they do well]
- Weaknesses: [opportunities for us]
```

**Time Required**: 2-3 hours
**Priority**: High

---

## Quarterly Tasks (Full Day)

### Deep SEO Analysis

#### 1. Full Site Audit (2 hours)
- [ ] Comprehensive Screaming Frog crawl
- [ ] Identify and fix all broken links
- [ ] Review site architecture
- [ ] Optimize URL structure
- [ ] Check for orphaned pages
- [ ] Audit redirect strategy
- [ ] Review XML sitemap structure

#### 2. Keyword Research & Strategy (2 hours)
- [ ] Use tools like Ahrefs, SEMrush, or Moz
- [ ] Identify new keyword opportunities
- [ ] Analyze keyword difficulty
- [ ] Review current keyword rankings
- [ ] Update keyword targeting strategy
- [ ] Create content plan based on keywords
- [ ] Document keyword map for site

**Keyword Research Questions**:
- What are our top-performing keywords?
- What keywords are competitors ranking for that we're not?
- What long-tail opportunities exist?
- What is the search intent for our target keywords?
- Are we ranking for our brand name?

#### 3. Content Refresh & Optimization (2 hours)
- [ ] Identify top 10 pages for refresh
- [ ] Update outdated content
- [ ] Add new sections to expand content
- [ ] Improve internal linking
- [ ] Update meta descriptions
- [ ] Add new images with optimized alt text
- [ ] Improve readability and structure

**Content Refresh Criteria**:
- Published > 6 months ago
- Declining traffic
- Outdated information
- Low engagement metrics
- Ranking positions slipping

#### 4. Backlink Profile Review (1 hour)
- [ ] Export backlink data from Search Console
- [ ] Identify high-quality backlinks
- [ ] Find and disavow toxic backlinks
- [ ] Reach out to broken link opportunities
- [ ] Develop backlink acquisition strategy
- [ ] Monitor competitor backlinks

#### 5. Technical Performance Optimization (1 hour)
- [ ] Review Core Web Vitals trends
- [ ] Identify slow-loading pages
- [ ] Optimize images further
- [ ] Review JavaScript bundle size
- [ ] Check for render-blocking resources
- [ ] Test with Lighthouse audits
- [ ] Implement performance improvements

#### 6. Local SEO (if applicable) (1 hour)
- [ ] Update Google Business Profile
- [ ] Check local citations accuracy
- [ ] Respond to reviews
- [ ] Optimize for local keywords
- [ ] Ensure NAP (Name, Address, Phone) consistency

**Time Required**: 6-8 hours
**Priority**: High

---

## Annual Tasks (Multi-Day Project)

### Full SEO Strategy Review

#### 1. Year-in-Review Analysis
- [ ] Review full year's traffic data
- [ ] Analyze ranking changes
- [ ] Measure ROI of SEO efforts
- [ ] Document successes and failures
- [ ] Identify trends and patterns
- [ ] Compare to goals set at year start

#### 2. Rebrand Check & Update
- [ ] Review all branded content
- [ ] Update social share images if needed
- [ ] Refresh meta descriptions with new messaging
- [ ] Update Schema.org Organization details
- [ ] Check brand consistency across site
- [ ] Update author bios and team pages

#### 3. Major Content Refresh
- [ ] Audit entire content library
- [ ] Archive or 301 redirect outdated content
- [ ] Consolidate similar content
- [ ] Update all blog posts > 1 year old
- [ ] Refresh case studies and portfolios
- [ ] Create content calendar for next year

#### 4. Technical Upgrade Planning
- [ ] Review SEO tech stack
- [ ] Evaluate new SEO tools and plugins
- [ ] Plan for Core Web Vitals improvements
- [ ] Consider implementing new structured data types
- [ ] Plan for progressive enhancement
- [ ] Review security and HTTPS implementation

#### 5. Competitive Landscape Shift
- [ ] Deep dive into competitor strategies
- [ ] Identify new competitors
- [ ] Analyze industry SEO trends
- [ ] Adjust strategy based on market changes
- [ ] Set new benchmarks and goals

#### 6. Goal Setting for Next Year
- [ ] Define traffic growth targets
- [ ] Set ranking goals for key terms
- [ ] Plan major content initiatives
- [ ] Budget for SEO tools and resources
- [ ] Document quarterly milestones

**Time Required**: Multiple days
**Priority**: High

---

## Ongoing Automation & Monitoring

### Set Up Automated Alerts

#### Google Search Console Alerts
- Enable email notifications for:
  - [ ] New manual actions
  - [ ] New security issues
  - [ ] Sharp increase in crawl errors
  - [ ] Sharp decrease in indexed pages

#### Google Analytics Alerts
- Create custom alerts for:
  - [ ] Traffic drops > 20% week-over-week
  - [ ] Bounce rate increase > 10%
  - [ ] Sudden spike in 404 errors
  - [ ] Goal conversion rate drops

#### Uptime Monitoring
- [ ] Set up [UptimeRobot](https://uptimerobot.com/) or similar
- [ ] Monitor homepage availability
- [ ] Monitor key landing pages
- [ ] Get alerts for downtime > 5 minutes

#### PageSpeed Monitoring
- [ ] Use [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) for automated audits
- [ ] Set up alerts for score drops
- [ ] Monitor Core Web Vitals trends

---

## Emergency Procedures

### Sudden Traffic Drop
1. Check Google Search Console for:
   - Manual actions
   - Security issues
   - Indexing problems
2. Verify site is online and accessible
3. Check robots.txt hasn't blocked crawlers
4. Review recent changes to site
5. Check for algorithm update announcements
6. Review competitor changes

### Site Downtime
1. Check server status immediately
2. Verify DNS is resolving correctly
3. Check for HTTPS/SSL issues
4. Review CDN configuration
5. Communicate with hosting provider
6. Update status page if available

### Negative SEO Attack
1. Review backlink profile for spam
2. Compile list of bad links
3. Create disavow file
4. Submit to Google via Search Console
5. Monitor for continued attacks
6. Consider reaching out to webmasters to remove links

### Manual Action Penalty
1. Read the manual action notice carefully
2. Identify the issue (thin content, links, etc.)
3. Fix the underlying problem
4. Document all changes made
5. Submit reconsideration request
6. Follow up if needed

---

## SEO Maintenance Calendar Template

### January
- [ ] Annual SEO strategy review
- [ ] Set goals for the year
- [ ] Q4 previous year analysis

### February
- [ ] Keyword research refresh
- [ ] Competitor analysis
- [ ] Content planning for Q1

### March
- [ ] Q1 SEO audit
- [ ] Technical SEO review
- [ ] Backlink cleanup

### April
- [ ] Content refresh campaign
- [ ] Internal linking audit
- [ ] Schema.org updates

### May
- [ ] Mobile experience optimization
- [ ] Page speed improvements
- [ ] User experience review

### June
- [ ] Q2 SEO audit
- [ ] Mid-year goal review
- [ ] Adjust strategy as needed

### July
- [ ] Link building campaign
- [ ] Guest posting outreach
- [ ] Partnership opportunities

### August
- [ ] Content consolidation
- [ ] URL structure review
- [ ] 404 cleanup

### September
- [ ] Q3 SEO audit
- [ ] Prepare for holiday season (if applicable)
- [ ] Local SEO refresh

### October
- [ ] Competitor benchmarking
- [ ] Update seasonal content
- [ ] Technical debt cleanup

### November
- [ ] Image optimization review
- [ ] Video SEO (if applicable)
- [ ] Voice search optimization

### December
- [ ] Q4 SEO audit
- [ ] Year-end reporting
- [ ] Plan for next year

---

## Tools & Resources

### Essential SEO Tools
- **Google Search Console**: Free, essential
- **Google Analytics**: Free, traffic analysis
- **Screaming Frog**: Free/Paid, technical SEO
- **PageSpeed Insights**: Free, performance
- **Lighthouse**: Free, built into Chrome

### Paid Tools (Optional but Recommended)
- **Ahrefs**: $99+/mo, comprehensive SEO
- **SEMrush**: $119+/mo, all-in-one
- **Moz Pro**: $99+/mo, keyword research
- **Surfer SEO**: $59+/mo, content optimization

### Automation Tools
- **Zapier**: Automate reporting
- **Google Data Studio**: Custom dashboards
- **Lighthouse CI**: Automated audits
- **UptimeRobot**: Uptime monitoring

---

## Quick Reference Commands

### Test Robots.txt
```bash
curl https://magicunicorn.tech/robots.txt
```

### Test Sitemap.xml
```bash
curl https://magicunicorn.tech/sitemap.xml
```

### Extract Meta Tags
```bash
curl -s https://magicunicorn.tech | grep -E '<meta|<title'
```

### Check SSL Certificate
```bash
curl -vI https://magicunicorn.tech 2>&1 | grep -i 'SSL\|TLS'
```

### Test Page Speed (Basic)
```bash
curl -w "@curl-format.txt" -o /dev/null -s https://magicunicorn.tech
```

---

**Document Version**: 1.0
**Last Updated**: 2026-01-15
**Review Schedule**: Quarterly
**Owner**: SEO & Metadata Specialist
