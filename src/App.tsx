import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const StudentRegistration = lazy(() => import("./pages/StudentRegistration"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-school-blue-500" />
    <span className="ml-2 text-lg">Loading...</span>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/AmoghVanServices">
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<LoadingFallback />}>
              <Index />
            </Suspense>
          } />
          <Route path="/register" element={
            <Suspense fallback={<LoadingFallback />}>
              <StudentRegistration />
            </Suspense>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
