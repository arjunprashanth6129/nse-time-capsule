# MarketMind — Financial Literacy Simulator

[![Live Demo](https://img.shields.io/badge/Live-Demo-000?logo=vercel)](https://nse-time-capsule.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-data_pipeline-3776ab?logo=python&logoColor=white)](https://www.python.org)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel)](https://vercel.com)

**Live:** https://nse-time-capsule.vercel.app

A full-stack backtesting simulator that teaches **fundamental analysis** through
hands-on portfolio construction, built on **independently-verified** NSE
historical data.

---

## Overview

Most financial-literacy tools either show you a textbook or let you gamble with
fake money. MarketMind does something more rigorous: it freezes the Indian
market at **June 2021**, lets a learner research 50 real companies exactly as
they looked then (no hindsight), and then has them build a portfolio for a
specific life situation — a fresh graduate, a young family, a retired couple.
The portfolio is **backtested against real June 2021 → June 2026 prices** and
scored on two axes: how it actually performed *and* the fundamental quality of
what was picked.

The interesting engineering problem isn't the UI — it's the **data integrity**.
Indian stocks over this window went through splits, bonus issues, and even a
full corporate demerger (Tata Motors). A naive price fetch produces returns that
are silently wrong by 50–90%. Every number in this app was recomputed from
split/bonus-adjusted data and cross-checked, then frozen into a static layer so
the results are perfectly reproducible.

It was built for, and delivered as, a live **Financial Literacy Project** teaching
session — the simulator is the host-run "reveal" at the end where each team sees
how their picks did.

## Features

- **Stock screener** (`/screener`) — 50 NSE companies as of June 2021: snapshot
  ratios, FY2015–FY2021 annual financials, a 20-year price chart, peer
  comparison, and a neutral company write-up. No data leaks past June 2021, so
  participants get a genuine "track record" view before they choose.
- **Portfolio simulator** (`/simulator`, host-gated) — pick a scenario, build a
  5-stock portfolio within a capital budget, and reveal indexed performance vs
  the scenario's *ideal portfolio* and the Nifty 50, plus a 0–10 score.
- **Dual scoring engine** — 50% performance (vs the ideal portfolio), 50%
  fundamental quality (a transparent per-stock rubric).
- **5 verified ideal portfolios** — one per scenario, each constructed from a
  screened "eligible pool" and each verified to beat the Nifty 50.
- **Reproducible data pipeline** — Python scripts fetch, verify, and freeze the
  entire dataset into static JSON.

## Architecture

```
   Data Pipeline (Python)          Static JSON Layer           Next.js Frontend            Vercel
 ┌────────────────────────┐     ┌────────────────────┐     ┌─────────────────────┐     ┌──────────┐
 │ yfinance (auto_adjust)  │ ──▶ │ prices.json         │ ──▶ │ /                   │     │  SSG: 50 │
 │ screener.in (cached)    │     │ financials.json     │     │ /screener  (SSG)    │ ──▶ │  stock   │
 │ corporate-action fixes  │     │ snapshot-2021.json  │     │ /screener/[ticker]  │     │  pages   │
 │ eligibility + portfolio │     │ ideal-portfolios.json│    │ /simulator (SSR)    │     │  + edge  │
 │ construction            │     │ nifty.json          │     │ /api/stats (server) │     │  funcs   │
 └────────────────────────┘     └────────────────────┘     └─────────────────────┘     └──────────┘
        (run once)                  (committed, frozen)        scoring: TypeScript          deploy
```

The ideal-portfolio data is **server-only** (read solely by the scoring action)
so the "answer key" never ships to the client.

## Data Methodology

- **Prices** — `yfinance` with `auto_adjust=True`, which back-adjusts for splits
  and bonus issues. Without it, a 5:1 split reads as an 80% crash. Demergers
  (e.g. Tata Motors → TMPV + TMCV, 2025) aren't covered by auto-adjust and were
  reconstructed by hand so a buy-and-hold holder's true outcome is represented.
- **Fundamentals** — scraped from screener.in (FY2015–FY2021) with a 2-second
  rate limit and on-disk HTML caching; 10 metrics stored per stock.
- **Benchmark** — Nifty 50 (`^NSEI`) returned **+53.7%** over the window; this is
  the line every portfolio is measured against.
- **Why static JSON, not a live database** — the dataset is fixed at June 2021,
  so a runtime DB or API adds latency, keys, and non-determinism for zero
  benefit. Pre-computed JSON is faster, free to host, and fully reproducible.

Full write-up: **[/methodology](https://nse-time-capsule.vercel.app/methodology)**.

## Scoring System

```
Final Score (0–10) = 0.5 × Performance + 0.5 × Fundamentals
```

**Performance (0–10)** — participant return vs the scenario's ideal-portfolio
return, both indexed to 100 at June 2021:

```
relative = participant_return / ideal_return
10 if relative >= 1.0   (capped)      0 if the portfolio lost money
 9 if 0.90–0.99   ...   1 if 0–0.19
```

**Fundamentals (0–10)** — averaged over the chosen holdings:

| Metric | Points |
|---|---|
| ROE | >25% = 3 · 15–25% = 2 · 5–15% = 1 · else 0 |
| Debt / Equity | <0.3 = 2 · 0.3–1.0 = 1 · >1.0 = 0 (banks/NBFC: 1 if ROE+CFO healthy) |
| Cash flow from ops | positive = 2 · negative = 0 |
| Revenue/profit consistency | both CAGR +ve & EPS tracks profit = 2 · partial = 1 · declining = 0 |
| Promoter holding | >50% = 1 · 25–50% = 0.5 · <25% / none = 0 |

A deliberate "trap" stock scores **0** on the fundamental component regardless of
the rubric. The 50/50 split teaches that a good *outcome* and a good *process*
are different things.

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Next.js (App Router), TypeScript | SSG for the 50 stock pages; type-safety across the data layer |
| Styling | Tailwind CSS | utility-first, zero component-library bloat |
| Charts | Recharts | declarative SVG line/area charts |
| Data pipeline | Python — yfinance, BeautifulSoup, pandas | best ecosystem for market data + scraping |
| Data store | Static JSON | dataset is fixed at June 2021 → a DB adds complexity with no benefit; static files are faster and reproducible |
| Deployment | Vercel | first-class Next.js SSG/SSR + edge functions |

## Project Impact

Built for and delivered as a live **Financial Literacy Project** session: teams
researched companies on the screener, constructed portfolios for assigned
investor personas, and the host revealed their backtested performance and score
live — teaching fundamental analysis through real outcomes rather than theory.

## Local Setup

```bash
git clone https://github.com/arjunprashanth6129/nse-time-capsule
cd nse-time-capsule
npm install
cp .env.example .env.local      # set SIMULATOR_PASSWORD for the host gate
npm run dev                     # http://localhost:3000
```

| Env var | Purpose |
|---|---|
| `SIMULATOR_PASSWORD` | shared password gating the host-only `/simulator` page |

## Data Pipeline

The Python scripts (repo root) regenerate the static data layer. They require a
virtualenv with `yfinance`, `pandas`, `beautifulsoup4`, `lxml`, `requests`:

```bash
python yf_fetch.py            # adjusted prices, returns, splits, shares, dividends
python screener_fetch.py      # screener.in FY2015–FY2021 fundamentals (cached)
python build_financials.py    # -> data/financials.json
python build_snapshot.py      # -> data/snapshot-2021.json
python fetch_prices.py        # monthly adjusted series -> data/prices.json + nifty.json
python build_portfolios.py    # eligibility screen + 5 ideal portfolios
```

## License

MIT
