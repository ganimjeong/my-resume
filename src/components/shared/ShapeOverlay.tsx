import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

const NUM_POINTS = 10
const NUM_PATHS = 2
const DELAY_POINTS_MAX = 0.3
const DELAY_PER_PATH = 0.25
const ANIM_DURATION = 0.9

interface ShapeOverlayProps {
  /** 'in': 0→100 (covers screen), 'out': 100→0 (reveals screen) */
  mode: 'in' | 'out'
  onComplete?: () => void
  play?: boolean
}

export default function ShapeOverlay({ mode, onComplete, play = false }: ShapeOverlayProps) {
  const path1Ref = useRef<SVGPathElement>(null)
  const path2Ref = useRef<SVGPathElement>(null)
  const allPointsRef = useRef<number[][]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const render = useCallback(() => {
    const paths = [path1Ref.current, path2Ref.current]
    allPointsRef.current.forEach((points, i) => {
      const path = paths[i]
      if (!path) return
      let d = `M 0 ${points[0]} C`
      for (let j = 0; j < NUM_POINTS - 1; j++) {
        const p = ((j + 1) / (NUM_POINTS - 1)) * 100
        const cp = p - (100 / (NUM_POINTS - 1)) / 2
        d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`
      }
      d += ` V 0 H 0`
      path.setAttribute('d', d)
    })
  }, [])

  useEffect(() => {
    const initialValue = mode === 'in' ? 0 : 100
    const targetValue = mode === 'in' ? 100 : 0

    const points: number[][] = []
    for (let i = 0; i < NUM_PATHS; i++) {
      const p = Array(NUM_POINTS).fill(initialValue)
      points.push(p)
    }
    allPointsRef.current = points
    render()

    const pointsDelay: number[] = Array.from({ length: NUM_POINTS }, () => Math.random() * DELAY_POINTS_MAX)

    const tl = gsap.timeline({
      onUpdate: render,
      paused: true,
      defaults: { ease: 'power2.inOut', duration: ANIM_DURATION },
      onComplete: onComplete,
    })

    for (let i = 0; i < NUM_PATHS; i++) {
      const pts = allPointsRef.current[i]
      const pathDelay = DELAY_PER_PATH * (mode === 'in' ? i : NUM_PATHS - i - 1)
      for (let j = 0; j < NUM_POINTS; j++) {
        tl.to(pts, { [j]: targetValue }, pointsDelay[j] + pathDelay)
      }
    }

    tlRef.current = tl
  }, [mode])

  useEffect(() => {
    if (play && tlRef.current) {
      tlRef.current.play()
    }
  }, [play])

  // mode='out' 은 마운트 즉시 재생
  useEffect(() => {
    if (mode === 'out' && tlRef.current) {
      tlRef.current.play()
    }
  }, [mode])

  return (
    <svg
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ zIndex: 50 }}
    >
      <defs>
        <linearGradient id="shapeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
        <linearGradient id="shapeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <path
        ref={path2Ref}
        fill="url(#shapeGrad2)"
        d={mode === 'out' ? 'M 0 100 L 100 100 L 100 0 L 0 0 Z' : ''}
      />
      <path
        ref={path1Ref}
        fill="url(#shapeGrad1)"
        d={mode === 'out' ? 'M 0 100 L 100 100 L 100 0 L 0 0 Z' : ''}
      />
    </svg>
  )
}

export const OVERLAY_DURATION =
  ANIM_DURATION + DELAY_POINTS_MAX + DELAY_PER_PATH * (NUM_PATHS - 1)
