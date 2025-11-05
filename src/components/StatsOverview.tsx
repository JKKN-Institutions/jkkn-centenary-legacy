import { CheckCircle2, Clock, Calendar, TrendingUp } from "lucide-react";
import { allActivities } from "@/data/all-activities";
import CounterAnimation from "./CounterAnimation";
import { useRef, memo } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const StatsOverview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });
  
  const completed = allActivities.filter(a => a.status === "completed").length;
  const inProgress = allActivities.filter(a => a.status === "in-progress").length;
  const upcoming = allActivities.filter(a => a.status === "upcoming").length;
  
  const totalProgress = Math.round(
    allActivities.reduce((sum, activity) => sum + (activity.progress || 0), 0) / allActivities.length
  );

  const supportingStats = [
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info/20",
    },
    {
      label: "Upcoming",
      value: upcoming,
      icon: Calendar,
      color: "text-neutral",
      bgColor: "bg-neutral/10",
      borderColor: "border-neutral/20",
    },
  ];

  return (
    <div ref={sectionRef} className="container px-6 py-20">
      {/* Hero Stat - Overall Progress */}
      <div className="mb-12 flex justify-center">
        <div
          className={`relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-12 border-2 transition-all duration-700 max-w-md w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            borderImage: "linear-gradient(135deg, hsl(var(--primary) / 0.4), transparent) 1",
            boxShadow: "0 8px 32px hsl(var(--primary) / 0.15)",
          }}
        >
          {/* Decorative Gradient Orb */}
          <div
            className="absolute top-8 right-8 w-24 h-24 rounded-full opacity-20 blur-2xl"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            }}
          />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-light mb-6 shadow-lg">
              <TrendingUp className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <div className="text-7xl font-extrabold bg-gradient-to-br from-primary via-primary to-primary-dark bg-clip-text text-transparent mb-3">
              <CounterAnimation end={totalProgress} suffix="%" duration={2000} />
            </div>
            
            <div className="text-lg font-bold text-foreground tracking-wide uppercase">
              Overall Progress
            </div>
            
            <div className="mt-6 h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-primary-light to-primary-glow rounded-full transition-all duration-1000"
                style={{ width: isVisible ? `${totalProgress}%` : "0%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportingStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`group bg-card rounded-xl p-8 border-2 ${stat.borderColor} hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                boxShadow: "0 4px 16px hsl(var(--foreground) / 0.05)",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Animated Icon Orb */}
                <div
                  className={`relative ${stat.bgColor} w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                  style={{
                    boxShadow: `0 0 0 0 ${stat.color.replace("text-", "hsl(var(--")})`,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"
                    style={{
                      background: `radial-gradient(circle, ${stat.color.replace("text-", "hsl(var(--")} / 0.3) 0%, transparent 70%)`,
                    }}
                  />
                  <Icon className={`w-8 h-8 ${stat.color} relative z-10`} />
                </div>

                <div className="flex-1">
                  <div className={`text-4xl font-extrabold ${stat.color} mb-1 tabular-nums`}>
                    <CounterAnimation end={stat.value} duration={1500} />
                  </div>
                  <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(StatsOverview);
