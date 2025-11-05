import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = "JKKN Centenary: 100 Years, 100 Ways", 
  description = "Celebrating 100 years of educational excellence and transformative community service through 100 meaningful initiatives at J.K.K. Nattraja Educational Institutions.",
  image = "/og-image.jpg",
  url = "https://jkkn-centenary.lovable.app"
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const metaTags: Record<string, string> = {
      "description": description,
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "og:url": url,
      "og:type": "website",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let element = document.querySelector(`meta[name="${name}"]`) || 
                    document.querySelector(`meta[property="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        if (name.startsWith("og:") || name.startsWith("twitter:")) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    });
  }, [title, description, image, url]);

  return null;
};

export default SEO;
