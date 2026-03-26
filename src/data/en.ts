import type { ResumeData } from './types';

export const enData: ResumeData = {
  header: {
    name: 'Ajin JEONG',
    title: 'Frontend & AI Developer',
    greeting: "Hello, I'm Ajin Jeong 👋",
    contact: {
      email: 'ganimjeong@gmail.com',
      phone: '+82 10-3122-5629',
      github: 'github.com/ganimjeong',
      service: 'dongarium.co.kr',
    },
  },
  ui: {
    copied: 'Copied!',
  },
  about: {
    title: 'About Me',
    description: [
      { text: "I'm " },
      { text: 'Ajin Jeong', bold: true },
      { text: ', a developer in ' },
      { text: 'Frontend & AI', bold: true },
      { text: '!\n' },
      { text: 'Major: ' },
      { text: 'IoT AI Convergence', bold: true },
      { text: ',\nPrevious major: Economics,\nMinor: Japanese Language & Literature.' },
    ],
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
