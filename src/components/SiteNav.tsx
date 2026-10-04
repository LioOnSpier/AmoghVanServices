import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT } from "@/data/constants";
import { cn } from "@/lib/utils";

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
 *
 * The bar is frosted rather than solid white. At the very top of the page it
 * sits nearly transparent so the hero's gradient runs behind it; once the
 * page scrolls it gains tint, blur and a shadow, which is what separates it
 * from the content passing underneath. A plain translucent bar that never
 * changes leaves text colliding with whatever scrolls behind it.
 */
const SiteNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); // a route entered mid-page starts scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation — React Router keeps the component mounted
  // across route changes, so it would otherwise stay open over the new page.
  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-out",
        "border-b backdrop-blur-xl",
        scrolled
          ? "border-white/60 bg-white/80 shadow-soft"
          : "border-transparent bg-white/55",
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="section-container">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative">
              {/* Soft brand halo behind the mark — grows on hover so the
                  logo feels like a control without moving the layout. */}
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-xl bg-school-yellow-400/25 blur-md transition-all duration-300 group-hover:-inset-2 group-hover:bg-school-yellow-400/40"
              />
              <img
                src="/logo.png"
                alt="Amogh Van/Bus Services Logo"
                className="relative h-10 w-10 rounded-lg object-contain"
              />
            </span>
            <span className="font-company-name text-lg text-gray-900 sm:text-xl">
              Amogh Van/Bus Services
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive(l.to) ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                  isActive(l.to)
                    ? "font-semibold text-school-blue-600"
                    : "text-gray-600 hover:bg-white/70 hover:text-school-blue-600",
                )}
              >
                {l.label}
                {/* Underline marks the active route. Scaled from the centre
                    so it draws outward rather than wiping in from the left. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-school-yellow-400 to-school-yellow-600 transition-transform duration-300",
                    isActive(l.to) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ))}
            <a
              href={`tel:${CONTACT.PHONE_PRIMARY}`}
              className="ml-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-school-blue-600"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.PHONE_PRIMARY}
            </a>
            <Link to="/register" className="btn-primary ml-2 px-5 py-2.5 text-sm">
              Register Student
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="rounded-lg border border-white/70 bg-white/70 p-2 text-gray-700 shadow-soft backdrop-blur-lg transition-colors hover:text-school-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-blue-600"
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

      {/*
        Animated with a grid-rows trick rather than max-height: the row
        collapses to the content's real height, so the drawer never eases
        against a guessed max-height that is either clipped or laggy.
      */}
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          isMobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="space-y-1 border-t border-white/60 bg-white/85 px-4 pb-4 pt-3 backdrop-blur-xl">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive(l.to) ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2.5 transition-colors",
                  isActive(l.to)
                    ? "bg-school-blue-50 font-medium text-school-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-school-blue-600",
                )}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${CONTACT.PHONE_PRIMARY}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-gray-600 transition-colors hover:text-school-blue-600"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.PHONE_PRIMARY}
            </a>
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Register Student
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
