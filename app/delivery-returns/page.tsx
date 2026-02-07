'use client'

import { AnnouncementBar } from '@/components/AnnouncementBar'
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import { useLang } from '@/components/LanguageProvider'

export default function DeliveryReturnsPage() {
  const { lang } = useLang()

  const title =
    lang === 'ar'
      ? 'التوصيل والإرجاع'
      : lang === 'en'
        ? 'Delivery & Returns'
        : 'Livraison & Retours'

  const intro =
    lang === 'ar'
      ? 'هدفنا نقلّلو من رفض COD ونخليو التجربة نقيّة. كلشي كيتأكد فواتساب قبل الإرسال.'
      : lang === 'en'
        ? 'We aim to reduce COD refusals and keep a clean experience. Everything is confirmed on WhatsApp before shipping.'
        : 'On veut réduire les refus COD et garder une expérience propre. Tout est confirmé sur WhatsApp avant l’envoi.'

  return (
    <>
      <AnnouncementBar />
      <HeaderMegaMenu />
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">{title}</h1>
          <p className="mt-3 text-muted-foreground">{intro}</p>

          <div className="mt-10 space-y-8">
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-primary">
                {lang === 'ar' ? 'التوصيل (داخل المغرب)' : lang === 'en' ? 'Delivery (Morocco)' : 'Livraison (Maroc)'}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
                {lang === 'ar' ? (
                  <>
                    <li>• الدفع عند الاستلام (COD).</li>
                    <li>• المدة: كنأكدُوها حسب المدينة قبل الإرسال.</li>
                    <li>• غالباً الموصّل كيتاصل بك قبل التوصيل.</li>
                  </>
                ) : lang === 'en' ? (
                  <>
                    <li>• Cash on delivery (COD).</li>
                    <li>• ETA: confirmed per city before shipping.</li>
                    <li>• Courier usually calls before delivery.</li>
                  </>
                ) : (
                  <>
                    <li>• Paiement à la livraison (COD).</li>
                    <li>• Délai: confirmé selon votre ville avant expédition.</li>
                    <li>• Le livreur vous appelle généralement avant la livraison.</li>
                  </>
                )}
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-primary">
                {lang === 'ar'
                  ? 'تأكيد الطلب وتقليل الرفض'
                  : lang === 'en'
                    ? 'Confirmation & anti‑refusal'
                    : 'Confirmation & anti‑refus'}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
                {lang === 'ar' ? (
                  <>
                    <li>• كنطلبو: الاسم، المدينة، العنوان كامل + Pin ديال Google Maps إلا أمكن.</li>
                    <li>
                      • فبعض الحالات (مدن بعيدة، ما كاينش تأكيد، أو سوابق) ممكن نطلبو <strong>تأمين 100 درهم</strong> —
                      كيتحسب من الثمن (المجموع 2800 درهم).
                    </li>
                  </>
                ) : lang === 'en' ? (
                  <>
                    <li>• We ask for: name, city, full address + Google Maps pin (if possible).</li>
                    <li>
                      • For some high‑risk orders (far areas, unconfirmed, previous refusals), we may request a <strong>100 MAD deposit</strong> —
                      deducted from the total (2800 MAD).
                    </li>
                  </>
                ) : (
                  <>
                    <li>• On demande: nom, ville, adresse complète + pin Google Maps si possible.</li>
                    <li>
                      • Pour certaines commandes à risque (zones lointaines, non confirmé, historique), un acompte de <strong>100 DH</strong> peut être demandé —
                      déduit du total (2800 DH).
                    </li>
                  </>
                )}
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-primary">
                {lang === 'ar' ? 'الإرجاع والاستبدال' : lang === 'en' ? 'Returns & exchange' : 'Retours & échanges'}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {lang === 'ar'
                  ? 'عندك 7 أيام من بعد ما توصلك السلعة باش تطلب الإرجاع/الاستبدال (خاصها تكون فحالة مزيانة وكاملة).'
                  : lang === 'en'
                    ? 'You have 7 days after delivery to request a return/exchange (item must be complete and in good condition).'
                    : 'Vous avez 7 jours après réception pour demander un retour/échange (produit en bon état, complet, sans dommages).'}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
                {lang === 'ar' ? (
                  <>
                    <li>• عيب عند الوصول: كنقترحو حل (استبدال/إرجاع) من بعد التحقق.</li>
                    <li>• مصاريف الإرجاع كتختلف حسب السبب (عيب vs تغيير الرأي).</li>
                    <li>• تواصل معنا فواتساب وصيفط صور/فيديو إلى احتجنا.</li>
                  </>
                ) : lang === 'en' ? (
                  <>
                    <li>• Defect on arrival: we offer a solution after verification.</li>
                    <li>• Return shipping fees may depend on the reason.</li>
                    <li>• Contact us on WhatsApp with photos/video if needed.</li>
                  </>
                ) : (
                  <>
                    <li>• Défaut à l’arrivée: on propose une solution (échange/retour) après vérification.</li>
                    <li>• Les frais de retour peuvent dépendre de la cause (défaut vs changement d’avis).</li>
                    <li>• Contactez-nous sur WhatsApp avec photos/vidéo si nécessaire.</li>
                  </>
                )}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  )
}
