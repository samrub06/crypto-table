import { useEffect } from 'react'
import { throttle } from '../libs/utils'

// Custom hook for infinite scroll
// onLoadMore: callback to load next page
// enabled: whether infinite scroll is active
// threshold: px from bottom to trigger loading
export default function useInfiniteScroll(onLoadMore: () => void, enabled: boolean, threshold = 400) {
  useEffect(() => {
    if (!enabled) return
    // Handler for scroll event
    const handleScroll = throttle(() => {
      const scrollPosition = window.innerHeight + window.scrollY
      const bottomPosition = document.body.offsetHeight - threshold
      if (scrollPosition >= bottomPosition) {
        onLoadMore()
      }
    }, 1000)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onLoadMore, enabled, threshold])
} 