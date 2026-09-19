import React from "react";

/**
 * Plain-text directory of the services and areas we cover.
 *
 * These phrases are descriptive copy, not navigation: there is no separate
 * page behind each one, so they are marked up as list items rather than as
 * headings or links. Earlier revisions used <h5>/<h6> with a hover colour,
 * which broke the document outline and promised a click that never happened.
 *
 * The whole block is collapsed behind a <details> disclosure so it no longer
 * dominates the bottom of the page. Crawlers still read the full contents —
 * <details> hides the panel visually, it does not remove it from the DOM.
 */
const KEYWORD_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Core Transport Services",
    items: [
      "school van service in Mumbai",
      "school bus service",
      "school cab service",
      "student transport service",
      "kids transportation service",
      "school commute service",
      "safe school transport",
      "private school transport service",
      "school transport provider",
      "children school transport",
      "monthly school transport service",
      "private van for school students",
      "school shuttle service for children",
      "daily school pickup and drop service",
    ],
  },
  {
    title: "Mumbai Locations",
    items: [
      "school pickup and drop service in Mumbai",
      "school transportation service in Mumbai",
      "school cab service in Mumbai",
      "student transport service in Mumbai",
      "kids transport service in Mumbai",
      "school van near me in Mumbai",
      "safe school transport in Mumbai",
      "school drop service in Mumbai",
      "school commute service in Mumbai",
      "private school transport in Mumbai",
      "affordable school transport service in Mumbai",
      "trusted school van service in Mumbai",
      "safe school pickup and drop in Mumbai",
      "school van service in Mumbai for kids",
    ],
  },
  {
    title: "Local Areas Served",
    items: [
      "school van service in Dadar",
      "school van service in Prabhadevi",
      "school van service in Mahim",
      "school van service in Parel",
      "school van service in Bandra",
      "school van service in Kurla",
      "school transport service in Matunga",
      "school pickup and drop in Alphiston",
    ],
  },
  {
    title: "Trusted Features",
    items: [
      "reliable school van service for children",
      "affordable school transport service",
      "safe pickup and drop for school students",
      "trusted school van service near me",
      "door to door school van service",
      "school van for morning and evening pickup",
      "best school transport service in Mumbai",
      "secure transport service for school kids",
      "verified driver school van service",
      "GPS tracked school van service",
      "safest school van service near me",
      "trusted school van service for kids",
      "school transport with verified drivers",
      "school van with female attendant",
      "secure transport for school children",
      "reliable school pickup and drop service",
      "AC school van service",
    ],
  },
];

const SeoKeywordsList = () => {
  const total = KEYWORD_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="bg-gray-50 py-12 mt-10 border-t border-gray-200">
      <div className="section-container">
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 border-b pb-4 text-xl font-semibold text-gray-900 marker:content-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-school-blue-600 focus-visible:ring-offset-2 rounded-sm">
            <h3 className="text-xl font-semibold">Areas &amp; Services We Cover</h3>
            <span className="flex shrink-0 items-center gap-2 text-sm font-normal text-gray-600">
              <span>{total} services &amp; areas</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 text-sm text-gray-500">
            {KEYWORD_GROUPS.map((group) => (
              <div key={group.title}>
                <h4 className="text-gray-900 font-medium mb-4">{group.title}</h4>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default SeoKeywordsList;
