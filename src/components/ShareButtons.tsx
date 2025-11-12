import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const shareUrl = url || window.location.href;
  const shareText = `Check out ${title} - JKKN Centenary: 100 Years, 100 Ways`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      "_blank"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="glass" 
          size="lg" 
          className="gap-2 font-bold group"
        >
          <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          Share This Story
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2 glass-strong border-border/50 shadow-2xl"
      >
        <DropdownMenuItem 
          onClick={shareOnTwitter} 
          className="gap-3 p-3 rounded-lg cursor-pointer hover:bg-info/10 hover:text-info transition-all duration-200 group"
        >
          <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-semibold">Share on Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={shareOnFacebook} 
          className="gap-3 p-3 rounded-lg cursor-pointer hover:bg-info/10 hover:text-info transition-all duration-200 group"
        >
          <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-semibold">Share on Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={shareOnLinkedIn}
          className="gap-3 p-3 rounded-lg cursor-pointer hover:bg-info/10 hover:text-info transition-all duration-200 group"
        >
          <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-semibold">Share on LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={shareOnWhatsApp}
          className="gap-3 p-3 rounded-lg cursor-pointer hover:bg-success/10 hover:text-success transition-all duration-200 group"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-semibold">Share on WhatsApp</span>
        </DropdownMenuItem>
        <div className="h-px bg-border/50 my-2" />
        <DropdownMenuItem
          onClick={copyToClipboard}
          className="gap-3 p-3 rounded-lg cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
        >
          <LinkIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-semibold">Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButtons;
