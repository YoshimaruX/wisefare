/**
 * Wisefare — world scan core
 * 全対応国の価格を比較し「最安トップ10」を返す純粋ロジック。
 * 本番では generateDemoPrices() を実 API 呼び出しに差し替えます
 * (差し替え方法は app/api/search/route.ts のコメント参照)。
 */
import { COUNTRIES, CTRY, VPNS, type Vpn } from "./data";

export type SearchKind = "flight" | "hotel";

export interface PriceRow {
  c: string;   // 国コード
  fl: string;  // 国旗
  price: number; // 価格(円ベース、表示時に通貨換算)
}

export interface ScanResult {
  kind: SearchKind;
  top10: PriceRow[];
  home: number;          // 基準国(ユーザーの国)の価格
  homeCode: string;
  best: PriceRow;        // 最安国
  vpnSingle: Vpn;        // 単月最安VPN
  vpnLong: Vpn;          // 長期最安VPN
  diff: number;          // home - best
  net: number;           // diff - VPN単月代
  scannedCount: number;  // スキャンした国数
  homeInTop: boolean;    // 自国がトップ10に入っているか
}

const hashStr = (s: string) => {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};
const rand01 = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

/**
 * デモ用：全国の価格を擬似生成。
 * basePrice は「米国価格相当」、各国の係数で増減させ、わずかな揺らぎを加える。
 * ★本番ではこの関数を使わず、実 API から得た国別価格配列を使ってください。
 */
export function generateDemoPrices(kind: SearchKind, seedStr: string, basePrice: number): PriceRow[] {
  const seed = hashStr(seedStr);
  return COUNTRIES.map((co, i) => {
    const jitter = (rand01(seed + i * 17) - 0.5) * 0.06;
    const coef = kind === "flight" ? co.pf : co.ph;
    const mult = Math.max(0.65, coef + jitter);
    return { c: co.c, fl: co.fl, price: Math.round((basePrice * mult) / 100) * 100 };
  });
}

/**
 * 国別価格配列を受け取り、基準国で正規化してトップ10を抽出。
 * prices は generateDemoPrices() か、本番の実 API 由来のどちらでもよい。
 */
export function rankPrices(kind: SearchKind, prices: PriceRow[], homeCode: string): ScanResult {
  const homeC = CTRY(homeCode);
  const homeCoef = kind === "flight" ? homeC.pf : homeC.ph;

  // 基準国=1.0 になるよう正規化(実APIの場合は既に実額なので正規化不要だが、
  // デモ価格は米国基準のため自国視点に揃える)
  const normalized = prices.map((p) => {
    const co = CTRY(p.c);
    const coef = kind === "flight" ? co.pf : co.ph;
    const factor = homeCoef ? coef / homeCoef : 1;
    // デモ価格は coef を含むので、自国基準へ変換
    const base = p.price / coef; // 米国基準額に戻す
    return { ...p, price: Math.round((base * factor) / 100) * 100 };
  });

  const home = normalized.find((r) => r.c === homeCode)!.price;
  const sorted = [...normalized].sort((a, b) => a.price - b.price);
  const top10 = sorted.slice(0, 10);
  const best = top10[0];

  const vpnSingle = [...VPNS].sort((a, b) => a.single - b.single)[0];
  const vpnLong = [...VPNS].sort((a, b) => a.long - b.long)[0];
  const diff = home - best.price;

  return {
    kind,
    top10,
    home,
    homeCode,
    best,
    vpnSingle,
    vpnLong,
    diff,
    net: diff - vpnSingle.single,
    scannedCount: prices.length,
    homeInTop: top10.some((r) => r.c === homeCode),
  };
}

/** デモ用：seed から基準価格を作る(路線/ホテルごとに安定した値) */
export function demoBasePrice(kind: SearchKind, seedStr: string, multiplier: number): number {
  if (kind === "flight") {
    return (80000 + (hashStr(seedStr) % 170) * 1000) * multiplier;
  }
  return (9000 + (hashStr(seedStr) % 70) * 500) * multiplier;
}
