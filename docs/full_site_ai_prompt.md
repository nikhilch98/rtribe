# RTRIBE Dance-Studio — Pixel-Perfect Re-Creation Prompt

> **Objective** – Generate a *fully-functional*, *pixel-perfect* clone of the RTRIBE single-page web application (frontend + API server + admin CMS) exactly as specced below. *Do **not** deviate.* Everything – layouts, colours, fonts, breakpoints, data-driven UI, Flask endpoints, admin flows, animations – must reproduce 1 : 1 behaviour and visuals.

---

## 0. Technology stack
1. **Frontend** – Vanilla HTML5 + CSS3 (+ minimal ES6) only. Use **CSS custom-properties** design-token system detailed below. No frameworks.
2. **Backend** – Python 3.12, **Flask 3.0** server, single file `app.py` (347 loc). Runs on `0.0.0.0:51176`, debug True.
3. **Data** – JSON config file `data/config.json` (live-reloaded). Uploads stored under `static/assets/` (images) & `static/assets/videos/` (videos).
4. **Admin** – Thin HTML + JavaScript dashboard: `/login` → `/dashboard` (secured via session cookie `logged_in`). Default creds `admin / password`.

---

## 1. Design-token system (global `:root` variables)
```css
:root {
  /* Core palette */
  --primary-purple:#6A0DAD; --light-purple:#9B59B6; --dark-purple:#4A0080;
  --primary-white:#FFFFFF; --secondary-white:#F5F5F5;
  --text-dark:#333333; --text-purple:#6A0DAD;

  /* Gradients & overlays */
  --brand-gradient:linear-gradient(135deg,#000000 0%,#1a0033 33%,#2d004d 66%,#000000 100%);
  --overlay-dark-60:rgba(0,0,0,.6); --overlay-dark-40:rgba(0,0,0,.4);
  --overlay-purple-40:rgba(106,13,173,.4); --overlay-purple-30:rgba(106,13,173,.3); --overlay-purple-20:rgba(106,13,173,.2);

  /* Shadows */
  --shadow-hero:0 20px 60px rgba(0,0,0,.8),0 8px 24px rgba(106,13,173,.3);
  --shadow-card:0 4px 12px rgba(0,0,0,.15);
  --shadow-minor:0 2px 6px rgba(0,0,0,.1);

  /* Spacing scale */
  --space-xs:4px; --space-sm:8px; --space-md:12px; --space-lg:16px; --space-xl:24px; --space-xxl:32px; --space-xxxl:48px;

  /* Type scale */
  --font-h1:3.2em; --font-h2:2.4em; --font-h3:1.8em;
  --fw-bold:700; --fw-semi:600;
  --lh-tight:1.2; --lh-normal:1.5; --lh-relaxed:1.6;

  /* Focus ring */
  --focus-ring:2px solid var(--light-purple); --focus-offset:2px;

  /* Breakpoints */
  --bp-mobile:480px; --bp-tablet:768px; --bp-desktop:1024px; --bp-large:1200px;
}
```
Fonts: *Montserrat* (body) & *Playfair Display* (headings). Universal focus style:
```css
*:focus-visible{outline:var(--focus-ring);outline-offset:var(--focus-offset)}
```

---

## 2. Frontend UI (sections top-to-bottom)

### 2.1 Header (fixed 80 px)
* Glass-morphism bar `rgba(255,255,255,.08)` + `backdrop-filter:blur(20px)saturate(180%)`.
* Left: 50 × 50 px circular logo PNG (`static/assets/images/Logo.png`) + brand text "RTRIBE" 2 rem white.
* Nav pill (`.nav-list`) – blur 20 px, 1 % white fill, radius 42 px, 1 px border rgba(255,255,255,.5). Items uppercase 0.85 rem; hover/active purple glow.
* Mobile hamburger toggles nav list (ES6 script toggles `.mobile-open`).

### 2.2 Hero carousel (100 vh)
* Background = `--brand-gradient` animated (`@keyframes gradientAnimation 15s ease infinite`).
* Slides array pulled from **`config.carouselImages`**; each item ⇒ poster card (aspect category 3 : 4 or 16 : 9 obeying `aspectRatioCategory`).
* Central slide 340 px, side slides 240 px blurred 20 px & 60 % opacity. Dot indicators (8 px) below.
* JS cycles every 6 s; left/right arrow keys & swipe support.

### 2.3 Regulars section
* Title *Regulars* (H2). Slides **`config.secondaryCarouselImages`** (identical mechanics but smaller, 300 × 400 px).

### 2.4 Instructors grid
* Section generated from **`config.sections[0].items`** (id "Instructors"). Twelve 240 × 240 px purple-filtered square cards; hover scale 1.05 shadow Card.

