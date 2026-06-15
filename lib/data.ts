// Typed access to the static JSON data layer (all data: fixed window
// Jan 2000 – June 2026, anchored to the reproducible June-2026 reference date).

import pricesJson from "@/data/prices.json";
import niftyJson from "@/data/nifty.json";
import financialsJson from "@/data/financials.json";
import snapshotJson from "@/data/snapshot-2016.json";

export const ANCHOR_MONTH = "2016-06"; // June 2016 — the "time capsule" date
export const END_MONTH = "2026-06"; // fixed reproducible end of window

export interface PricePoint {
  date: string; // "YYYY-MM"
  close: number;
}

export interface YearFin {
  revenue: number | null;
  netProfit: number | null;
  eps: number | null;
  cfo: number | null;
}

export interface Snapshot {
  name: string;
  sector: string;
  price: number | null;
  marketCap: number | null;
  marketCapCategory: "Large" | "Mid" | "Small" | null;
  pe: number | null;
  divYield: number | null;
  roe: number | null;
  de: number | null;
  promoterHolding: number | null;
  promoterHoldingAsOf: string | null;
  opm: number | null;
  grossMargin: number | null;
}

const prices = pricesJson as Record<string, PricePoint[]>;
const nifty = niftyJson as PricePoint[];
const financials = financialsJson as Record<
  string,
  Record<string, YearFin | null>
>;
const snapshots = snapshotJson as Record<string, Snapshot>;

export const FIN_YEARS = ["2010", "2011", "2012", "2013", "2014", "2015", "2016"];

export function getSnapshot(id: string): Snapshot | undefined {
  return snapshots[id];
}

export function getAllSnapshots(): Record<string, Snapshot> {
  return snapshots;
}

export function getFinancials(id: string): Record<string, YearFin | null> {
  return financials[id] ?? {};
}

export function getFullPrices(id: string): PricePoint[] {
  return prices[id] ?? [];
}

// Screener long-term chart: Jan 2000 – June 2016 (never shows beyond June 2016).
export function getScreenerPrices(id: string): PricePoint[] {
  return getFullPrices(id).filter((p) => p.date <= ANCHOR_MONTH);
}

// Simulator window: June 2016 – June 2026 (inclusive of both anchors).
export function getSimPrices(id: string): PricePoint[] {
  return getFullPrices(id).filter(
    (p) => p.date >= ANCHOR_MONTH && p.date <= END_MONTH,
  );
}

export function getNiftySim(): PricePoint[] {
  return nifty.filter((p) => p.date >= ANCHOR_MONTH && p.date <= END_MONTH);
}

export function priceAt(id: string, month: string): number | null {
  const p = getFullPrices(id).find((x) => x.date === month);
  return p ? p.close : null;
}

export function entryPrice(id: string): number | null {
  return priceAt(id, ANCHOR_MONTH);
}

export function exitPrice(id: string): number | null {
  return priceAt(id, END_MONTH);
}
