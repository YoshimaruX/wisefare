import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HowTab } from "@/components/HowTab";
import { pageAlternates } from "@/lib/seo";
import { BRAND, type Locale } from "@/lib/config";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "nav" });
  return {
    title: `${t("how")} | ${BRAND.name}`,
    alternates: pageAlternates(params.locale, "/how"),
  };
}

export default function HowPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <HowTab />;
}
