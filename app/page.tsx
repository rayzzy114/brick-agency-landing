import { MotionProvider } from "@/components/motion/MotionProvider";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { WorksSection } from "@/components/sections/WorksSection";
import { DevSection } from "@/components/sections/DevSection";
import { Reviews } from "@/components/sections/Reviews";
import { TelegramCta } from "@/components/sections/TelegramCta";
import { Footer } from "@/components/layout/Footer";
import { TabBar } from "@/components/layout/TabBar";

export default function Home() {
  const noanim = process.env.NEXT_PUBLIC_DISABLE_ANIMATIONS === "1";

  return (
    <MotionProvider disabled={noanim}>
      <Header />
      <main className="min-h-screen bg-rd-bg-default">
        <Hero />
        <WorksSection />
        <DevSection />
        <Reviews />
        <TelegramCta />
      </main>
      <Footer />
      <TabBar />
    </MotionProvider>
  );
}
