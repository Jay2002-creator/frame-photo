import LandingHero from "../components/LandingHero";
import FrameGallery from "../components/FrameGallery";
import FrameStudio from "../components/FrameStudio";
import FrameShowcase from "../components/FrameShowcase";

export default function Home() {
  return (
    <main>
      <LandingHero />
      <FrameGallery />
      <section id="studio">
        <FrameStudio />
      </section>
      <FrameShowcase />
    </main>
  );
}
