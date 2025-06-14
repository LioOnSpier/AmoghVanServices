import { Button } from "@/components/ui/button";
import { Bus, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="bg-school-yellow-500 p-3 rounded-lg">
            <Bus className="h-8 w-8 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 font-manrope">
            Amogh Van/Bus Services
          </span>
        </div>

        {/* 404 Animation */}
        <div className="relative">
          <div className="text-9xl font-bold text-school-yellow-500 opacity-20">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce">
              <Bus className="h-16 w-16 text-school-blue-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 font-manrope">
            Route Not Found
          </h1>
          <p className="text-lg text-gray-600">
            Looks like this page took a wrong turn! Our buses know the way
            better than our website sometimes.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="btn-primary flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="outline"
              className="border-school-blue-500 text-school-blue-600 hover:bg-school-blue-50 flex items-center"
            >
              <Bus className="mr-2 h-5 w-5" />
              Register Student
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t border-gray-200 max-w-md mx-auto">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{" "}
            <a
              href="tel:9870525637"
              className="text-school-blue-600 hover:underline"
            >
              9870525637
            </a>{" "}
            /{" "}
            <a
              href="tel:9321025627"
              className="text-school-blue-600 hover:underline"
            >
              9321025627
            </a>{" "}
            or{" "}
            <a
              href="mailto:info@amoghservices.com"
              className="text-school-blue-600 hover:underline"
            >
              info@amoghservices.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
