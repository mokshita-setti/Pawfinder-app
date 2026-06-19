import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: "PawFinder — Your Pet's Digital Safety Tag",
  description: 'Reunite lost pets with their owners through unique QR code tags.',
  manifest: '/manifest.json',
  themeColor: '#8B5CF6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PawFinder',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "PawFinder — Your Pet's Digital Safety Tag",
    description:
      'Register your pet and get a unique QR code tag. If they get lost, anyone who scans it can contact you instantly.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: "PawFinder — Your Pet's Digital Safety Tag",
    description:
      'Register your pet and get a unique QR code tag. If they get lost, anyone who scans it can contact you instantly.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
