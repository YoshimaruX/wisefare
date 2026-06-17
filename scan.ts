/**
 * POST /api/checkout
 * Stripe Checkout セッションを作成し、決済ページの URL を返す。
 *
 * セットアップ手順:
 * 1. Stripe ダッシュボードで Product「Wisefare Premium」を作成
 * 2. Price を4つ作成(月額JPY/月額USD/年額JPY/年額USD)し、各 price_xxx を控える
 * 3. .env.local に以下を設定:
 *    STRIPE_SECRET_KEY=sk_test_xxx
 *    STRIPE_PRICE_MONTHLY_JPY=price_xxx
 *    STRIPE_PRICE_MONTHLY_USD=price_xxx
 *    STRIPE_PRICE_YEARLY_JPY=price_xxx
 *    STRIPE_PRICE_YEARLY_USD=price_xxx
 *    NEXT_PUBLIC_SITE_URL=https://wisefare.app
 */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

interface CheckoutBody {
  plan: "monthly" | "yearly";
  currency: "jpy" | "usd";
  locale: string;
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  try {
    const { plan, currency, locale } = (await req.json()) as CheckoutBody;

    // 通貨×プランに対応する Price ID を環境変数から取得
    const envKey = `STRIPE_PRICE_${plan.toUpperCase()}_${currency.toUpperCase()}`;
    const priceId = process.env[envKey];
    if (!priceId) {
      return NextResponse.json(
        { error: `Missing price configuration (${envKey}).` },
        { status: 503 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/${locale}?checkout=success`,
      cancel_url: `${siteUrl}/${locale}?checkout=cancelled`,
      allow_promotion_codes: true,
      // 7日間の無料トライアルを付ける場合:
      // subscription_data: { trial_period_days: 7 },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[/api/checkout] error:", err);
    return NextResponse.json({ error: "checkout failed" }, { status: 500 });
  }
}
