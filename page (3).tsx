import { setRequestLocale } from "next-intl/server";
import { VpnTab } from "@/components/VpnTab";
import { VPNS } from "@/lib/data";
import type { Locale } from "@/lib/config";

export default function VpnPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);

  // 各VPNのアフィリエイトURLを環境変数から読み取り、{id: url} の形にする。
  // 未設定のものは空文字。これをクライアントに渡すことで、
  // 設定済みなら実リンクへ遷移、未設定ならデモ表示、と自動で切り替わる。
  const affiliateUrls: Record<string, string> = {};
  for (const v of VPNS) {
    affiliateUrls[v.id] = process.env[v.affiliateUrlEnv] ?? "";
  }

  return <VpnTab locale={params.locale} affiliateUrls={affiliateUrls} />;
}
