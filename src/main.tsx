import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error handlers to prevent console spam and crashes
window.addEventListener('unhandledrejection', (event) => {
  // Check if it's a network-related error
  if (event.reason && event.reason.message && event.reason.message.includes('fetch')) {
    // Prevent the default error logging for fetch failures
    event.preventDefault();

    // Only log in development
    if (import.meta.env.DEV) {
      console.warn('Network request failed (expected for WordPress.com):', event.reason.message);
    }
  }
});

window.addEventListener('error', (event) => {
  // Check if it's a network-related error
  if (event.message && event.message.includes('fetch')) {
    // Prevent the default error logging for fetch failures
    event.preventDefault();

    // Only log in development
    if (import.meta.env.DEV) {
      console.warn('Network error (expected for WordPress.com):', event.message);
    }
  }
});

createRoot(document.getElementById("root")!).render(<App />);
