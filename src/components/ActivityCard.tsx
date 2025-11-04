import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StatusBadge, { ActivityStatus } from "./StatusBadge";
import ProgressBar from "./ProgressBar";
import { ArrowRight } from "lucide-react";

import placardsImg from "@/assets/placards.jpg";
import workersHonoredImg from "@/assets/workers-honored.jpg";
import treesPlantedImg from "@/assets/trees-planted.jpg";
import scholarshipsImg from "@/assets/scholarships.jpg";
import booksDonatedImg from "@/assets/books-donated.jpg";
import mealsServedImg from "@/assets/meals-served.jpg";
import benchesInstalledImg from "@/assets/benches-installed.jpg";
import alumniStoriesImg from "@/assets/alumni-stories.jpg";
import bloodDonationsImg from "@/assets/blood-donations.jpg";

export interface Activity {
  id: string;
  title: string;
  status: ActivityStatus;
  impact: string;
  imageGradient: string;
  description?: string;
  progress?: number;
  image?: string;
}

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

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const imageUrl = activity.image ? imageMap[activity.image] : null;
  const showProgress = activity.status === "in-progress" && activity.progress !== undefined;
  
  return (
    <Link to={`/activity/${activity.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card border-border">
        {imageUrl ? (
          <div className="w-full aspect-video overflow-hidden">
            <img 
              src={imageUrl} 
              alt={activity.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div 
            className="w-full aspect-video"
            style={{
              background: activity.imageGradient,
            }}
          />
        )}
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {activity.title}
            </h3>
            <StatusBadge status={activity.status} />
          </div>
          
          <p className="text-muted-foreground font-medium mb-4">
            {activity.impact}
          </p>
          
          {showProgress && <ProgressBar progress={activity.progress!} />}
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
            View Details
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ActivityCard;
