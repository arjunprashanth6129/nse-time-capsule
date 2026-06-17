# NSE Time Capsule — June 2021

A two-part **financial-literacy teaching tool** for an Indian-stocks (NSE) classroom exercise, built as a single Next.js app.

- **Part 1 — `/screener` (public):** a screener.in-style company page for each of **35 NSE stocks, frozen at June 2021**. Snapshot ratios, year-by-year financials, a Jan 2000 – June 2021 price chart, and peer comparison. Participants get a genuine "track record" view and **see nothing beyond June 2021** before they pick.
- **Part 2 — `/simulator` (host only, password-protected):** pick a life scenario, enter a team's 8-stock portfolio, and reveal **indexed performance over June 2021 → June 2026** with a Nifty 50 overlay, a 1–10 rating, and a per-holding breakdown.

> **Everything uses a FIXED, reproducible window — Jan 2000 to June 2026 — anchored to a fixed June-2026 reference date.** Nothing is "live"/"today"; results never change with the calendar. Prices are split/bonus-adjusted so the screener entry price and the simulator returns stay internally consistent.

---

## Local setup

```bash
npm install
cp .env.example .env.local      # then set SIMULATOR_PASSWORD
npm run dev                     # http://localhost:3000
```

- `/` — landing page
- `/screener` — public screener (all 35 stocks + per-stock detail)
- `/simulator` — host-only; unlock with `SIMULATOR_PASSWORD`

Production build: `npm run build && npm start`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `SIMULATOR_PASSWORD` | Shared password gating `/simulator`. Set in `.env.local` locally and in Vercel project settings for production. |

## Routes

| Route | Access | What it shows |
| --- | --- | --- |
| `/screener` | Public | Filterable grid of 35 stocks (sector / market-cap / search) |
| `/screener/[ticker]` | Public | Header chips, Jan 2000–June 2021 price chart, P&L (FY2015–21) with CAGR rows + EPS-consistency note, cash-flow table, peer comparison |
| `/simulator` | Password | Scenario selector, 8-slot portfolio entry with live budget, indexed performance chart + Nifty overlay, 1–10 rating, holdings breakdown |
| `/api/simulator/login`, `/api/simulator/logout` | — | Cookie session for the gate |

## Data layer (`/data`, static JSON)

| File | Contents |
| --- | --- |
| `prices.json` | `id → [{date:"YYYY-MM", close}]` — monthly closes, Jan 2000 – June 2026, split/bonus-adjusted |
| `nifty.json` | Nifty 50 (`^NSEI`) monthly closes (Yahoo history begins 2007; the simulator only needs 2021+) |
| `financials.json` | `id → {FY2015..FY2021 → {revenue, netProfit, eps, cfo}}` |
| `snapshot-2021.json` | `id → {price, marketCap(+category), pe, divYield, roe, de, promoterHolding, opm, …}` for June 2021 |
| `missing-data-report.md` | Per-field coverage / gaps, for manual review |

### Re-running the data-fetch scripts

The data is committed, so the app runs without re-fetching. To regenerate it:

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install yfinance requests beautifulsoup4 lxml

cd scripts
python fetch_prices.py        # prices.json + nifty.json  (yfinance)
python fetch_financials.py    # screener.in -> data/screener_raw.json (+ caches HTML to scripts/cache/)
python build_snapshot.py      # financials.json + snapshot-2021.json + missing-data-report.md
```

`scripts/stocks.py` is the single source of truth for the 35 tickers (mirrored in `lib/stocks.ts`). The scraper respects rate limits (1.5 s delays) and caches each response so re-runs don't re-fetch.

## Data coverage (honest notes)

- **Universe:** 35 NSE stocks. The June-2021 revision swapped out WIPRO, M&M, DABUR, PIDILITIND, AXISBANK and swapped in five deliberately weak/"trap" picks — IDEA (Vodafone Idea), ZEEL (Zee), PAYTM, YESBANK, PVRINOX — which are not a strong fit for any scenario.
- **Prices:** 100% real for all 35 stocks + Nifty (yfinance). Some series begin at the real listing date (Coal India 2010, PowerGrid 2007, …). Tata Motors uses **TMPV.NS** (inherited the continuous history after the 2025 demerger).
- **Annual financials FY2015–FY2021:** real (screener.in), full 7-year table — the June-2021 anchor removes the old FY2010–14 gap. PAYTM lacks FY2017–FY2018 (pre-listing).
- **June-2021 snapshot ratios:** real — derived from FY2021 screener financials + the real split/bonus-adjusted June-2021 close (P/E, market cap, dividend yield, ROE, D/E). Loss-makers in FY2021 (IDEA, PAYTM, YESBANK, PVRINOX, plus Tata Motors & Bharti Airtel) correctly show no P/E; banks show no meaningful D/E; ITC shows no promoter. **Vodafone Idea (IDEA)** has **negative net worth** in FY2021, so ROE/D/E are intentionally blank.
- **PAYTM:** not listed as of June 2021 (IPO 18 Nov 2021). Its June-2021 snapshot ratios are N/A and the price chart shows a "not listed" notice; the **simulator uses its first listed close (Nov 2021) as the effective entry**, flagged in the UI (approach (a) from the brief).
- **Promoter holding:** screener's free shareholding table only reaches ~FY2023, so the earliest available figure is shown as a labelled proxy.
- **Gross margin:** not exposed by screener; **OPM% (operating margin)** is shown as the available margin metric.

See `data/missing-data-report.md` for the per-stock breakdown.

## Deploy to Vercel

1. Push to GitHub (done).
2. Import the repo at [vercel.com/new](https://vercel.com/new) — it auto-detects Next.js, no special config.
3. Add **`SIMULATOR_PASSWORD`** under **Settings → Environment Variables**.
4. Deploy. `/screener` is public; `/simulator` requires the password.

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · recharts · static JSON data · cookie-based password gate. No database.
