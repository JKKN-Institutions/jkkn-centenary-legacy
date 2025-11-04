import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Target, TrendingUp } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import ProgressBar from "@/components/ProgressBar";
import ShareButtons from "@/components/ShareButtons";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProgressRing from "@/components/ProgressRing";
import Timeline, { TimelineMilestone } from "@/components/Timeline";
import RelatedActivities from "@/components/RelatedActivities";
import SEO from "@/components/SEO";
import { allActivities } from "@/data/all-activities";
import { Card, CardContent } from "@/components/ui/card";
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

  // Mock milestones for timeline
  const milestones: TimelineMilestone[] = activity.status === "in-progress" 
    ? [
        { date: "Jan 2025", title: "Initiative Launched", status: "completed", description: "Project kickoff and team formation" },
        { date: "Feb 2025", title: "Phase 1 Complete", status: "completed", description: "Initial goals achieved" },
        { date: "Mar 2025", title: "Mid-Point Review", status: "current", description: "Currently in progress" },
        { date: "Apr 2025", title: "Final Phase", status: "upcoming", description: "Completing remaining objectives" },
      ]
    : activity.status === "completed"
    ? [
        { date: "Jan 2025", title: "Initiative Launched", status: "completed" },
        { date: "Feb 2025", title: "Midway Check", status: "completed" },
        { date: "Mar 2025", title: "Final Review", status: "completed" },
        { date: "Apr 2025", title: "Successfully Completed", status: "completed" },
      ]
    : [];

  // Find related activities (same category)
  const relatedActivities = allActivities.filter(
    a => a.category === activity.category && a.id !== activity.id
  );

  // Call to action based on status
  const getCTA = () => {
    switch (activity.status) {
      case "completed":
        return { text: "See Impact Stories", icon: TrendingUp };
      case "in-progress":
        return { text: "Track Progress", icon: Target };
      case "upcoming":
        return { text: "Stay Updated", icon: Calendar };
      default:
        return { text: "Learn More", icon: Target };
    }
  };

  const cta = getCTA();
  const CTAIcon = cta.icon;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${activity.title} - JKKN Centenary`}
        description={activity.impact}
      />
      
      {/* Back Navigation */}
      <div className="container px-6 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group font-semibold"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to All Initiatives
        </Link>
      </div>

      {/* Full-Bleed Hero Section with Image */}
      {imageUrl && (
        <div className="w-full mb-16">
          <div className="w-full aspect-[21/9] overflow-hidden relative" style={{
            boxShadow: "0 20px 60px hsl(var(--foreground) / 0.15)"
          }}>
            <img 
              src={imageUrl} 
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="container px-6 pb-12">
                <div className="max-w-4xl">
                  {activity.category && (
                    <span className="inline-block px-4 py-2 text-sm font-bold text-white bg-white/20 backdrop-blur-sm rounded-full mb-4 uppercase tracking-wider border border-white/30">
                      {activity.category}
                    </span>
                  )}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-none tracking-tighter" style={{
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
            
            <div className="absolute top-8 right-8">
              <StatusBadge status={activity.status} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <main className="container px-6 pb-24" role="main" aria-label="Initiative details">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            {activity.description && (
              <div>
                <h2 className="text-3xl font-extrabold text-foreground mb-6 tracking-tight">About This Initiative</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground/90 leading-loose text-lg">
                    {activity.description}
                  </p>
                </div>
              </div>
            )}

            {/* Key Highlights Callout Box */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent" style={{
              boxShadow: "0 8px 24px hsl(var(--primary) / 0.1)"
            }}>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Impact Highlight</h3>
                    <p className="text-foreground/80 leading-relaxed">
                      This initiative represents our commitment to creating lasting positive change in our community. 
                      Through collaborative efforts and dedicated execution, we're making a measurable difference.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Section */}
            {milestones.length > 0 && (
              <div>
                <h2 className="text-3xl font-extrabold text-foreground mb-8 tracking-tight">Project Timeline</h2>
                <Timeline milestones={milestones} />
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Progress Ring Card */}
            {activity.status === "in-progress" && activity.progress !== undefined && (
              <Card className="overflow-hidden" style={{
                boxShadow: "0 8px 24px hsl(var(--foreground) / 0.08)"
              }}>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-6">Current Progress</h3>
                  <ProgressRing progress={activity.progress} size={160} strokeWidth={12} />
                  <ProgressBar progress={activity.progress} className="mt-6" />
                </CardContent>
              </Card>
            )}

            {/* Stats Cards */}
            <Card style={{
              boxShadow: "0 8px 24px hsl(var(--foreground) / 0.08)"
            }}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Timeline</div>
                    <div className="text-sm font-bold text-foreground">Jan - Apr 2025</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Team Size</div>
                    <div className="text-sm font-bold text-foreground">25+ Members</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Status</div>
                    <div className="text-sm font-bold text-foreground capitalize">{activity.status.replace('-', ' ')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full h-14 text-base font-bold gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                boxShadow: "0 8px 24px hsl(var(--primary) / 0.3)"
              }}
            >
              <CTAIcon className="w-5 h-5" />
              {cta.text}
            </Button>

            {/* Share Card */}
            <Card style={{
              boxShadow: "0 8px 24px hsl(var(--foreground) / 0.08)"
            }}>
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Share This Initiative</h3>
                <ShareButtons title={activity.title} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Activities Section */}
        <RelatedActivities activities={relatedActivities} currentActivityId={activity.id} />
      </main>
    </div>
  );
};

export default ActivityDetail;
