import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 外部Googleフォントは<link>で読むため、自動フォント最適化を無効化
  optimizeFonts: false,
};

export default withNextIntl(nextConfig);
