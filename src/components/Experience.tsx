import { resumeData } from '../data/resume'

export default function Experience() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Experience</h2>
      <div className="space-y-6">
        {resumeData.experiences.map((exp, i) => (
          <div key={i} className="border-l-2 border-gray-200 pl-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                <p className="text-sm text-gray-500">{exp.role}</p>
              </div>
              <span className="text-sm text-gray-400">{exp.period}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
