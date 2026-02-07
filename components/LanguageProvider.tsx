'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'
import type { Lang } from '@/lib/i18n'

type Ctx = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang
  children: React.ReactNode
}) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = (next: Lang) => {
    setLangState(next)
    // 1 year cookie
    document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`
    // force refresh so server layout can update dir/lang meta
    window.location.reload()
  }

  const value = useMemo(() => ({ lang, setLang }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
