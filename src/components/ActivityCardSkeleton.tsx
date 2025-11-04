import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ActivityCardSkeletonProps {
  count?: number;
}

const ActivityCardSkeleton = ({ count = 6 }: ActivityCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden animate-fade-in-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Image skeleton */}
          <Skeleton className="w-full aspect-video" />
          
          <div className="p-6 space-y-4">
            {/* Badge skeleton */}
            <Skeleton className="h-5 w-20" />
            
            {/* Title skeleton */}
            <Skeleton className="h-7 w-3/4" />
            
            {/* Impact skeleton */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            
            {/* Progress bar skeleton */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default ActivityCardSkeleton;
