'use client'

import { AnnouncementBar } from '@/components/AnnouncementBar'
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { useLang } from '@/components/LanguageProvider'

export default function ContactPage() {
  const { lang } = useLang()

  const href = buildWhatsAppLink(
    lang === 'ar'
      ? 'سلام! عندي سؤال على Ray‑Ban Meta Wayfarer RW4006 (المغرب).'
      : lang === 'en'
        ? 'Hi! I have a question about Ray‑Ban Meta Wayfarer RW4006 (Morocco).'
        : 'Bonjour! J’ai une question sur Ray‑Ban Meta Wayfarer RW4006 (Maroc).'
  )

  const title = lang === 'ar' ? 'تواصل معنا' : lang === 'en' ? 'Contact' : 'Contact'

  return (
    <>
      <AnnouncementBar />
      <HeaderMegaMenu />
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">{title}</h1>
          <p className="mt-3 text-muted-foreground">
            {lang === 'ar'
              ? 'كنجاوبو فواتساب. باش تأكد الطلب: صيفط المدينة + العنوان + Pin ديال Google Maps.'
              : lang === 'en'
                ? 'We reply on WhatsApp. To confirm an order: send city + address + Google Maps pin.'
                : 'On répond sur WhatsApp. Pour confirmer une commande: envoyez ville + adresse + pin Google Maps.'}
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <p className="font-semibold text-primary">WhatsApp</p>
            <p className="text-sm text-muted-foreground mt-1">Support: 10:00–22:00</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold hover:opacity-90 transition"
            >
              {lang === 'ar' ? 'رسل رسالة فواتساب' : lang === 'en' ? 'Message us on WhatsApp' : 'Écrire sur WhatsApp'}
            </a>

            <div className="mt-6 text-sm text-muted-foreground">
              <p className="font-semibold text-primary">
                {lang === 'ar'
                  ? 'معلومات تأكيد الطلب'
                  : lang === 'en'
                    ? 'Info to confirm an order'
                    : 'Infos pour confirmer une commande'}
              </p>
              <ul className="mt-2 space-y-1">
                {lang === 'ar' ? (
                  <>
                    <li>• الاسم الكامل</li>
                    <li>• المدينة</li>
                    <li>• العنوان + علامة واضحة</li>
                    <li>• Pin Google Maps (إلا أمكن)</li>
                  </>
                ) : lang === 'en' ? (
                  <>
                    <li>• Full name</li>
                    <li>• City</li>
                    <li>• Full address + landmark</li>
                    <li>• Google Maps pin (if possible)</li>
                  </>
                ) : (
                  <>
                    <li>• Nom complet</li>
                    <li>• Ville</li>
                    <li>• Adresse complète + repère</li>
                    <li>• Pin Google Maps (si possible)</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  )
}
