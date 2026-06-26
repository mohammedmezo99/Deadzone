import { Metadata } from "next";
import { FeaturesList } from "@/sections/features-list";
import { ComparisonTable } from "@/sections/comparison-table";
import { ScreenshotsGallery } from "@/sections/screenshots-gallery";

export const metadata: Metadata = {
  title: "Features | DeadZone",
  description: "Explore the powerful features of DeadZone. Performance, battery life, gaming, and more.",
};

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-blue-400 font-medium mb-4 block">Features</span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Everything You Need
          </h1>
          <p className="text-lg text-muted-foreground">
            DeadZone is packed with features designed to enhance your Android experience. 
            From performance optimizations to gaming enhancements, we have got you covered.
          </p>
        </div>
      </div>

      <ScreenshotsGallery />
      <FeaturesList />
      <ComparisonTable />
    </div>
  );
}
