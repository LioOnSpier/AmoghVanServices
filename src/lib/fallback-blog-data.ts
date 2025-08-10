// Fallback blog data for when WordPress.com API and RSS are unavailable
// This ensures users always see relevant content about school transportation

export const fallbackBlogPosts = [
  {
    id: 1,
    date: "2024-12-01T10:00:00Z",
    slug: "safe-school-transportation-mumbai",
    title: {
      rendered: "Safe School Transportation: Our Commitment to Your Child's Safety"
    },
    content: {
      rendered: `
        <p>At Amogh Van/Bus Services, your child's safety is our top priority. With over 15 years of experience in Mumbai's school transportation sector, we have developed comprehensive safety protocols that ensure every journey is secure and comfortable.</p>
        
        <h3>Our Safety Measures</h3>
        <ul>
          <li><strong>Trained and Licensed Drivers:</strong> All our drivers undergo rigorous background checks and safety training</li>
          <li><strong>GPS Tracking:</strong> Real-time location monitoring for complete transparency</li>
          <li><strong>Regular Vehicle Maintenance:</strong> Scheduled inspections and maintenance to ensure roadworthiness</li>
          <li><strong>Emergency Protocols:</strong> Clear procedures for handling any emergency situations</li>
          <li><strong>First Aid Equipment:</strong> All vehicles equipped with basic first aid supplies</li>
        </ul>
        
        <p>We serve families across Prabhadevi, Dadar West, and surrounding areas with a 100% safety record. Contact us at 9870525637 to learn more about our services.</p>
      `
    },
    excerpt: {
      rendered: "Learn about Amogh Van/Bus Services' comprehensive safety measures and commitment to providing the safest school transportation in Mumbai."
    },
    featured_image_url: "/placeholder-blog-1.jpg",
    author_info: {
      name: "Amogh Van Services Team"
    },
    category_names: ["Safety Tips", "Service Information"],
    reading_time: 3
  },
  {
    id: 2,
    date: "2024-11-28T09:00:00Z",
    slug: "new-routes-prabhadevi-dadar",
    title: {
      rendered: "New Routes Added in Prabhadevi and Dadar West Areas"
    },
    content: {
      rendered: `
        <p>We're excited to announce the expansion of our school transportation services with new routes covering additional areas in Prabhadevi and Dadar West.</p>
        
        <h3>New Coverage Areas</h3>
        <p>Our expanded service now includes:</p>
        <ul>
          <li>Extended coverage in Prabhadevi residential complexes</li>
          <li>Additional pickup points in Dadar West</li>
          <li>Improved connectivity to major schools in the area</li>
          <li>Flexible timing options for different school schedules</li>
        </ul>
        
        <h3>Why Choose Amogh Van/Bus Services?</h3>
        <ul>
          <li>15+ years of trusted service in Mumbai</li>
          <li>500+ satisfied families</li>
          <li>GPS tracking and real-time updates</li>
          <li>Trained and professional drivers</li>
          <li>Competitive pricing with transparent billing</li>
        </ul>
        
        <p>To check if your area is covered or to register for our services, call us at 9870525637 or 9321025627.</p>
      `
    },
    excerpt: {
      rendered: "Amogh Van/Bus Services expands coverage with new routes in Prabhadevi and Dadar West, offering more convenient pickup points for families."
    },
    featured_image_url: "/placeholder-blog-2.jpg",
    author_info: {
      name: "Rajesh Kumar J Kharwar"
    },
    category_names: ["Service Updates", "News"],
    reading_time: 2
  },
  {
    id: 3,
    date: "2024-11-25T08:30:00Z",
    slug: "parent-guide-school-transport",
    title: {
      rendered: "Parent's Guide to Choosing Safe School Transportation"
    },
    content: {
      rendered: `
        <p>Choosing the right school transportation service is crucial for your child's safety and your peace of mind. Here's what every parent should consider when selecting a school transport service in Mumbai.</p>
        
        <h3>Key Factors to Consider</h3>
        
        <h4>1. Safety Record and Protocols</h4>
        <ul>
          <li>Check the service provider's safety track record</li>
          <li>Ensure all drivers are properly licensed and trained</li>
          <li>Verify that vehicles undergo regular safety inspections</li>
          <li>Ask about emergency response procedures</li>
        </ul>
        
        <h4>2. Vehicle Condition and Maintenance</h4>
        <ul>
          <li>Inspect the vehicles for cleanliness and maintenance</li>
          <li>Check for proper safety equipment (first aid, fire extinguisher)</li>
          <li>Ensure vehicles have valid permits and insurance</li>
        </ul>
        
        <h4>3. Communication and Transparency</h4>
        <ul>
          <li>GPS tracking capabilities for real-time location updates</li>
          <li>Clear communication channels with the service provider</li>
          <li>Regular updates about any schedule changes</li>
        </ul>
        
        <h4>4. Experience and Reputation</h4>
        <ul>
          <li>Years of experience in school transportation</li>
          <li>References from other parents and schools</li>
          <li>Professional approach to service delivery</li>
        </ul>
        
        <p>At Amogh Van/Bus Services, we meet all these criteria and more. Contact us for a consultation and see why we're Mumbai's trusted choice for school transportation.</p>
      `
    },
    excerpt: {
      rendered: "A comprehensive guide for parents on choosing safe and reliable school transportation services in Mumbai, covering key safety and quality factors."
    },
    featured_image_url: "/placeholder-blog-3.jpg",
    author_info: {
      name: "Amogh Van Services Team"
    },
    category_names: ["Parent Resources", "Safety Tips"],
    reading_time: 4
  }
];

export const fallbackFeaturedPosts = fallbackBlogPosts.slice(0, 3);

// Convert fallback data to WordPress format for consistency
export function getFallbackPosts(limit?: number): any[] {
  const posts = limit ? fallbackBlogPosts.slice(0, limit) : fallbackBlogPosts;
  return posts.map(post => ({
    ...post,
    date_gmt: post.date,
    modified: post.date,
    status: 'publish',
    author: 1,
    featured_media: 0,
    comment_status: 'closed',
    categories: [1],
    tags: [],
    meta: {},
    _links: {}
  }));
}

export function getFallbackPostBySlug(slug: string): any | null {
  const post = fallbackBlogPosts.find(p => p.slug === slug);
  if (!post) return null;
  
  return {
    ...post,
    date_gmt: post.date,
    modified: post.date,
    status: 'publish',
    author: 1,
    featured_media: 0,
    comment_status: 'closed',
    categories: [1],
    tags: [],
    meta: {},
    _links: {}
  };
}
