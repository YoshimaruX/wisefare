@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0A0F1E;
  --bg-soft: #0C1326;
  --font-display: 'Shippori Mincho', serif;
  --font-body: 'Zen Kaku Gothic New', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-num: 'Space Grotesk', 'Zen Kaku Gothic New', sans-serif;
}

html { color-scheme: dark; }

body {
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(90,200,232,.10), transparent 60%),
    radial-gradient(900px 500px at -10% 30%, rgba(242,169,59,.07), transparent 55%),
    linear-gradient(180deg, #0A0F1E 0%, #0C1326 100%);
  background-attachment: fixed;
  color: #E9EEF8;
  min-height: 100vh;
}

.num { font-variant-numeric: tabular-nums; }

/* form controls */
.wf-input, .wf-select {
  width: 100%;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  padding: 10px 12px;
  color: #E9EEF8;
  font-size: 14px;
  color-scheme: dark;
}
.wf-select option { background: #101A30; color: #E9EEF8; }
.wf-input:focus, .wf-select:focus, button:focus-visible, a:focus-visible {
  outline: 2px solid #F2A93B;
  outline-offset: 1px;
}

/* buttons */
.wf-btn-amber {
  display: inline-flex; align-items: center; gap: 6px;
  background: linear-gradient(135deg, #F6BC5C, #E98F36);
  color: #241303; font-weight: 700; font-size: 14px;
  border: none; border-radius: 12px; padding: 10px 16px; cursor: pointer;
}
.wf-btn-amber:hover { filter: brightness(1.06); }
.wf-btn-amber:disabled { opacity: .6; cursor: default; }
.wf-btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,.05); color: #E9EEF8; font-size: 14px;
  border: 1px solid rgba(255,255,255,.14); border-radius: 12px; padding: 10px 16px; cursor: pointer;
}
.wf-btn-ghost:hover { background: rgba(255,255,255,.1); }

/* card */
.wf-card { background: rgba(255,255,255,.045); border: 1px solid rgba(255,255,255,.09); border-radius: 18px; }

/* chips */
.wf-chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; border-radius: 99px; padding: 4px 10px; }
.wf-chip-mint { color: #46D39A; background: rgba(70,211,154,.12); border: 1px solid rgba(70,211,154,.3); }
.wf-chip-amber { color: #F2A93B; background: rgba(242,169,59,.1); border: 1px solid rgba(242,169,59,.3); }
.wf-chip-cyan { color: #5AC8E8; background: rgba(90,200,232,.1); border: 1px solid rgba(90,200,232,.3); }

/* eyebrow / labels */
.wf-eyebrow { font-size: 11px; letter-spacing: .18em; color: #97A3BC; font-weight: 700; }
.wf-label { display: block; font-size: 11px; color: #97A3BC; margin-bottom: 6px; letter-spacing: .05em; }

/* boarding pass */
.wf-pass { display: flex; flex-wrap: wrap; background: rgba(255,255,255,.055); border: 1px solid rgba(242,169,59,.35); border-radius: 20px; box-shadow: 0 0 40px rgba(242,169,59,.07); overflow: hidden; }
.wf-stub { width: 100%; background: rgba(255,255,255,.03); }
@media (min-width: 640px) { .wf-stub { width: 250px; } }
.wf-perf { position: relative; width: 100%; height: 0; border-top: 2px dashed rgba(255,255,255,.18); }
@media (min-width: 640px) { .wf-perf { width: 0; height: auto; border-top: none; border-left: 2px dashed rgba(255,255,255,.18); } }
.wf-notch { position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #0B1122; border: 1px solid rgba(255,255,255,.09); }

/* runway rows */
.wf-runway { position: relative; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 10px 14px; overflow: hidden; }
.wf-runway-bar { position: absolute; inset: 0; border-radius: 12px; }

/* modal */
.wf-overlay { position: fixed; inset: 0; background: rgba(5,8,18,.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 50; }
.wf-modal { width: 100%; max-width: 560px; max-height: 85vh; overflow-y: auto; background: #101A30; border: 1px solid rgba(255,255,255,.12); border-radius: 20px; padding: 24px; }
.wf-iconbtn { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 10px; padding: 6px; color: #97A3BC; cursor: pointer; display: flex; }
.wf-stepnum { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: rgba(242,169,59,.14); color: #F2A93B; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; }
.wf-iconcircle { width: 38px; height: 38px; border-radius: 12px; background: rgba(90,200,232,.12); color: #5AC8E8; display: flex; align-items: center; justify-content: center; }

/* toast */
.wf-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #16213B; border: 1px solid rgba(255,255,255,.16); color: #E9EEF8; font-size: 13px; border-radius: 12px; padding: 10px 16px; z-index: 60; box-shadow: 0 8px 30px rgba(0,0,0,.4); max-width: 90vw; }

/* banner */
.wf-banner { font-size: 12px; color: #97A3BC; background: rgba(90,200,232,.07); border-bottom: 1px solid rgba(255,255,255,.07); padding: 7px 16px; text-align: center; }

/* tabs / nav */
.wf-tab { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #97A3BC; background: transparent; border: 1px solid transparent; border-radius: 99px; padding: 8px 14px; cursor: pointer; white-space: nowrap; text-decoration: none; }
.wf-tab-on { color: #0A0F1E; background: #E9EEF8; font-weight: 700; }

/* animations */
@keyframes wfFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
.wf-fadeup { animation: wfFadeUp .5s ease both; }
@keyframes wfBlink { 0%,100% { opacity: 1; } 50% { opacity: .2; } }
.wf-blink { animation: wfBlink 1s infinite; }
@keyframes wfSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
.wf-spin { animation: wfSpin 1.1s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .wf-fadeup, .wf-blink, .wf-spin { animation: none; }
}
