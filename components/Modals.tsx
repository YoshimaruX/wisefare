"use client";

import { useTranslations } from "next-intl";
import { X, AlertTriangle } from "lucide-react";

function Shell({ title, onClose, closeLabel, children }: { title: string; onClose: () => void; closeLabel: string; children: React.ReactNode }) {
  return (
    <div className="wf-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="wf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg" style={{ color: "#E9EEF8" }}>{title}</h3>
          <button className="wf-iconbtn" onClick={onClose} aria-label={closeLabel}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function StepsModal({
  onClose, vName, vPrice, lName, lPrice,
}: {
  onClose: () => void; vName: string; vPrice: string; lName: string; lPrice: string;
}) {
  const t = useTranslations();
  const steps = [
    { t: t("steps.s1t"), d: t("steps.s1d", { vName, vPrice, lName, lPrice }) },
    { t: t("steps.s2t"), d: t("steps.s2d") },
    { t: t("steps.s3t"), d: t("steps.s3d") },
    { t: t("steps.s4t"), d: t("steps.s4d") },
    { t: t("steps.s5t"), d: t("steps.s5d") },
    { t: t("steps.s6t"), d: t("steps.s6d") },
  ];
  return (
    <Shell title={t("steps.title")} onClose={onClose} closeLabel={t("common.close")}>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="wf-stepnum num">{i + 1}</span>
            <div>
              <p className="font-bold" style={{ color: "#E9EEF8" }}>{s.t}</p>
              <p className="text-sm" style={{ color: "#97A3BC" }}>{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Shell>
  );
}

export function RisksModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const risks = [
    { t: t("risks.r1t"), d: t("risks.r1d") },
    { t: t("risks.r2t"), d: t("risks.r2d") },
    { t: t("risks.r3t"), d: t("risks.r3d") },
    { t: t("risks.r4t"), d: t("risks.r4d") },
  ];
  return (
    <Shell title={t("risks.title")} onClose={onClose} closeLabel={t("common.close")}>
      <div className="space-y-3">
        {risks.map((r, i) => (
          <div key={i} className="flex gap-3">
            <AlertTriangle size={18} style={{ color: "#F2A93B", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-bold" style={{ color: "#E9EEF8" }}>{r.t}</p>
              <p className="text-sm" style={{ color: "#97A3BC" }}>{r.d}</p>
            </div>
          </div>
        ))}
        <p className="text-sm pt-2" style={{ color: "#5AC8E8", borderTop: "1px solid rgba(255,255,255,.08)" }}>{t("risks.honest")}</p>
      </div>
    </Shell>
  );
}
