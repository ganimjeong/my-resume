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
        items: [
          'JavaScript', 'TypeScript',
          'React', 'React Hooks', 'React Router', 'React Hook Form',
          'Context API', 'Redux', 'Zustand',
          'Tailwind CSS', 'Styled-components',
          'Vite', 'GSAP', 'Mobile-First Design', 'Memoization', 'SEO / GA',
        ],
      },
      {
        name: 'Backend / Infra',
        items: ['Axios', 'Firebase', 'Supabase', 'MySQL', 'GitHub Pages', 'Nginx', 'AWS'],
      },
      {
        name: 'Dev Tools',
        items: ['Git', 'npm / yarn', 'ESLint', 'Prettier', 'Husky', 'Vitest', 'MSW'],
      },
      {
        name: 'Collaboration',
        items: ['GitHub Projects', 'Jira', 'Notion', 'Slack', 'Discord', 'Agile / Scrum'],
      },
    ],
  },
  experience: {
    title: 'Experience & Activities',
    items: [
      {
        position: 'Exchange Student & Researcher',
        company: 'University of Missouri St. Louis',
        period: '2024.08 - 2025.01 (6 months) | Missouri, USA',
        description: [
          'Selected as Korea-US AI Science Scholar for Computer Science exchange program',
          'Conducted AI technology research and submitted report to KIAT (Korea Institute for Advancement of Technology)',
          'Participated in Computer Science team projects with multinational collaboration',
          'Studied multiple languages including English, Japanese, and Spanish',
        ],
      },
      {
        position: 'Engineer Intern',
        company: 'CAL Co., Ltd.',
        period: '2024.06 - 2024.07 (1 month) | Osaka, Japan',
        description: [
          'Performed engineering duties and submitted daily work reports in Japanese-only environment',
          'Conducted coding mentorship for interns (Python, SQL, AI fundamentals)',
          'Proposed and led intern team project, designed tech specifications for AI web service development',
          'Selected as top intern and presented project outcomes',
          'Subsequently selected as Korea-Japan IT Exchange interpreter scholarship student',
        ],
      },
      {
        position: 'Undergraduate Research Assistant',
        company: 'HML Human Media Lab',
        period: '2023.06 - 2024.06 (1 year)',
        description: [
          'Developed OCR-based automatic account transfer technology',
          'Conducted research on image processing and Natural Language Processing (NLP), participated in AI study groups',
          'Collaborated with Ritsumeikan University research lab in Japan and served as student interpreter',
          'Facilitated Shibaura Institute of Technology gPBL program and Japan-Korea university exchange events',
          'Selected as Presidential Science Scholar, awarded medal and certificate by the President',
        ],
      },
      {
        position: 'Founder & President',
        company: 'LikeLion University — Chonnam National University',
        period: '2021.12 - 2022.12 (1 year)',
        description: [
          'Initiated contact with LikeLion HQ and led establishment of Chonnam National University chapter',
          'Planned, designed, and managed comprehensive coding education program for university students',
          'Taught frontend development, algorithms, planning, and design to 38 students',
          'Organized and participated in 2 web service hackathons',
          'Multiple graduates joined AI research labs and IT companies; founded subsequent IT clubs',
          'Managed organization and events with over 100 participants',
        ],
      },
      {
        position: 'Captain',
        company: "President's Honor Students Association",
        period: '2020.08 - 2025.08 (5 years)',
        description: [
          "Admitted with excellent academic record, served as captain of President's Honor Students for 5 years",
          'Planned, operated, and participated in reading discussions, educational volunteering, and presidential events',
          'Facilitated campus debate events',
          'Planned and operated upcycling class at Yaho Children\'s Center (utilizing sewing skills)',
          'Led tutoring and community service activities at Bukgu Children\'s Center',
          'Organized booths for historical events and campus festivals',
        ],
      },
      {
        position: 'Frontend Development Graduate',
        company: 'Kakao Tech Campus',
        period: '2025.04 - 2025.11 (approx. 8 months)',
        description: [
          'Selected for Frontend Development track',
          'Completed 150+ advanced JavaScript and React lectures (Git, CI/CD, AWS, Figma, UI/UX included)',
          'Conducted clone coding projects with weekly code reviews from industry professionals',
          "Participated in development of 'Dongari-um', an integrated platform for university clubs",
          'Deployed service after November graduation — reached 90,000 page views as of March 2026 (GA)',
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
