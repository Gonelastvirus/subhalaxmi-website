# Subhalaxmi Property & Construction — Website Documentation

## Overview

This is the official display website for **Subhalaxmi Property & Construction** (SL Property & Construction), built with React + Vite. The website is a **showcase-only** platform — users can browse properties and services, but all interactions (buy, sell, contact) are handled through the mobile app. The primary goal of every page is to encourage users to download the APK.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite (TypeScript) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| API Client | React Query + auto-generated hooks |
| Backend Proxy | Express.js (forwards to external API) |
| External API | `https://replit-sample-app-draft.onrender.com` |

---

## Project Structure

```
artifacts/sl-property/           ← Frontend React app
  public/
    images/
      logo.png                   ← 📸 LOGO FILE (replace this)
      hero-bg.png                ← 📸 Hero background image (replace this)
      app-mockup.png             ← 📸 App mockup in Download CTA section
  src/
    components/
      Navbar.tsx                 ← Sticky navigation header
      Hero.tsx                   ← Hero section (full-screen banner)
      PropertySection.tsx        ← Featured property listings grid + filters
      ServicesSection.tsx        ← Construction partners/services section
      AboutSection.tsx           ← Mission, vision, contact info
      DownloadCTA.tsx            ← Big APK download call-to-action section
      DownloadModal.tsx          ← Popup shown when clicking a property
      Footer.tsx                 ← Footer with links and social icons
    pages/
      Home.tsx                   ← Main page with SEO meta tags
    lib/
      constants.ts               ← ⚙️ KEY SETTINGS FILE (APK URL, name, etc.)
    hooks/
      use-app-state.ts           ← Download modal state management
  vite.config.ts                 ← Vite config (dev proxy to external API)

artifacts/api-server/            ← Express backend (API proxy)
  src/
    routes/
      proxy.ts                   ← Forwards /api/properties, /api/services, /api/about
                                   to the external API URL

lib/api-spec/
  openapi.yaml                   ← API contract definition

lib/api-client-react/
  src/generated/                 ← Auto-generated React Query hooks (DO NOT EDIT)
```

---

## ⚙️ Key Settings — `artifacts/sl-property/src/lib/constants.ts`

This is the most important file for customization. Open it to change:

```typescript
// ✅ UPDATE THIS with your real APK download link before going live
export const APK_URL = "https://github.com/your-repo/releases/latest/download/app.apk";

// Company display name (used in copyright footer)
export const COMPANY_NAME = "Subhalaxmi Property & Construction";
```

### How to update the APK URL

1. Open `artifacts/sl-property/src/lib/constants.ts`
2. Replace the value of `APK_URL` with your GitHub Releases link, e.g.:
   ```typescript
   export const APK_URL = "https://github.com/your-org/your-app/releases/latest/download/app-release.apk";
   ```
3. Save the file — all download buttons across the site (navbar, hero, download CTA, footer) will automatically use the new URL.

The APK URL is used in these components:
- `DownloadCTA.tsx` — the big download section
- `Footer.tsx` — footer download link
- `DownloadModal.tsx` — popup when clicking a property
- The navbar "Get App" button triggers the modal which uses this URL

---

## 🖼️ How to Change the Logo

The logo is displayed in:
- **Navbar** (top-left, 40×40px rounded square)
- **Footer** (bottom-left, 48×48px rounded square)

**To replace the logo:**

1. Prepare your logo image (recommended: square PNG, minimum 200×200px, transparent background works best)
2. Rename it to `logo.png`
3. Replace the file at: `artifacts/sl-property/public/images/logo.png`
4. No code changes needed — the image path is already hardcoded to this location

The logo is referenced in code as:
```tsx
src={`${import.meta.env.BASE_URL}images/logo.png`}
```

---

## 🏔️ How to Change the Hero Background Image

The hero background (the full-screen image on the homepage) is at:

```
artifacts/sl-property/public/images/hero-bg.png
```

**To replace it:**
1. Prepare a wide landscape image (recommended: 1920×1080px or larger)
2. Rename it to `hero-bg.png`
3. Replace the file at `artifacts/sl-property/public/images/hero-bg.png`

For a Nepali feel, ideal images include:
- Traditional Nepali pagoda temples alongside modern buildings
- Kathmandu or Pokhara cityscape
- Mountain backdrop with residential areas

---

## 🔌 External API Configuration

The website fetches all data from your external API at:
```
https://replit-sample-app-draft.onrender.com
```

### To change the API URL

**File:** `artifacts/api-server/src/routes/proxy.ts`

```typescript
const EXTERNAL_API = "https://replit-sample-app-draft.onrender.com";
```

Change this constant to point to any new API URL.

**Note:** Also update the Vite development proxy in `artifacts/sl-property/vite.config.ts`:
```typescript
proxy: {
  "/api": {
    target: "https://replit-sample-app-draft.onrender.com",  // ← change this
    changeOrigin: true,
    secure: true,
  },
},
```

### Expected API Endpoints

Your external API must provide:

| Endpoint | Method | Description |
|---|---|---|
| `/api/properties` | GET | Property listings |
| `/api/services` | GET | Construction service providers |
| `/api/about` | GET | Company info (mission, vision, contact) |

#### `/api/properties` Query Parameters
| Parameter | Type | Description |
|---|---|---|
| `district` | string | Filter by district name |
| `listingType` | `sale` \| `rent` | Filter by listing type |
| `propertyType` | string | e.g. House, Land, Apartment, Commercial |
| `minPrice` | number | Minimum price in NPR |
| `maxPrice` | number | Maximum price in NPR |
| `bedrooms` | integer | Minimum number of bedrooms |
| `limit` | integer | Items per page (default: 12) |
| `offset` | integer | Pagination offset (default: 0) |

