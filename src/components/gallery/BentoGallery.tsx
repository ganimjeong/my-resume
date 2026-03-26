import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import './BentoGallery.css'
import tallUsa from '@images/bentoGallery/tallbento-usa.png'
import bentoCenter from '@images/bentoGallery/bento-center.png'
import tallObj2 from '@images/bentoGallery/tallbento-obj2.png'
import bentoCenter1 from '@images/bentoGallery/bento-center-1.png'
import bentoCal from '@images/bentoGallery/bento-cal.png'
import bentoGraduate from '@images/bentoGallery/bento-graduate.png'
import bentoGranted from '@images/bentoGallery/bento-granted.png'
import bentoPrize from '@images/bentoGallery/bento-prize.png'

gsap.registerPlugin(ScrollTrigger, Flip)

// [1]tall col1  [2]normal  [3]centerTall  [4]tall col3  [5]normal  [6]tall col3 rows3-4  [7]normal  [8]normal
const images = [tallUsa, bentoCal, bentoCenter, tallObj2, bentoGraduate, bentoPrize, bentoGranted, bentoCenter1]

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
