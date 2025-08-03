import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  Shield,
  Clock,
  MapPin,
  Star,
  Phone,
  Mail,
  CheckCircle,
  Users,
  Calendar,
  Navigation,
  Heart,
  Award,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-school-yellow-500 p-2 rounded-lg">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 font-manrope">
                Amogh Van/Bus Services
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Services
              </a>
              <Link
                to="/about"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
                onClick={() => console.log('Navigating to About')}
              >
                About
              </Link>
              <Link
                to="/blog"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
                onClick={() => console.log('Navigating to Blog')}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
                onClick={() => console.log('Navigating to Contact')}
              >
                Contact
              </Link>
              <Link
                to="/register"
                className="btn-primary"
                onClick={() => console.log('Navigating to Register')}
              >
                Register Student
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#services"
                className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 bg-school-yellow-500 text-white rounded-lg font-semibold mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register Student
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-school-yellow-50 to-school-blue-50 py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-school-green-100 text-school-green-700 hover:bg-school-green-200">
                  <Shield className="w-4 h-4 mr-2" />
                  Trusted Since 2010
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-manrope">
                  Safe & Reliable
                  <span className="text-school-yellow-500 block">
                    School Transportation
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Amogh Van/Bus Services provides secure, comfortable, and
                  punctual transportation services for students across Mumbai.
                  Your child's safety is our top priority.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary flex items-center justify-center"
                >
                  Register Your Child
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="tel:9870525637">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-school-blue-500 text-school-blue-600 hover:bg-school-blue-50"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </Button>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-school-blue-600">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-school-blue-600">
                    15+
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-school-blue-600">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Safety Record</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative animate-float">
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
                  <div className="aspect-video bg-gradient-to-br from-school-yellow-400 to-school-yellow-600 rounded-xl flex items-center justify-center">
                    <Bus className="h-16 w-16 text-white" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 right-8 bg-school-green-500 text-white p-3 rounded-full animate-pulse">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-school-blue-100 text-school-blue-700">
              Our Services
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 font-manrope">
              Transportation Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive transportation services designed to meet all your
              educational institution's needs.
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

      {/* Safety Section */}
      <section id="safety" className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-school-red-100 text-school-red-700">
                  Safety First
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 font-manrope">
                  Your Child's Safety is Our Priority
                </h2>
                <p className="text-lg text-gray-600">
                  We maintain the highest safety standards with regular vehicle
                  inspections, background-checked drivers, and real-time
                  monitoring systems.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Shield className="h-8 w-8 text-school-green-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Licensed Drivers
                  </h3>
                  <p className="text-sm text-gray-600">
                    All drivers are professionally licensed and trained
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Navigation className="h-8 w-8 text-school-blue-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    GPS Tracking
                  </h3>
                  <p className="text-sm text-gray-600">
                    Real-time location monitoring for peace of mind
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Clock className="h-8 w-8 text-school-yellow-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    On-Time Service
                  </h3>
                  <p className="text-sm text-gray-600">
                    Punctual pickups and drop-offs every day
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Award className="h-8 w-8 text-school-red-500 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Certified Vehicles
                  </h3>
                  <p className="text-sm text-gray-600">
                    Regular maintenance and safety inspections
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-l-4 border-school-green-500 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-school-green-100 p-2 rounded-full">
                      <CheckCircle className="h-6 w-6 text-school-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Background Checks
                      </h4>
                      <p className="text-gray-600 mt-1">
                        Comprehensive background verification for all staff
                        members
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-school-blue-500 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-school-blue-100 p-2 rounded-full">
                      <Heart className="h-6 w-6 text-school-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        First Aid Training
                      </h4>
                      <p className="text-gray-600 mt-1">
                        All drivers trained in basic first aid and emergency
                        procedures
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-school-yellow-500 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-school-yellow-100 p-2 rounded-full">
                      <MapPin className="h-6 w-6 text-school-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Route Optimization
                      </h4>
                      <p className="text-gray-600 mt-1">
                        Efficient routes planned for minimum travel time and
                        maximum safety
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-school-yellow-100 text-school-yellow-700">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 font-manrope">
              What Parents Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Mr. Rajesh and his team at Amogh Van/Bus Services have been
                  incredible. My daughter feels safe and I have peace of mind
                  knowing she's in good hands."
                </p>
                <div className="font-semibold text-gray-900">Priya Sharma</div>
                <div className="text-sm text-gray-500">
                  Parent, Elementary School
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Always on time, professional drivers, and excellent
                  communication. Amogh Van/Bus Services is highly recommended!"
                </p>
                <div className="font-semibold text-gray-900">Suresh Patel</div>
                <div className="text-sm text-gray-500">Parent, High School</div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The GPS tracking feature is amazing. I can see exactly where
                  the bus is and when it will arrive."
                </p>
                <div className="font-semibold text-gray-900">Kavita Desai</div>
                <div className="text-sm text-gray-500">
                  Parent, Middle School
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="section-container">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white font-manrope">
              Ready to Secure Safe Transportation for Your Child?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join hundreds of families who trust Amogh Van/Bus Services for
              their children's daily transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-school-yellow-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Register Your Student
              </Link>
              <a href="tel:9870525637">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-school-blue-600"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Get Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-school-yellow-500 p-2 rounded-lg">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold font-manrope">
                  Amogh Van/Bus Services
                </span>
              </div>
              <p className="text-gray-400">
                Founded by Rajesh Kumar J Kharwar. Providing safe, reliable
                school transportation services in Mumbai and surrounding areas
                since 2010.
              </p>
              <div className="flex space-x-4">
                <a
                  href="tel:9870525637"
                  className="bg-gray-800 p-2 rounded-lg hover:bg-school-yellow-500 transition-colors cursor-pointer"
                >
                  <Phone className="h-5 w-5" />
                </a>
                <a
                  href="mailto:info@amoghservices.com"
                  className="bg-gray-800 p-2 rounded-lg hover:bg-school-yellow-500 transition-colors cursor-pointer"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Daily School Routes</li>
                <li>Field Trips</li>
                <li>Private Transportation</li>
                <li>Special Needs Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Safety Standards</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3" />
                  9870525637 / 9321025627
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3" />
                  info@amoghservices.com
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 mt-1" />
                  Prabhadevi, Dadar West
                  <br />
                  Mumbai, Maharashtra
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Amogh Van/Bus Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
