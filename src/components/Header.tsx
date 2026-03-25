import { ResumeData } from '../data/resume'

interface HeaderProps {
  data: ResumeData
}

export default function Header({ data }: HeaderProps) {
  return (
    <header className="py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
      <p className="mt-2 text-xl text-gray-500">{data.title}</p>
      <div className="mt-4 flex justify-center gap-4 text-sm">
        <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">
          {data.email}
        </a>
        <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          GitHub
        </a>
      </div>
    </header>
  )
}
