import { useQuery } from '@tanstack/react-query';
import { fetchActivities, fetchActivityBySlug, fetchCategories } from '@/lib/api/activities';
import { transformActivity, transformCategories } from '@/lib/transformers/activities';
import { Category } from '@/data/all-activities';
import { ActivityStatus } from '@/components/StatusBadge';

// Fetch all activities
export const useActivities = () => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const dbActivities = await fetchActivities();
      return dbActivities.map(transformActivity);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get unique status values from activities data
export const useActivityStatuses = () => {
  const { data: activities } = useActivities();

  // Derive unique statuses from activities
  const statuses: (ActivityStatus | "all")[] = ["all"];

  if (activities && activities.length > 0) {
    const uniqueStatuses = new Set<ActivityStatus>();
    activities.forEach(activity => {
      if (activity.status) {
        uniqueStatuses.add(activity.status as ActivityStatus);
      }
    });

    // Sort statuses in a logical order
    const statusOrder: ActivityStatus[] = ["completed", "in-progress", "upcoming"];
    statusOrder.forEach(status => {
      if (uniqueStatuses.has(status)) {
        statuses.push(status);
      }
    });
  }

  return statuses;
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
  });
};
