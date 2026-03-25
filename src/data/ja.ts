import type { ResumeData } from './types';

export const jaData: ResumeData = {
  header: {
    name: 'ジョン・アジン',
    title: 'フロントエンド開発者',
    contact: {
      email: 'your.email@example.com',
      phone: '+82-10-1234-5678',
      github: 'github.com/yourusername',
      linkedin: 'linkedin.com/in/yourusername',
    },
  },
  about: {
    title: '自己紹介',
    description:
      'React、TypeScript、モダンなWeb技術に精通した情熱的なフロントエンド開発者。直感的で高性能なユーザー体験の創造に注力しています。',
  },
  skills: {
    title: 'スキル',
    categories: [
      {
        name: 'フロントエンド',
        items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      },
      {
        name: 'ツール',
        items: ['Git', 'VS Code', 'npm/yarn', 'ESLint'],
      },
    ],
  },
  experience: {
    title: '経歴',
    items: [
      {
        company: '会社名',
        position: 'フロントエンド開発者',
        period: '2023.01 - 現在',
        description: [
          'ReactとTypeScriptを使用したWebアプリケーションの開発と保守',
          'Tailwind CSSを使用したレスポンシブUIコンポーネントの実装',
          'バックエンドチームと協力してRESTful APIを統合',
        ],
      },
    ],
  },
  projects: {
    title: 'プロジェクト',
    items: [
      {
        name: 'マイレジュメ',
        description: 'モダンなUI/UXを備えた多言語ポートフォリオWebサイト',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        link: 'https://github.com/yourusername/my-resume',
      },
    ],
  },
};
