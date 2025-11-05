import { useParams, Link } from "react-router-dom";
import { allActivities } from "@/data/all-activities";
import { ArrowLeft, Calendar, Users, Heart, BookOpen, Award, DollarSign, Target, TrendingUp, Zap, Star, Gift, LucideIcon } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import ShareButtons from "@/components/ShareButtons";
import PhotoGallery, { Photo } from "@/components/PhotoGallery";
import ImpactStats from "@/components/ImpactStats";
import TestimonialCard from "@/components/TestimonialCard";
import DownloadButton from "@/components/DownloadButton";
import RelatedActivities from "@/components/RelatedActivities";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

import placardsImg from "@/assets/placards.jpg";
import workersHonoredImg from "@/assets/workers-honored.jpg";
import treesPlantedImg from "@/assets/trees-planted.jpg";
import scholarshipsImg from "@/assets/scholarships.jpg";
import booksDonatedImg from "@/assets/books-donated.jpg";
import mealsServedImg from "@/assets/meals-served.jpg";
import benchesInstalledImg from "@/assets/benches-installed.jpg";
import alumniStoriesImg from "@/assets/alumni-stories.jpg";
import bloodDonationsImg from "@/assets/blood-donations.jpg";

const imageMap: Record<string, string> = {
  "placards": placardsImg,
  "workers-honored": workersHonoredImg,
  "trees-planted": treesPlantedImg,
  "scholarships": scholarshipsImg,
  "books-donated": booksDonatedImg,
  "meals-served": mealsServedImg,
  "benches-installed": benchesInstalledImg,
  "alumni-stories": alumniStoriesImg,
  "blood-donations": bloodDonationsImg,
};

