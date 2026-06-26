import { Metadata } from "next";
import { HeroSection } from "@/sections/hero-section";
import { IntroSection } from "@/sections/intro-section";
import { PreviewSection } from "@/sections/preview-section";
import { CTASection } from "@/sections/cta-section";
import { StatsSection } from "@/sections/stats-section";

export const metadata: Metadata = {
  title: "DeadZone | DeadZone - Performance Beyond Limits",
  description: "Custom Android ROM for MediaTek Xiaomi/Redmi/Poco devices. Experience performance beyond limits with DeadZone.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <IntroSection />
      <PreviewSection />
      <CTASection />
    </>
  );
}
