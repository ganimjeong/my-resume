import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 라우트 경로가 바뀔 때마다 스크롤을 맨 위로 리셋한다.
 * 각 페이지가 useEffect 에서 Lenis 를 새로 생성하므로, 그보다 먼저 실행되는
 * useLayoutEffect 에서 스크롤을 0 으로 맞춰야 Lenis 가 최상단에서 시작한다.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
