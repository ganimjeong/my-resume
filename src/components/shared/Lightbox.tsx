import { useCallback, useEffect } from 'react'

export interface LightboxImage {
  /** public/ 기준 경로 (BASE_URL 자동 prefix) */
  src: string
  alt?: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onIndex: (i: number) => void
}

/** 갤러리 이미지를 전체화면으로 크게 보여주는 라이트박스. ESC/←/→ 키, 배경 클릭으로 닫기·이동. */
export default function Lightbox({ images, index, onClose, onIndex }: LightboxProps) {
  const total = images.length
  const img = images[index]

  const prev = useCallback(() => onIndex((index - 1 + total) % total), [index, total, onIndex])
  const next = useCallback(() => onIndex((index + 1) % total), [index, total, onIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  if (!img) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* 닫기 */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition-colors"
      >
        ✕
      </button>

      {/* 카운터 */}
      {total > 1 && (
        <div className="absolute top-6 left-6 text-sm text-white/60 tabular-nums">
          {index + 1} / {total}
        </div>
      )}

      {/* 이전 / 다음 */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Previous"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Next"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors"
          >
            ›
          </button>
        </>
      )}

      {/* 이미지 + 캡션 */}
      <figure
        className="flex max-h-full max-w-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`${import.meta.env.BASE_URL}${img.src}`}
          alt={img.alt ?? img.caption ?? ''}
          className="max-h-[82vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
        />
        {img.caption && (
          <figcaption className="mt-3 text-center text-sm text-white/70">{img.caption}</figcaption>
        )}
      </figure>
    </div>
  )
}
