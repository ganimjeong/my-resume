import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceProps {
  data: ResumeData
}

export default function Experience({ data }: ExperienceProps) {
  const { experience } = data
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { x: 80, opacity: 0 },
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
    <section className="pt-12 pb-40 border-b border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{experience.title}</h2>
      <div className="space-y-14">
        {experience.items.map((item, index) => (
          <div
            key={index}
            ref={(el) => { itemsRef.current[index] = el }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.position}
                </h3>
                <p className="text-blue-600">{item.company}</p>
              </div>
              <p className="text-sm text-gray-500">{item.period}</p>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {item.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
