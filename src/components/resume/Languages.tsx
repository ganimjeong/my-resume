import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'

gsap.registerPlugin(ScrollTrigger)

interface LanguagesProps {
  data: ResumeData
}

export default function Languages({ data }: LanguagesProps) {
  const { languages } = data
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  // 언어 아이템 애니메이션
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
    <section className="py-12 border-b border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{languages.title}</h2>

      <div className="space-y-8">
        {languages.items.map((lang, index) => (
          <div
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el
            }}
            className="group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{lang.name}</h3>
              <span className="text-yellow-500">{lang.level}</span>
            </div>

            <ul className="space-y-2 text-gray-700 text-base md:text-lg">
              {lang.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {index < languages.items.length - 1 && (
              <hr className="my-6 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
