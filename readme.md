# Ajin's Resume

**언어 / Language / 言語**
&nbsp;·&nbsp;[한국어](README.md)
&nbsp;·&nbsp;[English](README.en.md)
&nbsp;·&nbsp;[日本語](README.ja.md)

---

## 한국어

React + TypeScript로 제작한 다국어 인터랙티브 포트폴리오 웹사이트입니다.
GSAP 기반의 풍부한 애니메이션과 Lenis 스무스 스크롤이 적용되어 있습니다.

**데모:** https://ganimjeong.github.io/my-resume

---

### 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| UI | React 19, TypeScript 5.7 |
| 스타일 | Tailwind CSS v3 |
| 애니메이션 | GSAP 3.14 (ScrollTrigger, SplitText, Physics2DPlugin) |
| 스크롤 | Lenis |
| 라우팅 | React Router DOM v6 |
| 빌드 | Vite 6 |
| 배포 | GitHub Pages (GitHub Actions 자동 배포) |

---

### 주요 기능 및 인터랙션

- **3개 언어 지원** — 랜딩 페이지에서 한국어 / 영어 / 일본어 선택
- **ShapeOverlay 페이지 전환** — SVG 곡선 웨이브가 오렌지 그라데이션으로 화면을 쓸며 전환
- **SplitText 스크롤 애니메이션** — About 소개글·동아리움 설명이 스크롤에 따라 줄 단위로 마스크 해제
- **클릭 파티클 이펙트** — `Physics2DPlugin`으로 클릭 위치에서 파티클 폭발
- **스크롤 연동 회전** — 수상경력 🏆, 프로젝트 D 이미지가 스크롤에 따라 -45° → +45° 회전
- **스크롤 속도 기반 기울기** — Languages 섹션이 빠른 스크롤 시 `skewY`로 기울어짐
- **커서 추적 눈** — 푸터 SVG 눈의 홍채·동공이 마우스를 따라 이동 (`clipPath`로 눈 범위 제한)
- **Lenis 스무스 스크롤** — 부드러운 관성 스크롤 (GSAP ScrollTrigger와 연동)
- **아코디언 언어 섹션** — Languages 항목 클릭 시 GSAP 높이 애니메이션으로 펼침
- **연락처 복사** — 전화번호 클릭 시 클립보드 복사 + GSAP 토스트 알림

---

### 파일 구조

```
src/
├── pages/
│   ├── Landing.tsx          # 언어 선택 랜딩 (3D 롤링 텍스트, SplitText)
│   └── Resume.tsx           # 이력서 메인 레이아웃
├── components/
│   ├── resume/
│   │   ├── Header.tsx       # 인사말, About 소개, 연락처
│   │   ├── Skills.tsx       # 기술 스택 카테고리
│   │   ├── Experience.tsx   # 경력 / 경험 (우→좌 슬라이드인)
│   │   ├── Awards.tsx       # 수상 경력 (🏆 스크롤 회전)
│   │   ├── Languages.tsx    # 언어 능력 아코디언 (skewY 인터랙션)
│   │   ├── Projects.tsx     # 진행중인 프로젝트 (D 이미지 회전, SplitText)
│   │   └── Footer.tsx       # 오렌지 푸터 (커브 스와이프 등장, 커서 추적 눈)
│   ├── gallery/
│   │   └── BentoGallery.tsx # Bento 이미지 갤러리
│   └── shared/
│       ├── ShapeOverlay.tsx # 페이지 전환 SVG 웨이브 오버레이
│       └── ClickEffect.tsx  # 클릭 파티클 이펙트 (Physics2DPlugin)
├── data/
│   ├── types.ts             # ResumeData 인터페이스 (단일 진실 공급원)
│   ├── ko.ts                # 한국어 콘텐츠
│   ├── en.ts                # 영어 콘텐츠
│   ├── ja.ts                # 일본어 콘텐츠
│   └── index.ts             # 언어 → 데이터 매핑
└── index.css                # Tailwind 전역 스타일
```

---

### 개발 환경

**요구사항:** Node.js 20+

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:5173/my-resume/

# 프로덕션 빌드 (타입 체크 포함)
npm run build

# 빌드 결과 미리보기
npm run preview
```

로케일별 접근:
```
http://localhost:5173/my-resume/resume/ko
http://localhost:5173/my-resume/resume/en
http://localhost:5173/my-resume/resume/ja
```

---

### GSAP 플러그인

모든 플러그인은 사용 전 반드시 등록합니다.

```ts
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, Physics2DPlugin)
```

---

### 콘텐츠 수정

- 이력서 내용 수정: `src/data/ko.ts` (또는 `en.ts`, `ja.ts`)
- 새 섹션 추가: `types.ts` 타입 수정 → 세 언어 파일 모두 내용 추가 → 컴포넌트 생성 → `Resume.tsx`에 추가
- **주의:** 세 언어 파일이 항상 `ResumeData` 타입과 일치해야 합니다. TypeScript가 불일치를 잡아줍니다.

---

### 배포

`master` 브랜치 push 시 GitHub Actions가 자동으로 `dist/`를 GitHub Pages에 배포합니다.
`vite.config.ts`의 `base: '/my-resume/'`는 변경하지 마세요.
