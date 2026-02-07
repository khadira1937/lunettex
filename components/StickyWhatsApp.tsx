'use client'

import { buildWhatsAppLink } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'
import { useLang } from '@/components/LanguageProvider'
import { t } from '@/lib/i18n'

export function StickyWhatsApp() {
  const { lang } = useLang()
  const msg =
    lang === 'ar'
      ? 'سلام، بغيت نطلب Ray‑Ban Meta Wayfarer RW4006 ب 2800 درهم (الدفع عند الاستلام).'
      : lang === 'en'
        ? 'Hi! I want to order Ray‑Ban Meta Wayfarer RW4006 for 2800 MAD (cash on delivery).'
        : 'Bonjour, je veux commander Ray‑Ban Meta Wayfarer RW4006 à 2800 DH (paiement à la livraison).'

  const href = buildWhatsAppLink(msg)

  const onClick = () => {
    // Meta Pixel custom event (if pixel is installed)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    if (typeof w.fbq === 'function') {
      w.fbq('trackCustom', 'WhatsAppClick')
    }
  }

  return (
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-5 right-5 md:bottom-8 md:right-8 inline-flex items-center gap-2 rounded-full bg-green-600 text-white px-5 py-3 shadow-lg hover:bg-green-700 active:scale-[0.98] transition"
      aria-label={t(lang, 'whatsappCta')}
    >
      <MessageCircle size={18} />
      <span className="text-sm font-semibold">{t(lang, 'whatsappCta')}</span>
    </a>
  )
}
