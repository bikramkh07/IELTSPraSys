import type { Metadata } from 'next';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import { Syne, DM_Sans, Outfit } from 'next/font/google';
import { clerkPublishableKey, hasClerk } from '@/lib/clerk-config';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';
import WebVitalsReporter from '@/components/WebVitalsReporter';
import './globals.css';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IELTSPracSYS — AI-Powered IELTS Band 7+ Academy',
    template: '%s | IELTSPracSYS',
  },
  description:
    'AI-powered IELTS preparation platform. Practice speaking, writing, reading and listening with your personal AI Examiner — available 24/7.',
  openGraph: {
    title: 'IELTSPracSYS — AI-Powered IELTS Band 7+ Academy',
    description: 'Practice speaking, writing, reading and listening with your personal AI Examiner.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IELTSPracSYS Platform Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IELTSPracSYS — AI-Powered IELTS Band 7+ Academy',
    description: 'Practice speaking, writing, reading and listening with your personal AI Examiner.',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: 'AI-powered IELTS preparation platform.',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icons/icon-512.png`,
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'IELTSPracSYS AI Examiner',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

const clerkAppearance = {
  variables: {
    colorPrimary: '#6c63ff',
    colorBackground: '#0d0f16',
    colorText: '#f0f2ff',
    colorInputBackground: '#13161f',
    colorInputText: '#f0f2ff',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
        <link rel="manifest" href="/manifest.json" />
        <Script
          id="global-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        {hasClerk ? (
          <ClerkProvider publishableKey={clerkPublishableKey} appearance={clerkAppearance}>
            <WebVitalsReporter />
            {children}
          </ClerkProvider>
        ) : (
          <>
            <WebVitalsReporter />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
