import type { Lang } from '@/lib/i18n'

export const WHATSAPP_NUMBER_E164 = '212628387299'

export function buildWhatsAppLink(message: string) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${text}`
}

export function buildOrderTemplate(lang: Lang) {
  if (lang === 'ar') {
    return [
      'سلام، بغيت نطلب Ray‑Ban Meta Wayfarer (RW4006) ب 2800 درهم (الدفع عند الاستلام).',
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
    return [
      'Hi! I want to order Ray‑Ban Meta Wayfarer (RW4006) for 2800 MAD (cash on delivery).',
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
  return [
    'Bonjour, je veux commander Ray‑Ban Meta Wayfarer (RW4006) à 2800 DH (paiement à la livraison).',
    '',
    '— Infos de confirmation:',
    'Nom complet: ',
    'Ville: ',
    'Adresse: ',
    'Pin Google Maps (si possible): ',
    'Couleur (optionnel): ',
  ].join('\n')
}
