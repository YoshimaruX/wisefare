import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  // ロケール未確定の場合があるためデフォルトenでフォールバック
  let backHome = "Back to home";
  try {
    const common = await getTranslations("common");
    backHome = common("backHome");
  } catch {}
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="font-display" style={{ fontSize: 64, color: "#F2A93B", lineHeight: 1 }}>404</p>
      <p className="text-sm mt-4" style={{ color: "#97A3BC" }}>Page not found</p>
      <Link href="/" className="wf-btn-ghost mt-6 inline-flex">{backHome}</Link>
    </main>
  );
}
