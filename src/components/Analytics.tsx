import { useEffect, type ReactElement } from 'react'

import { isAnalyticsEnabled, umamiConfig } from '@shared/analytics'

const SCRIPT_ID = 'umami-analytics'

function Analytics(): ReactElement | null {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return
    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.defer = true
    script.src = umamiConfig.scriptUrl
    script.dataset.websiteId = umamiConfig.websiteId
    script.dataset.tag = umamiConfig.tag

    if (umamiConfig.hostUrl) {
      script.dataset.hostUrl = umamiConfig.hostUrl
    }

    if (umamiConfig.domains) {
      script.dataset.domains = umamiConfig.domains
    }

    if (umamiConfig.performance) {
      script.dataset.performance = 'true'
    }

    if (umamiConfig.respectDoNotTrack) {
      script.dataset.doNotTrack = 'true'
    }

    document.head.appendChild(script)
  }, [])

  return null
}

export default Analytics
