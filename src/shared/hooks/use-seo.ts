import { useEffect } from 'react'

import { DEFAULT_OG_IMAGE, DEFAULT_SEO_DESCRIPTION, SITE_NAME, canonicalUrl } from '@shared/seo'

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[]

interface SEOOptions {
  title: string
  description?: string
  canonicalPath?: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  jsonLd?: JsonLdValue
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function upsertJsonLd(jsonLd?: JsonLdValue): void {
  const existing = document.head.querySelector<HTMLScriptElement>(
    'script[type="application/ld+json"][data-managed="seo"]',
  )

  if (!jsonLd) {
    existing?.remove()
    return
  }

  const element = existing ?? document.createElement('script')
  element.type = 'application/ld+json'
  element.dataset.managed = 'seo'
  element.textContent = JSON.stringify(jsonLd)

  if (!existing) {
    document.head.appendChild(element)
  }
}

export function useSEO({
  title,
  description = DEFAULT_SEO_DESCRIPTION,
  canonicalPath = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
  jsonLd,
}: SEOOptions): void {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
    const url = canonicalUrl(canonicalPath)
    const robots = noIndex ? 'noindex,nofollow' : 'index,follow'

    document.title = fullTitle
    upsertCanonical(url)

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)

    upsertJsonLd(jsonLd)
  }, [canonicalPath, description, image, jsonLd, noIndex, title, type])
}
