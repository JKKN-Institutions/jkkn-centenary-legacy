import { useEffect } from "react";

export interface OrganizationSchema {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  description?: string;
  foundingDate?: string;
  contactPoint?: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface EventSchema {
  "@type": "Event";
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    "@type": "Place";
    name: string;
    address?: string;
  };
  organizer?: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
}

export interface BreadcrumbSchema {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

type SchemaType = OrganizationSchema | EventSchema | BreadcrumbSchema | Record<string, any>;

interface StructuredDataProps {
  data: SchemaType | SchemaType[];
}

const StructuredData = ({ data }: StructuredDataProps) => {
  useEffect(() => {
    const schemas = Array.isArray(data) ? data : [data];
    
    schemas.forEach((schema, index) => {
      const scriptId = `structured-data-${index}`;
      
      // Remove existing script if it exists
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }

      // Create new script element
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        ...schema,
      });
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      const schemas = Array.isArray(data) ? data : [data];
      schemas.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`);
        if (script) {
          script.remove();
        }
      });
    };
  }, [data]);

  return null;
};

export default StructuredData;
