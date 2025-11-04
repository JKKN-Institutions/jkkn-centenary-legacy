import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackGradient?: string;
  fallbackIcon?: boolean;
}

const ImageWithFallback = ({
  src,
  alt = "Image",
  className,
  fallbackGradient,
  fallbackIcon = true,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted",
          className
        )}
        style={fallbackGradient ? { background: fallbackGradient } : undefined}
      >
        {fallbackIcon && (
          <ImageOff className="w-8 h-8 text-muted-foreground opacity-50" />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;
