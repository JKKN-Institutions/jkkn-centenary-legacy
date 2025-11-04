import { useEffect, useState } from "react";

interface UseParallaxOptions {
  speed?: number;
  startOffset?: number;
}

export const useParallax = ({ speed = 0.5, startOffset = 0 }: UseParallaxOptions = {}) => {
  const [offset, setOffset] = useState(startOffset);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Only update if scroll has changed
      if (scrollY !== lastScrollY) {
        rafId = requestAnimationFrame(() => {
          setOffset(scrollY * speed);
          lastScrollY = scrollY;
        });
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [speed]);

  return offset;
};
