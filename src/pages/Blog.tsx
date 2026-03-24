import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bus,
  Calendar,
  Search,
  User,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { getPublishedBlogs, type Blog } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";

const Blog = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedBlogs()
      .then(setPosts)
      .catch(() =>
        toast.error(
          "Blog posts are temporarily unavailable. Please try again later."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (ts: Timestamp | null) => {
    if (!ts) return "";
    return ts.toDate().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const featuredPosts = posts.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="section-container">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/logo.png" alt="Amogh Van/Bus Services Logo" className="h-10 w-10 object-contain rounded-lg" />
                <span className="text-xl font-bold text-gray-900 font-manrope">
                  Amogh Van/Bus Services
                </span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="py-20">
          <div className="section-container">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-4 border-school-yellow-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Loading blog posts…</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    mainEntity: {
      "@type": "ItemList",
      name: "Amogh Van/Bus Services Blog",
      description:
        "Latest news, safety tips, and updates about school transportation services in Mumbai",
      itemListElement: posts.map((post, index) => ({
        "@type": "BlogPosting",
        position: index + 1,
        headline: post.title,
        description: post.summary,
        url: `https://amoghvanservices.com/blog/${post.slug}`,
        datePublished: post.publishedAt?.toDate().toISOString(),
        author: {
          "@type": "Person",
          name: post.authorName || "Amogh Van Services",
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO
        title="Blog - Amogh Van/Bus Services | School Transportation Tips & News Mumbai"
        description="Read the latest blog posts from Amogh Van/Bus Services about school transportation safety, tips for parents, and news about our services in Mumbai."
        keywords="school transport blog Mumbai, school bus safety tips, parent transportation guide Mumbai"
        canonicalUrl="https://amoghvanservices.com/blog"
        schema={blogSchema}
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
              <Link
                to="/about"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                About
              </Link>
              <Link to="/blog" className="text-school-blue-600 font-semibold">
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-school-blue-600 transition-colors"
              >
                Contact
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

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-school-yellow-50 to-school-blue-50">
        <div className="section-container">
          <div className="text-center space-y-6">
            <Badge className="bg-school-blue-100 text-school-blue-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Our Blog
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 font-manrope">
              Transportation Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, safety tips, and insights from
              Amogh Van/Bus Services. Your trusted partner in student
              transportation.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search blog posts…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-school-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !searchTerm && (
        <section className="py-16 bg-white">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-gray-900 font-manrope mb-12 text-center">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="card-hover border-0 shadow-lg overflow-hidden"
                >
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">
                      {post.title}
                    </CardTitle>
                    {post.summary && (
                      <CardDescription className="line-clamp-3">
                        {post.summary}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Link to={`/blog/${post.slug}`}>
                      <Button
                        variant="outline"
                        className="w-full border-school-blue-500 text-school-blue-600 hover:bg-school-blue-50"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-gray-900 font-manrope mb-12 text-center">
            {searchTerm ? `Search Results` : "All Articles"}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? "No posts found" : "No blog posts yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? `No posts match "${searchTerm}". Try a different search term.`
                  : "We're working on creating valuable content for you. Check back soon!"}
              </p>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm("")}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="card-hover border-0 shadow-lg overflow-hidden bg-white"
                >
                  <div className="md:flex">
                    {post.coverImage && (
                      <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className={post.coverImage ? "md:w-2/3" : "w-full"}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.publishedAt)}
                          </div>
                        </div>
                        <CardTitle className="text-xl line-clamp-2">
                          {post.title}
                        </CardTitle>
                        {post.summary && (
                          <CardDescription className="line-clamp-2">
                            {post.summary}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          {post.authorName && (
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="h-4 w-4 mr-1" />
                              {post.authorName}
                            </div>
                          )}
                          <Link to={`/blog/${post.slug}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-school-blue-500 text-school-blue-600 hover:bg-school-blue-50"
                            >
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold text-white font-manrope mb-6">
            Ready to Join Our Transportation Family?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Register your student today and experience safe, reliable
            transportation with Amogh Van/Bus Services.
          </p>
          <Link to="/register">
            <Button className="bg-white text-school-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg">
              Register Your Student
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
