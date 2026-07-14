import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--rd-font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brick Agency",
  description:
    "Brick Agency — разработка цифровых продуктов: веб, дизайн, интеграции.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="bg-rd-bg-default font-sans text-rd-text-default antialiased">
        {children}
      </body>
    </html>
  );
}
