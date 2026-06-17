import { setRequestLocale } from "next-intl/server";
import { PremiumTab } from "@/components/PremiumTab";
import type { Locale } from "@/lib/config";

export default function PremiumPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <PremiumTab locale={params.locale} />;
}
