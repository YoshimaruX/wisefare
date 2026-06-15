import { setRequestLocale } from "next-intl/server";
import { VpnTab } from "@/components/VpnTab";
import type { Locale } from "@/lib/config";

export default function VpnPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <VpnTab locale={params.locale} />;
}
