"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Radar, ShieldCheck, ExternalLink, Info, ChevronDown } from "lucide-react";
import { COUNTRIES } from "@/lib/data";

export function HowTab() {
  const t = useTranslations();
  const [open, setOpen] = useState(-1);

  const steps = [
    { icon: <Radar size={18} />, tt: t("how.step1t"), d: t("how.step1d", { n: COUNTRIES.length }) },
    { icon: <ShieldCheck size={18} />, tt: t("how.step2t"), d: t("how.step2d") },
    { icon: <ExternalLink size={18} />, tt: t("how.step3t"), d: t("how.step3d") },
  ];

  // FAQはmessagesの配列。next-intlでは raw でアクセス
  const faq = t.raw("how.faq") as { q: string; a: string }[];

  return (
    <main className="max-w-5xl mx-auto px-4 pb-16 pt-8 space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <div key={i} className="wf-card p-5">
            <div className="wf-iconcircle">{s.icon}</div>
            <p className="font-bold mt-3" style={{ color: "#E9EEF8" }}>{s.tt}</p>
            <p className="text-sm mt-1" style={{ color: "#97A3BC" }}>{s.d}</p>
          </div>
        ))}
      </div>

      <div className="wf-card p-5">
        <div className="flex items-center gap-2 mb-2"><Info size={16} style={{ color: "#5AC8E8" }} /><span className="wf-eyebrow">{t("how.posT")}</span></div>
        <p className="text-sm" style={{ color: "#97A3BC" }}>{t("how.posD")}</p>
      </div>

      <div className="space-y-2">
        {faq.map((f, i) => (
          <div key={i} className="wf-card overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 text-left" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="font-bold text-sm" style={{ color: "#E9EEF8" }}>{f.q}</span>
              <ChevronDown size={16} style={{ color: "#97A3BC", transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </button>
            {open === i && <p className="px-4 pb-4 text-sm" style={{ color: "#97A3BC" }}>{f.a}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
