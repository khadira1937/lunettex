'use client'

import { useLang } from '@/components/LanguageProvider'
import type { Lang } from '@/lib/i18n'

const options: { lang: Lang; label: string }[] = [
  { lang: 'fr', label: 'FR' },
  { lang: 'ar', label: 'AR' },
  { lang: 'en', label: 'EN' },
]

export function LanguageToggle() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
      {options.map((o) => (
        <button
          key={o.lang}
          onClick={() => setLang(o.lang)}
          className={
            'px-3 py-1 text-xs font-semibold rounded-full transition-colors ' +
            (lang === o.lang
              ? 'bg-accent text-accent-foreground'
              : 'text-primary hover:bg-secondary')
          }
          aria-pressed={lang === o.lang}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
