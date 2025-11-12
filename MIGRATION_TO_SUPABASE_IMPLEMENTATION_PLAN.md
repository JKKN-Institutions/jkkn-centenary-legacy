# Migration to Supabase - Implementation Plan
## From Static Data to Real-Time Database Fetching

**Project:** JKKN Centenary Activities Application
**Goal:** Migrate from static data (all-activities.ts) to Supabase database (READ-ONLY)
**Admin Panel:** Separate application already managing activities in Supabase

---

## Executive Summary

This document outlines the complete migration strategy to replace static activity data with real-time Supabase data fetching. The application will become READ-ONLY for activities data, with all management done through the existing separate admin panel.

### Current State Analysis

**Database Schema (Supabase):**
- ✅ `activities` - Main table (1 row currently)
- ✅ `activity_metrics` - Metrics data (2 rows)
- ✅ `activity_impact_stats` - Impact statistics (1 row)
- ✅ `activity_gallery` - Photo gallery (1 row)
- ✅ `activity_testimonials` - Testimonials (1 row)
- ✅ `activity_categories` - Category definitions (5 rows)

**Static Data:**
- 📄 `src/data/all-activities.ts` - 100 hardcoded activities
- 🖼️ `src/assets/` - 9 static images
- 🗂️ imageMap pattern for image lookup

**Components Using Static Data:**
- `src/pages/Index.tsx` - Main listing, stats calculation
- `src/pages/ActivityDetail.tsx` - Activity detail view
- `src/components/FilterBar.tsx` - Category dropdown
- `src/components/StatsOverview.tsx` - Statistics calculations
- `src/components/ActivityCard.tsx` - Image display

---

## Critical Data Mapping Issues Identified

### 1. Status Field Mismatch ⚠️

| Static Data | Database | Mapping Required |
|------------|----------|------------------|
| `"completed"` | `"completed"` | ✅ Direct match |
| `"in-progress"` | `"ongoing"` | 🔄 Needs mapping |
| `"upcoming"` | `"planned"` | 🔄 Needs mapping |

**Solution:** Create status transformation function

### 2. Category Mismatch ⚠️

**Static Categories (9):**
- Community Service
- Education
- Environment
- Health & Wellness
- Infrastructure
- Culture & Heritage
- Technology
- Sports & Recreation

**Database Categories (6 only!):**
- community
- education
- environment
- healthcare
- infrastructure
- cultural

**Missing:** Health & Wellness, Technology, Sports & Recreation

**Solution:**
1. Fetch categories from `activity_categories` table
2. Use category name field for display
3. Map DB slugs to display names
4. Handle missing categories gracefully

### 3. Metrics Icon Field Missing ⚠️

**Static Structure:**
```typescript
metrics: [{ icon: "Users", label: "Workers", value: 100 }]
```

**Database Structure:**
```sql
activity_metrics: { metric_key: "asdasdasdas", metric_value: "85" }
-- NO icon field!
```

**Solution:**
- Assume `metric_key` stores icon name (or create default icon mapping)
- Add fallback icon if metric_key is not a valid icon name
- Update admin panel to store icon names in metric_key (future improvement)

### 4. Vision Text Format ⚠️

**Static:** Array of strings (paragraphs)
```typescript
visionText: ["Paragraph 1", "Paragraph 2", "Paragraph 3"]
```

**Database:** Single text field
```sql
vision_text: "Single long text without paragraph separation"
```

**Solution:**
- Split by double newline (`\n\n`) for paragraphs
- Or wrap in array: `[vision_text]` for single paragraph display

### 5. Image Handling 🔄

**Static:** imageMap lookup pattern
```typescript
image: "workers-honored" → imageMap["workers-honored"] → import
```

**Database:** Direct Supabase Storage URLs
```typescript
hero_image_url: "https://htpanlaslzowmnemyobc.supabase.co/storage/v1/object/public/..."
```

**Solution:**
- Remove imageMap pattern entirely
- Use direct URLs from database
- Update all image rendering components

### 6. Activity ID vs Slug 🔄

**Static:** Uses string ID as identifier
```typescript
id: "100-placards" (used in routing)
```

