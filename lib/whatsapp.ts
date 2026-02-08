import type { Lang } from '@/lib/i18n'

export const WHATSAPP_NUMBER_E164 = '212628387299'

export function buildWhatsAppLink(message: string) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${text}`
}

type OrderProduct = {
  name: string
  price: number
  currencyLabel?: string // e.g. "MAD" | "DH" | "درهم"
}

function formatPriceFrMA(price: number) {
  return price.toLocaleString('fr-MA')
}

export function buildOrderTemplate(lang: Lang, product?: OrderProduct) {
  const name = product?.name || 'Ray‑Ban Meta Wayfarer (RW4006)'
  const price = product?.price

  if (lang === 'ar') {
    const currency = product?.currencyLabel || 'درهم'
    return [
      price
        ? `سلام، بغيت نطلب ${name} ب ${formatPriceFrMA(price)} ${currency} (الدفع عند الاستلام).`
        : `سلام، بغيت نطلب ${name} (الدفع عند الاستلام).`,
      '',
      '— معلومات التأكيد:',
      'الاسم الكامل: ',
      'المدينة: ',
      'العنوان: ',
      'Pin Google Maps (إلا أمكن): ',
      'اللون (إلا بغيتي): ',
    ].join('\n')
  }

  if (lang === 'en') {
    const currency = product?.currencyLabel || 'MAD'
    return [
      price
        ? `Hi! I want to order ${name} for ${formatPriceFrMA(price)} ${currency} (cash on delivery).`
        : `Hi! I want to order ${name} (cash on delivery).`,
      '',
      '— Confirmation details:',
      'Full name: ',
      'City: ',
      'Address: ',
      'Google Maps pin (if possible): ',
      'Color (optional): ',
    ].join('\n')
  }

  // fr
  const currency = product?.currencyLabel || 'DH'
  return [
    price
      ? `Bonjour, je veux commander ${name} à ${formatPriceFrMA(price)} ${currency} (paiement à la livraison).`
      : `Bonjour, je veux commander ${name} (paiement à la livraison).`,
    '',
    '— Infos de confirmation:',
    'Nom complet: ',
    'Ville: ',
    'Adresse: ',
    'Pin Google Maps (si possible): ',
    'Couleur (optionnel): ',
  ].join('\n')
}
