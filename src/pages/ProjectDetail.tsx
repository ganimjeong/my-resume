import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectShowcase, type Language, type ShowcaseProject } from '@/data/projectShowcase'
import { logoMap } from '@/data/projectLogos'
import ShapeOverlay from '@/components/shared/ShapeOverlay'
import ClickEffect from '@/components/shared/ClickEffect'
import MagneticCursor from '@/components/shared/MagneticCursor'
import Lightbox from '@/components/shared/Lightbox'

gsap.registerPlugin(ScrollTrigger)

function LinkIcon({ type }: { type: ShowcaseProject['links'][number]['type'] }) {
  if (type === 'github') {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

export default function ProjectDetail() {
  const { lang, slug } = useParams<{ lang: Language; slug: string }>()
  const currentLang = (lang as Language) || 'en'
  const data = projectShowcase[currentLang] ?? projectShowcase.en
  const { labels } = data
  const project = data.projects.find((p) => p.slug === slug)
  const rootRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // 스무스 스크롤
  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(onTick)
      lenisRef.current = null
      lenis.destroy()
    }
  }, [])

  // 라이트박스 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    if (lightboxIndex !== null) lenisRef.current?.stop()
    else lenisRef.current?.start()
  }, [lightboxIndex])

  // 스크롤 진입 페이드인
  useEffect(() => {
    const root = rootRef.current
    if (!root || !project) return
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [currentLang, slug, project])

  if (!project) {
    return <Navigate to={`/resume/${currentLang}/projects`} replace />
  }

  const logo = logoMap[project.slug]
  const accent = project.accent

  return (
    <div ref={rootRef} className="min-h-screen bg-white overflow-x-hidden">
      <ShapeOverlay mode="out" />
      <ClickEffect />
      <MagneticCursor />

      {/* 상단 툴바 */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl px-6 py-3">
          <Link
            to={`/resume/${currentLang}/projects`}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← {data.pageTitle}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl px-6">
        <article className="pt-12 pb-24 md:pt-16">
          {/* 헤더 */}
          <div className="reveal flex flex-col gap-5">
            {logo ? (
              <img src={logo} alt={project.name} className="h-14 md:h-16 w-auto object-contain self-start" />
            ) : (
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{project.name}</h1>
            )}

            {project.status && (
              <span
                className="self-start inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ color: accent, backgroundColor: `${accent}14` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                {project.status}
              </span>
            )}

            <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{labels.role}</span>
                <span className="font-medium text-gray-800">{project.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{labels.period}</span>
                <span className="font-medium text-gray-800">{project.period}</span>
              </div>
            </div>
          </div>

          {/* 요약 */}
          <div className="reveal mt-8 flex flex-col gap-4">
            {project.summary.map((para, i) => (
              <p key={i} className="text-gray-700 text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* 핵심 지표 */}
          {project.stats.length > 0 && (
            <div className="reveal mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {labels.highlights}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.stats.map((stat, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 p-5 bg-gray-50/50">
                    <div className="text-2xl md:text-3xl font-bold tabular-nums" style={{ color: accent }}>
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs md:text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 주요 기능 */}
          {project.features.length > 0 && (
            <div className="reveal mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {labels.features}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.features.map((f, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 p-6">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-4"
                      style={{ backgroundColor: accent }}
                    >
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 운영 채널 */}
          {project.channels && project.channels.length > 0 && (
            <div className="reveal mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {labels.channels}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.channels.map((ch) => (
                  <a
                    key={ch.handle}
                    href={`https://www.instagram.com/${ch.handle.replace(/^@/, '')}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                        <span className="truncate">{ch.handle}</span>
                        <svg
                          className="w-3.5 h-3.5 flex-shrink-0 text-gray-300 transition-colors group-hover:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500">{ch.note}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold tabular-nums" style={{ color: accent }}>
                        {ch.followers}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400">followers</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 화면 갤러리 — 통일된 비율 박스 */}
          {project.images.length > 0 ? (
            <div className="reveal mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {labels.gallery}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <figure key={i} className={img.wide ? 'md:col-span-2' : ''}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      aria-label={img.caption ?? project.name}
                      className={`group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 ${
                        img.wide ? 'aspect-video' : 'aspect-[4/3]'
                      }`}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}${img.src}`}
                        alt={img.alt ?? project.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </button>
                    {img.caption && (
                      <figcaption className="mt-2 text-xs text-gray-400 text-center">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          ) : project.galleryPending ? (
            <div className="reveal mt-10 rounded-2xl border border-dashed border-gray-300 py-16 text-center text-sm text-gray-400">
              {labels.gallery} — coming soon
            </div>
          ) : null}

          {/* 기술 스택 + 링크 */}
          <div className="reveal mt-10 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {labels.techStack}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) =>
                  link.type === 'github' ? (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-900 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      <LinkIcon type={link.type} />
                      {link.label}
                    </a>
                  ) : (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      <LinkIcon type={link.type} />
                      {link.label}
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        </article>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndex={setLightboxIndex}
        />
      )}
    </div>
  )
}
