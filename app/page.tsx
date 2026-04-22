import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { About } from "@/components/about";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Features />
        <About />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
