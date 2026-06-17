import { setRequestLocale } from "next-intl/server";
import { SearchApp } from "@/components/SearchApp";
import type { Locale } from "@/lib/config";

export default function HotelsPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <SearchApp locale={params.locale} kind="hotel" />;
}
