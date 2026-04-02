import React, { useState, useMemo } from "react";
import { galleryFeatures, FeatureTag, GalleryFeature } from "@/data/gallery";
import { GalleryCard } from "./GalleryCard";
import { GalleryModal } from "./GalleryModal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Search } from "lucide-react";

const ALL_TAGS: FeatureTag[] = ["safety", "monitoring", "automation", "comfort", "exterior", "interior"];

export const GalleryGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<FeatureTag | "all">("all");
  const [selectedFeature, setSelectedFeature] = useState<GalleryFeature | null>(null);

  const filteredFeatures = useMemo(() => {
    return galleryFeatures.filter((feature) => {
      const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            feature.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "all" || feature.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Controls Container */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-school-blue-500 transition-colors" />
          <Input
            type="text"
            placeholder="Search features (e.g. camera, layout)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-base bg-gray-50/50 border-gray-200 focus:border-school-blue-500 focus:ring-school-blue-500 rounded-xl w-full"
          />
        </div>

        {/* Filter Tags */}
        <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="h-4 w-4 text-gray-400 shrink-0 mr-1" />
          <Badge
             variant={selectedTag === "all" ? "default" : "outline"}
             className={`cursor-pointer px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${selectedTag === "all" ? 'bg-school-yellow-500 hover:bg-school-yellow-600 text-white' : 'hover:bg-gray-100 text-gray-600 border-gray-200'}`}
             onClick={() => setSelectedTag("all")}
          >
            All Features
          </Badge>
          {ALL_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className={`cursor-pointer capitalize px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                selectedTag === tag 
                  ? 'bg-school-yellow-500 hover:bg-school-yellow-600 text-white' 
                  : 'hover:bg-gray-100 text-gray-600 border-gray-200'
              }`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredFeatures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFeatures.map((feature) => (
            <GalleryCard 
              key={feature.id} 
              feature={feature} 
              onClick={(f) => setSelectedFeature(f)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-8">
          <p className="text-xl text-gray-500 font-medium">No features found matching your criteria</p>
          <button 
             onClick={() => { setSearchQuery(""); setSelectedTag("all"); }}
             className="mt-4 text-school-blue-600 hover:text-school-blue-700 font-semibold underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Modal View */}
      <GalleryModal
        feature={selectedFeature}
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
};
