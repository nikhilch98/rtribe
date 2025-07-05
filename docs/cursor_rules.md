# CursorRules

AI assistant guidelines for the RTRIBE Dance Studio website project. This document captures design language, architecture patterns, development workflows, and quality assurance practices learned from the complete website cloning and optimization process.

## 📍 Section-to-Code Mapping Guide

### Quick Reference: Where to Edit Each Section

**🎯 For Fast Section Edits:** Use this mapping to quickly locate and modify specific website sections.

#### 1. **Loading Screen** (1.5s Initial Animation)
- **Component:** `static/js/components/LoadingScreen.js`
- **CSS Classes:** `.loading-screen`, `.loading-content`, `.loading-spinner` 
- **Location in CSS:** `static/css/components.css` lines 1236-1291
- **What it does:** Shows "NAMMA Dance Week" with animated GIF for 1.5 seconds

#### 2. **Header/Navigation** (Top Navigation Bar)
- **Component:** `static/js/components/Header.js`
- **CSS Classes:** `.header`, `.header-container`, `.nav-link`, `.mobile-menu-toggle`
- **Location in CSS:** `static/css/components.css` lines 2417-2836
- **Navigation Items:** Home, Regulars, Instructors, Workshops, Testimonials, Contact Us
- **IDs for Scroll:** `#home`, `#regulars`, `#instructors`, `#workshops`, `#testimonials`, `#contact`

#### 3. **Hero Section** (Main Dance Week Carousel)
- **Component:** `static/js/components/HeroSection.js`
- **CSS Classes:** `.hero-section`, `.hero-slide`, `.hero-dots`, `.hero-navigation`
- **Location in CSS:** `static/css/components.css` lines 90-222 and 1316-1697
- **Features:** 3-slide carousel with dance week schedules, auto-advance, responsive design
- **Section ID:** `#home`

#### 4. **Regulars Section** (Weekly Classes Carousel)
- **Component:** `static/js/components/SecondaryCarousel.js`
- **CSS Classes:** `.regulars-section`, `.secondary-section`, `.secondary-slide`, `.secondary-dots`
- **Location in CSS:** `static/css/components.css` lines 2141-2417 and 2855-2881
- **Features:** Weekly class schedules, circular carousel layout
- **Section ID:** `#regulars`
- **Wrapper in App:** Created in `static/js/app.js` lines 197-212

#### 5. **Instructors Section** (Dance Week Info)
- **Component:** `static/js/components/DanceWeekSection.js`
- **CSS Classes:** `.dance-week-section`, `.dance-week-container`, `.dance-week-title`
- **Location in CSS:** `static/css/components.css` lines 2010-2141 and 2882-2896
- **Features:** Black background with radial gradient, showcase information
- **Section ID:** `#instructors` (commented out in current app.js)

#### 6. **Workshops Section** (Workshop Cards & Registration)
- **Component:** `static/js/components/WorkshopsSection.js`
- **CSS Classes:** `.workshops-section`, `.workshop-card`, `.workshop-register-button`
- **Location in CSS:** `static/css/components.css` lines 966-1236 and workshop-related classes
- **Features:** Dynamic workshop cards, WhatsApp registration, image galleries
- **Section ID:** `#workshops`
- **Data Source:** Fetched from `/api/sections`

#### 7. **Testimonials Section** (Student Feedback & Videos)
- **Component:** `static/js/components/TestimonialsSection.js`
- **CSS Classes:** `.testimonials-section`, `.video-carousel-container`, `.testimonial-card`
- **Location in CSS:** `static/css/components.css` lines 2901-3568
- **Features:** Video carousel, student testimonial cards, ratings display
- **Section ID:** `#testimonials`

#### 8. **Showcase Section** (About/Info Section)
- **Component:** `static/js/components/ShowcaseSection.js`
- **CSS Classes:** `.showcase-section`, `.showcase-title`, `.showcase-features`
- **Location in CSS:** `static/css/components.css` lines 405-568
- **Features:** Studio information, gradient background, feature highlights

#### 9. **Footer** (Contact Information)
- **Component:** `static/js/components/Footer.js`
- **CSS Classes:** `.footer-section`, `.footer-container`, `.footer-social-link`
- **Location in CSS:** `static/css/components.css` lines 1697-2010
- **Features:** Contact details, social links, studio hours, WhatsApp integration
- **Section ID:** `#contact`

