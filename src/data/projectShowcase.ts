// 프로젝트 상세 소개(쇼케이스) 페이지 전용 데이터.
// 이력서 본문의 간단한 projects 와 별개로, 채용자 관점에서 매력적으로 보여주기 위한 풍부한 구조.
// 스크린샷 이미지는 public/projects/<slug>/ 에 넣고 src 에 절대경로(BASE_URL 기준)로 참조한다.

export type Language = 'en' | 'ja' | 'ko';

export type ShowcaseLinkType = 'site' | 'github' | 'other';

export interface ShowcaseLink {
  label: string;
  url: string;
  type: ShowcaseLinkType;
}

export interface ShowcaseStat {
  /** 보여줄 값 (예: "90,000+", "5") */
  value: string;
  label: string;
}

export interface ShowcaseFeature {
  title: string;
  desc: string;
}

export interface ShowcaseImage {
  /** public/ 기준 경로. 예: "projects/dongarium/main.png" (앞에 BASE_URL 이 자동으로 붙는다) */
  src: string;
  alt?: string;
  caption?: string;
  /** 갤러리에서 가로로 넓게(2칸) 표시할지 여부 */
  wide?: boolean;
}

/** 운영 채널(예: 인스타그램 계정) — 팔로워 수 어필용 */
export interface ShowcaseChannel {
  handle: string;
  followers: string;
  note: string;
}

export interface ShowcaseProject {
  /** URL/폴더 식별자. 영문 소문자-하이픈. */
  slug: string;
  name: string;
  /** 이름 아래 한 줄 후킹 문구 */
  tagline: string;
  period: string;
  role: string;
  /** 도입부 문단들 */
  summary: string[];
  stats: ShowcaseStat[];
  features: ShowcaseFeature[];
  techStack: string[];
  links: ShowcaseLink[];
  images: ShowcaseImage[];
  /** 갤러리 첫 이미지 대신 카드 썸네일로 쓸 전용 이미지 (public/ 기준 경로). 없으면 images[0] 사용. */
  thumbnail?: string;
  /** 카드 썸네일 채움 방식. 세로(폰) 캡처는 'contain'으로 잘림 방지. 기본 'cover'. */
  thumbnailFit?: 'cover' | 'contain';
  /** 운영 채널(인스타 계정 등). 있으면 별도 섹션으로 노출. */
  channels?: ShowcaseChannel[];
  /** 헤더에 표시할 상태 배지 (예: "2026년 7월 출시 예정"). */
  status?: string;
  /** 갤러리 이미지가 아직 없을 때 'coming soon' 자리표시자를 보여줄지 여부. */
  galleryPending?: boolean;
  /** 포인트 컬러 (hex). 섹션 강조에 사용. */
  accent: string;
}

export interface ShowcaseData {
  pageTitle: string;
  pageSubtitle: string;
  backLabel: string;
  /** 더보기 버튼 등에 쓰는 라벨 */
  moreLabel: string;
  /** 본문 라벨 (역할/기간/기술스택 헤딩 등) */
  labels: {
    role: string;
    period: string;
    techStack: string;
    highlights: string;
    features: string;
    gallery: string;
    channels: string;
    visit: string;
  };
  projects: ShowcaseProject[];
}

const DONGARIUM_IMAGES_KO: ShowcaseImage[] = [
  { src: 'projects/dongarium/01-main.png', caption: '메인 화면', wide: true },
  { src: 'projects/dongarium/02-club-detail.png', caption: '동아리 상세 페이지' },
  { src: 'projects/dongarium/03-club-edit.png', caption: '동아리 정보 수정 (운영진)' },
  { src: 'projects/dongarium/04-applicant-management.png', caption: '지원자 관리 화면 (운영진)' },
  { src: 'projects/dongarium/05-applicant-detail.png', caption: '지원자 상세 페이지' },
];
const DONGARIUM_IMAGES_EN: ShowcaseImage[] = [
  { src: 'projects/dongarium/01-main.png', caption: 'Home screen', wide: true },
  { src: 'projects/dongarium/02-club-detail.png', caption: 'Club detail page' },
  { src: 'projects/dongarium/03-club-edit.png', caption: 'Editing club info (organizers)' },
  { src: 'projects/dongarium/04-applicant-management.png', caption: 'Applicant management (organizers)' },
  { src: 'projects/dongarium/05-applicant-detail.png', caption: 'Applicant detail page' },
];
const DONGARIUM_IMAGES_JA: ShowcaseImage[] = [
  { src: 'projects/dongarium/01-main.png', caption: 'メイン画面', wide: true },
  { src: 'projects/dongarium/02-club-detail.png', caption: 'サークル詳細ページ' },
  { src: 'projects/dongarium/03-club-edit.png', caption: 'サークル情報の編集（運営）' },
  { src: 'projects/dongarium/04-applicant-management.png', caption: '応募者管理画面（運営）' },
  { src: 'projects/dongarium/05-applicant-detail.png', caption: '応募者詳細ページ' },
];

