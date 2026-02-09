'use client'

import { buildWhatsAppLink } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'
import { useLang } from '@/components/LanguageProvider'
import { t } from '@/lib/i18n'

export function StickyWhatsApp({ message }: { message?: string }) {
  const { lang } = useLang()
  const msg =
    message ||
    (lang === 'ar'
      ? 'سلام، بغيت نطلب Ray‑Ban Meta Wayfarer RW4006 (الدفع عند الاستلام).'
      : lang === 'en'
        ? 'Hi! I want to order Ray‑Ban Meta Wayfarer RW4006 (cash on delivery).'
        : 'Bonjour, je veux commander Ray‑Ban Meta Wayfarer RW4006 (paiement à la livraison).')

  const href = buildWhatsAppLink(msg)

  const onClick = () => {
    // Track WhatsApp intent (so we can optimize ads even without on-site checkout)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    if (typeof w.fbq === 'function') {
      // Standard event (works well for optimization)
      w.fbq('track', 'Lead', { channel: 'whatsapp' })
      // Custom event (for custom conversions / reporting)
      w.fbq('trackCustom', 'WhatsAppClick')
    }

    // Optional: GA4 click tracking
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'whatsapp_click', { event_category: 'engagement' })
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
