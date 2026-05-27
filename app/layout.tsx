import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Toaster } from 'sonner';
import VisitTracker from '@/components/VisitTracker';

export const metadata: Metadata = {
  title: 'Sharon Tailors - Custom Tailoring & E-Commerce',
  description: 'Modern tailoring and fashion e-commerce shop. Custom style, perfect fit.',
  keywords: ['Sharon', 'Sharon Tailors', 'Tailoring', 'Custom Tailoring', 'Dressmaking', 'Boutique', 'Kampala'],
  openGraph: {
    title: 'Sharon Tailors',
    description: 'Custom Style, Perfect Fit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharon Tailors',
    description: 'Custom Style, Perfect Fit',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Providers>
          {children}
          <VisitTracker />
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
