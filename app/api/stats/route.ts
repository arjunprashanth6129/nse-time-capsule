import snapshot from "@/data/snapshot-2021.json";
import nifty from "@/data/nifty.json";
import ideal from "@/data/ideal-portfolios.json";
import { PROJECT } from "@/lib/stats";

// Public JSON stats endpoint — derives key figures live from the data layer.
export const dynamic = "force-static";

export function GET() {
  const snap = snapshot as Record<string, unknown>;
  const series = nifty as { date: string; close: number }[];
  const at = (d: string) => series.find((p) => p.date === d)?.close ?? null;
  const n0 = at("2021-06-01");
  const n1 = at("2026-06-01");
  const niftyReturn =
    n0 && n1 ? Math.round((n1 / n0 - 1) * 1000) / 10 : PROJECT.niftyReturn;

  return Response.json({
    project: PROJECT.name,
    description: PROJECT.description,
    stockCount: Object.keys(snap).length,
    financialYears: ["FY2015", "FY2016", "FY2017", "FY2018", "FY2019", "FY2020", "FY2021"],
    faMetricsPerStock: 10,
    priceHistory: { from: "2000-01", to: "2026-06" },
    simulationWindow: { entry: "2021-06", exit: "2026-06" },
    niftyBenchmarkReturnPct: niftyReturn,
    scenarios: (ideal as { scenarioId: string; portfolio_total_return_pct: number }[]).map(
      (p) => ({ id: p.scenarioId, idealReturnPct: p.portfolio_total_return_pct }),
    ),
    repo: PROJECT.github,
    generatedAt: "static-build",
  });
}
