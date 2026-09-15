import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { Toolkit } from "@/components/sections/Toolkit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Expertise />
      <Experience />
      <Toolkit />
      <Credentials />
      {/* Renders nothing until practice.ts has real quotes in it. */}
      <Testimonials />
      <Contact />
    </>
  );
}
