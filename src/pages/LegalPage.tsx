import type { ReactElement } from 'react'

import { Link, useLocation } from 'react-router-dom'
import { FaBalanceScale, FaEnvelope, FaShieldAlt, FaUniversalAccess } from 'react-icons/fa'

import PageTransition from '@components/PageTransition'
import ScienceBackdrop from '@components/ScienceBackdrop'
import { CONTACT_EMAIL } from '@shared/constants/contact-info'
import { ROUTES } from '@shared/constants/routes'
import { useSEO } from '@shared/hooks'

interface LegalSection {
  title: string
  body: string[]
  bullets?: string[]
}

interface LegalDocument {
  title: string
  eyebrow: string
  description: string
  icon: typeof FaShieldAlt
  route: string
  sections: LegalSection[]
}

const EFFECTIVE_DATE = 'May 14, 2026'

const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  [ROUTES.PRIVACY]: {
    title: 'Privacy Policy',
    eyebrow: 'Privacy and data protection',
    description:
      'How GCG collects, uses, protects, and retains information submitted through the website and our service conversations.',
    icon: FaShieldAlt,
    route: ROUTES.PRIVACY,
    sections: [
      {
        title: 'Scope',
        body: [
          'This policy applies to information collected through the GCG website, contact forms, newsletter forms, service inquiries, recruiting conversations, and related business communications.',
          'When a signed client, research, tutoring, investor, or employment agreement applies, that agreement may include additional privacy and confidentiality terms.',
        ],
      },
      {
        title: 'Information We Collect',
        body: [
          'We collect information you choose to provide, such as your name, email address, phone number, organization, service interest, message content, CV materials, and newsletter subscription preferences.',
          'We may also receive basic technical information such as browser type, device type, referring page, and approximate region if hosting, security, analytics, or form-delivery providers make that information available.',
        ],
      },
      {
        title: 'How We Use Information',
        body: [
          'We use information to respond to inquiries, provide requested services, evaluate collaboration or career opportunities, operate the website, protect our systems, comply with legal obligations, and send updates when you ask to receive them.',
        ],
        bullets: [
          'Responding to contact, research, tutoring, investment, and recruiting requests.',
          'Preparing proposals, calls, project plans, or onboarding steps.',
          'Improving website reliability, accessibility, security, and user experience.',
          'Sending newsletters or updates with your consent, with unsubscribe options where applicable.',
        ],
      },
      {
        title: 'Legal Bases For EEA And UK Users',
        body: [
          'Where European or UK data protection law applies, we rely on consent, contract or pre-contract steps, legitimate interests, and legal obligations depending on the interaction.',
        ],
        bullets: [
          'Consent for optional newsletter signups and certain outreach preferences.',
          'Contract or pre-contract steps when you request services or partnership discussions.',
          'Legitimate interests for website security, business communications, service improvement, and fraud prevention.',
          'Legal obligations where recordkeeping, tax, regulatory, or compliance duties apply.',
        ],
      },
      {
        title: 'Sharing And International Transfers',
        body: [
          'We do not sell personal information. We may share information with trusted service providers that support website hosting, email, forms, analytics, security, professional advice, or business operations.',
          'Because GCG works internationally, information may be processed in Lebanon, France, the European Economic Area, the United States, or other locations used by our providers. When required, we use appropriate safeguards for international transfers.',
        ],
      },
      {
        title: 'Retention',
        body: [
          'We keep personal information only as long as needed for the purpose collected, including responding to your inquiry, maintaining business records, resolving disputes, meeting legal obligations, and protecting our rights.',
          'Newsletter data is kept until you unsubscribe or ask us to remove it. Recruiting materials may be retained for future opportunities unless you ask us to delete them where applicable law allows.',
        ],
      },
      {
        title: 'Your Choices And Rights',
        body: [
          'Depending on your location, you may have rights to access, correct, delete, restrict, object to processing, request portability, withdraw consent, or complain to a data protection authority.',
          'To make a request, contact us at the email below. We may need to verify your identity before completing a request.',
        ],
      },
      {
        title: 'Cookies And Local Storage',
        body: [
          'The website uses local storage to remember theme preference. The site may also use Umami analytics when configured, which is intended to measure page views, device/browser context, traffic sources, performance, and selected interaction events without advertising profiles or cross-site tracking.',
          'If tools that use advertising cookies, retargeting, or additional personal data are added later, this policy and any required consent controls should be updated before those tools are used.',
        ],
      },
      {
        title: 'Children And Students',
        body: [
          'Our website is not directed to children under 13. Tutoring services for minors should be arranged by a parent, guardian, school, or authorized adult.',
        ],
      },
      {
        title: 'Security',
        body: [
          'We use reasonable administrative, technical, and organizational safeguards designed to protect information. No website or electronic transmission is completely secure, so please avoid sending sensitive medical, financial, or confidential research information through general contact forms.',
        ],
      },
    ],
  },
  [ROUTES.TERMS]: {
    title: 'Terms of Use',
    eyebrow: 'Website terms',
    description:
      'The terms that apply when you browse this website, contact GCG, or use public website materials.',
    icon: FaBalanceScale,
    route: ROUTES.TERMS,
    sections: [
      {
        title: 'Using This Website',
        body: [
          'By using this website, you agree to these terms. If you do not agree, please do not use the website.',
          'These terms govern public website use only. Client, research, tutoring, investor, employment, or partnership work is governed by the applicable written agreement.',
        ],
      },
      {
        title: 'Website Content',
        body: [
          'Website content is provided for general informational purposes. It is not legal, financial, medical, scientific regulatory, investment, or professional advice.',
          'We aim to keep information accurate and current, but we do not guarantee that website content is complete, error-free, or suitable for your specific use case.',
        ],
      },
      {
        title: 'Services And Proposals',
        body: [
          'Submitting a contact form, newsletter request, CV, or project inquiry does not create a client relationship, employment relationship, investment relationship, or confidentiality obligation unless confirmed in a signed agreement.',
          'Any scope, timeline, fees, deliverables, research milestones, tutoring plan, or collaboration terms must be confirmed in writing.',
        ],
      },
      {
        title: 'Investment Information',
        body: [
          'Investment-related content is informational only and is not an offer to sell securities, solicitation to buy securities, or investment recommendation.',
          'Prospective investors should conduct independent diligence and consult qualified advisors before making decisions.',
        ],
      },
      {
        title: 'Acceptable Use',
        body: ['You agree not to misuse the website or interfere with its operation.'],
        bullets: [
          'Do not attempt unauthorized access, scanning, scraping, reverse engineering, or automated abuse.',
          'Do not submit unlawful, misleading, harmful, infringing, or confidential third-party content.',
          'Do not use the website in a way that violates applicable law or the rights of others.',
        ],
      },
      {
        title: 'Intellectual Property',
        body: [
          'The website design, text, graphics, logos, icons, and other materials are owned by GCG or its licensors unless otherwise stated.',
          'You may view and share public pages for ordinary informational use, but you may not copy, modify, resell, or republish website materials without permission.',
        ],
      },
      {
        title: 'Third-Party Links',
        body: [
          'The website may link to third-party websites or services. GCG is not responsible for third-party content, security, privacy practices, or availability.',
        ],
      },
      {
        title: 'Disclaimers And Liability',
        body: [
          'The website is provided as is and as available. To the fullest extent permitted by law, GCG disclaims implied warranties and is not liable for indirect, incidental, consequential, special, punitive, or lost-profit damages arising from public website use.',
          'Nothing in these terms limits liability that cannot legally be limited.',
        ],
      },
      {
        title: 'Changes',
        body: [
          'We may update these terms from time to time. The effective date above shows when the current version took effect.',
        ],
      },
    ],
  },
  [ROUTES.ACCESSIBILITY]: {
    title: 'Accessibility Statement',
    eyebrow: 'Inclusive access',
    description:
      "GCG's commitment to making the website usable for people with diverse devices, assistive technologies, and access needs.",
    icon: FaUniversalAccess,
    route: ROUTES.ACCESSIBILITY,
    sections: [
      {
        title: 'Our Commitment',
        body: [
          'GCG aims to provide a website that is usable, readable, and navigable for a broad range of visitors, including people using assistive technologies.',
          'We use accessibility best practices based on the Web Content Accessibility Guidelines, with a practical target of WCAG 2.2 AA where feasible for this website.',
        ],
      },
      {
        title: 'Measures We Take',
        body: [
          'Accessibility is considered during design, development, and QA. We review contrast, keyboard interaction, focus states, responsive behavior, form labels, semantic markup, and reduced-motion preferences.',
        ],
        bullets: [
          'Keyboard-visible controls for navigation, forms, theme switching, and calls to action.',
          'Semantic headings, labels, link text, and landmark-style page structure.',
          'Responsive layouts that avoid horizontal scrolling on common mobile widths.',
          'Color contrast checks across light and dark mode.',
          'Reduced-motion support for users who prefer less animation.',
        ],
      },
      {
        title: 'Known Limitations',
        body: [
          'Some decorative science animations may not communicate meaningful information and are intentionally hidden from assistive technology. We continue to review interactive and animated areas for performance and accessibility improvements.',
        ],
      },
      {
        title: 'Feedback',
        body: [
          'If you experience an accessibility barrier, email us with the page URL, the issue, your browser or device, and the assistive technology involved if relevant. We will review the report and prioritize practical fixes.',
        ],
      },
    ],
  },
}

