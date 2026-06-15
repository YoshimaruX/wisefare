import { CURRENCY, type Locale } from "./config";

/** 円ベースの数値を、ロケールの表示通貨に換算してフォーマット */
export function makeFormatter(locale: Locale) {
  const { code, intlLocale, rate } = CURRENCY[locale];
  const nf = new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  });
  return (yenValue: number) => nf.format(yenValue / rate);
}

/** ロケールに対応する課金通貨(JPYのみ jpy、他は usd) */
export function billingCurrency(locale: Locale): "jpy" | "usd" {
  return locale === "ja" ? "jpy" : "usd";
}
