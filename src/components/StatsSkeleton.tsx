import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const StatsSkeleton = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64 mx-auto mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="text-center">
              <CardContent className="pt-8 pb-6">
                <Skeleton className="h-16 w-24 mx-auto mb-4" />
                <Skeleton className="h-5 w-32 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSkeleton;
