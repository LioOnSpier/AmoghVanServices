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
  Target,
  Eye,
  Handshake,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-school-yellow-500 p-2 rounded-lg">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 font-manrope">
                Amogh Van/Bus Services
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link to="/about" className="text-school-blue-600 font-semibold">
                About
              </Link>
              <Link
                to="/blog"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Contact
              </Link>
              <Link to="/register" className="btn-primary">
                Register Student
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-school-yellow-50 to-school-blue-50">
        <div className="section-container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-school-blue-100 text-school-blue-700">
              About Us
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 font-manrope">
              Our Story & Mission
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded in 2010 by Rajesh Kumar J Kharwar, Amogh Van/Bus Services
              was born from a simple yet powerful vision: to provide the safest,
              most reliable transportation for school children across Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900 font-manrope">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 2010 by Rajesh Kumar J Kharwar, Amogh Van/Bus
                  Services was born from a simple yet powerful vision: to
                  provide the safest, most reliable transportation for school
                  children across Mumbai.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  What started as a small operation with just one vehicle has
                  grown into Mumbai's trusted transportation partner, serving
                  hundreds of families across Prabhadevi, Dadar West, and
                  surrounding areas.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900 font-manrope">
                  Our Mission
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To provide the safest, most reliable transportation service
                  for students, giving parents peace of mind and schools a
                  trusted partner in student care.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900 font-manrope">
                  Our Values
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-school-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Safety:
                      </span>
                      <span className="text-gray-600 ml-1">
                        The wellbeing of every child is our highest priority
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-school-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Reliability:
                      </span>
                      <span className="text-gray-600 ml-1">
                        Consistent, punctual service you can count on every day
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-school-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Trust:
                      </span>
                      <span className="text-gray-600 ml-1">
                        Building lasting relationships with families and schools
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-school-yellow-100 to-school-blue-100 rounded-2xl shadow-2xl p-12 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="bg-school-yellow-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                    <Bus className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-manrope">
                    Trusted Transportation
                  </h3>
                  <p className="text-gray-600">
                    Serving Mumbai families with dedication
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-school-yellow-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-school-green-100 text-school-green-700">
              Why Choose Us?
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 font-manrope">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're more than just transportation providers. We're an extension
              of your child's educational journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-school-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-school-yellow-600" />
                </div>
                <CardTitle className="text-xl font-manrope">
                  15+ Years of Experience
                </CardTitle>
                <CardDescription>
                  Serving Mumbai's schools and families since 2010
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Over a decade of trusted service with hundreds of satisfied
                  families and partnerships with leading schools across Mumbai.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-school-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-school-blue-600" />
                </div>
                <CardTitle className="text-xl font-manrope">
                  Dedicated Team
                </CardTitle>
                <CardDescription>
                  Professional drivers and staff committed to child safety
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Our team is carefully selected, thoroughly trained, and
                  genuinely cares about providing the best possible experience
                  for your child.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-school-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-school-green-600" />
                </div>
                <CardTitle className="text-xl font-manrope">
                  Family-Oriented Service
                </CardTitle>
                <CardDescription>
                  We treat every child as if they were our own
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Building personal relationships with families and
                  understanding each child's unique needs is what sets us apart.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-school-yellow-100 text-school-yellow-700">
                  Our Commitment
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 font-manrope">
                  Beyond Transportation
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Amogh Van/Bus Services, we're more than transportation
                  providers. We're an extension of your child's educational
                  journey, committed to creating a safe, nurturing environment
                  from home to school and back again.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  <strong>Join our family today.</strong> Experience the peace
                  of mind that comes with knowing your child is in the best
                  possible hands.
                </p>
              </div>

              <div className="bg-school-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-school-blue-600" />
                  Our Promise to You
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-school-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Punctual, reliable service every single day
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-school-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      The highest safety standards with regular vehicle
                      inspections
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-school-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Professional, caring staff who treat your child with
                      respect
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-school-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Open communication and transparency with parents
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-l-4 border-school-yellow-500 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-school-yellow-100 p-3 rounded-full">
                      <Eye className="h-6 w-6 text-school-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">
                        Our Vision
                      </h4>
                      <p className="text-gray-600">
                        To be Mumbai's most trusted and preferred school
                        transportation service, setting the standard for safety
                        and reliability in student transport.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-school-blue-500 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-school-blue-100 p-3 rounded-full">
                      <Handshake className="h-6 w-6 text-school-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">
                        Community Partnership
                      </h4>
                      <p className="text-gray-600">
                        Working closely with schools, parents, and local
                        communities to create the safest possible environment
                        for children's daily commute.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-school-green-500 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-school-green-100 p-3 rounded-full">
                      <Award className="h-6 w-6 text-school-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">
                        Continuous Improvement
                      </h4>
                      <p className="text-gray-600">
                        Constantly investing in better vehicles, training, and
                        technology to enhance the safety and comfort of every
                        journey.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-school-yellow-500 to-school-blue-500">
        <div className="section-container">
          <div className="text-center text-white space-y-8">
            <h2 className="text-4xl font-bold font-manrope">
              Trusted by Mumbai Families
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-lg opacity-90">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">School Partnerships</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-lg opacity-90">Safety Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-school-blue-100 text-school-blue-700">
              Get In Touch
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 font-manrope">
              Contact Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our services? We're here to help you find the
              perfect transportation solution for your child.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg border-0">
              <CardContent className="p-8">
                <div className="bg-school-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-school-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Call Us
                </h3>
                <div className="space-y-2">
                  <a
                    href="tel:9870525637"
                    className="block text-school-blue-600 hover:underline font-semibold"
                  >
                    9870525637
                  </a>
                  <a
                    href="tel:9321025627"
                    className="block text-school-blue-600 hover:underline font-semibold"
                  >
                    9321025627
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0">
              <CardContent className="p-8">
                <div className="bg-school-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-school-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Email Us
                </h3>
                <a
                  href="mailto:kharwaramog02@gmail.com"
                  className="text-school-blue-600 hover:underline font-semibold"
                >
                  kharwaramog02@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0">
              <CardContent className="p-8">
                <div className="bg-school-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-school-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Visit Us
                </h3>
                <p className="text-gray-600">
                  Prabhadevi, Dadar West
                  <br />
                  Mumbai, Maharashtra
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold text-white font-manrope mb-6">
            Ready to Join the Amogh Family?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the peace of mind that comes with Mumbai's most trusted
            school transportation service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-school-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg">
                Register Your Student
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:9870525637">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-school-blue-600 px-8 py-4 text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
