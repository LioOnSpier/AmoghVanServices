/**
 * Long-form guides that ship with the repo rather than living in Firestore.
 *
 * These are version-controlled, need no network call, and are therefore
 * guaranteed to be present in the prerendered HTML that crawlers read.
 * Firestore-authored posts from the admin panel continue to work alongside
 * them — see `src/lib/posts.ts` for the merge.
 */
export interface StaticArticle {
  /** Stable identifier, prefixed so it can never collide with a Firestore id. */
  id: string;
  title: string;
  slug: string;
  summary: string;
  /** Rendered HTML body. */
  content: string;
  authorName: string;
  coverImage: string;
  /** ISO 8601 date, e.g. "2026-04-12". */
  publishedISO: string;
  /** Used for grouping and for the article listing badge. */
  category: string;
}