### 🏗️ App Structure & Rendering Order

**Main App Controller:** `static/js/app.js`
- **Component Loading Order (lines 156-255):**
  1. Header (`this.header.render()`)
  2. Hero Section (`this.heroSection.render()` - ID: `#home`)
  3. Regulars Section Wrapper + Secondary Carousel (ID: `#regulars`)
  4. Workshops Section (`this.workshopsSection.render()` - ID: `#workshops`)
  5. Testimonials Section (`this.testimonialsSection.render()` - ID: `#testimonials`)
  6. Showcase Section (`this.showcaseSection.render()`)
  7. Footer (`this.footer.render()` - ID: `#contact`)

### 🎨 CSS Architecture

**Primary Stylesheet:** `static/css/components.css` (3568 lines)
- **CSS Variables:** Lines 1-46 (color tokens, spacing, typography)
- **Global Utilities:** Lines 47-89 (focus, motion, spacing classes)
- **Component Styles:** Lines 90+ (organized by component)

**Secondary Stylesheet:** `static/css/style.css` (additional styling)

### 🔧 Common Editing Scenarios

#### To Change Section Colors:
1. **Edit CSS Variables:** `static/css/components.css` lines 3-19
2. **Target Specific Sections:** Use the section CSS classes above

#### To Modify Section Content:
1. **Find Component File:** Use mapping above
2. **Edit render() method:** Usually contains HTML structure
3. **Update CSS if needed:** Use CSS line numbers above

#### To Add/Remove Navigation Items:
1. **Edit Header Component:** `static/js/components/Header.js` lines 15-35
2. **Add corresponding Section ID:** In main app.js rendering order
3. **Update CSS:** Header styles in components.css lines 2417+

#### To Modify WhatsApp Integration:
1. **Workshop Registration:** `static/js/components/WorkshopsSection.js`
2. **Phone Number:** Search for "+91 7338003939" across components
3. **Message Templates:** Found in individual component render methods

#### To Change Loading Screen:
1. **Component:** `static/js/components/LoadingScreen.js`
2. **Timing:** `static/js/app.js` line 54 (setTimeout 1500ms)
3. **Animation:** `static/assets/log.gif`

#### To Update Carousel Images:
1. **Hero Carousel:** Data from `/api/sections` config.carouselImages
2. **Secondary Carousel:** Data from `/api/sections` config.secondaryCarouselImages
3. **Fallback Images:** Defined in app.js lines 99-107 and 133-141

#### To Modify Responsive Breakpoints:
1. **CSS Variables:** Lines 38-42 in components.css
2. **Media Queries:** Throughout components.css using these breakpoints
3. **JavaScript Responsive Logic:** `window.innerWidth <= 768` in components

## Design Language

### Color Palette

📌 **Primary Colors**
```css
--primary-purple: #6A0DAD;    /* Main brand color, buttons, headings */
--light-purple: #9B59B6;      /* Hover states, accents */
--dark-purple: #4A0080;       /* Deep accents, shadows */
```

📌 **Neutral Colors**
```css
--primary-white: #FFFFFF;     /* Main background, button text */
--secondary-white: #F5F5F5;   /* Secondary backgrounds */
--text-dark: #333333;         /* Primary text color */
--text-purple: #6A0DAD;       /* Brand text, links */
```

### Typography Scale

📌 **Font Families**
```css
/* Primary body text - performance optimized system stack */
font-family: Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif;

/* Headings - elegant serif for dance branding */
font-family: "Playfair Display", serif;
```

📌 **Font Weights & Sizes**
```css
/* Headings hierarchy */
h1: 3.2em, 700 weight, --primary-purple
h2: 2.4em, 600 weight, --primary-purple  
h3: 1.8em, 600 weight

/* Responsive scaling */
@media (max-width: 768px) {
  h1: 2.8em → 1.8em
  h2: 2em → 1.5em
}
```

### Spacing & Grid System

📌 **Container System**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive padding */
@media (max-width: 768px) { padding: 0 1.5rem; }
@media (max-width: 480px) { padding: 0 1rem; }
```

📌 **Section Spacing**
```css
.section {
  padding: 5rem 0;
}

