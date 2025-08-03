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
import { wordpressApi, WordPressPost, wpUtils } from "@/lib/wordpress";
import { toast } from "sonner";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const [postData, recent] = await Promise.all([
          wordpressApi.getPostBySlug(slug),
          wordpressApi.getPosts({ per_page: 4 }),
        ]);

        if (!postData) {
          toast.error("Blog post not found.");
          return;
        }

        setPost(postData);
        // Filter out current post from recent posts
        setRecentPosts(recent.filter((p) => p.id !== postData.id));
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadingTime = (content: string) => {
    if (!content) return 1;
    const wordCount = wordpressApi
      .stripHtml(content)
      .split(" ")
      .filter((word) => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200)); // Average reading speed
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator
        .share({
          title: post.title.rendered,
          text: wpUtils.cleanExcerpt(post.excerpt.rendered) || "",
          url: window.location.href,
        })
        .catch((error) => {
          // If native sharing fails, fall back to legacy copy method
          console.log(
            "Native sharing failed, falling back to legacy copy:",
            error,
          );
          fallbackCopyToClipboard(window.location.href);
        });
    } else {
      fallbackCopyToClipboard(window.location.href);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            toast.success("Post URL copied to clipboard!");
          })
          .catch(() => {
            // If modern clipboard fails, use legacy method
            legacyCopyToClipboard(text);
          });
      } else {
        // Use legacy method directly
        legacyCopyToClipboard(text);
      }
    } catch (error) {
      legacyCopyToClipboard(text);
    }
  };

  const legacyCopyToClipboard = (text: string) => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      // Try to copy using the legacy execCommand
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        toast.success("Post URL copied to clipboard!");
      } else {
        // If all methods fail, show the URL for manual copying
        showUrlForManualCopy(text);
      }
    } catch (error) {
      // If all methods fail, show the URL for manual copying
      showUrlForManualCopy(text);
    }
  };

  const showUrlForManualCopy = (text: string) => {
    // Show a toast with the URL for manual copying
    toast.success(
      <div>
        <p className="mb-2">Copy this URL manually:</p>
        <p className="text-xs bg-gray-100 p-2 rounded break-all">{text}</p>
      </div>,
      { duration: 8000 },
    );
  };

  const shareOnSocialMedia = (platform: string) => {
    if (!post) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title.rendered);
    const text = encodeURIComponent(
      wpUtils.cleanExcerpt(post.excerpt.rendered) || post.title.rendered,
    );

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${title}&body=Check out this blog post: ${url}`;
        break;
      case "copy":
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
            </div>
          </div>
        </nav>

        {/* Loading State */}
        <div className="py-20">
          <div className="section-container">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-4 border-school-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
            </div>
          </div>
        </nav>

        {/* Not Found */}
        <div className="py-20">
          <div className="section-container text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link to="/blog">
              <Button className="btn-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
            <span className="text-gray-900 font-medium">
              {post.title.rendered}
            </span>
          </div>
        </div>
      </div>

      <div className="py-12 min-h-screen">
        <div className="section-container">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3 relative z-10">
              {/* Header */}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={sharePost}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 font-manrope mb-6 leading-tight">
                  {post.title.rendered}
                </h1>

                {post.excerpt.rendered && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {wpUtils.cleanExcerpt(post.excerpt.rendered)}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.date)}
                  </div>
                  {post.author_info && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author_info.name}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {estimateReadingTime(post.content.rendered)} min read
                  </div>
                  {post.category_names && post.category_names.length > 0 && (
                    <Badge className="bg-school-yellow-100 text-school-yellow-700">
                      {post.category_names[0]}
                    </Badge>
                  )}
                </div>
              </header>

              {/* Featured Image */}
              {post.featured_image_url && (
                <div className="mb-12">
                  <img
                    src={post.featured_image_url}
                    alt={post.title.rendered}
                    className="w-full aspect-video object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <div
                  className="wordpress-content min-h-96 overflow-visible"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </div>

              {/* Social Media Sharing */}
              <div className="mb-12 p-6 bg-gradient-to-r from-school-yellow-50 to-school-blue-50 rounded-xl border border-school-yellow-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share this post
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => shareOnSocialMedia("facebook")}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                    size="sm"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => shareOnSocialMedia("twitter")}
                    className="bg-black hover:bg-gray-800 text-white flex items-center"
                    size="sm"
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    onClick={() => shareOnSocialMedia("linkedin")}
                    className="bg-blue-700 hover:bg-blue-800 text-white flex items-center"
                    size="sm"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={() => shareOnSocialMedia("whatsapp")}
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                    size="sm"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => shareOnSocialMedia("telegram")}
                    className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
                    size="sm"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Telegram
                  </Button>
                  <Button
                    onClick={() => shareOnSocialMedia("email")}
                    className="bg-gray-600 hover:bg-gray-700 text-white flex items-center"
                    size="sm"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
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

              {/* Categories */}
              {post.category_names && post.category_names.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.category_names.map((category, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-8">
                {/* Recent Posts */}
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
                                {recentPost.featured_image_url && (
                                  <div className="flex-shrink-0">
                                    <img
                                      src={recentPost.featured_image_url}
                                      alt={recentPost.title.rendered}
                                      className="w-20 h-15 object-cover rounded"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-school-blue-600 transition-colors line-clamp-2">
                                    {recentPost.title.rendered}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(recentPost.date)}
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

                {/* CTA Card */}
                <Card className="p-6 bg-gradient-to-br from-school-yellow-50 to-school-blue-50 border-school-yellow-200">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl text-gray-900">
                      Ready to Register?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-600 mb-4">
                      Join hundreds of families who trust Amogh Van/Bus Services
                      for safe student transportation.
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
