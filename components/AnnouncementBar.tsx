'use client'

import { useLang } from '@/components/LanguageProvider'

export function AnnouncementBar() {
  const { lang } = useLang()

  const text =
    lang === 'ar'
      ? 'الدفع عند الاستلام (COD) • تأكيد الطلب فواتساب • توصيل داخل المغرب'
      : lang === 'en'
        ? 'Cash on delivery • WhatsApp confirmation • Delivery in Morocco'
        : 'Paiement à la livraison • Confirmation WhatsApp • Livraison au Maroc'

  return (
    <div className="bg-primary text-primary-foreground text-sm font-semibold py-2 text-center">
      {text}
    </div>
  )
}
