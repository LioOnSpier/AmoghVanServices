import type { StaticArticle } from "../types";

import { article as busSafetyRules } from "./school-bus-safety-rules-india";
import { article as choosingVan } from "./choosing-school-van-mumbai";
import { article as monsoon } from "./monsoon-school-commute-mumbai";
import { article as summerHeat } from "./summer-heat-school-commute";
import { article as motionSickness } from "./motion-sickness-school-commute";
import { article as firstDay } from "./first-day-school-bus-anxiety";
import { article as safetyByAge } from "./teaching-bus-safety-by-age";
import { article as gpsTracking } from "./gps-tracking-school-transport";

/** Newest first — the listing relies on this order as a fallback. */
export const staticArticles: StaticArticle[] = [
  gpsTracking,
  motionSickness,
  safetyByAge,
  firstDay,
  monsoon,
  choosingVan,
  busSafetyRules,
  summerHeat,
];

export const staticArticleSlugs = staticArticles.map((a) => a.slug);
