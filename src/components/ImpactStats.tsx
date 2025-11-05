import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import CounterAnimation from "./CounterAnimation";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

export interface ImpactStat {
  icon: string;
  value: number;
  label: string;
  color?: string;
}

interface ImpactStatsProps {
  stats: ImpactStat[];
}

const ImpactStats = ({ stats }: ImpactStatsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {stats.map((stat, index) => {
        const IconComponent = Icons[stat.icon as keyof typeof Icons] as LucideIcon;
        const colorClass = stat.color === "success" 
          ? "text-success" 
          : stat.color === "info" 
          ? "text-info" 
          : "text-primary";
        
        const bgGradient = stat.color === "success"
          ? "from-success/10 to-success/5"
          : stat.color === "info"
          ? "from-info/10 to-info/5"
          : "from-primary/10 to-primary/5";

        return (
          <div
            key={index}
            className={`group text-center p-10 md:p-12 rounded-3xl bg-gradient-to-br ${bgGradient} border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-500 rounded-3xl" />
            
            {/* Radial Glow Behind Icon */}
            <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
              stat.color === "success" ? "bg-success" : stat.color === "info" ? "bg-info" : "bg-primary"
            }`} />
            
            {/* Icon with Animation */}
            <div className="relative z-10 mb-6 group-hover:scale-110 transition-transform duration-500">
              {IconComponent && (
                <div className="inline-block">
                  <IconComponent className={`w-20 h-20 md:w-24 md:h-24 mx-auto ${colorClass} drop-shadow-lg`} />
                </div>
              )}
            </div>
            
            {/* Number with Counter Animation */}
            <div className="relative z-10 text-6xl md:text-7xl lg:text-8xl font-extrabold text-foreground mb-4 tracking-tighter leading-none">
              {isVisible && <CounterAnimation end={stat.value} duration={2500} />}
            </div>
            
            {/* Label - Enhanced */}
            <p className="relative z-10 text-lg md:text-xl text-muted-foreground font-bold uppercase tracking-wider">
              {stat.label}
            </p>
            
            {/* Decorative Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        );
      })}
    </div>
  );
};

export default ImpactStats;
