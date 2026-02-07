'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Review } from '@/lib/data'

interface ReviewsCarouselProps {
  reviews: Review[]
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [current, setCurrent] = useState(0)
  const itemsPerView = 3

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % Math.ceil(reviews.length / itemsPerView))
  }

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? Math.ceil(reviews.length / itemsPerView) - 1 : prev - 1
    )
  }

  const visibleReviews = reviews.slice(
    current * itemsPerView,
    (current + 1) * itemsPerView
  )

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
          Customer Reviews
        </h2>

        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <AnimatePresence mode="wait">
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={`${current}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <p className="font-semibold text-primary">{review.author}</p>
                      {review.verified && (
                        <p className="text-xs text-accent">Verified Purchase</p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating ? 'fill-accent text-accent' : 'text-border'
                        }
                      />
                    ))}
                  </div>

                  <h4 className="font-semibold text-primary mb-2">{review.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="p-2 hover:bg-card border border-border rounded-full transition-all duration-200"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {[...Array(Math.ceil(reviews.length / itemsPerView))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === i ? 'bg-primary w-8' : 'bg-border w-2'
                  }`}
                  aria-label={`Go to review set ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 hover:bg-card border border-border rounded-full transition-all duration-200"
              aria-label="Next reviews"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
