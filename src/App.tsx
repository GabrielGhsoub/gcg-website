import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Invest from './pages/Invest'
import Careers from './pages/Careers'
import TutoringServices from './pages/TutoringServices'
import ResearchDevelopment from './pages/ResearchDevelopment'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/services/tutoring" element={<TutoringServices />} />
          <Route path="/services/research" element={<ResearchDevelopment />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App