### 2.5 Testimonials
* Lavender radial background (#FFFFFF→#EDE8F8).
* Left video player (`<video>` 400 × 711, autoplay muted loop) bound to **`config.testimonialVideos[active].url`**.
* Right 3 testimonial cards white 8 px radius, stars + quote + avatar.
* Autoplay advances to next video on `ended` event.

### 2.6 "Namma Dance Week Showcase" CTA section
* Brand-gradient background + radial purple overlays (before) + side fades (after).
* Two CTA buttons: Primary filled (purple) / Secondary outline. On click fire WhatsApp registration link (`https://wa.me/917338003939?text=encodedMessage`).

### 2.7 Footer
* Gradient → solid black. Three-column grid: contact, hours, register.
* Register form posts to mailto or stub (front-end only). Submit button full-width purple, `var(--fw-semi)`.
* Bottom bar 1 px top border rgba(106,13,173,.3) + 0.8 rem white-70 % copyright.

### 2.8 Global interactions & responsiveness
* Hover = scale 1.02, Tap 1.0->0.98; transition 0.25 s ease.
* Breakpoints: ≤768 px shrink paddings 20 %; ≤480 px single-column grids, hero slides use mobile layout.
* `prefers-reduced-motion:reduce` disables animation.

---

## 3. Backend API (`app.py`)

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/` | GET | public | Serve `index.html` SPA |
| `/login` | GET/POST | public | Admin login (session cookie) |
| `/dashboard` | GET | login | Render `admin_dashboard.html` |
| `/logout` | GET | login | Clear session |
| `/api/sections` | GET | – | Return full **config** JSON |
| `/api/sections` | POST | login | Persist **sections** array (CRUD & reorder) |
| `/api/carousel` | POST | login | Persist `carouselImages` |
| `/api/secondary-carousel` | POST | login | Persist `secondaryCarouselImages` |
| `/api/testimonial-videos` | GET | – | Return `testimonialVideos` array |
| `/api/testimonial-videos` | POST | login | Persist `testimonialVideos` |
| `/api/upload` | POST | login | Upload image; returns `{imageUrl,aspectRatio,aspectRatioCategory}` |
| `/api/detect-aspect-ratio` | POST | login | Compute ratio of existing image URL |
| `/api/upload-video` | POST | login | Upload video; returns `{videoUrl}` |

*Auth* – Decorator `login_required` checks `session['logged_in']`.
*Uploads* saved under `static/assets/`; allowed extensions `{png,jpg,jpeg,gif,mp4,mov,avi,webm}`.

### Config schema (`data/config.json`)
```jsonc
{
  "siteData": {"title":"Workshops"},
  "carouselImages": [{id,title,description,imageUrl,aspectRatio,aspectRatioCategory}],
  "secondaryCarouselImages": [{id,imageUrl,aspectRatio,aspectRatioCategory}],
  "sections": [{id,title,items:[{id,image,artist,style,date,time,price,aspectRatio,aspectRatioCategory}]}],
  "testimonialVideos": [{id,title,description,thumbnail,url}]
}
```
Frontend fetches these collections on load and renders every section dynamically; all carousels/instructor grids are 100 % config-driven.

---

## 4. Admin CMS (`/dashboard`)
* React-less, pure JS dashboard (Bootstrap-like styling) – left nav tree lists *Carousel*, *Secondary Carousel*, *Sections*, *Testimonial Videos*.
* Drag-&-drop re-ordering (HTML5 DnD). *Inline* title & description editing (contenteditable).
* Image/video upload buttons call `/api/upload` or `/api/upload-video`; progress bar shown.
* Aspect ratio detection auto-sets `aspectRatioCategory` for responsive CSS via returned value.
* Top-right *Save* button serialises current panel state to appropriate POST endpoint.
* Logout clears session.

---

## 5. WhatsApp integration
`registerFunction(workshopObject)` builds message:
```js
`Hi, I'm interested for ${workshop.style} by ${workshop.artist} on ${dateWithoutYear} ${time}.`
```
Encodes & opens `https://wa.me/917338003939?text=${encodeURIComponent(msg)}`.

---

## 6. File structure you **must** output
```
project/
  app.py                # Flask backend (exact 347-line logic above)
  data/config.json      # Seed config per schema
  static/
    assets/             # All images/videos uploaded here
      images/Logo.png
      videos/Video-705.mp4
    css/components.css  # Full stylesheet with tokens, utilities, sections
    js/index.js         # Dynamic rendering + carousels + WhatsApp util
  templates/
    index.html
    admin.html          # login form
    admin_dashboard.html
```
All routes & files must interoperate exactly as in the reference site.

---

### Deliverables
Return **HTML/CSS/JS code** & **Flask server code** as described, ensuring that when run (`python app.py`) and opened at `http://localhost:51176` the SPA looks *pixel-identical* to the provided screenshot (1920×1080) and admin CMS works flawlessly.

---

*End of prompt.* 