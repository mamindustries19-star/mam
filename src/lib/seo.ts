import { SITE } from "./site";

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": SITE.name,
  "image": "https://www.mamindustries.in/favicon.png",
  "logo": "https://www.mamindustries.in/favicon.png",
  "@id": "https://www.mamindustries.in/#organization",
  "url": "https://www.mamindustries.in",
  "telephone": SITE.phone,
  "email": SITE.email,
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": `${SITE.address.line1}, ${SITE.address.line2}`,
    "addressLocality": SITE.address.city,
    "addressRegion": SITE.address.state,
    "postalCode": SITE.address.pincode,
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.8944419,
    "longitude": 77.5693295
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.facebook.com/mamindustries",
    "https://www.linkedin.com/company/mam-industries",
    "https://www.instagram.com/mamindustries"
  ]
});

export const getServiceSchema = (title: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": title,
  "provider": {
    "@type": "LocalBusiness",
    "name": SITE.name
  },
  "description": description,
  "areaServed": "Bengaluru, Karnataka, India",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Metal Fabrication Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": title
        }
      }
    ]
  }
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://www.mamindustries.in${item.url}`
  }))
});
