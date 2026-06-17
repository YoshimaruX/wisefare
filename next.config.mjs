"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Plane, BedDouble, Search, Crown, TrendingDown, ExternalLink, Globe2,
  Wallet, Sparkles, Radar,
} from "lucide-react";
import { COUNTRIES, CTRY, AIRPORTS, HOTEL_CITIES } from "@/lib/data";
import { makeFormatter } from "@/lib/format";
import type { Locale } from "@/lib/config";
import type { ScanResult, SearchKind } from "@/lib/scan";
import { StepsModal, RisksModal } from "./Modals";

interface Props { locale: Locale; kind: SearchKind }

type Query =
  | { kind: "flight"; fromCountry: string; fromAirport: string; toCountry: string; toAirport: string; dep: string; ret: string; pax: number }
  | { kind: "hotel"; hotelCountry: string; hotelCity: string; hname: string; cin: string; cout: string; n: number; guests: number };

const nightsBetween = (a: string, b: string) =>
  Math.max(1, Math.round((+new Date(b) - +new Date(a)) / 86400000) || 1);

export function SearchApp({ locale, kind }: Props) {
  const t = useTranslations();
  const fmt = useMemo(() => makeFormatter(locale), [locale]);
  const rn = useCallback((code: string) => CTRY(code).nm[locale], [locale]);

  const sortedCountries = useMemo(
    () => [...COUNTRIES].sort((a, b) => a.nm[locale].localeCompare(b.nm[locale], locale)),
    [locale]
  );

  const [home, setHome] = useState("JP");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [query, setQuery] = useState<Query | null>(null);
  const [progress, setProgress] = useState(-1);
  const [steps, setSteps] = useState(false);
  const [risk, setRisk] = useState(false);
  const [toast, setToast] = useState("");

  // flight
  const [fromCountry, setFromCountry] = useState("JP");
  const [fromAirport, setFromAirport] = useState("NRT");
  const [toCountry, setToCountry] = useState("FR");
  const [toAirport, setToAirport] = useState("CDG");
  const [dep, setDep] = useState("2026-09-12");
  const [ret, setRet] = useState("2026-09-20");
  const [pax, setPax] = useState(1);

  // hotel
  const [hotelCountry, setHotelCountry] = useState("FR");
  const [hotelCity, setHotelCity] = useState("Paris");
  const [hname, setHname] = useState("");
  const [cin, setCin] = useState("2026-09-12");
  const [cout, setCout] = useState("2026-09-15");
  const [guests, setGuests] = useState(2);

  useEffect(() => { setFromAirport(AIRPORTS[fromCountry][0][0]); }, [fromCountry]);
  useEffect(() => { setToAirport(AIRPORTS[toCountry][0][0]); }, [toCountry]);
  useEffect(() => { setHotelCity(HOTEL_CITIES[hotelCountry][0]); }, [hotelCountry]);

  useEffect(() => { if (!toast) return; const tm = setTimeout(() => setToast(""), 2800); return () => clearTimeout(tm); }, [toast]);

  // スキャン進行アニメーション → 100%で /api/search を呼ぶ
  useEffect(() => {
    if (progress < 0 || !query) return;
    if (progress >= 100) {
      (async () => {
        try {
          const res = await fetch("/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              query.kind === "flight"
                ? { kind: "flight", homeCode: home, fromAirport: query.fromAirport, toAirport: query.toAirport, dep: query.dep, ret: query.ret, pax: query.pax }
                : { kind: "hotel", homeCode: home, hotelCity: query.hotelCity, hotelName: query.hname, cin: query.cin, cout: query.cout, nights: query.n }
            ),
          });
          const data: ScanResult = await res.json();
          setResult(data);
        } catch {
          setToast("scan failed");
        } finally {
          setProgress(-1);
        }
      })();
      return;
    }
    const tm = setTimeout(() => setProgress((p) => Math.min(100, p + 4)), 45);
    return () => clearTimeout(tm);
  }, [progress, query, home]);

  const airportName = (country: string, code: string) => {
    const a = AIRPORTS[country].find((x) => x[0] === code);
    return a ? a[1] : code;
  };

  const runScan = () => {
    if (kind === "flight") {
      setQuery({ kind: "flight", fromCountry, fromAirport, toCountry, toAirport, dep, ret, pax });
    } else {
      setQuery({ kind: "hotel", hotelCountry, hotelCity, hname, cin, cout, n: nightsBetween(cin, cout), guests });
    }
    setResult(null);
    setProgress(0);
  };

  const queryLabel = (): string => {
    if (!query) return "";
    if (query.kind === "flight")
      return `${airportName(query.fromCountry, query.fromAirport)} (${query.fromAirport}) → ${airportName(query.toCountry, query.toAirport)} (${query.toAirport}) ${t("result.roundTrip")} ・ ${query.dep} – ${query.ret} ・ ${t("result.travelers", { n: query.pax })}`;
    return `${query.hname ? query.hname + " ・ " : ""}${t("result.hotelIn", { name: query.hotelCity })} ・ ${query.cin} – ${query.cout} (${t("result.nights", { n: query.n })}) ・ ${t("result.guestsUnit", { n: query.guests })}`;
  };

  const scanning = progress >= 0;
  const r = result;
  const Icon = kind === "flight" ? Plane : BedDouble;

  return (
    <main className="max-w-5xl mx-auto px-4 pb-16">
      {/* hero */}
      <section className="pt-8 pb-6">
        <h1 className="font-display" style={{ fontSize: "clamp(26px,5vw,42px)", lineHeight: 1.25, color: "#E9EEF8" }}>
          {t("hero.a")}<span style={{ color: "#F2A93B" }}>{t("hero.b")}</span>{t("hero.c")}
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#97A3BC", maxWidth: 600 }}>{t("hero.sub", { n: COUNTRIES.length })}</p>
      </section>

      {/* search panel */}
      <section className="wf-card p-5 sm:p-6">
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="wf-label" style={{ marginBottom: 0 }}>{t("form.home")}</span>
          <select className="wf-select" style={{ width: "auto", minWidth: 190 }} value={home} onChange={(e) => setHome(e.target.value)}>
            {sortedCountries.map((co) => <option key={co.c} value={co.c}>{co.fl} {co.nm[locale]}</option>)}
          </select>
        </div>

        {kind === "flight" ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="grid grid-cols-2 gap-2 col-span-2">
              <label className="block"><span className="wf-label">{t("form.from")} · {t("form.country")}</span>
                <select className="wf-select" value={fromCountry} onChange={(e) => setFromCountry(e.target.value)}>
                  {sortedCountries.map((co) => <option key={co.c} value={co.c}>{co.fl} {co.nm[locale]}</option>)}
                </select>
              </label>
              <label className="block"><span className="wf-label">{t("form.airport")}</span>
                <select className="wf-select" value={fromAirport} onChange={(e) => setFromAirport(e.target.value)}>
                  {AIRPORTS[fromCountry].map(([code, name]) => <option key={code} value={code}>{name} ({code})</option>)}
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2 col-span-2">
              <label className="block"><span className="wf-label">{t("form.to")} · {t("form.country")}</span>
                <select className="wf-select" value={toCountry} onChange={(e) => setToCountry(e.target.value)}>
                  {sortedCountries.map((co) => <option key={co.c} value={co.c}>{co.fl} {co.nm[locale]}</option>)}
                </select>
              </label>
              <label className="block"><span className="wf-label">{t("form.airport")}</span>
                <select className="wf-select" value={toAirport} onChange={(e) => setToAirport(e.target.value)}>
                  {AIRPORTS[toCountry].map(([code, name]) => <option key={code} value={code}>{name} ({code})</option>)}
                </select>
              </label>
            </div>
            <label className="block"><span className="wf-label">{t("form.depart")}</span><input type="date" className="wf-input" value={dep} onChange={(e) => setDep(e.target.value)} /></label>
            <label className="block"><span className="wf-label">{t("form.ret")}</span><input type="date" className="wf-input" value={ret} onChange={(e) => setRet(e.target.value)} /></label>
            <label className="block"><span className="wf-label">{t("form.pax")}</span>
              <select className="wf-select" value={pax} onChange={(e) => setPax(Number(e.target.value))}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{t("result.travelers", { n })}</option>)}</select>
            </label>
            <div className="hidden lg:block" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <label className="block"><span className="wf-label">{t("form.country")}</span>
              <select className="wf-select" value={hotelCountry} onChange={(e) => setHotelCountry(e.target.value)}>
                {sortedCountries.map((co) => <option key={co.c} value={co.c}>{co.fl} {co.nm[locale]}</option>)}
              </select>
            </label>
            <label className="block"><span className="wf-label">{t("form.city")}</span>
              <select className="wf-select" value={hotelCity} onChange={(e) => setHotelCity(e.target.value)}>
                {HOTEL_CITIES[hotelCountry].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="block col-span-2 lg:col-span-1"><span className="wf-label">{t("form.hotelName")}</span>
              <input className="wf-input" value={hname} onChange={(e) => setHname(e.target.value)} placeholder={t("form.hotelPh")} />
            </label>
            <label className="block"><span className="wf-label">{t("form.cin")}</span><input type="date" className="wf-input" value={cin} onChange={(e) => setCin(e.target.value)} /></label>
            <label className="block"><span className="wf-label">{t("form.cout")}</span><input type="date" className="wf-input" value={cout} onChange={(e) => setCout(e.target.value)} /></label>
            <label className="block"><span className="wf-label">{t("form.guests")}</span>
              <select className="wf-select" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{t("result.travelers", { n })}</option>)}</select>
            </label>
          </div>
        )}

        <button className="wf-btn-amber w-full justify-center mt-4" onClick={runScan} disabled={scanning}>
          <Search size={16} /> {scanning ? t("form.scanning") : (kind === "flight" ? t("form.searchFlight") : t("form.searchHotel"))}
        </button>
      </section>

      {/* results */}
      <section className="mt-5 space-y-4">
        {scanning && <Scanner progress={progress} t={t} />}
        {!scanning && r && (
          <>
            <BoardingPass r={r} label={queryLabel()} t={t} fmt={fmt} rn={rn}
              onSteps={() => setSteps(true)} onRisk={() => setRisk(true)} onToast={() => setToast(t("toast.book"))} />
            <div className="grid lg:grid-cols-2 gap-4">
              <TopTen r={r} t={t} fmt={fmt} rn={rn} />
              <Breakdown r={r} t={t} fmt={fmt} rn={rn} />
            </div>
          </>
        )}
        {!scanning && !r && (
          <div className="wf-card p-8 text-center">
            <Sparkles size={22} style={{ color: "#5AC8E8", margin: "0 auto" }} />
            <p className="mt-3 text-sm" style={{ color: "#97A3BC" }}>{t("result.empty")}</p>
          </div>
        )}
      </section>

      {steps && r && (
        <StepsModal onClose={() => setSteps(false)}
          vName={r.vpnSingle.name} vPrice={fmt(r.vpnSingle.single)}
          lName={r.vpnLong.name} lPrice={fmt(r.vpnLong.long)} />
      )}
      {risk && <RisksModal onClose={() => setRisk(false)} />}
      {toast && <div className="wf-toast">{toast}</div>}
    </main>
  );
}

