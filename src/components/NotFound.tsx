import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8 relative">
          <div className="text-[12rem] md:text-[16rem] font-extrabold leading-none bg-gradient-to-br from-primary via-primary-light to-primary-glow bg-clip-text text-transparent select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-20 h-20 text-primary/20 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          Initiative Not Found
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          The initiative you're looking for doesn't exist or may have been moved. Let's get you back to exploring our centenary activities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="gap-2 font-bold shadow-lg hover:shadow-xl transition-all">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline" className="gap-2 font-bold border-2">
              <Search className="w-5 h-5" />
              Browse Initiatives
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
