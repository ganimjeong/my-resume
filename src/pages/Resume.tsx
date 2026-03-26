import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/resume/Header'
import Skills from '@/components/resume/Skills'
import Experience from '@/components/resume/Experience'
import Projects from '@/components/resume/Projects'
import { resumeData } from '@/data/index'
import ShapeOverlay from '@/components/shared/ShapeOverlay'
import BentoGallery from '@/components/gallery/BentoGallery'

gsap.registerPlugin(ScrollTrigger)

type Language = 'en' | 'ja' | 'ko'

export default function Resume() {
  const { lang } = useParams<{ lang: Language }>()
  const currentLang = (lang as Language) || 'en'
  const data = resumeData[currentLang]

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <ShapeOverlay mode="out" />
      <BentoGallery />
      <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl px-6">
        <Header data={data} />
        <main className="pb-16">
          <Skills data={data} />
          <Experience data={data} />
          <Projects data={data} />
        </main>
      </div>
    </div>
  )
}
