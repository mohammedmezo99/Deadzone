import { Metadata } from "next";
import { AboutContent } from "@/sections/about-content";

export const metadata: Metadata = {
  title: "About | DeadZone",
  description: "Learn about DeadZone, our vision, goals, and philosophy behind DeadZone.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <AboutContent />
    </div>
  );
}
