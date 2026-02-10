'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLang } from '@/components/LanguageProvider'
import { t } from '@/lib/i18n'

const navLinks = [
  { key: 'Home', href: '/' },
  { key: 'FAQ', href: '/faq' },
  { key: 'Delivery', href: '/delivery-returns' },
  { key: 'Contact', href: '/contact' },
]

export function HeaderMegaMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { lang } = useLang()

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight text-primary truncate max-w-[40vw] sm:max-w-none"
        >
          {t(lang, 'brand')}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="uppercase text-xs font-medium text-primary hover:text-accent transition-colors py-2"
            >
              {link.key}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 min-w-0">
          <LanguageToggle />
          <a
            href="#order"
            className="hidden sm:inline-flex bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            {t(lang, 'whatsappCta')}
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:text-accent transition-colors text-primary"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm uppercase font-medium text-primary hover:text-accent transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.key}
                </Link>
              ))}
              <Link
                href="#order"
                className="inline-flex w-full justify-center bg-accent text-accent-foreground px-5 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(lang, 'whatsappCta')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
