export interface ResumeData {
  name: string
  title: string
  email: string
  github: string
  bio: string
  skills: {
    category: string
    items: string[]
  }[]
  experiences: {
    company: string
    role: string
    period: string
    description: string
  }[]
  projects: {
    name: string
    description: string
    tech: string[]
    link: string
  }[]
}

export const resumeData: Record<'en' | 'ja' | 'ko', ResumeData> = {
  en: {
    name: 'Ajin',
    title: 'Frontend Developer',
    email: 'your@email.com',
    github: 'https://github.com/ganimjeong',
    bio: 'A frontend developer who thinks centered on user experience.',

    skills: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
      { category: 'Backend', items: ['Node.js', 'Express'] },
      { category: 'Tools', items: ['Git', 'Vite', 'Figma'] },
    ],

    experiences: [
      {
        company: 'Company Name',
        role: 'Position',
        period: '2024.01 - Present',
        description: 'Write your main responsibilities here.',
      },
    ],

    projects: [
      {
        name: 'Project Name',
        description: 'Write your project description here.',
        tech: ['React', 'TypeScript'],
        link: 'https://github.com/ganimjeong',
      },
    ],
  },

  ja: {
    name: 'Ajin',
    title: 'フロントエンド開発者',
    email: 'your@email.com',
    github: 'https://github.com/ganimjeong',
    bio: 'ユーザー体験を中心に考えるフロントエンド開発者です。',

    skills: [
      { category: 'フロントエンド', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
      { category: 'バックエンド', items: ['Node.js', 'Express'] },
      { category: 'ツール', items: ['Git', 'Vite', 'Figma'] },
    ],

    experiences: [
      {
        company: '会社名',
        role: '役職',
        period: '2024.01 - 現在',
        description: '主な業務内容を記入してください。',
      },
    ],

    projects: [
      {
        name: 'プロジェクト名',
        description: 'プロジェクトの説明を記入してください。',
        tech: ['React', 'TypeScript'],
        link: 'https://github.com/ganimjeong',
      },
    ],
  },

  ko: {
    name: 'Ajin',
    title: '프론트엔드 개발자',
    email: 'your@email.com',
    github: 'https://github.com/ganimjeong',
    bio: '사용자 경험을 중심으로 생각하는 프론트엔드 개발자입니다.',

    skills: [
      { category: '프론트엔드', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
      { category: '백엔드', items: ['Node.js', 'Express'] },
      { category: '도구', items: ['Git', 'Vite', 'Figma'] },
    ],

    experiences: [
      {
        company: '회사명',
        role: '직책',
        period: '2024.01 - 현재',
        description: '주요 업무 내용을 작성하세요.',
      },
    ],

    projects: [
      {
        name: '프로젝트명',
        description: '프로젝트 설명을 작성하세요.',
        tech: ['React', 'TypeScript'],
        link: 'https://github.com/ganimjeong',
      },
    ],
  },
}
