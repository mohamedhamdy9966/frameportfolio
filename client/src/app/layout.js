import { Space_Grotesk } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import Theme from '../styles/theme';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taxidigital.solutions';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Taxi Digital Solutions | Marketing + Software House',
    template: '%s | Taxi Digital Solutions',
  },
  description:
    'Taxi is a digital agency and software house. We build web platforms, mobile apps and custom systems — then grow them with SEO, paid media and CRO.',
  keywords:
    'Taxi, digital agency, software house, web development, mobile apps, SaaS development, SEO, paid ads, branding, performance marketing, Cairo, Egypt',
  authors: [{ name: 'Taxi Digital Solutions' }],
  creator: 'Taxi Digital Solutions',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Taxi Digital Solutions | Marketing + Software House',
    description:
      'One team for the platform and the pipeline: web, mobile and custom software plus the growth engine that feeds it.',
    url: SITE_URL,
    siteName: 'Taxi Digital Solutions',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxi Digital Solutions | Marketing + Software House',
    description:
      'Web, mobile and custom software — built and grown by one team.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
};

/* ── Structured data ──────────────────────────
   Helps search engines read this as a software house / agency with
   real shipped products and a service catalogue. */
const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Taxi Digital Solutions',
  description:
    'Digital agency and software house building web platforms, mobile apps and custom systems, plus the SEO and paid media that grows them.',
  url: SITE_URL,
  foundingDate: '2022',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
  areaServed: ['Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'United Kingdom'],
  address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
  telephone: '+201111255279',
  email: 'info@taxi.com',
  priceRange: 'EGP 25,000+',
  knowsAbout: [
    'Web development',
    'Mobile app development',
    'SaaS platforms',
    'E-commerce',
    'SEO',
    'Performance marketing',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software and marketing services',
    itemListElement: [
      'Web Platforms',
      'Mobile Apps',
      'SaaS & Custom Systems',
      'E-Commerce & Payments',
      'API & Integrations',
      'Cloud, DevOps & QA',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={spaceGrotesk.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          // Schema is static and authored here, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Theme>
            {children}
          </Theme>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
