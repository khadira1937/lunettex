'use client'

import Image from 'next/image'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import { buildWhatsAppLink, buildOrderTemplate } from '@/lib/whatsapp'
import { useLang } from '@/components/LanguageProvider'
import { useMemo, useState } from 'react'

function trackWhatsAppLead(payload?: { productName?: string; valueMad?: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  if (typeof w.fbq === 'function') {
    w.fbq('track', 'Lead', {
      channel: 'whatsapp',
      content_name: payload?.productName,
      value: payload?.valueMad,
      currency: 'MAD',
    })
    w.fbq('trackCustom', 'WhatsAppClick', {
      productName: payload?.productName,
      valueMad: payload?.valueMad,
    })
  }
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      item_name: payload?.productName,
      value: payload?.valueMad,
      currency: 'MAD',
    })
  }
}

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

  // Per‑model copy (so switching model updates the whole content, not just the price)
  const modelCopy = useMemo(() => {
    return {
      rw4006: {
        ar: {
          bullets: `• كاميرا مدمجة للتصوير بلا يدين.
• صوت Open‑Ear باش تسمع بلا ما تعزل على اللي داير بك.
• مايكات باش المكالمات تكون واضحة.
• تحكم: زر التقاط + Touch فالإطار.`, 
          importantTitle: 'معلومة مهمة',
          importantBody:
            'كتحتاج هاتف + Bluetooth + التطبيق باش تركّب وتبدّل الإعدادات وتنسّق الصور/الفيديو.',
        },
        en: {
          bullets: `• Built‑in camera for hands‑free capture.
• Open‑ear audio so you stay aware.
• Multiple mics for clearer calls.
• Controls: capture button + touch controls on the frame.`, 
          importantTitle: 'Important',
          importantBody:
            'Requires a phone + Bluetooth + the companion app for setup, settings, and syncing photos/videos.',
        },
        fr: {
          bullets: `• Caméra intégrée pour capturer en mains libres.
• Audio open‑ear pour rester conscient de votre environnement.
• Plusieurs micros pour des appels plus clairs.
• Contrôles: bouton capture + tactile sur la branche.`, 
          importantTitle: 'Important',
          importantBody:
            'Nécessite un téléphone + Bluetooth + l’application compagnon pour l’installation, les réglages et la synchronisation.',
        },
      },
      'wayfarer-essilor': {
        ar: {
          bullets: `• نفس روح Wayfarer: ستايل كلاسيكي + تكنولوجيا ذكية.
• كاميرا مدمجة للتصوير بلا يدين.
• صوت Open‑Ear + مايكات للمكالمات.
• تحكم سهل: زر التقاط + Touch.`, 
          importantTitle: 'معلومة مهمة',
          importantBody:
            'كتحتاج هاتف + Bluetooth + التطبيق باش تركّب وتستعمل المزايا الذكية وتنسّق المحتوى.',
        },
        en: {
          bullets: `• Classic Wayfarer look with smart features.
• Built‑in camera for hands‑free capture.
• Open‑ear audio + mics for calls.
• Easy controls: capture button + touch controls.`, 
          importantTitle: 'Important',
          importantBody:
            'Requires a phone + Bluetooth + the companion app to use smart features and sync content.',
        },
        fr: {
          bullets: `• Look Wayfarer classique avec fonctions smart.
• Caméra intégrée pour capturer en mains libres.
• Audio open‑ear + micros pour les appels.
• Contrôles simples: bouton capture + tactile.`, 
          importantTitle: 'Important',
          importantBody:
            'Nécessite un téléphone + Bluetooth + l’application compagnon pour utiliser les fonctions smart et synchroniser.',
        },
      },
    } as const
  }, [])

  const selectedCopy =
    selectedId === 'rw4006'
      ? modelCopy.rw4006[lang]
      : modelCopy['wayfarer-essilor'][lang]

  const ui =
    lang === 'ar'
      ? {
          pill: `${priceLabel} • الدفع عند الاستلام • المغرب`,
          titleTop: 'LunetteX',
          titleProduct: 'نظارات ذكية (Meta) بالمغرب',
          subtitle:
            'كاميرا بلا يدين + صوت Open‑Ear. اختار الموديل فالأسفل ثم طلب عبر واتساب — والدفع عند الاستلام.',
          note:
            'ملاحظة: باش تستافد من المزايا الذكية خاصك هاتف + Bluetooth + التطبيق للإعدادات وتنسيق الصور/الفيديو.',
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
          // trustProof removed
          faqTitle: 'أسئلة شائعة',
          faqMore: 'شوف الكل →',
          faq: [
            {
              q: 'كيفاش كتخدم؟',
              a: 'كتربطها بالتليفون عبر Bluetooth وكتكمّل الإعدادات فالتطبيق، ومن بعد كتقدر تصوّر وتسمع وتدير مكالمات بسهولة.',
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
            titleProduct: 'Meta Smart Glasses in Morocco',
            subtitle:
              'Hands‑free camera + open‑ear audio. Choose your model below, then order on WhatsApp — pay on delivery.',
            note:
              'Note: you’ll need a phone + Bluetooth + the companion app for setup, settings, and syncing photos/videos.',
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
            // trustProof removed
            faqTitle: 'FAQ',
            faqMore: 'View all →',
            faq: [
              {
                q: 'How does it work?',
                a: 'Pair it to your phone via Bluetooth, complete setup in the companion app, then capture moments hands‑free and use audio/calls easily.',
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
            titleProduct: 'Lunettes intelligentes (Meta) au Maroc',
            subtitle:
              'Caméra mains libres + audio open‑ear. Choisissez votre modèle ci‑dessous, puis commandez sur WhatsApp — paiement à la livraison.',
            note:
              'Note: vous aurez besoin d’un téléphone + Bluetooth + de l’application compagnon pour l’installation et la synchronisation.',
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
            // trustProof removed
            faqTitle: 'FAQ',
            faqMore: 'Voir tout →',
            faq: [
              {
                q: 'Comment ça marche ?',
                a: 'Connectez‑les au téléphone via Bluetooth, terminez l’installation dans l’application compagnon, puis utilisez caméra/audio/appels facilement.',
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

              {/* Model picker moved to Details section for a cleaner hero */}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  id="order"
                  href={waHref}
                  onClick={() => trackWhatsAppLead({ productName: selectedName, valueMad: selected.price })}
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
          {/* Model picker (2 models) */}
          <div className="mb-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">
                  {lang === 'ar'
                    ? 'اختار الموديل'
                    : lang === 'en'
                      ? 'Choose a model'
                      : 'Choisir un modèle'}
                </p>
                <p className="mt-1 text-lg font-semibold text-primary">
                  {lang === 'ar'
                    ? 'كاينين جوج موديلات — كليكي باش تبدل'
                    : lang === 'en'
                      ? 'Two models available — tap to switch'
                      : 'Deux modèles — cliquez pour changer'}
                </p>
              </div>
              <a
                href={waHref}
                onClick={() => trackWhatsAppLead({ productName: selectedName, valueMad: selected.price })}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-5 py-2 text-sm font-semibold hover:opacity-90 transition"
              >
                {lang === 'ar' ? 'طلب عبر واتساب' : lang === 'en' ? 'Order on WhatsApp' : 'Commander sur WhatsApp'}
              </a>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {products.map((p) => {
                const name = lang === 'ar' ? p.name.ar : lang === 'en' ? p.name.en : p.name.fr
                const isActive = p.id === selectedId
                const href = orderHrefFor(p)
                return (
                  <div
                    key={p.id}
                    className={`group rounded-2xl border p-4 transition cursor-pointer ${
                      isActive
                        ? 'border-primary/30 bg-secondary'
                        : 'border-border bg-card hover:bg-secondary'
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
                      <div className="relative h-12 w-12 shrink-0 rounded-xl bg-background overflow-hidden border border-border">
                        <Image src={p.image} alt={name} fill className="object-contain p-2" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary truncate">{name}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {p.price.toLocaleString('fr-MA')} {currency}
                          <span className="mx-2 text-muted-foreground/40">•</span>
                          {lang === 'ar' ? 'الدفع عند الاستلام' : lang === 'en' ? 'Cash on delivery' : 'Paiement à la livraison'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation()
                          trackWhatsAppLead({ productName: name, valueMad: p.price })
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
                      >
                        {lang === 'ar' ? 'طلب هذا الموديل' : lang === 'en' ? 'Order this model' : 'Commander ce modèle'}
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedId(p.id)
                        }}
                        className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          isActive
                            ? 'border-primary/30 bg-primary/5 text-primary'
                            : 'border-border bg-background text-primary hover:bg-secondary'
                        }`}
                      >
                        {isActive
                          ? lang === 'ar'
                            ? 'مختار'
                            : lang === 'en'
                              ? 'Selected'
                              : 'Sélectionné'
                          : lang === 'ar'
                            ? 'اختار'
                            : lang === 'en'
                              ? 'Select'
                              : 'Choisir'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

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

              {/* Trust proof removed */}
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                {selectedName}
              </h2>
              <p className="mt-3 text-2xl font-serif font-bold text-primary">{ui.price}</p>
              <p className="mt-2 text-sm">{ui.metaLine}</p>

              <div className="mt-6 space-y-3 leading-relaxed">
                <p className="whitespace-pre-line">{selectedCopy.bullets}</p>
                <div className="rounded-2xl border border-border bg-secondary p-4">
                  <p className="font-semibold text-primary">{selectedCopy.importantTitle}</p>
                  <p className="text-sm mt-1">{selectedCopy.importantBody}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={waHref}
                  onClick={() => trackWhatsAppLead({ productName: selectedName, valueMad: selected.price })}
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
