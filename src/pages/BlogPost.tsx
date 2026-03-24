import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  Mail,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { getBlogBySlug, getPublishedBlogs, Blog } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Blog | null>(null);
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const [postData, recent] = await Promise.all([
          getBlogBySlug(slug).catch(() => null),
          getPublishedBlogs().catch(() => []),
        ]);

        if (!postData) {
          toast.error("Blog post not found or temporarily unavailable.");
          setLoading(false);
          return;
        }

        setPost(postData);
        setRecentPosts(recent.filter((p) => p.id !== postData.id).slice(0, 3));
      } catch {
        toast.error("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "";
    return ts.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadingTime = (html: string) => {
    if (!html) return 1;
    const text = html.replace(/<[^>]*>/g, " ");
    const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const shareOnSocialMedia = (platform: string) => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);

    const platformUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${title}`,
      email: `mailto:?subject=${title}&body=Check out this blog post: ${window.location.href}`,
    };

    if (platform === "copy") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Could not copy link."));
      return;
    }

    const shareUrl = platformUrls[platform];
    if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="section-container">
            <div className="flex items-center h-16">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/logo.png" alt="Amogh Van/Bus Services Logo" className="h-10 w-10 object-contain rounded-lg" />
                <span className="text-xl font-bold text-gray-900 font-manrope">
                  Amogh Van/Bus Services
                </span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="py-20 text-center">
          <div className="animate-spin h-12 w-12 border-4 border-school-yellow-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading blog post…</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="section-container">
            <div className="flex items-center h-16">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/logo.png" alt="Amogh Van/Bus Services Logo" className="h-10 w-10 object-contain rounded-lg" />
                <span className="text-xl font-bold text-gray-900 font-manrope">
                  Amogh Van/Bus Services
                </span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="py-20 text-center section-container">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog">
            <Button className="btn-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image:
      post.coverImage ||
      "https://amoghvanservices.in/default-blog-image.jpg",
    author: {
      "@type": "Person",
      name: post.authorName || "Amogh Van Services",
    },
    publisher: {
      "@type": "Organization",
      name: "Amogh Van/Bus Services",
      logo: {
        "@type": "ImageObject",
        url: "https://amoghvanservices.in/logo.jpg",
      },
    },
    datePublished: post.publishedAt?.toDate().toISOString(),
    dateModified: post.updatedAt?.toDate().toISOString() ?? post.publishedAt?.toDate().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://amoghvanservices.in/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO
        title={`${post.title} - Amogh Van/Bus Services Blog`}
        description={
          post.summary ||
          `Read ${post.title} on Amogh Van/Bus Services blog.`
        }
        keywords={`school transport, Mumbai, safety, ${post.title}`}
        canonicalUrl={`https://amoghvanservices.in/blog/${post.slug}`}
        ogImage={post.coverImage || "/default-blog-image.jpg"}
        ogType="article"
        schema={blogPostSchema}
      />

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-school-yellow-500 p-2 rounded-lg">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 font-manrope">
                Amogh Van/Bus Services
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link to="/blog" className="text-school-blue-600 font-semibold">
                Blog
              </Link>
              <Link
                to="/gallery"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Gallery
              </Link>
              <Link to="/register" className="btn-primary">
                Register Student
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="section-container py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/blog" className="text-gray-500 hover:text-gray-700">
              Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium line-clamp-1">
              {post.title}
            </span>
          </div>
        </div>
      </div>

      <div className="py-12 min-h-screen">
        <div className="section-container">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3 relative z-10">
              <header className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <Link to="/blog">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-school-blue-500 text-school-blue-600 hover:bg-school-blue-50"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Blog
                    </Button>
                  </Link>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 font-manrope mb-6 leading-tight">
                  {post.title}
                </h1>

                {post.summary && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {post.summary}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.publishedAt)}
                  </div>
                  {post.authorName && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.authorName}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {estimateReadingTime(post.content)} min read
                  </div>
                </div>
              </header>

              {/* Cover Image */}
              {post.coverImage && (
                <div className="mb-12">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full aspect-video object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <div
                  className="wordpress-content min-h-96 overflow-visible"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Social Media Sharing */}
              <div className="mb-12 p-6 bg-gradient-to-r from-school-yellow-50 to-school-blue-50 rounded-xl border border-school-yellow-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share this post
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      key: "facebook",
                      icon: Facebook,
                      label: "Facebook",
                      cls: "bg-blue-600 hover:bg-blue-700",
                    },
                    {
                      key: "twitter",
                      icon: Twitter,
                      label: "Twitter",
                      cls: "bg-black hover:bg-gray-800",
                    },
                    {
                      key: "linkedin",
                      icon: Linkedin,
                      label: "LinkedIn",
                      cls: "bg-blue-700 hover:bg-blue-800",
                    },
                    {
                      key: "whatsapp",
                      icon: MessageCircle,
                      label: "WhatsApp",
                      cls: "bg-green-500 hover:bg-green-600",
                    },
                    {
                      key: "telegram",
                      icon: Send,
                      label: "Telegram",
                      cls: "bg-blue-500 hover:bg-blue-600",
                    },
                    {
                      key: "email",
                      icon: Mail,
                      label: "Email",
                      cls: "bg-gray-600 hover:bg-gray-700",
                    },
                  ].map(({ key, icon: Icon, label, cls }) => (
                    <Button
                      key={key}
                      onClick={() => shareOnSocialMedia(key)}
                      className={`${cls} text-white flex items-center`}
                      size="sm"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                  <Button
                    onClick={() => shareOnSocialMedia("copy")}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center"
                    size="sm"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-8">
                {recentPosts.length > 0 && (
                  <Card className="p-6">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-xl">Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-6">
                        {recentPosts.map((recentPost) => (
                          <div key={recentPost.id} className="group">
                            <Link
                              to={`/blog/${recentPost.slug}`}
                              className="block"
                            >
                              <div className="flex space-x-3">
                                {recentPost.coverImage && (
                                  <div className="flex-shrink-0">
                                    <img
                                      src={recentPost.coverImage}
                                      alt={recentPost.title}
                                      className="w-20 h-14 object-cover rounded"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-school-blue-600 transition-colors line-clamp-2">
                                    {recentPost.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(recentPost.publishedAt)}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="p-6 bg-gradient-to-br from-school-yellow-50 to-school-blue-50 border-school-yellow-200">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl text-gray-900">
                      Ready to Register?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-600 mb-4">
                      Join hundreds of families who trust Amogh Van/Bus
                      Services for safe student transportation.
                    </p>
                    <Link to="/register">
                      <Button className="btn-primary w-full">
                        Register Your Student
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
