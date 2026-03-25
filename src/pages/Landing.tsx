import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  const displayGreeting = hoveredLang ? greetings[hoveredLang] : 'Hello!'

  const handleProceed = () => {
    if (selectedLang) {
      navigate(`/resume/${selectedLang}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div className="text-center">
        {/* Greeting Text */}
        <h1 className="text-white text-8xl md:text-9xl font-bold mb-16 transition-all duration-300">
          {displayGreeting}
        </h1>

        {/* Language Selection */}
        <div className="flex gap-8 justify-center items-center">
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
