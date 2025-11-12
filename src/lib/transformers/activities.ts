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
  students: 'Users',
  people: 'Users',
  amount: 'DollarSign',
  money: 'DollarSign',
  cost: 'DollarSign',
  count: 'Target',
  total: 'Target',
  percentage: 'TrendingUp',
  percent: 'TrendingUp',
  books: 'BookOpen',
  meals: 'Heart',
  trees: 'Zap',
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
  const paragraphs = visionText
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

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

    // Add hero_image_url for direct URL access
    hero_image_url: dbActivity.hero_image_url,

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
