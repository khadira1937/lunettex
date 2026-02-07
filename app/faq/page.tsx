'use client'

import { AnnouncementBar } from '@/components/AnnouncementBar'
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import { useLang } from '@/components/LanguageProvider'

export default function FAQPage() {
  const { lang } = useLang()

  const title = lang === 'ar' ? 'أسئلة شائعة' : lang === 'en' ? 'FAQ' : 'FAQ'
  const intro =
    lang === 'ar'
      ? 'أجوبة سريعة. باش تطلب: دخل لواتساب (المدينة + العنوان + Pin ديال Google Maps).'
      : lang === 'en'
        ? 'Quick answers. To order: use WhatsApp (city + address + Google Maps pin).'
        : 'Réponses rapides. Pour commander: passez par WhatsApp (ville + adresse + pin Google Maps).'

  const qa =
    lang === 'ar'
      ? [
          {
            q: 'واش “Meta AI” خدامة فالمغرب؟',
            a: 'ما كنضمنوش توفر كامل. المزايا الأساسية بحال الكاميرا والصوت خدامين. الميزات اللي مرتبطة بتطبيق Meta/AI/الأوامر الصوتية كتقدر تعتمد على الدولة والتطبيق والهاتف.',
          },
          {
            q: 'كيفاش نطلب؟',
            a: 'كليكي على زر واتساب → صيفط الاسم، المدينة، العنوان + Pin Google Maps. كنأكدو المدة ومن بعد كنصيفطو (الدفع عند الاستلام).',
          },
          {
            q: 'شحال كتاخد التوصيل؟',
            a: 'كنأكدو المدة حسب المدينة قبل الإرسال.',
          },
          {
            q: 'شنو كاين فالعُلبة؟',
            a: 'النظارات، علبة الحماية، ثوب التنظيف، دليل البداية. (ممكن يختلف شي تفصيل بسيط حسب اللّوط).',
          },
          {
            q: 'الإرجاع/الاستبدال؟',
            a: 'شوف صفحة التوصيل والإرجاع. سياسة بسيطة وواضحة.',
          },
        ]
      : lang === 'en'
        ? [
            {
              q: 'Do “Meta AI” features work in Morocco?',
              a: "We don’t promise full availability. Core features (camera/audio) work. Meta app/AI/voice features may depend on country, app and your phone.",
            },
            {
              q: 'How do I order?',
              a: 'Click WhatsApp → send name, city, address + Google Maps pin. We confirm ETA then ship (COD).',
            },
            { q: 'Delivery time?', a: 'We confirm per city before shipping.' },
            { q: "What's in the box?", a: 'Glasses, case, cloth, quick start guide (may vary slightly by batch).' },
            { q: 'Returns/exchange?', a: 'See Delivery & Returns page (simple policy).' },
          ]
        : [
            {
              q: 'Les fonctionnalités “Meta AI” marchent-elles au Maroc ?',
              a: "On ne promet pas une disponibilité totale. Les fonctions de base (caméra/audio) fonctionnent. Les fonctions liées à l’app Meta/AI/commande vocale peuvent dépendre du pays, de l’app et de votre téléphone.",
            },
            {
              q: 'Comment je commande ?',
              a: 'Cliquez sur le bouton WhatsApp → envoyez nom, ville, adresse + pin Google Maps. On confirme le délai et on expédie (COD).',
            },
            {
              q: 'Quels sont les délais de livraison ?',
              a: 'On confirme selon votre ville avant expédition. (On affichera des délais précis après choix du transporteur.)',
            },
            {
              q: 'Que contient la boîte ?',
              a: 'Lunettes, étui, chiffon, guide de démarrage. (Selon lot, accessoires peuvent varier légèrement.)',
            },
            {
              q: 'Retour/échange ?',
              a: 'Voir la page Livraison & Retours. Politique simple, claire et orientée confiance.',
            },
          ]

  return (
    <>
      <AnnouncementBar />
      <HeaderMegaMenu />
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">{title}</h1>
          <p className="mt-3 text-muted-foreground">{intro}</p>

          <div className="mt-10 space-y-6">
            {qa.map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-card p-6">
                <p className="font-semibold text-primary">{item.q}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  )
}
