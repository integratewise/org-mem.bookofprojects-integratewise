# 🖼️ IntegrateWise Image Gallery / CMS

Centralized image management system. **Drop images in → Reference by ID → Auto-sync to sites.**

---

## 📁 Folder Structure

```
ImageGallery/
├── heroes/           # Hero banners (1920x1080)
├── features/         # Feature section visuals
├── illustrations/    # Concept art & illustrations
├── infographics/     # Diagrams, comparisons, charts
├── screenshots/      # App screenshots
│   └── onboarding/   # Onboarding flow
├── logos/            # Brand logos
├── icons/            # Icons & small graphics
├── generated/        # AI-generated images
├── stock/            # Stock photos (external)
├── thumbnails/       # Auto-generated thumbnails
├── manifest.json     # Image registry (auto-generated)
└── README.md         # This file
```

---

## 🚀 Quick Usage

### 1. Add New Images

Simply drop files into the appropriate folder:

```bash
# Hero image for new landing page
cp new-hero.png ImageGallery/heroes/

# Screenshot for docs
cp dashboard.png ImageGallery/screenshots/app/
```

### 2. Reference in Code

```tsx
// Using the image ID from manifest
import { getImage } from '@/lib/image-gallery';

const heroImage = getImage('hero-001');
// Returns: { src: '/ImageGallery/heroes/...', alt: 'Main Homepage Hero', ... }

<img src={heroImage.src} alt={heroImage.alt} />
```

### 3. Or Direct Path

```tsx
<img src="/ImageGallery/heroes/hero-001.png" alt="Hero" />
```

---

## 📋 Image Manifest

All images are cataloged in `manifest.json` with:

- **ID** - Unique identifier (e.g., `hero-001`)
- **Filename** - Actual file name
- **Tags** - Search/filter tags
- **Usage** - Recommended page placements
- **Dimensions** - Width x Height

### Search Images

```bash
# Find by tag
cat manifest.json | jq '.categories.heroes.images[] | select(.tags[] == "b2b")'

# Find by usage
cat manifest.json | jq '.categories.illustrations.images[] | select(.usage[] == "pricing-page")'
```

---

## 🔄 Sync to FrontEnd Sites

Images are automatically synced to:

| Site | Path |
|------|------|
| Marketing (integratewise.ai) | `FrontEnd/sites/marketing/public/images/` |
| Landing (go.integratewise.ai) | `FrontEnd/sites/landing/public/images/` |
| Portfolio (showcase.integratewise.ai) | `FrontEnd/sites/portfolio/public/images/` |

### Manual Sync

```bash
# Run sync script
node scripts/sync-images.mjs

# Or sync specific category
node scripts/sync-images.mjs --category heroes --site marketing
```

---

## ☁️ Cloud CDN Setup (Optional)

To enable Cloudflare R2 CDN:

1. Set bucket name in `manifest.json` → `cdn.bucket`
2. Upload images: `npm run upload-images`
3. Base URL auto-switches to CDN

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

## 📊 Current Inventory

| Category | Count | Formats |
|----------|-------|---------|
| Heroes | 6 | PNG |
| Features | 1 | PNG |
| Illustrations | 11 | PNG |
| Infographics | 3 | PNG |
| Screenshots | 12 | PNG |
| Logos | 1 | PNG |
| Icons | 6 | SVG/PNG |
| **Total** | **41** | PNG/SVG |

---

## 📝 Naming Convention

When adding new images, follow this pattern:

```
[descriptor]_[purpose]_[variant]-[timestamp].png

Examples:
- Professional_B2B_SaaS_hero_image-1774519181744.png
- Split-screen_comparison_infographic-1774651518950.png
- dashboard_screenshot_v2-20260329.png
```

Or use simple IDs after adding to manifest:
```
hero-007.png
feature-002.png
```

---

## 🛠️ Helper Scripts

### Add Image to Manifest

```bash
node scripts/add-image.mjs --file new-image.png --category heroes --tags "b2b,homepage"
```

### Generate Thumbnails

```bash
node scripts/generate-thumbnails.mjs
```

### Validate Manifest

```bash
node scripts/validate-manifest.mjs
```

---

## 🔗 Integration with FrontEnd

### React Hook

```tsx
// hooks/useGalleryImage.ts
import manifest from '@image-gallery/manifest.json';

export const useGalleryImage = (id: string) => {
  // Search all categories for image ID
  for (const [cat, data] of Object.entries(manifest.categories)) {
    const found = data.images?.find(img => img.id === id);
    if (found) return { ...found, category: cat };
  }
  return null;
};
```

### Next.js Image Component

```tsx
import Image from 'next/image';
import { useGalleryImage } from '@/hooks/useGalleryImage';

export const GalleryImage = ({ id, ...props }) => {
  const img = useGalleryImage(id);
  if (!img) return null;
  
  return (
    <Image
      src={`/images/${img.category}/${img.filename}`}
      alt={img.name}
      width={800}
      height={600}
      {...props}
    />
  );
};

// Usage: <GalleryImage id="hero-001" />
```

---

**Last Updated:** March 29, 2026  
**Total Images:** 41 across 9 categories
