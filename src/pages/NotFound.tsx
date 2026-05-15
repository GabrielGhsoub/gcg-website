import type { ReactElement } from 'react'

import { Link } from 'react-router-dom'
import { FaArrowLeft, FaCompass, FaEnvelope, FaFlask } from 'react-icons/fa'

import PageTransition from '@components/PageTransition'
import ScienceBackdrop from '@components/ScienceBackdrop'
import { ROUTES } from '@shared/constants/routes'
import { useSEO } from '@shared/hooks'

function NotFound(): ReactElement {
  useSEO({
    title: 'Page Not Found | GCG',
    description:
      'The requested GCG page could not be found. Return home, explore services, or contact Ghoussoub Consulting Group.',
    canonicalPath: ROUTES.HOME,
    noIndex: true,
  })

  return (
    <PageTransition>
      <section className="theme-inverse relative min-h-[72vh] overflow-hidden pt-32 pb-20">
        <ScienceBackdrop variant="dark" density="rich" />

        <div className="relative mx-auto max-w-5xl px-6 text-center md:px-12">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold">
            <FaCompass className="h-8 w-8" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">Error 404</p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--text-inverse)] md:text-6xl">
            This Page Drifted Out Of Orbit
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-inverse-muted)] md:text-lg">
            The link may have changed, the route may be incomplete, or the page may not exist yet.
            Here are the quickest paths back into the site.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link
              to={ROUTES.HOME}
              className="group rounded-2xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] p-5 text-left backdrop-blur-sm transition-colors hover:border-gold/35 hover:bg-[var(--surface-control-hover)]"
              data-umami-event="404-home"
            >
              <FaArrowLeft className="mb-4 h-5 w-5 text-gold transition-transform group-hover:-translate-x-1" />
              <h2 className="font-bold text-[var(--text-inverse)]">Return Home</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-inverse-muted)]">
                Go back to the main GCG homepage.
              </p>
            </Link>

            <Link
              to={ROUTES.RESEARCH}
              className="group rounded-2xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] p-5 text-left backdrop-blur-sm transition-colors hover:border-gold/35 hover:bg-[var(--surface-control-hover)]"
              data-umami-event="404-research"
            >
              <FaFlask className="mb-4 h-5 w-5 text-gold transition-transform group-hover:scale-110" />
              <h2 className="font-bold text-[var(--text-inverse)]">Explore R&D</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-inverse-muted)]">
                Review applied research and development services.
              </p>
            </Link>

            <Link
              to={`${ROUTES.HOME}#contact`}
              className="group rounded-2xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] p-5 text-left backdrop-blur-sm transition-colors hover:border-gold/35 hover:bg-[var(--surface-control-hover)]"
              data-umami-event="404-contact"
            >
              <FaEnvelope className="mb-4 h-5 w-5 text-gold transition-transform group-hover:scale-110" />
              <h2 className="font-bold text-[var(--text-inverse)]">Contact GCG</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-inverse-muted)]">
                Ask for the right service path directly.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default NotFound