const KAKAO_IMAGES_KO: ShowcaseImage[] = [
  { src: 'projects/kakao-map-capture/01-result-radius.png', caption: '주소별 100m 반경이 표시된 최종 결과 지도', wide: true },
  { src: 'projects/kakao-map-capture/02-load-locations.png', caption: '선관위 사전투표소 주소 자동 불러오기' },
  { src: 'projects/kakao-map-capture/03-tile-comparison.png', caption: '기본 / 한국어 지도 스타일 비교' },
  { src: 'projects/kakao-map-capture/04-progress.png', caption: '주소별 실시간 캡처 진행 화면' },
  { src: 'projects/kakao-map-capture/05-zip-results.png', caption: '주소·투표소명으로 자동 정리된 ZIP 결과물' },
];
const KAKAO_IMAGES_EN: ShowcaseImage[] = [
  { src: 'projects/kakao-map-capture/01-result-radius.png', caption: 'Final map output with a 100m radius per address', wide: true },
  { src: 'projects/kakao-map-capture/02-load-locations.png', caption: 'Auto-loading early-voting addresses from the national Election Commission database' },
  { src: 'projects/kakao-map-capture/03-tile-comparison.png', caption: 'Default vs. Korean map-tile styles' },
  { src: 'projects/kakao-map-capture/04-progress.png', caption: 'Live per-address capture progress' },
  { src: 'projects/kakao-map-capture/05-zip-results.png', caption: 'ZIP output auto-named by address / polling-station' },
];
const KAKAO_IMAGES_JA: ShowcaseImage[] = [
  { src: 'projects/kakao-map-capture/01-result-radius.png', caption: '住所ごとに100m半径を表示した最終地図', wide: true },
  { src: 'projects/kakao-map-capture/02-load-locations.png', caption: '選管の期日前投票所の住所を自動読み込み' },
  { src: 'projects/kakao-map-capture/03-tile-comparison.png', caption: '基本 / 韓国語マップスタイルの比較' },
  { src: 'projects/kakao-map-capture/04-progress.png', caption: '住所ごとのリアルタイムキャプチャ進行画面' },
  { src: 'projects/kakao-map-capture/05-zip-results.png', caption: '住所・投票所名で自動整理されたZIP成果物' },
];

const SHORTSPER_IMAGES_KO: ShowcaseImage[] = [
  { src: 'projects/shortsper/01-main.png', caption: '메인 페이지', wide: true },
  { src: 'projects/shortsper/02-setup.png', caption: '대본 추출 설정' },
  { src: 'projects/shortsper/03-hook-extraction.png', caption: '후킹 멘트 추출' },
  { src: 'projects/shortsper/04-script-segments.png', caption: '대본 세그먼트 추출' },
  { src: 'projects/shortsper/05-reels-analysis.png', caption: '릴스 분석' },
  { src: 'projects/shortsper/06-card-view.png', caption: '추출 결과 카드 뷰' },
  { src: 'projects/shortsper/07-overview.png', caption: '대본 추출 기능 전체 보기' },
  { src: 'projects/shortsper/08-keyword-trends.png', caption: '키워드 트렌드 리서치' },
  { src: 'projects/shortsper/09-reference-analysis.png', caption: '레퍼런스 계정 분석' },
];
const SHORTSPER_IMAGES_EN: ShowcaseImage[] = [
  { src: 'projects/shortsper/01-main.png', caption: 'Main page', wide: true },
  { src: 'projects/shortsper/02-setup.png', caption: 'Extraction settings' },
  { src: 'projects/shortsper/03-hook-extraction.png', caption: 'Hook-line extraction' },
  { src: 'projects/shortsper/04-script-segments.png', caption: 'Script segment extraction' },
  { src: 'projects/shortsper/05-reels-analysis.png', caption: 'Reels analysis' },
  { src: 'projects/shortsper/06-card-view.png', caption: 'Extraction result card view' },
  { src: 'projects/shortsper/07-overview.png', caption: 'Full feature overview' },
  { src: 'projects/shortsper/08-keyword-trends.png', caption: 'Keyword trend research' },
  { src: 'projects/shortsper/09-reference-analysis.png', caption: 'Reference account analysis' },
];
const SHORTSPER_IMAGES_JA: ShowcaseImage[] = [
  { src: 'projects/shortsper/01-main.png', caption: 'メインページ', wide: true },
  { src: 'projects/shortsper/02-setup.png', caption: '台本抽出の設定' },
  { src: 'projects/shortsper/03-hook-extraction.png', caption: 'フックワード抽出' },
  { src: 'projects/shortsper/04-script-segments.png', caption: '台本セグメント抽出' },
  { src: 'projects/shortsper/05-reels-analysis.png', caption: 'リール分析' },
  { src: 'projects/shortsper/06-card-view.png', caption: '抽出結果のカードビュー' },
  { src: 'projects/shortsper/07-overview.png', caption: '台本抽出機能の全体ビュー' },
  { src: 'projects/shortsper/08-keyword-trends.png', caption: 'キーワードトレンドリサーチ' },
  { src: 'projects/shortsper/09-reference-analysis.png', caption: 'リファレンスアカウント分析' },
];

const HYPERFRAMES_IMAGES_KO: ShowcaseImage[] = [
  { src: 'projects/hyperframes-automation/01-space-lab-views.png', caption: '@space_lab.note · 자동 제작 영상 1주일 조회수' },
  { src: 'projects/hyperframes-automation/02-goodvibesongs-views.png', caption: '@goodvibesongs.mp3 · 자동 제작 영상 1주일 조회수' },
  { src: 'projects/hyperframes-automation/03-readyaction-views.png', caption: '@readyaction_movies · 자동 제작 영상 1주일 조회수' },
  { src: 'projects/hyperframes-automation/04-thishiphop-views.png', caption: '@thishiphop.ply · 자동 제작 영상 1주일 조회수' },
];
const HYPERFRAMES_IMAGES_EN: ShowcaseImage[] = [
  { src: 'projects/hyperframes-automation/01-space-lab-views.png', caption: '@space_lab.note · one-week views of an auto-produced video' },
  { src: 'projects/hyperframes-automation/02-goodvibesongs-views.png', caption: '@goodvibesongs.mp3 · one-week views of an auto-produced video' },
  { src: 'projects/hyperframes-automation/03-readyaction-views.png', caption: '@readyaction_movies · one-week views of an auto-produced video' },
  { src: 'projects/hyperframes-automation/04-thishiphop-views.png', caption: '@thishiphop.ply · one-week views of an auto-produced video' },
];
const HYPERFRAMES_IMAGES_JA: ShowcaseImage[] = [
  { src: 'projects/hyperframes-automation/01-space-lab-views.png', caption: '@space_lab.note · 自動生成動画の1週間の再生数' },
  { src: 'projects/hyperframes-automation/02-goodvibesongs-views.png', caption: '@goodvibesongs.mp3 · 自動生成動画の1週間の再生数' },
  { src: 'projects/hyperframes-automation/03-readyaction-views.png', caption: '@readyaction_movies · 自動生成動画の1週間の再生数' },
  { src: 'projects/hyperframes-automation/04-thishiphop-views.png', caption: '@thishiphop.ply · 自動生成動画の1週間の再生数' },
];

