import Header from "../components/Header";
import { STOCKS } from "@/lib/stocks";
import { getSnapshot } from "@/lib/data";
import ScreenerGrid, { type ScreenerRow } from "./ScreenerGrid";

export const metadata = {
  title: "Screener - 50 NSE stocks as of June 2021",
};

export default function ScreenerLanding() {
  const rows: ScreenerRow[] = STOCKS.map((s) => {
    const snap = getSnapshot(s.id);
    return {
      id: s.id,
      name: s.name,
      sector: s.sector,
      price: snap?.price ?? null,
      marketCap: snap?.marketCap ?? null,
      marketCapCategory: snap?.marketCapCategory ?? null,
      pe: snap?.pe ?? null,
      roe: snap?.roe ?? null,
      divYield: snap?.dividendYield ?? null,
      de: snap?.debtToEquity ?? null,
    };
  });
  // Default order: market cap descending - a natural screener feel that
  // interleaves strong and weak picks (the UI never flags which is which).
  rows.sort((a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0));

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand)]">
            Stock Screener
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            {STOCKS.length} NSE stocks, as they looked in June 2021
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Browse the universe at its starting point for the simulation. Each
            company opens to a full time-capsule page - snapshot ratios,
            FY2015-FY2021 financials, a long-term price chart and peer
            comparison. Nothing here shows data beyond June 2021.
          </p>
        </div>
        <ScreenerGrid rows={rows} />
      </main>
    </>
  );
}
