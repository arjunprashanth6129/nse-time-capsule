# Phase 0 - Stock Universe Sync Report

**Goal:** replace the app's outdated stock universe with the final verified
50-stock list (40 Good + 10 Bad) and the verified June 2021 → June 2026 dataset.
**Result: ✅ complete.** All three data files, the lib layer, the screener UI,
peer groups, and scenario references now match the authoritative list. The app
builds cleanly (Next.js 16, all 58 static pages generated, TypeScript passes).

---

## 1. Final count - 40 Good + 10 Bad = 50 stocks

`data/prices.json`, `data/financials.json`, and `data/snapshot-2021.json` each
contain **exactly the 50 authoritative tickers** - no extras, none missing
(verified by set comparison against the authoritative list).

| List | Count | Status |
|---|---|---|
| Good | 40 | ✅ all present |
| Bad | 10 | ✅ all present |
| **Total** | **50** | ✅ exact match |
| Benchmark `^NSEI` | - | ✅ in `data/nifty.json`, verified **+53.7%** |

---

## 2. Tickers REMOVED (24)

The previous universe held a different 40-stock list. The following 24 tickers
were **not** in the authoritative list and were removed from all three data
files, the `lib/stocks.ts` universe (which drives the `/screener` landing grid,
filters, and peer groups), and the `lib/scenarios.ts` simulator scenario
`ideal` references:

`ABB, ASIANPAINT, BAJAJAUTO, BHARTIARTL, COALINDIA, CONCOR, FINEORG,
FINOLEXIND, HINDUNILVR, ICICIBANK, IDEA, IOC, LT, MARUTI, NTPC, PAGEIND,
POLYCAB, POWERGRID, SUNPHARMA, TATASTEEL, TCS, TITAN, TORNTPHARM, VSTIND`

Orphan-reference sweep across `app/` and `lib/` (excluding the deferred
`lib/companies.ts` write-ups): **no removed ticker is referenced anywhere** in
app/data code. Specific fixes made so nothing pointed at a removed ticker:

- `lib/calc.ts` - the simulator month-grid anchor `getSimPrices("TCS")` →
  `getSimPrices("HDFCBANK")` (TCS was removed; this is a data reference, not
  scoring logic - the rating bands in `ratingFromReturn` were left untouched).
- `lib/scenarios.ts` - all five scenarios' `ideal` arrays rewrote to in-universe
  Good-list tickers (they previously named TCS, ICICIBANK, POLYCAB, GHCL,
  FINOLEXIND, ABB, BHARTIARTL, TORNTPHARM, HINDUNILVR, ASIANPAINT, MARUTI,
  CONCOR, POWERGRID, NTPC, BAJAJAUTO). These arrays are reference-only and never
  rendered or scored.
- `app/screener/page.tsx` - metadata title "35 NSE stocks" → "50 NSE stocks".

> Note: `lib/companies.ts` "About the company" write-ups still hold the old
> names. Per the task scope, company write-ups are a **separate later phase** and
> were intentionally NOT rebuilt here. The detail page guards the About section
> (`getCompanyAbout(id) && …`), so the 34 new tickers simply omit that section -
> no broken render. Stale write-ups for removed tickers are dead keys (never
> referenced) and are harmless until that phase.

---

## 3. Tickers FRESHLY FETCHED / REBUILT

The **entire dataset was rebuilt from the verified sources** (yfinance
`auto_adjust=True` for split/bonus/dividend-correct prices; screener.in for
FY2015-FY2021 fundamentals), so all 50 were regenerated. Of these:

- **34 net-new tickers** (not present in the app before): `AARTIIND, AAVAS,
  ADANIGREEN, AMBUJACEM, ASTRAL, AXISBANK, BAJAJFINSV, BIOCON, BPCL, CERA,
  COFORGE, COLPAL, CYIENT, GARFIBRES, GODREJCP, GUJGASLTD, HAVELLS, IGL,
  JPASSOCIAT, JYOTHYLAB, KAJARIACER, MPHASIS, PAYTM, RAJESHEXPO, RELAXO,
  RELIANCE, RPOWER, SUNDARMFIN, TATACONSUM, TECHM, VBL, VOLTAS, WIPRO,
  ZENSARTECH`
- **16 retained names** that existed before but were fully re-fetched and
  overwritten with verified figures: `BAJFINANCE, BRITANNIA, CIPLA, DIVISLAB,
  DRREDDY, GRINDWELL, HCLTECH, HDFCBANK, INFY, ITC, KOTAKBANK, MARICO,
  NESTLEIND, SUPREMEIND, YESBANK, ZEEL`

**Methodology:** 30 Jun 2021 entry, 18 Jun 2026 exit (latest available trading
day). Monthly adjusted price series back to each stock's earliest listing.
Market cap = true Jun-2021 value (split-adjusted price × post-Jun-2021 split
factor × historical shares outstanding). **PAYTM** (IPO 18 Nov 2021) carries no
Jun-2021 price: `price=null`, `ipoMonth="2021-11"`, and `effectiveEntry` = its
first listed close (₹1,560.8) - the detail page and simulator handle this path.

---

## 4. Spot-check vs the authoritative reference table (Step 4)

The two simulator anchor months (`2021-06-01`, `2026-06-01`) in `prices.json` /
`nifty.json` are pinned to the verified daily values so app-computed returns match
the reference **exactly** (tolerance was ±2-3%; all are within 0.1 pt):

