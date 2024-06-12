import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Unsocial',
  description: 'Unsocial: Social Network Simulation with Large Language Models',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className='min-h-dvh scroll-smooth antialiased'>
        {children}
        <Toaster closeButton />
      </body>
    </html>
  );
}
