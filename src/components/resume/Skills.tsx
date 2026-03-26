import type { ResumeData } from '@/data/types'

interface SkillsProps {
  data: ResumeData
}

export default function Skills({ data }: SkillsProps) {
  const { skills } = data

  return (
    <section className="py-12 border-b border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{skills.title}</h2>
      <div className="space-y-6">
        {skills.categories.map((category) => (
          <div key={category.name}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