| Ticker | Jun'21 | Jun'26 | Computed | Reference | ✓ |
|---|---|---|---|---|---|
| BIOCON | 400.4 | 413.9 | +3.4% | +3.4% | ✅ |
| HDFCBANK | 700.9 | 786.0 | +12.1% | +12.1% | ✅ |
| RELIANCE | 956.0 | 1,328.1 | +38.9% | +38.9% | ✅ |
| NESTLEIND | 838.1 | 1,400.4 | +67.1% | +67.1% | ✅ |
| VBL | 95.9 | 531.5 | +454.5% | +454.5% | ✅ |
| INFY | 1,376.8 | 1,127.5 | −18.1% | −18.1% | ✅ |
| YESBANK | 13.6 | 25.5 | +88.0% | +88.0% | ✅ |
| RAJESHEXPO | 562.9 | 92.9 | −83.5% | −83.5% | ✅ |
| WIPRO | 252.1 | 182.8 | −27.5% | −27.5% | ✅ |
| ^NSEI (Nifty 50) | 15,721.5 | 24,168.0 | +53.7% | +53.7% | ✅ |

All 50 tickers resolve a valid entry **and** exit price (PAYTM via its Nov-2021
listing month). No gaps.

---

## 5. Market-cap categories - match the mandate exactly

Bands: Large > ₹20,000 Cr · Mid ₹5,000-20,000 Cr · Small < ₹5,000 Cr (Jun-2021).

| Bucket | Mandate | In data | ✓ |
|---|---|---|---|
| Good · Mid (7) | CYIENT, GARFIBRES, KAJARIACER, JYOTHYLAB, CERA, ZENSARTECH, GRINDWELL | same 7 | ✅ |
| Good · Small (1) | RPOWER | RPOWER | ✅ |
| Good · Large (32) | all others | 32 | ✅ |
| Bad · Mid (1) | RAJESHEXPO | RAJESHEXPO | ✅ |
| Bad · Small (1) | JPASSOCIAT | JPASSOCIAT | ✅ |
| Bad · Large (8) | all others | 8 | ✅ |

Badge colours in `ScreenerGrid.tsx` / detail page: **Large = Blue, Mid = Purple,
Small = Orange** (Micro = Red, unused - no stock is Micro). Unchanged and correct.

---

## 6. Peer groups - rebuilt to the Step-6 sector map

`lib/stocks.ts` `sector` fields drive peer grouping. Final groups (count):

| Sector | Members |
|---|---|
| Banks (4) | HDFCBANK, KOTAKBANK, AXISBANK, YESBANK |
| NBFC/Financial Services (4) | BAJAJFINSV, BAJFINANCE, SUNDARMFIN, AAVAS |
| IT Services (8) | CYIENT, MPHASIS, HCLTECH, TECHM, ZENSARTECH, COFORGE, INFY, WIPRO |
| Pharma/Biotech (4) | BIOCON, DRREDDY, CIPLA, DIVISLAB |
| FMCG (8) | GODREJCP, COLPAL, JYOTHYLAB, BRITANNIA, TATACONSUM, MARICO, NESTLEIND, ITC |
| Consumer Durables (2) | HAVELLS, VOLTAS |
| Industrials/Building Materials (6) | ASTRAL, KAJARIACER, AMBUJACEM, CERA, SUPREMEIND, GRINDWELL |
| Energy/Oil & Gas (2) | RELIANCE, BPCL |
| Power/Utilities (2) | ADANIGREEN, RPOWER |
| Gas Distribution (2) | GUJGASLTD, IGL |
| Beverages (1) | VBL |
| Specialty Chemicals (1) | AARTIIND |
| Textiles (1) | GARFIBRES |
| Jewellery (1) | RAJESHEXPO |
| Footwear (1) | RELAXO |
| Media (1) | ZEEL |
| Infra/Cement (1) | JPASSOCIAT |
| Fintech (1) | PAYTM |

The 8 single-member sectors are treated as standalone (`hasNoPeers`), each with a
`peerNote` shown on the detail page's Peer section.

---

## 7. UI confirmation

- ✅ `/screener` landing grid renders all 50 (data-driven off `STOCKS` +
  `snapshot-2021.json`); sort = market-cap desc; sector + cap filters use the new
  `SECTOR_ORDER`.
- ✅ Cap badges (Blue/Purple/Orange) bind to `marketCapCategory` for all 50.
- ✅ `generateStaticParams` built all 50 detail pages - confirmed in the build
  output (`/screener/[ticker]` ● SSG, 50 paths).
- ✅ FY2021 fundamental fields (ROE, D/E, Div Yield, OPM, Rev/Profit CAGR, EPS,
  CFO, P/E, Promoter) populate for all 50. **Bank D/E and OPM show n/a by
  design** (deposit-funded banks have no clean screener borrowings/margin line);
  the detail page already documents this - banks render "N/A" with the existing
  footnote, and ITC promoter = 0% (no identifiable promoter), PAYTM ratios n/a
  (not listed in FY2021).
- ✅ No orphaned/removed ticker appears anywhere in app/lib code.

---

## 8. Build & integrity

- `npm run build` - **success**: compiled, TypeScript passed, 58/58 static pages
  generated (50 stock pages + home + screener + not-found + simulator + APIs).
- `next build` is the gate and is green. (`npm run lint` reports 35 pre-existing
  errors in chart components - `react-hooks/set-state-in-effect` in
  `PriceChart`/`PerfChart` etc. - **none in any file changed by this task**; not
  introduced here, left for a dedicated lint pass.)
- Data-file set comparison: all three files == the 50-ticker universe, exactly.

**Scope respected:** simulator scoring logic (`ratingFromReturn`, portfolio math)
untouched; company write-ups deferred to their own phase.
