"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Plane, ShieldCheck, Info, BedDouble, Languages, Sparkles } from "lucide-react";
import { LOCALES, BRAND, type Locale } from "@/lib/config";

const LANG_LABEL: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  fr: "Français",
  es: "Español",
};

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  // 現在のパスからロケール部分を除いた残り(言語切替時に同じページを維持)
  const rest = pathname.replace(new RegExp(`^/(${LOCALES.join("|")})`), "") || "";

  const switchLang = (next: string) => {
    router.push(`/${next}${rest}`);
  };

  const nav = [
    { href: `/${locale}/flights`, label: t("nav.flights"), icon: <Plane size={14} /> },
    { href: `/${locale}/hotels`, label: t("nav.hotels"), icon: <BedDouble size={14} /> },
    { href: `/${locale}/vpn`, label: t("nav.vpn"), icon: <ShieldCheck size={14} /> },
    { href: `/${locale}/how`, label: t("nav.how"), icon: <Info size={14} /> },
    { href: `/${locale}/premium`, label: t("nav.premium"), icon: <Sparkles size={14} /> },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <div className="wf-banner">{t("banner")}</div>
      <header className="max-w-5xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between flex-wrap gap-3">
        <Link href={`/${locale}`} className="flex items-center gap-3 no-underline">
          <div
            style={{
              width: 40, height: 40, borderRadius: 13,
              background: "linear-gradient(135deg,#F6BC5C,#E98F36)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Plane size={20} style={{ color: "#241303", transform: "rotate(-20deg)" }} />
          </div>
          <div>
            <p className="font-display text-xl" style={{ lineHeight: 1, color: "#E9EEF8" }}>
              {BRAND.name} <span className="text-xs align-top" style={{ color: "#5AC8E8" }}>β</span>
            </p>
            <p className="text-xs" style={{ color: "#6B7790" }}>{t("meta.tagline")}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1" style={{ background: "rgba(255,255,255,.05)", borderRadius: 12, padding: "6px 10px" }}>
            <Languages size={14} style={{ color: "#97A3BC" }} />
            <select
              value={locale}
              onChange={(e) => switchLang(e.target.value)}
              aria-label="Language"
              style={{ background: "transparent", border: "none", color: "#E9EEF8", fontSize: 13, cursor: "pointer" }}
            >
              {LOCALES.map((l) => (
                <option key={l} value={l} style={{ background: "#101A30" }}>{LANG_LABEL[l]}</option>
              ))}
            </select>
          </div>
          <nav className="flex gap-1 flex-wrap" style={{ background: "rgba(255,255,255,.05)", borderRadius: 99, padding: 4 }}>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={"wf-tab " + (isActive(n.href) ? "wf-tab-on" : "")}>
                {n.icon}<span>{n.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
