import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StatusBadge, { ActivityStatus } from "./StatusBadge";
import ProgressBar from "./ProgressBar";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ShimmerLoader from "./ShimmerLoader";

export interface Activity {
  id: string;
  title: string;
  status: ActivityStatus;
  impact: string;
  imageGradient: string;
  description?: string;
  progress?: number;
  image?: string;
  hero_image_url?: string;
  category?: string;
}

interface ActivityCardProps {
  activity: Activity;
  index?: number;
}

const ActivityCard = ({ activity, index = 0 }: ActivityCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const imageUrl = activity.hero_image_url || null;
  const showProgress = activity.status === "in-progress" && activity.progress !== undefined;
  
  return (
    <article
      ref={cardRef}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
      aria-label={`${activity.title} initiative`}
    >
      <Link to={`/activity/${activity.id}`} className="group block h-full" aria-label={`View details for ${activity.title}`}>
        <Card className="h-full overflow-hidden transition-all duration-500 hover:-translate-y-3 bg-card relative"
          style={{
            boxShadow: "0 4px 16px hsl(var(--foreground) / 0.08)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 40px hsl(var(--foreground) / 0.12), 0 4px 12px hsl(var(--primary) / 0.2)";
            e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 16px hsl(var(--foreground) / 0.08)";
            e.currentTarget.style.transform = "";
          }}
        >
          {/* Gradient Border Effect on Hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, transparent 50%, hsl(var(--primary) / 0.3) 100%)",
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          
          {imageUrl ? (
            <div className="w-full aspect-[4/3] overflow-hidden relative">
              <ShimmerLoader />
              <img 
                src={imageUrl} 
                alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Status Badge - Prominent Position */}
              <div className="absolute top-4 right-4">
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
              <div className="absolute top-4 right-4">
                <StatusBadge status={activity.status} />
              </div>
            </div>
          )}
          
          <CardContent className="p-5 sm:p-6 md:p-8">
            {/* Category Tag */}
            {activity.category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3 uppercase tracking-wider">
                {activity.category}
              </span>
            )}
            
            <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 sm:mb-3 leading-tight">
              {activity.title}
            </h3>
            
            <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed font-medium mb-4 sm:mb-5">
              {activity.impact}
            </p>
            
            {showProgress && (
              <ProgressBar progress={activity.progress!} className="mb-4" />
            )}
          </CardContent>
          
          <CardFooter className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-0">
            <div className="flex items-center text-primary font-extrabold group-hover:gap-3 transition-all duration-300 text-sm sm:text-base group-hover:text-primary-dark">
              <span className="relative">
                Explore Initiative
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-3 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </article>
  );
};

export default ActivityCard;
