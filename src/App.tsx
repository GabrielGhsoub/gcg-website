import type { ReactElement } from 'react'
import { Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider } from '@contexts/ThemeContext'
import { Navbar, Footer, ScrollToTop } from '@components/index'
import { routes } from '@config/routes'

function App(): ReactElement {
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden bg-[var(--color-bg-primary)]">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-navy" />}>
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
