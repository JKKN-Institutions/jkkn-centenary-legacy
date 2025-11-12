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
  metric_key: string; // Could be icon name or metric label
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