/* ---------- sub-components ---------- */
type TT = ReturnType<typeof useTranslations>;
type Fmt = (n: number) => string;
type Rn = (c: string) => string;

function Barcode({ seed }: { seed: number }) {
  const rand = (s: number) => { const x = Math.sin(s) * 10000; return x - Math.floor(x); };
  const bars = Array.from({ length: 24 }, (_, i) => 1 + Math.floor(rand(seed + i) * 3));
  return (
    <div className="flex items-end gap-px" aria-hidden style={{ height: 30 }}>
      {bars.map((w, i) => <div key={i} style={{ width: w * 1.6, height: "100%", background: "rgba(233,238,248,.75)", opacity: i % 5 === 0 ? 0.5 : 1 }} />)}
    </div>
  );
}

function BoardingPass({ r, label, t, fmt, rn, onSteps, onRisk, onToast }: {
  r: ScanResult; label: string; t: TT; fmt: Fmt; rn: Rn;
  onSteps: () => void; onRisk: () => void; onToast: () => void;
}) {
  const isHomeBest = r.best.c === r.homeCode;
  const pct = Math.round((r.diff / r.home) * 100);
  const seed = label.split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return (
    <div className="wf-pass wf-fadeup">
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3"><Crown size={16} style={{ color: "#F2A93B" }} /><span className="wf-eyebrow">{t("result.eyebrowBest")}</span></div>
        <p className="text-sm mb-1" style={{ color: "#97A3BC" }}>{label}</p>
        {isHomeBest ? (
          <>
            <div className="flex items-end gap-3 flex-wrap"><span style={{ fontSize: 40 }}>{r.best.fl}</span><span className="num font-bold" style={{ fontSize: 40, color: "#E9EEF8", lineHeight: 1 }}>{fmt(r.home)}</span></div>
            <p className="mt-3 text-sm" style={{ color: "#46D39A" }}>{t("result.homeBest", { name: rn(r.homeCode) })}</p>
          </>
        ) : (
          <>
            <div className="flex items-end gap-3 flex-wrap">
              <span style={{ fontSize: 40 }}>{r.best.fl}</span>
              <span className="num font-bold" style={{ fontSize: 40, color: "#E9EEF8", lineHeight: 1 }}>{fmt(r.best.price)}</span>
              <span className="wf-chip wf-chip-mint"><TrendingDown size={13} /> {t("result.cheaper", { amt: fmt(r.diff), pct, name: rn(r.homeCode) })}</span>
            </div>
            <p className="mt-2 text-sm" style={{ color: "#97A3BC" }}>{t("result.scanned", { n: r.scannedCount, name: rn(r.best.c) })}</p>
          </>
        )}
        <div className="flex flex-wrap gap-2 mt-5">
          <button className="wf-btn-amber" onClick={onSteps}>{t("result.btnSteps")}</button>
          <button className="wf-btn-ghost" onClick={onRisk}>{t("result.btnRisk")}</button>
          <button className="wf-btn-ghost" onClick={onToast}>{t("result.btnOpen")} <ExternalLink size={14} /></button>
        </div>
      </div>
      <div className="wf-perf" aria-hidden><span className="wf-notch" style={{ top: -9, left: -9 }} /></div>
      <div className="wf-stub p-5 sm:p-6">
        <span className="wf-eyebrow">{t("result.recVpn")}</span>
        {isHomeBest ? <p className="text-sm mt-2" style={{ color: "#97A3BC" }}>{t("result.noVpn")}</p> : (
          <>
            <p className="font-display text-xl mt-1" style={{ color: "#E9EEF8" }}>{r.vpnSingle.name}</p>
            <p className="num text-2xl font-bold mt-1" style={{ color: "#5AC8E8" }}>{fmt(r.vpnSingle.single)}<span className="text-sm font-normal" style={{ color: "#97A3BC" }}> {t("result.perMo")}</span></p>
            <div className="mt-3 pt-3" style={{ borderTop: "1px dashed rgba(255,255,255,.15)" }}>
              <p className="text-xs" style={{ color: "#97A3BC" }}>{t("result.netLabel")}</p>
              <p className="num text-2xl font-bold" style={{ color: r.net > 0 ? "#46D39A" : "#F47174" }}>{r.net > 0 ? "+" : ""}{fmt(r.net)}</p>
            </div>
          </>
        )}
        <div className="mt-4"><Barcode seed={seed} /></div>
      </div>
    </div>
  );
}

