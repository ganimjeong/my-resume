import type { ResumeData } from '../data/types'

interface HeaderProps {
  data: ResumeData
}

export default function Header({ data }: HeaderProps) {
  const { header } = data

  return (
    <header className="py-12 border-b border-gray-300">
      <h1 className="text-4xl font-bold text-gray-900">{header.name}</h1>
      <p className="text-xl text-gray-600 mt-2">{header.title}</p>
      
      <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
        {header.contact.email && (
          <a 
            href={`mailto:${header.contact.email}`}
            className="hover:text-blue-600 transition-colors"
          >
            {header.contact.email}
          </a>
        )}
        {header.contact.phone && (
          <span>{header.contact.phone}</span>
        )}
        {header.contact.github && (
          <a 
            href={`https://${header.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        )}
        {header.contact.linkedin && (
          <a 
            href={`https://${header.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            LinkedIn
          </a>
        )}
      </div>
    </header>
  )
}
