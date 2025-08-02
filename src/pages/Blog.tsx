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
  Clock,
  Search,
  User,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { blogApi, BlogPost, urlFor } from "@/lib/sanity";
import { toast } from "sonner";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [allPosts, featured] = await Promise.all([
          blogApi.getAllPosts(),
          blogApi.getFeaturedPosts(),
        ]);
        setPosts(allPosts);
        setFeaturedPosts(featured);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        toast.error("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

        {/* Loading State */}
        <div className="py-20">
          <div className="section-container">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-4 border-school-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
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

      {/* Hero Section */}
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

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-school-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-gray-900 font-manrope mb-12 text-center">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post._id}
                  className="card-hover border-0 shadow-lg overflow-hidden"
                >
                  {post.mainImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={urlFor(post.mainImage).width(400).height(225).url()}
                        alt={post.mainImage.alt || post.title}
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
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Link to={`/blog/${post.slug.current}`}>
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
            All Articles
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
                  key={post._id}
                  className="card-hover border-0 shadow-lg overflow-hidden bg-white"
                >
                  <div className="md:flex">
                    {post.mainImage && (
                      <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden">
                        <img
                          src={urlFor(post.mainImage)
                            .width(300)
                            .height(200)
                            .url()}
                          alt={post.mainImage.alt || post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className={`${post.mainImage ? "md:w-2/3" : "w-full"}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.publishedAt)}
                          </div>
                          {post.featured && (
                            <Badge className="bg-school-yellow-100 text-school-yellow-700">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl line-clamp-2">
                          {post.title}
                        </CardTitle>
                        {post.excerpt && (
                          <CardDescription className="line-clamp-2">
                            {post.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          {post.author && (
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="h-4 w-4 mr-1" />
                              {post.author.name}
                            </div>
                          )}
                          <Link to={`/blog/${post.slug.current}`}>
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

      {/* CTA Section */}
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
