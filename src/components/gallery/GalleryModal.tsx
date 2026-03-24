import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { GalleryFeature, FeatureTag } from "@/data/gallery";
import { Shield, Info } from "lucide-react";

interface GalleryModalProps {
  feature: GalleryFeature | null;
  isOpen: boolean;
  onClose: () => void;
}

const tagColors: Record<FeatureTag, string> = {
  safety: "bg-school-red-100 text-school-red-700",
  monitoring: "bg-school-blue-100 text-school-blue-700",
  automation: "bg-purple-100 text-purple-700",
  comfort: "bg-school-green-100 text-school-green-700",
  exterior: "bg-gray-100 text-gray-700",
  interior: "bg-school-yellow-100 text-school-yellow-700",
};

export const GalleryModal: React.FC<GalleryModalProps> = ({ feature, isOpen, onClose }) => {
  if (!feature) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl sm:rounded-2xl sm:max-w-[800px]">
        <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
          {/* Image Section */}
          <div className="relative bg-black items-center justify-center flex overflow-hidden min-h-[300px] md:min-h-full">
            <img
              src={feature.imageUrl}
              alt={feature.title}
              className="w-full h-full object-cover sm:object-contain"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"; 
             }}
            />
          </div>

          {/* Details Section */}
          <div className="p-8 flex flex-col items-start overflow-y-auto">
            <DialogHeader className="text-left w-full space-y-3">
              <div className="flex flex-wrap gap-2 mb-2">
                {feature.tags.map((tag) => (
                  <Badge key={tag} className={`text-xs capitalize font-medium ${tagColors[tag] || "bg-gray-100"} hover:${tagColors[tag]}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <DialogTitle className="text-2xl font-bold font-manrope text-gray-900 leading-tight">
                {feature.title}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-6 flex-grow space-y-6 text-gray-600">
              <p className="text-base leading-relaxed">{feature.description}</p>

              <div className="bg-school-blue-50 border border-school-blue-100 p-4 rounded-xl flex items-start space-x-3">
                <Info className="w-5 h-5 text-school-blue-600 mt-0.5" />
                <p className="text-sm text-school-blue-900">
                  This feature is part of our commitment to ensuring the highest standards of safety, monitorability, and comfort for all students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
