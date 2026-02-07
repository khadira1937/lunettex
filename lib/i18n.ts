export type Lang = 'fr' | 'ar' | 'en'

export const LANGS: Lang[] = ['fr', 'ar', 'en']
export const DEFAULT_LANG: Lang = 'fr'

export function isLang(v: string | undefined | null): v is Lang {
  return v === 'fr' || v === 'ar' || v === 'en'
}

export function getDir(lang: Lang) {
  return lang === 'ar' ? 'rtl' : 'ltr'
}

type Dict = Record<string, string>

const fr: Dict = {
  brand: 'LunetteX',
  productName: 'Ray‑Ban Meta Wayfarer (RW4006)',
  price: '2800 DH',
  cod: 'Paiement à la livraison (COD)',
  deliveryFast: 'Livraison rapide au Maroc',
  whatsappCta: 'Commander sur WhatsApp',
  heroTitle: 'Des lunettes iconiques, avec une touche smart.',
  heroSubtitle: "Caméra mains libres + audio open‑ear. On confirme votre commande sur WhatsApp — paiement à la livraison.",
  trust1Title: 'COD & confirmation WhatsApp',
  trust1Body: 'On confirme votre ville, adresse et délai avant l’envoi.',
  trust2Title: 'Retour/échange',
  trust2Body: 'Politique claire (voir la page Retours & Échanges).',
  trust3Title: 'Transparence fonctionnalités',
  trust3Body: "Certaines fonctions (Meta AI/app) peuvent dépendre du pays. On n’en rajoute pas.",
  sectionWhatsInBox: "Dans la boîte",
  sectionFaq: 'FAQ',
  sectionDeliveryReturns: 'Livraison & Retours',
  contact: 'Contact',
  supportHours: 'Support WhatsApp',
  supportHoursValue: '10:00–22:00 (tous les jours)',
  footerRights: 'Tous droits réservés.',
  disclaimerTitle: 'Note importante',
  disclaimerBody:
    "Les fonctions ‘Meta AI’/commande vocale/logiciel dépendent de l’application Meta et de la configuration du téléphone. Nous vous aidons pour le setup, mais on ne promet pas une disponibilité totale selon le pays.",
}

const ar: Dict = {
  brand: 'LunetteX',
  productName: 'Ray‑Ban Meta Wayfarer (RW4006)',
  price: '2800 درهم',
  cod: 'الدفع عند الاستلام',
  deliveryFast: 'توصيل سريع داخل المغرب',
  whatsappCta: 'طلب عبر واتساب',
  heroTitle: 'نظارات شكلها فاخر… وزادت عليها التكنولوجيا.',
  heroSubtitle: 'كاميرا بلا يدين + صوت Open‑Ear. كنأكدو الطلب فواتساب — والدفع عند الاستلام.',
  trust1Title: 'تأكيد الطلب فواتساب',
  trust1Body: 'كنأكدو المدينة والعنوان ومدة التوصيل قبل الإرسال.',
  trust2Title: 'الاستبدال/الإرجاع',
  trust2Body: 'سياسة واضحة وبسيطة (شوف صفحة الإرجاع).',
  trust3Title: 'بدون مبالغة',
  trust3Body: 'بعض المزايا كتبدل حسب الدولة/التطبيق. كنكونو واضحين معاك.',
  sectionWhatsInBox: 'شنو كاين فالعُلبة',
  sectionFaq: 'أسئلة شائعة',
  sectionDeliveryReturns: 'التوصيل والإرجاع',
  contact: 'تواصل معنا',
  supportHours: 'دعم واتساب',
  supportHoursValue: '10:00–22:00 (كل نهار)',
  footerRights: 'جميع الحقوق محفوظة.',
  disclaimerTitle: 'ملاحظة مهمة',
  disclaimerBody:
    'مزايا Meta AI/الأوامر الصوتية/البرامج كتعتمد على تطبيق Meta وإعدادات الهاتف. نعاونك فالتثبيت، ولكن ما كنضمنوش نفس التوفر فكل الدول.',
}

const en: Dict = {
  brand: 'LunetteX',
  productName: 'Ray‑Ban Meta Wayfarer (RW4006)',
  price: '2800 MAD',
  cod: 'Cash on delivery',
  deliveryFast: 'Fast delivery in Morocco',
  whatsappCta: 'Order on WhatsApp',
  heroTitle: 'Iconic glasses, now with smart features.',
  heroSubtitle: 'Hands‑free camera + open‑ear audio. We confirm on WhatsApp — pay on delivery.',
  trust1Title: 'COD + WhatsApp confirmation',
  trust1Body: 'We confirm city, address and ETA before shipping.',
  trust2Title: 'Returns/exchange',
  trust2Body: 'Clear policy (see Returns & Exchange page).',
  trust3Title: 'No overpromises',
  trust3Body: 'Some Meta app/AI features depend on country availability.',
  sectionWhatsInBox: "What’s in the box",
  sectionFaq: 'FAQ',
  sectionDeliveryReturns: 'Delivery & Returns',
  contact: 'Contact',
  supportHours: 'WhatsApp support',
  supportHoursValue: '10:00–22:00 (daily)',
  footerRights: 'All rights reserved.',
  disclaimerTitle: 'Important note',
  disclaimerBody:
    'Meta AI/voice/software features depend on the Meta app and your phone settings. We help with setup but can’t promise full availability in every country.',
}

export const DICTS: Record<Lang, Dict> = { fr, ar, en }

export function t(lang: Lang, key: keyof typeof fr): string {
  const dict = DICTS[lang] ?? DICTS[DEFAULT_LANG]
  return dict[key] ?? DICTS[DEFAULT_LANG][key] ?? String(key)
}
