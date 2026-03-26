import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'

gsap.registerPlugin(ScrollTrigger)

interface LanguagesProps {
  data: ResumeData
}

export default function Languages({ data }: LanguagesProps) {
  const { languages } = data
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // 스크롤 속도 기반 기울기
  useEffect(() => {
    if (!containerRef.current) return

    const proxy = { skew: 0 }
    const skewSetter = gsap.quickSetter(containerRef.current, 'skewY', 'deg')
    const clamp = gsap.utils.clamp(-1, 1)

    const st = ScrollTrigger.create({
      onUpdate(self) {
        const skew = clamp(self.getVelocity() / -300)
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          })
        }
      },
    })

    return () => {
      st.kill()
      gsap.set(containerRef.current, { skewY: 0 })
    }
  }, [])

  // 언어 카드 애니메이션
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return
      gsap.fromTo(
        containerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            end: 'top 80%',
            scrub: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  // 토글 시 콘텐츠 높이 애니메이션
  useEffect(() => {
    languages.items.forEach((_, index) => {
      const contentEl = contentRefs.current[index]
      if (!contentEl) return

      if (expandedIndex === index) {
        gsap.to(contentEl, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.to(contentEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
    })
  }, [expandedIndex, languages.items])

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="py-12 border-b border-gray-300" ref={containerRef}>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{languages.title}</h2>

      <div className="space-y-3">
        {languages.items.map((lang, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
            {/* 토글 버튼 */}
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900">{lang.name}</h3>
                <span className="text-yellow-500">{lang.level}</span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                  expandedIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* 콘텐츠 */}
            <div
              ref={(el) => {
                contentRefs.current[index] = el
              }}
              className="overflow-hidden bg-gray-50"
              style={{ height: 0, opacity: 0 }}
            >
              <ul className="space-y-2 text-gray-700 text-base md:text-lg p-4 pt-0">
                {lang.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
