import { useRef } from 'react'
import gsap from 'gsap'

export function useCopyToast() {
  const toastRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    if (!toastRef.current) return

    tlRef.current?.kill()
    const tl = gsap.timeline()
    tlRef.current = tl

    tl.fromTo(
      toastRef.current,
      { opacity: 0, scale: 0.85, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
    ).to(
      toastRef.current,
      { opacity: 0, scale: 0.85, y: -10, duration: 0.3, ease: 'power2.in' },
      '+=0.9'
    )
  }

  return { toastRef, copy }
}
