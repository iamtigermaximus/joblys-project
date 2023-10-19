import StyledComponentsRegistry from '@/lib/registry';
// import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import { NextAuthProvider } from '../providers/sessionProviders';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400'],
  subsets: ['latin'],
});

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
      <body className={roboto.className}>
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
