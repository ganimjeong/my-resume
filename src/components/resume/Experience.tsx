import type { ResumeData } from '@/data/types'

interface ExperienceProps {
  data: ResumeData
}

export default function Experience({ data }: ExperienceProps) {
  const { experience } = data

  return (
    <section className="pt-12 pb-24 border-b border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{experience.title}</h2>
      <div className="space-y-14">
        {experience.items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.position}
                </h3>
                <p className="text-gray-600">{item.company}</p>
              </div>
              <p className="text-sm text-gray-500">{item.period}</p>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {item.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
