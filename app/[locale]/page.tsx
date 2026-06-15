import { setRequestLocale } from "next-intl/server";
import { SearchApp } from "@/components/SearchApp";
import type { Locale } from "@/lib/config";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <SearchApp locale={params.locale} kind="flight" />;
}
