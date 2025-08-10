import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error handlers to prevent console spam and crashes
window.addEventListener('unhandledrejection', (event) => {
  // Check if it's a WordPress.com CORS or fetch error
  const reason = event.reason;
  const isWordPressComError = reason && (
    (reason.message && (
      reason.message.includes('wordpress.com') ||
      reason.message.includes('CORS policy') ||
      reason.message.includes('Access-Control-Allow-Origin') ||
      reason.message.includes('Failed to fetch')
    )) ||
    (reason.stack && (
      reason.stack.includes('wordpress.com') ||
      reason.stack.includes('safe-fetch.ts') ||
      reason.stack.includes('WordPressAPI')
    )) ||
    (typeof reason === 'string' && (
      reason.includes('wordpress.com') ||
      reason.includes('CORS') ||
      reason.includes('Failed to fetch')
    ))
  );

  if (isWordPressComError) {
    // Completely prevent the error from appearing in console
    event.preventDefault();
    event.stopPropagation();

    // Don't log anything in production, minimal log in development
    if (import.meta.env.DEV) {
      console.info('WordPress.com API unavailable (using RSS fallback)');
    }
  }
});

window.addEventListener('error', (event) => {
  // Check if it's a WordPress.com related error
  const isWordPressComError = event.message && (
    event.message.includes('wordpress.com') ||
    event.message.includes('CORS') ||
    event.message.includes('Access-Control-Allow-Origin') ||
    event.message.includes('safe-fetch') ||
    event.message.includes('fetch')
  );

  if (isWordPressComError) {
    // Completely prevent the error from appearing in console
    event.preventDefault();
    event.stopPropagation();
  }
});

// Override console methods to suppress WordPress.com CORS errors
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  const message = args.join(' ');
  if (message.includes('wordpress.com') ||
      message.includes('CORS policy') ||
      message.includes('Access-Control-Allow-Origin') ||
      message.includes('safe-fetch.ts')) {
    // Suppress WordPress.com related errors
    return;
  }
  originalError.apply(console, args);
};

console.warn = (...args) => {
  const message = args.join(' ');
  if (message.includes('wordpress.com') ||
      message.includes('CORS policy') ||
      message.includes('Access-Control-Allow-Origin')) {
    // Suppress WordPress.com related warnings
    return;
  }
  originalWarn.apply(console, args);
};

createRoot(document.getElementById("root")!).render(<App />);
