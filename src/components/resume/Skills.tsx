import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ResumeData } from '@/data/types'
import { useIsDesktop } from '@/hooks/useIsDesktop'

gsap.registerPlugin(ScrollTrigger)

interface SkillsProps {
  data: ResumeData
}

interface FloatingChipsProps {
  items: string[]
}

function FloatingChips({ items }: FloatingChipsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const chips = chipRefs.current.filter((el): el is HTMLSpanElement => !!el)
    if (chips.length === 0) return

    const rect = container.getBoundingClientRect()
    const EDGE_BUFFER = 16
    const COL_GAP = 10
    const ROW_GAP = 10
    const JITTER = 5

    const clampX = (x: number, w: number) =>
      Math.min(Math.max(x, 0), Math.max(rect.width - w, 0))
    const clampY = (y: number, h: number) =>
      Math.min(Math.max(y, 0), Math.max(rect.height - h, 0))

    // 1) Greedy row-packing — flex-wrap 처럼 채우되 각 행을 가운데 정렬
    type Slot = { chip: HTMLSpanElement; x: number; y: number; w: number; h: number }
    const rows: Slot[][] = []
    let currentRow: Slot[] = []
    let rowWidth = 0
    let cursorY = EDGE_BUFFER
    let rowHeight = 0

    const flushRow = () => {
      if (currentRow.length === 0) return
      const innerWidth = rect.width - EDGE_BUFFER * 2
      const offset = EDGE_BUFFER + Math.max((innerWidth - (rowWidth - COL_GAP)) / 2, 0)
      let cursorX = offset
      currentRow.forEach((slot) => {
        slot.x = cursorX
        slot.y = cursorY
        cursorX += slot.w + COL_GAP
      })
      rows.push(currentRow)
      cursorY += rowHeight + ROW_GAP
      currentRow = []
      rowWidth = 0
      rowHeight = 0
    }

    chips.forEach((chip) => {
      const w = chip.offsetWidth
      const h = chip.offsetHeight
      const availableWidth = rect.width - EDGE_BUFFER * 2
      if (rowWidth + w > availableWidth && currentRow.length > 0) flushRow()
      currentRow.push({ chip, x: 0, y: 0, w, h })
      rowWidth += w + COL_GAP
      rowHeight = Math.max(rowHeight, h)
    })
    flushRow()

    // 2) 행 전체를 세로 방향 가운데로 정렬 (컨테이너 남는 공간 균등 분배)
    const totalHeight = cursorY - ROW_GAP
    const verticalOffset = Math.max((rect.height - totalHeight) / 2, EDGE_BUFFER)
    const yShift = verticalOffset - EDGE_BUFFER

    // 3) 약간의 jitter 추가 (그리드 티 안 나게)
    const basePositions: Array<{ x: number; y: number }> = []
    rows.flat().forEach((slot) => {
      const jx = (Math.random() - 0.5) * JITTER * 2
      const jy = (Math.random() - 0.5) * JITTER * 2
      basePositions.push({
        x: clampX(slot.x + jx, slot.w),
        y: clampY(slot.y + yShift + jy, slot.h),
      })
    })

    const ctx = gsap.context(() => {
      chips.forEach((chip, i) => {
        const { x, y } = basePositions[i]
        gsap.set(chip, { x, y })
        gsap.to(chip, {
          x: `+=${(Math.random() - 0.5) * 10}`,
          y: `+=${(Math.random() - 0.5) * 10}`,
          duration: 3 + Math.random() * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.1,
        })
      })
    })

    const repelRadius = 140
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top

      chips.forEach((chip, i) => {
        const base = basePositions[i]
        if (!base) return
        const cx = base.x + chip.offsetWidth / 2
        const cy = base.y + chip.offsetHeight / 2
        const dx = cx - mx
        const dy = cy - my
        const dist = Math.hypot(dx, dy)

        if (dist < repelRadius) {
          const force = (1 - dist / repelRadius) * 40
          const angle = Math.atan2(dy, dx)
          const targetX = clampX(base.x + Math.cos(angle) * force, chip.offsetWidth)
          const targetY = clampY(base.y + Math.sin(angle) * force, chip.offsetHeight)
          gsap.to(chip, {
            x: targetX,
            y: targetY,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        } else {
          gsap.to(chip, {
            x: base.x,
            y: base.y,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      })
    }

    container.addEventListener('mousemove', onMove)

    return () => {
      container.removeEventListener('mousemove', onMove)
      ctx.revert()
    }
  }, [items])

  return (
    <div
      ref={containerRef}
      className={`relative ${items.length >= 16 ? 'h-56' : 'h-44'} rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 overflow-hidden`}
    >
      {items.map((item, i) => (
        <span
          key={item}
          ref={(el) => { chipRefs.current[i] = el }}
          className="absolute top-0 left-0 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-full text-base md:text-lg font-medium shadow-sm will-change-transform select-none"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export default function Skills({ data }: SkillsProps) {
  const { skills } = data
  const isDesktop = useIsDesktop()
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [data, isDesktop])

  return (
    <section className="py-12 border-b border-gray-300 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{skills.title}</h2>
      <div className="space-y-6">
        {skills.categories.map((category, index) => (
          <div
            key={category.name}
            ref={(el) => { itemsRef.current[index] = el }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {category.name}
            </h3>
            {isDesktop ? (
              <FloatingChips items={category.items} />
            ) : (
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
