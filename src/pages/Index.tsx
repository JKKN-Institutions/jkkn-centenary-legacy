import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import ActivityCard from "@/components/ActivityCard";
import FilterBar from "@/components/FilterBar";
import StatsOverview from "@/components/StatsOverview";
import ShareButtons from "@/components/ShareButtons";
import SEO from "@/components/SEO";
import ShimmerLoader from "@/components/ShimmerLoader";
import { type Category } from "@/data/all-activities";
import { ActivityStatus } from "@/components/StatusBadge";
import { useActivities } from "@/hooks/useActivities";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus | "all">("all");

  // Fetch activities from Supabase
  const { data: activities, isLoading, error } = useActivities();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SEO />
        <Hero />
        <div className="container px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ShimmerLoader key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <SEO />
        <Hero />
        <div className="container px-4 py-20 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Failed to load activities
            </h2>
            <p className="text-muted-foreground mb-6">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allActivities = activities || [];
  const completed = allActivities.filter(a => a.status === "completed").length;
  const inProgress = allActivities.filter(a => a.status === "in-progress").length;
  const upcoming = allActivities.filter(a => a.status === "upcoming").length;

  const filteredActivities = useMemo(() => {
    return allActivities.filter((activity) => {
      const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.impact.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [allActivities, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Hero />
      
      <a id="main-content" className="sr-only">Main Content</a>
      
      <StatsOverview />
      
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      
      <main className="container px-4 sm:px-6 py-8 sm:py-10 md:py-12" role="main" aria-label="Centenary initiatives">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20" role="status" aria-live="polite">
            <h3 className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-2">
              No activities found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground" role="status" aria-live="polite">
                {filteredActivities.length} {filteredActivities.length === 1 ? 'Activity' : 'Activities'}
              </h2>
              <ShareButtons title="JKKN Centenary" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10" role="list" aria-label="List of centenary initiatives">
              {filteredActivities.map((activity, index) => (
                <ActivityCard key={activity.id} activity={activity} index={index} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <footer className="border-t-2 py-12 sm:py-16 md:py-20 mt-12 sm:mt-16 md:mt-24 relative overflow-hidden" role="contentinfo" aria-label="Footer" style={{
        borderImage: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent) 1",
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--secondary)/0.3) 50%, hsl(var(--primary)/0.05) 100%)",
      }}>
        {/* Decorative Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary-light)) 0%, transparent 70%)" }}
        />
        
        <div className="container px-4 sm:px-6 relative z-10">
          {/* Centenary Timeline */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 sm:mb-6 tracking-tight">
              A Century of Excellence
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-primary via-primary to-primary-dark bg-clip-text text-transparent">
                  1925
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase tracking-wider mt-1 sm:mt-2">Founded</div>
              </div>
              
              <div className="hidden sm:block w-12 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-primary via-primary-light to-primary-glow rounded-full" />
              
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-primary via-primary-light to-primary-glow bg-clip-text text-transparent">
                  100
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase tracking-wider mt-1 sm:mt-2">Years</div>
              </div>
              
              <div className="hidden sm:block w-12 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-primary-glow via-primary-light to-primary rounded-full" />
              
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-primary-dark via-primary to-primary-light bg-clip-text text-transparent">
                  2025
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase tracking-wider mt-1 sm:mt-2">Centenary</div>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="max-w-2xl mx-auto px-2">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm font-bold text-foreground">Centenary Initiatives</span>
                <span className="text-xs sm:text-sm font-bold text-primary">{completed} of 100 Completed</span>
              </div>
              <div className="h-3 sm:h-4 bg-muted rounded-full overflow-hidden" style={{
                boxShadow: "inset 0 2px 8px hsl(var(--foreground) / 0.1)"
              }}>
                <div 
                  className="h-full bg-gradient-to-r from-primary via-primary-light to-primary-glow rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${(completed / 100) * 100}%`,
                    boxShadow: "0 0 20px hsl(var(--primary) / 0.5)"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border border-primary/10">
            <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 italic leading-relaxed mb-3 sm:mb-4">
              "Education is the most powerful weapon which you can use to change the world."
            </blockquote>
            <cite className="text-sm text-muted-foreground font-semibold uppercase tracking-wider not-italic">
              — Inspiring 100 Years of Change
            </cite>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
            {/* Logo Section */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">JK</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2">
                JKKN Centenary
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                100 Years of Educational Excellence
              </p>
            </div>
            
            {/* Mission */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Our Mission</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Celebrating a century of transformative education and community service through 100 meaningful initiatives that create lasting impact.
              </p>
            </div>
            
            {/* Initiatives */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Initiative Stats</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-muted-foreground"><span className="font-bold text-foreground">{completed}</span> Completed</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-info" />
                  <span className="text-muted-foreground"><span className="font-bold text-foreground">{inProgress}</span> In Progress</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neutral" />
                  <span className="text-muted-foreground"><span className="font-bold text-foreground">{upcoming}</span> Upcoming</span>
                </li>
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Stay Connected</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Follow our centenary journey and celebrate with us.
              </p>
              <ShareButtons title="JKKN Centenary: 100 Years, 100 Ways" />
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} J.K.K. Nattraja Educational Institutions. All rights reserved.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground text-center md:text-right">
                <span className="text-primary">1925-2025</span> • Empowering Generations • Building Futures
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
