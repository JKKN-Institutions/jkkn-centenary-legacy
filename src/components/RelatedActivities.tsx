import { Link } from "react-router-dom";
import { Activity } from "@/components/ActivityCard";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
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

interface RelatedActivitiesProps {
  activities: Activity[];
  currentActivityId: string;
}

const RelatedActivities = ({ activities, currentActivityId }: RelatedActivitiesProps) => {
  const relatedActivities = activities.filter(a => a.id !== currentActivityId).slice(0, 3);

  if (relatedActivities.length === 0) return null;

  return (
    <section className="mt-24 pt-20 border-t-2 relative" style={{
      borderImage: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent) 1"
    }}>
      {/* Decorative Elements */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-radial from-primary/20 to-transparent blur-2xl" />
      
      <div className="animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight text-center">
          More Initiatives Like This
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-16 text-center max-w-2xl mx-auto">
          Explore other impactful activities creating lasting change in our community
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedActivities.map((activity, index) => {
          const imageUrl = activity.image ? imageMap[activity.image] : null;
          
          return (
            <Link 
              key={activity.id} 
              to={`/activity/${activity.id}`}
              className="group block animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 150}ms`,
                animationFillMode: "backwards"
              }}
            >
              <Card className="overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] bg-card h-full border-2 border-transparent hover:border-primary/20"
                style={{
                  boxShadow: "0 4px 16px hsl(var(--foreground) / 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 20px 60px hsl(var(--foreground) / 0.15), 0 8px 20px hsl(var(--primary) / 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 16px hsl(var(--foreground) / 0.08)";
                }}
              >
                {imageUrl ? (
                  <div className="w-full aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={imageUrl} 
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={activity.status} />
                    </div>
                  </div>
                ) : (
                  <div 
                    className="w-full aspect-[4/3] relative"
                    style={{
                      background: activity.imageGradient,
                    }}
                  >
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={activity.status} />
                    </div>
                  </div>
                )}
                
                <CardContent className="p-6">
                  {activity.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3 uppercase tracking-wider">
                      {activity.category}
                    </span>
                  )}
                  
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-tight line-clamp-2">
                    {activity.title}
                  </h3>
                  
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed text-sm line-clamp-2 mb-4">
                    {activity.impact}
                  </p>
                  
                  <div className="flex items-center text-primary font-extrabold text-sm group-hover:gap-3 transition-all duration-300 group-hover:text-primary-dark">
                    <span className="relative">
                      View Details
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedActivities;
