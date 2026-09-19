import { ReactNode } from "react";
import SEO from "@/components/SEO";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

interface LegalLayoutProps {
  title: string;
  description: string;
  canonicalUrl: string;
  lastUpdated: string;
  intro: string;
  children: ReactNode;
}

/** Shared shell for the policy pages so they stay visually consistent. */
const LegalLayout = ({
  title,
  description,
  canonicalUrl,
  lastUpdated,
  intro,
  children,
}: LegalLayoutProps) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <SEO title={title} description={description} canonicalUrl={canonicalUrl} />
    <SiteNav />

    <main className="flex-grow">
      <header className="bg-gradient-to-br from-school-blue-50 to-school-yellow-50 py-14">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope text-gray-900 tracking-tight">
            {title.split(" - ")[0]}
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl leading-relaxed">
            {intro}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>
      </header>

      <div className="section-container py-12">
        <article className="prose prose-slate max-w-3xl prose-headings:font-manrope prose-headings:text-gray-900 prose-a:text-school-blue-600">
          {children}
        </article>
      </div>
    </main>

    <SiteFooter />
  </div>
);

export default LegalLayout;
