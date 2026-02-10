'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu'
import { Footer } from '@/components/Footer'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import { useLang } from '@/components/LanguageProvider'

type ProductId = 'rw4006' | 'wayfarer-essilor'

type LocalizedProduct = {
  id: ProductId
  name: { fr: string; en: string; ar: string }
  priceMad: number
}

const PRODUCTS: Record<ProductId, LocalizedProduct> = {
  rw4006: {
    id: 'rw4006',
    name: {
      fr: 'Lunettes connectées Ray‑Ban Meta Wayfarer Gen 1 au Maroc',
      en: 'Ray‑Ban Meta Wayfarer Gen 1 Smart Glasses in Morocco',
      ar: 'نظارات Ray‑Ban Meta Wayfarer Gen 1 فالمغرب',
    },
    priceMad: 3000,
  },
  'wayfarer-essilor': {
    id: 'wayfarer-essilor',
    name: {
      fr: 'Lunettes connectées Ray‑Ban Meta Wayfarer Gen 2 au Maroc',
      en: 'Ray‑Ban Meta Wayfarer Gen 2 Smart Glasses in Morocco',
      ar: 'نظارات Ray‑Ban Meta Wayfarer Gen 2 فالمغرب',
    },
    priceMad: 2700,
  },
}

export default function CheckoutPage() {
  const { lang } = useLang()
  const sp = useSearchParams()
  const productId = (sp.get('product') as ProductId) || 'rw4006'

  const product = PRODUCTS[productId] || PRODUCTS.rw4006
  const productName = lang === 'ar' ? product.name.ar : lang === 'en' ? product.name.en : product.name.fr

  const ui =
    lang === 'ar'
      ? {
          title: 'شراء الآن',
          subtitle: 'عمر هاد الفورم — وغادي نتاصلو بك فالتليفون/واتساب باش نأكدّو الطلب.',
          product: 'المنتوج',
          fullName: 'الاسم الكامل *',
          phone: 'رقم الهاتف *',
          email: 'الإيميل (اختياري)',
          qty: 'الكمية',
          city: 'المدينة *',
          payment: 'الدفع',
          paymentValue: 'الدفع عند الاستلام',
          address: 'العنوان *',
          termsPrefix: 'قريت وكنوافق على ',
          terms: 'الشروط العامة',
          submit: 'تأكيد الطلب',
          sending: 'كيترسل…',
          tip: 'إلى بغيتي تقدر تطلب مباشرة عبر واتساب.',
          yourOrder: 'طلبك',
          price: 'الثمن',
          total: 'المجموع',
          thanks: 'شكراً! تسجّل الطلب ديالك.',
          orderId: 'رقم الطلب',
          weCall: 'غادي نتاصلو بك قريب باش نأكدّو.',
          errName: 'عافاك دخل الاسم الكامل.',
          errPhone: 'عافاك دخل رقم الهاتف.',
          errCity: 'عافاك دخل المدينة.',
          errAddr: 'عافاك دخل العنوان.',
          errTerms: 'خاصك توافق على الشروط العامة.',
          errGeneric: 'وقع مشكل. عاود جرّب ولا طلب عبر واتساب.',
        }
      : lang === 'en'
        ? {
            title: 'Buy now',
            subtitle: 'Fill this form — we will contact you by phone/WhatsApp to confirm your order.',
            product: 'Product',
            fullName: 'Full name *',
            phone: 'Phone *',
            email: 'Email (optional)',
            qty: 'Quantity',
            city: 'City *',
            payment: 'Payment',
            paymentValue: 'Pay on delivery',
            address: 'Address *',
            termsPrefix: 'I have read and accept the ',
            terms: 'terms & conditions',
            submit: 'Place order',
            sending: 'Sending…',
            tip: 'Tip: you can also order directly on WhatsApp.',
            yourOrder: 'Your order',
            price: 'Price',
            total: 'Total',
            thanks: 'Thank you! Your order is recorded.',
            orderId: 'Order ID',
            weCall: 'We will contact you shortly to confirm.',
            errName: 'Please enter your full name.',
            errPhone: 'Please enter your phone number.',
            errCity: 'Please enter your city.',
            errAddr: 'Please enter your address.',
            errTerms: 'Please accept the terms & conditions.',
            errGeneric: 'Something went wrong. Try again or order on WhatsApp.',
          }
        : {
            title: 'Acheter maintenant',
            subtitle:
              'Remplissez ce formulaire — nous vous contactons par téléphone/WhatsApp pour confirmer la commande.',
            product: 'Produit',
            fullName: 'Nom complet *',
            phone: 'Téléphone *',
            email: 'E-mail (optionnel)',
            qty: 'Quantité',
            city: 'Ville *',
            payment: 'Paiement',
            paymentValue: 'Paiement à la livraison',
            address: 'Adresse *',
            termsPrefix: 'J’ai lu et j’accepte les ',
            terms: 'conditions générales',
            submit: 'Commander',
            sending: 'Envoi…',
            tip: 'Astuce: si vous préférez, vous pouvez commander directement sur WhatsApp.',
            yourOrder: 'Votre commande',
            price: 'Prix',
            total: 'Total',
            thanks: 'Merci ! Votre commande est enregistrée.',
            orderId: 'ID commande',
            weCall: 'Nous allons vous contacter rapidement pour confirmer.',
            errName: 'Veuillez entrer votre nom complet.',
            errPhone: 'Veuillez entrer votre numéro de téléphone.',
            errCity: 'Veuillez entrer votre ville.',
            errAddr: 'Veuillez entrer votre adresse.',
            errTerms: 'Veuillez accepter les conditions générales.',
            errGeneric: 'Une erreur est survenue. Réessayez ou commandez sur WhatsApp.',
          }

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [doneId, setDoneId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const total = useMemo(() => product.priceMad * quantity, [product.priceMad, quantity])

  async function submit() {
    setError(null)

    if (!fullName.trim()) return setError(ui.errName)
    if (!phone.trim()) return setError(ui.errPhone)
    if (!city.trim()) return setError(ui.errCity)
    if (!address.trim()) return setError(ui.errAddr)
    if (!acceptTerms) return setError(ui.errTerms)

    setSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          priceMad: product.priceMad,
          quantity,
          fullName,
          phone,
          email,
          city,
          address,
          acceptTerms: true,
          website: '',
        }),
      })

      const json = await res.json()
      if (!res.ok || !json?.ok) {
        setError(ui.errGeneric)
        return
      }

      setDoneId(json.id)
    } catch {
      setError(ui.errGeneric)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <AnnouncementBar />
      <HeaderMegaMenu />

      <main className="bg-background">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">{ui.title}</h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">{ui.subtitle}</p>

            <div className="mt-10 grid gap-6 lg:grid-cols-5">
              {/* Form */}
              <div className="lg:col-span-3 rounded-3xl border border-border bg-background p-6 md:p-8">
              {doneId ? (
                <div>
                  <p className="text-2xl font-semibold text-primary">{ui.thanks}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {ui.orderId}: <span className="font-mono">{doneId}</span>
                  </p>
                  <p className="mt-4 text-base text-muted-foreground">{ui.weCall}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-primary">{ui.product}</label>
                    <div className="mt-2 rounded-2xl border border-border bg-card px-5 py-4 text-base">
                      {productName} — <span className="font-semibold">{product.priceMad} DH</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-primary">{ui.fullName}</label>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-4 text-base"
                        placeholder="Nom et prénom"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-primary">{ui.phone}</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-4 text-base"
                        placeholder="06..."
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-primary">{ui.email}</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-4 text-base"
                        placeholder="nom@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-primary">{ui.qty}</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value || 1))}
                        className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-4 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-primary">{ui.city}</label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-4 text-base"
                        placeholder="Rabat, Casablanca..."
                      />
                    </div>
                    <div className="rounded-2xl border border-border bg-secondary px-5 py-4">
                      <p className="text-sm font-semibold text-primary">{ui.payment}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{ui.paymentValue}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-primary">{ui.address}</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-4 text-base min-h-[130px]"
                      placeholder="Quartier, rue, numéro..."
                    />
                  </div>

                  {error && <p className="text-base text-destructive">{error}</p>}

                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <span>
                      {ui.termsPrefix}
                      <a href="/privacy" className="underline underline-offset-4">
                        {ui.terms}
                      </a>
                      .
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="inline-flex w-full justify-center items-center rounded-full bg-accent text-accent-foreground px-8 py-4 text-base md:text-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
                  >
                    {submitting ? ui.sending : ui.submit}
                  </button>

                  <p className="text-xs text-muted-foreground">{ui.tip}</p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-2 rounded-3xl border border-border bg-background p-6 md:p-8">
              <p className="font-semibold text-primary">{ui.yourOrder}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{ui.product}</span>
                  <span className="font-semibold text-primary text-right">{product.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{ui.price}</span>
                  <span className="font-semibold text-primary">{product.priceMad} DH</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{ui.qty}</span>
                  <span className="font-semibold text-primary">{quantity}</span>
                </div>
                <div className="border-t border-border my-3" />
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{ui.total}</span>
                  <span className="font-semibold text-primary">{total} DH</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-secondary p-5 text-sm">
                <p className="font-semibold text-primary">{ui.payment}</p>
                <p className="mt-1 text-muted-foreground">{ui.paymentValue}</p>
              </div>
            </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
