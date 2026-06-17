"use client";

/**
 * アプリ(Capacitor)で動いているかを判定するヘルパー。
 *
 * 【なぜ必要か】
 * App Store / Google Play は「アプリ内でデジタル課金するなら自社決済を使え」
 * というルールがあります。Wisefareはこれを避けるためWeb課金(Stripe)を採用。
 * そこでアプリ版では、プレミアム(課金)への導線を隠す必要があります。
 *
 * 【使い方】
 *   const native = isNativeApp();
 *   if (!native) { ...プレミアムタブやリンクを表示... }
 *
 * Capacitorでアプリ化すると window.Capacitor が注入されるため、
 * その有無で判定します。Web(ブラウザ)では常に false を返します。
 */
export function isNativeApp(): boolean {
  if (typeof window === "undefined") return false;
  // Capacitor が注入するグローバル
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  if (cap?.isNativePlatform) {
    try {
      return cap.isNativePlatform();
    } catch {
      return false;
    }
  }
  // フォールバック: UA に Capacitor 由来の印がある場合
  return /Capacitor/i.test(window.navigator.userAgent || "");
}
