import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BRAND, type Locale } from "@/lib/config";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-5xl mx-auto px-4 pb-10 pt-8">
      <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 16 }}>
        <p className="text-xs" style={{ color: "#5A6680" }}>{t("disclaimer")}</p>
        <div className="flex items-center gap-4 mt-4 flex-wrap text-xs">
          <Link href={`/${locale}/legal/privacy`} style={{ color: "#97A3BC" }}>{t("privacy")}</Link>
          <Link href={`/${locale}/legal/terms`} style={{ color: "#97A3BC" }}>{t("terms")}</Link>
          <a href={`mailto:${BRAND.email}`} style={{ color: "#97A3BC" }}>{t("contact")}</a>
          <span style={{ color: "#3C485E", marginLeft: "auto" }}>© {year} {BRAND.name}. {t("rights")}</span>
        </div>
      </div>
    </footer>
  );
}
