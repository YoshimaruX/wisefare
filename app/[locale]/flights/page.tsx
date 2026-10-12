import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SearchApp } from "@/components/SearchApp";
import { getAffiliateUrls } from "@/lib/affiliate";
import { pageAlternates } from "@/lib/seo";
import type { Locale } from "@/lib/config";

// トップページと同じ内容のため、正規URLはトップに向ける
export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { alternates: pageAlternates(params.locale, "") };
}

export default function FlightsPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <SearchApp locale={params.locale} kind="flight" affiliateUrls={getAffiliateUrls()} />;
}
