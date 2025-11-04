import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { activities } from "@/data/activities";

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Activity Not Found</h1>
          <Link to="/">
            <Button variant="default">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-6 py-12 max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Activities
        </Link>

        <div className="animate-fade-in">
          <div 
            className="w-full aspect-video rounded-lg mb-8 shadow-lg"
            style={{
              background: activity.imageGradient,
            }}
          />

          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {activity.title}
            </h1>
            <StatusBadge status={activity.status} />
          </div>

          <p className="text-xl font-semibold text-primary mb-8">
            {activity.impact}
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {activity.description}
            </p>
          </div>

          {activity.status === "in-progress" && (
            <div className="mt-12 p-6 bg-accent rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-accent-foreground mb-2">
                This Initiative is Currently Active
              </h3>
              <p className="text-muted-foreground">
                We're working hard to complete this initiative. Check back soon for updates on our progress!
              </p>
            </div>
          )}

          {activity.status === "upcoming" && (
            <div className="mt-12 p-6 bg-secondary rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-secondary-foreground mb-2">
                Coming Soon
              </h3>
              <p className="text-muted-foreground">
                This initiative is planned for the near future. Stay tuned for more details!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
