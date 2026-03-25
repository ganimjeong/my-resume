import type { ResumeData } from '../data/types'

interface AboutProps {
  data: ResumeData
}

export default function About({ data }: AboutProps) {
  const { about } = data

  return (
    <section className="py-12 border-b border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{about.title}</h2>
      <p className="text-gray-700 leading-relaxed">{about.description}</p>
    </section>
  )
}
