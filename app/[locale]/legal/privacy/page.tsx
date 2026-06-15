import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/config";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "legal" });
  return { title: t("privacyTitle") };
}

export default async function PrivacyPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "legal" });
  const common = await getTranslations({ locale: params.locale, namespace: "common" });
  const sections = t.raw("privacySections") as { h: string; b: string }[];

  return (
    <main className="max-w-3xl mx-auto px-4 pb-20 pt-10">
      <Link href={`/${params.locale}`} className="inline-flex items-center gap-1 text-sm mb-6" style={{ color: "#97A3BC" }}>
        <ArrowLeft size={14} /> {common("backHome")}
      </Link>
      <h1 className="font-display" style={{ fontSize: "clamp(22px,4vw,32px)", color: "#E9EEF8" }}>{t("privacyTitle")}</h1>
      <p className="text-xs mt-2" style={{ color: "#6B7790" }}>{t("privacyUpdated")}</p>
      <p className="text-sm mt-5" style={{ color: "#97A3BC", lineHeight: 1.8 }}>{t("privacyIntro")}</p>

      <div className="mt-8 space-y-6">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-bold text-base" style={{ color: "#E9EEF8" }}>{s.h}</h2>
            <p className="text-sm mt-2" style={{ color: "#97A3BC", lineHeight: 1.8 }}>{s.b}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