**Database:** UUID id + separate slug field
```typescript
id: "acff34e3-c681-44bf-813d-a1679d6a556a"
slug: "sadadasdasdas"
```

**Solution:**
- Keep routing by slug: `/activity/:slug`
- Fetch activity by slug instead of id
- Update ActivityDetail to use slug from URL params

---

## Implementation Architecture

### Technology Stack

- ✅ **React 18** - Already in use
- ✅ **TanStack Query v5.83.0** - Already installed
- ❌ **@supabase/supabase-js** - Need to install
- ✅ **TypeScript** - Already configured
- ✅ **Vite** - Build tool

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Supabase Database                  │
│  (activities, metrics, gallery, testimonials, etc.) │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ SQL Queries (JOIN)
                  ▼
┌─────────────────────────────────────────────────────┐
│            Supabase Client (Singleton)              │
│         src/lib/supabase/client.ts                  │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ Raw DB Data
                  ▼
┌─────────────────────────────────────────────────────┐
│          API Functions (Data Fetching)              │
│         src/lib/api/activities.ts                   │
│  - fetchActivities()                                │
│  - fetchActivityBySlug()                            │
│  - fetchCategories()                                │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ Transformed Data
                  ▼
┌─────────────────────────────────────────────────────┐
│      Transformation Layer (Data Mapping)            │
│      src/lib/transformers/activities.ts             │
│  - transformActivity() - DB → Static interface      │
│  - mapStatus() - ongoing → in-progress              │
│  - mapCategory() - slug → display name              │
│  - mapMetrics() - add missing icon field            │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ Compatible Data Format
                  ▼
┌─────────────────────────────────────────────────────┐
│         React Query Hooks (State Management)        │
│           src/hooks/useActivities.ts                │
│  - useActivities() - List with filters              │
│  - useActivity(slug) - Single activity              │
│  - useActivityCategories() - Category list          │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ { data, isLoading, error }
                  ▼
┌─────────────────────────────────────────────────────┐
│              React Components                       │
│  - Index.tsx - Main listing                         │
│  - ActivityDetail.tsx - Detail view                 │
│  - FilterBar.tsx - Filters                          │
│  - StatsOverview.tsx - Statistics                   │
└─────────────────────────────────────────────────────┘
```

---

## Detailed Implementation Steps

## Phase 1: Project Setup & Dependencies

### Step 1.1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 1.2: Create Environment Variables

**File:** `.env.local` (create new file)

```env
VITE_SUPABASE_URL=https://htpanlaslzowmnemyobc.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Note:** Get the anon key from Supabase project settings or admin panel `.env`

**File:** `.env.example` (for documentation)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 1.3: Update .gitignore

Ensure `.env.local` is ignored:

```gitignore
.env.local
.env.*.local
```

---

## Phase 2: Supabase Client Setup

### Step 2.1: Create Supabase Client Singleton

**File:** `src/lib/supabase/client.ts` (new file)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check .env.local file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // No auth needed for read-only public data
  },
});
```

### Step 2.2: Create Database Types

**File:** `src/lib/supabase/types.ts` (new file)

```typescript
// Database table types (matching Supabase schema)

