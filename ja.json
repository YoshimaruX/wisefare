import type { ReactNode } from "react";
import "./globals.css";

/**
 * フォントは next/font/google ではなく標準の <link> で読み込みます。
 * これによりビルド時に Google Fonts へアクセスする必要がなくなり、
 * どの環境でも安定してビルドできます(表示は同一)。
 * - 表示用: Shippori Mincho(明朝)
 * - 本文用: Zen Kaku Gothic New
 * - 数字用: Space Grotesk
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
