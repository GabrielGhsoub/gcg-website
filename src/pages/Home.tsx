import type { ReactElement } from "react";

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
import { usePageTitle } from "@shared/hooks";

function Home(): ReactElement {
  usePageTitle("GCG | Ghoussoub Consulting Group");

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
