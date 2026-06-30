import Hero from "@/components/Hero";
import Board from "@/components/Board";
import Record from "@/components/Record";
import ProofGallery from "@/components/ProofGallery";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Closer from "@/components/Closer";
import MobileBuyBar from "@/components/MobileBuyBar";

export default function Home() {
  return (
    <>
      {/* Section order is CLIENT-DIRECTED (Bake, 2026-06-review):
          hero → packages → today's board → real slips, then the deeper
          story sections. The buy action sits one screen from the top:
          "I want this ready to buy. Click, click, card." */}
      <Hero />
      <Pricing />
      <Board />
      <ProofGallery />
      <Record />
      <About />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Closer />
      <MobileBuyBar />
    </>
  );
}
