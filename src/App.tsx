import type { ReactElement } from 'react'
import { Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider } from '@contexts/ThemeContext'
import Analytics from '@components/Analytics'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import ScrollToTop from '@components/ScrollToTop'
import { routes } from '@config/routes'

function App(): ReactElement {
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden bg-[var(--color-bg-primary)]">
        <Analytics />
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<div className="min-h-screen bg-[var(--surface-page)]" />}>
          <AnimatePresence mode="wait">
            <Routes>
              {routes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
