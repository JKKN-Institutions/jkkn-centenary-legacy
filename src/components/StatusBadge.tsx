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
      className="gap-2 font-bold text-sm px-4 py-2 shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
