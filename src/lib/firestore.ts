import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BlogStatus = "Draft" | "Published";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  authorId: string;
  authorName: string;
  coverImage: string;
  status: BlogStatus;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  publishedAt: Timestamp | null;
}

export interface CreateBlogData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  authorId: string;
  authorName: string;
  coverImage: string;
  status: BlogStatus;
}

// ─── Slug helper ──────────────────────────────────────────────────────────────

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Admin Users ──────────────────────────────────────────────────────────────

export async function updateAdminLastLogin(uid: string, email: string): Promise<void> {
  const ref = doc(db, "AdminUsers", uid);
  await updateDoc(ref, { lastLogin: serverTimestamp() }).catch(async () => {
    // Document may not exist yet — create it on first login
    const { setDoc } = await import("firebase/firestore");
    await setDoc(ref, {
      id: uid,
      email,
      role: "admin",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
  });
}

// ─── Public Blog Queries ──────────────────────────────────────────────────────

/**
 * Fetch all Published blogs, ordered by publishedAt desc.
 * Used by the public /blog page.
 */
export async function getPublishedBlogs(): Promise<Blog[]> {
  const q = query(
    collection(db, "blogs"),
    where("status", "==", "Published")
  );
  const snap = await getDocs(q);
  const blogs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Blog));
  // Sort client-side to avoid needing a Firestore composite index
  return blogs.sort((a, b) => {
    const aTime = a.publishedAt?.toMillis() ?? 0;
    const bTime = b.publishedAt?.toMillis() ?? 0;
    return bTime - aTime;
  });
}

/**
 * Fetch a single Published blog by slug.
 * Used by the public /blog/:slug page.
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const q = query(
    collection(db, "blogs"),
    where("slug", "==", slug),
    where("status", "==", "Published")
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Blog;
}

// ─── Admin Blog Queries ───────────────────────────────────────────────────────

/**
 * Fetch ALL blogs (Draft + Published) for the admin dashboard.
 * Requires the user to be authenticated (enforced by Firestore rules).
 */
export async function getAllBlogsAdmin(): Promise<Blog[]> {
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Blog));
}

/**
 * Fetch a single blog by ID (for the editor, any status).
 */
export async function getBlogById(id: string): Promise<Blog | null> {
  const ref = doc(db, "blogs", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Blog;
}

// ─── Admin Blog Mutations ─────────────────────────────────────────────────────

export async function createBlog(data: CreateBlogData): Promise<string> {
  const now = serverTimestamp();
  const docRef = await addDoc(collection(db, "blogs"), {
    ...data,
    createdAt: now,
    updatedAt: now,
    publishedAt: data.status === "Published" ? now : null,
  });
  return docRef.id;
}

export async function updateBlog(
  id: string,
  data: Partial<CreateBlogData>
): Promise<void> {
  const ref = doc(db, "blogs", id);
  const updates: Record<string, unknown> = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  // Set publishedAt when publishing for the first time
  if (data.status === "Published") {
    const existing = await getDoc(ref);
    if (existing.exists() && !existing.data().publishedAt) {
      updates.publishedAt = serverTimestamp();
    }
  }
  await updateDoc(ref, updates);
}

export async function deleteBlog(id: string): Promise<void> {
  await deleteDoc(doc(db, "blogs", id));
}
