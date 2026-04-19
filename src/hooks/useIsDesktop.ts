import { useEffect, useState } from 'react'

export function useIsDesktop(minWidth = 1024) {
  const query = `(min-width: ${minWidth}px) and (hover: hover)`
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return isDesktop
}
