import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Bus,
  ArrowLeft,
  Save,
  Globe,
  ImagePlus,
  X,
  Loader2,
  FileText,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  createBlog,
  updateBlog,
  getBlogById,
  generateSlug,
  BlogStatus,
} from "@/lib/firestore";
import { uploadCoverImage, uploadContentImage } from "@/lib/storage";

// ─── Quill toolbar config ─────────────────────────────────────────────────────
const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      // image handler injected after mount
      image: () => {},
    },
  },
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "blockquote",
  "code-block",
  "link",
  "image",
];

// ─── Component ────────────────────────────────────────────────────────────────

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const quillRef = useRef<ReactQuill>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<BlogStatus>("Draft");
  const [coverUrl, setCoverUrl] = useState("");

  // UI state
  const [loadingPost, setLoadingPost] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverProgress, setCoverProgress] = useState(0);
  const [coverPreview, setCoverPreview] = useState("");
  const [tempBlogId] = useState(`temp_${Date.now()}`);

  // ── Load existing blog when editing ──────────────────────────────────────────
  useEffect(() => {
    if (!isEditing || !id) return;
    getBlogById(id)
      .then((blog) => {
        if (!blog) {
          toast.error("Blog post not found.");
          navigate("/admin/dashboard");
          return;
        }
        setTitle(blog.title);
        setSlug(blog.slug);
        setSummary(blog.summary);
        setContent(blog.content);
        setStatus(blog.status);
        setCoverUrl(blog.coverImage);
        setCoverPreview(blog.coverImage);
      })
      .catch(() => toast.error("Failed to load blog post."))
      .finally(() => setLoadingPost(false));
  }, [id, isEditing, navigate]);

  // ── Auto-generate slug from title (new posts only) ────────────────────────
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditing]);

  // ── Cover image upload ────────────────────────────────────────────────────
  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    setCoverProgress(0);
    try {
      const blogIdForUpload = isEditing && id ? id : tempBlogId;
      const url = await uploadCoverImage(blogIdForUpload, file, (pct) =>
        setCoverProgress(pct)
      );
      setCoverUrl(url);
      setCoverPreview(url);
      toast.success("Cover image uploaded!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setCoverUploading(false);
    }
  };

  // ── Quill image handler (inline content images) ───────────────────────────
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const toolbar = quill.getModule("toolbar") as {
      addHandler: (name: string, handler: () => void) => void;
    };
    toolbar.addHandler("image", () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/jpeg,image/png,image/webp");
      input.click();
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        const blogId = isEditing && id ? id : tempBlogId;
        try {
          toast.info("Uploading image…");
          const url = await uploadContentImage(blogId, file);
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", url);
          toast.success("Image inserted into content.");
        } catch (err: unknown) {
          toast.error(err instanceof Error ? err.message : "Image upload failed.");
        }
      };
    });
  }, [id, isEditing, tempBlogId, loadingPost]);

  // ── Save handler ─────────────────────────────────────────────────────────
  const handleSave = async (overrideStatus?: BlogStatus) => {
    if (!title.trim()) {
      toast.error("Please enter a blog title.");
      return;
    }
    if (!content.replace(/<[^>]*>/g, "").trim()) {
      toast.error("Please write some content.");
      return;
    }

    const finalStatus = overrideStatus ?? status;
    setSaving(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug || generateSlug(title),
        summary: summary.trim(),
        content,
        authorId: user!.uid,
        authorName: user!.email?.split("@")[0] ?? "Admin",
        coverImage: coverUrl,
        status: finalStatus,
      };

      if (isEditing && id) {
        await updateBlog(id, payload);
        toast.success(
          finalStatus === "Published"
            ? "Blog post published!"
            : "Changes saved as draft."
        );
      } else {
        const newId = await createBlog(payload);
        toast.success(
          finalStatus === "Published"
            ? "Blog post published!"
            : "Blog saved as draft."
        );
        navigate(`/admin/blog/edit/${newId}`, { replace: true });
      }

      setStatus(finalStatus);
    } catch (err) {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loadingPost) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-10 w-10 text-school-yellow-500 mx-auto mb-3" />
          <p className="text-gray-400">Loading post…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-school-yellow-500 p-2 rounded-lg">
            <Bus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white font-manrope">
              {isEditing ? "Edit Blog Post" : "New Blog Post"}
            </h1>
            <p className="text-xs text-gray-400">Blog Editor</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            className={
              status === "Published"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            }
          >
            {status === "Published" ? (
              <Eye className="h-3 w-3 mr-1" />
            ) : (
              <FileText className="h-3 w-3 mr-1" />
            )}
            {status}
          </Badge>
          <Link to="/admin/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column: Main Content ────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <Label htmlFor="title" className="text-gray-300 mb-2 block">
                Blog Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging blog title…"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 text-lg font-semibold focus:border-school-yellow-500"
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <Label htmlFor="summary" className="text-gray-300 mb-2 block">
                Summary / Excerpt
              </Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write a short description that will appear on the blog listing page…"
                rows={3}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-school-yellow-500 resize-none"
              />
            </div>

            {/* Rich Text Editor */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <Label className="text-gray-300 mb-3 block">
                Blog Content *
              </Label>
              <div className="quill-dark-editor">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Start writing your blog post here…"
                  style={{ minHeight: "400px" }}
                />
              </div>
            </div>
          </div>

          {/* ── Right Column: Sidebar ─────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Publish Actions */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
              <h3 className="font-semibold text-white">Publish</h3>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                onClick={() => handleSave("Published")}
                disabled={saving}
              >
                {saving && status !== "Draft" ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <Globe className="h-4 w-4 mr-2" />
                )}
                {isEditing && status === "Published"
                  ? "Update Published Post"
                  : "Publish Post"}
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => handleSave("Draft")}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save as Draft
              </Button>
            </div>

            {/* Slug */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <Label htmlFor="slug" className="text-gray-300 mb-2 block">
                URL Slug
              </Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                placeholder="url-friendly-slug"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                /blog/<span className="text-gray-300">{slug || "slug"}</span>
              </p>
            </div>

            {/* Cover Image */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="font-semibold text-white mb-3">Cover Image</h3>

              {coverPreview ? (
                <div className="relative mb-3">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full h-8 w-8 p-0"
                    onClick={() => {
                      setCoverPreview("");
                      setCoverUrl("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}

              <label
                htmlFor="cover-upload"
                className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
                  coverPreview
                    ? "border-gray-700 opacity-60 hover:border-gray-600"
                    : "border-gray-700 hover:border-school-yellow-500"
                }`}
              >
                {coverUploading ? (
                  <div className="text-center">
                    <Loader2 className="animate-spin h-8 w-8 text-school-yellow-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">
                      Uploading… {coverProgress}%
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImagePlus className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">
                      {coverPreview ? "Replace image" : "Upload cover image"}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      JPG, PNG, WEBP · Max 5 MB
                    </p>
                  </div>
                )}
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleCoverChange}
                  disabled={coverUploading}
                />
              </label>
            </div>

            {/* Author info */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="font-semibold text-white mb-2">Author</h3>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
