import { useEffect } from "react";
import {
  Hero,
  LogoBanner,
  About,
  Services,
  Process,
  Mission,
  WhyChooseUs,
  Testimonials,
  Contact,
  PageTransition,
} from "@components/index";

function Home() {
  useEffect(() => {
    document.title = "GCG | Ghoussoub Consulting Group";
  }, []);

  return (
    <PageTransition>
      <Hero />
      <LogoBanner />
      <About />
      <Services />
      <Process />
      <Mission />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </PageTransition>
  );
}

export default Home;
