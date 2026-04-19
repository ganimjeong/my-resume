import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import type { ResumeData } from '@/data/types'
import dongariLogo from '@images/projectSection/Dongari-um.png'
import dLetter from '@images/projectSection/D.png'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface ProjectsProps {
  data: ResumeData
}

export default function Projects({ data }: ProjectsProps) {
  const { projects } = data
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctxSync = gsap.context(() => {
      section.querySelectorAll<HTMLImageElement>('.project-d').forEach((el) => {
        gsap.fromTo(
          el,
          { rotation: -45 },
          {
            rotation: 45,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      })

      section.querySelectorAll<HTMLElement>('.stat-block').forEach((block) => {
        const numEl = block.querySelector<HTMLElement>('.stat-num')
        const barEl = block.querySelector<HTMLElement>('.stat-bar-fill')
        if (!numEl) return

        const target = Number(numEl.dataset.value || '0')
        const counter = { v: 0 }

        const tween = gsap.to(counter, {
          v: target,
          duration: 2,
          ease: 'power2.out',
          paused: true,
          onUpdate() {
            numEl.textContent = Math.round(counter.v).toLocaleString()
          },
        })

        const bar = barEl
          ? gsap.fromTo(
              barEl,
              { scaleX: 0 },
              { scaleX: 1, duration: 2, ease: 'power2.out', paused: true }
            )
          : null

        ScrollTrigger.create({
          trigger: block,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            tween.play()
            bar?.play()
          },
        })
      })
    })

    let ctxAsync: gsap.Context | null = null
    let cancelled = false

    document.fonts.ready.then(() => {
      if (cancelled || !sectionRef.current) return
      ctxAsync = gsap.context(() => {
        sectionRef.current!.querySelectorAll<HTMLParagraphElement>('.project-desc').forEach((el) => {
          gsap.set(el, { opacity: 1 })
          SplitText.create(el, {
            type: 'words,lines',
            mask: 'lines',
            linesClass: 'line',
            autoSplit: true,
            onSplit(instance) {
              return gsap.from(instance.lines, {
                yPercent: 120,
                stagger: 0.1,
                scrollTrigger: {
                  trigger: el,
                  scrub: true,
                  start: 'clamp(top 95%)',
                  end: 'clamp(top 60%)',
                },
              })
            },
          })
        })
      })
    })

    return () => {
      cancelled = true
      ctxSync.revert()
      ctxAsync?.revert()
    }
  }, [data])

  return (
    <section className="py-16 border-b border-gray-300" ref={sectionRef}>
      <h2 className="text-2xl font-bold text-gray-900 mb-10">{projects.title}</h2>

      {projects.items.map((project, idx) => (
        <div key={idx} className="flex items-center gap-8 md:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <img
                src={dongariLogo}
                alt={project.name}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            <p className="project-desc text-gray-700 text-base md:text-lg leading-relaxed" style={{ opacity: 0 }}>
              {project.description}
            </p>

            {project.stats && project.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:gap-8 py-4 border-y border-gray-200">
                {project.stats.map((stat, i) => (
                  <div key={i} className="stat-block flex flex-col gap-2">
                    <div className="flex items-baseline gap-1">
                      <span
                        className="stat-num text-3xl md:text-4xl font-bold text-blue-600 tabular-nums"
                        data-value={stat.value}
                      >
                        0
                      </span>
                      {stat.suffix && (
                        <span className="text-xl md:text-2xl font-bold text-blue-600">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <div className="h-0.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="stat-bar-fill h-full bg-blue-600 origin-left" style={{ transform: 'scaleX(0)' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {project.siteLink && (
                <a
                  href={project.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {project.siteLabel}
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-900 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  {project.githubLabel}
                </a>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center w-48 lg:w-64 flex-shrink-0">
            <img
              src={dLetter}
              alt=""
              aria-hidden="true"
              className="project-d w-full h-auto select-none"
            />
          </div>
        </div>
      ))}
    </section>
  )
}
