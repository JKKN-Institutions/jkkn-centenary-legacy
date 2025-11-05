import { useState } from "react";
import Lightbox from "./Lightbox";

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

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
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
