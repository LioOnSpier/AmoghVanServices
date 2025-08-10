// Safe fetch wrapper that suppresses expected WordPress.com errors
export async function safeFetch(url: string, options?: RequestInit): Promise<Response | null> {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers,
      }
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    // Suppress all fetch-related errors for WordPress.com
    // This is expected behavior for free WordPress.com accounts
    return null;
  }
}

// Safe fetch for RSS feeds with longer timeout
export async function safeRssFetch(url: string, options?: RequestInit): Promise<Response | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for RSS
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        ...options?.headers,
      }
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    // Suppress all RSS fetch errors
    return null;
  }
}
