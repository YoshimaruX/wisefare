import { setRequestLocale } from "next-intl/server";
import { HowTab } from "@/components/HowTab";
import type { Locale } from "@/lib/config";

export default function HowPage({ params }: { params: { locale: Locale } }) {
  setRequestLocale(params.locale);
  return <HowTab />;
}