const legalNav = [
  { label: 'Privacy', to: ROUTES.PRIVACY },
  { label: 'Terms', to: ROUTES.TERMS },
  { label: 'Accessibility', to: ROUTES.ACCESSIBILITY },
]

function LegalPage(): ReactElement {
  const { pathname } = useLocation()
  const legalDocument = LEGAL_DOCUMENTS[pathname] ?? LEGAL_DOCUMENTS[ROUTES.PRIVACY]
  const Icon = legalDocument.icon

  useSEO({
    title: `${legalDocument.title} | GCG`,
    description: legalDocument.description,
    canonicalPath: legalDocument.route,
  })

  return (
    <PageTransition>
      <section className="theme-inverse relative overflow-hidden pt-32 pb-20">
        <ScienceBackdrop variant="dark" density="calm" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] px-4 py-2 text-sm font-semibold text-gold">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {legalDocument.eyebrow}
              </div>
              <h1 className="text-4xl font-bold text-[var(--text-inverse)] md:text-5xl">
                {legalDocument.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-inverse-muted)] md:text-lg">
                {legalDocument.description}
              </p>
            </div>
            <p className="rounded-xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] px-4 py-3 text-sm text-[var(--text-inverse-muted)]">
              Effective {EFFECTIVE_DATE}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-secondary)] py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8">
          <article className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-6 shadow-sm sm:p-8 md:p-10">
            <div className="space-y-10">
              {legalDocument.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-relaxed text-[var(--color-text-secondary)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="grid gap-3 pt-1">
                        {section.bullets.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-base leading-relaxed text-[var(--color-text-secondary)]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                Legal Documents
              </h2>
              <nav className="mt-4 grid gap-2" aria-label="Legal documents">
                {legalNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      item.to === legalDocument.route
                        ? 'bg-gold text-navy'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Contact</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Questions about privacy, terms, accessibility, or data requests can be sent to:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-flex min-h-9 max-w-full items-center gap-2 py-1 text-sm font-semibold text-gold transition-colors hover:text-[var(--color-text-primary)]"
              >
                <FaEnvelope className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </PageTransition>
  )
}

export default LegalPage
