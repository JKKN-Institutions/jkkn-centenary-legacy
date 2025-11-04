import { CheckCircle2, Clock, Calendar, TrendingUp } from "lucide-react";
import { allActivities } from "@/data/all-activities";

const StatsOverview = () => {
  const completed = allActivities.filter(a => a.status === "completed").length;
  const inProgress = allActivities.filter(a => a.status === "in-progress").length;
  const upcoming = allActivities.filter(a => a.status === "upcoming").length;
  const totalProgress = Math.round(
    allActivities.reduce((sum, a) => sum + (a.progress || 0), 0) / allActivities.length
  );

  const stats = [
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      label: "Upcoming",
      value: upcoming,
      icon: Calendar,
      color: "text-neutral",
      bgColor: "bg-neutral/10",
    },
    {
      label: "Overall Progress",
      value: `${totalProgress}%`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="container px-6 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card rounded-lg border border-border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsOverview;
