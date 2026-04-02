import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bus, Calendar, Users, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SEO from "@/components/SEO";
import SeoKeywordsList from "@/components/SeoKeywordsList";

const Services = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <SEO
        title="Our Services - Amogh Van/Bus Services"
        description="Explore the comprehensive school van and bus transportation services provided by Amogh in Mumbai. Daily routes, field trips, and private transportation."
        keywords="school bus services Mumbai, field trip transport, private student transport, daily school transport routes"
        canonicalUrl="https://amoghvanservices.in/services"
      />

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Amogh Van/Bus Services Logo" className="h-10 w-10 object-contain rounded-lg" />
              <span className="text-xl font-company-name text-gray-900">
                Amogh Van/Bus Services
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-school-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-school-blue-600 transition-colors">
                About
              </Link>
              <Link to="/services" className="text-school-blue-600 font-semibold">
                Services
              </Link>
              <Link to="/blog" className="text-gray-600 hover:text-school-blue-600 transition-colors">
                Blog
              </Link>
              <Link to="/gallery" className="text-gray-600 hover:text-school-blue-600 transition-colors">
                Gallery
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-school-blue-600 transition-colors">
                Contact
              </Link>
              <Link to="/register" className="btn-primary">
                Register Student
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/services" className="block px-3 py-2 text-school-blue-600 bg-school-blue-50 font-medium rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              <Link to="/blog" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <Link to="/gallery" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/register" className="block px-3 py-2 bg-school-yellow-500 text-white rounded-lg font-semibold mt-2" onClick={() => setIsMobileMenuOpen(false)}>Register Student</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-school-yellow-50 to-school-blue-50">
          <div className="section-container">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge className="bg-school-blue-100 text-school-blue-700">
                Our Capabilities
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 font-manrope">
                Comprehensive Transportation Solutions
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Whether you need daily school commutes, reliable field trip transport, or specialized private vehicles, Amogh Van/Bus Services has the perfect solution for your family.
              </p>
            </div>
          </div>
        </section>

        {/* Services Content Grid (Copied from Index.tsx) */}
        <section className="py-20 bg-white shadow-inner">
          <div className="section-container">
            <div className="text-center space-y-4 mb-16">
              <Badge className="bg-school-blue-100 text-school-blue-700">
                Primary Offerings
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 font-manrope whitespace-pre-line">
                Trusted school pickup and drop service{"\n"}
                <span className="text-school-blue-600 text-2xl mt-2 block">Premium student transport service</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive school bus and van transportation services designed
                to meet all your student transportation needs in Mumbai,
                Prabhadevi, and Dadar West areas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-hover border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="bg-school-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bus className="h-8 w-8 text-school-yellow-600" />
                  </div>
                  <CardTitle className="text-xl font-manrope">
                    Daily School Routes
                  </CardTitle>
                  <CardDescription>
                    Regular pickup and drop-off services for daily school commutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      Door-to-door service
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      Fixed schedule
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      GPS tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-hover border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="bg-school-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-school-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-manrope">
                    Field Trips
                  </CardTitle>
                  <CardDescription>
                    Safe and reliable transportation for educational excursions
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      Experienced drivers
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      Flexible scheduling
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      Group discounts
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-hover border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="bg-school-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-school-green-600" />
                  </div>
                  <CardTitle className="text-xl font-manrope">
                    Private Transportation
                  </CardTitle>
                  <CardDescription>
                    Customized transportation solutions for special needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      Wheelchair accessible
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      Trained attendants
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-school-green-500 mr-2" />
                      Medical support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* SEO Keywords */}
      <SeoKeywordsList />

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="section-container text-center text-gray-400">
          <p>&copy; 2025 Amogh Van/Bus Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
