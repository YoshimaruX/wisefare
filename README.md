# Wisefare 🛫

世界中のストア価格をスキャンして、**最も安い国から予約**できるよう案内する多言語アプリ（日本語 / English / Français / Español）。航空券もホテルも、約47カ国を比較して「最安トップ10」と、VPN代を差し引いた**実質お得額**を提示します。

> このアプリは**価格の比較・提示と外部サイトへの案内のみ**を行い、予約・決済そのものは行いません。これは旅行業登録を不要にし、アプリストア審査・各種規約に適合させるための設計です。

---

## 📁 これは何のフォルダ？

Vercel（無料）にそのままデプロイできる **Next.js 14** の本番コード一式です。プログラミングの知識がなくても、下記の手順どおりに進めればサイトを公開できます。

ファイルの役割（ざっくり）:

| 場所 | 役割 |
|------|------|
| `lib/config.ts` | **アプリ名・価格・対応言語の設定**。名前を変えるならここ1箇所 |
| `lib/data.ts` | 国・空港・ホテル都市・VPNのデータ |
| `messages/*.json` | 4言語すべての画面テキスト（ja/en/fr/es） |
| `components/` | 画面の部品（検索・VPN比較・プレミアム等） |
| `app/` | 各ページとAPI（検索・決済・Webhook） |
| `.env.example` | APIキー等を入れる設定の見本 |

---

## 🚀 公開までの最短手順（デモのまま動かす）

APIキーなしでも、デモ価格で動くサイトとしてすぐ公開できます。

### 1. GitHubにコードを置く
1. [GitHub](https://github.com) で無料アカウントを作成
2. 新しいリポジトリ（例: `wisefare`）を作成
3. このフォルダ一式をアップロード（ドラッグ＆ドロップでも可）

### 2. Vercelでデプロイ
1. [Vercel](https://vercel.com) に GitHub アカウントでログイン
2. 「Add New… → Project」→ さきほどのリポジトリを選択
3. 設定はそのままで「Deploy」を押す
4. 数分待つと `https://wisefare-xxxx.vercel.app` のようなURLで公開されます ✅

これで `/ja` `/en` `/fr` `/es` の4言語サイトが動きます。

### 3. （任意）独自ドメインをつなぐ
1. ドメインを購入（例: お名前.com、Cloudflare、Google Domains などで年1,000〜2,000円程度）
2. Vercel の Project → Settings → Domains にドメインを入力し、表示される案内どおりDNSを設定
3. `lib/config.ts` の `domain` を購入したドメインに変更

---

## 🔧 本番機能を有効化する（あとからでOK）

デモのままでも公開できますが、実際の価格・課金・収益化を有効にするには環境変数を設定します。

### 設定場所
**Vercel** の Project → Settings → **Environment Variables** に、`.env.example` のキーと値を登録します（ローカルで試す場合はファイル名を `.env.local` にコピーして記入）。

### A. プレミアム課金（Stripe）
1. [Stripe](https://dashboard.stripe.com) でアカウント作成
2. 商品「Wisefare Premium」を作り、**4つの料金**を登録:
   - 月額 ¥480 / 年額 ¥3,800（日本向け）
   - 月額 $3 / 年額 $24（海外向け）
3. 各料金の `price_xxxxx` を控え、環境変数に設定:
   - `STRIPE_SECRET_KEY`（`sk_...`）
   - `STRIPE_PRICE_MONTHLY_JPY` / `STRIPE_PRICE_YEARLY_JPY`
   - `STRIPE_PRICE_MONTHLY_USD` / `STRIPE_PRICE_YEARLY_USD`
4. Webhook（解約等の同期）を使う場合は Stripe の Webhooks でエンドポイント
   `https://あなたのドメイン/api/webhook` を登録し、`STRIPE_WEBHOOK_SECRET`（`whsec_...`）を設定

> 💡 設定が未完了の間は、プレミアムのボタンを押すと「準備中」と表示され、課金は発生しません。安全です。

### B. 実際の価格データ（Amadeus）
1. [Amadeus for Developers](https://developers.amadeus.com/) で無料登録
2. `AMADEUS_CLIENT_ID` と `AMADEUS_CLIENT_SECRET` を設定
3. 実装の差し込み口は `app/api/search/route.ts` の `fetchRealPrices()` 内にコメントで明示してあります

> キー未設定の間は自動的にデモ価格で動作します。

### C. アフィリエイト収益（VPN・旅行）
各VPNのパートナープログラムに登録し、付与されたリンクを `AFF_SURFSHARK` などの環境変数に設定します。リンクは `lib/data.ts` の各VPNの `affiliateUrlEnv` と対応しています。

---

## ✏️ アプリ名を変える

`lib/config.ts` を開き、`BRAND` の `name` を書き換えるだけで、ロゴ・タイトル・メタデータすべてに反映されます。

```ts
export const BRAND = {
  name: "Wisefare",   // ← ここを変える
  domain: "wisefare.app",
  email: "support@wisefare.app",
  ...
};
```

---

## 💻 ローカルで動かす（開発者向け・任意）

```bash
npm install
cp .env.example .env.local   # 必要に応じて値を記入
npm run dev                  # http://localhost:3000
```

ビルド確認:
```bash
npm run build
```

---

## 🗺️ 今後のロードマップ

- **フェーズ1**: Vercelに公開（デモ価格） ← まずここ
- **フェーズ2**: Amadeus等で実価格に接続
- **フェーズ3**: Stripeで課金を本番化
- **フェーズ4**: Capacitor等でアプリ化し、App Store / Google Playへ

---

## ⚖️ 注意

- 公開前に `app/[locale]/legal/terms`（特定商取引法に基づく表記）の括弧部分を、運営者ご自身の情報に置き換えてください。
- 価格・割引は各社の状況で変動します。VPN料金表（`lib/data.ts`）は定期的に見直してください。

---

技術スタック: Next.js 14 (App Router) / next-intl / Tailwind CSS / Stripe
