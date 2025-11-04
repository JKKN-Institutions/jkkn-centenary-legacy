import { useState } from "react";
import { z } from "zod";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
});

interface NewsletterFormProps {
  className?: string;
  variant?: "default" | "compact";
}

const NewsletterForm = ({ className, variant = "default" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const result = newsletterSchema.safeParse({ email });
    
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: result.error.errors[0].message,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual backend integration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      setEmail("");
      
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates about our centenary initiatives.",
      });

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "compact") {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn("flex gap-2 max-w-md", className)}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || isSuccess}
          className="flex-1"
          aria-label="Email address for newsletter"
        />
        <Button
          type="submit"
          disabled={isLoading || isSuccess}
          size="icon"
          className="shrink-0"
        >
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4 max-w-md", className)}
    >
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || isSuccess}
          className="pl-10"
          aria-label="Email address for newsletter"
        />
      </div>
      
      <Button
        type="submit"
        disabled={isLoading || isSuccess}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          "Subscribing..."
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Subscribed!
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Subscribe to Updates
          </>
        )}
      </Button>
    </form>
  );
};

export default NewsletterForm;
