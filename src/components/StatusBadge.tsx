import { CheckCircle2, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ActivityStatus = "completed" | "in-progress" | "upcoming";

interface StatusBadgeProps {
  status: ActivityStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      variant: "success" as const,
    },
    "in-progress": {
      label: "In Progress",
      icon: Clock,
      variant: "info" as const,
    },
    upcoming: {
      label: "Upcoming",
      icon: Calendar,
      variant: "neutral" as const,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className="gap-2 font-extrabold text-sm px-5 py-2.5 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl ring-2 ring-offset-2 ring-offset-background"
    >
      <Icon className="w-5 h-5" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
