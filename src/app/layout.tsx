import StyledComponentsRegistry from '@/lib/registry';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import { NextAuthProvider } from './providers/sessionProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JOBLYS',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <StyledComponentsRegistry>
            <Navbar />
            {children}
          </StyledComponentsRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}
