import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Simple admin credentials (In production, use proper authentication)
const ADMIN_CREDENTIALS = {
  username: "admin", // Change this to your desired username
  password: "amogh@2025", // Change this to a secure password
};

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Store admin session (in production, use proper JWT tokens)
      localStorage.setItem("amogh_admin_logged_in", "true");
      localStorage.setItem("amogh_admin_login_time", Date.now().toString());

      toast.success("Welcome back! Redirecting to admin panel...");

      // Redirect to WordPress Admin (update with your WordPress site)
      window.location.href = "https://your-wordpress-site.com/wp-admin"; // Replace with your WordPress admin URL
    } else {
      toast.error("Invalid credentials. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-4">
            <div className="bg-school-yellow-500 p-3 rounded-lg">
              <Bus className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-manrope">
              Amogh Van/Bus Services
            </span>
          </Link>
          <Badge className="bg-red-100 text-red-700">
            <Shield className="w-4 h-4 mr-2" />
            Admin Access Only
          </Badge>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-gray-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Login
            </CardTitle>
            <CardDescription>
              Access the blog management system
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    required
                    className="mt-1"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-school-blue-600 hover:bg-school-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Sign In to Admin Panel
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-yellow-800 mb-1">
                    Security Notice
                  </p>
                  <p className="text-yellow-700">
                    This area is restricted to authorized administrators only.
                    All access attempts are logged.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>&copy; 2025 Amogh Van/Bus Services. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
