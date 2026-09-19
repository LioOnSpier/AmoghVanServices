import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

/**
 * Shared site navigation. Highlights the active route so visitors always
 * know where they are — previously each page hand-rolled its own copy.
 */
const SiteNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Amogh Van/Bus Services Logo"
              className="h-10 w-10 object-contain rounded-lg"
            />
            <Link to="/" className="text-xl font-company-name text-gray-900">
              Amogh Van/Bus Services
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={
                  isActive(l.to)
                    ? "text-school-blue-600 font-semibold transition-colors"
                    : "text-gray-600 hover:text-school-blue-600 transition-colors"
                }
              >
                {l.label}
              </Link>
            ))}
            <Link to="/register" className="btn-primary">
              Register Student
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
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

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={
                  isActive(l.to)
                    ? "block px-3 py-2 text-school-blue-600 bg-school-blue-50 font-medium rounded-lg transition-colors"
                    : "block px-3 py-2 text-gray-600 hover:text-school-blue-600 transition-colors"
                }
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 bg-school-yellow-500 text-white rounded-lg font-semibold mt-2"
            >
              Register Student
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteNav;
