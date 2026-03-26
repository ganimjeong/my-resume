import type { ResumeData } from './types';

export const jaData: ResumeData = {
  header: {
    name: 'ジョン・アジン',
    title: 'フロントエンド & AI 開発者',
    greeting: 'はじめまして、ジョン・アジンです 👋',
    contact: {
      email: 'ganimjeong@gmail.com',
      phone: '+82 10-3122-5629',
      github: 'github.com/ganimjeong',
      service: 'dongarium.co.kr',
    },
  },
  ui: {
    copied: 'コピーしました',
  },
  about: {
    title: '自己紹介',
    description: [
      { text: '私は' },
      { text: 'フロントエンド・AI', bold: true },
      { text: '分野を開発する' },
      { text: 'ジョン・アジン', bold: true },
      { text: 'です！\n' },
      { text: '主専攻は' },
      { text: 'IoT人工知能融合専攻', bold: true },
      { text: '、\n融合前の専攻は経済学科、\n副専攻は日本語日本文学科です。' },
    ],
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
