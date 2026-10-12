import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PremiumTab } from "@/components/PremiumTab";
import { pageAlternates } from "@/lib/seo";
import { BRAND, type Locale } from "@/lib/config";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "nav" });
  return {
    title: `${t("premium")} | ${BRAND.name}`,
    alternates: pageAlternates(params.locale, "/premium"),
  };
}

export default function PremiumPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <PremiumTab locale={params.locale} />;
}
