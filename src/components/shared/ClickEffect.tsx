import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

gsap.registerPlugin(Physics2DPlugin)

const DOT_QUANTITY = 20
const DOT_SIZE_MIN = 6
const DOT_SIZE_MAX = 16
const SPEED = 2.5
const GRAVITY = 4

const COLORS = ['#2563eb', '#bfdbfe', '#ffffff', '#60a5fa', '#1e40af']

export default function ClickEffect() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const container = document.createElement('div')
    container.style.cssText =
      'position:fixed; left:0; top:0; overflow:visible; z-index:9999; pointer-events:none;'
    document.body.appendChild(container)
    containerRef.current = container

    // 파티클 생성
    gsap.set(container, { x: -9999, y: -9999 })

    const tl = gsap.timeline({ paused: true })

    for (let i = 0; i < DOT_QUANTITY; i++) {
      const dot = document.createElement('div')
      const size = gsap.utils.random(DOT_SIZE_MIN, DOT_SIZE_MAX, 1)
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]

      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
      `
      container.appendChild(dot)

      const angle = Math.random() * Math.PI * 2
      const spread = Math.random() * 20

      gsap.set(dot, {
        x: Math.cos(angle) * spread,
        y: Math.sin(angle) * spread,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        force3D: true,
      })

      tl.to(
        dot,
        {
          physics2D: {
            angle: (angle * 180) / Math.PI,
            velocity: (80 + Math.random() * 200) * SPEED,
            gravity: 500 * GRAVITY,
          },
          duration: 0.8 + Math.random() * 0.6,
        },
        0
      ).to(
        dot,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.inOut',
        },
        0.55
      )
    }

    tlRef.current = tl

    const handleClick = (e: MouseEvent) => {
      gsap.set(container, { x: e.clientX, y: e.clientY })

      // 클릭할 때마다 색상 랜덤 재배치
      Array.from(container.children).forEach((dot) => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        (dot as HTMLElement).style.background = color
      })

      tl.play(0)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      tl.kill()
      container.remove()
    }
  }, [])

  return null
}
