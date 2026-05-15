import { CONTACT_EMAIL, LOCATION, PHONE_NUMBERS } from './constants/contact-info'
import { ROUTES } from './constants/routes'
import { SOCIAL_LINKS } from './constants/social-links'

export const SITE_NAME = 'Ghoussoub Consulting Group'
export const SITE_SHORT_NAME = 'GCG'
export const SITE_URL = 'https://gcginnovate.com'
export const SITE_BASE_PATH = '/gcg-website/'
export const DEFAULT_SEO_DESCRIPTION =
  'Ghoussoub Consulting Group provides science-driven consulting, research and development, and STEM tutoring for organizations, researchers, and learners.'
export const DEFAULT_OG_IMAGE = new URL('logo.png', new URL(SITE_BASE_PATH, SITE_URL)).toString()

export function canonicalUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return new URL(normalizedPath, new URL(SITE_BASE_PATH, SITE_URL)).toString()
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: canonicalUrl(ROUTES.HOME),
  logo: DEFAULT_OG_IMAGE,
  email: CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: LOCATION,
  },
  contactPoint: PHONE_NUMBERS.map((phone) => ({
    '@type': 'ContactPoint',
    telephone: phone.display,
    contactType: 'customer support',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Arabic', 'French'],
  })),
  sameAs: SOCIAL_LINKS.map((link) => link.href),
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: canonicalUrl(ROUTES.HOME),
  potentialAction: {
    '@type': 'ContactAction',
    target: canonicalUrl(ROUTES.HOME),
  },
}
