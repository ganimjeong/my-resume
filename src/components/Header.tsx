import { resumeData } from '../data/resume'

export default function Header() {
  return (
    <header className="py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900">{resumeData.name}</h1>
      <p className="mt-2 text-xl text-gray-500">{resumeData.title}</p>
      <div className="mt-4 flex justify-center gap-4 text-sm">
        <a href={`mailto:${resumeData.email}`} className="text-blue-600 hover:underline">
          {resumeData.email}
        </a>
        <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          GitHub
        </a>
      </div>
    </header>
  )
}
