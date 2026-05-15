import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

function ScrollToTop(): null {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      let attempts = 0
      let timer: number | undefined

      const scrollToHash = () => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }

        attempts += 1
        if (attempts < 20) {
          timer = window.setTimeout(scrollToHash, 100)
        }
      }

      timer = window.setTimeout(scrollToHash, 50)

      return () => {
        if (timer) {
          window.clearTimeout(timer)
        }
      }
    }

    // Always scroll to top on route change or initial load
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
