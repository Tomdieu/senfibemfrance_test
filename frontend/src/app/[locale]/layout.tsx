import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { I18nProviderClient } from "@/locales/client";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import SearchModal from "@/components/modals/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FIBEM - Services Professionnels & Recrutement",
  description:
    "Plateforme de mise en relation professionnelle, recrutement et services aux entreprises - France & Sénégal",
};

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={inter.className}
        suppressContentEditableWarning
        suppressHydrationWarning
      >
        <SessionProvider>
          <I18nProviderClient locale={locale}>
            <ReactQueryProvider>
              {children}
              <SearchModal />
            </ReactQueryProvider>
          </I18nProviderClient>
        </SessionProvider>
      </body>
    </html>
  );
}
