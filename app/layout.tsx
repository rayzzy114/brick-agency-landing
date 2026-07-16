import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--rd-font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rayzzy114.github.io/brick-agency-landing/"),
  title: "Brick Agency",
  description:
    "Brick Agency — разработка цифровых продуктов: веб, дизайн, интеграции.",
  // GH Pages — стейджинг: не индексировать, пока лендинг не переехал на боевой
  // домен клиента (тексты-рыбы не должны попасть в выдачу под брендом)
  robots: { index: false, follow: false },
  openGraph: {
    title: "Brick Agency",
    description:
      "Brick Agency — разработка цифровых продуктов: веб, дизайн, интеграции.",
    locale: "ru_RU",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brick Agency",
    description:
      "Brick Agency — разработка цифровых продуктов: веб, дизайн, интеграции.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="bg-rd-bg-default font-sans text-rd-text-default antialiased">
        {/* без JS Reveal-обёртки оставались с SSR-инлайном opacity:0 — контент невидим */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
