import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/config";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "legal" });
  return { title: t("termsTitle") };
}

export default async function TermsPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "legal" });
  const common = await getTranslations({ locale: params.locale, namespace: "common" });
  const rows = t.raw("termsRows") as { k: string; v: string }[];

  return (
    <main className="max-w-3xl mx-auto px-4 pb-20 pt-10">
      <Link href={`/${params.locale}`} className="inline-flex items-center gap-1 text-sm mb-6" style={{ color: "#97A3BC" }}>
        <ArrowLeft size={14} /> {common("backHome")}
      </Link>
      <h1 className="font-display" style={{ fontSize: "clamp(22px,4vw,32px)", color: "#E9EEF8" }}>{t("termsTitle")}</h1>
      <p className="text-sm mt-5" style={{ color: "#97A3BC", lineHeight: 1.8 }}>{t("termsIntro")}</p>

      <div className="wf-card mt-7 overflow-hidden">
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
                <th className="text-left align-top p-4" style={{ color: "#E9EEF8", width: "38%", fontWeight: 700, background: "rgba(255,255,255,.02)" }}>{r.k}</th>
                <td className="p-4" style={{ color: "#97A3BC", lineHeight: 1.7 }}>{r.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs mt-5" style={{ color: "#6B7790", lineHeight: 1.7 }}>{t("termsNote")}</p>
    </main>
  );
}
