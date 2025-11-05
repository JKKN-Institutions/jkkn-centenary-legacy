import { useState, useRef } from "react";
import Lightbox from "./Lightbox";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export interface Photo {
  url: string;
  caption: string;
}

export interface PhotoWithKey {
  imageKey: string;
  caption: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`group cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 hover:scale-[1.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`,
            }}
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-lg group-hover:shadow-2xl transition-shadow duration-500 rounded-2xl border border-border/50">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
              />
              {/* Multi-layer Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-500 rounded-2xl" />
              
              {/* Expand Icon on Hover */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed font-medium px-1">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>

      <Lightbox
        photos={photos}
        currentIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentPhotoIndex}
      />
    </>
  );
};

export default PhotoGallery;
