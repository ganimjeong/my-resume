import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)
import type { ResumeData } from '@/data/types'
import myIcon from '@images/headerSection/myIcon.png'

interface HeaderProps {
  data: ResumeData
}

export default function Header({ data }: HeaderProps) {
  const { header, about } = data
  const toastRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLParagraphElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const waveRef = useRef<HTMLSpanElement>(null)

  const playWave = () => {
    const el = waveRef.current
    if (!el) return
    gsap.killTweensOf(el)
    gsap.fromTo(
      el,
      { rotation: 0, transformOrigin: '70% 70%' },
      {
        keyframes: [
          { rotation: 20, duration: 0.15 },
          { rotation: -10, duration: 0.15 },
          { rotation: 20, duration: 0.15 },
          { rotation: -5, duration: 0.15 },
          { rotation: 10, duration: 0.15 },
          { rotation: 0, duration: 0.2 },
        ],
        ease: 'power1.inOut',
      }
    )
  }

  useEffect(() => {
    const el = waveRef.current
    if (!el) return

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: playWave,
    })
  }, [])

  // About 설명 SplitText 스크롤 애니메이션
  useEffect(() => {
    if (!aboutRef.current) return
    const el = aboutRef.current
    gsap.set(el, { opacity: 1 })

    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
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
                start: 'clamp(top 90%)',
                end: 'clamp(top 45%)',
              },
            })
          },
        })
      })
    })

    return () => ctx.revert()
  }, [data])

  const copyPhone = () => {
    navigator.clipboard.writeText(header.contact.phone)

    if (tlRef.current) tlRef.current.kill()

    const tl = gsap.timeline()
    tlRef.current = tl

    tl.fromTo(
      toastRef.current,
      { opacity: 0, scale: 0.85, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
    ).to(
      toastRef.current,
      { opacity: 0, scale: 0.85, y: -10, duration: 0.3, ease: 'power2.in' },
      '+=0.9'
    )
  }

  return (
    <header className="pt-20 pb-12 border-b border-gray-300">
      {/* Toast */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          ref={toastRef}
          className="bg-gray-800/50 text-white text-sm px-6 py-3 rounded-xl opacity-0"
        >
          {data.ui.copied}
        </div>
      </div>

      <div className="flex items-start justify-between gap-8">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3">
            Portfolio
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug tracking-tighter mb-6">
            {header.greeting.replace('👋', '')}
            <span ref={waveRef} className="inline-block cursor-pointer" onMouseEnter={playWave} onClick={playWave}>👋</span>
          </h1>

          <p ref={aboutRef} className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed tracking-tight whitespace-pre-line mb-4" style={{ opacity: 0 }}>
            {about.description.map((seg, i) =>
              seg.bold
                ? <strong key={i}>{seg.text}</strong>
                : <span key={i}>{seg.text}</span>
            )}
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {header.hashtags.map((tag, idx) => (
              <span key={idx} className="text-blue-600 font-medium text-sm md:text-base">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0">
          <img
            src={myIcon}
            alt="profile illustration"
            className="w-48 h-56 md:w-64 md:h-72 lg:w-80 lg:h-96 object-contain"
          />
        </div>
      </div>

      {/* Bottom: contact */}
      <div className="flex flex-wrap gap-6 mt-8 text-base md:text-lg text-gray-500">
        {header.contact.email && (
          <a
            href={`mailto:${header.contact.email}`}
            className="inline-block transition-all duration-200 hover:scale-110 hover:text-blue-600 origin-left"
          >
            {header.contact.email}
          </a>
        )}
        {header.contact.phone && (
          <button
            onClick={copyPhone}
            className="inline-block transition-all duration-200 hover:scale-110 hover:text-blue-600 origin-left cursor-pointer"
            title="Copy phone number"
          >
            {header.contact.phone}
          </button>
        )}
        {header.contact.github && (
          <a
            href={`https://${header.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-200 hover:scale-110 hover:text-blue-600 origin-left"
          >
            GitHub
          </a>
        )}
        {header.contact.service && (
          <a
            href={`https://${header.contact.service}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-200 hover:scale-110 hover:text-blue-600 origin-left"
          >
            dongarium
          </a>
        )}
      </div>
    </header>
  )
}
