// ─── Cloudinary Image Storage ─────────────────────────────────────────────────
// Replaces Firebase Storage. Uses Cloudinary's unsigned upload preset so
// no backend is required — works perfectly on Vercel.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10; // Cloudinary free tier supports up to 10 MB

function validateImage(file: File): void {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Invalid file type. Only JPG, PNG, and WEBP are supported.");
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File size must be under ${MAX_SIZE_MB}MB.`);
  }
}

/**
 * Core upload function using Cloudinary's unsigned upload API.
 * Returns the secure HTTPS URL of the uploaded image.
 */
async function uploadToCloudinary(
  file: File,
  folder: string,
  onProgress?: (pct: number) => void
): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText) as { secure_url: string };
        resolve(data.secure_url);
      } else {
        try {
          const err = JSON.parse(xhr.responseText) as { error?: { message: string } };
          reject(new Error(err.error?.message ?? "Upload failed."));
        } catch {
          reject(new Error("Upload failed."));
        }
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Network error during upload.")));
    xhr.addEventListener("abort", () => reject(new Error("Upload aborted.")));

    xhr.open("POST", url);
    xhr.send(formData);
  });
}

/**
 * Upload a cover image for a blog post. Returns the public CDN URL.
 */
export async function uploadCoverImage(
  blogId: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  validateImage(file);
  return uploadToCloudinary(file, `blog-images/${blogId}`, onProgress);
}

/**
 * Upload an image used inside blog content. Returns the public CDN URL.
 */
export async function uploadContentImage(
  blogId: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  validateImage(file);
  return uploadToCloudinary(file, `blog-images/${blogId}/content`, onProgress);
}

/**
 * Cloudinary images are managed via the Cloudinary dashboard.
 * This is a no-op stub kept for API compatibility.
 * To delete programmatically you need a signed request (server-side).
 */
export async function deleteStorageFile(_path: string): Promise<void> {
  // No-op: deletion requires a server-side signed request with API secret.
  // Images can be deleted from the Cloudinary dashboard.
  console.warn("deleteStorageFile: programmatic deletion not supported on client side with Cloudinary.");
}
