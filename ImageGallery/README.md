# 🖼️ IntegrateWise Image Gallery / CMS

Centralized image management system with **Dropbox sync**. Drop images in Dropbox → Auto-import → Reference by ID → Deploy to sites.

---

## 📁 Folder Structure (~150MB, 420+ images)

```
ImageGallery/
├── marketing/         196 images (marketing content, illustrations)
├── icons/             149 images (SVG icons & vector graphics)
├── logos/              64 images (brand logos & variants)
├── screenshots/        33 images (product UI screenshots)
├── campaigns/          16 images (social media campaigns)
├── heroes/              6 images (homepage hero banners)
├── illustrations/      11 images (concept art)
├── infographics/        3 images (diagrams, comparisons)
├── features/            1 image (feature sections)
├── notes/               6 images (documentation screenshots)
├── whiteboards/         4 images (development whiteboards)
├── diagrams/            1 image (architecture diagrams)
├── product/             1 image (product images)
├── uncategorized/       4 images (needs manual categorization)
├── generated/           1 image (AI-upscaled)
├── stock/               (empty - for future)
├── manifest.json        # Image registry (420+ entries)
├── README.md            # This file
└── lib/                 # TypeScript + React library
    ├── index.ts         # getImage(), search, filter
    └── GalleryImage.tsx # React components
```

---

## 🔄 Dropbox Sync (Daily Auto-Sync)

Your Dropbox folder `/IntegrateWise - Collation March` is synced daily to ImageGallery.

### Auto-Categorization Rules

| Dropbox Folder | ImageGallery Category |
|----------------|----------------------|
| `Marketing Content/Images Gallery` | `marketing/` |
| `Marketing Content/SVG` | `icons/` |
| `Marketing Content/Brand Contents/Logo` | `logos/` |
| `Marketing Content/Brand Contents/Campaign` | `campaigns/` |
| `Product Presentations/Product Screenshots` | `screenshots/` |
| `Company Documentations/Whiteboards` | `whiteboards/` |
| Any `.svg` file | `icons/` |

### Manual Sync Commands

```bash
# One-time import from Dropbox
node scripts/dropbox-sync.mjs --import-all

# Watch mode (syncs every 24 hours)
node scripts/dropbox-sync.mjs --watch

# Preview what would sync (dry run)
node scripts/dropbox-sync.mjs --dry-run

# Verbose output
node scripts/dropbox-sync.mjs --import-all --verbose
```

---

## 🚀 Quick Usage

### 1. Add New Images (2 ways)

**Option A: Drop in Dropbox (Auto-sync)**
```bash
# Just drop files in Dropbox - they'll sync automatically
~/Dropbox/IntegrateWise - Collation March/Marketing Content/Images Gallery/
```

**Option B: Add directly to ImageGallery**
```bash
# Copy to folder
cp new-image.png ImageGallery/marketing/

# Add to manifest
node scripts/add-image.mjs --file new-image.png --category marketing --tags "b2b,homepage"
```

### 2. Reference in Code

```tsx
// Using the image ID from manifest
import { getImage } from '@/lib/image-gallery';

const image = getImage('mark-196'); // marketing-196
// Returns: { src: '/ImageGallery/marketing/...', alt: '...', tags: [...] }

<img src={image.src} alt={image.name} />
```

### 3. Search Images

```tsx
import { searchImages, findImagesByTag } from '@/lib/image-gallery';

// Search by name/tag
const results = searchImages('hero');

// Find by tag
const b2bImages = findImagesByTag('b2b');

// Get all in category
const icons = getImagesByCategory('icons');
```

---

## 📊 Current Inventory

| Category | Count | Description |
|----------|-------|-------------|
| Marketing | 196 | Marketing content, illustrations, gallery images |
| Icons | 149 | SVG vectors, UI icons |
| Logos | 64 | Brand logos, variants, formats |
| Screenshots | 33 | Product UI, onboarding, Knowledge UI |
| Campaigns | 16 | Social media posts, LinkedIn banners |
| Heroes | 6 | Homepage hero banners |
| Illustrations | 11 | Concept art, B2B illustrations |
| Infographics | 3 | Diagrams, comparisons |
| Notes | 6 | Documentation screenshots |
| Whiteboards | 4 | Development whiteboards |
| Other | 10 | Features, diagrams, product, etc. |
| **Total** | **~420** | PNG, SVG, JPG formats |

---

## 📋 Image Manifest

All images cataloged in `manifest.json`:

```json
{
  "id": "mark-196",
  "filename": "hero-banner.png",
  "name": "Hero Banner",
  "category": "marketing",
  "tags": ["hero", "b2b", "homepage"],
  "usage": ["landing-page", "marketing-site"],
  "format": "png",
  "source": "dropbox",
  "imported": "2026-03-29"
}
```

### Search via CLI

```bash
# Find by tag
cat manifest.json | jq '.categories.marketing.images[] | select(.tags[] == "hero")'

# Count by category
cat manifest.json | jq '.categories | map_values(.images | length)'
```

---

## 🛠️ Helper Scripts

| Script | Purpose |
|--------|---------|
| `dropbox-sync.mjs` | Sync from Dropbox to ImageGallery |
| `sync-images.mjs` | Sync to FrontEnd sites |
| `add-image.mjs` | Add single image to manifest |
| `validate-manifest.mjs` | Check for missing files |

---

## 🔗 Integration with FrontEnd

### Sync to Sites

```bash
# Sync all to all sites
node scripts/sync-images.mjs

# Sync specific category to specific site
node scripts/sync-images.mjs --category heroes --site marketing
```

### React Component

```tsx
import { GalleryImage } from '@/lib/image-gallery';

// By ID
<GalleryImage id="hero-001" width={1920} height={1080} />

// By category/filename
<GalleryImageByPath category="marketing" filename="banner.png" />

// Background
<GalleryBackground id="hero-001" overlay>
  <h1>Content over image</h1>
</GalleryBackground>
```

---

## ☁️ Cloud CDN Setup (Optional)

Enable Cloudflare R2 in `manifest.json`:

```json
{
  "cdn": {
    "enabled": true,
    "provider": "cloudflare-r2",
    "bucket": "integratewise-assets",
    "url": "https://assets.integratewise.ai"
  }
}
```

---

**Last Updated:** March 29, 2026  
**Total Images:** 420+ across 15 categories  
**Sync Source:** `/Users/nirmal/Dropbox/IntegrateWise - Collation March`
