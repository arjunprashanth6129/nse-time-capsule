"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SECTOR_ORDER } from "@/lib/stocks";
import { croreCompact, pct, ratio, rupee } from "@/lib/format";

export interface ScreenerRow {
  id: string;
  name: string;
  sector: string;
  price: number | null;
  marketCap: number | null;
  marketCapCategory: "Large" | "Mid" | "Small" | "Micro" | null;
  pe: number | null;
  roe: number | null;
  divYield: number | null;
  de: number | null;
}

const CAT_COLORS: Record<string, string> = {
  Large: "bg-blue-100 text-blue-700",
  Mid: "bg-purple-100 text-purple-700",
  Small: "bg-orange-100 text-orange-700",
  Micro: "bg-red-100 text-red-700",
};

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        active
          ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
          : "border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-gray-50 px-2 py-1.5">
      <div className="text-[10px] uppercase tracking-wide text-gray-400">{label}</div>
      <div className="tnum text-sm font-semibold text-gray-800">{value}</div>
    </div>
  );
}

export default function ScreenerGrid({ rows }: { rows: ScreenerRow[] }) {
  const [sector, setSector] = useState("All");
  const [cap, setCap] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (sector !== "All" && r.sector !== sector) return false;
      if (cap !== "All" && r.marketCapCategory !== cap) return false;
      if (
        query &&
        !r.name.toLowerCase().includes(query) &&
        !r.id.toLowerCase().includes(query)
      )
        return false;
      return true;
    });
  }, [rows, sector, cap, q]);

  return (
    <div>
      {/* Search + cap filter chips */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search company or ticker…"
          className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-[var(--color-brand)] focus:outline-none sm:w-64"
        />
        <div className="flex flex-wrap gap-1.5">
          {["All", "Large", "Mid", "Small"].map((c) => (
            <Chip key={c} active={cap === c} onClick={() => setCap(c)}>
              {c === "All" ? "All caps" : `${c} cap`}
            </Chip>
          ))}
        </div>
        <span className="ml-auto text-sm text-gray-500">
          {filtered.length} of {rows.length}
        </span>
      </div>

      {/* Sector filter chips */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        <Chip active={sector === "All"} onClick={() => setSector("All")}>
          All sectors
        </Chip>
        {SECTOR_ORDER.map((s) => (
          <Chip key={s} active={sector === s} onClick={() => setSector(s)}>
            {s}
          </Chip>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <Link
            key={r.id}
            href={`/screener/${r.id}`}
            className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-semibold text-gray-900 group-hover:text-[var(--color-brand)]">
                  {r.name}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="font-mono">{r.id}</span>
                  <span>·</span>
                  <span className="truncate">{r.sector}</span>
                </div>
              </div>
              {r.marketCapCategory && (
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    CAT_COLORS[r.marketCapCategory]
                  }`}
                >
                  {r.marketCapCategory}
                </span>
              )}
            </div>

            {/* Highlighted hero metric: ROE */}
            <div className="mt-3 flex items-end justify-between rounded-lg bg-gradient-to-br from-blue-50 to-transparent px-3 py-2">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-gray-400">
                  ROE · FY2021
                </div>
                <div className="tnum text-2xl font-bold text-[var(--color-brand)]">
                  {pct(r.roe)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wide text-gray-400">
                  Jun 2021
                </div>
                <div className="tnum text-sm font-semibold text-gray-900">
                  {rupee(r.price)}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <MiniStat label="P/E" value={ratio(r.pe, 1)} />
              <MiniStat label="Div Yld" value={pct(r.divYield, 2)} />
              <MiniStat label="Mkt Cap" value={croreCompact(r.marketCap)} />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center text-gray-500">
          No stocks match these filters.
        </div>
      )}
    </div>
  );
}
