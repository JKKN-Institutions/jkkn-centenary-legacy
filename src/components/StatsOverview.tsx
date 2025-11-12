import { CheckCircle2, Clock, Calendar, TrendingUp } from "lucide-react";
import { allActivities } from "@/data/all-activities";
import CounterAnimation from "./CounterAnimation";
import { useRef } from "react";
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
    <div ref={sectionRef} className="container px-4 sm:px-6 py-16 sm:py-20 md:py-32">
      {/* Hero Stat - Overall Progress */}
      <div className="mb-10 sm:mb-12 md:mb-16 flex justify-center">
        <div
          className={`relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-16 border-2 transition-all duration-700 max-w-xl w-full hover:scale-105 group ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            borderImage: "linear-gradient(135deg, hsl(var(--primary) / 0.4), transparent) 1",
            boxShadow: "0 12px 48px hsl(var(--primary) / 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 20px 70px hsl(var(--primary) / 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 48px hsl(var(--primary) / 0.2)";
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
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-primary-light mb-4 sm:mb-6 md:mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary-foreground group-hover:rotate-12 transition-transform duration-500" />
            </div>
            
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold bg-gradient-to-br from-primary via-primary-light to-primary-dark bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tighter">
              <CounterAnimation end={totalProgress} suffix="%" duration={2000} />
            </div>
            
            <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-foreground tracking-wider uppercase mb-1 sm:mb-2">
              Overall Progress
            </div>
            
            <div className="text-sm sm:text-base text-muted-foreground font-semibold mb-6 sm:mb-8">
              Toward our centenary celebration
            </div>
            
            <div className="mt-8 h-4 bg-muted/50 rounded-full overflow-hidden border border-border/30 backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-primary via-primary-light to-primary-glow rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ width: isVisible ? `${totalProgress}%` : "0%" }}
              >
                {/* Shimmer Effect on Progress Bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                  style={{
                    backgroundSize: "200% 100%"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Stats Row - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {supportingStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`group bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border-2 ${stat.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                boxShadow: "0 6px 24px hsl(var(--foreground) / 0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 16px 56px hsl(var(--foreground) / 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 24px hsl(var(--foreground) / 0.08)";
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                {/* Enhanced Animated Icon Orb */}
                <div
                  className={`relative ${stat.bgColor} w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  style={{
                    boxShadow: `0 0 0 0 ${stat.color.replace("text-", "hsl(var(--")})`,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"
                    style={{
                      background: `radial-gradient(circle, ${stat.color.replace("text-", "hsl(var(--")} / 0.4) 0%, transparent 70%)`,
                    }}
                  />
                  <Icon className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 ${stat.color} relative z-10 group-hover:scale-110 transition-transform duration-500`} />
                </div>

                <div className="flex-1">
                  <div className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${stat.color} mb-1 sm:mb-2 tabular-nums tracking-tighter`}>
                    <CounterAnimation end={stat.value} duration={1500} />
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-extrabold uppercase tracking-wider sm:tracking-widest group-hover:text-foreground transition-colors duration-300">
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

export default StatsOverview;
