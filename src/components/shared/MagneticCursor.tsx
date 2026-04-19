import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MagneticCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    document.documentElement.classList.add('magnetic-active')

    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' })

    let hovered: HTMLElement | null = null

    const onMove = (e: MouseEvent) => {
      let x = e.clientX
      let y = e.clientY

      if (hovered) {
        const rect = hovered.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        x = cx + (e.clientX - cx) * 0.35
        y = cy + (e.clientY - cy) * 0.35
      }

      xRing(x)
      yRing(y)
      xDot(e.clientX)
      yDot(e.clientY)
    }

    const expand = () => gsap.to(ring, { scale: 1.8, duration: 0.3, ease: 'power3.out' })
    const shrink = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power3.out' })

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('a, button, .magnetic')
      if (!target) return
      hovered = target
      expand()
    }

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (related && hovered && hovered.contains(related)) return
      hovered = null
      shrink()
    }

    const onDown = () => gsap.to(ring, { scale: 0.6, duration: 0.15, ease: 'power3.out' })
    const onUp = () => gsap.to(ring, { scale: hovered ? 1.8 : 1, duration: 0.2, ease: 'power3.out' })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.documentElement.classList.remove('magnetic-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="magnetic-cursor pointer-events-none fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-white z-[9999] hidden"
        style={{ willChange: 'transform', mixBlendMode: 'difference' }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="magnetic-cursor pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white z-[9999] hidden"
        style={{ willChange: 'transform', mixBlendMode: 'difference' }}
      />
    </>
  )
}
