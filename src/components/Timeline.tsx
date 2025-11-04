import { CheckCircle2, Circle, Clock } from "lucide-react";

export interface TimelineMilestone {
  date: string;
  title: string;
  description?: string;
  status: "completed" | "current" | "upcoming";
}

interface TimelineProps {
  milestones: TimelineMilestone[];
  className?: string;
}

const Timeline = ({ milestones, className = "" }: TimelineProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-gradient-to-b from-success via-info to-muted" />
      
      <div className="space-y-8">
        {milestones.map((milestone, index) => {
          const isCompleted = milestone.status === "completed";
          const isCurrent = milestone.status === "current";
          
          return (
            <div key={index} className="relative flex gap-6 group">
              {/* Icon */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                isCompleted 
                  ? "bg-success/20 border-2 border-success shadow-lg shadow-success/20" 
                  : isCurrent 
                  ? "bg-info/20 border-2 border-info shadow-lg shadow-info/20 animate-pulse-glow" 
                  : "bg-muted border-2 border-border"
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                ) : isCurrent ? (
                  <Clock className="w-6 h-6 text-info" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                  isCompleted ? "text-success" : isCurrent ? "text-info" : "text-muted-foreground"
                }`}>
                  {milestone.date}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {milestone.title}
                </h4>
                {milestone.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
