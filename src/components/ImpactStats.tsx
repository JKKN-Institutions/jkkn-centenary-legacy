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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {stats.map((stat, index) => {
        const IconComponent = Icons[stat.icon as keyof typeof Icons] as LucideIcon;
        const colorClass = stat.color === "success" 
          ? "text-success" 
          : stat.color === "info" 
          ? "text-info" 
          : "text-primary";

        return (
          <div
            key={index}
            className="text-center p-8 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {IconComponent && (
              <IconComponent className={`w-16 h-16 mx-auto mb-4 ${colorClass}`} />
            )}
            <div className="text-5xl md:text-6xl font-extrabold text-foreground mb-2">
              {isVisible && <CounterAnimation end={stat.value} duration={2000} />}
            </div>
            <p className="text-lg text-muted-foreground font-medium">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ImpactStats;
