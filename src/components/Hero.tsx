import heroImage from "@/assets/hero-centenary.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="JKKN Educational Institution" 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(255, 140, 82, 0.85) 50%, rgba(255, 165, 107, 0.8) 100%)',
          }}
        />
      </div>
      
      <div className="container relative z-10 px-6 py-24 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-in tracking-tight">
          JKKN CENTENARY
        </h1>
        <p className="text-3xl md:text-5xl font-semibold text-primary-foreground/95 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          100 YEARS, 100 WAYS
        </p>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Celebrating a legacy of service through 100 initiatives
        </p>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