/* Responsive section padding */
@media (max-width: 768px) { padding: 4rem 0; }
@media (max-width: 480px) { padding: 3rem 0; }
```

### Component Aesthetics

📌 **Button Design**
```css
border-radius: 4px;
border: 1px solid var(--primary-purple);
padding: 0.6em 1.2em;
transition: all 0.25s ease;

/* Hover state */
background-color: var(--primary-purple);
color: var(--primary-white);
```

📌 **Animation Rules**
```css
/* Standard transitions */
transition: color 0.3s ease;        /* Text color changes */
transition: all 0.25s ease;         /* Button interactions */
transition: all 0.25s ease;         /* General hover effects */

/* Micro-interactions */
whileHover: { scale: 1.02 }         /* Subtle button lift */
whileTap: { scale: 0.98 }           /* Button press feedback */
```

### Accessibility Standards

📌 **WCAG Compliance**
- Target: WCAG 2.1 AA minimum
- Color contrast: 4.5:1 for normal text, 3:1 for large text
- All interactive elements have focus states with 2px solid outline

📌 **Motion Reduction**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Information Architecture & Layout

### Site Structure

📌 **URL Patterns**
```
/ (root)                    → Main SPA entry point
/assets/css/               → Bundled stylesheets  
/assets/js/                → React application bundle
/assets/images/            → All image assets (PNG, JPG, SVG)
/assets/fonts/             → Web font files
/README-LOCAL.txt          → Local setup instructions
```

📌 **Page Template Hierarchy**
```
Single Page Application (React)
├── Loading Screen (1.5s with animated GIF)
├── Hero Section (brand introduction)
├── About Section (studio information)  
├── Workshops Section (artist schedule grid)
└── Contact/Footer (studio details, social links)
```

### Asset Organization

📌 **File Naming Conventions**
```
Assets follow build-generated names:
- CSS: index.css
- JS: index.js  
- Images: {descriptive-name}.{ext}
- Keep original filenames for artist photos: "{Artist Name}.png"
```

📌 **Directory Structure**
```
beinrtribe_clone/
├── index.html                 # SPA entry point
├── README-LOCAL.txt           # Setup instructions
└── assets/
    ├── css/                   # Compiled stylesheets
    ├── js/                    # React bundle
    ├── images/                # Photos, logos, graphics
    ├── fonts/                 # (empty - uses system fonts)
    ├── videos/                # (reserved for future content)
    ├── audio/                 # (reserved for future content)
    └── misc/                  # Other asset types
```

## Interaction & States

### Component State Management

📌 **Loading States**
```javascript
// Primary loading: 1.5 second branded screen
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 1500);
  return () => clearTimeout(timer);
}, []);
```

📌 **Button Interaction States**
```css
/* Default state */
background: transparent;
color: var(--primary-purple);
border: 1px solid var(--primary-purple);

/* Hover state */  
background: var(--primary-purple);
color: var(--primary-white);
transform: scale(1.02);

/* Focus state */
outline: 2px solid var(--light-purple);

/* Active/Tap state */
transform: scale(0.98);
```

### Responsive Breakpoints

📌 **Mobile-First Breakpoint System**
```css
/* Mobile: 320px - 479px (base styles) */
/* Tablet: 480px - 767px */
@media (max-width: 480px) { }

/* Desktop: 768px - 1199px */  
@media (max-width: 768px) { }

/* Large screens: 1200px+ */
@media (min-width: 1200px) { }
```

## WhatsApp Integration Workflow

### Message Format Standards

📌 **Workshop Registration Message**
```javascript
// Template for specific workshop registration
`Hi, I'm interested for ${workshopName} by ${artistName} on ${dateWithoutYear} ${time}.`

// Example output:
"Hi, I'm interested for Hip Hop by Bindu on Jun 10 7:00 PM - 9:00 PM."
```

📌 **General Inquiry Message**  
```javascript
"RTRIBE Workshop Inquiry. Please share workshop details."
```

📌 **Implementation Pattern**
```javascript
// Always pass complete workshop object, not just title
onClick: () => registerFunction(workshopObject)

