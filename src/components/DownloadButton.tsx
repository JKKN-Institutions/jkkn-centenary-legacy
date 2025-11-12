import { Download, Image, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface GalleryPhoto {
  url: string;
  caption: string;
}

interface DownloadButtonProps {
  imageUrl?: string;
  fileName?: string;
  galleryPhotos?: GalleryPhoto[];
  activityTitle?: string;
}

const DownloadButton = ({
  imageUrl,
  fileName = "activity-photo.jpg",
  galleryPhotos = [],
  activityTitle = "activity"
}: DownloadButtonProps) => {

  const downloadSingleImage = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      throw error;
    }
  };

  const handleDownloadHero = async () => {
    if (!imageUrl) {
      toast.error("No image available to download");
      return;
    }

    try {
      await downloadSingleImage(imageUrl, fileName);
      toast.success("Hero image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download hero image");
    }
  };

  const handleDownloadAll = async () => {
    const allImages: Array<{url: string, name: string}> = [];

    // Add hero image
    if (imageUrl) {
      allImages.push({ url: imageUrl, name: fileName });
    }

    // Add gallery images
    galleryPhotos.forEach((photo, index) => {
      const extension = photo.url.split('.').pop()?.split('?')[0] || 'jpg';
      const name = `${activityTitle.toLowerCase().replace(/\s+/g, '-')}-gallery-${index + 1}.${extension}`;
      allImages.push({ url: photo.url, name });
    });

    if (allImages.length === 0) {
      toast.error("No images available to download");
      return;
    }

    toast.info(`Downloading ${allImages.length} images...`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < allImages.length; i++) {
      try {
        await downloadSingleImage(allImages[i].url, allImages[i].name);
        successCount++;
        // Add small delay between downloads to avoid browser blocking
        if (i < allImages.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        failCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`Successfully downloaded ${successCount} of ${allImages.length} images!`);
    }
    if (failCount > 0) {
      toast.error(`Failed to download ${failCount} images`);
    }
  };

  const totalImages = (imageUrl ? 1 : 0) + galleryPhotos.length;

  // If only hero image, show simple button
  if (totalImages <= 1) {
    return (
      <Button
        onClick={handleDownloadHero}
        variant="glass"
        size="lg"
        className="gap-2 font-bold group"
      >
        <Download className="w-5 h-5 group-hover:animate-bounce" />
        Download Photo
      </Button>
    );
  }

  // If multiple images, show dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="glass"
          size="lg"
          className="gap-2 font-bold group"
        >
          <Download className="w-5 h-5 group-hover:animate-bounce" />
          Download Photos
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 p-2 glass-strong border-border/50 shadow-2xl"
      >
        {imageUrl && (
          <DropdownMenuItem
            onClick={handleDownloadHero}
            className="gap-3 p-3 rounded-lg cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
          >
            <Image className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-semibold">Download Hero Image</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={handleDownloadAll}
          className="gap-3 p-3 rounded-lg cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
        >
          <Images className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <div className="flex flex-col">
            <span className="font-semibold">Download All Images</span>
            <span className="text-xs text-muted-foreground">{totalImages} photos</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadButton;
