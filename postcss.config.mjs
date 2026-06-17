/**
 * Wisefare — central configuration
 * ------------------------------------------------------------------
 * アプリ名やブランド情報はこの 1 ファイルで一元管理しています。
 * 別名(SmartFare / Savvytrip など)に変えたい場合は BRAND を書き換えるだけで
 * サイト全体・メタデータ・フッターに反映されます。
 */

export const BRAND = {
  /** 表示名。ここを変えると全ページのロゴ・タイトルが変わります */
  name: "Wisefare",
  /** ドメイン(本番のものに差し替え) */
  domain: "wisefare.app",
  /** 連絡先メール(特商法表記・問い合わせ用) */
  email: "support@wisefare.app",
  /** タグライン(言語別の訳は messages/*.json 側で管理) */
  taglineKey: "tagline",
} as const;

/** 対応言語。URL は /ja /en /fr /es になります */
export const LOCALES = ["ja", "en", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** 言語ごとの表示通貨と概算レート(本番は為替APIで動的取得を推奨) */
export const CURRENCY: Record<Locale, { code: string; intlLocale: string; rate: number }> = {
  ja: { code: "JPY", intlLocale: "ja-JP", rate: 1 },
  en: { code: "USD", intlLocale: "en-US", rate: 150 },
  fr: { code: "EUR", intlLocale: "fr-FR", rate: 163 },
  es: { code: "EUR", intlLocale: "es-ES", rate: 163 },
};

/**
 * プレミアム課金の価格(Stripe Price ID は .env で管理)
 * - 日本(JPY)は月額480円 / 年額3,800円
 * - その他(USD)は月額$3 / 年額$24
 * 実際の金額は Stripe ダッシュボードで作成した Price に紐づきます。
 */
export const PRICING = {
  monthly: {
    jpy: { amount: 480, label: "¥480" },
    usd: { amount: 3, label: "$3" },
    stripePriceEnv: {
      jpy: "STRIPE_PRICE_MONTHLY_JPY",
      usd: "STRIPE_PRICE_MONTHLY_USD",
    },
  },
  yearly: {
    jpy: { amount: 3800, label: "¥3,800" },
    usd: { amount: 24, label: "$24" },
    stripePriceEnv: {
      jpy: "STRIPE_PRICE_YEARLY_JPY",
      usd: "STRIPE_PRICE_YEARLY_USD",
    },
  },
} as const;

/** プレミアム機能の一覧(訴求用。文言は messages 側) */
export const PREMIUM_FEATURE_KEYS = ["priceAlerts", "autoScan", "priceHistory", "noAds"] as const;
