import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

const SEO = ({ 
  title = "JKKN Centenary: 100 Years, 100 Ways", 
  description = "Celebrating 100 years of educational excellence and transformative community service through 100 meaningful initiatives at J.K.K. Nattraja Educational Institutions.",
  image = "/og-image.jpg",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  keywords = ["JKKN", "centenary", "education", "community service", "100 initiatives"]
}: SEOProps) => {
  const location = useLocation();
  const canonicalUrl = url || `https://jkkn-centenary.lovable.app${location.pathname}`;
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const metaTags: Record<string, string> = {
      "description": description,
      "keywords": keywords.join(", "),
      "author": author || "J.K.K. Nattraja Educational Institutions",
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "og:url": canonicalUrl,
      "og:type": type,
      "og:site_name": "JKKN Centenary",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
      ...(publishedTime && { "article:published_time": publishedTime }),
      ...(modifiedTime && { "article:modified_time": modifiedTime }),
    };

    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

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
  }, [title, description, image, canonicalUrl, type, publishedTime, modifiedTime, author, keywords]);

  return null;
};

export default SEO;
