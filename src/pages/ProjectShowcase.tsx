import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectShowcase, type Language, type ShowcaseProject } from '@/data/projectShowcase'
import { logoMap } from '@/data/projectLogos'
import ShapeOverlay from '@/components/shared/ShapeOverlay'
import ClickEffect from '@/components/shared/ClickEffect'
import MagneticCursor from '@/components/shared/MagneticCursor'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectShowcase() {
  const { lang } = useParams<{ lang: Language }>()
  const currentLang = (lang as Language) || 'en'
  const data = projectShowcase[currentLang] ?? projectShowcase.en
  const rootRef = useRef<HTMLDivElement>(null)

  // 스무스 스크롤
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  // 카드 진입 페이드인 (마운트 시 한 번에 순차 등장 — 스크롤 위치와 무관하게 항상 보이도록)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cards = root.querySelectorAll<HTMLElement>('.card-reveal')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
      )
    }, root)
    return () => ctx.revert()
  }, [currentLang])

  return (
    <div ref={rootRef} className="min-h-screen bg-white overflow-x-hidden">
      <ShapeOverlay mode="out" />
      <ClickEffect />
      <MagneticCursor />

      {/* 상단 툴바 */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl px-6 py-3">
          <Link
            to={`/resume/${currentLang}`}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            {data.backLabel}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl px-6">
        {/* 페이지 헤더 */}
        <header className="pt-16 pb-10 md:pt-24 md:pb-14">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            {data.pageTitle}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-500">{data.pageSubtitle}</p>
        </header>

        {/* 카드 그리드 */}
        <main className="pb-24">
          <div className="card-grid grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {data.projects.map((project) => (
              <ProjectCard key={project.slug} project={project} lang={currentLang} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

function ProjectCard({ project, lang }: { project: ShowcaseProject; lang: Language }) {
  const accent = project.accent
  const logo = logoMap[project.slug]
  const thumbSrc = project.thumbnail ?? project.images[0]?.src
  const thumbFit = project.thumbnailFit ?? 'cover'
  const highlight = project.stats[0]

  return (
    <Link
      to={`/resume/${lang}/projects/${project.slug}`}
      className="card-reveal group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
    >
      {/* 썸네일 영역 (16:10 고정) */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={
          thumbFit === 'contain'
            ? { background: `linear-gradient(135deg, ${accent}1f 0%, ${accent}08 100%)` }
            : { backgroundColor: '#f9fafb' }
        }
      >
        {thumbSrc ? (
          <img
            src={`${import.meta.env.BASE_URL}${thumbSrc}`}
            alt={project.name}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              thumbFit === 'contain' ? 'object-contain p-3' : 'object-cover'
            }`}
            loading="lazy"
          />
        ) : (
          // 스크린샷이 없는 프로젝트: 액센트 그라데이션 + 로고/이름
          <div
            className="w-full h-full flex items-center justify-center p-8"
            style={{ background: `linear-gradient(135deg, ${accent}1f 0%, ${accent}08 100%)` }}
          >
            {logo ? (
              <img src={logo} alt={project.name} className="max-h-16 w-auto object-contain" />
            ) : (
              <span
                className="text-2xl md:text-3xl font-bold text-center leading-tight"
                style={{ color: accent }}
              >
                {project.name}
              </span>
            )}
          </div>
        )}

        {project.status && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            {project.status}
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">{project.name}</h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">{project.tagline}</p>

        <div className="mt-auto pt-5 flex items-center justify-between">
          {highlight ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tabular-nums" style={{ color: accent }}>
                {highlight.value}
              </span>
              <span className="text-xs text-gray-400">{highlight.label}</span>
            </div>
          ) : (
            <span />
          )}
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full"
            style={{ color: accent, backgroundColor: `${accent}14` }}
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
