import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { VpnTab } from "@/components/VpnTab";
import { getAffiliateUrls } from "@/lib/affiliate";
import { pageAlternates } from "@/lib/seo";
import { BRAND, type Locale } from "@/lib/config";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "nav" });
  return {
    title: `${t("vpn")} | ${BRAND.name}`,
    alternates: pageAlternates(params.locale, "/vpn"),
  };
}

export default function VpnPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <VpnTab locale={params.locale} affiliateUrls={getAffiliateUrls()} />;
}
