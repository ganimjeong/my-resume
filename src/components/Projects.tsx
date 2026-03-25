import { ResumeData } from '../data/resume'

interface ProjectsProps {
  data: ResumeData
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Projects</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.projects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-200 p-4 transition hover:border-blue-300 hover:shadow-sm"
          >
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {project.tech.map((t) => (
                <span key={t} className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
