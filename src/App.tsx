import Nav from "@/components/ui/Nav";
import Hero from "@/sections/Hero";
import Context from "@/sections/Context";
import Struggle from "@/sections/Struggle";
import Resistance from "@/sections/Resistance";
import Victory from "@/sections/Victory";
import Lessons from "@/sections/Lessons";
import Footer from "@/sections/Footer";
import Game from "@/pages/Game";
import { useRoute } from "@/lib/router";

function Home() {
  return (
    <main className="relative bg-cream text-ink">
      <Nav />
      <Hero />
      <Context />
      <Struggle />
      <Resistance />
      <Victory />
      <Lessons />
      <Footer />
    </main>
  );
}

export default function App() {
  const path = useRoute();
  if (path === "/game" || path === "/game/") return <Game />;
  return <Home />;
}
