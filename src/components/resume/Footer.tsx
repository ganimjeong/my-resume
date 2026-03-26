import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'

gsap.registerPlugin(ScrollTrigger)

interface FooterProps {
  data: ResumeData
}

export default function Footer({ data }: FooterProps) {
  const { header, ui } = data
  const footerRef = useRef<HTMLElement>(null)
  const eyeSvgRef = useRef<SVGSVGElement>(null)
  const irisRef = useRef<SVGCircleElement>(null)
  const pupilRef = useRef<SVGCircleElement>(null)
  const toastRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Curve swipe reveal: footer rises from below
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!footerRef.current) return

      gsap.fromTo(
        footerRef.current,
        { y: 160 },
        {
          y: 0,
          duration: 1.3,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 98%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Eye follows cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeSvgRef.current || !pupilRef.current || !irisRef.current) return

      const rect = eyeSvgRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const angle = Math.atan2(dy, dx)
      const maxMove = 20

      const targetX = 100 + Math.cos(angle) * maxMove
      const targetY = 50 + Math.sin(angle) * maxMove * 0.6

      gsap.to([irisRef.current, pupilRef.current], {
        attr: { cx: targetX, cy: targetY },
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
    <footer ref={footerRef} className="relative bg-[#ff8709] text-white overflow-visible">
      {/* Toast */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          ref={toastRef}
          className="bg-white/20 backdrop-blur-sm text-white text-sm px-6 py-3 rounded-xl opacity-0"
        >
          {ui.copied}
        </div>
      </div>

      {/* Curved top edge — rises with the footer */}
      <div
        className="absolute left-0 w-full pointer-events-none"
        style={{ top: '-79px', height: '80px' }}
      >
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path d="M0,80 Q360,0 720,40 Q1080,80 1440,0 L1440,80 L0,80 Z" fill="#ff8709" />
        </svg>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl px-6 pt-12 pb-20">
        {/* Big eye */}
        <div className="flex justify-center mb-14">
          <svg
            ref={eyeSvgRef}
            viewBox="0 0 200 100"
            className="w-48 h-24 md:w-72 md:h-36 lg:w-96 lg:h-48"
          >
            <defs>
              <clipPath id="eye-clip">
                <path d="M6,50 Q100,4 194,50 Q100,96 6,50 Z" />
              </clipPath>
            </defs>
            {/* Sclera (white of eye) */}
            <path d="M6,50 Q100,4 194,50 Q100,96 6,50 Z" fill="white" />
            {/* Iris + Pupil + Highlight — clipped to eye shape */}
            <g clipPath="url(#eye-clip)">
              <circle ref={irisRef} cx="100" cy="50" r="26" fill="#e06200" />
              <circle ref={pupilRef} cx="100" cy="50" r="14" fill="#1a0500" />
              <circle cx="111" cy="41" r="5.5" fill="white" opacity="0.85" />
            </g>
            {/* Upper lid line */}
            <path
              d="M6,50 Q100,4 194,50"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Lower lid line */}
            <path
              d="M6,50 Q100,96 194,50"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Contact links */}
        <div className="flex flex-wrap gap-6 justify-center text-base md:text-lg text-white/75">
          {header.contact.email && (
            <a
              href={`mailto:${header.contact.email}`}
              className="transition-all duration-200 hover:scale-110 hover:text-white origin-bottom"
            >
              {header.contact.email}
            </a>
          )}
          {header.contact.phone && (
            <button
              onClick={copyPhone}
              className="transition-all duration-200 hover:scale-110 hover:text-white origin-bottom cursor-pointer"
            >
              {header.contact.phone}
            </button>
          )}
          {header.contact.github && (
            <a
              href={`https://${header.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-110 hover:text-white origin-bottom"
            >
              GitHub
            </a>
          )}
          {header.contact.service && (
            <a
              href={`https://${header.contact.service}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-110 hover:text-white origin-bottom"
            >
              dongarium
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
