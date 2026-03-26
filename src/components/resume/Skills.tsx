import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'

gsap.registerPlugin(ScrollTrigger)

interface SkillsProps {
  data: ResumeData
}

export default function Skills({ data }: SkillsProps) {
  const { skills } = data
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

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
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [data])

  return (
    <section className="py-12 border-b border-gray-300 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{skills.title}</h2>
      <div className="space-y-6">
        {skills.categories.map((category, index) => (
          <div
            key={category.name}
            ref={(el) => { itemsRef.current[index] = el }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
