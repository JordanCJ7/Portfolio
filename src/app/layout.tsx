import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { NavigationProvider } from '@/contexts/NavigationContext';
import PerformanceDashboard from '@/components/performance-dashboard';
import LoadingBuffer from '@/components/ui/loading-buffer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
});

export const metadata: Metadata = {
  title: {
    default: 'Janitha Gamage - Developer & Product Strategist',
    template: '%s | Janitha Gamage'
  },
  description: 'A modern portfolio showcasing professional work and skills in AI-driven development, full-stack technologies, and product management.',
  keywords: ['developer', 'product manager', 'AI development', 'full-stack', 'Azure', 'React', 'Next.js'],
  authors: [{ name: 'Janitha Gamage' }],
  creator: 'Janitha Gamage',
  metadataBase: new URL('https://janitha-portfolio.vercel.app'), // Update with your actual domain
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Janitha Gamage - Developer & Product Strategist',
    description: 'A modern portfolio showcasing professional work and skills in AI-driven development.',
    siteName: 'Janitha Gamage Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Janitha Gamage - Developer & Product Strategist',
    description: 'A modern portfolio showcasing professional work and skills in AI-driven development.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased font-sans flex flex-col min-h-screen bg-background text-foreground'
        )}
      >
        <NavigationProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 relative">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <Footer />
          <Toaster />
          <PerformanceDashboard />
          <LoadingBuffer type="bar" />
          <LoadingBuffer type="overlay" />
        </NavigationProvider>
      </body>
    </html>
  );
}
