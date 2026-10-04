import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { Link } from "react-router-dom";
import { Bus, Calendar, Users, CheckCircle } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <SEO
        title="Our Services - Amogh Van/Bus Services"
        description="Explore the comprehensive school van and bus transportation services provided by Amogh in Mumbai. Daily routes, field trips, and private transportation."
        keywords="school bus services Mumbai, field trip transport, private student transport, daily school transport routes"
        canonicalUrl="https://amoghvanservices.in/services"
      />

      {/* Navigation */}
      <SiteNav />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="page-hero py-20">
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
              <Card className="card-glass">
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

              <Card className="card-glass">
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

              <Card className="card-glass">
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
      <SiteFooter />
    </div>
  );
};

export default Services;
