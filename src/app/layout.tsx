import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unsocial',
  description: 'Unsocial: AI Social Graph',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${GeistSans.variable} ${GeistMono.variable} min-h-dvh`}>
        {children}
      </body>
    </html>
  );
}
