import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Bus,
  Shield,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  Users,
  Calendar,
  Navigation,
  Heart,
  Award,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { CONTACT } from "@/data/constants";
import SeoKeywordsList from "@/components/SeoKeywordsList";

/**
 * Home page.
 *
 * The visual language here is the reference for the rest of the site: a soft
 * gradient field with drifting colour, frosted panels over it, and entrance
 * motion that is opt-in (see components/Reveal.tsx — the build prerenders
 * every route, so nothing may animate from a state the snapshot can capture).
 *
 * Copy is load-bearing. Headings, the H1/H2 order and the location names are
 * tuned for local search; treat them as content, not as layout to rebalance.
 */

/** Hero stat strip. */
const STATS = [
  { value: "200+", label: "Happy Students" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Safety Record" },
];

/** Service cards. `tone` picks the icon tile's gradient, nothing else. */
const SERVICES = [
  {
    icon: Bus,
    tone: "yellow",
    title: "Daily School Routes",
    description:
      "Regular pickup and drop-off services for daily school commutes",
    points: ["Door-to-door service", "Fixed schedule", "GPS tracking"],
  },
  {
    icon: Calendar,
    tone: "blue",
    title: "Field Trips",
    description: "Safe and reliable transportation for educational excursions",
    points: ["Experienced drivers", "Flexible scheduling", "Group discounts"],
  },
  {
    icon: Users,
    tone: "green",
    title: "Private Transportation",
    description: "Customized transportation solutions for special needs",
    points: ["Wheelchair accessible", "Trained attendants", "Medical support"],
  },
] as const;

/** Safety tiles, left column of the safety section. */
const SAFETY_FEATURES = [
  {
    icon: Shield,
    tone: "green",
    title: "Licensed Drivers",
    description: "All drivers are professionally licensed and trained",
  },
  {
    icon: Navigation,
    tone: "blue",
    title: "GPS Tracking",
    description: "Real-time location monitoring for peace of mind",
  },
  {
    icon: Clock,
    tone: "yellow",
    title: "On-Time Service",
    description: "Punctual pickups and drop-offs every day",
  },
  {
    icon: Award,
    tone: "red",
    title: "Certified Vehicles",
    description: "Regular maintenance and safety inspections",
  },
] as const;

/** Safety assurances, right column. The left border carries the tone. */
const SAFETY_ASSURANCES = [
  {
    icon: CheckCircle,
    tone: "green",
    title: "Background Checks",
    description: "Comprehensive background verification for all staff members",
  },
  {
    icon: Heart,
    tone: "blue",
    title: "First Aid Training",
    description:
      "All drivers trained in basic first aid and emergency procedures",
  },
  {
    icon: MapPin,
    tone: "yellow",
    title: "Route Optimization",
    description:
      "Efficient routes planned for minimum travel time and maximum safety",
  },
] as const;

/**
 * Tone lookups.
 *
 * Written out in full rather than built as `from-school-${tone}-400`: Tailwind
 * scans source files for complete class strings, so an interpolated name is
 * never emitted and the tile renders untinted.
 */
const ICON_TILE: Record<string, string> = {
  yellow: "bg-gradient-to-br from-school-yellow-400 to-school-yellow-600 shadow-glow-yellow",
  blue: "bg-gradient-to-br from-school-blue-500 to-school-blue-700 shadow-glow-blue",
  green: "bg-gradient-to-br from-school-green-400 to-school-green-600 shadow-[0_12px_36px_-10px_rgba(34,197,94,0.5)]",
  red: "bg-gradient-to-br from-school-red-400 to-school-red-600 shadow-[0_12px_36px_-10px_rgba(239,68,68,0.5)]",
};

const ACCENT_BORDER: Record<string, string> = {
  yellow: "border-l-school-yellow-500",
  blue: "border-l-school-blue-500",
  green: "border-l-school-green-500",
};

const Index = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Amogh Van/Bus Services",
    url: "https://amoghvanservices.in",
    logo: "https://amoghvanservices.in/logo.png",
    description:
      "Mumbai's most trusted school transportation service since 2010, providing safe and reliable van & bus services for students",
    founder: {
      "@type": "Person",
      name: "Rajesh Kumar J Kharwar",
    },
    foundingDate: "2010",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.PHONE_PRIMARY_FULL,
      contactType: "customer service",
      areaServed: "Mumbai",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Prabhadevi",
      addressLocality: "Dadar West",
      addressRegion: "Maharashtra",
      addressCountry: "India",
    },
    sameAs: ["https://kharwaramog02-swayq.wordpress.com"],
  };

  return (
    // Search Console and AdSense verification tags live in index.html, so
    // they sit in the static head of every prerendered page.
    <div className="min-h-screen bg-white">
      <SEO
        title="Amogh Van/Bus Services - Safe & Reliable School Transportation in Mumbai"
        description="Mumbai's most trusted school transportation service since 2010. Safe, reliable van & bus services for students in Prabhadevi, Dadar West. GPS tracking, trained drivers, 500+ satisfied families. Call 9870525637"
        keywords="school bus services Mumbai, school van services Mumbai, student transportation Mumbai, school transport Prabhadevi, school transport Dadar West, safe school bus Mumbai, GPS tracking school transport, reliable school van service, Mumbai school pickup drop, school transport rates Mumbai"
        ogType="website"
        canonicalUrl="https://amoghvanservices.in/"
        schema={organizationSchema}
      />
      <LocalBusinessSchema />

      <SiteNav />

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      {/*
        `isolate` keeps the aurora layer's stacking context local, so the
        blurred blobs can never paint over the sticky nav above them.
      */}
      <header
        className="relative isolate overflow-hidden bg-gradient-to-b from-school-yellow-50 via-white to-school-blue-50/60 pb-20 pt-14 lg:pb-28 lg:pt-20"
        role="banner"
      >
        <div className="aurora-field" aria-hidden="true" />
        <div className="grid-veil absolute inset-0" aria-hidden="true" />

        <div className="section-container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-5">
                <Reveal className="glass-chip text-sm font-semibold text-school-green-700">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-school-green-500" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-school-green-600" />
                  </span>
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Trusted Since 2010
                </Reveal>

                <Reveal delay={60}>
                  <h1 className="font-business-heading text-4xl leading-[1.08] text-gray-900 sm:text-5xl lg:text-6xl">
                    Safe &amp; Reliable
                    <span className="text-gradient-brand block">
                      school van service in Mumbai
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={120}>
                  <h2 className="text-xl font-semibold text-school-blue-600">
                    Providing safe school transport in Mumbai since 2010
                  </h2>
                </Reveal>

                <Reveal delay={170}>
                  <p className="max-w-xl font-professional text-lg leading-relaxed text-gray-600">
                    Amogh Van/Bus Services provides secure, comfortable, and
                    punctual school bus and van transportation services for
                    students across Mumbai, Prabhadevi, and Dadar West. Your
                    child's safety is our top priority with GPS tracking and
                    trained drivers.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={220} className="flex flex-col gap-4 sm:flex-row">
                <Link to="/register" className="btn-primary group">
                  Register Your Child
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a href={`tel:${CONTACT.PHONE_PRIMARY}`} className="btn-glass group">
                  <Phone className="mr-2 h-5 w-5 text-school-yellow-600 transition-transform duration-300 group-hover:rotate-12" />
                  Call Us Now
                </a>
              </Reveal>

              <Reveal delay={280} as="dl" className="grid grid-cols-3 gap-3 pt-4 sm:gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card group px-3 py-5 text-center sm:px-4 hover:-translate-y-1"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-bold text-school-blue-600 sm:text-3xl">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs text-gray-600 sm:text-sm">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </Reveal>
            </div>

            <div className="relative">
              <div className="animate-float-tilt">
                {/* Gradient ring + inner glass frame. The ring is the padding
                    of the outer element, so no extra wrapper is needed. */}
                <div className="rounded-[1.75rem] bg-gradient-to-br from-school-yellow-300 via-school-yellow-500 to-school-yellow-600 p-1.5 shadow-[0_32px_80px_-24px_rgba(180,83,9,0.55)]">
                  <div className="overflow-hidden rounded-[1.4rem] border border-white/50 bg-white/80 p-2 backdrop-blur-xl">
                    <img
                      src="/hero-bus.jpg"
                      alt="Students enjoying their ride in Amogh Van Services school bus"
                      className="aspect-video w-full rounded-[1.1rem] object-cover"
                      width={720}
                      height={405}
                    />
                  </div>
                </div>
              </div>

              {/* Static trust marker, not a control. Sits fully below the
                  card: overlapping a tilted card with a level badge read
                  as a layout error. mt-8 clears the tilted corner. */}
              <div className="mt-8 flex justify-end">
                <p className="glass-chip text-sm font-semibold text-gray-900">
                  <CheckCircle
                    className="h-5 w-5 text-school-green-600"
                    aria-hidden="true"
                  />
                  Verified drivers &amp; GPS tracked
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Services ──────────────────────────────────────────────────── */}
      <section
        id="services"
        className="relative bg-gradient-to-b from-white via-school-blue-50/40 to-white py-20 lg:py-24"
        role="main"
        aria-labelledby="services-heading"
      >
        <div className="section-container">
          <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center">
            <Reveal className="glass-chip text-sm font-semibold text-school-blue-700">
              Our School Transportation Services
            </Reveal>
            <Reveal delay={60}>
              <h2
                id="services-heading"
                className="whitespace-pre-line font-manrope text-3xl font-bold text-gray-900 sm:text-4xl"
              >
                Trusted school pickup and drop service{"\n"}
                <span className="mt-2 block text-2xl text-school-blue-600">
                  Premium student transport service
                </span>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="text-lg text-gray-600">
                Comprehensive school bus and van transportation services
                designed to meet all your student transportation needs in
                Mumbai, Prabhadevi, and Dadar West areas.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} delay={i * 90}>
                <article className="glass-card-interactive group h-full p-8 text-center">
                  <div
                    className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${ICON_TILE[service.tone]}`}
                  >
                    <service.icon
                      className="h-8 w-8 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-manrope text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                  <ul className="mt-6 space-y-2.5 text-gray-600">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle
                          className="h-4 w-4 shrink-0 text-school-green-500"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Safety ────────────────────────────────────────────────────── */}
      <section
        id="safety"
        className="relative isolate overflow-hidden bg-gradient-to-br from-school-green-50/70 via-white to-school-blue-50/70 py-20 lg:py-24"
        aria-labelledby="safety-heading"
      >
        <div className="aurora-field opacity-60" aria-hidden="true" />

        <div className="section-container relative">
          {/* items-start, not items-center: the columns are different
              heights, so centring them left their tops misaligned. */}
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <Reveal className="glass-chip text-sm font-semibold text-school-green-700">
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Safety First
                </Reveal>
                <Reveal delay={60}>
                  <h2
                    id="safety-heading"
                    className="font-manrope text-3xl font-bold text-gray-900 sm:text-4xl"
                  >
                    Your Child's Safety is Our Priority
                  </h2>
                </Reveal>
                <Reveal delay={110}>
                  <p className="text-lg text-gray-600">
                    We maintain the highest safety standards with regular
                    vehicle inspections, background-checked drivers, and
                    real-time monitoring systems.
                  </p>
                </Reveal>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {SAFETY_FEATURES.map((feature, i) => (
                  <Reveal key={feature.title} delay={i * 80}>
                    <div className="glass-card-interactive group h-full p-6">
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 ${ICON_TILE[feature.tone]}`}
                      >
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mb-2 font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/*
              Sticky on desktop: the assurance list is three cards against the
              left column's six, so pinning it keeps the two columns reading as
              a pair instead of leaving a half-column of dead space.
            */}
            <div className="space-y-6 lg:sticky lg:top-28">
              {SAFETY_ASSURANCES.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <div
                    className={`glass-card-interactive border-l-4 p-6 ${ACCENT_BORDER[item.tone]}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${ICON_TILE[item.tone]}`}
                      >
                        <item.icon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      {/*
        Dark band rather than the old flat yellow→blue gradient. The brand
        colours stay, but as glows over near-black, which is what lets white
        copy sit on them at full contrast — the old band ran white text over
        mid-yellow, where it failed AA.
      */}
      <section className="relative isolate overflow-hidden bg-gray-900 py-20 lg:py-24">
        {/*
          Both glows are pushed off the top edge. Centred higher, the warm one
          met the section's own top border and read as a muddy brown band
          rather than as light falling into the section.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-gradient-pan bg-200 bg-[radial-gradient(55%_70%_at_12%_75%,rgba(245,158,11,0.30),transparent_62%),radial-gradient(55%_70%_at_88%_30%,rgba(59,130,246,0.38),transparent_62%)]"
        />
        <div className="grid-veil absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="section-container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="glass-card-dark px-6 py-12 sm:px-12">
              <h2 className="font-manrope text-3xl font-bold text-white sm:text-4xl">
                Ready to Secure Safe Transportation for Your Child?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
                Join hundreds of families who trust Amogh Van/Bus Services for
                their children's daily transportation needs.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/register" className="btn-primary group">
                  Register Your Student
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a href={`tel:${CONTACT.PHONE_PRIMARY}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white/40 bg-white/10 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white sm:w-auto"
                  >
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Get Quote
                  </Button>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEO Keywords List */}
      <SeoKeywordsList />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
};

export default Index;
