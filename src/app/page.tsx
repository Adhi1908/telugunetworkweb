import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameModes from "@/components/GameModes";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowToJoin from "@/components/HowToJoin";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-surface-900">
      <Navbar />
      <Hero />
      <GameModes />
      <Stats />
      <Features />
      <HowToJoin />
      <Community />
      <Footer />
    </main>
  );
}
