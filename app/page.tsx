'use client'

import Image from 'next/image'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import { buildWhatsAppLink, buildOrderTemplate } from '@/lib/whatsapp'
import { useLang } from '@/components/LanguageProvider'
import { useMemo, useState } from 'react'

type LandingProduct = {
  id: 'rw4006' | 'wayfarer-essilor'
  // localized names
  name: { ar: string; fr: string; en: string }
  price: number
  image: string // small card image
  gallery: string[] // product gallery (details section)
}

export default function Home() {
  const { lang } = useLang()

  const products: LandingProduct[] = useMemo(
    () => [
      {
        id: 'rw4006',
        name: {
          ar: 'Ray‑Ban Meta Wayfarer (RW4006)',
          fr: 'Ray‑Ban Meta Wayfarer (RW4006)',
          en: 'Ray‑Ban Meta Wayfarer (RW4006)',
        },
        price: 3000,
        image: '/images/ray-ban-1.png',
        gallery: ['/images/ray-ban-1.png', '/images/ray-ban-2.png', '/images/rayban-3.png'],
      },
      {
        id: 'wayfarer-essilor',
        name: {
          ar: 'RAY‑BAN META WAYFARER ESSILORLUXOTTICA',
          fr: 'RAY‑BAN META WAYFARER ESSILORLUXOTTICA',
          en: 'RAY‑BAN META WAYFARER ESSILORLUXOTTICA',
        },
        price: 2600,
        image: '/images/product2-1.png',
        gallery: ['/images/product2-1.png', '/images/product2-2.png'],
      },
    ],
    []
  )

  const [selectedId, setSelectedId] = useState<LandingProduct['id']>('rw4006')
  const selected = products.find((p) => p.id === selectedId) || products[0]

  const selectedName = lang === 'ar' ? selected.name.ar : lang === 'en' ? selected.name.en : selected.name.fr
  const currency = lang === 'ar' ? 'درهم' : lang === 'en' ? 'MAD' : 'DH'
  const priceLabel = `${selected.price.toLocaleString('fr-MA')} ${currency}`

  const waMessage = buildOrderTemplate(lang, {
    name: selectedName,
    price: selected.price,
    currencyLabel: currency,
  })
  const waHref = buildWhatsAppLink(waMessage)

  const orderHrefFor = (p: LandingProduct) => {
    const name = lang === 'ar' ? p.name.ar : lang === 'en' ? p.name.en : p.name.fr
    const msg = buildOrderTemplate(lang, { name, price: p.price, currencyLabel: currency })
    return buildWhatsAppLink(msg)
  }

  const ui =
    lang === 'ar'
      ? {
          pill: `${priceLabel} • الدفع عند الاستلام • المغرب`,
          titleTop: 'LunetteX',
          titleProduct: selectedName,
          subtitle:
            'كاميرا بلا يدين + صوت Open‑Ear. الطلب عبر واتساب — والدفع عند الاستلام.',
          note:
            'ملاحظة: بعض المزايا (Meta app/AI) كتبدل حسب الدولة والإعدادات. كنكونو واضحين قبل الطلب.',
          ctaOrder: 'طلب عبر واتساب',
          ctaDetails: 'شوف التفاصيل',
          trust: [
            { t: 'تأكيد فالواتساب', d: 'كنأكدو المدينة + العنوان + المدة قبل الإرسال.' },
            { t: 'توصيل داخل المغرب', d: 'المدة كتختلف حسب المدينة.' },
            { t: 'سياسة واضحة', d: 'إرجاع/استبدال بسيط.' },
          ],
          detailsTitle: 'التفاصيل',
          price: priceLabel,
          metaLine: 'الدفع عند الاستلام • تأكيد فالواتساب',
          bullets:
            '• كاميرا مدمجة للتصوير بلا يدين.\n• صوت Open‑Ear باش تسمع بلا ما تعزل على اللي داير بك.\n• شكل Wayfarer الكلاسيكي.',
          importantTitle: 'ملاحظة مهمة (شفافية)',
          importantBody:
            'بعض المزايا (Meta AI/التطبيق/الأوامر الصوتية) كتقدر تعتمد على الدولة والتطبيق والهاتف. ما كنزيدوش نهضرو أكثر من الحقيقة.',
          deliveryReturns: 'التوصيل والإرجاع',
          boxTitle: 'شنو كاين فالعُلبة',
          boxItems: ['النظارات', 'علبة الحماية', 'ثوب التنظيف', 'دليل البداية'],
          compatTitle: 'متوافقة مع',
          compatItems: ['iPhone / Android', 'التطبيق: Meta', 'كنعاونك فالتثبيت فواتساب'],
          trustProofTitle: 'صور حقيقية',
          trustProofBody:
            'هاد الصور من الستوك الحالي. ملي تزيد صور/فيديو حقيقيين ديالك، كنبدلوهم باش نزيدو الثقة.',
          faqTitle: 'أسئلة شائعة',
          faqMore: 'شوف الكل →',
          faq: [
            {
              q: 'واش خدامة فالمغرب؟',
              a: 'المزايا الأساسية (كاميرا/صوت) خدامين. Meta AI والتطبيق ممكن يختلف حسب الدولة.',
            },
            {
              q: 'كيفاش نطلب؟',
              a: 'كليكي على واتساب وصيفط الاسم + المدينة + العنوان + Pin. كنأكدُو ومن بعد كنصيفطو (COD).',
            },
            { q: 'شحال كتاخد التوصيل؟', a: 'كنأكدُو المدة حسب المدينة قبل الإرسال.' },
            { q: 'الإرجاع/الاستبدال؟', a: 'السياسة فصفحة التوصيل والإرجاع.' },
          ],
        }
      : lang === 'en'
        ? {
            pill: `${priceLabel} • COD • Morocco`,
            titleTop: 'LunetteX',
            titleProduct: selectedName,
            subtitle:
              'Hands‑free camera + open‑ear audio. Order on WhatsApp — pay on delivery.',
            note:
              'Note: some features (Meta app/AI) depend on country availability and phone settings. We stay transparent.',
            ctaOrder: 'Order on WhatsApp',
            ctaDetails: 'See details',
            trust: [
              { t: 'WhatsApp confirmation', d: 'We confirm city + address + ETA before shipping.' },
              { t: 'Delivery in Morocco', d: 'ETA varies by city.' },
              { t: 'Clear policy', d: 'Simple returns/exchange.' },
            ],
            detailsTitle: 'Details',
            price: priceLabel,
            metaLine: 'Cash on delivery • WhatsApp confirmation',
            bullets:
              '• Built‑in camera for hands‑free capture.\n• Open‑ear audio so you stay aware.\n• Iconic Wayfarer design.',
            importantTitle: 'Important note (transparency)',
            importantBody:
              'Some Meta AI/app/voice features may depend on country, app and phone. We do not overpromise.',
            deliveryReturns: 'Delivery & Returns',
            boxTitle: "What's in the box",
            boxItems: ['Glasses', 'Protective case', 'Cleaning cloth', 'Quick start guide'],
            compatTitle: 'Compatibility',
            compatItems: ['iPhone / Android', 'Meta app', 'We guide setup on WhatsApp'],
            trustProofTitle: 'Real photos',
            trustProofBody:
              'These are current stock images. Once you add your own photos/videos, we’ll replace for maximum trust.',
            faqTitle: 'FAQ',
            faqMore: 'View all →',
            faq: [
              {
                q: 'Does it work in Morocco?',
                a: 'Core features (camera/audio) work. Meta AI/app features can vary by country.',
              },
              {
                q: 'How do I order?',
                a: 'Click WhatsApp and send name + city + address + pin. We confirm then ship (COD).',
              },
              { q: 'Delivery time?', a: 'Confirmed per city before shipping.' },
              { q: 'Returns/exchange?', a: 'See the Delivery & Returns page.' },
            ],
          }
        : {
            pill: `${priceLabel} • COD • Maroc`,
            titleTop: 'LunetteX',
            titleProduct: selectedName,
            subtitle:
              'Caméra mains libres + audio open‑ear. Commande sur WhatsApp — paiement à la livraison.',
            note:
              'Note: certaines fonctions (Meta app/AI) dépendent du pays/configuration. On reste transparents.',
            ctaOrder: 'Commander sur WhatsApp',
            ctaDetails: 'Voir détails',
            trust: [
              { t: 'COD + confirmation', d: 'Ville + adresse + délai confirmés avant envoi.' },
              { t: 'Livraison Maroc', d: 'Délais variables حسب المدينة.' },
              { t: 'Politique claire', d: 'Retours/échanges simples.' },
            ],
            detailsTitle: 'Détails',
            price: priceLabel,
            metaLine: 'Paiement à la livraison • Confirmation WhatsApp',
            bullets:
              '• Caméra intégrée pour capturer des moments en mains libres.\n• Audio open‑ear pour écouter sans isoler.\n• Design Wayfarer iconique.',
            importantTitle: 'Note importante (transparence)',
            importantBody:
              'Certaines fonctions (Meta AI/app, commandes vocales, software) dépendent du pays, de l’app et du téléphone. On ne sur‑promet pas.',
            deliveryReturns: 'Livraison & Retours',
            boxTitle: 'Dans la boîte',
            boxItems: ['Lunettes', 'Étui de protection', 'Chiffon de nettoyage', 'Guide de démarrage'],
            compatTitle: 'Compatible avec',
            compatItems: ['iPhone / Android', 'Application Meta', 'Setup guidé sur WhatsApp'],
            trustProofTitle: 'Photos réelles',
            trustProofBody:
              'Images actuelles du stock. Dès que vous avez vos propres photos/vidéos, on remplace pour maximiser la confiance.',
            faqTitle: 'FAQ',
            faqMore: 'Voir tout →',
            faq: [
              {
                q: 'Est‑ce que ça marche au Maroc ?',
                a: "Oui pour les fonctions de base (caméra/audio). Certaines fonctions ‘Meta AI’ peuvent dépendre du pays/app.",
              },
              {
                q: 'Comment je commande ?',
                a: 'Clique sur WhatsApp, envoie nom + ville + adresse + pin. On confirme puis on expédie (COD).',
              },
              { q: 'Délais de livraison ?', a: 'On confirme le délai selon votre ville avant l’envoi.' },
              { q: 'Retours/échanges ?', a: 'Politique simple (voir Livraison & Retours).' },
            ],
          }

  return (
    <>
      <AnnouncementBar />
      <HeaderMegaMenu />

      <main className="bg-background">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/first-ray.webp"
              alt="Ray-Ban Meta Wayfarer"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-2xl text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
                {ui.pill}
              </p>
              <h1 className="mt-6 text-4xl md:text-6xl font-serif font-bold leading-tight">
                {ui.titleTop}
                <span className="block text-white/90 text-2xl md:text-3xl font-sans font-semibold mt-3">
                  {ui.titleProduct}
                </span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-white/90 leading-relaxed">
                {ui.subtitle}
                <span className="block mt-2 text-white/80 text-sm">{ui.note}</span>
              </p>

              {/* Products (2 models) */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {products.map((p) => {
                  const name = lang === 'ar' ? p.name.ar : lang === 'en' ? p.name.en : p.name.fr
                  const isActive = p.id === selectedId
                  const href = orderHrefFor(p)
                  return (
                    <div
                      key={p.id}
                      className={`group rounded-2xl border p-4 backdrop-blur transition cursor-pointer ${
                        isActive
                          ? 'border-white/40 bg-white/15'
                          : 'border-white/15 bg-white/10 hover:bg-white/15'
                      }`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedId(p.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setSelectedId(p.id)
                      }}
                      aria-label={name}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 rounded-xl bg-white/10 overflow-hidden border border-white/10">
                          <Image src={p.image} alt={name} fill className="object-contain p-2" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{name}</p>
                          <p className="text-sm text-white/80 mt-0.5">
                            {p.price.toLocaleString('fr-MA')} {currency}
                            <span className="mx-2 text-white/40">•</span>
                            {lang === 'ar' ? 'الدفع عند الاستلام' : lang === 'en' ? 'Cash on delivery' : 'Paiement à la livraison'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                        >
                          {lang === 'ar' ? 'طلب هذا الموديل' : lang === 'en' ? 'Order this model' : 'Commander ce modèle'}
                        </a>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedId(p.id)
                            document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
                        >
                          {lang === 'ar' ? 'التفاصيل' : lang === 'en' ? 'Details' : 'Détails'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  id="order"
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center rounded-full bg-accent text-accent-foreground px-7 py-3 font-semibold hover:opacity-90 transition"
                >
                  {ui.ctaOrder}
                </a>
                <a
                  href="#details"
                  className="inline-flex justify-center items-center rounded-full border border-white/30 bg-white/10 px-7 py-3 font-semibold hover:bg-white/15 transition"
                >
                  {ui.ctaDetails}
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ui.trust.map((b) => (
                  <div
                    key={b.t}
                    className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="font-semibold text-white">{b.t}</p>
                    <p className="text-sm text-white/85 mt-1">{b.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS */}
        <section id="details" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-background">
                <Image
                  src={selected.gallery[0] || selected.image}
                  alt={selectedName}
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div
                className={`mt-4 grid gap-2 ${selected.gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
              >
                {selected.gallery.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-square rounded-xl border border-border bg-background overflow-hidden"
                  >
                    <Image src={src} alt={selectedName} fill className="object-contain p-4" />
                  </div>
                ))}
              </div>

              {/* Trust proof */}
              <div className="mt-5 rounded-2xl border border-border bg-secondary p-4">
                <p className="font-semibold text-primary">{ui.trustProofTitle}</p>
                <p className="text-sm mt-1">{ui.trustProofBody}</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                {ui.titleProduct}
              </h2>
              <p className="mt-3 text-2xl font-serif font-bold text-primary">{ui.price}</p>
              <p className="mt-2 text-sm">{ui.metaLine}</p>

              <div className="mt-6 space-y-3 leading-relaxed">
                <p className="whitespace-pre-line">{ui.bullets}</p>
                <div className="rounded-2xl border border-border bg-secondary p-4">
                  <p className="font-semibold text-primary">{ui.importantTitle}</p>
                  <p className="text-sm mt-1">{ui.importantBody}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center rounded-full bg-accent text-accent-foreground px-7 py-3 font-semibold hover:opacity-90 transition"
                >
                  {ui.ctaOrder}
                </a>
                <a
                  href="/delivery-returns"
                  className="inline-flex justify-center items-center rounded-full border border-border px-7 py-3 font-semibold hover:bg-secondary transition"
                >
                  {ui.deliveryReturns}
                </a>
              </div>

              <div className="mt-10 grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="font-semibold text-primary">{ui.boxTitle}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {ui.boxItems.map((x) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="font-semibold text-primary">{ui.compatTitle}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {ui.compatItems.map((x) => (
                      <li key={x}>• {x}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-secondary p-4">
                <p className="font-semibold text-primary">
                  {lang === 'ar'
                    ? 'باش نأكدُو الطلب بسرعة:'
                    : lang === 'en'
                      ? 'To confirm fast:'
                      : 'Pour confirmer vite:'}
                </p>
                <p className="text-sm mt-1">
                  {lang === 'ar'
                    ? 'صيفط لينا فالواتساب: الاسم + المدينة + العنوان + Pin. كنأكدُو ومن بعد كنرسلو.'
                    : lang === 'en'
                      ? 'Send on WhatsApp: name + city + address + pin. We confirm then ship.'
                      : 'Envoyez sur WhatsApp: nom + ville + adresse + pin. On confirme puis on expédie.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ PREVIEW */}
        <section className="bg-secondary border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">{ui.faqTitle}</h2>
              <a
                href="/faq"
                className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent transition"
              >
                {ui.faqMore}
              </a>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {ui.faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-border bg-card p-6">
                  <p className="font-semibold text-primary">{item.q}</p>
                  <p className="text-sm mt-2 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWhatsApp message={waMessage} />
    </>
  )
}
