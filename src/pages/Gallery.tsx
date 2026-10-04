import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import React from "react";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

const Gallery = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Gallery - Amogh Van/Bus Services Features"
        description="Explore the advanced features, safety implementations, and modern vehicle interiors of Amogh School Transportation Services."
        keywords="school bus gallery, amogh van services features, school bus safety cameras, school transport interior"
        canonicalUrl="https://amoghvanservices.in/gallery"
      />

      {/* Reused Navigation Bar */}
      <SiteNav />

      {/* Main Content */}
      <main className="flex-grow pt-12 pb-20">
        <div className="section-container">
           {/* Header Section */}
           <div className="text-center space-y-4 mb-12">
             <Badge className="bg-school-blue-100 text-school-blue-700">Vehicle Features</Badge>
             <h1 className="text-4xl md:text-5xl font-bold font-manrope text-gray-900 tracking-tight">
               Our Fleet Gallery
             </h1>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
               Discover the advanced safety systems, modern vehicle design, and comfortable interiors that make Amogh Van Services the trusted choice in Mumbai.
             </p>
           </div>
           
           <GalleryGrid />
        </div>
      </main>

      {/* Reused Footer Section Simplified */}
      <SiteFooter />
    </div>
  );
};

export default Gallery;
