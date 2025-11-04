import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageOptimizedProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

const ImageOptimized = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className,
  ...props
}: ImageOptimizedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc) return "";
    // For now, just return the base src - in production you'd generate multiple sizes
    return `${baseSrc} 1x, ${baseSrc} 2x`;
  };

  useEffect(() => {
    if (priority) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <picture>
      {/* WebP format with srcset for modern browsers */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(src.replace(/\.(jpg|jpeg|png)$/i, ".webp"))}
        sizes={sizes}
      />
      
      {/* Original format fallback */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </picture>
  );
};

export default ImageOptimized;
