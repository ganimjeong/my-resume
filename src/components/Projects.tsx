import type { ResumeData } from '../data/types'

interface ProjectsProps {
  data: ResumeData
}

export default function Projects({ data }: ProjectsProps) {
  const { projects } = data

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{projects.title}</h2>
      <div className="space-y-6">
        {projects.items.map((project) => (
          <div
            key={project.name}
            className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>
            </div>
            <p className="text-gray-700 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
