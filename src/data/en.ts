import type { ResumeData } from './types';

export const enData: ResumeData = {
  header: {
    name: 'Ajin JEONG',
    title: 'Frontend Developer',
    contact: {
      email: 'your.email@example.com',
      phone: '+82-10-1234-5678',
      github: 'github.com/yourusername',
      linkedin: 'linkedin.com/in/yourusername',
    },
  },
  about: {
    title: 'About Me',
    description:
      'Passionate Frontend Developer with expertise in React, TypeScript, and modern web technologies. Focused on creating intuitive and performant user experiences.',
  },
  skills: {
    title: 'Skills',
    categories: [
      {
        name: 'Frontend',
        items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      },
      {
        name: 'Tools',
        items: ['Git', 'VS Code', 'npm/yarn', 'ESLint'],
      },
    ],
  },
  experience: {
    title: 'Experience',
    items: [
      {
        company: 'Company Name',
        position: 'Frontend Developer',
        period: '2023.01 - Present',
        description: [
          'Developed and maintained web applications using React and TypeScript',
          'Implemented responsive UI components with Tailwind CSS',
          'Collaborated with backend team to integrate RESTful APIs',
        ],
      },
    ],
  },
  projects: {
    title: 'Projects',
    items: [
      {
        name: 'My Resume',
        description: 'Multi-language portfolio website with modern UI/UX',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        link: 'https://github.com/yourusername/my-resume',
      },
    ],
  },
};
