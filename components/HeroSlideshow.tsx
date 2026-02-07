'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CollageOverlay } from './CollageOverlay'

interface Slide {
  id: number
  headline: string
  description: string
  cta: string
  ctaHref: string
  image: string
}

const heroImageSrc = '/images/first-ray.webp'

const slides: Slide[] = [
  {
    id: 1,
    headline: 'Ray-Ban Meta, reimagined for daily life.',
    description: 'Smart glasses that blend seamlessly into your world',
    cta: 'Shop Best Sellers',
    ctaHref: '/collections/bestsellers',
    image: heroImageSrc,
  },
  {
    id: 2,
    headline: 'Hands-free moments. Premium lenses.',
    description: 'Capture, share, and experience the world differently',
    cta: 'Explore Collections',
    ctaHref: '/collections',
    image: heroImageSrc,
  },
  {
    id: 3,
    headline: 'Limited finishes, small batches.',
    description: 'Exclusive styles that express your individuality',
    cta: 'View New Arrivals',
    ctaHref: '/collections/new-arrivals',
    image: heroImageSrc,
  },
]

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const goToSlide = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // 5 seconds per slide

    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === ' ') {
        e.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, togglePlayPause])

  const slide = slides[current]

  return (
    <section className="relative bg-background overflow-hidden" role="region" aria-label="Hero slideshow">
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.headline}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Collage Overlays */}
        <CollageOverlay position="top-left" opacity={0.15} />
        <CollageOverlay position="bottom-right" opacity={0.12} />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
                {slide.headline}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">{slide.description}</p>
              <Link
                href={slide.ctaHref}
                className="inline-block bg-accent hover:bg-opacity-90 text-accent-foreground px-8 py-3 rounded-full font-medium transition-all duration-200 hover:translate-y-[-2px]"
              >
                {slide.cta}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-6">
          {/* Dots */}
          <div className="flex gap-3" role="tablist" aria-label="Slides">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={current === index}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            aria-pressed={isPlaying}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Skip Links for Accessibility */}
        <span className="sr-only">
          Use arrow keys to navigate slides, space to pause/play. Current slide: {current + 1} of{' '}
          {slides.length}
        </span>
      </div>
    </section>
  )
}
