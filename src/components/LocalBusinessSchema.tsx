const LocalBusinessSchema = () => {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://amoghvanservices.com/#localbusiness",
    "name": "Amogh Van/Bus Services",
    "alternateName": "Amogh School Transportation",
    "description": "Professional school transportation services in Mumbai since 2010. Safe, reliable van and bus services for students with GPS tracking and trained drivers.",
    "url": "https://amoghvanservices.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://amoghvanservices.com/logo.jpg",
      "width": 400,
      "height": 400
    },
    "image": [
      "https://amoghvanservices.com/bus-service-1.jpg",
      "https://amoghvanservices.com/van-service-1.jpg",
      "https://amoghvanservices.com/safety-features.jpg"
    ],
    "telephone": "+91-9870525637",
    "email": "kharwaramog02@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Prabhadevi",
      "addressLocality": "Dadar West",
      "addressRegion": "Maharashtra",
      "postalCode": "400028",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0144,
      "longitude": 72.8259
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Mumbai",
        "sameAs": "https://en.wikipedia.org/wiki/Mumbai"
      },
      {
        "@type": "Place",
        "name": "Prabhadevi",
        "containedInPlace": {
          "@type": "City",
          "name": "Mumbai"
        }
      },
      {
        "@type": "Place",
        "name": "Dadar West",
        "containedInPlace": {
          "@type": "City",
          "name": "Mumbai"
        }
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Rajesh Kumar J Kharwar",
      "jobTitle": "Founder & Managing Director"
    },
    "foundingDate": "2010",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 15
    },
    "knowsAbout": [
      "School Transportation",
      "Student Safety",
      "GPS Tracking",
      "Reliable Service",
      "Mumbai School Transport"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Daily School Van Service",
          "description": "Regular pickup and drop-off van service for school students",
          "provider": {
            "@type": "Organization",
            "name": "Amogh Van/Bus Services"
          }
        },
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "areaServed": {
          "@type": "City",
          "name": "Mumbai"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "School Bus Service",
          "description": "Comfortable and safe bus transportation for school students",
          "provider": {
            "@type": "Organization",
            "name": "Amogh Van/Bus Services"
          }
        },
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "areaServed": {
          "@type": "City",
          "name": "Mumbai"
        }
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "07:00",
        "closes": "19:00"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9870525637",
        "contactType": "customer service",
        "areaServed": "Mumbai",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9321025627",
        "contactType": "customer service",
        "areaServed": "Mumbai",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      }
    ],
    "sameAs": [
      "https://kharwaramog02-swayq.wordpress.com"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Parent"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent service! My child feels safe and the drivers are very professional."
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "School Transportation Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Van Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AC Van Service",
                "description": "Air-conditioned van service for comfortable travel"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Non-AC Van Service",
                "description": "Standard van service with windows for ventilation"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Bus Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "School Bus Service",
                "description": "Large capacity bus service for schools"
              }
            }
          ]
        }
      ]
    },
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://amoghvanservices.com/register",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Student Registration"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  );
};

export default LocalBusinessSchema;
