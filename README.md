# CEI Website — Images Folder
# =====================================================
# All image placeholders and recommended specifications
# =====================================================

## REQUIRED IMAGES

### 1. hero-bg.jpg  ← PRIORITY
- Section: Hero background
- Usage: background-image in css/style.css under .hero-section
  Replace: the gradient fallback in .hero-section
- Size: 1920×1080px minimum (landscape, wide)
- Style: Supply chain / shipping containers / aerial port / logistics
- Sources: Unsplash.com → search "shipping containers aerial", "port logistics", "supply chain global"
- Code to update in css/style.css:
    .hero-section {
      background-image: url('../images/hero-bg.jpg');
    }

### 2. about-warehouse.jpg
- Section: About (left column image)
- Usage: Replace the .about-img-placeholder div in index.html
  Find the comment: <!-- Replace src="" with actual image path -->
- Size: 600×700px (portrait or square)
- Style: CEI warehouse interior, or Batavia IL aerial, or team photo
- Replace the placeholder div with:
    <img src="images/about-warehouse.jpg"
         alt="CEI warehouse facility in Batavia, Illinois"
         class="rounded-2xl w-full h-96 object-cover"
         loading="lazy"
         width="600" height="700" />

### 3. logo.svg or logo.png  (OPTIONAL)
- Section: Header & Footer (replaces styled text "CEI")
- Usage: Replace the .logo-badge div in header
- Size: SVG preferred, or PNG at 200×60px (2x for retina: 400×120px)
- Background: transparent
- If you have a logo, update header in index.html:
    <img src="images/logo.svg" alt="Chicago Expert Importers" class="h-10" />

### 4. og-image.jpg  (OPTIONAL — SEO)
- Section: Open Graph / Social Share preview
- Usage: Add to <head>: <meta property="og:image" content="images/og-image.jpg" />
- Size: 1200×630px
- Style: Logo + "Chicago Expert Importers" on navy background

## OPTIONAL ENHANCEMENT IMAGES

### 5. service-sourcing.jpg
- Section: Services card — Global Sourcing
- Style: Factory floor, product assembly in Asia
- Size: 400×250px

### 6. service-manufacturing.jpg
- Section: Services card — Contract Manufacturing
- Style: Manufacturing line, industrial production
- Size: 400×250px

### 7. service-logistics.jpg
- Section: Services card — Import/Export Logistics
- Style: Container ship, air freight, customs
- Size: 400×250px

### 8. service-warehousing.jpg
- Section: Services card — Warehousing & Distribution
- Style: Warehouse interior with shelving and forklifts
- Size: 400×250px

## FREE IMAGE SOURCES
- Unsplash.com (free, no attribution required)
- Pexels.com (free, no attribution required)
- Pixabay.com (free)
- Search terms: "supply chain", "shipping containers", "logistics warehouse",
  "cargo port", "global trade", "contract manufacturing", "freight forwarding"

## OPTIMISATION TIPS
- Convert to WebP format for 30-50% smaller file sizes
- Use tools: Squoosh.app, TinyPNG.com, ImageOptim
- Recommended max sizes: hero < 300KB, cards < 80KB each
