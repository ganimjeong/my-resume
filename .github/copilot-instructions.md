# AI Coding Agent Instructions for my-resume

## Project Overview
A multilingual resume/portfolio website built with React 19 & TypeScript, deployed on GitHub Pages. The project uses Vite for fast development and Tailwind CSS for styling. It supports three languages: English, Japanese, and Korean.

**Key URLs:** GitHub Pages deployment at `/my-resume/` (see `vite.config.ts` base path)

---

## Architecture & Data Flow

### Language-Based Routing
- **Entry:** `src/App.tsx` - BrowserRouter with dynamic language routing
- **Route Pattern:** `/resume/:lang` where lang ∈ {'en', 'ja', 'ko'}
- **Data Layer:** `src/data/` contains language-specific files
  - `types.ts` - Central TypeScript interface `ResumeData` (header, about, skills, experience, projects)
  - `en.ts`, `ja.ts`, `ko.ts` - Language-specific implementations of `ResumeData`
  - `index.ts` - Exports `resumeData` object mapping languages to data

### Component Pattern
- Resume page (`src/pages/Resume.tsx`) uses `useParams()` to get language, then loads from `resumeData[currentLang]`
- Each section (Header, About, Skills, Experience, Projects) receives the full `ResumeData` object and renders its portion
- **Important:** Components are not yet created but follow naming convention in README

### Data Structure
All resume content flows through the `ResumeData` interface. To add/modify sections:
1. Update type in `src/data/types.ts`
2. Add content to all three language files: `ko.ts`, `en.ts`, `ja.ts`
3. Ensure types match across all files

---

## Developer Workflows

### Setup & Development
```bash
npm install              # Node 20+ required
npm run dev             # Vite dev server → http://localhost:5173
npm run build           # Type-check + build for production
npm run preview         # Test production build locally
```

### Build Process
- `npm run build` runs `tsc -b` first (type checking all tsconfig files)
- Vite builds to dist/ with base path `/my-resume/` (for GitHub Pages)
- GitHub Actions auto-deploys master branch to GitHub Pages

### Adding Languages
1. Create `src/data/[lang].ts` following `koData` structure
2. Add import + export entry in `src/data/index.ts`
3. Update route to accept new language param if needed

---

## Key Conventions & Patterns

### TypeScript Structure
- `tsconfig.json` - Base config (Node.js 20+)
- `tsconfig.app.json`, `tsconfig.node.json` - Specific configs for app and build
- All React components are `.tsx` files with explicit types

### Styling
- **Tailwind CSS** - Primary styling (see `tailwind.config.ts`)
- No CSS-in-JS; all styling via Tailwind utility classes
- `src/index.css` - Global styles (imports Tailwind directives)

### Module Boundaries
- `src/pages/` - Route-level pages (resume layout, landing)
- `src/components/` - UI components (Header, About, Skills, etc.) - not yet created
- `src/data/` - Content/configuration only; no business logic

### Export Convention
- Language data files (`ko.ts`, `en.ts`, `ja.ts`) export named exports: `export const koData: ResumeData = {...}`
- Central index exports type + data mapping: `export const resumeData: Record<'en'|'ja'|'ko', ResumeData>`

---

## Integration Points & Dependencies

### React Router
- Uses `react-router-dom` v6 for SPA navigation
- `useParams()` hook to access route parameters (language code)
- Fallback route redirects unmapped paths to `/`

### External Dependencies
- **React 19** - UI framework
- **Vite 6** - Build tool with fast HMR
- **Tailwind CSS 3** - Utility-first CSS
- **TypeScript 5.7** - Type checking
- **GSAP** - Animation library (with SplitText plugin for character-level animations)
- **React Router DOM v6** - SPA routing

### Animation Patterns
- **GSAP SplitText:** Used in `src/pages/Landing.tsx` to create rolling text effects by splitting text into characters
- **Example:** `new SplitText(element, { type: 'chars' })` creates character-level animation targets
- Register plugins before use: `gsap.registerPlugin(SplitText)`

### GitHub Pages Integration
- `vite.config.ts` sets `base: '/my-resume/'` for correct asset paths
- GitHub Actions workflow deploys dist/ on master branch push

---

## Common Tasks

### Edit Resume Content
1. Open `src/data/ko.ts` (or `en.ts`, `ja.ts`)
2. Modify content within `ResumeData` structure
3. Types in `src/data/types.ts` control available fields

### Create New Section
1. Add field to `ResumeData` in `types.ts`
2. Add content to all three language files
3. Create component in `src/components/[SectionName].tsx`
4. Add to resume page layout

### Test Locale
```bash
npm run dev
# Navigate to http://localhost:5173/resume/ko (or /en, /ja)
```

---

## Gotchas & Notes

- **GitHub Pages base path:** Assets served from `/my-resume/`; never change base in `vite.config.ts` without understanding impact
- **Language param case-sensitive:** Route expects lowercase 'en'/'ja'/'ko'
- **Type safety:** Always update all three language files when modifying `ResumeData`; TypeScript will catch mismatches
