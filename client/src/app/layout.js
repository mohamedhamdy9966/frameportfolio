import { Space_Grotesk } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import Theme from '../styles/theme';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Taxi Marketing Agency | Portfolio',
  description: 'Accelerating your brand\'s journey with data-driven marketing strategies.',
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
