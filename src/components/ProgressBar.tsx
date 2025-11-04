import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-foreground uppercase tracking-wider">Progress</span>
        <span className="text-base font-extrabold text-primary tabular-nums">{progress}%</span>
      </div>
      <div className="relative h-3 bg-muted rounded-full overflow-hidden shadow-inner">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 50%, hsl(var(--primary-glow)) 100%)",
            boxShadow: "0 0 12px hsl(var(--primary) / 0.5)",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
