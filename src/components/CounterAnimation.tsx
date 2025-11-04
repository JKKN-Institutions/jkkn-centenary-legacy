import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";

interface CounterAnimationProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const CounterAnimation = ({ end, duration = 1500, suffix = "", prefix = "", className = "" }: CounterAnimationProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const count = useCountUp(hasAnimated ? end : 0, duration);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default CounterAnimation;
