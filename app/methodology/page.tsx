import Link from "next/link";
import { PROJECT } from "@/lib/stats";

export const metadata = {
  title: "Methodology",
  description:
    "How the data was built, how portfolios are scored, and the design decisions behind the MarketMind simulator.",
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
            Back to home
          </Link>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Methodology
          </h1>
          <p className="mt-3 text-slate-400">
            How the data was built, how a portfolio gets scored, and why I made
            the calls I did. The thread running through all of it is
            reproducibility: re-run the pipeline and you should get the same
            numbers this app shows.
          </p>
        </div>

        <Section id="static" title="Why static JSON instead of a database">
          <p>
            The dataset is frozen. The simulation window (June 2021 to June 2026)
            and the June-2021 fundamentals are never going to change, so there's
            nothing for a live database or third-party API to do at runtime
            except add latency, an API key to manage, and a way for results to
            quietly drift.
          </p>
          <p>
            So the Python pipeline fetches and verifies everything once, then
            writes plain JSON (<code className="text-cyan-200">prices.json</code>,{" "}
            <code className="text-cyan-200">financials.json</code>,{" "}
            <code className="text-cyan-200">snapshot-2021.json</code>,{" "}
            <code className="text-cyan-200">ideal-portfolios.json</code>,{" "}
            <code className="text-cyan-200">nifty.json</code>). Next.js statically
            generates all 50 stock pages from those files. It's fast, costs
            nothing to host, and anyone can reproduce it.
          </p>
        </Section>

        <Section id="corporate-actions" title="Corporate actions, and why auto_adjust=True matters">
          <p>
            Prices were pulled with yfinance using{" "}
            <code className="text-cyan-200">auto_adjust=True</code>, which
            back-adjusts old prices for stock splits and bonus issues. Skip it and
            a 1:1 bonus or a 5:1 split looks like a 50 to 80% overnight crash,
            which then poisons every return you calculate.
          </p>
          <p>
            Splits are the easy case. Demergers aren't, and auto-adjust doesn't
            touch them. When Tata Motors split into its passenger- and
            commercial-vehicle businesses in 2025, the surviving ticker fell by
            the value of the part that left. I reconstructed that by adding the
            demerged entity's value back, so the figure reflects what someone who
            held since June 2021 actually ended up with. Market caps use the real
            June-2021 price times the shares outstanding back then, with the split
            factor applied, not today's share count.
          </p>
        </Section>

        <Section id="fundamentals" title="Fundamentals and the eligible-stock screen">
          <p>
            FY2015 to FY2021 financials and the June-2021 ratios came from
            screener.in, scraped politely (a 2-second gap between requests, with
            everything cached to disk) and then cross-checked. Ten metrics are
            stored per stock: ROE, Debt/Equity, Dividend Yield, Operating Margin
            (a stand-in for gross margin, which screener doesn't expose), Revenue
            and Net-Profit 3-year CAGR, EPS, CFO, P/E, and Promoter Holding.
          </p>
          <p>
            A stock only makes it into an ideal portfolio if it beat the Nifty 50
            (+{PROJECT.niftyReturn}%) and has fundamentals to back it up: ROE of at
            least 10%, but only when the rest of the picture holds up too
            (positive cash flow, sensible leverage, no loss years, no governance
            flag). For a bank or NBFC, negative operating cash flow is normal when
            the loan book is growing, so I treat that as expected rather than a
            warning sign.
          </p>
        </Section>

        <Section id="scoring" title="The dual scoring system">
          <p>
            A submitted portfolio is scored out of 10 as an even split between how
            it performed and how good the picks were:
          </p>
          <Formula>{`Final = 0.5 x Performance  +  0.5 x Fundamentals`}</Formula>
          <p>
            <strong>Performance (0-10)</strong> measures the participant's total
            return against that scenario's ideal-portfolio return, both indexed to
            100 at June 2021:
          </p>
          <Formula>{`relative = participant_return / ideal_return
10 if relative >= 1.0   (capped; you can't beat "perfect")
 9 if 0.90 to 0.99 ... down to 1 if 0 to 0.19
 0 if the portfolio lost money`}</Formula>
          <p>
            I grade against the ideal portfolio rather than the Nifty on purpose.
            A flat index is the same target for everyone; the ideal portfolio is
            the best sensible answer for that specific risk profile, which is a
            fairer and more useful thing to aim at. The Nifty line still shows on
            the chart as a familiar reference point.
          </p>
          <p>
            <strong>Fundamentals (0-10)</strong> is the average of a per-stock
            rubric across the holdings:
          </p>
          <Formula>{`ROE        >25% = 3 | 15-25% = 2 | 5-15% = 1 | else 0
D/E        <0.3 = 2 | 0.3-1.0 = 1 | >1.0 = 0   (banks/NBFC: 1 if ROE+CFO healthy)
CFO        positive = 2 | negative = 0
Consistency rev & profit CAGR positive + EPS tracks profit = 2 | partial 1 | 0
Promoter   >50% = 1 | 25-50% = 0.5 | <25% / none = 0
A "trap" stock scores 0 here regardless of its metrics.`}</Formula>
          <p>
            The 50/50 weighting is deliberate. Score on returns alone and a lucky
            punt wins; score on fundamentals alone and you reward a good-looking
            balance sheet even if the bet went nowhere. Splitting them is how you
            teach that a good process and a good result are two different things,
            and that the best portfolios manage both.
          </p>
        </Section>

        <Section id="limitations" title="What it doesn't do">
          <ul className="list-disc space-y-2 pl-5 text-slate-300">
            <li>
              Returns are price returns, not total returns. Dividends show up as a
              fundamental metric but aren't reinvested into the performance number.
            </li>
            <li>
              The universe is a hand-picked 50 stocks (40 solid names plus 10
              deliberate weak ones), so it's a teaching set, not an index.
            </li>
            <li>
              Holdings are whole shares on a monthly price grid, which makes the
              backtest a close approximation rather than a tick-by-tick model.
            </li>
            <li>
              Each ideal portfolio is one reasonable construction for its
              scenario, not a proven mathematical optimum.
            </li>
          </ul>
        </Section>

        <div className="border-t border-white/10 pt-8 text-sm text-slate-500">
          Machine-readable project stats live at{" "}
          <Link href="/api/stats" className="text-cyan-300 hover:text-cyan-200">
            /api/stats
          </Link>
          .
        </div>
      </main>
    </div>
  );
}
