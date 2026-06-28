import Hero from "@/components/Hero";
import Board from "@/components/Board";
import Record from "@/components/Record";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Closer from "@/components/Closer";

export default function Home() {
  return (
    <>
      <Hero />
      <Board />
      <Record />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Closer />
    </>
  );
}
