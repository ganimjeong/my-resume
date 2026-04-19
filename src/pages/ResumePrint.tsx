import { useParams, Link } from 'react-router-dom'
import { resumeData } from '@/data/index'
import dongariLogo from '@images/projectSection/Dongari-um.png'
import dLetter from '@images/projectSection/D.png'
import myIcon from '@images/headerSection/myIcon.png'
import { useCopyToast } from '@/hooks/useCopyToast'

type Language = 'en' | 'ja' | 'ko'

export default function ResumePrint() {
  const { lang } = useParams<{ lang: Language }>()
  const currentLang = (lang as Language) || 'en'
  const data = resumeData[currentLang]
  const { header, about, skills, experience, awards, languages, projects } = data
  const { toastRef, copy } = useCopyToast()

  const copyPhone = () => copy(header.contact.phone)

  return (
    <div className="min-h-screen bg-white">
      {/* Toast */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 print:hidden">
        <div
          ref={toastRef}
          className="bg-gray-800/50 text-white text-sm px-6 py-3 rounded-xl opacity-0"
        >
          {data.ui.copied}
        </div>
      </div>

      {/* 상단 툴바 */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 print:hidden">
        <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl px-6 py-3 flex items-center justify-between">
          <Link
            to={`/resume/${currentLang}`}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
          >
            ← Back
          </Link>
          <button
            onClick={() => window.print()}
            className="text-sm px-4 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            🖨️ Print
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-5xl px-6">

        {/* Header */}
        <header className="pt-16 pb-12 border-b border-gray-300">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3">Portfolio</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug tracking-tighter mb-6">
            {header.greeting}
          </h1>
          <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed tracking-tight whitespace-pre-line mb-4">
            {about.description.map((seg, i) =>
              seg.bold ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>
            )}
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {header.hashtags.map((tag, i) => (
              <span key={i} className="text-blue-600 font-medium text-sm md:text-base">{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 text-base md:text-lg text-gray-500">
            {header.contact.email && (
              <a href={`mailto:${header.contact.email}`} className="hover:text-blue-600 transition-colors">
                {header.contact.email}
              </a>
            )}
            {header.contact.phone && (
              <button onClick={copyPhone} className="hover:text-blue-600 transition-colors cursor-pointer">
                {header.contact.phone}
              </button>
            )}
            {header.contact.github && (
              <a href={`https://${header.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                GitHub
              </a>
            )}
            {header.contact.service && (
              <a href={`https://${header.contact.service}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                dongarium
              </a>
            )}
          </div>
            </div>
            <div className="flex-shrink-0">
              <img src={myIcon} alt="profile" className="w-48 h-56 md:w-64 md:h-72 lg:w-80 lg:h-96 object-contain" />
            </div>
          </div>
        </header>

        <main className="pb-16">

          {/* Skills */}
          <section className="py-12 border-b border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{skills.title}</h2>
            <div className="space-y-4">
              {skills.categories.map((cat, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{cat.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span key={item} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="pt-12 pb-16 border-b border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{experience.title}</h2>
            <div className="space-y-10">
              {experience.items.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.position}</h3>
                      <p className="text-blue-600">{item.company}</p>
                    </div>
                    <p className="text-sm text-gray-500 text-right">{item.period}</p>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {item.description.map((desc, j) => <li key={j}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Awards */}
          <section className="py-12 border-b border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{awards.title}</h2>
            <div className="flex gap-12">
              <div className="hidden md:flex flex-shrink-0 w-48 h-48 lg:w-64 lg:h-64 items-center justify-center">
                <div style={{ fontSize: 'clamp(80px, 20vw, 200px)' }}>🏆</div>
              </div>
              <div className="flex-1 space-y-3">
              {awards.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3">
                  <span className="font-semibold text-blue-600 whitespace-nowrap text-sm md:text-base">{item.award}</span>
                  <span className="text-gray-600 text-sm md:text-base">{item.description}</span>
                </div>
              ))}
              </div>
            </div>
          </section>

          {/* Languages */}
          <section className="py-12 border-b border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{languages.title}</h2>
            <div className="space-y-6">
              {languages.items.map((lang, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{lang.name}</h3>
                    <span className="text-yellow-500">{lang.level}</span>
                  </div>
                  <ul className="space-y-1 text-gray-700 text-sm md:text-base">
                    {lang.description.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-10">{projects.title}</h2>
            {projects.items.map((project, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-16">
                <div className="flex-1 flex flex-col gap-4">
                <img src={dongariLogo} alt={project.name} className="h-16 w-auto object-contain" />
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.siteLink && (
                    <a href={project.siteLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                      {project.siteLabel}
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-900 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                      {project.githubLabel}
                    </a>
                  )}
                </div>
                </div>
                <div className="hidden md:flex items-center justify-center w-48 lg:w-64 flex-shrink-0">
                  <img src={dLetter} alt="D" className="w-full h-auto select-none" />
                </div>
              </div>
            ))}
          </section>

        </main>
      </div>
    </div>
  )
}