function TopTen({ r, t, fmt, rn }: { r: ScanResult; t: TT; fmt: Fmt; rn: Rn }) {
  const max = Math.max(...r.top10.map((x) => x.price));
  return (
    <div className="wf-card p-5 sm:p-6 wf-fadeup">
      <div className="flex items-center gap-2 mb-4"><Globe2 size={16} style={{ color: "#5AC8E8" }} /><span className="wf-eyebrow">{t("top10.title")}</span></div>
      <div className="space-y-2">
        {r.top10.map((row, idx) => {
          const isBest = idx === 0;
          const isHome = row.c === r.homeCode;
          const pct = Math.round(((row.price - r.home) / r.home) * 100);
          return (
            <div key={row.c} className="wf-runway">
              <div className="wf-runway-bar" style={{
                width: (row.price / max) * 100 + "%",
                background: isBest ? "linear-gradient(90deg, rgba(70,211,154,.30), rgba(70,211,154,.08))"
                  : isHome ? "linear-gradient(90deg, rgba(242,169,59,.22), rgba(242,169,59,.05))"
                  : "linear-gradient(90deg, rgba(90,200,232,.13), rgba(90,200,232,.03))",
              }} />
              <div className="relative flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="num text-xs" style={{ color: isBest ? "#46D39A" : "#6B7790", width: 18, fontWeight: 700 }}>{idx + 1}</span>
                  <span style={{ fontSize: 18 }}>{row.fl}</span>
                  <span className="text-sm font-bold" style={{ color: "#E9EEF8" }}>{rn(row.c)}</span>
                  {isBest && <span className="wf-chip wf-chip-mint"><Crown size={12} /> {t("top10.chipBest")}</span>}
                  {isHome && <span className="wf-chip wf-chip-amber">{t("top10.chipHome")}</span>}
                </div>
                <div className="flex items-center gap-3">
                  {!isHome && <span className="text-xs num" style={{ color: pct < 0 ? "#46D39A" : "#F47174" }}>{pct > 0 ? "+" : ""}{pct}%</span>}
                  <span className="num font-bold" style={{ color: "#E9EEF8" }}>{fmt(row.price)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs mt-4" style={{ color: "#6B7790" }}>{t("top10.note")}</p>
    </div>
  );
}

function Breakdown({ r, t, fmt, rn }: { r: ScanResult; t: TT; fmt: Fmt; rn: Rn }) {
  if (r.best.c === r.homeCode) return null;
  return (
    <div className="wf-card p-5 sm:p-6 wf-fadeup">
      <div className="flex items-center gap-2 mb-4"><Wallet size={16} style={{ color: "#F2A93B" }} /><span className="wf-eyebrow">{t("breakdown.title")}</span></div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-3"><span style={{ color: "#97A3BC" }}>{t("breakdown.home", { name: rn(r.homeCode) })}</span><span className="num" style={{ color: "#E9EEF8" }}>{fmt(r.home)}</span></div>
        <div className="flex justify-between gap-3"><span style={{ color: "#97A3BC" }}>{r.best.fl} {t("breakdown.best", { name: rn(r.best.c) })}</span><span className="num" style={{ color: "#E9EEF8" }}>{fmt(r.best.price)}</span></div>
        <div className="flex justify-between gap-3"><span style={{ color: "#97A3BC" }}>{t("breakdown.diff")}</span><span className="num" style={{ color: "#46D39A" }}>−{fmt(r.diff)}</span></div>
        <div className="flex justify-between gap-3"><span style={{ color: "#97A3BC" }}>{t("breakdown.vpn", { name: r.vpnSingle.name })}</span><span className="num" style={{ color: "#F47174" }}>+{fmt(r.vpnSingle.single)}</span></div>
        <div className="flex justify-between gap-3 pt-2 font-bold" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ color: "#E9EEF8" }}>{t("breakdown.net")}</span><span className="num text-lg" style={{ color: r.net > 0 ? "#46D39A" : "#F47174" }}>{fmt(r.net)}</span>
        </div>
      </div>
      <p className="text-xs mt-4" style={{ color: "#6B7790" }}>{t("breakdown.long", { name: r.vpnLong.name, price: fmt(r.vpnLong.long), amt: fmt(r.diff) })}</p>
    </div>
  );
}

function Scanner({ progress, t }: { progress: number; t: TT }) {
  const shown = Math.round((progress / 100) * COUNTRIES.length);
  const flags = COUNTRIES.slice(0, Math.max(1, shown));
  return (
    <div className="wf-card p-6 wf-fadeup">
      <p className="text-sm mb-4 flex items-center gap-2" style={{ color: "#97A3BC" }}>
        <Radar size={15} className="wf-spin" style={{ color: "#5AC8E8" }} /> {t("scan.title", { n: COUNTRIES.length })}
      </p>
      <div className="flex gap-1 flex-wrap mb-4" style={{ maxHeight: 70, overflow: "hidden" }}>
        {flags.map((c, i) => <span key={c.c} style={{ fontSize: 18, opacity: i > shown - 6 ? 1 : 0.4 }}>{c.fl}</span>)}
      </div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs num" style={{ color: "#5AC8E8" }}>{t("scan.found", { n: shown })}</span>
        <span className="text-xs num" style={{ color: "#6B7790" }}>{Math.round(progress)}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 99, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: progress + "%", background: "linear-gradient(90deg,#5AC8E8,#46D39A)", transition: "width .15s" }} />
      </div>
    </div>
  );
}
