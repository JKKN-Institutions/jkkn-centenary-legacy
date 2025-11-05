import heroImage from "@/assets/hero-centenary.jpg";
import ScrollIndicator from "./ScrollIndicator";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt="JKKN Educational Institution celebrating 100 years of excellence" 
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
        </div>
        
        {/* Gradient Overlay with Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.75) 0%, rgba(255, 140, 82, 0.72) 50%, rgba(255, 165, 107, 0.7) 100%)',
          }}
        />
        
        {/* Vignette Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.15) 100%)',
          }}
        />
      </div>
      
      {/* Content - Enhanced Typography */}
      <div className="container relative z-10 px-6 py-32 md:py-40 text-center">
        <div className="animate-bounce-in">
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-primary-foreground mb-10 tracking-tighter leading-[0.85]"
            style={{
              textShadow: '0 6px 20px rgba(0, 0, 0, 0.3), 0 3px 8px rgba(0, 0, 0, 0.2)',
            }}
            role="heading"
            aria-level={1}
          >
            JKKN CENTENARY
          </h1>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
          <p 
            className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-primary-foreground/95 mb-8 tracking-tight" 
            style={{ 
              letterSpacing: '0.03em',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            }}
          >
            100 YEARS, 100 WAYS
          </p>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed font-medium" 
            style={{ 
              textShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            Celebrating a century of excellence, innovation, and service to humanity
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <ScrollIndicator />
      
      {/* Enhanced Wave with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(22 100% 62%)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(30 100% 65%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
