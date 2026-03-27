import type { ResumeData } from './types';

export const koData: ResumeData = {
  header: {
    name: '정아진',
    title: '프론트엔드 & AI 개발자',
    greeting: '안녕하세요, Ajin Jeong 입니다 👋',
    hashtags: ['# 대통령 장학생', '# 멘사 정회원'],
    contact: {
      email: 'ganimjeong@gmail.com',
      phone: '+82 10-3122-5629',
      github: 'github.com/ganimjeong',
      service: 'dongarium.co.kr',
    },
  },
  ui: {
    copied: '복사되었습니다',
    printLabel: '인터랙션 없이 보기',
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
        items: [
          'JavaScript', 'TypeScript',
          'React', 'React Hooks', 'React Router', 'React Hook Form',
          'Context API', 'Redux', 'Zustand',
          'Tailwind CSS', 'Styled-components',
          'Vite', 'GSAP', 'Mobile-First Design', 'Memoization', 'SEO / GA',
        ],
      },
      {
        name: '백엔드 / 인프라',
        items: ['Axios', 'Firebase', 'Supabase', 'MySQL', 'GitHub Pages', 'Nginx', 'AWS'],
      },
      {
        name: '개발 도구',
        items: ['Git', 'npm / yarn', 'ESLint', 'Prettier', 'Husky', 'Vitest', 'MSW'],
      },
      {
        name: '협업',
        items: ['GitHub Projects', 'Jira', 'Notion', 'Slack', 'Discord', 'Agile / Scrum'],
      },
    ],
  },
  experience: {
    title: '경력 / 경험',
    items: [
      {
        position: '교환학생 & 연구원',
        company: 'University of Missouri St. Louis',
        period: '2024.08 - 2025.01 (6개월) | 미국 미주리주',
        description: [
          'AI 분야 한미 과학장학생으로 선정되어 컴퓨터사이언스 전공 교환학생 수행',
          'AI 기술 실태 보고서 작성 및 KIAT(한국산업기술진흥원) 제출',
          '컴퓨터사이언스 팀 프로젝트 수행 및 다국적 협업 경험',
          '영어, 일본어, 스페인어 등 다국어 학습',
        ],
      },
      {
        position: '엔지니어 인턴',
        company: 'CAL株式会社 (CAL Co., Ltd.)',
        period: '2024.06 - 2024.07 (1개월) | 일본 오사카',
        description: [
          '엔지니어 직무 수행 및 매일 업무일보 작성 (일본어 근무환경)',
          '인턴 대상 코딩 멘토링 진행 (Python, SQL, AI 기초교육)',
          '인턴 팀 프로젝트 기획 제안 및 승인, AI 웹서비스 개발 테크스펙 설계',
          '인턴 평가 최우수 인턴 선정 및 성과발표 진행',
          '이후 한일 IT 교류사업 통역근로장학생으로 선발',
        ],
      },
      {
        position: '학부 연구생',
        company: 'HML 휴먼미디어연구소',
        period: '2023.06 - 2024.06 (1년)',
        description: [
          'OCR 기반 계좌이체 자동연동 기술 개발',
          '이미지 처리 및 자연어 처리(NLP) 기술 연구 및 AI스터디',
          '일본 릿슈메이칸 대학 연구소와 협업 및 학생 통역',
          '시마우라공업대학 gPBL 프로그램 및 일본 대학 교류 행사 진행',
          '대통령과학장학생 선발, 대통령 상과 메달 수여',
        ],
      },
      {
        position: '회장 (Founder & President)',
        company: '멋쟁이사자처럼 대학 전남대학교',
        period: '2021.12 - 2022.12 (1년)',
        description: [
          '멋쟁이사자처럼 본사 컨택 및 전남대학교 지부 도입 주도',
          '전남대학교 대학생 대상 코딩교육 프로그램 기획/설계/운영 총괄',
          '38명 학생 대상 프론트엔드, 알고리즘, 기획, 디자인 교육 진행',
          '2회 웹서비스 해커톤 기획, 운영 및 참여',
          '교육 수료생 다수 AI 연구실 및 IT 기업 취업, 후속 IT 동아리 창립 등 성과 배출',
          '100명 이상 규모 조직 및 행사 운영 경험',
        ],
      },
      {
        position: '기장 (Captain)',
        company: '총장명예학생회',
        period: '2020.08 - 2025.08 (5년)',
        description: [
          '우수 성적 입학 후 총장명예학생 조직 기장으로 5년간 활동',
          '독서토론, 교육봉사, 도전활동, 총장 주최 행사 등 다수 기획/운영/참여',
          '교내 토론 행사 진행',
          '야호 아동센터 리사이클(새활용) 클래스 기획 및 운영 (미싱 활용)',
          '북구 아동센터 학습 멘토링 및 공익 활동 주도',
          '역사 행사 및 축제 부스 기획 운영',
        ],
      },
      {
        position: '프론트엔드 개발 수료생',
        company: '카카오 테크 캠퍼스',
        period: '2025.04 - 2025.11 (약 8개월)',
        description: [
          '프론트엔드 파트 선발',
          'JavaScript, React 심화 강의 150개 분량 수료 (Git, CI/CD, AWS, Figma, UI/UX 포함)',
          '클론 코딩 프로젝트 진행 및 현직 개발자 주간 코드 리뷰 수행',
          "대학 동아리 지원 통합 플랫폼 '동아리움(dongari-um)' 개발 참여",
          '11월 수료 후 실제 서비스 배포 — 2026.03 GA 기준 페이지뷰 9만 돌파',
        ],
      },
    ],
  },
  projects: {
    title: '진행중인 프로젝트',
    items: [
      {
        name: '동아리움',
        description: '대학 동아리 지원 통합 플랫폼으로, 카카오 테크 캠퍼스 팀 프로젝트로 시작해 실제 서비스로 성장했습니다. 2026년 3월 기준 GA 페이지뷰 9만을 돌파했으며, 현재도 운영 중입니다.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        siteLink: 'https://dongarium.co.kr',
        githubLink: 'https://github.com/kakao-tech-campus-3rd-step3/Team18_FE',
        siteLabel: '사이트 보기',
        githubLabel: 'GitHub 보기',
      },
    ],
  },
  awards: {
    title: '🏆 수상 경력',
    items: [
      { award: '최우수상', description: '2024 해외취업 인턴십 성과보고회' },
      { award: '모범상', description: '전남대학교 (졸업생 중 자기계발기록부 1등)' },
      { award: '대상', description: '2022 학생 창업컨퍼런스 부산 미래기업가상' },
      { award: '은상', description: 'AI Cloud 경진대회' },
      { award: '최우수상', description: '2021 GIST Mini I-Corps 창업 경진대회' },
      { award: '우수상', description: '2021 CNU Start-Up 경진대회 / 기획 및 개발' },
      { award: '총장상(장려상)', description: '2021 광주-전남이 읽고 톡하다 재학생 독서클럽' },
      { award: '아이디어상', description: '2022 3D 프린터 활용 보조기기 공모전' },
      { award: '가작상', description: '2022 공학수기 공모전' },
      { award: '대상', description: '2022 호남제주권 연합대학 창업캠프 메이커톤' },
      { award: '베스트아이디어상', description: '2022 호남제주권 연합대학 창업캠프 메이커톤' },
      { award: '장려상', description: 'SAH 4차 미래상상대회 아이디어 공모전' },
      { award: '노력상', description: '공학수학 프로그램' },
      { award: '최우수영상선정', description: '전남대 열작 코로나블루 UCC 제작 / 팀장' },
      { award: '최우수영상선정', description: '아동센터봉사활동 UCC 제작 / 팀장' },
      { award: '최우수영상선정', description: '독서토론 UCC 제작' },
    ],
  },
  languages: {
    title: '💬 Languages',
    items: [
      {
        name: '🌐 Korean',
        level: '⭐⭐⭐⭐⭐',
        description: [
          '모국어',
          '미국 고등학생 대상 한국어 교육봉사',
          '일본인 / 중국인 대상 한국어 단기 개인과외',
          '광주광역시 교육청 작문상 수상',
          '문학영재 선발',
          '작문 수상 다수',
        ],
      },
      {
        name: '🌐 Japanese',
        level: '⭐⭐⭐⭐',
        description: [
          '(전) 주전공',
          '(현) 부전공',
          '2024년 인턴 근무 : 오사카 현지 개발인턴',
          '릿슈메이칸 대학 gPBL 교류프로그램 통역가 활동',
          '학생프로그램 단기 통역가 선발',
          '일본인과 거주 경험 (미국 교환)',
          '일본어 회화 스터디 운영',
        ],
      },
      {
        name: '🌐 English',
        level: '⭐⭐⭐⭐',
        description: [
          '2008년 미국 거주',
          '2024년 교환학생 : 미주리대학교 컴퓨터사이언스 전공 교환학생',
          '2025년 호주 거주',
          '미국인과 거주 경험 (미국 교환)',
          '현지 발표수업 다회',
          '미국 고등학생 대상 한국어 교육봉사',
        ],
      },
      {
        name: '🌐 Chinese',
        level: '⭐⭐',
        description: [
          '공자학원 (중국어학원)',
          '중국 단기어학연수',
          '중국인과 거주경험 (대학 기숙사) 2년',
          '대만인과 거주경험 (미국 교환)',
        ],
      },
      {
        name: '🌐 Spanish',
        level: '⭐',
        description: [
          '미주리 대학에서 스페인어 교양 수강',
          '페루인과 거주 경험 (미국 교환)',
        ],
      },
    ],
  },
};
