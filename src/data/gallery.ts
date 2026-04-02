import { z } from "zod";

export const FeatureTagSchema = z.enum([
  "safety",
  "monitoring",
  "automation",
  "comfort",
  "exterior",
  "interior",
]);

export type FeatureTag = z.infer<typeof FeatureTagSchema>;

export interface GalleryFeature {
  id: string;
  title: string;
  description: string;
  tags: FeatureTag[];
  imageUrl: string;
}

export const galleryFeatures: GalleryFeature[] = [
  {
    id: "f1",
    title: "Compact Van Interior & Emergency Exit",
    description:
      "Premium and clean interior layout for our smaller vans. Features high-quality cushioned seating, ample legroom, safety grills on all windows, and a clearly marked emergency exit door for rapid evacuation in case of any emergency.",
    tags: ["interior", "comfort", "safety"],
    imageUrl: "/gallery/van-interior.jpg",
  },
  {
    id: "f2",
    title: "Amogh School Bus – Force Vehicle Exterior",
    description:
      "Our reliable and robust Force school buses are easily identifiable with the bold 'AMOGH' branding and regulation yellow paint, ensuring high visibility on the road. Built to meet all RTO safety standards with sturdy construction and modern headlamp design.",
    tags: ["exterior", "safety"],
    imageUrl: "/gallery/bus-exterior.jpg",
  },
  {
    id: "f3",
    title: "360° Surveillance Camera System",
    description:
      "State-of-the-art 360-degree monitoring camera ceiling-mounted inside the cabin. Provides real-time, comprehensive video coverage of the vehicle interior for maximum student safety, driver accountability, and parent peace of mind.",
    tags: ["monitoring", "automation", "safety"],
    imageUrl: "/gallery/360-camera.jpg",
  },
  {
    id: "f4",
    title: "Fire Alarm & LED Lighting System",
    description:
      "Our buses are equipped with a red fire alarm sensor mounted on the ceiling along with bright, energy-efficient LED tube lights that ensure clear visibility at all times. The alarm is linked to an instant alert system for immediate response in emergencies.",
    tags: ["safety", "interior"],
    imageUrl: "/gallery/fire-alarm-system.jpg",
  },
  {
    id: "f5",
    title: "Spacious Bus Seating & Safety Poles",
    description:
      "Comfortable dual-tone blue and yellow seating arrangement designed for larger student capacities. Sturdy yellow grab poles line the aisle for safe movement while the bus is in motion, paired with overhead safety grills on all windows.",
    tags: ["interior", "comfort", "safety"],
    imageUrl: "/gallery/bus-interior.jpg",
  },
  {
    id: "f6",
    title: "First Aid Kit, Smoke Detector & Safety Setup",
    description:
      "A comprehensive safety station visible from the driver's area, featuring a wall-mounted first aid kit with medical cross marking, a ceiling-mounted smoke detector, fire alarm indicator, and bright LED lighting — ensuring readiness for any on-road emergency.",
    tags: ["safety", "monitoring", "interior"],
    imageUrl: "/gallery/first-aid-safety.jpg",
  },
];
