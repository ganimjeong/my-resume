import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HorizontalSlider.css'

gsap.registerPlugin(ScrollTrigger)

interface Section {
  subtitle?: string
  items: string[]
}

interface Slide {
  id: string
  number: string
  title: string
  accent: string
  bgColor: string
  icon: string
  sections: Section[]
}

const slides: Slide[] = [
  {
    id: 'leader',
    number: '01',
    title: 'Leader',
    accent: '#F59E0B',
    bgColor: '#1a1200',
    icon: '👑',
    sections: [{
      items: [
        "'총장명예학생' 기장",
        "IT동아리 '멋쟁이사자처럼대학' 회장",
        "동아리 '보동' 회장",
        "밴드동아리 '바이슨' 팀장",
        "대학 SW교육봉사동아리 회장",
        "8회 CNU토론대회 사회자",
        "총 10회 이상 기획·창업·개발 분야 해커톤팀 리더",
        "오사카 인턴 리더",
      ],
    }],
  },
  {
    id: 'frontend',
    number: '02',
    title: 'Frontend Dev',
    accent: '#60A5FA',
    bgColor: '#071528',
    icon: '💻',
    sections: [{
      items: [
        "카카오테크캠퍼스 프론트엔드트랙 수료",
        "IT동아리 '멋쟁이사자처럼대학' 회장",
        "대학 SW교육봉사동아리 회장",
        "IT동아리 '에코노베이션' 운영진",
        "전남대학교 대학생 대상 1년간 웹개발 교육",
        "10회 이상 프론트엔드 웹 해커톤 참여",
        "중학생 대상 블록코딩 교육",
        "오사카 인턴 대상 개발 교육",
        "Univ. of Missouri–St. Louis CS학과 교환학생",
        "알고리즘 스터디 운영",
        "개발직무 인턴 2회",
        "'동아리움(dongarium)' 개발 · 페이지뷰 9만 돌파",
      ],
    }],
  },
  {
    id: 'ai',
    number: '03',
    title: 'AI Dev',
    accent: '#A78BFA',
    bgColor: '#110a28',
    icon: '🤖',
    sections: [{
      items: [
        "AI 연구실(HML Lab) 연구생 1년 6개월",
        "대통령과학장학생 임명 (AI 분야)",
        "대통령 증서·메달·시계 수여",
        "오사카 인턴 AI 웹프로젝트 진행",
        "AI 활용 RAG 관련 졸업논문",
        "제주·일본 등 다수 AI학회 참석",
        "AI 스터디 진행 / AI 멘토멘티 활동",
        "릿슈메이칸대학 AI연구소 방문 통솔 (학생통역가)",
        "AI 관련 경진대회 다수 수상",
        "의료 AI 기초·심화·실무과정 수료",
        "AI 유관전공 대학강의 다수 수강",
      ],
    }],
  },
  {
    id: 'creator',
    number: '04',
    title: 'Creator',
    accent: '#34D399',
    bgColor: '#071a10',
    icon: '🚀',
    sections: [{
      items: [
        "파인다이닝 레스토랑 창업 및 운영 2년",
        "총 8회 어울림마당·레드페스타 등 축제 기획·홍보",
        "10회 이상 웹앱 기획자로 해커톤 참여",
        "기획·디자인 대학생 대상 교육",
        "미싱클래스 직접 기획 → 야호센터 교육봉사",
        "오감클래스 직접 기획 → 아동센터 교육봉사",
        "기획·창업 강의 10가지 이상 수강",
        "글로벌 스타트업 아카데미 수료",
      ],
    }],
  },
  {
    id: 'design',
    number: '05',
    title: 'Design',
    accent: '#F472B6',
    bgColor: '#1e0716',
    icon: '🎨',
    sections: [
      {
        subtitle: 'UI / UX',
        items: [
          "기획디자인 대학생 대상 UI/UX·Figma 교육",
          "10회 이상 Figma 웹앱 디자인 프로젝트",
          "일러스트레이터·포토샵 대학강의 수강",
          "Figma·UI/UX 스파르타 강의 수료",
        ],
      },
      {
        subtitle: 'Design',
        items: [
          "미술입시준비 경험 (C&C·그린섬·애니맥스 등)",
          "드로잉 커미션 (외주)",
          "레스토랑 컨셉디자인 커미션 (외주)",
          "밴드 포스터 외주 (일러·포토샵)",
          "10회 이상 Figma 웹앱 디자인 프로젝트",
          "레이저·UV 등 산업프린터기 활용",
        ],
      },
    ],
  },
  {
    id: 'media',
    number: '06',
    title: 'Media',
    accent: '#2DD4BF',
    bgColor: '#051818',
    icon: '🎬',
    sections: [
      {
        subtitle: 'Drone',
        items: [
          "드론촬영 4종 자격증 취득",
          "전주 드론 운용·촬영 전문가 양성과정 수료",
          "드론축구 선수증 취득",
          "대학대표 드론축구대회 출전",
        ],
      },
      {
        subtitle: 'Video & Sound',
        items: [
          "프리미어프로·파이널컷 편집",
          "릴스 및 유튜브 운영 다수",
          "웨이클립 영상기획·편집 근무",
          "탈잉 프리미어프로 강의 수료",
          "UCC 3회 우수영상 선정",
          "로직프로·에이블톤 MIDI 작곡",
          "밴드활동 (드럼·보컬) · 뮤지컬 단독공연",
          "미국 대학 MIDI 전문강의 수강",
        ],
      },
    ],
  },
  {
    id: 'game',
    number: '07',
    title: 'Game & 3D',
    accent: '#FB923C',
    bgColor: '#1a0d00',
    icon: '🎮',
    sections: [
      {
        subtitle: 'Game Dev',
        items: [
          "Unity 3D 다이스 전략게임 개발",
          "VR 슈팅게임 개발",
          "Unity 미니게임 프로젝트 5회 이상",
          "PPT만으로 다이얼로그·피지컬게임 다수 개발",
          "Java RPG게임 개발 프로젝트 참여",
          "공학 소프트웨어 VR코딩 심화교육 수료",
          "메타버스·유니티·Java게임 대학강의 이수",
        ],
      },
      {
        subtitle: '3D Modeling',
        items: [
          "Fusion360 3D모델링 자격증 취득",
          "만들마루 3D모델링 인재 양성과정 이수",
          "만들마루 3D프린터기 활용교육 이수",
          "2022 3D프린터 활용 보조기기 공모전 아이디어상",
        ],
      },
    ],
  },
]

