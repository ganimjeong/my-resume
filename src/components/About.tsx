import { resumeData } from '../data/resume'

export default function About() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">About</h2>
      <p className="text-gray-600 leading-relaxed">{resumeData.bio}</p>
    </section>
  )
}
