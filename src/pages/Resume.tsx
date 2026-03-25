import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import { resumeData } from '../data/resume'

type Language = 'en' | 'ja' | 'ko'

export default function Resume() {
  const { lang } = useParams<{ lang: Language }>()
  const currentLang = (lang as Language) || 'en'
  const data = resumeData[currentLang]

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6">
        <Header data={data} />
        <main className="pb-16">
          <About data={data} />
          <Skills data={data} />
          <Experience data={data} />
          <Projects data={data} />
        </main>
      </div>
    </div>
  )
}
