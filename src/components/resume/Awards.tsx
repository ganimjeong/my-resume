import { useEffect, useRef, useState, forwardRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'

gsap.registerPlugin(ScrollTrigger)

interface AwardsProps {
  data: ResumeData
}

const Awards = forwardRef<HTMLDivElement, AwardsProps>(function Awards({ data }, ref) {
  const { awards } = data
  const containerRef = useRef<HTMLDivElement>(null)
  const trophyRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 마우스 위치에 따라 트로피 기울기
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // 컨테이너 중심을 기준으로 각도 계산
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) * 0.08
      const rotateY = (x - centerX) * 0.08

      setMousePos({ x: rotateY, y: rotateX })
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // 트로피 3D 효과
  useEffect(() => {
    if (trophyRef.current) {
      gsap.to(trophyRef.current, {
        rotationX: mousePos.y,
        rotationY: mousePos.x,
        duration: 0.25,
        ease: 'power1.out',
      })
    }
  }, [mousePos])

  // 리스트 아이템 애니메이션
  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 80%',
              scrub: 1,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref || containerRef}
      className="py-12 border-b border-gray-300"
      style={{ perspective: '1000px' }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{awards.title}</h2>

      <div className="flex gap-12">
        {/* 트로피 아이콘 */}
        <div className="hidden md:flex flex-shrink-0 w-48 h-48 lg:w-64 lg:h-64 items-center justify-center">
          <div
            ref={trophyRef}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0)',
              fontSize: 'clamp(80px, 20vw, 200px)',
            }}
          >
            🏆
          </div>
        </div>

        {/* 수상 목록 */}
        <div ref={listRef} className="flex-1 space-y-4">
          {awards.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el
              }}
              className="group p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="font-semibold text-blue-600 whitespace-nowrap text-sm md:text-base">
                  {item.award}
                </span>
                <span className="text-gray-600 text-sm md:text-base">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Awards
