import { useParams } from 'react-router-dom'
import Header from '../components/Header.tsx'
import Skills from '../components/Skills.tsx'
import Experience from '../components/Experience.tsx'
import Projects from '../components/Projects.tsx'
import { resumeData } from '../data/index.ts'
import ShapeOverlay from '../components/ShapeOverlay'
import BentoGallery from '../components/BentoGallery'

type Language = 'en' | 'ja' | 'ko'

export default function Resume() {
  const { lang } = useParams<{ lang: Language }>()
  const currentLang = (lang as Language) || 'en'
  const data = resumeData[currentLang]

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
