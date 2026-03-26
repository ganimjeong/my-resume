# Ajin's Resume

**언어 / Language / 言語**
&nbsp;·&nbsp;[한국어](README.md)
&nbsp;·&nbsp;[English](README.en.md)
&nbsp;·&nbsp;[日本語](README.ja.md)

---

## English

A multilingual interactive portfolio website built with React + TypeScript.
Features rich GSAP-powered animations and Lenis smooth scrolling.

**Demo:** https://ganimjeong.github.io/my-resume

---

### Tech Stack

| Category | Technology |
|----------|------------|
| UI | React 19, TypeScript 5.7 |
| Styling | Tailwind CSS v3 |
| Animation | GSAP 3.14 (ScrollTrigger, SplitText, Physics2DPlugin) |
| Scrolling | Lenis |
| Routing | React Router DOM v6 |
| Build | Vite 6 |
| Deploy | GitHub Pages (GitHub Actions auto-deploy) |

---

### Features & Interactions

- **3 language support** — Choose Korean / English / Japanese on the landing page
- **ShapeOverlay page transition** — SVG curved wave sweeps across the screen in orange gradient
- **SplitText scroll animation** — About description and Dongari-um text reveal line-by-line with masked scroll scrub
- **Click particle effect** — `Physics2DPlugin` triggers a particle explosion at every click position
- **Scroll-linked rotation** — Awards 🏆 and project D image rotate -45° → +45° as you scroll
- **Scroll-velocity skew** — Languages section tilts via `skewY` when scrolling fast
- **Cursor-tracking eye** — Footer's large SVG eye moves iris and pupil toward the cursor (clipped to eye shape)
- **Lenis smooth scroll** — Smooth inertia scrolling synced with GSAP ScrollTrigger
- **Accordion language section** — Languages items expand/collapse with GSAP height animation
- **Contact copy** — Phone number click copies to clipboard with GSAP toast notification

---

### File Structure

```
src/
├── pages/
│   ├── Landing.tsx          # Language selection landing (3D rolling text, SplitText)
│   └── Resume.tsx           # Main resume layout
├── components/
│   ├── resume/
│   │   ├── Header.tsx       # Greeting, About description, contact links
│   │   ├── Skills.tsx       # Skill category grid
│   │   ├── Experience.tsx   # Career / experience (right→left slide-in)
│   │   ├── Awards.tsx       # Awards list (🏆 scroll rotation)
│   │   ├── Languages.tsx    # Language skills accordion (skewY interaction)
│   │   ├── Projects.tsx     # Ongoing project (D image rotation, SplitText)
│   │   └── Footer.tsx       # Orange footer (curve swipe entrance, cursor-tracking eye)
│   ├── gallery/
│   │   └── BentoGallery.tsx # Bento-style image gallery
│   └── shared/
│       ├── ShapeOverlay.tsx # SVG wave page transition overlay
│       └── ClickEffect.tsx  # Click particle effect (Physics2DPlugin)
├── data/
│   ├── types.ts             # ResumeData interface (single source of truth)
│   ├── ko.ts                # Korean content
│   ├── en.ts                # English content
│   ├── ja.ts                # Japanese content
│   └── index.ts             # Language → data mapping
└── index.css                # Tailwind global styles
```

---

### Development

**Requirements:** Node.js 20+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173/my-resume/

# Production build (includes type check)
npm run build

# Preview build output
npm run preview
```

Access by locale:
```
http://localhost:5173/my-resume/resume/ko
http://localhost:5173/my-resume/resume/en
http://localhost:5173/my-resume/resume/ja
```

---

### GSAP Plugins

All plugins must be registered before use.

```ts
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, Physics2DPlugin)
```

---

### Editing Content

- Edit resume content: `src/data/en.ts` (or `ko.ts`, `ja.ts`)
- Add a new section: update `types.ts` → add content to all three language files → create component → add to `Resume.tsx`
- **Note:** All three language files must match the `ResumeData` type at all times. TypeScript will catch mismatches at build time.

---

### Deployment

GitHub Actions automatically deploys `dist/` to GitHub Pages on every push to `master`.
Do not change `base: '/my-resume/'` in `vite.config.ts`.
