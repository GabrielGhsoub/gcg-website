import { useState, useEffect, useRef } from 'react'

interface ScrollDirectionState {
  hidden: boolean
  scrolled: boolean
}

export function useScrollDirection(): ScrollDirectionState {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const nextScrolled = y > 10
        const nextHidden = y > 150 ? y > lastY.current && y - lastY.current > 5 : false

        setScrolled((current) => (current === nextScrolled ? current : nextScrolled))
        setHidden((current) => (current === nextHidden ? current : nextHidden))

        lastY.current = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { hidden, scrolled }
}
