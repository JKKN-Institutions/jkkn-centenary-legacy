import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";
import ShareButtons from "@/components/ShareButtons";
import { allActivities } from "@/data/all-activities";

import placardsImg from "@/assets/placards.jpg";
import workersHonoredImg from "@/assets/workers-honored.jpg";
import treesPlantedImg from "@/assets/trees-planted.jpg";
import scholarshipsImg from "@/assets/scholarships.jpg";
import booksDonatedImg from "@/assets/books-donated.jpg";
import mealsServedImg from "@/assets/meals-served.jpg";
import benchesInstalledImg from "@/assets/benches-installed.jpg";
import alumniStoriesImg from "@/assets/alumni-stories.jpg";
import bloodDonationsImg from "@/assets/blood-donations.jpg";

const imageMap: Record<string, string> = {
  "placards": placardsImg,
  "workers-honored": workersHonoredImg,
  "trees-planted": treesPlantedImg,
  "scholarships": scholarshipsImg,
  "books-donated": booksDonatedImg,
  "meals-served": mealsServedImg,
  "benches-installed": benchesInstalledImg,
  "alumni-stories": alumniStoriesImg,
  "blood-donations": bloodDonationsImg,
};

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = allActivities.find((a) => a.id === id);
  const imageUrl = activity?.image ? imageMap[activity.image] : null;
  const showProgress = activity?.status === "in-progress" && activity?.progress !== undefined;

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
          {imageUrl ? (
            <div className="w-full aspect-video rounded-lg mb-8 shadow-2xl overflow-hidden">
              <img 
                src={imageUrl} 
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div 
              className="w-full aspect-video rounded-lg mb-8 shadow-lg"
              style={{
                background: activity.imageGradient,
              }}
            />
          )}

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-sm">
                  {activity.category}
                </Badge>
                <StatusBadge status={activity.status} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {activity.title}
              </h1>
              <p className="text-xl font-semibold text-primary">
                {activity.impact}
              </p>
            </div>
            <ShareButtons title={activity.title} />
          </div>

          {showProgress && (
            <div className="mb-8 p-6 bg-accent/50 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-accent-foreground mb-4">
                Progress Tracking
              </h3>
              <ProgressBar progress={activity.progress!} />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
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
