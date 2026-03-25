import { resumeData } from '../data/resume'

export default function Skills() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Skills</h2>
      <div className="space-y-3">
        {resumeData.skills.map((group) => (
          <div key={group.category} className="flex gap-4">
            <span className="w-24 shrink-0 text-sm font-medium text-gray-500">{group.category}</span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">
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
