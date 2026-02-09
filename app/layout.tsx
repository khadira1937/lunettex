import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Inter, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { DEFAULT_LANG, getDir, isLang, type Lang } from '@/lib/i18n'
import { LanguageProvider } from '@/components/LanguageProvider'
import Script from 'next/script'

const _inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const _fraunces = Fraunces({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'LunetteX — Ray‑Ban Meta Wayfarer (RW4006) au Maroc',
  description:
    'LunetteX: Ray‑Ban Meta Wayfarer (RW4006) au Maroc. Commande sur WhatsApp + paiement à la livraison.',
  generator: 'openclaw',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieLang = (await cookies()).get('lang')?.value
  const lang: Lang = isLang(cookieLang) ? cookieLang : DEFAULT_LANG
  const dir = getDir(lang)

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-MHTZHRM9L6'
  // Meta Pixel (fallback to the verified Pixel ID if env var is not set)
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1593556348555100'

  return (
    <html lang={lang} dir={dir} className={`${_inter.variable} ${_fraunces.variable}`}>
      <head>
        {gaId ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date());
  gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {metaPixelId ? (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${metaPixelId}');
  fbq('track', 'PageView');
`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        ) : null}

        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
