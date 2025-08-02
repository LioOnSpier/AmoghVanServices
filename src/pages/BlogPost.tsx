import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Share2,
} from "lucide-react";
import { blogApi, BlogPost, urlFor } from "@/lib/sanity";
import { toast } from "sonner";
import { PortableText } from "@portabletext/react";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const [postData, recent] = await Promise.all([
          blogApi.getPostBySlug(slug),
          blogApi.getRecentPosts(4),
        ]);

        if (!postData) {
          toast.error("Blog post not found.");
          return;
        }

        setPost(postData);
        // Filter out current post from recent posts
        setRecentPosts(recent.filter((p) => p._id !== postData._id));
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

  const estimateReadingTime = (content: any[]) => {
    if (!content) return 1;
    const wordCount = content
      .map((block) => {
        if (block._type === "block" && block.children) {
          return block.children
            .map((child: any) => child.text || "")
            .join(" ");
        }
        return "";
      })
      .join(" ")
      .split(" ").length;

    return Math.max(1, Math.ceil(wordCount / 200)); // Average reading speed
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt || "",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Post URL copied to clipboard!");
    }
  };

  // Custom components for PortableText
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <div className="my-8">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Blog image"}
            className="w-full rounded-lg shadow-lg"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      ),
    },
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-bold text-gray-900 font-manrope mt-12 mb-6">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-semibold text-gray-900 font-manrope mt-8 mb-4">
          {children}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-xl font-semibold text-gray-900 font-manrope mt-6 mb-3">
          {children}
        </h4>
      ),
      normal: ({ children }: any) => (
        <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-school-yellow-500 pl-6 my-8 italic text-gray-600 bg-school-yellow-50 py-4 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="text-school-blue-600 hover:text-school-blue-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      strong: ({ children }: any) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="text-lg text-gray-700">{children}</li>
      ),
      number: ({ children }: any) => (
        <li className="text-lg text-gray-700">{children}</li>
      ),
    },
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
              <Link
                to="/blog"
                className="text-school-blue-600 font-semibold"
              >
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
            <span className="text-gray-900 font-medium">{post.title}</span>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="section-container">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
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
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.publishedAt)}
                  </div>
                  {post.author && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author.name}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {estimateReadingTime(post.content)} min read
                  </div>
                  {post.featured && (
                    <Badge className="bg-school-yellow-100 text-school-yellow-700">
                      Featured
                    </Badge>
                  )}
                </div>
              </header>

              {/* Featured Image */}
              {post.mainImage && (
                <div className="mb-12">
                  <img
                    src={urlFor(post.mainImage).width(1200).height(600).url()}
                    alt={post.mainImage.alt || post.title}
                    className="w-full aspect-video object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              </div>

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category, index) => (
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
                          <div key={recentPost._id} className="group">
                            <Link
                              to={`/blog/${recentPost.slug.current}`}
                              className="block"
                            >
                              <div className="flex space-x-3">
                                {recentPost.mainImage && (
                                  <div className="flex-shrink-0">
                                    <img
                                      src={urlFor(recentPost.mainImage)
                                        .width(80)
                                        .height(60)
                                        .url()}
                                      alt={recentPost.title}
                                      className="w-20 h-15 object-cover rounded"
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
