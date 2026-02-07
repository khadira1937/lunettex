'use client'

import Link from 'next/link'
import { useLang } from '@/components/LanguageProvider'
import { t } from '@/lib/i18n'

export function Footer() {
  const { lang } = useLang()

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-3">{t(lang, 'brand')}</h3>
            <p className="text-primary-foreground/75 text-sm leading-relaxed">
              {lang === 'ar'
                ? 'متجر محلي فالمغرب لمنتجات النظارات الذكية. كنخدمو بالوضوح والثقة.'
                : lang === 'en'
                  ? 'A Morocco-focused store for smart eyewear. Built on clarity and trust.'
                  : 'Boutique au Maroc pour lunettes smart. Transparence et confiance.'}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              {lang === 'ar' ? 'الدعم' : lang === 'en' ? 'Support' : 'Support'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-primary-foreground/75 hover:text-primary-foreground transition-colors text-sm">
                  {t(lang, 'sectionFaq')}
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery-returns"
                  className="text-primary-foreground/75 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t(lang, 'sectionDeliveryReturns')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/75 hover:text-primary-foreground transition-colors text-sm">
                  {t(lang, 'contact')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary-foreground/75 hover:text-primary-foreground transition-colors text-sm">
                  {lang === 'ar' ? 'سياسة الخصوصية' : lang === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t(lang, 'supportHours')}</h4>
            <p className="text-primary-foreground/75 text-sm">{t(lang, 'supportHoursValue')}</p>
            <p className="text-primary-foreground/60 text-xs mt-3 leading-relaxed">
              {lang === 'ar'
                ? 'ملاحظة: بعض مزايا Meta/app كتختلف حسب الدولة. كنكونو واضحين قبل البيع.'
                : lang === 'en'
                  ? 'Note: Some Meta app/AI features vary by country. We keep it transparent before you order.'
                  : 'Note: certaines fonctions Meta/app/AI varient selon le pays. On reste transparents avant commande.'}
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-7 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} {t(lang, 'brand')}. {t(lang, 'footerRights')}
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
            >
              {lang === 'ar' ? 'الخصوصية' : lang === 'en' ? 'Privacy' : 'Confidentialité'}
            </Link>
            <Link
              href="/delivery-returns"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
            >
              {lang === 'ar' ? 'التوصيل/الإرجاع' : lang === 'en' ? 'Delivery/Returns' : 'Livraison/Retours'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
