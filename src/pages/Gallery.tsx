import React, { useState } from "react";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

const Gallery = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO
        title="Gallery - Amogh Van/Bus Services Features"
        description="Explore the advanced features, safety implementations, and modern vehicle interiors of Amogh School Transportation Services."
        keywords="school bus gallery, amogh van services features, school bus safety cameras, school transport interior"
        canonicalUrl="https://amoghvanservices.in/gallery"
      />

      {/* Reused Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Amogh Van/Bus Services Logo" className="h-10 w-10 object-contain rounded-lg" />
              <Link to="/" className="text-xl font-company-name text-gray-900">
                Amogh Van/Bus Services
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/#services" className="text-gray-600 hover:text-school-blue-600 transition-colors">Services</Link>
              <Link to="/about" className="text-gray-600 hover:text-school-blue-600 transition-colors">About</Link>
              <Link to="/blog" className="text-gray-600 hover:text-school-blue-600 transition-colors">Blog</Link>
              <Link to="/gallery" className="text-school-yellow-600 font-medium transition-colors">Gallery</Link>
              <Link to="/contact" className="text-gray-600 hover:text-school-blue-600 transition-colors">Contact</Link>
              <Link to="/register" className="btn-primary">Register Student</Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/#services" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <Link to="/gallery" className="block px-3 py-2 text-school-yellow-600 bg-school-yellow-50 font-medium rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/register" className="block px-3 py-2 bg-school-yellow-500 text-white rounded-lg font-semibold mt-2" onClick={() => setIsMobileMenuOpen(false)}>Register Student</Link>
            </div>
          </div>
        )}
      </nav>

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
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="section-container text-center text-gray-400">
          <p>&copy; 2025 Amogh Van/Bus Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
