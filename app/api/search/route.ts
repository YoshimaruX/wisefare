/**
 * POST /api/search
 * 世界スキャンの実行エンドポイント。
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │ 実 API への差し替えポイント                                   │
 * │ いまは generateDemoPrices() でサンプル価格を返しています。    │
 * │ 本番では fetchRealPrices() の中身を実装してください:          │
 * │  - 航空券: Amadeus Flight Offers Search を国(POS)ごとに呼ぶ   │
 * │    https://developers.amadeus.com/                            │
 * │  - ホテル: Amadeus Hotel Search、または Travelpayouts /       │
 * │    Hotellook の各国価格 API                                   │
 * │  返り値を PriceRow[]（{ c, fl, price } の配列）に整形すれば、 │
 * │  以降の rankPrices() がトップ10抽出まで自動で行います。       │
 * └─────────────────────────────────────────────────────────────┘
 */
import { NextRequest, NextResponse } from "next/server";
import { COUNTRIES, CTRY } from "@/lib/data";
import {
  generateDemoPrices,
  rankPrices,
  demoBasePrice,
  type PriceRow,
  type SearchKind,
} from "@/lib/scan";

export const runtime = "edge";

interface SearchBody {
  kind: SearchKind;
  homeCode: string;
  pax?: number;
  nights?: number;
  // 識別子(価格生成のseed & 将来の実API引数)
  fromAirport?: string;
  toAirport?: string;
  dep?: string;
  ret?: string;
  hotelCity?: string;
  hotelName?: string;
  cin?: string;
  cout?: string;
}

/**
 * ★本番実装箇所★
 * 国別の価格配列を返す。現状はデモ生成。実 API 接続時はここを置き換える。
 */
async function fetchRealPrices(body: SearchBody): Promise<PriceRow[]> {
  const useRealApi = process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET;

  if (!useRealApi) {
    // --- デモモード(APIキー未設定時のフォールバック) ---
    const seed =
      body.kind === "flight"
        ? `${body.fromAirport}|${body.toAirport}|${body.dep}|${body.ret}|${body.homeCode}`
        : `${body.hotelCity}|${body.hotelName ?? ""}|${body.cin}|${body.cout}|${body.homeCode}`;
    const mult = body.kind === "flight" ? (body.pax ?? 1) : (body.nights ?? 1);
    const base = demoBasePrice(body.kind, seed, mult);
    return generateDemoPrices(body.kind, seed, base);
  }

  // --- 本番モード(擬似コード) ---
  // const token = await getAmadeusToken();
  // const results = await Promise.all(
  //   COUNTRIES.map(async (co) => {
  //     const price = await queryAmadeus(token, co.c, body); // POS=co.c で検索
  //     return { c: co.c, fl: co.fl, price };
  //   })
  // );
  // return results;
  throw new Error("Real API path not yet implemented");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SearchBody;

    if (!body.kind || !body.homeCode) {
      return NextResponse.json({ error: "kind and homeCode are required" }, { status: 400 });
    }
    if (!CTRY(body.homeCode)) {
      return NextResponse.json({ error: "unknown homeCode" }, { status: 400 });
    }

    const prices = await fetchRealPrices(body);
    const result = rankPrices(body.kind, prices, body.homeCode);

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
    });
  } catch (err) {
    console.error("[/api/search] error:", err);
    return NextResponse.json({ error: "search failed" }, { status: 500 });
  }
}
