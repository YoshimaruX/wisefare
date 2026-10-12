"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Check, ExternalLink } from "lucide-react";
import { VPNS } from "@/lib/data";
import { makeFormatter } from "@/lib/format";
import type { Locale } from "@/lib/config";

const TERM_KEY: Record<string, string> = {
  sfs: "vpn.termSfs", nrd: "vpn.termNrd",
};

export function VpnTab({ locale, affiliateUrls = {} }: { locale: Locale; affiliateUrls?: Record<string, string> }) {
  const t = useTranslations();
  const fmt = useMemo(() => makeFormatter(locale), [locale]);
  const [sort, setSort] = useState<"long" | "single">("long");
  const [toast, setToast] = useState("");

  const list = [...VPNS].sort((a, b) => (sort === "long" ? a.long - b.long : a.single - b.single));
  const bestLong = Math.min(...VPNS.map((v) => v.long));
  const bestSingle = Math.min(...VPNS.map((v) => v.single));

  // アフィリエイトリンク未設定のVPNは、押すと「準備中」のお知らせを出す。
  const showNoLink = () => {
    setToast(t("toast.aff"));
    setTimeout(() => setToast(""), 2800);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 pb-16 pt-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <p className="text-sm" style={{ color: "#97A3BC", maxWidth: 520 }}>{t("vpn.intro")}</p>
        <div className="flex gap-2">
          <button className={sort === "long" ? "wf-btn-amber" : "wf-btn-ghost"} onClick={() => setSort("long")}>{t("vpn.sortLong")}</button>
          <button className={sort === "single" ? "wf-btn-amber" : "wf-btn-ghost"} onClick={() => setSort("single")}>{t("vpn.sortSingle")}</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((v) => (
          <div key={v.id} className="wf-card p-5 relative overflow-hidden">
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-lg" style={{ color: "#E9EEF8" }}>{v.name}</p>
              {v.tag && <span className="wf-chip wf-chip-cyan">{v.tag === "long" ? t("vpn.tagLong") : t("vpn.tagSingle")}</span>}
            </div>
            <div className="flex items-end gap-4 mt-3">
              <div>
                <p className="text-xs" style={{ color: "#97A3BC" }}>{t("vpn.colLong")} <span style={{ color: "#6B7790" }}>({t(TERM_KEY[v.id] as any)})</span></p>
                <p className="num text-2xl font-bold" style={{ color: v.long === bestLong ? "#46D39A" : "#E9EEF8" }}>{fmt(v.long)}<span className="text-xs font-normal" style={{ color: "#97A3BC" }}>{t("vpn.perMo")}</span></p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "#97A3BC" }}>{t("vpn.colSingle")}</p>
                <p className="num text-xl font-bold" style={{ color: v.single === bestSingle ? "#46D39A" : "#E9EEF8" }}>{fmt(v.single)}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs" style={{ color: "#97A3BC" }}>
              <span><Check size={12} className="inline" style={{ color: "#46D39A" }} /> {t("vpn.countries", { n: v.countries })}</span>
              <span><Check size={12} className="inline" style={{ color: "#46D39A" }} /> {v.dev === "unl" ? t("vpn.devUnl") : t("vpn.dev", { n: v.dev })}</span>
              <span><Check size={12} className="inline" style={{ color: "#46D39A" }} /> {t("vpn.refund")}</span>
            </div>
            {affiliateUrls[v.id] ? (
              <a className="wf-btn-amber w-full mt-4 justify-center" href={affiliateUrls[v.id]} target="_blank" rel="sponsored noopener noreferrer">{t("vpn.official")} <ExternalLink size={14} /></a>
            ) : (
              <button className="wf-btn-ghost w-full mt-4 justify-center" onClick={showNoLink}>{t("vpn.official")} <ExternalLink size={14} /></button>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs mt-5" style={{ color: "#6B7790" }}>{t("vpn.disclosure")}</p>
      {toast && <div className="wf-toast">{toast}</div>}
    </main>
  );
}
