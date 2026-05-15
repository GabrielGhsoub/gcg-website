import type { ReactElement } from 'react'

import About from '@components/About'
import Contact from '@components/Contact'
import ExpertiseStandards from '@components/ExpertiseStandards'
import Hero from '@components/Hero'
import LogoBanner from '@components/LogoBanner'
import Mission from '@components/Mission'
import PageTransition from '@components/PageTransition'
import Pathways from '@components/Pathways'
import Process from '@components/Process'
import RepresentativeWork from '@components/RepresentativeWork'
import Services from '@components/Services'
import Testimonials from '@components/Testimonials'
import WhyChooseUs from '@components/WhyChooseUs'
import { ROUTES } from '@shared/constants/routes'
import { useSEO } from '@shared/hooks'
import { organizationJsonLd, websiteJsonLd } from '@shared/seo'

const homeJsonLd = [organizationJsonLd, websiteJsonLd]

function Home(): ReactElement {
  useSEO({
    title: 'GCG | Ghoussoub Consulting Group',
    description:
      'Ghoussoub Consulting Group provides science-driven consulting, R&D collaboration, and STEM tutoring for organizations, researchers, and learners.',
    canonicalPath: ROUTES.HOME,
    jsonLd: homeJsonLd,
  })

  return (
    <PageTransition>
      <Hero />
      <LogoBanner />
      <Pathways />
      <About />
      <Services />
      <Process />
      <RepresentativeWork />
      <Mission />
      <WhyChooseUs />
      <ExpertiseStandards />
      <Testimonials />
      <Contact />
    </PageTransition>
  )
}

export default Home
