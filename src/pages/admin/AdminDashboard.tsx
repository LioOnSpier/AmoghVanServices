import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  PlusCircle,
  LogOut,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getAllBlogsAdmin, deleteBlog, Blog } from "@/lib/firestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogsAdmin();
      setBlogs(data);
    } catch (err) {
      toast.error("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
    toast.success("Logged out successfully.");
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success(`"${title}" deleted successfully.`);
    } catch {
      toast.error("Failed to delete blog post.");
    }
  };

  const formatDate = (ts: import("firebase/firestore").Timestamp | null) => {
    if (!ts) return "—";
    return ts.toDate().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Navbar */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Amogh Van/Bus Services Logo" className="h-10 w-10 object-contain rounded-lg" />
          <div>
            <h1 className="font-bold text-lg text-white font-manrope">
              Blog Admin Panel
            </h1>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Eye className="h-4 w-4 mr-2" />
              View Site
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Total Posts",
              value: blogs.length,
              icon: FileText,
              color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
            },
            {
              label: "Published",
              value: blogs.filter((b) => b.status === "Published").length,
              icon: Eye,
              color: "from-green-500/20 to-green-600/10 border-green-500/30",
            },
            {
              label: "Drafts",
              value: blogs.filter((b) => b.status === "Draft").length,
              icon: EyeOff,
              color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} border rounded-xl p-6 flex items-center gap-4`}
            >
              <stat.icon className="h-8 w-8 text-white/70" />
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-school-yellow-400" />
            <h2 className="text-xl font-semibold text-white">All Blog Posts</h2>
          </div>
          <Link to="/admin/blog/new">
            <Button className="bg-school-yellow-500 hover:bg-school-yellow-600 text-white font-semibold">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </Link>
        </div>

        {/* Blog Table */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-school-yellow-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-400">Loading blogs…</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800">
            <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first blog post to get started.
            </p>
            <Link to="/admin/blog/new">
              <Button className="bg-school-yellow-500 hover:bg-school-yellow-600 text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-800/60">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">
                      Title
                    </th>
                    <th className="text-left px-4 py-4 text-gray-400 font-medium">
                      Status
                    </th>
                    <th className="text-left px-4 py-4 text-gray-400 font-medium hidden md:table-cell">
                      Created
                    </th>
                    <th className="text-left px-4 py-4 text-gray-400 font-medium hidden lg:table-cell">
                      Published
                    </th>
                    <th className="text-right px-6 py-4 text-gray-400 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, i) => (
                    <tr
                      key={blog.id}
                      className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${
                        i === blogs.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            /blog/{blog.slug}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge
                          className={
                            blog.status === "Published"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          }
                        >
                          {blog.status === "Published" ? (
                            <Eye className="h-3 w-3 mr-1" />
                          ) : (
                            <EyeOff className="h-3 w-3 mr-1" />
                          )}
                          {blog.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-gray-400 hidden md:table-cell">
                        {formatDate(blog.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-gray-400 hidden lg:table-cell">
                        {formatDate(blog.publishedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {blog.status === "Published" && (
                            <Link to={`/blog/${blog.slug}`} target="_blank">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                          <Link to={`/admin/blog/edit/${blog.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-900 border-gray-800">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">
                                  Delete Blog Post?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  This will permanently delete "{blog.title}".
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDelete(blog.id, blog.title)
                                  }
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
