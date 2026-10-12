import { VPNS } from "./data";

/**
 * 各VPNのアフィリエイトURLを環境変数から読み取り、{id: url} の形で返す(サーバー側専用)。
 * 未設定のものは空文字。ページからクライアント部品に渡して使います。
 */
export function getAffiliateUrls(): Record<string, string> {
  const urls: Record<string, string> = {};
  for (const v of VPNS) {
    urls[v.id] = process.env[v.affiliateUrlEnv] ?? "";
  }
  return urls;
}
