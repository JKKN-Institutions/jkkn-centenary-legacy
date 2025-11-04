import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StatusBadge, { ActivityStatus } from "./StatusBadge";
import { ArrowRight } from "lucide-react";

export interface Activity {
  id: string;
  title: string;
  status: ActivityStatus;
  impact: string;
  imageGradient: string;
  description?: string;
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <Link to={`/activity/${activity.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card border-border">
        <div 
          className="w-full aspect-video"
          style={{
            background: activity.imageGradient,
          }}
        />
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {activity.title}
            </h3>
            <StatusBadge status={activity.status} />
          </div>
          
          <p className="text-muted-foreground font-medium">
            {activity.impact}
          </p>
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
