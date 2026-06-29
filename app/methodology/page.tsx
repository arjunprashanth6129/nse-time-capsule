import Link from "next/link";
import { PROJECT } from "@/lib/stats";

export const metadata = {
  title: "Methodology",
  description:
    "Data pipeline, scoring algorithm, and design decisions behind the MarketMind financial-literacy simulator.",
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/10 py-10">
      <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-300">
        {children}
      </div>
    </section>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-cyan-200">
      {children}
    </pre>
  );
}

export default function Methodology() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-200">
      <header className="mx-auto flex max-w-3xl items-center gap-4 px-5 py-5">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-slate-950">
            ₹
          </span>
          {PROJECT.name}
        </Link>
        <nav className="ml-auto flex gap-1 text-sm text-slate-300">
          <Link href="/screener" className="rounded-md px-3 py-1.5 hover:bg-white/5">
            Screener
          </Link>
          <a href={PROJECT.github} target="_blank" rel="noopener noreferrer" className="rounded-md px-3 py-1.5 hover:bg-white/5">
            GitHub
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-20">
        <div className="py-8">
          <Link href="/" className="text-sm text-slate-400 hover:text-white">
            ← Back to home
          </Link>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Methodology
          </h1>
          <p className="mt-3 text-slate-400">
            How the data was built, how portfolios are scored, and the design
            decisions behind them. The goal throughout was reproducibility:
            anyone re-running the pipeline should get the same numbers this app
            shows.
          </p>
        </div>

        <Section id="static" title="Why static JSON, not a live API or database">
          <p>
            The dataset is <em>frozen</em>: the simulation window (June 2021 →
            June 2026) and the June-2021 fundamentals never change. A live
            database or third-party API at runtime would add latency, API-key
            management, rate limits, and a source of non-determinism — with zero
            benefit, because the numbers are fixed.
          </p>
          <p>
            Instead, a Python pipeline fetches and verifies everything once and
            writes pre-computed JSON (<code className="text-cyan-200">prices.json</code>,{" "}
            <code className="text-cyan-200">financials.json</code>,{" "}
            <code className="text-cyan-200">snapshot-2021.json</code>,{" "}
            <code className="text-cyan-200">ideal-portfolios.json</code>,{" "}
            <code className="text-cyan-200">nifty.json</code>). Next.js statically
            generates all 50 stock pages from it. The result is fast, free to
            host, and fully reproducible.
          </p>
        </Section>

        <Section id="corporate-actions" title="Corporate actions: why auto_adjust=True matters">
          <p>
            Prices were fetched with yfinance using{" "}
            <code className="text-cyan-200">auto_adjust=True</code>, which
            back-adjusts historical prices for stock <strong>splits and bonus
            issues</strong>. Without it, a 1:1 bonus or a 5:1 split shows up as a
            fake ~50–80% overnight crash, corrupting every return calculation.
          </p>
          <p>
            Splits alone aren&apos;t enough. <strong>Demergers</strong> are not
            handled by auto-adjust: when Tata Motors split into its passenger-
            and commercial-vehicle entities in 2025, the surviving ticker&apos;s
            price dropped by the spun-off value. That return was reconstructed by
            adding the demerged entity&apos;s value back, so a June-2021 holder&apos;s
            true outcome is represented. Market caps use the real June-2021 price
            × historical shares outstanding (split factor applied), not current
            shares.
          </p>
        </Section>

        <Section id="fundamentals" title="Fundamentals & the eligible-stock screen">
          <p>
            FY2015–FY2021 financials and June-2021 ratios were scraped from
            screener.in with polite rate-limiting and on-disk caching, then
            cross-checked. Ten metrics are stored per stock: ROE, Debt/Equity,
            Dividend Yield, Operating Margin (a GPM proxy — screener does not
            expose gross margin), Revenue &amp; Net-Profit 3-yr CAGR, EPS, CFO,
            P/E and Promoter Holding.
          </p>
          <p>
            A stock is eligible for an ideal portfolio only if it{" "}
            <strong>beat the Nifty 50 (+{PROJECT.niftyReturn}%)</strong> and has
            sound fundamentals — ROE ≥ 10% backed by a strong rest-of-profile
            (positive cash flow, reasonable leverage, no loss years, no
            governance flag). Bank/NBFC negative operating cash flow is treated
            as structural loan-book growth, not distress.
          </p>
        </Section>

        <Section id="scoring" title="The dual scoring system">
          <p>
            A submitted portfolio is scored out of 10 as an equal blend of how it{" "}
            <em>performed</em> and the <em>quality</em> of what was picked:
          </p>
          <Formula>{`Final = 0.5 × Performance  +  0.5 × Fundamentals`}</Formula>
          <p>
            <strong>Performance (0–10)</strong> compares the participant&apos;s
            total return to that scenario&apos;s ideal-portfolio return (both
            indexed to 100 at June 2021):
          </p>
          <Formula>{`relative = participant_return / ideal_return
10 if relative ≥ 1.0   (capped — you can't beat "perfect")
 9 if 0.90–0.99 ... down to 1 if 0–0.19
 0 if the portfolio lost money`}</Formula>
          <p>
            Grading against the <em>ideal portfolio</em> rather than the Nifty
            rewards getting close to the best achievable answer for that risk
            profile, which is a fairer and more instructive target than a flat
            index. The Nifty line still appears on the chart as a familiar
            reference.
          </p>
          <p>
            <strong>Fundamentals (0–10)</strong> averages a per-stock rubric over
            the chosen holdings:
          </p>
          <Formula>{`ROE        >25% = 3 | 15–25% = 2 | 5–15% = 1 | else 0
D/E        <0.3 = 2 | 0.3–1.0 = 1 | >1.0 = 0   (banks/NBFC: 1 if ROE+CFO healthy)
CFO        positive = 2 | negative = 0
Consistency rev & profit CAGR positive + EPS tracks profit = 2 | partial 1 | 0
Promoter   >50% = 1 | 25–50% = 0.5 | <25% / none = 0
Any "bad-list" trap stock => 0 for that holding, regardless of metrics.`}</Formula>
          <p>
            The <strong>50/50 weight</strong> is deliberate: rewarding returns
            alone would let a lucky punt win, while rewarding fundamentals alone
            would ignore the point of investing. Splitting them teaches that a
            good process and a good outcome are different things — and that the
            best portfolios score on both.
          </p>
        </Section>

        <Section id="limitations" title="Limitations (stated honestly)">
          <ul className="list-disc space-y-2 pl-5 text-slate-300">
            <li>
              Returns are <strong>price returns, not total returns</strong> —
              dividends received are not reinvested into the performance figure
              (dividend yield is shown separately as a fundamental).
            </li>
            <li>
              The universe is a curated 50 stocks (40 quality + 10 deliberate
              weak picks), not the full market — it is a teaching set, not an
              index.
            </li>
            <li>
              Whole-share quantities and a fixed monthly price grid mean the
              backtest is a close approximation, not a tick-level simulation.
            </li>
            <li>
              Ideal portfolios are one defensible construction per scenario, not
              the unique mathematical optimum.
            </li>
          </ul>
        </Section>

        <div className="border-t border-white/10 pt-8 text-sm text-slate-500">
          Machine-readable project stats:{" "}
          <Link href="/api/stats" className="text-cyan-300 hover:text-cyan-200">
            /api/stats
          </Link>
        </div>
      </main>
    </div>
  );
}
