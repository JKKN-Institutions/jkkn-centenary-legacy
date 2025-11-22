import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
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
  LucideIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import ShareButtons from '@/components/ShareButtons';
import PhotoGallery, { Photo } from '@/components/PhotoGallery';
import ImpactStats from '@/components/ImpactStats';
import TestimonialCard from '@/components/TestimonialCard';
import DownloadButton from '@/components/DownloadButton';
import RelatedActivities from '@/components/RelatedActivities';
import SEO from '@/components/SEO';
import ShimmerLoader from '@/components/ShimmerLoader';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef, useState } from 'react';
import { useActivity, useActivities } from '@/hooks/useActivities';

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
  Gift
};

// Character limits for description truncation
const DESCRIPTION_CHAR_LIMIT = {
  mobile: 120,
  tablet: 180,
  desktop: 250
};

const ActivityDetail = () => {
  const { id } = useParams();
  const { data: activity, isLoading, error } = useActivity(id || '');
  const { data: allActivities } = useActivities();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Refs for scroll animations
  const visionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  const visionVisible = useIntersectionObserver(visionRef, { threshold: 0.1 });
  const galleryVisible = useIntersectionObserver(galleryRef, {
    threshold: 0.05
  });
  const impactVisible = useIntersectionObserver(impactRef, { threshold: 0.1 });
  const testimonialsVisible = useIntersectionObserver(testimonialsRef, {
    threshold: 0.05
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className='min-h-screen bg-background'>
        <div className='container px-4 py-20'>
          <ShimmerLoader />
        </div>
      </div>
    );
  }

  // Handle error or not found
  if (error || !activity) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-center px-6'>
          <h1 className='text-4xl font-bold text-foreground mb-4'>
            Activity Not Found
          </h1>
          <p className='text-muted-foreground mb-8'>
            The activity you're looking for doesn't exist.
          </p>
          <Link to='/'>
            <Button>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Use direct URL from database
  const heroImage = activity.hero_image_url || null;

  // Find related activities
  const relatedActivities = (allActivities || []).filter(
    (a) => a.category === activity.category && a.id !== activity.id
  );

  // Map gallery photos - imageKey now contains direct URLs
  const galleryPhotosWithUrls: Photo[] =
    activity.galleryPhotos?.map((photo) => ({
      url: photo.imageKey, // This is now a direct URL from database
      caption: photo.caption
    })) || [];

  return (
    <div className='min-h-screen bg-background'>
      <SEO
        title={`${activity.title} - JKKN Centenary`}
        description={activity.impact}
      />

      {/* Hero Section - Fixed Height with Responsive Design */}
      <section className='relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] flex items-end overflow-hidden'>
        {/* Background Image with Ken Burns Effect */}
        <div
          className='absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out hover:scale-105'
          style={{
            backgroundImage: `url(${heroImage})`
          }}
        >
          {/* Multi-Layer Gradient Overlay - More Dramatic */}
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40' />

          {/* Subtle Grain Texture */}
          <div
            className='absolute inset-0 opacity-[0.03] mix-blend-overlay'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Back Button - Floating with Backdrop Blur - Enhanced */}
        <Link
          to='/'
          className='absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 animate-fade-in-up'
        >
          <Button
            variant='hero'
            size='lg'
            className='backdrop-blur-xl shadow-2xl transition-all duration-300 font-bold text-sm sm:text-base'
          >
            <ArrowLeft className='mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5' />
            <span className='hidden sm:inline'>Back to Activities</span>
            <span className='sm:hidden'>Back</span>
          </Button>
        </Link>

        {/* Hero Content - Enhanced Typography with Mobile Optimization */}
        <div className='relative z-10 w-full px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 pt-16 sm:pt-20 md:pt-24'>
          <div className='container max-w-6xl'>
            {/* Title - Responsive with line clamp */}
            <div
              className='animate-fade-in-up'
              style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            >
              <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 md:mb-6 tracking-tighter leading-tight drop-shadow-2xl line-clamp-2 sm:line-clamp-3'>
                {activity.title}
              </h1>
            </div>

            {/* Description - Short Preview Only */}
            <div
              className='animate-fade-in-up'
              style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
            >
              <div className='max-w-6xl'>
                <p className='text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-light tracking-wide drop-shadow-lg line-clamp-2 sm:line-clamp-3'>
                  {activity.description}
                </p>
                {activity.description &&
                  activity.description.length >
                    DESCRIPTION_CHAR_LIMIT.mobile && (
                    <button
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className='mt-2 sm:mt-3 inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors duration-200 backdrop-blur-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/20'
                    >
                      {isDescriptionExpanded ? (
                        <>
                          <span>Hide Details</span>
                          <ChevronUp className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                        </>
                      ) : (
                        <>
                          <span>Read More</span>
                          <ChevronDown className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                        </>
                      )}
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className='absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-28 bg-gradient-to-t from-background to-transparent z-[5]' />
      </section>

      {/* Expanded Description Section - Shows Below Hero */}
      {isDescriptionExpanded &&
        activity.description &&
        activity.description.length > DESCRIPTION_CHAR_LIMIT.mobile && (
          <section className='py-6 sm:py-8 md:py-10 bg-gradient-to-b from-primary/5 to-background border-b border-border/30 animate-fade-in-up'>
            <div className='container max-w-9xl px-4 sm:px-6 md:px-8'>
              <div className='bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-lg'>
                <h3 className='text-sm sm:text-base font-bold text-primary uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2'>
                  <BookOpen className='w-4 h-4 sm:w-5 sm:h-5' />
                  Full Description
                </h3>
                <p className='text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed'>
                  {activity.description}
                </p>
                <button
                  onClick={() => setIsDescriptionExpanded(false)}
                  className='mt-4 sm:mt-6 inline-flex items-center gap-1.5 text-primary hover:text-primary/80 text-xs sm:text-sm font-medium transition-colors duration-200'
                >
                  <span>Hide Details</span>
                  <ChevronUp className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                </button>
              </div>
            </div>
          </section>
        )}

      {/* Overview Section - Clean Layout with Mobile Optimization */}
      <section className='py-8 sm:py-12 md:py-16 lg:py-20 border-b border-border/50 bg-gradient-to-b from-card to-background relative overflow-hidden'>
        {/* Decorative Background Elements */}
        <div className='absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl' />

        <div className='container max-w-6xl px-4 sm:px-6 md:px-8 relative z-10'>
          {/* Status and Date Row */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12 sm:divide-x divide-border'>
            {/* Status */}
            <div
              className='flex flex-col items-center text-center px-4 sm:px-6 animate-fade-in-up'
              style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
            >
              <div className='text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-3 sm:mb-4 opacity-70'>
                Status
              </div>
              <StatusBadge status={activity.status} />
            </div>

            {/* Date */}
            <div
              className='flex flex-col items-center text-center px-4 sm:px-6 animate-fade-in-up'
              style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            >
              <div className='text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-3 sm:mb-4 opacity-70'>
                Date
              </div>
              <div className='flex items-center gap-2 sm:gap-3 text-foreground bg-primary/5 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-primary/10'>
                <Calendar className='w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0' />
                <span className='text-sm sm:text-base md:text-lg font-bold whitespace-nowrap'>
                  {activity.dateCompleted || activity.dateScheduled || 'TBD'}
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics Row - Full Width */}
          <div
            className='flex flex-col items-center text-center animate-fade-in-up'
            style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
          >
            <div className='text-xs font-extrabold text-muted-foreground uppercase tracking-widest mb-4 sm:mb-6 opacity-70'>
              Key Metrics
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-4xl'>
              {activity.metrics?.map((metric, index) => {
                const IconComponent = iconMap[metric.icon];
                return (
                  <div
                    key={index}
                    className='group relative flex flex-col items-center gap-2 sm:gap-3 text-foreground bg-gradient-to-br from-primary/5 via-background to-primary/5 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl border-2 border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                  >
                    {/* Glow effect on hover */}
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent rounded-2xl transition-all duration-300' />

                    {/* Icon with background */}
                    {IconComponent && (
                      <div className='relative z-10 p-2.5 sm:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300'>
                        <IconComponent className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary' />
                      </div>
                    )}

                    {/* Value */}
                    <span className='relative z-10 text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight'>
                      {metric.value}
                    </span>

                    {/* Label */}
                    <span className='relative z-10 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center'>
                      {metric.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The Vision Section - Rich Typography */}
      <section
        ref={visionRef}
        className='py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden'
      >
        {/* Decorative Elements */}
        <div className='absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl' />
        <div className='absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl' />

        <div className='container max-w-5xl px-4 sm:px-6 md:px-8 lg:px-12 relative z-10'>
          <div>
            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-8 sm:mb-10 md:mb-12 tracking-tight text-center bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text'>
              The Vision
            </h2>
          </div>

          <div className='space-y-6 sm:space-y-8'>
            {activity.visionText ? (
              activity.visionText.map((paragraph, index) => (
                <div key={index}>
                  <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/85 leading-relaxed font-light tracking-wide text-center max-w-4xl mx-auto'>
                    {paragraph}
                  </p>
                </div>
              ))
            ) : (
              <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/85 leading-relaxed font-light tracking-wide text-center'>
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
          className='py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30'
        >
          <div className='container max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12'>
            <div>
              <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-10 sm:mb-12 md:mb-16 tracking-tight text-center'>
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
          className='py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden'
        >
          {/* Animated Background Orbs */}
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/40 to-transparent blur-3xl animate-pulse-glow' />
            <div
              className='absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary-light/40 to-transparent blur-3xl animate-pulse-glow'
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className='container max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 relative z-10'>
            <div>
              <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-3 sm:mb-4 tracking-tight text-center'>
                Impact by the Numbers
              </h2>
              <p className='text-center text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-4'>
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
          className='py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20'
        >
          <div className='container max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12'>
            <div>
              <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-3 sm:mb-4 tracking-tight text-center'>
                Voices of Impact
              </h2>
              <p className='text-center text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-4'>
                Real stories from real people whose lives were touched
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
              {activity.testimonials.map((testimonial, index) => (
                <div key={index}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share & Download Section - Dramatic Call to Action */}
      <section className='py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-y border-primary/30 relative overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0 opacity-[0.07]'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className='absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-primary/15 to-transparent blur-3xl animate-pulse-glow' />
        <div
          className='absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-primary-light/15 to-transparent blur-3xl animate-pulse-glow'
          style={{ animationDelay: '1s' }}
        />

        <div className='container max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 relative z-10'>
          <div className='glass-strong rounded-2xl sm:rounded-3xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border-2 border-primary/10 hover:border-primary/20 transition-all duration-700 hover:shadow-[0_30px_100px_rgba(0,0,0,0.15)] relative overflow-hidden group'>
            {/* Shimmer Effect on Hover */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000' />

            <div className='flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 relative z-10'>
              <div className='text-center md:text-left flex-1 animate-fade-in-up'>
                <div className='inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 rounded-full mb-3 sm:mb-4'>
                  <span className='text-xs sm:text-sm font-extrabold text-primary uppercase tracking-wider'>
                    Spread The Impact
                  </span>
                </div>
                <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-3 sm:mb-4 tracking-tight leading-tight'>
                  Share This Initiative
                </h3>
                <p className='text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-xl leading-relaxed'>
                  Help us amplify this story and inspire others to create
                  positive change in their communities
                </p>
              </div>
              <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-5'>
                <div
                  className='animate-fade-in-scale'
                  style={{
                    animationDelay: '0.2s',
                    animationFillMode: 'backwards'
                  }}
                >
                  <ShareButtons title={activity.title} />
                </div>
                <div
                  className='animate-fade-in-scale'
                  style={{
                    animationDelay: '0.3s',
                    animationFillMode: 'backwards'
                  }}
                >
                  <DownloadButton
                    imageUrl={heroImage || ''}
                    fileName={`${activity.id}-hero.jpg`}
                    galleryPhotos={galleryPhotosWithUrls}
                    activityTitle={activity.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Activities */}
      {relatedActivities.length > 0 && (
        <section className='py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden'>
          {/* Decorative Elements */}
          <div className='absolute top-0 left-1/3 w-96 h-96 rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl' />
          <div className='absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl' />

          <div className='container px-4 sm:px-6 md:px-8 relative z-10'>
            <RelatedActivities
              activities={relatedActivities}
              currentActivityId={activity.id}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default ActivityDetail;
