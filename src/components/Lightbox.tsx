import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Photo } from "./PhotoGallery";

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox = ({ photos, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
    }
  }, [currentIndex, isOpen]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  };

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-black/98 border border-white/10 backdrop-blur-xl animate-fade-in-scale">
        <div className="relative w-full h-full flex flex-col">
          {/* Close Button - Enhanced */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12 backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 hover:scale-110 hover:rotate-90"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation Buttons - Enhanced */}
          {photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-14 h-14 backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 hover:scale-110 hover:-translate-x-1"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-14 h-14 backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 hover:scale-110 hover:translate-x-1"
                onClick={handleNext}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* Image Container - Enhanced with Loading State */}
          <div className="flex-1 flex items-center justify-center p-12">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Caption and Counter - Enhanced */}
          <div className="bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-lg p-8 text-white border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl mb-3 font-light leading-relaxed">{currentPhoto.caption}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/50 font-medium">
                  Photo {currentIndex + 1} of {photos.length}
                </p>
                {photos.length > 1 && (
                  <div className="flex gap-1.5">
                    {photos.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentIndex 
                            ? 'w-8 bg-primary' 
                            : 'w-1.5 bg-white/20 hover:bg-white/40 cursor-pointer'
                        }`}
                        onClick={() => onNavigate(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Lightbox;
