import { ResumeData } from '../data/resume'

interface AboutProps {
  data: ResumeData
}

export default function About({ data }: AboutProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">About</h2>
      <p className="text-gray-600 leading-relaxed">{data.bio}</p>
    </section>
  )
}
