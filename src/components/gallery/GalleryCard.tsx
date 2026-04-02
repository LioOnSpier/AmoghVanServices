import React from "react";
import { Badge } from "@/components/ui/badge";
import { FeatureTag, GalleryFeature } from "@/data/gallery";
import { motion } from "framer-motion";

interface GalleryCardProps {
  feature: GalleryFeature;
  onClick: (feature: GalleryFeature) => void;
}

const tagColors: Record<FeatureTag, string> = {
  safety: "bg-school-red-100 text-school-red-700",
  monitoring: "bg-school-blue-100 text-school-blue-700",
  automation: "bg-purple-100 text-purple-700",
  comfort: "bg-school-green-100 text-school-green-700",
  exterior: "bg-gray-100 text-gray-700",
  interior: "bg-school-yellow-100 text-school-yellow-700",
};

export const GalleryCard: React.FC<GalleryCardProps> = ({ feature, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl border border-gray-100"
      onClick={() => onClick(feature)}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
        <img
          src={feature.imageUrl}
          alt={feature.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
             e.currentTarget.src = "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"; // Placeholder
          }}
        />
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 line-clamp-1">{feature.title}</h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{feature.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {feature.tags.map((tag) => (
            <Badge key={tag} className={`text-xs capitalize font-medium ${tagColors[tag] || "bg-gray-100 text-gray-700"} hover:${tagColors[tag]}`}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
