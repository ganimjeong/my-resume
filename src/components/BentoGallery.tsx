import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import './BentoGallery.css'

gsap.registerPlugin(ScrollTrigger, Flip)

const images = [
  'https://assets.codepen.io/16327/portrait-pattern-1.jpg',
  'https://assets.codepen.io/16327/portrait-image-12.jpg',
  'https://assets.codepen.io/16327/portrait-image-8.jpg',
  'https://assets.codepen.io/16327/portrait-pattern-2.jpg',
  'https://assets.codepen.io/16327/portrait-image-4.jpg',
  'https://assets.codepen.io/16327/portrait-image-3.jpg',
  'https://assets.codepen.io/16327/portrait-pattern-3.jpg',
  'https://assets.codepen.io/16327/portrait-image-1.jpg',
]

export default function BentoGallery() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const flipCtxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const createTween = () => {
      const galleryElement = galleryRef.current
      const wrapElement = wrapRef.current
      if (!galleryElement || !wrapElement) return

      const galleryItems = galleryElement.querySelectorAll('.gallery__item')

      flipCtxRef.current?.revert()
      galleryElement.classList.remove('gallery--final')

      flipCtxRef.current = gsap.context(() => {
        galleryElement.classList.add('gallery--final')
        const flipState = Flip.getState(galleryItems)
        galleryElement.classList.remove('gallery--final')

        const flip = Flip.to(flipState, {
          simple: true,
          ease: 'expoScale(1, 5)',
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: 'center center',
            end: '+=100%',
            scrub: true,
            pin: wrapElement,
          },
        })
        tl.add(flip)

        return () => gsap.set(galleryItems, { clearProps: 'all' })
      })
    }

    createTween()
    window.addEventListener('resize', createTween)
    return () => {
      window.removeEventListener('resize', createTween)
      flipCtxRef.current?.revert()
    }
  }, [])

  return (
    <div className="gallery-wrap" ref={wrapRef}>
      <div className="gallery gallery--bento" ref={galleryRef}>
        {images.map((src, i) => (
          <div className="gallery__item" key={i}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}
