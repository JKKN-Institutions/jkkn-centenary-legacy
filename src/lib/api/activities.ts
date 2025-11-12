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

  return (data || []) as DBActivityComplete[];
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

  return data as DBActivityComplete;
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