export interface DBActivity {
  id: string; // UUID
  slug: string;
  title: string;
  description: string;
  status: 'planned' | 'ongoing' | 'completed';
  category: 'environment' | 'education' | 'community' | 'healthcare' | 'infrastructure' | 'cultural';
  vision_text: string | null;
  hero_image_url: string;
  progress: number;
  impact: string | null;
  activity_date: string | null;
  is_published: boolean;
  display_order: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBActivityMetric {
  id: string;
  activity_id: string;
  metric_key: string; // Could be icon name
  metric_value: string;
  display_order: number;
  created_at: string;
}

export interface DBActivityImpactStat {
  id: string;
  activity_id: string;
  label: string;
  value: string;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface DBActivityGallery {
  id: string;
  activity_id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
  display_order: number;
  uploaded_at: string;
}

export interface DBActivityTestimonial {
  id: string;
  activity_id: string;
  author_name: string;
  author_role: string | null;
  author_avatar_url: string | null;
  content: string;
  display_order: number;
  created_at: string;
}

export interface DBActivityCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Complete activity with all relations
export interface DBActivityComplete extends DBActivity {
  activity_metrics: DBActivityMetric[];
  activity_impact_stats: DBActivityImpactStat[];
  activity_gallery: DBActivityGallery[];
  activity_testimonials: DBActivityTestimonial[];
}
```

---

## Phase 3: Data Transformation Layer

### Step 3.1: Create Transformation Functions

**File:** `src/lib/transformers/activities.ts` (new file)

```typescript
import { DBActivityComplete, DBActivityCategory } from '@/lib/supabase/types';
import { ExtendedActivity, Category } from '@/data/all-activities';

// Status mapping: DB → Static
export const mapStatus = (
  dbStatus: 'planned' | 'ongoing' | 'completed'
): 'upcoming' | 'in-progress' | 'completed' => {
  const statusMap = {
    planned: 'upcoming' as const,
    ongoing: 'in-progress' as const,
    completed: 'completed' as const,
  };
  return statusMap[dbStatus];
};

// Category mapping: DB slug → Display name
const categoryDisplayNames: Record<string, Category> = {
  environment: 'Environment',
  education: 'Education',
  community: 'Community Service',
  healthcare: 'Health & Wellness',
  infrastructure: 'Infrastructure',
  cultural: 'Culture & Heritage',
};

export const mapCategory = (dbCategory: string): Category => {
  return categoryDisplayNames[dbCategory] || 'Community Service';
};

// Icon fallback for metrics (if metric_key is not a valid icon name)
const iconFallback: Record<string, string> = {
  workers: 'Users',
  participants: 'Users',
  amount: 'DollarSign',
  count: 'Target',
  percentage: 'TrendingUp',
  default: 'Star',
};

export const mapMetricIcon = (metricKey: string): string => {
  // Check if metric_key is already a Lucide icon name (PascalCase)
  if (/^[A-Z][a-zA-Z]+$/.test(metricKey)) {
    return metricKey;
  }

  // Try to find matching icon from fallback
  const lowerKey = metricKey.toLowerCase();
  for (const [key, icon] of Object.entries(iconFallback)) {
    if (lowerKey.includes(key)) {
      return icon;
    }
  }

  return iconFallback.default;
};

// Split vision text into paragraphs
export const parseVisionText = (visionText: string | null): string[] | undefined => {
  if (!visionText) return undefined;

  // Split by double newline for paragraphs
  const paragraphs = visionText.split(/\n\n+/).filter(p => p.trim().length > 0);

  return paragraphs.length > 0 ? paragraphs : [visionText];
};

// Transform complete DB activity to static interface
export const transformActivity = (dbActivity: DBActivityComplete): ExtendedActivity => {
  return {
    id: dbActivity.slug, // Use slug as ID for routing compatibility
    title: dbActivity.title,
    status: mapStatus(dbActivity.status),
    impact: dbActivity.impact || '',
    imageGradient: 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(142 86% 46%) 100%)', // Default gradient
    category: mapCategory(dbActivity.category),
    progress: dbActivity.progress || 0,
    description: dbActivity.description,
    image: undefined, // No longer using static image keys
    dateCompleted: dbActivity.activity_date || undefined,
    dateScheduled: dbActivity.activity_date || undefined,

    // Transform metrics
    metrics: dbActivity.activity_metrics
      ?.sort((a, b) => a.display_order - b.display_order)
      .map(m => ({
        icon: mapMetricIcon(m.metric_key),
        label: m.metric_key,
        value: m.metric_value,
      })),

    // Vision text
    visionText: parseVisionText(dbActivity.vision_text),

    // Transform gallery
    galleryPhotos: dbActivity.activity_gallery
      ?.sort((a, b) => a.display_order - b.display_order)
      .map(g => ({
        imageKey: g.image_url, // Store URL directly (will use as-is, not lookup)
        caption: g.caption || '',
      })),

    // Transform impact stats
    impactStats: dbActivity.activity_impact_stats
      ?.sort((a, b) => a.display_order - b.display_order)
      .map(s => ({
        icon: s.icon || 'Star',
        value: parseInt(s.value) || 0,
        label: s.label,
        color: undefined, // Color not stored in DB
      })),

    // Transform testimonials
    testimonials: dbActivity.activity_testimonials
      ?.sort((a, b) => a.display_order - b.display_order)
      .map(t => ({
        quote: t.content,
        name: t.author_name,
        role: t.author_role || '',
        avatar: t.author_avatar_url || undefined,
      })),
  };
};

// Transform categories
export const transformCategories = (dbCategories: DBActivityCategory[]): Category[] => {
  const categories = dbCategories
    .filter(c => c.is_active)
    .sort((a, b) => a.display_order - b.display_order)
    .map(c => c.name as Category);

  return ['All', ...categories];
};
```

---

## Phase 4: API Functions

### Step 4.1: Create Activity API Functions

**File:** `src/lib/api/activities.ts` (new file)

```typescript
import { supabase } from '@/lib/supabase/client';
import { DBActivityComplete, DBActivityCategory } from '@/lib/supabase/types';

// Fetch all published activities with all relations
export const fetchActivities = async (): Promise<DBActivityComplete[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      activity_metrics (*),
      activity_impact_stats (*),
      activity_gallery (*),
      activity_testimonials (*)
    `)
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching activities:', error);
    throw new Error(`Failed to fetch activities: ${error.message}`);
  }

  return data || [];
};

// Fetch single activity by slug
export const fetchActivityBySlug = async (slug: string): Promise<DBActivityComplete | null> => {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      activity_metrics (*),
      activity_impact_stats (*),
      activity_gallery (*),
      activity_testimonials (*)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching activity:', error);
    throw new Error(`Failed to fetch activity: ${error.message}`);
  }

  return data;
};

// Fetch all active categories
export const fetchCategories = async (): Promise<DBActivityCategory[]> => {
  const { data, error } = await supabase
    .from('activity_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  return data || [];
};
```

---

## Phase 5: React Query Hooks

### Step 5.1: Create Custom Hooks

**File:** `src/hooks/useActivities.ts` (new file)

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchActivities, fetchActivityBySlug, fetchCategories } from '@/lib/api/activities';
import { transformActivity, transformCategories } from '@/lib/transformers/activities';
import { ExtendedActivity, Category } from '@/data/all-activities';

// Fetch all activities
export const useActivities = () => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const dbActivities = await fetchActivities();
      return dbActivities.map(transformActivity);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch single activity by slug
export const useActivity = (slug: string) => {
  return useQuery({
    queryKey: ['activity', slug],
    queryFn: async () => {
      const dbActivity = await fetchActivityBySlug(slug);
      return dbActivity ? transformActivity(dbActivity) : null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// Fetch categories
export const useActivityCategories = () => {
  return useQuery({
    queryKey: ['activity-categories'],
    queryFn: async () => {
      const dbCategories = await fetchCategories();
      return transformCategories(dbCategories);
    },
    staleTime: 30 * 60 * 1000, // 30 minutes (categories change rarely)
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};
```

---

## Phase 6: Component Updates

### Step 6.1: Update Index.tsx

**File:** `src/pages/Index.tsx`

**Changes Required:**

1. Replace static import with hook
2. Add loading state
3. Add error handling
4. Update stats calculation to handle loading state

```typescript
// BEFORE:
import { allActivities, type Category } from "@/data/all-activities";

const completed = allActivities.filter(a => a.status === "completed").length;

// AFTER:
import { useActivities } from "@/hooks/useActivities";
import { useActivityCategories } from "@/hooks/useActivities";
import ShimmerLoader from "@/components/ShimmerLoader";

const Index = () => {
  const { data: activities, isLoading, error } = useActivities();
  const { data: categories } = useActivityCategories();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Hero />
        <div className="container px-4 py-20">
          <ShimmerLoader />
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">
            Failed to load activities
          </h2>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  const allActivities = activities || [];
  const completed = allActivities.filter(a => a.status === "completed").length;
  // ... rest of the component
```

### Step 6.2: Update ActivityDetail.tsx

**File:** `src/pages/ActivityDetail.tsx`

**Changes Required:**

1. Replace array.find() with hook
2. Remove imageMap usage - use direct URLs
3. Add loading/error states
4. Handle null activity

```typescript
// BEFORE:
import { allActivities } from "@/data/all-activities";
const { id } = useParams();
const activity = allActivities.find((a) => a.id === id);
const heroImage = activity.image ? imageMap[activity.image] : null;

// AFTER:
import { useActivity, useActivities } from "@/hooks/useActivities";
const { id } = useParams(); // This is actually slug
const { data: activity, isLoading, error } = useActivity(id || '');
const { data: allActivities } = useActivities(); // For related activities

if (isLoading) {
  return <ShimmerLoader />;
}

if (error || !activity) {
  return <NotFoundComponent />;
}

// Use direct URL from database
const heroImage = activity.hero_image_url;

// Gallery photos - use URLs directly
const galleryPhotosWithUrls: Photo[] = activity.galleryPhotos?.map(photo => ({
  url: photo.imageKey, // This is now a direct URL, not a lookup key
  caption: photo.caption
})) || [];
```

### Step 6.3: Update FilterBar.tsx

**File:** `src/components/FilterBar.tsx`

**Changes Required:**

1. Fetch categories from database instead of static import

```typescript
// BEFORE:
import { categories, type Category } from "@/data/all-activities";

// AFTER:
import { useActivityCategories } from "@/hooks/useActivities";
import { type Category } from "@/data/all-activities"; // Keep type

const FilterBar = ({ ... }) => {
  const { data: categories } = useActivityCategories();
  const categoriesList = categories || ['All']; // Fallback

  // Rest of component...
  {categoriesList.filter(c => c !== "All").map((category) => (
    // ...
  ))}
}
```

### Step 6.4: Update StatsOverview.tsx

**File:** `src/components/StatsOverview.tsx`

**Changes Required:**

1. Use activities from props or context instead of static import

```typescript
// BEFORE:
import { allActivities } from "@/data/all-activities";
const completed = allActivities.filter(a => a.status === "completed").length;

// AFTER:
import { useActivities } from "@/hooks/useActivities";

const StatsOverview = () => {
  const { data: activities, isLoading } = useActivities();
  const allActivities = activities || [];

  if (isLoading) {
    return <ShimmerLoader />;
  }

  const completed = allActivities.filter(a => a.status === "completed").length;
  // ... rest
```

### Step 6.5: Update ActivityCard.tsx

**File:** `src/components/ActivityCard.tsx`

**Changes Required:**

1. Remove imageMap - use direct URLs
2. Update image rendering logic

```typescript
// BEFORE:
const imageUrl = activity.image ? imageMap[activity.image] : null;

// AFTER:
// Check if activity has hero_image_url (from DB) or fallback to imageGradient
const imageUrl = activity.hero_image_url || null;

// Update image rendering:
{imageUrl ? (
  <div className="w-full aspect-[4/3] overflow-hidden relative">
    <ShimmerLoader />
    <img
      src={imageUrl}  // Direct URL from database
      alt={activity.title}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
) : (
  <div
    className="w-full aspect-[4/3]"
    style={{ background: activity.imageGradient }}
  />
)}
```

---

## Phase 7: React Query Provider Setup

### Step 7.1: Update main.tsx (if needed)

**File:** `src/main.tsx`

Check if QueryClientProvider is already configured. If not, add it:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

---

## Phase 8: Update Extended Activity Interface

### Step 8.1: Add hero_image_url field

**File:** `src/data/all-activities.ts` (or create new types file)

```typescript
export interface ExtendedActivity extends Activity {
  // ... existing fields
  hero_image_url?: string; // NEW: Direct URL from database
  image?: string; // Keep for backwards compatibility during migration
}
```

---

## Phase 9: Testing & Validation

### Testing Checklist

- [ ] **Homepage (Index.tsx)**
  - [ ] Activities load and display correctly
  - [ ] Stats show correct counts
  - [ ] Loading state appears during fetch
  - [ ] Error state handles failures gracefully
  - [ ] Search filter works
  - [ ] Category filter works
  - [ ] Status filter works

- [ ] **Activity Detail Page**
  - [ ] Individual activity loads by slug
  - [ ] Hero image displays from Supabase URL
  - [ ] Metrics display correctly (with icons)
  - [ ] Vision text shows as paragraphs
  - [ ] Gallery images load from Supabase URLs
  - [ ] Impact stats display
  - [ ] Testimonials show with avatars
  - [ ] Related activities appear
  - [ ] 404 handling for non-existent activities

- [ ] **FilterBar Component**
  - [ ] Categories load from database
  - [ ] Category dropdown populates correctly
  - [ ] Filter selections work

- [ ] **StatsOverview Component**
  - [ ] Completed count correct
  - [ ] In-progress count correct
  - [ ] Upcoming count correct
  - [ ] Overall progress calculates correctly

- [ ] **Performance**
  - [ ] Initial page load < 3 seconds
  - [ ] Query caching works (no refetch on navigation)
  - [ ] Images load progressively
  - [ ] No memory leaks

- [ ] **Error Handling**
  - [ ] Network errors show user-friendly message
  - [ ] Missing data handled gracefully
  - [ ] Invalid slugs show 404

---

## Phase 10: Cleanup

### Step 10.1: Remove Static Data (After Testing)

**Only after confirming everything works:**

1. ❌ Delete `src/data/all-activities.ts`
2. ❌ Delete unused static images from `src/assets/`
3. ✅ Keep imageMap fallback in components temporarily (optional)
4. 📝 Update imports across all files

### Step 10.2: Update .gitignore

Ensure sensitive files are ignored:

```gitignore
.env.local
.env.*.local
```

---

## Migration Risks & Mitigation

### Risk 1: Data Structure Mismatch

**Risk:** Database schema doesn't perfectly match static data structure

**Mitigation:**
- Transformation layer handles all mapping
- Comprehensive testing before removing static data
- Keep static data as fallback during development

### Risk 2: Missing Categories

**Risk:** Only 6 categories in DB vs 9 in static data

**Mitigation:**
- Map DB categories to closest static equivalent
- Gracefully handle unmapped categories with default
- Admin panel should add missing categories

### Risk 3: Metrics Without Icons

**Risk:** activity_metrics table has no icon field

**Mitigation:**
- Intelligent icon mapping based on metric_key
- Fallback to default icon
- Admin panel improvement to store proper icon names

### Risk 4: Performance Issues

**Risk:** Loading 100 activities with nested data could be slow

**Mitigation:**
- React Query caching (5-minute stale time)
- Pagination (future improvement)
- Index optimization in Supabase
- Consider CDN for images

---

## Future Improvements

### Phase 2 Enhancements (Post-Migration)

1. **Pagination**
   - Implement infinite scroll or page-based navigation
   - Load 20 activities at a time

2. **Search Optimization**
   - Use Supabase full-text search
   - Server-side filtering

3. **Image Optimization**
   - Implement responsive images (multiple sizes)
   - Use WebP format with fallbacks
   - Lazy loading optimization

4. **Admin Panel Integration**
   - Sync metric icon field in admin panel
   - Ensure all categories are created
   - Validate data on save

5. **Real-Time Updates**
   - Use Supabase Realtime subscriptions
   - Live updates when activities change

6. **Analytics**
   - Track activity views
   - Popular activities dashboard

---

## Rollback Plan

If migration fails, rollback strategy:

1. **Keep static data file** until fully tested
2. **Feature flag:** Use environment variable to toggle between static/DB
3. **Git branch:** Keep static version in separate branch
4. **Revert commits:** Documented commit messages for easy revert

```typescript
// Emergency fallback (optional)
const USE_STATIC_DATA = import.meta.env.VITE_USE_STATIC_DATA === 'true';

export const useActivities = () => {
  if (USE_STATIC_DATA) {
    return { data: allActivities, isLoading: false, error: null };
  }
  // ... normal hook logic
};
```

---

## Success Criteria

✅ **Migration Complete When:**

1. All 100+ activities load from database
2. All pages render correctly without errors
3. Loading states work smoothly
4. Error handling covers all cases
5. Performance meets requirements (< 3s initial load)
6. No console errors or warnings
7. Static data file removed
8. Admin panel can add/edit activities that display correctly
9. All tests pass
10. Team approval given

---

## Timeline Estimate

**Total: 3-4 days**

| Phase | Task | Time |
|-------|------|------|
| 1 | Setup & Dependencies | 1 hour |
| 2 | Supabase Client | 1 hour |
| 3 | Data Transformation | 3 hours |
| 4 | API Functions | 2 hours |
| 5 | React Query Hooks | 2 hours |
| 6 | Component Updates | 4 hours |
| 7 | React Query Provider | 30 min |
| 8 | Type Updates | 30 min |
| 9 | Testing & QA | 4 hours |
| 10 | Cleanup | 1 hour |
| **Total** | | **19 hours** |

---

## Questions to Resolve Before Implementation

1. ❓ **Supabase Anon Key:** What is the anon key for the project?
2. ❓ **Metric Icons:** Should admin panel be updated to store icon names in metric_key?
3. ❓ **Missing Categories:** Should we add Technology, Sports & Recreation categories to DB?
4. ❓ **Vision Text Format:** Should vision_text be stored as JSON array for paragraphs?
5. ❓ **Image Optimization:** Should we implement responsive images now or later?
6. ❓ **Pagination:** Should we implement pagination in Phase 1 or Phase 2?
7. ❓ **Error Tracking:** Should we add Sentry or similar for error monitoring?

---

## Approval & Sign-Off

**Prepared By:** Claude Code
**Date:** 2025-11-12

**Reviewed By:** _________________
**Approved By:** _________________
**Date:** _________________

---

## Appendix A: Key Files Created/Modified

### New Files (13)
1. `.env.local`
2. `.env.example`
3. `src/lib/supabase/client.ts`
4. `src/lib/supabase/types.ts`
5. `src/lib/transformers/activities.ts`
6. `src/lib/api/activities.ts`
7. `src/hooks/useActivities.ts`

### Modified Files (6)
1. `src/pages/Index.tsx`
2. `src/pages/ActivityDetail.tsx`
3. `src/components/FilterBar.tsx`
4. `src/components/StatsOverview.tsx`
5. `src/components/ActivityCard.tsx`
6. `src/main.tsx` (possibly)

### Deleted Files (After Testing)
1. `src/data/all-activities.ts`
2. Unused static images in `src/assets/`

---

## Appendix B: SQL Queries Used

```sql
-- Fetch all published activities with relations
SELECT
  a.*,
  json_agg(DISTINCT jsonb_build_object(
    'id', am.id,
    'metric_key', am.metric_key,
    'metric_value', am.metric_value,
    'display_order', am.display_order
  )) FILTER (WHERE am.id IS NOT NULL) as activity_metrics,
  json_agg(DISTINCT jsonb_build_object(
    'id', ais.id,
    'label', ais.label,
    'value', ais.value,
    'icon', ais.icon,
    'display_order', ais.display_order
  )) FILTER (WHERE ais.id IS NOT NULL) as activity_impact_stats,
  json_agg(DISTINCT jsonb_build_object(
    'id', ag.id,
    'image_url', ag.image_url,
    'caption', ag.caption,
    'display_order', ag.display_order
  )) FILTER (WHERE ag.id IS NOT NULL) as activity_gallery,
  json_agg(DISTINCT jsonb_build_object(
    'id', at.id,
    'author_name', at.author_name,
    'author_role', at.author_role,
    'author_avatar_url', at.author_avatar_url,
    'content', at.content,
    'display_order', at.display_order
  )) FILTER (WHERE at.id IS NOT NULL) as activity_testimonials
FROM activities a
LEFT JOIN activity_metrics am ON a.id = am.activity_id
LEFT JOIN activity_impact_stats ais ON a.id = ais.activity_id
LEFT JOIN activity_gallery ag ON a.id = ag.activity_id
LEFT JOIN activity_testimonials at ON a.id = at.activity_id
WHERE a.is_published = true
GROUP BY a.id
ORDER BY a.display_order;
```

---

**END OF IMPLEMENTATION PLAN**
