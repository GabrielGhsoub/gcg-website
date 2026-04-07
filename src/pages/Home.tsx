import { useEffect } from "react";
import Hero from "../components/Hero";
import LogoBanner from "../components/LogoBanner";
import About from "../components/About";
import Services from "../components/Services";
import Process from "../components/Process";
import Mission from "../components/Mission";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import PageTransition from "../components/PageTransition";

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