const iconMap: Record<string, LucideIcon> = {
  Users,
  Heart,
  BookOpen,
  Award,
  DollarSign,
  Target,
  TrendingUp,
  Zap,
  Star,
  Gift,
};

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = allActivities.find((a) => a.id === id);
  
  // Refs for scroll animations
  const visionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  
  const visionVisible = useIntersectionObserver(visionRef, { threshold: 0.2 });
  const galleryVisible = useIntersectionObserver(galleryRef, { threshold: 0.1 });
  const impactVisible = useIntersectionObserver(impactRef, { threshold: 0.2 });
  const testimonialsVisible = useIntersectionObserver(testimonialsRef, { threshold: 0.1 });

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Activity Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The activity you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = activity.image ? imageMap[activity.image] : null;
  
  // Find related activities
  const relatedActivities = allActivities.filter(
    a => a.category === activity.category && a.id !== activity.id
  );

  // Map gallery photos
  const galleryPhotosWithUrls: Photo[] = activity.galleryPhotos?.map(photo => ({
    url: imageMap[photo.imageKey] || heroImage || "",
    caption: photo.caption
  })) || [];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${activity.title} - JKKN Centenary`}
        description={activity.impact}
      />

      {/* Hero Section - Dramatic Full-Width */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        {/* Background Image with Ken Burns Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out hover:scale-105"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          {/* Multi-Layer Gradient Overlay - More Dramatic */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          
          {/* Subtle Grain Texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Back Button - Floating with Backdrop Blur - Enhanced */}
        <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 z-20 animate-fade-in-up">
          <Button
            variant="hero"
            size="lg"
            className="backdrop-blur-xl shadow-2xl transition-all duration-300 font-bold"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="hidden sm:inline">Back to Activities</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>

        {/* Hero Content - Enhanced Typography with Mobile Optimization */}
        <div className="relative z-10 w-full px-6 md:px-8 pb-16 md:pb-20 pt-32 md:pt-40">
          <div className="container max-w-6xl">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 md:mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl">
                {activity.title}
              </h1>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 max-w-4xl leading-relaxed font-light tracking-wide drop-shadow-lg">
                {activity.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
      </section>

      {/* Overview Section - Clean 3-Column with Mobile Optimization */}
      <section className="py-12 md:py-16 lg:py-20 border-b border-border/50 bg-gradient-to-b from-card to-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="container max-w-6xl px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-border">
            {/* Status */}
            <div className="flex flex-col items-center text-center px-6 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
              <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-4 opacity-70">
                Status
              </div>
              <StatusBadge status={activity.status} />
            </div>

            {/* Date */}
            <div className="flex flex-col items-center text-center px-6 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
              <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-4 opacity-70">
                Date
              </div>
              <div className="flex items-center gap-3 text-foreground bg-primary/5 px-6 py-3 rounded-full border border-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-lg font-bold">
                  {activity.dateCompleted || activity.dateScheduled || "TBD"}
                </span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="flex flex-col items-center text-center px-6 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
              <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-4 opacity-70">
                Key Metrics
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {activity.metrics?.map((metric, index) => {
                  const IconComponent = iconMap[metric.icon];
                  return (
                    <div key={index} className="flex items-center gap-2 text-foreground bg-muted/50 px-4 py-2 rounded-full border border-border hover:border-primary/30 transition-colors duration-300">
                      {IconComponent && <IconComponent className="w-4 h-4 text-primary" />}
                      <span className="text-sm font-bold">{metric.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Section - Rich Typography */}
      <section 
        ref={visionRef}
        className={`py-24 md:py-32 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden transition-all duration-1000 ${
          visionVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
        
        <div className="container max-w-5xl px-6 md:px-12 relative z-10">
          <div className={`transition-all duration-1000 delay-200 ${visionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-extrabold text-foreground mb-12 tracking-tight text-center bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
              The Vision
            </h2>
          </div>
          
          <div className="space-y-8">
            {activity.visionText ? (
              activity.visionText.map((paragraph, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-1000 ${visionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ 
                    transitionDelay: `${400 + index * 150}ms`,
                  }}
                >
                  <p className="text-xl md:text-2xl text-foreground/85 leading-relaxed font-light tracking-wide text-center max-w-4xl mx-auto">
                    {paragraph}
                  </p>
                </div>
              ))
            ) : (
              <p className={`text-xl md:text-2xl text-foreground/85 leading-relaxed font-light tracking-wide text-center transition-all duration-1000 ${visionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {activity.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section - Staggered Grid */}
      {galleryPhotosWithUrls.length > 0 && (
        <section 
          ref={galleryRef}
          className={`py-24 md:py-32 bg-gradient-to-b from-background to-muted/30 transition-all duration-1000 ${
            galleryVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="container max-w-7xl px-6 md:px-12">
            <div className={`transition-all duration-1000 delay-200 ${galleryVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-extrabold text-foreground mb-16 tracking-tight text-center">
                Photo Gallery
              </h2>
            </div>
            <PhotoGallery photos={galleryPhotosWithUrls} />
          </div>
        </section>
      )}

      {/* Impact Section - Dramatic Numbers */}
      {activity.impactStats && activity.impactStats.length > 0 && (
        <section 
          ref={impactRef}
          className={`py-24 md:py-32 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden transition-all duration-1000 ${
            impactVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/40 to-transparent blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary-light/40 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
          </div>
          
          <div className="container max-w-7xl px-6 md:px-12 relative z-10">
            <div className={`transition-all duration-1000 delay-200 ${impactVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight text-center">
                Impact by the Numbers
              </h2>
              <p className="text-center text-muted-foreground text-lg md:text-xl mb-16 max-w-2xl mx-auto">
                Measurable change that creates lasting value for our community
              </p>
            </div>
            <ImpactStats stats={activity.impactStats} />
          </div>
        </section>
      )}

      {/* Testimonials Section - Authentic Voices */}
      {activity.testimonials && activity.testimonials.length > 0 && (
        <section 
          ref={testimonialsRef}
          className={`py-24 md:py-32 bg-gradient-to-b from-background to-secondary/20 transition-all duration-1000 ${
            testimonialsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="container max-w-7xl px-6 md:px-12">
            <div className={`transition-all duration-1000 delay-200 ${testimonialsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight text-center">
                Voices of Impact
              </h2>
              <p className="text-center text-muted-foreground text-lg md:text-xl mb-16 max-w-2xl mx-auto">
                Real stories from real people whose lives were touched
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activity.testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-700 ${testimonialsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share & Download Section - Dramatic Call to Action */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-y-2 border-primary/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-primary/15 to-transparent blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-primary-light/15 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        <div className="container max-w-6xl px-6 md:px-12 relative z-10">
          <div className="glass-strong rounded-[2rem] p-12 md:p-16 shadow-2xl border-2 border-primary/10 hover:border-primary/20 transition-all duration-700 hover:shadow-[0_30px_100px_rgba(0,0,0,0.15)] relative overflow-hidden group">
            {/* Shimmer Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="text-center md:text-left flex-1 animate-fade-in-up">
                <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-4">
                  <span className="text-sm font-extrabold text-primary uppercase tracking-wider">
                    Spread The Impact
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight leading-tight">
                  Share This Initiative
                </h3>
                <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
                  Help us amplify this story and inspire others to create positive change in their communities
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="animate-fade-in-scale" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
                  <ShareButtons title={activity.title} />
                </div>
                <div className="animate-fade-in-scale" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
                  <DownloadButton 
                    imageUrl={heroImage || ""} 
                    fileName={`${activity.id}-photo.jpg`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Activities */}
      {relatedActivities.length > 0 && (
        <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
          
          <div className="container px-6 relative z-10">
            <RelatedActivities activities={relatedActivities} currentActivityId={activity.id} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ActivityDetail;
