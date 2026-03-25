import type { ResumeData } from './types';

export const koData: ResumeData = {
  header: {
    name: '정아진',
    title: '프론트엔드 개발자',
    contact: {
      email: 'your.email@example.com',
      phone: '+82-10-1234-5678',
      github: 'github.com/yourusername',
      linkedin: 'linkedin.com/in/yourusername',
    },
  },
  about: {
    title: '소개',
    description:
      'React, TypeScript 및 최신 웹 기술에 전문성을 갖춘 열정적인 프론트엔드 개발자입니다. 직관적이고 성능이 뛰어난 사용자 경험을 만드는 데 집중하고 있습니다.',
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