#### Expected `/api/properties` Response
```json
{
  "properties": [
    {
      "id": "1",
      "title": "Modern Villa in Kathmandu",
      "district": "Kathmandu",
      "price": 25000000,
      "priceUnit": "NPR",
      "propertyType": "House",
      "listingType": "sale",
      "bedrooms": 4,
      "area": "8 Anna",
      "imageUrl": "https://...",
      "description": "...",
      "location": "Banasthali, Kathmandu"
    }
  ],
  "total": 100,
  "offset": 0,
  "limit": 12
}
```

#### Expected `/api/services` Response
```json
{
  "services": [
    {
      "id": "1",
      "businessName": "Sharma Plumbing Works",
      "serviceType": "Plumber",
      "district": "Kathmandu",
      "description": "Expert plumbing services...",
      "phone": "9841234567"
    }
  ],
  "total": 20
}
```
> ⚠️ **Phone numbers are automatically masked on the website** — e.g. `9841234567` becomes `98****567`. This happens client-side in `constants.ts → maskPhone()`.

#### Expected `/api/about` Response
```json
{
  "mission": "To simplify property discovery...",
  "vision": "Becoming the leading housing platform...",
  "contactPhone": "+977-9742538573",
  "contactEmail": "info@slproperty.com.np",
  "address": "Chitwan, Bagmati Province, Nepal",
  "socialLinks": {
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/...",
    "twitter": "",
    "youtube": ""
  }
}
```

---

## 📱 APK Download Flow

The website is designed to push users to download the app at every opportunity:

| Location | Behavior |
|---|---|
| Navbar "Get App" button | Opens the download modal |
| Hero "Download APK" button | Opens the download modal |
| Clicking any property card | Opens the modal: "Download app to view details" |
| Clicking any service card | Opens the modal |
| Download CTA section | Direct APK download link |
| Footer | Direct APK download link |

The **Download Modal** (`DownloadModal.tsx`) shows:
- A message directing users to download the app
- The Download APK button (uses `APK_URL` from constants)
- A close button

---

## 🗺️ All Nepal Districts in Filter

The property filter includes all **77 districts** of Nepal organized by province:

- **Koshi Province** (14): Taplejung, Panchthar, Ilam, Jhapa, Morang, Sunsari, Dhankuta, Terhathum, Sankhuwasabha, Bhojpur, Solukhumbu, Okhaldhunga, Khotang, Udayapur
- **Madhesh Province** (8): Saptari, Siraha, Dhanusha, Mahottari, Sarlahi, Rautahat, Bara, Parsa
- **Bagmati Province** (13): Sindhupalachok, Kavrepalanchok, Lalitpur, Bhaktapur, Kathmandu, Nuwakot, Rasuwa, Dhading, Makwanpur, Chitwan, Sindhuli, Ramechhap, Dolakha
- **Gandaki Province** (11): Gorkha, Lamjung, Tanahun, Syangja, Kaski, Manang, Mustang, Myagdi, Parbat, Baglung, Nawalpur
- **Lumbini Province** (12): Rupandehi, Kapilvastu, Nawalparasi, Palpa, Arghakhanchi, Gulmi, Pyuthan, Rolpa, Rukum East, Dang, Banke, Bardiya
- **Karnali Province** (10): Dolpa, Humla, Jumla, Kalikot, Mugu, Surkhet, Dailekh, Jajarkot, Rukum West, Salyan
- **Sudurpashchim Province** (9): Bajura, Bajhang, Achham, Doti, Dadeldhura, Baitadi, Darchula, Kanchanpur, Kailali

---

## 🎨 Design & Colors

The theme uses a warm luxury palette with Nepali cultural tones:

| Variable | Usage |
|---|---|
| `--primary` | Gold/amber accent — buttons, highlights |
| `--background` | Off-white / warm cream — page background |
| `--secondary` | Light warm beige — card backgrounds |
| `--foreground` | Dark warm brown — headings and text |

To change colors, edit `artifacts/sl-property/src/index.css` and update the CSS variables under `:root`.

---

## 📄 SEO Configuration

SEO meta tags are set in `artifacts/sl-property/src/pages/Home.tsx`:

```tsx
<title>Subhalaxmi Property & Construction | Buy, Sell & Construction in Nepal</title>
<meta name="description" content="Find your dream property in Nepal..." />
<meta property="og:title" content="Subhalaxmi Property & Construction" />
```

Update these when you change the company name or description.

---

## 🚀 Development Commands

```bash
# Start development (runs all services)
pnpm --filter @workspace/sl-property run dev     # Frontend (port auto-assigned)
pnpm --filter @workspace/api-server run dev      # Backend proxy (port 8080)

# Build for production
pnpm --filter @workspace/sl-property run build

# Regenerate API hooks (after changing openapi.yaml)
pnpm --filter @workspace/api-spec run codegen
```

---

## 📦 Deployment Checklist

Before publishing the website:

- [ ] Update `APK_URL` in `artifacts/sl-property/src/lib/constants.ts`
- [ ] Replace `artifacts/sl-property/public/images/logo.png` with your actual logo
- [ ] Verify the external API is live at `https://replit-sample-app-draft.onrender.com`
- [ ] Test all filter dropdowns in the property section
- [ ] Confirm the Download Modal works on property/service card clicks
- [ ] Check that the About section loads your company info from the API

---

## 🔒 Data Privacy Notes

- **Owner phone numbers** (`ownerPhone`, `ownerWhatsapp`) are **never exposed** — they're not included in the API responses shown on the website
- **Service provider phone numbers** are masked client-side: first 2 digits + `****` + last 3 digits
- Example: `9841234567` → `98****567`
- This masking is done by the `maskPhone()` function in `constants.ts`

---

*Last updated: March 2026*
