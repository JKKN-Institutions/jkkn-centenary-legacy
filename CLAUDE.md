# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**JKKN Centenary - 100 Years, 100 Ways** is a celebration website for J.K.K. Nattraja Educational Institutions' centenary (1925-2025). The platform showcases 100 meaningful community service initiatives across categories like education, environment, healthcare, infrastructure, and cultural heritage.

**Tech Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn-ui + React Router v6

**Current State:** Static data-driven application
**Planned Migration:** Dynamic Supabase-backed CMS with admin panel (see ACTIVITIES_MODULE_PRD.md)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://[::]:8080)
npm run dev

# Build for production
npm run build

# Build in development mode (with lovable-tagger)
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### Routing Structure
- `/` - Main activities listing page (Index.tsx)
- `/activity/:id` - Individual activity detail page (ActivityDetail.tsx)
- `*` - 404 catch-all (NotFound component)

Client-side routing only (SPA) - no SSR.

### Data Flow Pattern

**Current (Static):**
```typescript
src/data/all-activities.ts → Components (direct import)
```

**Planned (Dynamic):**
```typescript
Supabase DB → Edge Functions → TanStack Query hooks → Components
```

### State Management
- **Local component state** using `useState` - no global state library (Redux/Zustand)
- **TanStack Query** configured but not currently used (reserved for future API integration)
- State is scoped to individual components and passed via props

### Component Organization

```
src/
├── components/          # Feature components (21 files)
│   ├── ui/              # shadcn-ui primitives (40+ components)
│   ├── ActivityCard.tsx
│   ├── FilterBar.tsx
│   ├── PhotoGallery.tsx
│   └── ...
├── pages/               # Route pages
│   ├── Index.tsx        # Main listing
│   └── ActivityDetail.tsx
├── data/                # Static data source
│   └── all-activities.ts  # All 100 activities (1232 lines)
├── hooks/               # Custom React hooks (5 hooks)
├── lib/                 # Utilities
└── assets/              # Static images
```

**Component Pattern:** One component per file with TypeScript interfaces defined inline or imported.

### Custom Hooks

Key hooks for advanced functionality:

- `useIntersectionObserver` - Scroll-based animations and lazy loading
- `useCountUp` - Animated number counters for stats
- `useScrollDirection` - Smart header hide/show behavior
- `useIsMobile` - Responsive breakpoint detection
- `use-toast` - Toast notification system (shadcn)

### Styling System

**Design Tokens:** HSL-based color system defined in `index.css` (9333 lines)
**Theme:** Warm orange JKKN branding with custom animations
**Approach:** Tailwind utility-first with CSS variables for theming

**Key Configuration:**
- `tailwind.config.ts` - 16 custom animations (fade, slide, shimmer, glow, etc.)
- Custom shadows with warm tints
- Container max-width: 1440px
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

**shadcn-ui Integration:**
- Component library configuration in `components.json`
- CSS variables strategy for theming
- Path alias: `@/*` maps to `./src/*`

## Data Structure

### Activity Schema (Current Static)

```typescript
interface ExtendedActivity {
  id: string;                 // Slug-like identifier
  title: string;
  description: string;
  status: "completed" | "ongoing" | "planned";
  category: Category;         // 9 categories (tree-plantation, education, etc.)
  progress: number;           // 0-100
  image: string;              // Static asset key (imageMap lookup)
  date: string;
  location: string;
  participants?: number;
  organizer?: string;
  metrics?: Array<{           // Display metrics (icon + label + value)
    icon: string;
    value: number;
    label: string;
    color?: string;
  }>;
  visionText?: string;
  galleryPhotos?: Array<{
    imageKey: string;         // Static asset key
    caption: string;
  }>;
  impactStats?: Array<{       // Impact statistics
    icon: string;
    value: number;
    label: string;
    color?: string;
  }>;
  testimonials?: Array<{
    quote: string;
    name: string;
    role: string;
    avatar?: string;
  }>;
}
```

**Location:** `src/data/all-activities.ts` (100 activities hardcoded)

### Future Database Schema

When migrating to Supabase, the data will be split into normalized tables:
- `activities` (main table)
- `activity_metrics` (one-to-many)
- `activity_impact_stats` (one-to-many)
- `activity_gallery` (one-to-many)
- `activity_testimonials` (one-to-many)
- `activity_relations` (many-to-many self-join for related activities)

See `ACTIVITIES_MODULE_PRD.md` for complete schema design.

## Key Pages & Features

### Index Page (Main Listing)
**File:** `src/pages/Index.tsx`

**Sections:**
1. Hero section with centenary branding and parallax effects
2. StatsOverview with animated counters (completed/in-progress/upcoming counts)
3. FilterBar - sticky, scroll-aware, with:
   - Full-text search (title + description)
   - Category filter (9 categories)
   - Status filter (completed/ongoing/planned)
4. ActivityCard grid (responsive 1-3 columns)
5. Footer with timeline visualization (1925-2025-2125)

**Performance:** Uses `useIntersectionObserver` for lazy rendering and scroll animations.

### ActivityDetail Page
**File:** `src/pages/ActivityDetail.tsx`

**Sections:**
1. Hero image with breadcrumbs
2. Metrics display (icon + label + value)
3. Vision text sections
4. Photo gallery with lightbox (click to expand)
5. Impact statistics with animated counters
6. Testimonials carousel
7. Related activities suggestions (filtered by category)
8. Download/Share buttons

