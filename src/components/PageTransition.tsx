import type { ReactElement, ReactNode } from 'react'

import { motion } from 'framer-motion'

interface PageTransitionProps {
  children: ReactNode
}

function PageTransition({ children }: PageTransitionProps): ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
