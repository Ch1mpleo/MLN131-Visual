import Nav from "@/components/ui/Nav";
import Hero from "@/sections/Hero";
import Terminology from "@/sections/Terminology";
import Viewpoints from "@/sections/Viewpoints";
import DemocracyTimeline from "@/sections/DemocracyTimeline";
import Conclusion from "@/sections/Conclusion";
import AIClassifier from "@/sections/AIClassifier";
import Footer from "@/sections/Footer";

export default function App() {
  return (
    <main className="relative bg-cream text-ink">
      <Nav />
      <Hero />
      <Terminology />
      <Viewpoints />
      <DemocracyTimeline />
      <Conclusion />
      <AIClassifier />
      <Footer />
    </main>
  );
}
