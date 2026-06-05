import { Space_Grotesk } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import Theme from '../styles/theme';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: 'Taxi Marketing Agency | Performance-Driven Growth',
  description:
    'Taxi is a data-driven marketing agency that accelerates your brand\'s growth through paid media, SEO, content, and conversion optimisation.',
  keywords: 'Taxi, marketing agency, digital strategy, SEO, paid ads, branding, performance marketing',
  openGraph: {
    title: 'Taxi Marketing Agency',
    description: 'Accelerate your brand\'s growth with data-driven marketing.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={spaceGrotesk.className}>
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
