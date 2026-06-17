// Financial calculations shared by the screener (CAGR) and simulator (portfolio).

import {
  ANCHOR_MONTH,
  END_MONTH,
  getSimPrices,
  getNiftySim,
  entryPrice,
  exitPrice,
  type PricePoint,
} from "./data";

// Compounded annual growth rate (%), or null if endpoints missing/invalid.
export function cagr(
  start: number | null | undefined,
  end: number | null | undefined,
  years: number,
): number | null {
  if (start == null || end == null || start <= 0 || end <= 0) return null;
  return ((end / start) ** (1 / years) - 1) * 100;
}

export interface Holding {
  id: string;
  qty: number;
}

export interface HoldingResult {
  id: string;
  qty: number;
  entry: number | null;
  exit: number | null;
  entryValue: number | null;
  exitValue: number | null;
  stockReturn: number | null; // %
  weight: number | null; // % of entry portfolio value
}

export interface TimelinePoint {
  date: string;
  portfolio: number; // indexed to 100 at June 2021
  nifty: number | null; // indexed to 100 at June 2021
}

export interface PortfolioResult {
  holdings: HoldingResult[];
  entryValue: number;
  exitValue: number;
  totalReturn: number; // %
  timeline: TimelinePoint[];
  rating: number; // 1–10
}

// Canonical monthly grid June 2021 – June 2026 (all 35 stocks share it).
function monthGrid(): string[] {
  const ref = getSimPrices("TCS");
  return ref.map((p) => p.date);
}

function priceMap(id: string): Map<string, number> {
  const m = new Map<string, number>();
  for (const p of getSimPrices(id)) m.set(p.date, p.close);
  return m;
}

// Rating 1–10 from total % return over June 2021 – June 2026.
// Bands (spec): <0 ->1-2, 0-50 ->3-4, 50-100 ->5-6, 100-200 ->7-8, >200 ->9-10.
export function ratingFromReturn(r: number): number {
  const bands: [number, number, number, number][] = [
    [-Infinity, 0, 1, 2],
    [0, 50, 3, 4],
    [50, 100, 5, 6],
    [100, 200, 7, 8],
    [200, Infinity, 9, 10],
  ];
  for (const [lo, hi, low, high] of bands) {
    if (r < hi || hi === Infinity) {
      if (lo === -Infinity) return r < -25 ? 1 : 2;
      if (hi === Infinity) return r > 400 ? 10 : 9;
      const frac = (r - lo) / (hi - lo);
      return frac < 0.5 ? low : high;
    }
  }
  return 5;
}

export function computePortfolio(holdings: Holding[]): PortfolioResult {
  const clean = holdings.filter((h) => h.id && h.qty > 0);

  const results: HoldingResult[] = clean.map((h) => {
    const entry = entryPrice(h.id);
    const exit = exitPrice(h.id);
    const entryValue = entry != null ? entry * h.qty : null;
    const exitValue = exit != null ? exit * h.qty : null;
    const stockReturn =
      entry != null && exit != null && entry > 0
        ? (exit / entry - 1) * 100
        : null;
    return {
      id: h.id,
      qty: h.qty,
      entry,
      exit,
      entryValue,
      exitValue,
      stockReturn,
      weight: null,
    };
  });

  const entryValue = results.reduce((s, r) => s + (r.entryValue ?? 0), 0);
  const exitValue = results.reduce((s, r) => s + (r.exitValue ?? 0), 0);
  for (const r of results) {
    r.weight =
      entryValue > 0 && r.entryValue != null
        ? (r.entryValue / entryValue) * 100
        : null;
  }

  const totalReturn = entryValue > 0 ? (exitValue / entryValue - 1) * 100 : 0;

  // Timeline: portfolio value at each month, indexed to 100 at the anchor.
  const grid = monthGrid();
  const maps = new Map(clean.map((h) => [h.id, priceMap(h.id)]));
  // For stocks listed after the anchor (PAYTM), back-fill pre-listing months
  // flat at the first available (listing) price so the index has no artificial
  // jump and the base value matches the per-holding entry value.
  const firstClose = new Map(
    clean.map((h) => {
      const sim = getSimPrices(h.id);
      return [h.id, sim.length ? sim[0].close : null];
    }),
  );
  const niftyMap = new Map(getNiftySim().map((p) => [p.date, p.close]));
  const nifty0 = niftyMap.get(ANCHOR_MONTH) ?? null;

  let base = 0;
  const timeline: TimelinePoint[] = [];
  for (const date of grid) {
    let val = 0;
    for (const h of clean) {
      const price = maps.get(h.id)!.get(date) ?? firstClose.get(h.id) ?? null;
      if (price != null) val += price * h.qty;
    }
    if (date === ANCHOR_MONTH) base = val;
    const niftyV = niftyMap.get(date);
    timeline.push({
      date,
      portfolio: base > 0 ? (val / base) * 100 : 100,
      nifty:
        nifty0 != null && niftyV != null ? (niftyV / nifty0) * 100 : null,
    });
  }

  return {
    holdings: results,
    entryValue,
    exitValue,
    totalReturn,
    timeline,
    rating: ratingFromReturn(totalReturn),
  };
}

export { ANCHOR_MONTH, END_MONTH };
export type { PricePoint };
