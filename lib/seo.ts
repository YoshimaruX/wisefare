import type { Metadata } from "next";
import { LOCALES } from "./config";

/**
 * ページごとの正規URL(canonical)と言語別URL(hreflang)を返す。
 * path は言語コードより後ろの部分(例: "/vpn"。トップページは "")。
 */
export function pageAlternates(locale: string, path: string): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`])),
  };
}
