import { useEffect, useState } from "react";

// Prices are set in Indian rupees. Visitors in India see rupees; everyone else sees US dollars.
// India pricing is kept about 25% cheaper than a straight conversion (currency parity), so dollar
// prices are the converted amount plus 25%. Plans can also carry a fixed dollar price point.
const USD_UPLIFT = 1.25;
const FALLBACK_INR_PER_USD = 95;
const RATE_KEY = "jshield_fx_usd_inr";
const CHOICE_KEY = "jshield_currency";
const EVENT = "jshield-currency-change";
const INDIA_ZONES = ["Asia/Kolkata", "Asia/Calcutta"];

function read(key) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function write(key, value) {
  try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ }
}

export function detectCurrency() {
  if (typeof window === "undefined") return "INR";
  const chosen = read(CHOICE_KEY);
  if (chosen === "INR" || chosen === "USD") return chosen;
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (INDIA_ZONES.includes(zone)) return "INR";
    if (zone) return "USD";
  } catch { /* fall through */ }
  const langs = navigator.languages || [navigator.language || ""];
  return langs.some((l) => /-IN$/i.test(l)) ? "INR" : "USD";
}

let ratePromise = null;
function loadRate() {
  if (ratePromise) return ratePromise;
  const cached = read(RATE_KEY);
  if (cached) {
    try {
      const { rate, at } = JSON.parse(cached);
      if (rate > 0 && Date.now() - at < 24 * 3600 * 1000) return (ratePromise = Promise.resolve(rate));
    } catch { /* ignore */ }
  }
  ratePromise = fetch("https://open.er-api.com/v6/latest/USD")
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("rate"))))
    .then((d) => {
      const rate = Number(d?.rates?.INR);
      if (!(rate > 50 && rate < 200)) throw new Error("rate");
      write(RATE_KEY, JSON.stringify({ rate, at: Date.now() }));
      return rate;
    })
    .catch(() => FALLBACK_INR_PER_USD);
  return ratePromise;
}

export function setCurrency(code) {
  write(CHOICE_KEY, code);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: code }));
}

export function useCurrency() {
  const [currency, setState] = useState(detectCurrency);
  const [rate, setRate] = useState(FALLBACK_INR_PER_USD);
  useEffect(() => {
    let live = true;
    loadRate().then((r) => live && setRate(r));
    const on = (e) => setState(e.detail);
    window.addEventListener(EVENT, on);
    return () => { live = false; window.removeEventListener(EVENT, on); };
  }, []);
  return { currency, rate, setCurrency };
}

// One decimal place, dropping a trailing ".0" (57.0 becomes 57).
const trim1 = (n) => n.toFixed(1).replace(/\.0$/, "");
const inrGroup = (n) => Math.round(n).toLocaleString("en-IN");
const usd = (n, decimals) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// amountInr: price in rupees. decimals: 0 for plan prices, 2 for per-unit prices.
// usdPrice: an optional fixed dollar price point for a plan (used instead of the formula).
export function formatPrice(amountInr, currency, rate, decimals = 0, usdPrice) {
  if (currency === "INR") {
    return decimals ? `Rs ${amountInr.toFixed(decimals)}` : `Rs ${inrGroup(amountInr)}`;
  }
  if (usdPrice != null) return `$${usd(usdPrice, decimals)}`;
  const value = (amountInr / rate) * USD_UPLIFT;
  if (decimals) return `$${usd(Math.ceil(value * 100) / 100, decimals)}`;
  return `$${usd(Math.round(value), 0)}`;
}

// Large yearly amounts given in rupees, written the way each audience reads them.
export function formatLarge(amountInr, currency, rate) {
  if (currency === "INR") {
    if (amountInr >= 1e7) return `Rs ${trim1(amountInr / 1e7)} crore`;
    if (amountInr >= 1e5) return `Rs ${trim1(amountInr / 1e5)} lakh`;
    return `Rs ${inrGroup(amountInr)}`;
  }
  const v = amountInr / rate;
  if (v >= 1e6) return `$${trim1(v / 1e6)} million`;
  return `$${usd(Math.round(v), 0)}`;
}

export function CurrencyToggle({ className = "" }) {
  const { currency } = useCurrency();
  return (
    <div className={`inline-flex items-center gap-3 text-sm ${className}`} role="group" aria-label="Show prices in">
      <span className="text-slate-400">Prices in</span>
      {["INR", "USD"].map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={currency === c}
          aria-label={c === "INR" ? "Show prices in Indian rupees" : "Show prices in US dollars"}
          onClick={() => setCurrency(c)}
          className={`min-h-[44px] rounded-lg px-3 font-semibold transition-colors ${
            currency === c ? "bg-indigo-500/15 text-indigo-300" : "text-slate-300 hover:text-white"
          }`}
        >
          {c === "INR" ? "INR (Rs)" : "USD ($)"}
        </button>
      ))}
    </div>
  );
}
