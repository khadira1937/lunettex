'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu'
import { Footer } from '@/components/Footer'
import { AnnouncementBar } from '@/components/AnnouncementBar'

type ProductId = 'rw4006' | 'wayfarer-essilor'

const PRODUCTS: Record<ProductId, { id: ProductId; name: string; priceMad: number }> = {
  rw4006: {
    id: 'rw4006',
    name: 'Lunettes connectées Ray‑Ban Meta Wayfarer Gen 1 au Maroc',
    priceMad: 3000,
  },
  'wayfarer-essilor': {
    id: 'wayfarer-essilor',
    name: 'Lunettes connectées Ray‑Ban Meta Wayfarer Gen 2 au Maroc',
    priceMad: 2700,
  },
}

export default function CheckoutPage() {
  const sp = useSearchParams()
  const productId = (sp.get('product') as ProductId) || 'rw4006'

  const product = PRODUCTS[productId] || PRODUCTS.rw4006

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'pay_on_delivery' | 'cih_transfer'>('pay_on_delivery')
  const [notes, setNotes] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [doneId, setDoneId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const total = useMemo(() => product.priceMad * quantity, [product.priceMad, quantity])

  async function submit() {
    setError(null)

    if (!fullName.trim()) return setError('Veuillez entrer votre nom complet.')
    if (!phone.trim()) return setError('Veuillez entrer votre numéro de téléphone.')
    if (!city.trim()) return setError('Veuillez entrer votre ville.')
    if (!address.trim()) return setError('Veuillez entrer votre adresse.')
    if (!acceptTerms) return setError('Veuillez accepter les conditions générales.')

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
          paymentMethod,
          notes,
          acceptTerms: true,
          website: '',
        }),
      })

      const json = await res.json()
      if (!res.ok || !json?.ok) {
        setError('Une erreur est survenue. Réessayez ou commandez sur WhatsApp.')
        return
      }

      setDoneId(json.id)
    } catch {
      setError('Une erreur est survenue. Réessayez ou commandez sur WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <AnnouncementBar />
      <HeaderMegaMenu />

      <main className="bg-background">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">Acheter maintenant</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Remplissez ce formulaire — nous vous contactons pour confirmer la commande.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3 rounded-3xl border border-border bg-card p-6">
              {doneId ? (
                <div>
                  <p className="text-lg font-semibold text-primary">Merci ! Votre commande est enregistrée.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    ID commande: <span className="font-mono">{doneId}</span>
                  </p>
                  <p className="mt-4 text-sm">
                    Nous allons vous contacter rapidement pour confirmer.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-primary">Produit</label>
                    <div className="mt-1 rounded-xl border border-border bg-background px-4 py-3 text-sm">
                      {product.name} — <span className="font-semibold">{product.priceMad} DH</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-primary">Nom complet *</label>
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                        placeholder="Nom et prénom"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-primary">Téléphone *</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                        placeholder="06..."
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-primary">E-mail (optionnel)</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                        placeholder="nom@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-primary">Quantité</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value || 1))}
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-primary">Ville *</label>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                        placeholder="Rabat, Casablanca..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-primary">Mode de paiement</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                      >
                        <option value="pay_on_delivery">Paiement à la livraison</option>
                        <option value="cih_transfer">Virement CIH</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-primary">Adresse *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm min-h-[110px]"
                      placeholder="Quartier, rue, numéro..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-primary">Note (optionnel)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm min-h-[90px]"
                      placeholder="Ex: meilleure heure pour appeler..."
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <span>
                      J’ai lu et j’accepte les{' '}
                      <a href="/privacy" className="underline underline-offset-4">
                        conditions générales
                      </a>
                      .
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="inline-flex w-full justify-center items-center rounded-full bg-accent text-accent-foreground px-7 py-3 font-semibold hover:opacity-90 transition disabled:opacity-60"
                  >
                    {submitting ? 'Envoi…' : 'Commander'}
                  </button>

                  <p className="text-xs text-muted-foreground">
                    Astuce: si vous préférez, vous pouvez commander directement sur WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6">
              <p className="font-semibold text-primary">Votre commande</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Produit</span>
                  <span className="font-semibold text-primary text-right">{product.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Prix</span>
                  <span className="font-semibold text-primary">{product.priceMad} DH</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Quantité</span>
                  <span className="font-semibold text-primary">{quantity}</span>
                </div>
                <div className="border-t border-border my-3" />
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold text-primary">{total} DH</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-secondary p-4 text-sm">
                <p className="font-semibold text-primary">Paiement</p>
                <p className="mt-1 text-muted-foreground">
                  {paymentMethod === 'pay_on_delivery' ? 'Paiement à la livraison' : 'Virement CIH'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