export default function HorizontalSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotsRefs = useRef<HTMLSpanElement[][]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const panels = gsap.utils.toArray<HTMLElement>('.hs-panel', container)

    const ctx = gsap.context(() => {
      let exitingSection = false

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: 'top top',
          scrub: 1,
          snap: {
            snapTo: (value) => {
              if (exitingSection) return -1
              return gsap.utils.snap(1 / (panels.length - 1), value)
            },
            inertia: false,
            duration: { min: 0.1, max: 0.1 },
          },
          end: () => '+=' + (container.offsetWidth - window.innerWidth),
          onLeave: () => { exitingSection = true },
          onLeaveBack: () => { exitingSection = true },
          onEnter: () => { exitingSection = false },
          onEnterBack: () => { exitingSection = false },
          onUpdate(self) {
            const idx = Math.round(self.progress * (panels.length - 1))
            dotsRefs.current.forEach((panelDots) => {
              panelDots.forEach((dot, i) => {
                dot.dataset.active = String(i === idx)
              })
            })
          },
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div className="hs-wrap">
      <div
        ref={containerRef}
        className="hs-container"
        style={{ width: `${slides.length * 100}vw` }}
      >
        {slides.map((slide, slideIndex) => (
          <article
            key={slide.id}
            className="hs-panel"
            style={{
              '--accent': slide.accent,
              '--bg': slide.bgColor,
            } as React.CSSProperties}
          >
            {/* Background icon */}
            <span className="hs-bg-icon">{slide.icon}</span>

            <div className="hs-inner">
              <div className="hs-left">
                <span className="hs-idx">{slide.number}</span>
                <h2 className="hs-title">{slide.title}</h2>
                <div className="hs-line" />
              </div>

              <div className="hs-right">
                {slide.sections.map((section, si) => (
                  <div key={si} className="hs-section">
                    {section.subtitle && (
                      <h3 className="hs-subtitle">{section.subtitle}</h3>
                    )}
                    <ul className="hs-list">
                      {section.items.map((item, ii) => (
                        <li key={ii}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="hs-footer">
              <span className="hs-counter">
                <strong>{slide.number}</strong> / 0{slides.length}
              </span>
              <div className="hs-dots">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    className="hs-dot"
                    data-active={String(i === slideIndex)}
                    ref={(el) => {
                      if (!dotsRefs.current[slideIndex]) dotsRefs.current[slideIndex] = []
                      if (el) dotsRefs.current[slideIndex][i] = el
                    }}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