/* ─────────────────────────  KOREAN  ───────────────────────── */

const koProjects: ShowcaseProject[] = [
  {
    slug: 'dongarium',
    name: '동아리움',
    tagline: '대학 동아리 운영을 한곳에서 — 팀 프로젝트에서 실서비스로',
    period: '2025.10 ~ 현재',
    role: '프론트엔드 개발',
    summary: [
      '동아리움은 흩어져 있던 대학 동아리 모집·관리·소통 과정을 하나의 플랫폼으로 묶은 통합 서비스입니다. 카카오 테크 캠퍼스 팀 프로젝트로 시작해, 실제 사용자를 받는 운영 서비스로 발전시켰습니다.',
      '2026년 3월 기준 GA 누적 페이지뷰 9만을 돌파했고, 출시 이후 5개월 넘게 중단 없이 운영하며 지속적으로 기능을 개선하고 있습니다.',
    ],
    stats: [
      { value: '90,000+', label: 'GA 누적 페이지뷰' },
      { value: '5개월+', label: '무중단 운영' },
      { value: '실서비스', label: '운영 단계' },
    ],
    features: [
      { title: '동아리 탐색', desc: '카테고리·키워드로 원하는 동아리를 빠르게 찾고 상세 정보를 확인합니다.' },
      { title: '모집 & 지원', desc: '모집 공고 등록부터 지원서 접수까지 한 흐름으로 처리합니다.' },
      { title: '운영 관리', desc: '동아리 운영진을 위한 멤버·공지 관리 기능을 제공합니다.' },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    links: [
      { label: '사이트 보기', url: 'https://dongarium.co.kr', type: 'site' },
      { label: 'GitHub 보기', url: 'https://github.com/kakao-tech-campus-3rd-step3/Team18_FE', type: 'github' },
    ],
    images: DONGARIUM_IMAGES_KO,
    accent: '#2563eb',
  },
  {
    slug: 'kakao-map-capture',
    name: '선거관리위원회 지도 캡처 자동화',
    tagline: '주소 리스트만 붙여넣으면, 반경 지도가 한 번에 — 선관위 업무 자동화 툴',
    period: '2025.05',
    role: '기획 · 풀스택 개발',
    summary: [
      '선거관리위원회는 사전투표소·시설 점검을 위해 수십 곳의 주소마다 100m 반경이 표시된 지도를 일일이 캡처해야 했습니다. 이 반복 업무를 "주소 붙여넣기 → 캡처 시작 → ZIP 다운로드" 세 단계로 끝내는 무설치 웹 툴로 자동화했습니다.',
      '광주 북구 선거관리위원회에 도입되어 실제 업무에 사용되며 공식 사례를 받았고, 현재 대한민국 중앙선거관리위원회의 자체 자산으로 채택하기 위한 작업이 진행 중입니다. 채택될 경우 전국 선관위에서 사용하는 도구가 됩니다.',
    ],
    stats: [
      { value: '광주 북구 선관위', label: '실제 도입 · 공식 사례' },
      { value: '중앙선관위', label: '전국 채택 추진 중' },
      { value: '3단계', label: '붙여넣기 → 캡처 → 다운로드' },
    ],
    features: [
      { title: '선관위 DB 연동', desc: '시·도/구·군만 고르면 중앙선관위 API로 사전투표소 주소를 자동으로 불러옵니다.' },
      { title: '스마트 지오코딩', desc: 'Kakao 키워드→주소→VWorld 3단계 폴백으로 까다로운 건물명까지 정확히 좌표화합니다.' },
      { title: '브라우저 일괄 캡처', desc: 'Canvas로 100m 반경 지도를 그려 한 번에 ZIP으로 묶어 내려받습니다. 서버·API 키 설정이 필요 없습니다.' },
    ],
    techStack: ['JavaScript', 'Leaflet', 'Kakao Local API', 'VWorld API', 'Cloudflare Pages', 'Cloudflare Workers', 'D1', 'Python'],
    links: [],
    images: KAKAO_IMAGES_KO,
    status: '광주 북구 선관위 도입 · 중앙선관위 채택 추진 중',
    thumbnail: 'projects/kakao-map-capture/thumbnail.png',
    accent: '#15803d',
  },
  {
    slug: 'shortsper',
    name: '숏폼 콘텐츠 분석 자동화 (웨이클립)',
    tagline: '인스타 릴스를 붙여넣으면 대본·후킹·성과 데이터까지 — AI 기반 콘텐츠 인텔리전스',
    period: '2025.04 ~ 현재',
    role: '기획 · AI · 풀스택 개발',
    summary: [
      '콘텐츠 마케팅 회사 웨이클립을 위해 만든 숏폼 분석 자동화 툴입니다. 인스타그램 릴스 URL만 넣으면 영상 대본을 자동 추출하고, 도입부 후킹 구간을 표시하며, 조회수·좋아요·댓글·해시태그·사운드 같은 성과 데이터를 정리해 엑셀로 내려줍니다.',
      'AI를 적극 활용한 서비스로, 마케터가 손으로 하던 릴스 분석을 자동화해 업무 시간을 크게 줄입니다. 2026년 7월 정식 판매를 목표로 개발 중입니다.',
    ],
    stats: [
      { value: 'AI 기반', label: '대본 추출 · 후킹 분석' },
      { value: '엑셀 자동', label: '20+ 컬럼 성과 리포트' },
      { value: '2026.07', label: '정식 판매 예정' },
    ],
    features: [
      { title: '자동 대본 추출', desc: '릴스 영상을 받아 음성을 텍스트로 옮기고, 도입 0~3초 후킹 구간을 자동으로 표시합니다.' },
      { title: '듀얼 STT 엔진', desc: 'Deepgram(빠름)과 OpenAI Whisper(정확) 중 선택 — 한국어 정확도에 맞춰 튜닝했습니다.' },
      { title: '성과 데이터 정리', desc: '조회수·참여율·해시태그·사운드 트렌드까지 엑셀 한 장으로 자동 정리합니다.' },
    ],
    techStack: ['Python', 'Streamlit', 'Claude API', 'OpenAI Whisper', 'Deepgram', 'Apify', 'yt-dlp', 'ffmpeg', 'openpyxl'],
    links: [],
    images: SHORTSPER_IMAGES_KO,
    status: '비공개 · 2026년 7월 판매 예정',
    accent: '#db2777',
  },
  {
    slug: 'hyperframes-automation',
    name: '숏폼/롱폼 제작 자동화 파이프라인',
    tagline: '대본·음원만 넣으면 자막·내레이션·영상이 완성 — 직접 일본 인스타 계정 46만 팔로워로 검증',
    period: '2025.05 ~ 현재',
    role: '기획 · AI · 자동화 개발',
    summary: [
      'HyperFrames(HTML 기반 영상 합성)를 활용해 숏폼·롱폼 영상 제작을 통째로 자동화한 파이프라인입니다. 음원이나 대본을 입력하면 전사·번역·자막·내레이션·배경영상 합성·렌더링까지 사람 손을 거의 거치지 않고 완성됩니다. 이 시스템을 콘텐츠 마케팅 회사 웨이클립에 납품했습니다.',
      '만든 도구를 직접 운영해 검증했습니다. 일본어 인스타그램 계정 5개를 이 파이프라인으로 운영하며 합산 팔로워 46만 명 이상을 모았습니다. 기술과 콘텐츠 마케팅 역량을 함께 증명한 프로젝트입니다.',
    ],
    stats: [
      { value: '463,000+', label: '운영 계정 합산 팔로워' },
      { value: '5개', label: '자동 운영 인스타 계정' },
      { value: '웨이클립 납품', label: '실제 상용 도입' },
    ],
    features: [
      { title: '세로/가로 자동 제작', desc: '숏폼(9:16)은 음원→전사→다국어 자막을, 롱폼(16:9)은 대본→내레이션→배경영상 합성을 자동으로 처리합니다.' },
      { title: 'AI 전사·번역', desc: 'Whisper 전사와 Claude 기반 문맥 번역으로, 직역이 아닌 현지 감성에 맞는 자막을 만듭니다.' },
      { title: '소재 자동 수급', desc: 'Pexels·Giphy에서 키워드로 배경 영상·GIF를 자동으로 가져오고 중복 없이 관리합니다.' },
    ],
    techStack: ['HyperFrames', 'Node.js', 'Claude API', 'OpenAI Whisper', 'ElevenLabs TTS', 'Pexels API', 'Giphy API', 'GSAP', 'ffmpeg', 'HTML/CSS'],
    links: [],
    images: HYPERFRAMES_IMAGES_KO,
    thumbnailFit: 'contain',
    channels: [
      { handle: '@goodvibesongs.mp3', followers: '19.2만', note: '감성 음악' },
      { handle: '@goodmovies_reko', followers: '9.1만', note: '영화 추천' },
      { handle: '@readyaction_movies', followers: '8만', note: '영화' },
      { handle: '@thishiphop.ply', followers: '7.7만', note: '힙합 음악' },
      { handle: '@space_lab.note', followers: '2.3만', note: '우주·과학' },
    ],
    status: '비공개 · 웨이클립 납품',
    accent: '#7c3aed',
  },
  {
    slug: 'harness',
    name: 'AI 코딩 에이전트 하네스 (오픈소스)',
    tagline: 'AI 에이전트가 어떤 프로젝트에서도 일관되게 일하도록 돕는 스타터 — GitHub에서 호응을 얻은 오픈소스',
    period: '2025.05',
    role: '설계 · 오픈소스 메인테이너',
    summary: [
      '하네스(harness)는 AI 코딩 에이전트가 새 프로젝트에서도 헤매지 않도록, 규칙·자동화 스크립트·에이전트 설정을 미리 갖춰 둔 템플릿 저장소입니다. Claude Code용(Harness-for-claude)과 Codex 등 범용(Harness-for-codex) 두 가지로 만들었습니다.',
      '개인 오픈소스로서는 이례적으로 두 저장소 합산 62개의 스타와 22개의 포크를 받으며, 에이전트 기반 개발 워크플로의 참고 구현으로 자리잡았습니다.',
    ],
    stats: [
      { value: '62', label: '합산 GitHub 스타' },
      { value: '22', label: '합산 포크' },
      { value: '2', label: '오픈소스 저장소' },
    ],
    features: [
      { title: 'Harness-for-claude', desc: 'Claude Code에 특화 — 세션 컨텍스트 로더, 검증 훅, 강화된 권한 모델. ★30 · ⑂13' },
      { title: 'Harness-for-codex', desc: 'AGENTS.md 규격으로 Codex·Cursor·Aider까지 폭넓게 호환. ★32 · ⑂9' },
      { title: '언어 무관 자동화', desc: 'Node·Python·Rust 스택을 자동 감지하는 bootstrap·check·test 스크립트를 공통 제공합니다.' },
    ],
    techStack: ['Shell', 'GitHub Actions', 'Claude Code', 'OpenAI Codex', 'AGENTS.md', 'Docker'],
    links: [
      { label: 'Harness-for-claude', url: 'https://github.com/ganimjeong/Harness-for-claude', type: 'github' },
      { label: 'Harness-for-codex', url: 'https://github.com/ganimjeong/Harness-for-codex', type: 'github' },
    ],
    images: [],
    thumbnail: 'projects/harness/thumbnail.png',
    accent: '#ea580c',
  },
];

/* ─────────────────────────  ENGLISH  ───────────────────────── */

const enProjects: ShowcaseProject[] = [
  {
    slug: 'dongarium',
    name: 'Dongari-um',
    tagline: 'Run a university club in one place — from team project to live service',
    period: 'Oct 2025 – Present',
    role: 'Frontend Development',
    summary: [
      'Dongari-um unifies the scattered process of recruiting, managing, and communicating within university clubs into a single platform. It started as a Kakao Tech Campus team project and grew into a live service with real users.',
      'As of March 2026 it has surpassed 90,000 cumulative page views on GA, running without interruption for over five months while continuously shipping improvements.',
    ],
    stats: [
      { value: '90,000+', label: 'Cumulative GA Page Views' },
      { value: '5+ months', label: 'Uptime in Production' },
      { value: 'Live', label: 'Service Stage' },
    ],
    features: [
      { title: 'Club Discovery', desc: 'Find the right club fast by category and keyword, with full detail pages.' },
      { title: 'Recruiting & Apply', desc: 'From posting openings to receiving applications in one seamless flow.' },
      { title: 'Operations', desc: 'Member and announcement management tools for club organizers.' },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    links: [
      { label: 'Visit Site', url: 'https://dongarium.co.kr', type: 'site' },
      { label: 'View GitHub', url: 'https://github.com/kakao-tech-campus-3rd-step3/Team18_FE', type: 'github' },
    ],
    images: DONGARIUM_IMAGES_EN,
    accent: '#2563eb',
  },
  {
    slug: 'kakao-map-capture',
    name: 'Election Commission Map-Capture Automation',
    tagline: 'Paste an address list, get radius maps in one batch — a workflow tool built for a Korean government election agency',
    period: 'May 2025',
    role: 'Product · Full-stack Development',
    summary: [
      'In South Korea, election commissions — the public government bodies that administer elections — had to manually capture a 100m-radius map for each of dozens of polling-station addresses. I automated this repetitive task into a no-install web tool that finishes the job in three steps: paste addresses → start capture → download ZIP.',
      'It was adopted and is used in real operations by the Gwangju Buk-gu (district) Election Commission, which issued a formal commendation. It is now in the process of being adopted as an official asset of the National Election Commission of Korea — the central government agency that oversees all elections nationwide — which would make it a tool used by election offices across the country.',
    ],
    stats: [
      { value: 'Gov’t Adopted', label: 'In use at a district election commission' },
      { value: 'Going National', label: 'National Election Commission adoption in progress' },
      { value: '3 steps', label: 'Paste → Capture → Download' },
    ],
    features: [
      { title: 'Gov Database Sync', desc: 'Pick a province/district and it auto-loads early-voting addresses via the National Election Commission (government) API.' },
      { title: 'Smart Geocoding', desc: 'A Kakao keyword → address → VWorld three-tier fallback resolves even tricky building names accurately.' },
      { title: 'In-browser Batch Capture', desc: 'Renders 100m-radius maps with Canvas and bundles them into a ZIP — no server or API-key setup required.' },
    ],
    techStack: ['JavaScript', 'Leaflet', 'Kakao Local API', 'VWorld API', 'Cloudflare Pages', 'Cloudflare Workers', 'D1', 'Python'],
    links: [],
    images: KAKAO_IMAGES_EN,
    status: 'In use at a district election commission · National rollout in progress',
    thumbnail: 'projects/kakao-map-capture/thumbnail.png',
    accent: '#15803d',
  },
  {
    slug: 'shortsper',
    name: 'Short-form Content Analysis Automation (Wayclip)',
    tagline: 'Paste an Instagram Reel, get the script, hook, and performance data — AI-powered content intelligence',
    period: 'Apr 2025 – Present',
    role: 'Product · AI · Full-stack Development',
    summary: [
      'A short-form analysis tool built for the content-marketing company Wayclip. Paste an Instagram Reel URL and it auto-extracts the script, marks the opening hook window, and compiles performance data — views, likes, comments, hashtags, sound — into an Excel report.',
      'Heavily AI-driven, it automates the Reel analysis marketers used to do by hand and cuts the work down dramatically. In development toward a commercial launch in July 2026.',
    ],
    stats: [
      { value: 'AI-driven', label: 'Script extraction · Hook analysis' },
      { value: 'Auto Excel', label: '20+ column performance report' },
      { value: 'Jul 2026', label: 'Commercial launch' },
    ],
    features: [
      { title: 'Automatic Transcription', desc: 'Takes a Reel video, converts speech to text, and auto-marks the 0–3s opening hook window.' },
      { title: 'Dual STT Engines', desc: 'Choose Deepgram (fast) or OpenAI Whisper (accurate) — tuned for Korean accuracy.' },
      { title: 'Performance Compilation', desc: 'Views, engagement, hashtags, and sound trends, all compiled into a single Excel sheet.' },
    ],
    techStack: ['Python', 'Streamlit', 'Claude API', 'OpenAI Whisper', 'Deepgram', 'Apify', 'yt-dlp', 'ffmpeg', 'openpyxl'],
    links: [],
    images: SHORTSPER_IMAGES_EN,
    status: 'Private · On sale July 2026',
    accent: '#db2777',
  },
  {
    slug: 'hyperframes-automation',
    name: 'Short-form / Long-form Production Automation Pipeline',
    tagline: 'Feed it a script or track, get captions, narration, and video — proven on Japanese IG accounts with 460K+ followers',
    period: 'May 2025 – Present',
    role: 'Product · AI · Automation Development',
    summary: [
      'A pipeline that fully automates short- and long-form video production using HyperFrames (HTML-based video composition). Feed it a track or script and it handles transcription, translation, captioning, narration, background-footage compositing, and rendering with almost no manual work. I delivered this system to the content-marketing company Wayclip.',
      'I validated it by running it myself: five Japanese-language Instagram accounts produced on this pipeline gathered over 460,000 combined followers — proving both the engineering and content-marketing sides of the work.',
    ],
    stats: [
      { value: '463,000+', label: 'Combined account followers' },
      { value: '5', label: 'Auto-run Instagram accounts' },
      { value: 'Delivered', label: 'Shipped to Wayclip' },
    ],
    features: [
      { title: 'Vertical & Horizontal', desc: 'Shorts (9:16): track → transcription → multilingual captions. Long-form (16:9): script → narration → background compositing.' },
      { title: 'AI Transcription & Translation', desc: 'Whisper transcription plus Claude-based contextual translation produce captions tuned to local nuance, not literal.' },
      { title: 'Automatic Asset Sourcing', desc: 'Pulls background footage and GIFs from Pexels and Giphy by keyword, deduplicated automatically.' },
    ],
    techStack: ['HyperFrames', 'Node.js', 'Claude API', 'OpenAI Whisper', 'ElevenLabs TTS', 'Pexels API', 'Giphy API', 'GSAP', 'ffmpeg', 'HTML/CSS'],
    links: [],
    images: HYPERFRAMES_IMAGES_EN,
    thumbnailFit: 'contain',
    channels: [
      { handle: '@goodvibesongs.mp3', followers: '192K', note: 'Mood music' },
      { handle: '@goodmovies_reko', followers: '91K', note: 'Movie picks' },
      { handle: '@readyaction_movies', followers: '80K', note: 'Movies' },
      { handle: '@thishiphop.ply', followers: '77K', note: 'Hip-hop' },
      { handle: '@space_lab.note', followers: '23K', note: 'Space & science' },
    ],
    status: 'Private · Delivered to Wayclip',
    accent: '#7c3aed',
  },
  {
    slug: 'harness',
    name: 'AI Coding-Agent Harnesses (Open Source)',
    tagline: 'Starter kits that let AI agents work consistently in any project — open source with real traction on GitHub',
    period: 'May 2025',
    role: 'Design · Open-source Maintainer',
    summary: [
      'A "harness" is a template repo that ships conventions, automation scripts, and agent configuration up front so AI coding agents work predictably in any new project. I built two: one for Claude Code (Harness-for-claude) and a general-purpose one (Harness-for-codex) for Codex and others.',
      'Unusual for personal open source, the two repos together earned 62 stars and 22 forks, becoming reference implementations for agent-driven development workflows.',
    ],
    stats: [
      { value: '62', label: 'Combined GitHub stars' },
      { value: '22', label: 'Combined forks' },
      { value: '2', label: 'Open-source repos' },
    ],
    features: [
      { title: 'Harness-for-claude', desc: 'Tailored for Claude Code — session context loader, verification hooks, hardened permissions. ★30 · ⑂13' },
      { title: 'Harness-for-codex', desc: 'AGENTS.md spec for broad compatibility across Codex, Cursor, and Aider. ★32 · ⑂9' },
      { title: 'Language-agnostic Automation', desc: 'Shared bootstrap / check / test scripts that auto-detect Node, Python, and Rust stacks.' },
    ],
    techStack: ['Shell', 'GitHub Actions', 'Claude Code', 'OpenAI Codex', 'AGENTS.md', 'Docker'],
    links: [
      { label: 'Harness-for-claude', url: 'https://github.com/ganimjeong/Harness-for-claude', type: 'github' },
      { label: 'Harness-for-codex', url: 'https://github.com/ganimjeong/Harness-for-codex', type: 'github' },
    ],
    images: [],
    thumbnail: 'projects/harness/thumbnail.png',
    accent: '#ea580c',
  },
];

/* ─────────────────────────  JAPANESE  ───────────────────────── */

const jaProjects: ShowcaseProject[] = [
  {
    slug: 'dongarium',
    name: 'Dongari-um',
    tagline: '大学サークル運営をひとつに — チーム開発から実サービスへ',
    period: '2025.10 ～ 現在',
    role: 'フロントエンド開発',
    summary: [
      'Dongari-um は、バラバラだった大学サークルの募集・管理・コミュニケーションをひとつのプラットフォームに統合したサービスです。カカオ・テック・キャンパスのチームプロジェクトとして始まり、実際のユーザーを抱える運営サービスへと成長させました。',
      '2026年3月時点で GA 累計ページビューが9万を突破し、リリース以降5か月以上、無停止で運営しながら継続的に機能を改善しています。',
    ],
    stats: [
      { value: '90,000+', label: 'GA 累計ページビュー' },
      { value: '5か月+', label: '無停止運営' },
      { value: '実サービス', label: '運営段階' },
    ],
    features: [
      { title: 'サークル探索', desc: 'カテゴリ・キーワードで目的のサークルを素早く見つけ、詳細を確認できます。' },
      { title: '募集 & 応募', desc: '募集の掲載から応募の受付までを一つの流れで処理します。' },
      { title: '運営管理', desc: 'サークル運営陣向けのメンバー・お知らせ管理機能を提供します。' },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    links: [
      { label: 'サイトを見る', url: 'https://dongarium.co.kr', type: 'site' },
      { label: 'GitHubを見る', url: 'https://github.com/kakao-tech-campus-3rd-step3/Team18_FE', type: 'github' },
    ],
    images: DONGARIUM_IMAGES_JA,
    accent: '#2563eb',
  },
  {
    slug: 'kakao-map-capture',
    name: '選挙管理委員会 地図キャプチャ自動化',
    tagline: '住所リストを貼り付けるだけで、半径地図が一括で — 選管の業務自動化ツール',
    period: '2025.05',
    role: '企画 · フルスタック開発',
    summary: [
      '選挙管理委員会は、期日前投票所などの点検のために数十か所の住所ごとに100m半径を表示した地図を手作業でキャプチャする必要がありました。この繰り返し作業を「住所を貼り付け → キャプチャ開始 → ZIPダウンロード」の3ステップで終わらせる、インストール不要のWebツールに自動化しました。',
      '光州北区選挙管理委員会に導入されて実務で使用され、公式の表彰（事例）を受けました。現在は大韓民国中央選挙管理委員会の自前資産として採用するための作業が進行中で、採用されれば全国の選管で使われるツールになります。',
    ],
    stats: [
      { value: '光州北区選管', label: '実導入 · 公式事例' },
      { value: '中央選管', label: '全国採用を推進中' },
      { value: '3ステップ', label: '貼り付け → キャプチャ → DL' },
    ],
    features: [
      { title: '選管DB連携', desc: '市道/区郡を選ぶだけで、中央選管APIから期日前投票所の住所を自動で読み込みます。' },
      { title: 'スマートジオコーディング', desc: 'Kakaoキーワード→住所→VWorldの3段階フォールバックで、難しい建物名まで正確に座標化します。' },
      { title: 'ブラウザ一括キャプチャ', desc: 'Canvasで100m半径の地図を描き、一括でZIPにまとめてダウンロード。サーバーやAPIキーの設定は不要です。' },
    ],
    techStack: ['JavaScript', 'Leaflet', 'Kakao Local API', 'VWorld API', 'Cloudflare Pages', 'Cloudflare Workers', 'D1', 'Python'],
    links: [],
    images: KAKAO_IMAGES_JA,
    status: '光州北区選管に導入 · 中央選管の採用を推進中',
    thumbnail: 'projects/kakao-map-capture/thumbnail.png',
    accent: '#15803d',
  },
  {
    slug: 'shortsper',
    name: 'ショート動画分析の自動化（Wayclip）',
    tagline: 'インスタのリールを貼るだけで、台本・フック・成果データまで — AIベースのコンテンツインテリジェンス',
    period: '2025.04 ～ 現在',
    role: '企画 · AI · フルスタック開発',
    summary: [
      'コンテンツマーケティング会社 Wayclip 向けに作ったショート動画分析の自動化ツールです。InstagramリールのURLを入れるだけで台本を自動抽出し、冒頭のフック区間を表示し、再生数・いいね・コメント・ハッシュタグ・サウンドなどの成果データを整理してExcelで出力します。',
      'AIを積極的に活用したサービスで、マーケターが手作業で行っていたリール分析を自動化し、作業時間を大きく削減します。2026年7月の正式販売を目標に開発中です。',
    ],
    stats: [
      { value: 'AIベース', label: '台本抽出 · フック分析' },
      { value: 'Excel自動', label: '20+列の成果レポート' },
      { value: '2026.07', label: '正式販売予定' },
    ],
    features: [
      { title: '自動台本抽出', desc: 'リール動画を受け取り音声をテキスト化し、冒頭0〜3秒のフック区間を自動で表示します。' },
      { title: 'デュアルSTTエンジン', desc: 'Deepgram（高速）とOpenAI Whisper（高精度）から選択 — 韓国語精度に合わせてチューニング。' },
      { title: '成果データ整理', desc: '再生数・エンゲージメント・ハッシュタグ・サウンドトレンドまでExcel1枚に自動でまとめます。' },
    ],
    techStack: ['Python', 'Streamlit', 'Claude API', 'OpenAI Whisper', 'Deepgram', 'Apify', 'yt-dlp', 'ffmpeg', 'openpyxl'],
    links: [],
    images: SHORTSPER_IMAGES_JA,
    status: '非公開 · 2026年7月販売予定',
    accent: '#db2777',
  },
  {
    slug: 'hyperframes-automation',
    name: 'ショート/ロング制作の自動化パイプライン',
    tagline: '台本や音源を入れるだけで字幕・ナレーション・動画が完成 — 自ら運営した日本のインスタ計46万フォロワーで実証',
    period: '2025.05 ～ 現在',
    role: '企画 · AI · 自動化開発',
    summary: [
      'HyperFrames（HTMLベースの動画合成）を活用し、ショート・ロング動画の制作を丸ごと自動化したパイプラインです。音源や台本を入力すると、文字起こし・翻訳・字幕・ナレーション・背景映像の合成・レンダリングまで、ほぼ人手を介さず完成します。このシステムをコンテンツマーケティング会社 Wayclip に納品しました。',
      '作ったツールを自ら運用して実証しました。日本語のInstagramアカウント5つをこのパイプラインで運営し、合算フォロワー46万人以上を集めました。技術力とコンテンツマーケティング力の両方を証明したプロジェクトです。',
    ],
    stats: [
      { value: '463,000+', label: '運営アカウント合算フォロワー' },
      { value: '5', label: '自動運営のインスタアカウント' },
      { value: 'Wayclip納品', label: '実際の商用導入' },
    ],
    features: [
      { title: '縦/横を自動制作', desc: 'ショート(9:16)は音源→文字起こし→多言語字幕、ロング(16:9)は台本→ナレーション→背景合成を自動処理します。' },
      { title: 'AI文字起こし・翻訳', desc: 'Whisperの文字起こしとClaudeによる文脈翻訳で、直訳でなく現地の感性に合った字幕を作ります。' },
      { title: '素材の自動調達', desc: 'Pexels・Giphyからキーワードで背景映像・GIFを自動取得し、重複なく管理します。' },
    ],
    techStack: ['HyperFrames', 'Node.js', 'Claude API', 'OpenAI Whisper', 'ElevenLabs TTS', 'Pexels API', 'Giphy API', 'GSAP', 'ffmpeg', 'HTML/CSS'],
    links: [],
    images: HYPERFRAMES_IMAGES_JA,
    thumbnailFit: 'contain',
    channels: [
      { handle: '@goodvibesongs.mp3', followers: '19.2万', note: '感性音楽' },
      { handle: '@goodmovies_reko', followers: '9.1万', note: '映画おすすめ' },
      { handle: '@readyaction_movies', followers: '8万', note: '映画' },
      { handle: '@thishiphop.ply', followers: '7.7万', note: 'ヒップホップ' },
      { handle: '@space_lab.note', followers: '2.3万', note: '宇宙・科学' },
    ],
    status: '非公開 · Wayclip納品',
    accent: '#7c3aed',
  },
  {
    slug: 'harness',
    name: 'AIコーディングエージェント ハーネス（OSS）',
    tagline: 'AIエージェントがどんなプロジェクトでも一貫して働けるスターター — GitHubで反響を得たOSS',
    period: '2025.05',
    role: '設計 · OSSメンテナー',
    summary: [
      'ハーネス（harness）は、AIコーディングエージェントが新しいプロジェクトでも迷わないよう、規約・自動化スクリプト・エージェント設定をあらかじめ備えたテンプレートリポジトリです。Claude Code用（Harness-for-claude）と、Codexなど汎用（Harness-for-codex）の2つを作りました。',
      '個人のOSSとしては異例の、2リポジトリ合算で62スター・22フォークを獲得し、エージェント駆動の開発ワークフローの参考実装として定着しました。',
    ],
    stats: [
      { value: '62', label: '合算GitHubスター' },
      { value: '22', label: '合算フォーク' },
      { value: '2', label: 'OSSリポジトリ' },
    ],
    features: [
      { title: 'Harness-for-claude', desc: 'Claude Codeに特化 — セッションコンテキストローダー、検証フック、強化された権限モデル。★30 · ⑂13' },
      { title: 'Harness-for-codex', desc: 'AGENTS.md規格でCodex・Cursor・Aiderまで幅広く互換。★32 · ⑂9' },
      { title: '言語非依存の自動化', desc: 'Node・Python・Rustスタックを自動検出する bootstrap・check・test スクリプトを共通提供します。' },
    ],
    techStack: ['Shell', 'GitHub Actions', 'Claude Code', 'OpenAI Codex', 'AGENTS.md', 'Docker'],
    links: [
      { label: 'Harness-for-claude', url: 'https://github.com/ganimjeong/Harness-for-claude', type: 'github' },
      { label: 'Harness-for-codex', url: 'https://github.com/ganimjeong/Harness-for-codex', type: 'github' },
    ],
    images: [],
    thumbnail: 'projects/harness/thumbnail.png',
    accent: '#ea580c',
  },
];

export const projectShowcase: Record<Language, ShowcaseData> = {
  ko: {
    pageTitle: '프로젝트',
    pageSubtitle: '직접 만들고 운영한 프로젝트들을 소개합니다.',
    backLabel: '← 이력서로 돌아가기',
    moreLabel: '프로젝트 더보기',
    labels: {
      role: '역할',
      period: '기간',
      techStack: '기술 스택',
      highlights: '핵심 지표',
      features: '주요 기능',
      gallery: '화면',
      channels: '운영 채널',
      visit: '바로가기',
    },
    projects: koProjects,
  },
  en: {
    pageTitle: 'Projects',
    pageSubtitle: 'A closer look at projects I built and run.',
    backLabel: '← Back to resume',
    moreLabel: 'View all projects',
    labels: {
      role: 'Role',
      period: 'Period',
      techStack: 'Tech Stack',
      highlights: 'Highlights',
      features: 'Key Features',
      gallery: 'Screens',
      channels: 'Channels',
      visit: 'Links',
    },
    projects: enProjects,
  },
  ja: {
    pageTitle: 'プロジェクト',
    pageSubtitle: '自ら作り、運営してきたプロジェクトを紹介します。',
    backLabel: '← 履歴書に戻る',
    moreLabel: 'プロジェクトをもっと見る',
    labels: {
      role: '役割',
      period: '期間',
      techStack: '技術スタック',
      highlights: 'ハイライト',
      features: '主な機能',
      gallery: '画面',
      channels: '運営チャンネル',
      visit: 'リンク',
    },
    projects: jaProjects,
  },
};
