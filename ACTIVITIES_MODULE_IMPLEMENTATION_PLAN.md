# Activities Module Implementation Plan
## Dynamic Content Management System

---

## 📋 Table of Contents
1. [Current Architecture Analysis](#current-architecture-analysis)
2. [Database Schema Design](#database-schema-design)
3. [Storage Configuration](#storage-configuration)
4. [Backend API Design](#backend-api-design)
5. [Admin Panel Features](#admin-panel-features)
6. [Frontend Migration Strategy](#frontend-migration-strategy)
7. [Security & Permissions](#security--permissions)
8. [Implementation Phases](#implementation-phases)

---

## 🔍 Current Architecture Analysis

### Current Static Data Structure
Located in: `src/data/all-activities.ts`

```typescript
interface ExtendedActivity {
  id: string;
  title: string;
  description: string;
  status: "completed" | "ongoing" | "planned";
  impact: string;
  category: Category;
  progress: number;
  image: string;  // Static image key
  date: string;
  location: string;
  participants?: number;
  organizer?: string;
  metrics?: Array<{
    icon: string;
    value: number;
    label: string;
    color?: string;
  }>;
  visionText?: string;
  galleryPhotos?: Array<{
    imageKey: string;
    caption: string;
  }>;
  impactStats?: Array<{
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

### Components Consuming Activities Data
- `src/pages/Index.tsx` - Main listing page
- `src/pages/ActivityDetail.tsx` - Detail view
- `src/components/ActivityCard.tsx` - Card component
- `src/components/StatsOverview.tsx` - Statistics
- `src/components/RelatedActivities.tsx` - Related items
- `src/components/PhotoGallery.tsx` - Image gallery
- `src/components/ImpactStats.tsx` - Impact metrics
- `src/components/TestimonialCard.tsx` - Testimonials

---

## 🗄️ Database Schema Design

### 1. Core Activities Table

```sql
-- Create enum types
CREATE TYPE activity_status AS ENUM ('completed', 'ongoing', 'planned');
CREATE TYPE activity_category AS ENUM (
  'tree-plantation',
  'blood-donation',
  'scholarship',
  'alumni-engagement',
  'infrastructure',
  'community-service',
  'health-wellness',
  'education',
  'environment',
  'cultural'
);

-- Main activities table
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- URL-friendly identifier
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status activity_status NOT NULL DEFAULT 'planned',
  category activity_category NOT NULL,
  impact TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  
  -- Basic details
  date DATE NOT NULL,
  location TEXT NOT NULL,
  participants INTEGER,
  organizer TEXT,
  
  -- Vision/detailed content
  vision_text TEXT,
  
  -- Media
  hero_image_url TEXT, -- Main/hero image
  
  -- Metadata
  is_published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Add indexes
CREATE INDEX idx_activities_status ON public.activities(status);
CREATE INDEX idx_activities_category ON public.activities(category);
CREATE INDEX idx_activities_published ON public.activities(is_published);
CREATE INDEX idx_activities_featured ON public.activities(featured);
CREATE INDEX idx_activities_slug ON public.activities(slug);
CREATE INDEX idx_activities_date ON public.activities(date DESC);

-- Add full-text search
CREATE INDEX idx_activities_search ON public.activities 
USING gin(to_tsvector('english', title || ' ' || description));
```

### 2. Activity Metrics Table

```sql
CREATE TABLE public.activity_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
  icon TEXT NOT NULL, -- lucide icon name
  value NUMERIC NOT NULL,
  label TEXT NOT NULL,
  color TEXT, -- hex color code
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_metrics_activity ON public.activity_metrics(activity_id);
```

### 3. Impact Statistics Table

```sql
CREATE TABLE public.activity_impact_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
  icon TEXT NOT NULL,
  value NUMERIC NOT NULL,
  label TEXT NOT NULL,
  color TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_impact_stats_activity ON public.activity_impact_stats(activity_id);
```

### 4. Gallery Photos Table

```sql
CREATE TABLE public.activity_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gallery_activity ON public.activity_gallery(activity_id);
```

### 5. Testimonials Table

```sql
CREATE TABLE public.activity_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_testimonials_activity ON public.activity_testimonials(activity_id);
```

### 6. Related Activities Junction Table

```sql
CREATE TABLE public.activity_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
  related_activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
  relation_type TEXT DEFAULT 'related', -- 'related', 'similar', 'follow-up'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(activity_id, related_activity_id)
);

CREATE INDEX idx_activity_relations_activity ON public.activity_relations(activity_id);
```

### 7. Auto-update trigger for updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 📦 Storage Configuration

### Storage Buckets Setup

```sql
-- Create storage bucket for activity images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'activity-images',
  'activity-images',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage bucket for testimonial avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonial-avatars',
  'testimonial-avatars',
  true,
  2097152, -- 2MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);
```

### Storage Policies

```sql
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload activity images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'activity-images');

-- Allow public to view images
CREATE POLICY "Public can view activity images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'activity-images');

-- Allow admins to delete images
CREATE POLICY "Admins can delete activity images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'activity-images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Similar policies for testimonial-avatars bucket
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'testimonial-avatars');

CREATE POLICY "Public can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'testimonial-avatars');

CREATE POLICY "Admins can delete avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'testimonial-avatars' AND
  public.has_role(auth.uid(), 'admin')
);
```

---

## 🔐 Security & Permissions

### Role-Based Access Control

**Required Roles:**
- `admin` - Full CRUD access to all activities
- `moderator` - Can create/edit activities but not delete
- `user` - Read-only access

### RLS Policies for Activities

```sql
-- Enable RLS
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_impact_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_relations ENABLE ROW LEVEL SECURITY;

-- Public can view published activities
CREATE POLICY "Public can view published activities"
ON public.activities FOR SELECT
TO public
USING (is_published = true);

-- Admins can view all activities
CREATE POLICY "Admins can view all activities"
ON public.activities FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert activities
CREATE POLICY "Admins can insert activities"
ON public.activities FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update activities
CREATE POLICY "Admins can update activities"
ON public.activities FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can delete activities
CREATE POLICY "Admins can delete activities"
ON public.activities FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Similar policies for child tables (metrics, stats, gallery, testimonials)
-- Public can view related data for published activities
CREATE POLICY "Public can view metrics for published activities"
ON public.activity_metrics FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.activities
    WHERE id = activity_metrics.activity_id
    AND is_published = true
  )
);

-- Admins can manage metrics
CREATE POLICY "Admins can manage metrics"
ON public.activity_metrics FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Repeat similar policies for other child tables...
```

---

## 🚀 Backend API Design

### Edge Functions Required

#### 1. **Get Activities List** - `get-activities`

```typescript
// supabase/functions/get-activities/index.ts

interface GetActivitiesRequest {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
}

// Returns paginated list with basic info
// Public endpoint (no auth required)
```

#### 2. **Get Activity Detail** - `get-activity`

```typescript
// supabase/functions/get-activity/index.ts

interface GetActivityRequest {
  slug: string;
}

// Returns full activity with all related data:
// - metrics
// - impact stats
// - gallery photos
// - testimonials
// - related activities
// Also increments view_count
```

#### 3. **Create Activity** - `create-activity`

```typescript
// supabase/functions/create-activity/index.ts

interface CreateActivityRequest {
  title: string;
  description: string;
  status: string;
  category: string;
  impact: string;
  progress: number;
  date: string;
  location: string;
  participants?: number;
  organizer?: string;
  vision_text?: string;
  hero_image_url?: string;
  is_published?: boolean;
  featured?: boolean;
  metrics?: Array<MetricData>;
  impact_stats?: Array<StatData>;
  gallery?: Array<GalleryData>;
  testimonials?: Array<TestimonialData>;
}

// Admin only - validates role, generates slug, creates activity + related data
```

#### 4. **Update Activity** - `update-activity`

```typescript
// supabase/functions/update-activity/index.ts

interface UpdateActivityRequest {
  id: string;
  // Same fields as create, all optional
}

// Admin only - updates activity + related data
```

#### 5. **Delete Activity** - `delete-activity`

```typescript
// supabase/functions/delete-activity/index.ts

interface DeleteActivityRequest {
  id: string;
  delete_images?: boolean; // Also delete from storage
}

// Admin only - cascading delete with optional image cleanup
```

#### 6. **Upload Activity Image** - `upload-activity-image`

```typescript
// supabase/functions/upload-activity-image/index.ts

// Handles image upload with validation
// - Resize/optimize images
// - Generate unique filenames
// - Return public URL
// Auth required
```

#### 7. **Get Activity Statistics** - `get-activity-stats`

```typescript
// supabase/functions/get-activity-stats/index.ts

// Returns overview stats for dashboard:
// - Total activities by status
// - Total by category
// - Total participants
// - View counts
// - Recent activities
// Admin only
```

---

## 🎨 Admin Panel Features

### Module: Activities Management

#### 1. **Activities Dashboard** (`/admin/activities`)

**Features:**
- Summary cards:
  - Total activities
  - Published vs Draft
  - Total participants
  - Total views
- Quick stats by category
- Recent activities list
- Quick actions (Add New, View Published)

**Components:**
```typescript
// AdminActivitiesDashboard.tsx
// - StatsCards
// - CategoryBreakdownChart
// - RecentActivitiesList
```

#### 2. **Activities List** (`/admin/activities/list`)

**Features:**
- Data table with columns:
  - Thumbnail
  - Title
  - Category
  - Status
  - Progress
  - Date
  - Views
  - Actions (Edit, Delete, Preview, Publish/Unpublish)
- Filters:
  - Status
  - Category
  - Date range
  - Published status
- Search by title/description
- Bulk actions:
  - Publish/Unpublish
  - Delete
  - Change status
- Sorting by all columns
- Pagination

**Components:**
```typescript
// AdminActivitiesList.tsx
// - DataTable with react-table
// - FilterBar
// - BulkActionBar
// - StatusBadge
// - ActionDropdown
```

#### 3. **Create/Edit Activity** (`/admin/activities/new`, `/admin/activities/edit/:id`)

**Form Sections:**

**A. Basic Information**
- Title (required)
- Slug (auto-generated, editable)
- Description (rich text editor)
- Category (select)
- Status (select)
- Progress slider (0-100%)
- Impact statement

**B. Details**
- Date picker
- Location
- Number of participants
- Organizer name

**C. Vision & Content**
- Vision text (rich text editor)

**D. Hero Image**
- Image upload with preview
- Drag & drop support
- Cropping tool
- Alt text for accessibility

**E. Metrics** (Dynamic list)
- Icon selector (lucide icons)
- Value (number)
- Label
- Color picker
- Reorderable list

**F. Gallery** (Dynamic list)
- Multiple image upload
- Captions
- Drag & drop reordering
- Preview grid

**G. Impact Statistics** (Dynamic list)
- Same as metrics
- Separate from regular metrics

**H. Testimonials** (Dynamic list)
- Quote text area
- Name
- Role
- Avatar upload
- Approval toggle
- Reorderable

**I. Related Activities**
- Multi-select from existing activities
- Shows preview cards

**J. Publishing**
- Published toggle
- Featured toggle
- Schedule publish date (optional)

**Components:**
```typescript
// AdminActivityForm.tsx
// - FormSections (Accordion/Tabs)
// - ImageUploader
// - RichTextEditor (TipTap or similar)
// - DynamicListField (metrics, stats, testimonials)
// - IconPicker
// - ColorPicker
// - RelatedActivitiesSelector
```

#### 4. **Activity Preview** (`/admin/activities/preview/:id`)

**Features:**
- Renders activity exactly as it appears on frontend
- "Edit" and "Publish" buttons
- Preview unpublished changes

#### 5. **Bulk Import** (`/admin/activities/import`)

**Features:**
- CSV/JSON upload to import existing static data
- Field mapping interface
- Validation & error reporting
- Preview before import
- Dry-run mode

**Components:**
```typescript
// AdminActivitiesImport.tsx
// - FileUploader
// - FieldMapper
// - ValidationResults
// - ImportPreview
```

---

## 🔄 Frontend Migration Strategy

### Phase 1: Create API Integration Layer

**Create new hooks:**

```typescript
// src/hooks/useActivities.tsx
export const useActivities = (filters?: ActivityFilters) => {
  return useQuery({
    queryKey: ['activities', filters],
    queryFn: () => fetchActivities(filters)
  });
};

export const useActivity = (slug: string) => {
  return useQuery({
    queryKey: ['activity', slug],
    queryFn: () => fetchActivity(slug)
  });
};

export const useActivityStats = () => {
  return useQuery({
    queryKey: ['activity-stats'],
    queryFn: () => fetchActivityStats()
  });
};
```

**Create API client:**

```typescript
// src/lib/api/activities.ts
export const fetchActivities = async (filters?: ActivityFilters) => {
  const { data, error } = await supabase.functions.invoke('get-activities', {
    body: filters
  });
  if (error) throw error;
  return data;
};

export const fetchActivity = async (slug: string) => {
  const { data, error } = await supabase.functions.invoke('get-activity', {
    body: { slug }
  });
  if (error) throw error;
  return data;
};

// etc...
```

### Phase 2: Update Components

**Update Index.tsx:**
```typescript
// Before: import { allActivities } from "@/data/all-activities";
// After:
const { data: activities, isLoading } = useActivities({
  published: true
});

// Add loading states and error handling
if (isLoading) return <ShimmerLoader />;
```

**Update ActivityDetail.tsx:**
```typescript
// Before: const activity = allActivities.find(a => a.id === id);
// After:
const { data: activity, isLoading } = useActivity(slug);
```

**Update components to handle image URLs:**
```typescript
// Before: imageMap[activity.image]
// After: activity.hero_image_url

// Gallery:
// Before: imageMap[photo.imageKey]
// After: photo.image_url
```

### Phase 3: Backward Compatibility (Optional Transition Period)

**Hybrid approach during migration:**
```typescript
// src/hooks/useActivities.tsx
export const useActivities = () => {
  const { data, isLoading, error } = useQuery(/* ... */);
  
  // Fallback to static data during development
  if (error || !data) {
    return { 
      data: allActivities, 
      isLoading: false, 
      error: null 
    };
  }
  
  return { data, isLoading, error };
};
```

### Phase 4: Remove Static Data

Once migration is complete:
1. Remove `src/data/all-activities.ts`
2. Remove static images from `src/assets/` (keep only UI assets)
3. Clean up imports

---

## 📊 Data Migration Script

### Bulk Import Tool

**Create migration script to seed database:**

```typescript
// scripts/migrate-static-to-db.ts

import { allActivities } from '../src/data/all-activities';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function migrateActivities() {
  for (const activity of allActivities) {
    // 1. Upload hero image to storage
    const heroImageUrl = await uploadImage(activity.image);
    
    // 2. Insert activity
    const { data: newActivity } = await supabase
      .from('activities')
      .insert({
        slug: activity.id,
        title: activity.title,
        description: activity.description,
        status: activity.status,
        category: activity.category,
        impact: activity.impact,
        progress: activity.progress,
        date: activity.date,
        location: activity.location,
        participants: activity.participants,
        organizer: activity.organizer,
        vision_text: activity.visionText,
        hero_image_url: heroImageUrl,
        is_published: true,
        featured: false
      })
      .select()
      .single();
    
    // 3. Insert metrics
    if (activity.metrics) {
      await insertMetrics(newActivity.id, activity.metrics);
    }
    
    // 4. Insert impact stats
    if (activity.impactStats) {
      await insertImpactStats(newActivity.id, activity.impactStats);
    }
    
    // 5. Upload and insert gallery
    if (activity.galleryPhotos) {
      await insertGallery(newActivity.id, activity.galleryPhotos);
    }
    
    // 6. Insert testimonials
    if (activity.testimonials) {
      await insertTestimonials(newActivity.id, activity.testimonials);
    }
  }
}
```

---

## 🧪 Implementation Phases

### Phase 1: Database Setup (Week 1)
- [ ] Enable Lovable Cloud / Supabase
- [ ] Create all tables and enums
- [ ] Set up storage buckets
- [ ] Configure RLS policies
- [ ] Test manual CRUD operations

### Phase 2: Backend APIs (Week 1-2)
- [ ] Create edge functions
- [ ] Implement authentication checks
- [ ] Add validation and error handling
- [ ] Test all endpoints
- [ ] Document API

### Phase 3: Admin Panel Integration (Week 2-3)
- [ ] Create activities management routes
- [ ] Build activities dashboard
- [ ] Build list view with filters
- [ ] Build create/edit form
- [ ] Implement image upload
- [ ] Add bulk actions
- [ ] Create import tool

### Phase 4: Frontend Migration (Week 3-4)
- [ ] Create API integration hooks
- [ ] Update Index page
- [ ] Update ActivityDetail page
- [ ] Update all child components
- [ ] Add loading states
- [ ] Add error handling
- [ ] Test all functionality

### Phase 5: Data Migration (Week 4)
- [ ] Create migration script
- [ ] Upload all static images to storage
- [ ] Import all activities to database
- [ ] Verify data integrity
- [ ] Test frontend with real data

### Phase 6: Cleanup & Testing (Week 4-5)
- [ ] Remove static data files
- [ ] Clean up unused images
- [ ] Performance testing
- [ ] Security audit
- [ ] User acceptance testing
- [ ] Documentation

### Phase 7: Deployment (Week 5)
- [ ] Deploy database changes
- [ ] Deploy edge functions
- [ ] Deploy admin panel
- [ ] Deploy frontend changes
- [ ] Monitor for issues

---

## 🎯 Success Criteria

- [ ] All 100 activities migrated successfully
- [ ] Admin panel fully functional with all CRUD operations
- [ ] Role-based access working correctly
- [ ] Images loading from storage
- [ ] Frontend performance maintained or improved
- [ ] No broken links or missing images
- [ ] Search and filtering working
- [ ] Mobile responsive
- [ ] SEO maintained (slug-based URLs)
- [ ] Analytics/view counts tracking

---

## 📝 Additional Considerations

### Performance Optimization
- Implement pagination (20 items per page)
- Add image optimization (WebP format, multiple sizes)
- Use CDN for image delivery
- Implement caching strategy
- Add database indexes for common queries

### SEO Maintenance
- Keep slug-based URLs (`/activity/tree-plantation-2024`)
- Generate sitemap from database
- Add structured data (JSON-LD)
- Maintain meta tags

### Future Enhancements
- Activity approval workflow
- Version history
- Activity templates
- Export to PDF
- Email notifications
- Activity calendar view
- Public submission form
- Activity comments/feedback
- Analytics dashboard

---

## 🔗 Integration Points with Existing Admin Panel

Assuming your admin panel has:
- Authentication system
- Role-based routing
- Dashboard layout
- Sidebar navigation

### Add to Navigation:
```typescript
{
  title: "Activities",
  icon: "Calendar",
  submenu: [
    { title: "Dashboard", path: "/admin/activities" },
    { title: "All Activities", path: "/admin/activities/list" },
    { title: "Add New", path: "/admin/activities/new" },
    { title: "Categories", path: "/admin/activities/categories" },
    { title: "Import", path: "/admin/activities/import" }
  ]
}
```

### Required Admin Routes:
```typescript
<Route path="/admin/activities" element={<AdminActivitiesLayout />}>
  <Route index element={<AdminActivitiesDashboard />} />
  <Route path="list" element={<AdminActivitiesList />} />
  <Route path="new" element={<AdminActivityForm />} />
  <Route path="edit/:id" element={<AdminActivityForm />} />
  <Route path="preview/:id" element={<AdminActivityPreview />} />
  <Route path="import" element={<AdminActivitiesImport />} />
</Route>
```

---

## 📚 Technical Documentation Links

- Supabase Storage: https://supabase.com/docs/guides/storage
- Row Level Security: https://supabase.com/docs/guides/auth/row-level-security
- Edge Functions: https://supabase.com/docs/guides/functions
- React Query: https://tanstack.com/query/latest
- TanStack Table: https://tanstack.com/table/latest (for admin tables)

---

**END OF IMPLEMENTATION PLAN**
