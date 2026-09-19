import { Link } from "react-router-dom";
import { Bus, Phone, Mail, MapPin } from "lucide-react";

/**
 * Shared site footer. Every entry is a real link — the older per-page
 * footers listed section headings as plain text, leaving crawlers and
 * visitors at a dead end.
 *
 * Column headings are <h3>: page sections top out at <h2>, so <h4> here
 * skipped a level and broke the document outline.
 *
 * The phone/email shortcuts live in the "Contact Info" column rather than
 * under the company blurb — keeping the contact actions next to the contact
 * details, and leaving the first column a clean text block that lines up
 * with the link columns beside it.
 */
const SiteFooter = () => (
  <footer id="contact" className="bg-gray-900 text-white py-16">
    <div className="section-container">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-school-yellow-500 p-2 rounded-lg">
              <Bus className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-company-name">
              Amogh Van/Bus Services
            </span>
          </div>
          <p className="text-gray-400">
            Founded by Rajesh Kumar J Kharwar. Providing safe, reliable school
            transportation services in Mumbai and surrounding areas since 2010.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/services" className="hover:text-white transition-colors">
                Daily School Routes
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition-colors">
                Field Trips
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition-colors">
                Private Transportation
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-white transition-colors">
                Fleet Gallery
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors">
                Safety Guides &amp; Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition-colors">
                Register a Student
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center">
              <Phone className="h-4 w-4 mr-3 shrink-0" aria-hidden="true" />
              <a
                href="tel:9870525637"
                className="hover:text-white transition-colors"
              >
                9870525637
              </a>
              <span className="px-1.5" aria-hidden="true">
                /
              </span>
              <a
                href="tel:9321025627"
                className="hover:text-white transition-colors"
              >
                9321025627
              </a>
            </li>
            <li className="flex items-center">
              <Mail className="h-4 w-4 mr-3 shrink-0" aria-hidden="true" />
              <a
                href="mailto:kharwaramog02@gmail.com"
                className="break-all hover:text-white transition-colors"
              >
                kharwaramog02@gmail.com
              </a>
            </li>
            <li className="flex items-start">
              <MapPin className="h-4 w-4 mr-3 mt-1 shrink-0" aria-hidden="true" />
              <span>
                Prabhadevi, Dadar West
                <br />
                Mumbai, Maharashtra 400028
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400">
        <p>&copy; 2025 Amogh Van/Bus Services. All rights reserved.</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
