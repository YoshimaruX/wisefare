/**
 * POST /api/webhook
 * Stripe からのイベント通知(決済完了・解約など)を受け取る。
 *
 * セットアップ:
 * 1. `stripe listen --forward-to localhost:3000/api/webhook` でローカルテスト
 * 2. 表示される whsec_xxx を .env.local の STRIPE_WEBHOOK_SECRET に設定
 * 3. 本番は Stripe ダッシュボード > Webhooks でエンドポイントを登録
 *
 * ここでは「どのイベントで何を更新するか」の骨組みのみ用意しています。
 * 実際のユーザー DB(Supabase 等)への保存は TODO 箇所に実装してください。
 */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 503 });
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret);
  } catch (err) {
    console.error("[/api/webhook] signature verification failed:", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      // const session = event.data.object as Stripe.Checkout.Session;
      // TODO: session.customer / session.subscription を見て
      //       該当ユーザーを「プレミアム有効」に更新(Supabase 等)
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      // const sub = event.data.object as Stripe.Subscription;
      // TODO: sub.status (active / canceled / past_due) でユーザー権限を同期
      break;
    }
    default:
      // 未処理イベントは無視
      break;
  }

  return NextResponse.json({ received: true });
}
