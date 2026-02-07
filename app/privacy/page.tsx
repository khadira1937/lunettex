'use client'

import { AnnouncementBar } from '@/components/AnnouncementBar'
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu'
import { Footer } from '@/components/Footer'
import { StickyWhatsApp } from '@/components/StickyWhatsApp'
import { useLang } from '@/components/LanguageProvider'

export default function PrivacyPage() {
  const { lang } = useLang()

  const title =
    lang === 'ar'
      ? 'سياسة الخصوصية'
      : lang === 'en'
        ? 'Privacy Policy'
        : 'Politique de confidentialité'

  return (
    <>
      <AnnouncementBar />
      <HeaderMegaMenu />
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">{title}</h1>
          <p className="mt-3 text-muted-foreground">
            {lang === 'ar'
              ? 'نسخة بسيطة. كنجمعو غير المعلومات اللي محتاجينها باش نوصّلو الطلب.'
              : lang === 'en'
                ? 'Simple version. We only collect the info needed to deliver your order.'
                : 'Version simple. Nous collectons uniquement les infos nécessaires pour livrer votre commande.'}
          </p>

          <div className="mt-10 space-y-6 text-sm text-muted-foreground leading-relaxed">
            {lang === 'ar' ? (
              <>
                <p>
                  <strong>المعلومات اللي كنجمعو:</strong> الاسم، رقم الهاتف، المدينة، عنوان التوصيل (وممكن Pin Google
                  Maps)، ومعلومات تقنية بسيطة (Analytics) ملي يولي الموقع أونلاين.
                </p>
                <p>
                  <strong>علاش كنستعملوها:</strong> تأكيد الطلب، التوصيل، خدمة الزبناء، وتقليل الرفض.
                </p>
                <p>
                  <strong>المشاركة:</strong> غير مع شركة التوصيل باش تكمّل عملية التوصيل.
                </p>
                <p>
                  <strong>التواصل:</strong> تقدر تطلب تعديل/حذف المعلومات ديالك عبر واتساب.
                </p>
              </>
            ) : lang === 'en' ? (
              <>
                <p>
                  <strong>Data we collect:</strong> name, phone number, city, delivery address (and sometimes a Google Maps
                  pin), plus basic technical analytics once the site is live.
                </p>
                <p>
                  <strong>Use:</strong> order confirmation, delivery, customer support, refusal prevention.
                </p>
                <p>
                  <strong>Sharing:</strong> only with the delivery partner to complete delivery.
                </p>
                <p>
                  <strong>Contact:</strong> request deletion or edits via WhatsApp.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Données collectées:</strong> nom, numéro de téléphone, ville, adresse de livraison (et
                  éventuellement un pin Google Maps), ainsi que des informations techniques basiques (analytics) une fois
                  le site en ligne.
                </p>
                <p>
                  <strong>Utilisation:</strong> confirmation de commande, livraison, support client, prévention des refus.
                </p>
                <p>
                  <strong>Partage:</strong> uniquement avec le partenaire de livraison, pour exécuter la livraison.
                </p>
                <p>
                  <strong>Contact:</strong> vous pouvez demander la suppression/modification de vos informations via
                  WhatsApp.
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  )
}
