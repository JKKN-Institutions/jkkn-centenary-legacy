import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "./ImageWithFallback";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
}

const ImageGallery = ({ images, className }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    switch (e.key) {
      case "ArrowLeft":
        handlePrevious();
        break;
      case "ArrowRight":
        handleNext();
        break;
      case "Escape":
        setSelectedIndex(null);
        break;
    }
  };

  return (
    <>
      <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-video overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent
          className="max-w-7xl w-full p-0 bg-black/95"
          onKeyDown={(e) => handleKeyDown(e as any)}
        >
          {selectedIndex !== null && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setSelectedIndex(null)}
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="flex items-center justify-center min-h-[70vh] p-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 text-white hover:bg-white/20"
                  onClick={handlePrevious}
                  disabled={images.length <= 1}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <div className="max-w-full max-h-[80vh] flex flex-col items-center">
                  <img
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                  {images[selectedIndex].caption && (
                    <p className="mt-4 text-white text-center">
                      {images[selectedIndex].caption}
                    </p>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 text-white hover:bg-white/20"
                  onClick={handleNext}
                  disabled={images.length <= 1}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </div>

              <div className="px-8 pb-4 text-center text-white text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
