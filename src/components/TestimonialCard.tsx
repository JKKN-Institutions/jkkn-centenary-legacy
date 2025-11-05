import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="h-full hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 bg-gradient-to-br from-card via-card to-card/95 border-border/50 hover:border-primary/30 relative overflow-hidden">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-50" />
      
      <CardContent className="p-8 md:p-10 relative z-10">
        {/* Quote Icon - Enhanced */}
        <div className="relative mb-6">
          <Quote className="w-14 h-14 text-primary/20 group-hover:text-primary/30 transition-colors duration-500" />
          <div className="absolute -top-1 -left-1 w-14 h-14 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
        </div>
        
        {/* Quote Text - Enhanced Typography */}
        <p className="text-lg md:text-xl italic text-foreground/85 leading-relaxed mb-8 font-light">
          "{testimonial.quote}"
        </p>
        
        {/* Author Info - Enhanced */}
        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          <Avatar className="w-14 h-14 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-500 group-hover:scale-110">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-extrabold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-extrabold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
              {testimonial.name}
            </p>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
