import { getPublishedBlogs, getBlogBySlug, type Blog } from "./firestore";
import { staticArticles } from "@/content/articles";
import type { StaticArticle } from "@/content/types";

/**
 * A blog post from either source: a long-form guide bundled with the repo,
 * or a post authored in the admin panel and stored in Firestore.
 *
 * Static guides need no network call, so they are always present in the
 * prerendered HTML even if Firestore is slow or unreachable.
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  /** HTML body. */
  content: string;
  authorName: string;
  coverImage: string;
  publishedAt: Date | null;
  category: string;
  source: "static" | "firestore";
}

function fromStatic(a: StaticArticle): Post {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    summary: a.summary,
    content: a.content,
    authorName: a.authorName,
    coverImage: a.coverImage,
    publishedAt: new Date(a.publishedISO),
    category: a.category,
    source: "static",
  };
}

function fromFirestore(b: Blog): Post {
  return {
    id: b.id,
    title: b.title,
    slug: b.slug,
    summary: b.summary,
    content: b.content,
    authorName: b.authorName,
    coverImage: b.coverImage,
    publishedAt: b.publishedAt?.toDate() ?? null,
    category: "Updates",
    source: "firestore",
  };
}

function sortByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
  );
}

/**
 * Every published post, newest first.
 *
 * Static guides are returned even when Firestore fails — a network error
 * should degrade the listing, not empty it.
 */
export async function getAllPosts(): Promise<Post[]> {
  const statics = staticArticles.map(fromStatic);

  let remote: Post[] = [];
  try {
    remote = (await getPublishedBlogs()).map(fromFirestore);
  } catch {
    remote = [];
  }

  // A Firestore post sharing a slug with a bundled guide would render twice.
  const staticSlugs = new Set(statics.map((p) => p.slug));
  const deduped = remote.filter((p) => !staticSlugs.has(p.slug));

  return sortByDateDesc([...statics, ...deduped]);
}

/** Resolve one post by slug, preferring the bundled guides. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const local = staticArticles.find((a) => a.slug === slug);
  if (local) return fromStatic(local);

  try {
    const remote = await getBlogBySlug(slug);
    return remote ? fromFirestore(remote) : null;
  } catch {
    return null;
  }
}

/** Other posts to suggest alongside `slug`, newest first. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

export function estimateReadingTime(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
