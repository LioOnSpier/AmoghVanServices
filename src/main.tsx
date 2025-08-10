import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error handlers to prevent console spam and crashes
window.addEventListener('unhandledrejection', (event) => {
  // Check if it's a WordPress-related fetch error
  const reason = event.reason;
  const isWordPressError = reason && (
    (reason.message && reason.message.includes('fetch')) ||
    (reason.stack && reason.stack.includes('wordpress')) ||
    (reason.stack && reason.stack.includes('WordPressAPI')) ||
    (typeof reason === 'string' && reason.includes('Failed to fetch'))
  );

  if (isWordPressError) {
    // Prevent the default error logging for WordPress fetch failures
    event.preventDefault();

    // Only log in development
    if (import.meta.env.DEV) {
      console.warn('WordPress fetch failed (expected for free accounts):', reason?.message || reason);
    }
  }
});

window.addEventListener('error', (event) => {
  // Check if it's a WordPress-related error
  const isWordPressError = event.message && (
    event.message.includes('fetch') ||
    event.message.includes('wordpress') ||
    event.message.includes('WordPressAPI')
  );

  if (isWordPressError) {
    // Prevent the default error logging for WordPress fetch failures
    event.preventDefault();

    // Only log in development
    if (import.meta.env.DEV) {
      console.warn('WordPress error (expected for free accounts):', event.message);
    }
  }
});

createRoot(document.getElementById("root")!).render(<App />);
