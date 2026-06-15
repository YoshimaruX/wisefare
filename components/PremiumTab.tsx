"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Crown, BellRing, RefreshCw, LineChart, Sparkles, Check } from "lucide-react";
import { PRICING, type Locale } from "@/lib/config";
import { billingCurrency } from "@/lib/format";

export function PremiumTab({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const currency = useMemo(() => billingCurrency(locale), [locale]);
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  // ?checkout=success / cancelled のフィードバック
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("checkout");
    if (c === "success") setNotice("✓");
    if (c === "cancelled") setNotice("×");
  }, []);

  const priceLabel = (p: "monthly" | "yearly") => PRICING[p][currency].label;

  const features = [
    { icon: <BellRing size={16} />, text: t("premium.featPriceAlerts") },
    { icon: <RefreshCw size={16} />, text: t("premium.featAutoScan") },
    { icon: <LineChart size={16} />, text: t("premium.featPriceHistory") },
    { icon: <Sparkles size={16} />, text: t("premium.featNoAds") },
  ];

  const startCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, currency, locale }),
      });
      if (res.ok) {
        const { url } = await res.json();
        if (url) { window.location.href = url; return; }
      }
      // 未設定(503)など → 案内を表示
      setNotice("unavailable");
    } catch {
      setNotice("unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 pb-20 pt-10">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Crown size={16} style={{ color: "#F2A93B" }} />
          <span className="wf-eyebrow">{t("premium.eyebrow")}</span>
        </div>
        <h1 className="font-display" style={{ fontSize: "clamp(24px,4.5vw,36px)", lineHeight: 1.25, color: "#E9EEF8" }}>{t("premium.title")}</h1>
        <p className="mt-3 text-sm" style={{ color: "#97A3BC", maxWidth: 480, margin: "12px auto 0" }}>{t("premium.sub")}</p>
      </div>

      {/* plan toggle */}
      <div className="flex items-center justify-center mt-8">
        <div className="flex gap-1" style={{ background: "rgba(255,255,255,.05)", borderRadius: 99, padding: 4 }}>
          <button className={"wf-tab " + (plan === "monthly" ? "wf-tab-on" : "")} onClick={() => setPlan("monthly")}>{t("premium.monthly")}</button>
          <button className={"wf-tab " + (plan === "yearly" ? "wf-tab-on" : "")} onClick={() => setPlan("yearly")}>
            {t("premium.yearly")}
            <span className="wf-chip wf-chip-mint" style={{ marginLeft: 6 }}>{t("premium.save")}</span>
          </button>
        </div>
      </div>

      {/* price card */}
      <div className="wf-card p-6 sm:p-8 mt-6 text-center" style={{ borderColor: "rgba(242,169,59,.35)", boxShadow: "0 0 40px rgba(242,169,59,.07)" }}>
        <div className="flex items-end justify-center gap-1">
          <span className="num font-bold" style={{ fontSize: 48, color: "#E9EEF8", lineHeight: 1 }}>{priceLabel(plan)}</span>
          <span className="text-sm mb-2" style={{ color: "#97A3BC" }}>{plan === "monthly" ? t("premium.perMonth") : t("premium.perYear")}</span>
        </div>

        <div className="mt-6 space-y-3 text-left max-w-sm mx-auto">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <span style={{ color: "#5AC8E8", flexShrink: 0, marginTop: 2 }}>{f.icon}</span>
              <span className="text-sm" style={{ color: "#E9EEF8" }}>{f.text}</span>
            </div>
          ))}
        </div>

        <button className="wf-btn-amber w-full justify-center mt-7" onClick={startCheckout} disabled={loading}>
          <Crown size={16} /> {loading ? t("premium.processing") : t("premium.cta")}
        </button>

        {notice === "unavailable" && <p className="text-xs mt-3" style={{ color: "#F2A93B" }}>{t("premium.unavailable")}</p>}
        {notice === "✓" && <p className="text-xs mt-3" style={{ color: "#46D39A" }}><Check size={12} className="inline" /> ✓</p>}

        <p className="text-xs mt-4" style={{ color: "#6B7790" }}>{t("premium.note")}</p>
      </div>
    </main>
  );
}
