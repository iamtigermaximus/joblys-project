import StyledComponentsRegistry from '@/lib/registry';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar/Navbar';
import { Roboto } from 'next/font/google';
import FormHeader from '@/components/common/form-header/FormHeader';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { NextAuthProvider } from '../providers/sessionProviders';

const roboto = Roboto({
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'eazyCV',
  description: 'Generated by create next app',
};

export default async function AuthLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <div lang={locale}>
      <div className={roboto.className}>
        <NextIntlClientProvider messages={messages}>
          <NextAuthProvider>
            <StyledComponentsRegistry>
              <FormHeader locale={locale} />
              {children}
            </StyledComponentsRegistry>
          </NextAuthProvider>
        </NextIntlClientProvider>
      </div>
    </div>
  );
}