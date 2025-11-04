import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight * 0.7,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors group cursor-pointer z-10 bg-transparent border-none"
      aria-label="Scroll down to view initiatives and content"
    >
      <span className="text-sm font-medium tracking-wider uppercase">Explore</span>
      <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/60 flex items-start justify-center p-1 group-hover:border-primary-foreground transition-colors">
        <div className="w-1.5 h-2 bg-primary-foreground/80 rounded-full animate-scroll-bounce" />
      </div>
      <ChevronDown className="w-4 h-4 animate-bounce" />
    </button>
  );
};

export default ScrollIndicator;
