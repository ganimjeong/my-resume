import type { ResumeData } from './types';

export const koData: ResumeData = {
  header: {
    name: '정아진',
    title: '프론트엔드 & AI 개발자',
    greeting: '안녕하세요, Ajin Jeong 입니다 👋',
    contact: {
      email: 'ganimjeong@gmail.com',
      phone: '+82 10-3122-5629',
      github: 'github.com/ganimjeong',
      service: 'dongarium.co.kr',
    },
  },
  ui: {
    copied: '복사되었습니다',
  },
  about: {
    title: '소개',
    description: [
      { text: '저는 ' },
      { text: '프론트엔드와 인공지능', bold: true },
      { text: ' 분야를 개발하는 ' },
      { text: '정아진', bold: true },
      { text: '입니다!\n' },
      { text: '주전공은 ' },
      { text: 'IoT인공지능융합전공', bold: true },
      { text: ',\n융합 이전 전공은 경제학과,\n부전공은 일어일문학과입니다.' },
    ],
  },
  skills: {
    title: '기술',
    categories: [
      {
        name: '프론트엔드',
        items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      },
      {
        name: '도구',
        items: ['Git', 'VS Code', 'npm/yarn', 'ESLint'],
      },
    ],
  },
  experience: {
    title: '경력',
    items: [
      {
        company: '회사명',
        position: '프론트엔드 개발자',
        period: '2023.01 - 현재',
        description: [
          'React와 TypeScript를 사용한 웹 애플리케이션 개발 및 유지보수',
          'Tailwind CSS를 사용한 반응형 UI 컴포넌트 구현',
          '백엔드 팀과 협업하여 RESTful API 통합',
        ],
      },
    ],
  },
  projects: {
    title: '프로젝트',
    items: [
      {
        name: '나의 이력서',
        description: '모던한 UI/UX를 갖춘 다국어 포트폴리오 웹사이트',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        link: 'https://github.com/yourusername/my-resume',
      },
    ],
  },
};