// Remove year from date display  
${workshop.date.replace(', 2025', '')}

// WhatsApp URL encoding
const whatsappUrl = `https://wa.me/917338003939?text=${encodeURIComponent(message)}`;
```

## Dev & QA Workflow

### Website Cloning Best Practices

📌 **Asset Discovery Process**
1. Crawl HTML pages for direct asset references
2. Extract JavaScript bundle asset URLs using regex patterns
3. Download CSS-referenced assets (fonts, images in url() declarations)
4. Verify all artist posters and media files are captured

📌 **URL Rewriting Rules**
```javascript
// Convert absolute URLs to relative paths
function rewriteUrls(content, baseUrl) {
  // For HTML: href="assets/..." src="assets/..."
  // For CSS: url("../fonts/...") url("../images/...")
  // Maintain directory structure for offline functionality
}
```

### Quality Assurance Checklist

📌 **Pre-Deployment Verification**
- [ ] Website loads without empty/white screen
- [ ] All artist poster images display correctly (12+ images)
- [ ] WhatsApp registration buttons generate proper messages
- [ ] Dance week schedule section fully functional
- [ ] Website works completely offline (no external requests)
- [ ] Responsive design functions on mobile/tablet/desktop
- [ ] Loading screen displays for appropriate duration

📌 **Asset Verification Process**
```bash
# Check total file count and size
find clone_directory -type f | wc -l
du -sh clone_directory

# Verify no 404 errors in browser console
# Test WhatsApp message generation manually
# Confirm all images load in browser developer tools
```

### Rollback & Safety Practices

📌 **JavaScript Modification Safety**
- Always create backup before modifying minified JavaScript
- Test changes incrementally (single message format change at a time)
- Verify website still loads after each modification
- Use exact string replacement (avoid regex for minified code)

📌 **Breaking Change Protocol**
When modifying WhatsApp message formats:
1. Backup original JavaScript bundle
2. Make single, targeted string replacement
3. Test website loading in browser
4. Verify message format in browser developer tools
5. Package and document changes

## Change-Management Safeguards

### No-Regress Contract

📌 **Backward Compatibility Rules**
- WhatsApp phone number (+91 7338003939) must remain constant
- Core navigation and user flow must not change
- Artist information display format should remain consistent
- All existing images and assets must continue to load

📌 **Regression Testing Steps**
```bash
# 1. Functional test
python3 -m http.server 8080
# Visit http://localhost:8080 and verify loading

# 2. Asset completeness  
find beinrtribe_clone -name "*.png" -o -name "*.jpg" | wc -l
# Should return 13+ image files

# 3. WhatsApp integration
# Click registration buttons and verify message format
# Check browser console for JavaScript errors
```

### Documentation & Communication

📌 **Change Documentation Format**
```markdown
## Change Summary
- **What**: Brief description of modification
- **Why**: Business justification  
- **Impact**: User-facing changes
- **Testing**: Verification steps completed
- **Rollback**: How to revert if needed
```

📌 **File Naming for Deliverables**
```
beinrtribe_clone.zip                    # Main package
beinrtribe_clone_delivery_info.md       # Installation instructions
SHA-256 checksum                        # Security verification
README-LOCAL.txt                        # Local setup guide
```

## Performance & Optimization

### Asset Loading Strategy

📌 **Critical Path Optimization**
```html
<!-- Preload critical assets -->
<link rel="preload" href="assets/css/index.css" as="style">
<link rel="preload" href="assets/js/index.js" as="script">

<!-- System fonts for immediate text rendering -->
font-family: Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif;
```

📌 **Image Optimization Standards**
- Artist photos: High-quality PNG (4-5MB acceptable for dance portfolio)
- Logo/icons: Optimized PNG with transparency
- Loading animation: Compressed GIF under 1MB
- Total package size target: 40-45MB for complete offline experience

### Bundle Size Management

📌 **JavaScript Bundle Optimization**
- Single bundled file for React application (~355KB)
- Minified CSS bundle (~3KB)
- No external dependencies (self-contained for offline use)
- Loading states prevent blank screen during initialization

---

*This document should be updated whenever design patterns, technical workflows, or quality standards evolve. Future AI assistants should reference these patterns when making modifications to maintain consistency and prevent regressions.* 