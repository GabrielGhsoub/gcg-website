import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@contexts/ThemeContext'
import { Navbar, Footer, ScrollToTop } from '@components/index'
import { routes } from '@config/routes'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden bg-background">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          {routes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
    </ThemeProvider>
  )
}

export default App
