import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SearchApp } from "@/components/SearchApp";
import { getAffiliateUrls } from "@/lib/affiliate";
import { pageAlternates } from "@/lib/seo";
import { BRAND, type Locale } from "@/lib/config";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "nav" });
  return {
    title: `${t("hotels")} | ${BRAND.name}`,
    alternates: pageAlternates(params.locale, "/hotels"),
  };
}

export default function HotelsPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <SearchApp locale={params.locale} kind="hotel" affiliateUrls={getAffiliateUrls()} />;
}
