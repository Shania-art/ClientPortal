
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/hooks/use-cart';

export const metadata: Metadata = {
  title: 'ALPHA CLIENT PORTAL',
  description: 'Manage your loan applications with ease.',
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#F0F4F8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/logo.png" sizes="215x154" />
        <link rel="apple-touch-icon" href="/alpha.png" sizes="200x165"></link>
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
