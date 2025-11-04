import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import ActivityCard from "@/components/ActivityCard";
import FilterBar from "@/components/FilterBar";
import StatsOverview from "@/components/StatsOverview";
import ShareButtons from "@/components/ShareButtons";
import { allActivities, type Category } from "@/data/all-activities";
import { ActivityStatus } from "@/components/StatusBadge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus | "all">("all");

  const filteredActivities = useMemo(() => {
    return allActivities.filter((activity) => {
      const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.impact.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <StatsOverview />
      
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      
      <main className="container px-6 py-12">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
              No activities found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                {filteredActivities.length} {filteredActivities.length === 1 ? 'Activity' : 'Activities'}
              </h2>
              <ShareButtons title="JKKN Centenary" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <footer className="border-t border-border py-16 mt-20 bg-secondary/30">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                JKKN Centenary
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Celebrating 100 years of educational excellence and transformative community service through 100 meaningful initiatives.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About JKKN
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    History & Heritage
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Get Involved
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Connect With Us
              </h3>
              <p className="text-muted-foreground mb-4">
                Follow our journey and stay updated on centenary initiatives.
              </p>
              <div className="flex gap-3">
                <ShareButtons title="JKKN Centenary" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground mb-2">
              © {new Date().getFullYear()} J.K.K. Nattraja Educational Institutions. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              100 Years of Excellence • 1925-2025 • Empowering Generations
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
