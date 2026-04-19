import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'

gsap.registerPlugin(ScrollTrigger)

interface LanguagesProps {
  data: ResumeData
}

const GREETINGS: Record<string, string> = {
  Korean: '안녕하세요',
  Japanese: 'こんにちは',
  English: 'Hello',
  Chinese: '你好',
  Spanish: 'Hola',
  Learning: '¡Hola! Привет!',
}

const TAB_LABELS: Record<string, string> = {
  Korean: 'KO',
  Japanese: 'JA',
  English: 'EN',
  Chinese: 'ZH',
  Spanish: 'ES',
  Learning: 'LRN',
}

function parseLanguageKey(name: string) {
  return name.replace(/[^A-Za-z]/g, '')
}

function parseLevelPercent(level: string) {
  const stars = (level.match(/⭐/g) || []).length
  if (stars > 0) return Math.min(stars, 5) / 5
  return 0.5
}

function getPercent(item: { level: string; percent?: number }) {
  if (typeof item.percent === 'number') return Math.max(0, Math.min(100, item.percent)) / 100
  return parseLevelPercent(item.level)
}

export default function Languages({ data }: LanguagesProps) {
  const { languages } = data
  const [activeIdx, setActiveIdx] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const greetingRef = useRef<HTMLHeadingElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)

  const active = languages.items[activeIdx]
  const activeKey = active ? parseLanguageKey(active.name) : ''
  const activeGreeting = GREETINGS[activeKey] || active?.name || ''
  const activePercent = active ? getPercent(active) : 0
  const hasSubs = !!(active?.sublanguages && active.sublanguages.length > 0)

  // 섹션 fade-in
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return
      gsap.fromTo(
        sectionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            end: 'top 78%',
            scrub: 1,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // 활성 탭 언더라인 위치 동기화
  useEffect(() => {
    const btn = tabButtonRefs.current[activeIdx]
    const underline = underlineRef.current
    const tabs = tabsRef.current
    if (!btn || !underline || !tabs) return

    const btnRect = btn.getBoundingClientRect()
    const tabsRect = tabs.getBoundingClientRect()
    gsap.to(underline, {
      x: btnRect.left - tabsRect.left,
      width: btnRect.width,
      duration: 0.45,
      ease: 'power3.out',
    })
  }, [activeIdx])

  // 창 리사이즈 시 언더라인 재정렬
  useEffect(() => {
    const onResize = () => {
      const btn = tabButtonRefs.current[activeIdx]
      const underline = underlineRef.current
      const tabs = tabsRef.current
      if (!btn || !underline || !tabs) return
      const btnRect = btn.getBoundingClientRect()
      const tabsRect = tabs.getBoundingClientRect()
      gsap.set(underline, {
        x: btnRect.left - tabsRect.left,
        width: btnRect.width,
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeIdx])

  // 패널 크로스페이드 + 바/퍼센트 카운트업
  useEffect(() => {
    if (!panelRef.current || !greetingRef.current) return

    const panel = panelRef.current
    const greeting = greetingRef.current

    const tl = gsap.timeline()
    tl.fromTo(
      panel,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    ).fromTo(
      greeting,
      { opacity: 0, y: 18, letterSpacing: '0.05em' },
      { opacity: 1, y: 0, letterSpacing: '-0.02em', duration: 0.6, ease: 'power3.out' },
      '<'
    )

    if (hasSubs) {
      const subBars = panel.querySelectorAll<HTMLElement>('.sub-bar-fill')
      const subPercents = panel.querySelectorAll<HTMLElement>('.sub-percent')
      subBars.forEach((bar, i) => {
        const p = Number(bar.dataset.percent || '0')
        gsap.fromTo(bar, { scaleX: 0 }, { scaleX: p / 100, duration: 1, ease: 'power2.out', delay: 0.15 + i * 0.08 })
        const pctEl = subPercents[i]
        if (pctEl) {
          const counter = { v: 0 }
          gsap.to(counter, {
            v: p,
            duration: 1,
            ease: 'power2.out',
            delay: 0.15 + i * 0.08,
            onUpdate() {
              pctEl.textContent = `${Math.round(counter.v)}%`
            },
          })
        }
      })
    } else if (barFillRef.current && percentRef.current) {
      const bar = barFillRef.current
      const percent = percentRef.current
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: activePercent, duration: 1, ease: 'power2.out' }, '<0.15')

      const counter = { v: 0 }
      const target = Math.round(activePercent * 100)
      gsap.to(counter, {
        v: target,
        duration: 1,
        ease: 'power2.out',
        onUpdate() {
          percent.textContent = `${Math.round(counter.v)}%`
        },
      })
    }

    return () => {
      tl.kill()
    }
  }, [activeIdx, activePercent, hasSubs])

  return (
    <section ref={sectionRef} className="py-12 border-b border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{languages.title}</h2>

      {/* 탭 바 */}
      <div
        ref={tabsRef}
        role="tablist"
        className="relative flex gap-6 md:gap-8 overflow-x-auto border-b border-gray-200 mb-8"
      >
        {languages.items.map((lang, i) => {
          const key = parseLanguageKey(lang.name)
          const label = TAB_LABELS[key] || key || lang.name
          const isActive = i === activeIdx
          return (
            <button
              key={i}
              ref={(el) => { tabButtonRefs.current[i] = el }}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIdx(i)}
              className={`relative py-3 px-1 text-sm md:text-base font-semibold tracking-wider whitespace-nowrap transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {label}
              <span className="hidden md:inline text-gray-300 font-normal ml-2">{lang.name.replace(/[^A-Za-z ]/g, '').trim()}</span>
            </button>
          )
        })}
        <div
          ref={underlineRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[2px] bg-blue-600"
          style={{ width: 0 }}
        />
      </div>

      {/* 활성 패널 */}
      <div ref={panelRef} role="tabpanel" className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-start">
        {/* 왼쪽: 인사말 + 프로피시언시 */}
        <div>
          <h3
            ref={greetingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {activeGreeting}
          </h3>
          {hasSubs ? (
            <div className="space-y-4">
              {active!.sublanguages!.map((sub, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm md:text-base font-medium text-gray-700">{sub.name}</span>
                    <span className="sub-percent text-sm md:text-base font-semibold text-blue-600 tabular-nums">
                      0%
                    </span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      data-percent={sub.percent}
                      className="sub-bar-fill h-full bg-gradient-to-r from-blue-400 to-blue-600 origin-left"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                  Proficiency
                </span>
                <span ref={percentRef} className="text-sm md:text-base font-semibold text-blue-600 tabular-nums">
                  0%
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  ref={barFillRef}
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
            </>
          )}
        </div>

        {/* 오른쪽: 상세 리스트 */}
        <ul className="space-y-3 text-gray-700 text-sm md:text-base">
          {active?.description.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1 flex-shrink-0">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
