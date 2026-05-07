import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import LocaleSwitcher from "@/components/locale-switcher";
import { getUserLocale } from "@/i18n/locale";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getUserLocale();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div><LocaleSwitcher/></div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}