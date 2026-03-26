import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import ShapeOverlay from '@/components/shared/ShapeOverlay'

gsap.registerPlugin(SplitText)

type Language = 'en' | 'ja' | 'ko'

const greetings: Record<Language, string> = {
  en: 'Hello!',
  ja: 'こんにちは!',
  ko: '안녕하세요!',
}

const languageButtons: { lang: Language; label: string }[] = [
  { lang: 'en', label: 'English' },
  { lang: 'ja', label: '日本語' },
  { lang: 'ko', label: '한국어' },
]

export default function Landing() {
  const [hoveredLang, setHoveredLang] = useState<Language | null>(null)
  const [selectedLang, setSelectedLang] = useState<Language | null>(null)
  const [playOverlay, setPlayOverlay] = useState(false)
  const navigate = useNavigate()
  const tubeRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const splitLinesRef = useRef<Record<Language, SplitText[]>>({
    en: [],
    ja: [],
    ko: [],
  })
  const pendingLangRef = useRef<Language | null>(null)

  const currentLang = hoveredLang || selectedLang || 'en'

  const handleProceed = () => {
    if (!selectedLang || playOverlay) return
    pendingLangRef.current = selectedLang
    setPlayOverlay(true)
  }

  const handleOverlayComplete = () => {
    if (pendingLangRef.current) {
      navigate(`/resume/${pendingLangRef.current}`)
    }
  }

  // 각 언어별 애니메이션 초기화
  useEffect(() => {
    const initAnimationForLang = (lang: Language) => {
      const selector = `[data-lang="${lang}"]`
      const lines = tubeRef.current?.querySelectorAll(selector)
      if (!lines || lines.length === 0) return

      if (splitLinesRef.current[lang].length > 0) {
        splitLinesRef.current[lang].forEach(split => split.revert())
      }

      const splitLines = Array.from(lines).map(line =>
        new SplitText(line as HTMLElement, { type: 'chars', charsClass: 'char' })
      )
      splitLinesRef.current[lang] = splitLines

      const width = window.innerWidth
      const depth = -width / 8
      const transformOrigin = `50% 50% ${depth}px`

      gsap.set(lines, {
        perspective: 700,
        transformStyle: 'preserve-3d',
      })

      const animTime = 0.9
      const tl = gsap.timeline({ repeat: -1 })

      splitLines.forEach((split, index) => {
        gsap.set(split.chars, { backfaceVisibility: 'hidden' })
        tl.fromTo(
          split.chars,
          { rotationX: -90 },
          {
            rotationX: 90,
            stagger: 0.08,
            duration: animTime,
            ease: 'none',
            transformOrigin,
          },
          index * 0.45
        )
      })

      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      timelineRef.current = tl
    }

    initAnimationForLang(currentLang)
  }, [currentLang])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <ShapeOverlay
        mode="in"
        play={playOverlay}
        onComplete={handleOverlayComplete}
      />

      <div className="text-center">
        {/* Greeting Text with 3D Rolling Effect */}
        <div
          ref={tubeRef}
          className="relative w-full"
          style={{ height: '24vw' }}
        >
          {(['en', 'ja', 'ko'] as Language[]).map(lang => (
            <div
              key={lang}
              className={currentLang === lang ? 'block' : 'hidden'}
            >
              {[0, 1, 2, 3].map((i) => (
                <h1
                  key={`${lang}-${i}`}
                  data-lang={lang}
                  className="line absolute top-1/2 left-1/2 font-bold m-0 whitespace-nowrap text-center text-white"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    lineHeight: 1,
                    letterSpacing: '-0.6vw',
                    fontSize: lang === 'en' ? '22vw' : '18vw',
                  }}
                >
                  {greetings[lang]}
                </h1>
              ))}
            </div>
          ))}
        </div>

        {/* Language Selection */}
        <div className="flex gap-8 justify-center items-center mt-16">
          {languageButtons.map(({ lang, label }) => (
            <button
              key={lang}
              onMouseEnter={() => setHoveredLang(lang)}
              onMouseLeave={() => setHoveredLang(null)}
              onClick={() => setSelectedLang(lang)}
              className={
                `text-white text-2xl transition-all duration-300 hover:scale-150 ${
                  selectedLang === lang ? 'scale-125 font-bold' : ''
                }`
              }
            >
              {label}
            </button>
          ))}

          {/* Arrow Button */}
          {selectedLang && (
            <button
              onClick={handleProceed}
              className="ml-8 text-blue-500 text-6xl transition-all duration-300 hover:scale-110 animate-fadeIn"
              aria-label="Proceed to resume"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
