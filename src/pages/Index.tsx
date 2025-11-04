import Hero from "@/components/Hero";
import ActivityCard from "@/components/ActivityCard";
import { activities } from "@/data/activities";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </main>
      
      <footer className="border-t border-border py-12 mt-20">
        <div className="container px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} J.K.K. Nattraja Educational Institutions. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Celebrating 100 years of excellence in education and community service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
