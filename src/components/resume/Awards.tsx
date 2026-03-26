import { useEffect, useRef, forwardRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'

gsap.registerPlugin(ScrollTrigger)

interface AwardsProps {
  data: ResumeData
}

const Awards = forwardRef<HTMLDivElement, AwardsProps>(function Awards({ data }, ref) {
  const { awards } = data
  const sectionRef = useRef<HTMLElement>(null)
  const trophyRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  // 트로피 스크롤 틸트 (-45 → 45)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trophyRef.current || !sectionRef.current) return

      gsap.fromTo(
        trophyRef.current,
        { rotation: -45 },
        {
          rotation: 45,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

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
      ref={(el) => {
        sectionRef.current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) ref.current = el
      }}
      className="py-12 border-b border-gray-300"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{awards.title}</h2>

      <div className="flex gap-12">
        {/* 트로피 아이콘 */}
        <div className="hidden md:flex flex-shrink-0 w-48 h-48 lg:w-64 lg:h-64 items-center justify-center">
          <div
            ref={trophyRef}
            style={{
              fontSize: 'clamp(80px, 20vw, 200px)',
              display: 'inline-block',
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
