import { useRef } from 'react'
import gsap from 'gsap'
import type { ResumeData } from '@/data/types'
import myIcon from '@images/header/myIcon.png'

interface HeaderProps {
  data: ResumeData
}

export default function Header({ data }: HeaderProps) {
  const { header, about } = data
  const toastRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

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
    <header className="py-12 border-b border-gray-300">
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
        {/* Left */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3">
            Portfolio
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug tracking-tighter mb-6">
            {header.greeting}
          </h1>

          {/* Contact */}
          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500">
            {header.contact.email && (
              <a
                href={`mailto:${header.contact.email}`}
                className="hover:text-blue-600 transition-colors"
              >
                {header.contact.email}
              </a>
            )}
            {header.contact.phone && (
              <button
                onClick={copyPhone}
                className="hover:text-blue-600 transition-colors cursor-pointer"
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
                className="hover:text-blue-600 transition-colors"
              >
                GitHub
              </a>
            )}
            {header.contact.service && (
              <a
                href={`https://${header.contact.service}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                dongarium
              </a>
            )}
          </div>

          {/* About description */}
          <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed tracking-tight whitespace-pre-line">
            {about.description.map((seg, i) =>
              seg.bold
                ? <strong key={i}>{seg.text}</strong>
                : <span key={i}>{seg.text}</span>
            )}
          </p>
        </div>

        {/* Right: illustration */}
        <div className="flex-shrink-0">
          <img
            src={myIcon}
            alt="profile illustration"
            className="w-48 h-56 md:w-64 md:h-72 lg:w-80 lg:h-96 object-contain"
          />
        </div>
      </div>
    </header>
  )
}
