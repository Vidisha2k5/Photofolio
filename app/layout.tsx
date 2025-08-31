import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/providers/ThemeProvider';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'PhotoFolio - Professional Photography Portfolio',
  description: 'Capturing life\'s beautiful moments through professional photography. Explore my portfolio of portraits, landscapes, weddings, and more.',
  keywords: 'photography, portfolio, photographer, portraits, landscapes, weddings, professional',
  authors: [{ name: 'PhotoFolio' }],
  openGraph: {
    title: 'PhotoFolio - Professional Photography Portfolio',
    description: 'Capturing life\'s beautiful moments through professional photography.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhotoFolio - Professional Photography Portfolio',
    description: 'Capturing life\'s beautiful moments through professional photography.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}