**Routing:** Uses `useParams` to get activity ID from URL, then finds in `allActivities` array.

## Image Handling

### Current System
**Static images** in `src/assets/` directory (10 JPG files)

**Image Map Pattern:**
```typescript
import heroPlaceholder from "@/assets/hero-placeholder.jpg";

const imageMap: Record<string, string> = {
  "hero-placeholder": heroPlaceholder,
  // ... more mappings
};

// Usage in components:
<img src={imageMap[activity.image]} />
```

### Future System (Post-Migration)
Images will be stored in **Supabase Storage** buckets:
- `activity-images` (10MB limit, JPG/PNG/WEBP)
- `testimonial-avatars` (2MB limit, JPG/PNG/WEBP)

Components will use direct URLs: `<img src={activity.hero_image_url} />`

## Important Patterns

### Performance Optimization
- **Intersection Observer** for viewport-based lazy loading
- **useMemo** for expensive filter/search computations
- **Scroll-based animations** with staggered delays
- Image lazy loading with `loading="lazy"`

### Accessibility
- ARIA labels on interactive elements
- Semantic HTML (header, main, footer, article, section)
- Skip links for keyboard navigation
- Alt text on all images

### SEO
- `SEO.tsx` component for meta tags
- Open Graph support
- Slug-based URLs for activities
- Structured breadcrumbs

## TypeScript Configuration

**Base Config:** `tsconfig.json` with project references

**Key Settings:**
- Path alias: `@/*` → `./src/*`
- `noImplicitAny: false` (relaxed for rapid development)
- `strictNullChecks: false` (relaxed)
- `skipLibCheck: true`
- `allowJs: true`

**Compilation:** Uses Vite with React SWC for fast builds

## Build Configuration

**File:** `vite.config.ts`

**Settings:**
- Dev server: `host: "::"` (IPv6), `port: 8080`
- Plugins: React SWC, lovable-tagger (development mode only)
- Path alias resolution: `@` → `./src`

**Production Build:**
- Output: `dist/` directory
- Assets optimization and chunking
- TypeScript type-checking

## Supabase Integration (Planned)

**Project Reference:** `htpanlaslzowmnemyobc`
**MCP Configuration:** `.mcp.json` includes Supabase server config

**Migration Plan:**
1. Database schema creation (6 tables + enums)
2. Edge Functions for API endpoints (7 functions)
3. Admin panel for CRUD operations
4. Frontend migration to TanStack Query hooks
5. Data migration from static files
6. Remove static data files

**Timeline:** 5 weeks (see ACTIVITIES_MODULE_IMPLEMENTATION_PLAN.md)

## Role-Based Access Control (Future)

**Roles:**
- `admin` - Full CRUD, publish/unpublish, delete
- `moderator` - Create/edit activities, cannot publish or delete
- `user` - Public read-only access to published activities

**RLS Policies:** Row Level Security on all tables to enforce permissions

## Common Tasks

### Adding a New Activity (Current Static Method)
1. Add hero image to `src/assets/` and import in component
2. Add entry to `allActivities` array in `src/data/all-activities.ts`
3. Include all nested data (metrics, gallery, testimonials, etc.)
4. Update `imageMap` if using new images

### Adding a New shadcn-ui Component
```bash
npx shadcn@latest add [component-name]
```
Components are added to `src/components/ui/`

### Filtering & Search Implementation
**Location:** `src/pages/Index.tsx`

**Logic:**
```typescript
const filteredActivities = useMemo(() => {
  return allActivities.filter(activity => {
    const matchesSearch = searchTerm === "" ||
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" ||
      activity.category === selectedCategory;

    const matchesStatus = selectedStatus === "all" ||
      activity.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });
}, [searchTerm, selectedCategory, selectedStatus]);
```

Uses `useMemo` to avoid re-filtering on every render.

## Migration Considerations

When transitioning from static to dynamic:

1. **Replace imports:**
   ```typescript
   // Before:
   import { allActivities } from "@/data/all-activities";

   // After:
   const { data: activities, isLoading } = useActivities({ published: true });
   ```

2. **Add loading states:**
   ```typescript
   if (isLoading) return <ShimmerLoader />;
   if (error) return <ErrorBoundary />;
   ```

3. **Update image references:**
   ```typescript
   // Before: imageMap[activity.image]
   // After: activity.hero_image_url
   ```

4. **Handle async data:** Components must handle undefined/null states during loading

## Documentation References

- **Project PRD:** `ACTIVITIES_MODULE_PRD.md` - Complete product requirements
- **Implementation Plan:** `ACTIVITIES_MODULE_IMPLEMENTATION_PLAN.md` - Technical migration guide
- **shadcn-ui Docs:** https://ui.shadcn.com/
- **Vite Docs:** https://vite.dev/
- **TanStack Query:** https://tanstack.com/query/latest (for future API integration)

## Code Style Notes

- **Component naming:** PascalCase (e.g., `ActivityCard.tsx`)
- **Hook naming:** camelCase with "use" prefix (e.g., `useIntersectionObserver.tsx`)
- **Utility files:** kebab-case or camelCase (e.g., `utils.ts`)
- **One component per file** - no barrel exports
- **TypeScript interfaces** defined in same file unless shared across multiple files
- **CSS:** Tailwind utility classes preferred over custom CSS
- **Formatting:** Project uses ESLint with React + TypeScript plugins
