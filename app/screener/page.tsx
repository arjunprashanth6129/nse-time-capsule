import Header from "../components/Header";
import { STOCKS } from "@/lib/stocks";
import { getSnapshot } from "@/lib/data";
import ScreenerGrid, { type ScreenerRow } from "./ScreenerGrid";

export const metadata = {
  title: "Screener — 35 NSE stocks as of June 2016",
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
      divYield: snap?.divYield ?? null,
      de: snap?.de ?? null,
    };
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Stock Screener · June 2016
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            All {STOCKS.length} companies as they looked in June 2016. Filter by
            sector or market-cap category, then open a company for its full
            time-capsule page. Nothing here shows data beyond June 2016.
          </p>
        </div>
        <ScreenerGrid rows={rows} />
      </main>
    </>
  );
}
