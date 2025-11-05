import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import ShareButtons from "@/components/ShareButtons";
import DownloadButton from "@/components/DownloadButton";
import PhotoGallery, { Photo } from "@/components/PhotoGallery";
import TestimonialCard, { Testimonial } from "@/components/TestimonialCard";
import ImpactStats, { ImpactStat } from "@/components/ImpactStats";
import RelatedActivities from "@/components/RelatedActivities";
import SEO from "@/components/SEO";
import { allActivities } from "@/data/all-activities";
import { Button } from "@/components/ui/button";

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

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = allActivities.find((a) => a.id === id);
  const imageUrl = activity?.image ? imageMap[activity.image] : null;

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Activity Not Found</h1>
          <Link to="/">
            <Button variant="default">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find related activities (same category)
  const relatedActivities = allActivities.filter(
    a => a.category === activity.category && a.id !== activity.id
  );

  // Map gallery photos from imageKey to actual URLs
  const galleryPhotos = activity.galleryPhotos?.map(photo => ({
    url: imageMap[photo.imageKey] || imageUrl || "",
    caption: photo.caption
  }));

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${activity.title} - JKKN Centenary`}
        description={activity.impact}
      />

      {/* SECTION 1: HERO SECTION - Full-width image with overlaid content */}
      {imageUrl && (
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          {/* Back Button - Top Left */}
          <Link 
            to="/" 
            className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 group font-semibold"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="hidden md:inline">Back to Activities</span>
          </Link>

          {/* Title Overlaid on Image - Bottom Left */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight" style={{
                textShadow: "0 4px 20px rgba(0,0,0,0.5)"
              }}>
                {activity.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl" style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.5)"
              }}>
                {activity.impact}
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="container px-6 py-16">
        {/* SECTION 2: OVERVIEW SECTION - 3 column metrics */}
        <div className="mb-20">
          <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Status */}
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">Status</p>
                <StatusBadge status={activity.status} />
              </div>
              
              {/* Date */}
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                  {activity.status === "completed" ? "Completed" : activity.status === "upcoming" ? "Scheduled" : "In Progress"}
                </p>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold">
                    {activity.dateCompleted || activity.dateScheduled || "2025"}
                  </span>
                </div>
              </div>
              
              {/* Metrics */}
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-3">Key Metrics</p>
                <div className="flex items-center gap-2 text-foreground flex-wrap justify-center">
                  {activity.metrics?.map((metric, index) => (
                    <span key={index} className="text-lg font-bold">
                      {metric.value}
                      {index < (activity.metrics?.length || 0) - 1 && <span className="mx-2 text-muted-foreground">|</span>}
                    </span>
                  )) || <span className="text-lg font-bold">100 impact points</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE VISION SECTION */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 tracking-tight">The Vision</h2>
          <div className="prose prose-lg max-w-none">
            {activity.visionText?.map((paragraph, index) => (
              <p key={index} className="text-foreground/90 leading-loose text-lg mb-6">
                {paragraph}
              </p>
            )) || (
              <p className="text-foreground/90 leading-loose text-lg mb-6">
                {activity.description}
              </p>
            )}
          </div>
        </div>

        {/* SECTION 4: PHOTO GALLERY */}
        {galleryPhotos && galleryPhotos.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 tracking-tight">Photo Gallery</h2>
            <PhotoGallery photos={galleryPhotos} />
          </div>
        )}

        {/* SECTION 5: IMPACT SECTION */}
        {activity.impactStats && activity.impactStats.length > 0 && (
          <div className="mb-20 py-16 px-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-12 tracking-tight text-center">Impact</h2>
            <ImpactStats stats={activity.impactStats} />
          </div>
        )}

        {/* SECTION 6: TESTIMONIALS */}
        {activity.testimonials && activity.testimonials.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 tracking-tight">What People Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activity.testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 7: SHARE & DOWNLOAD SECTION */}
        <div className="mb-20">
          <div className="bg-card rounded-lg border border-border shadow-sm p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Share This Initiative</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <ShareButtons title={activity.title} />
              {imageUrl && <DownloadButton imageUrl={imageUrl} fileName={`${activity.id}.jpg`} />}
            </div>
          </div>
        </div>

        {/* Related Activities */}
        {relatedActivities.length > 0 && (
          <RelatedActivities activities={relatedActivities} currentActivityId={activity.id} />
        )}
      </main>
    </div>
  );
};

export default ActivityDetail;
