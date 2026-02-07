'use client'

import React from "react"

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 md:py-24 bg-background border-t border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-serif font-bold text-primary mb-3">
          Get 10% Off Your First Order
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Subscribe to our newsletter for exclusive offers and new collections
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <div className="flex gap-2 bg-card border border-border rounded-full p-1">
            <div className="flex-1 flex items-center px-4">
              <Mail size={18} className="text-muted-foreground mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-primary placeholder-muted-foreground focus:outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
            >
              <Check size={16} /> Thanks for subscribing!
            </motion.div>
          )}
        </form>

        <p className="text-xs text-muted-foreground mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
