# Final Verified Stock Universe — Independent Rebuild

**Window:** 30 June 2021 → latest available 2026 trading day. **Sources:** prices/returns/splits/historical shares/dividends from yfinance (`auto_adjust=True` for returns); FY2021 (Mar-2021, or Dec-2020 for Dec-fiscal-year companies) fundamentals scraped from screener.in (consolidated where available). Every number recomputed from source — nothing carried over from prior reports.

- **2026 price date used:** 2026-06-18 (latest available; 2026 fiscal year incomplete).
- **Market cap basis:** true Jun-2021 market cap = (split-adjusted Jun-2021 price × cumulative split factor for splits after 30-Jun-2021) × historical shares outstanding at Jun-2021 (`get_shares_full`). This reconstructs the *actual* Jun-2021 market value (not current shares).
- **EPS / P-E basis:** screener historical EPS is split-adjusted to current basis; the EPS column shows as-reported FY2021 EPS (= screener EPS × post-2021 split factor); P/E = Jun-2021 price ÷ FY2021 EPS (both on the same adjusted basis, so internally consistent).
- **GPM caveat:** screener.in does not disclose a separate gross-profit line; the **GPM column uses Operating Profit Margin (OPM%) as a documented proxy.** True gross margin for FY2021 was not sourceable (logged in missing-data-report.md). Banks have no margin row → n/a.
- **ROE** = FY2021 net profit ÷ FY2021 year-end equity (equity capital + reserves). **D/E** = FY2021 borrowings ÷ equity; for the four banks screener has no clean borrowings line (deposit-funded), so D/E is marked n/a.
- **Dividend yield** = sum of dividends with ex-date in the trailing 12 months to 30-Jun-2021 ÷ Jun-2021 price. A few names (ITC, BRITANNIA) read high because COVID-delayed FY2020 final dividends and special dividends fell inside that 12-month window — it is a true ex-date TTM figure but timing-distorted; the steady-state yield is lower.

## 3. Verified Nifty 50 (^NSEI) benchmark

| Index | 2021-06-30 (adj) | 2026-06-18 (adj) | Total % Return |
|---|---|---|---|
| Nifty 50 (^NSEI) | 15,721.5 | 24,168.0 | **+53.7%** |

> Benchmark to beat: **+53.7%** over the five-year window.

## 1. "Good" list — 40 stocks (every column from own fetch)

| Ticker | Company Name | Sector | Jun-2021 Mkt Cap (Cr) | Cap Cat | Jun-2021 Price | Jun-2026 Price | Total % Return | Corporate Actions | ROE % | D/E | Div Yield % | GPM (OPM proxy) % | Rev 3y CAGR % | NP 3y CAGR % | EPS (FY21) | EPS Consistency | CFO (Cr) | P/E (Jun21) | Promoter % |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BIOCON | Biocon Limited | Pharma/Biotech | 48,558 | Large | 400.4 | 413.9 | 3.4 | None | 11.1 | 0.59 | 0.00 | 22 | 20.1 | 23.1 | 6.17 | EPS CAGR 26% > net-profit CAGR 23% — buyback/share reduction | 1,160 | 65.6 | 60.67% |
| ASTRAL | Astral Limited | Plastics/Pipes | 39,972 | Large | 1,478.4 | 1,565.7 | 5.9 | Split/Bonus: 2023-03-14 1.33333:1 | 21.5 | 0.04 | 0.04 | 20 | 15.3 | 32.3 | 20.13 | EPS grew in line with net profit — negligible dilution | 664 | 98.8 | 55.74% |
| HDFCBANK | HDFC Bank Limited | Banks | 827,847 | Large | 700.9 | 786.0 | 12.1 | Split/Bonus: 2025-08-26 2:1 | 15.2 | n/a | 0.43 | n/a | 14.7 | 19.7 | 57.74 | EPS CAGR 17% < net-profit CAGR 20% — share dilution | 42,476 | 25.9 | 25.97% |
| CYIENT | Cyient Limited | IT Services/Engineering | 9,464 | Mid | 777.8 | 873.5 | 12.3 | None | 12.3 | 0.20 | 1.98 | 14 | 1.8 | -3.3 | 33.06 | EPS grew in line with net profit — negligible dilution | 856 | 26.0 | 23.47% |
| MPHASIS | Mphasis Limited | IT Services | 39,952 | Large | 1,911.1 | 2,336.6 | 22.3 | None | 18.6 | 0.08 | 1.64 | 19 | 14.1 | 13.2 | 65.06 | EPS grew in line with net profit — negligible dilution | 1,455 | 32.8 | 56.03% |
| KOTAKBANK | Kotak Mahindra Bank Limited | Banks | 338,215 | Large | 339.8 | 402.9 | 18.6 | Split/Bonus: 2026-01-14 5:1 | 11.8 | n/a | 0.00 | n/a | 9.3 | 16.9 | 50.40 | EPS grew in line with net profit — negligible dilution | 4,881 | 33.8 | 26.02% |
| GARFIBRES | Garware Technical Fibres Limited | Textiles/Technical Fibres | 6,976 | Mid | 665.1 | 697.6 | 4.9 | Split/Bonus: 2025-01-03 5:1 | 19.5 | 0.13 | 0.00 | 20 | 5.4 | 14.6 | 76.80 | EPS CAGR 17% > net-profit CAGR 15% — buyback/share reduction | 228 | 44.1 | 52.62% |
| DRREDDY | Dr. Reddy's Laboratories Limited | Pharma | 89,906 | Large | 1,051.0 | 1,267.5 | 20.6 | Split/Bonus: 2024-10-28 5:1 | 11.1 | 0.17 | 0.46 | 20 | 10.1 | 27.3 | 117.35 | EPS grew in line with net profit — negligible dilution | 3,570 | 46.2 | 26.74% |
| GODREJCP | Godrej Consumer Products Limited | FMCG | 88,982 | Large | 831.2 | 1,009.2 | 21.4 | None | 18.2 | 0.20 | 0.00 | 22 | 3.9 | 1.7 | 16.83 | EPS grew in line with net profit — negligible dilution | 2,030 | 51.7 | 63.23% |
| KAJARIACER | Kajaria Ceramics Limited | Tiles/Building Mat. | 15,598 | Mid | 941.8 | 1,164.1 | 23.6 | None | 16.5 | 0.07 | 1.02 | 19 | 0.9 | 10.5 | 19.36 | EPS grew in line with net profit — negligible dilution | 509 | 50.6 | 47.54% |
| HAVELLS | Havells India Limited | Consumer Durables | 61,390 | Large | 949.0 | 1,194.4 | 25.9 | None | 20.2 | 0.10 | 0.66 | 15 | 8.8 | 16.5 | 16.68 | EPS grew in line with net profit — negligible dilution | 660 | 58.8 | 59.50% |
| AMBUJACEM | Ambuja Cements Limited | Cement | 67,641 | Large | 327.8 | 430.0 | 31.2 | None | 13.7 | 0.02 | 5.28 | 20 | 1.3 | 16.9 | 11.91 | EPS grew in line with net profit — negligible dilution | 4,832 | 28.6 | 63.29% |
| COLPAL | Colgate-Palmolive (India) Limited | FMCG | 45,851 | Large | 1,503.3 | 2,027.3 | 34.9 | None | 88.8 | 0.08 | 2.25 | 31 | 4.9 | 15.4 | 38.07 | EPS grew in line with net profit — negligible dilution | 784 | 44.3 | 51.00% |
| ADANIGREEN | Adani Green Energy Limited | Renewable Power | 175,935 | Large | 1,124.9 | 1,506.8 | 33.9 | None | 8.3 | 11.00 | 0.00 | 72 | 28.3 | n/a | 1.34 | Loss in FY2018 or FY2021 — growth comparison not meaningful | 1,601 | 839.5 | 56.29% |
| VOLTAS | Voltas Limited | Consumer Durables | 34,147 | Large | 994.0 | 1,357.6 | 36.6 | None | 10.6 | 0.05 | 0.39 | 8 | 5.7 | -2.9 | 15.87 | EPS grew in line with net profit — negligible dilution | 556 | 64.4 | 30.30% |
| RELIANCE | Reliance Industries Limited | Oil & Gas/Diversified | 1,317,332 | Large | 956.0 | 1,328.1 | 38.9 | Split/Bonus: 2024-10-28 2:1 | 7.7 | 0.40 | 0.69 | 17 | 6.1 | 14.2 | 77.50 | EPS grew in line with net profit — negligible dilution | 26,958 | 25.1 | 50.58% |
| HCLTECH | HCL Technologies Limited | IT Services | 266,889 | Large | 802.8 | 1,161.8 | 44.7 | None | 18.6 | 0.11 | 2.85 | 27 | 14.2 | 8.6 | 41.07 | EPS grew in line with net profit — negligible dilution | 19,618 | 23.9 | 60.33% |
| JYOTHYLAB | Jyothy Labs Limited | FMCG | 5,684 | Mid | 144.1 | 204.0 | 41.6 | None | 13.4 | 0.08 | 0.00 | 16 | 4.5 | 2.2 | 5.43 | EPS grew in line with net profit — negligible dilution | 402 | 28.5 | 62.89% |
| CIPLA | Cipla Limited | Pharma | 78,397 | Large | 927.4 | 1,355.5 | 46.2 | None | 13.0 | 0.11 | 0.00 | 22 | 8.1 | 19.0 | 29.82 | EPS grew in line with net profit — negligible dilution | 3,755 | 32.6 | 36.73% |
| BAJAJFINSV | Bajaj Finserv Ltd. | Financial Services | 96,411 | Large | 1,208.2 | 1,771.7 | 46.6 | Split/Bonus: 2022-09-13 5:1 | 20.6 | 3.59 | 0.00 | 32 | 22.6 | 20.8 | 140.45 | EPS grew in line with net profit — negligible dilution | 4,547 | 43.1 | 60.80% |
| CERA | Cera Sanitaryware Limited | Sanitaryware | 5,833 | Mid | 4,335.2 | 6,160.0 | 42.1 | None | 11.5 | 0.11 | 0.00 | 13 | 1.1 | -1.9 | 77.48 | EPS grew in line with net profit — negligible dilution | 268 | 57.9 | 54.48% |
| TECHM | Tech Mahindra Limited | IT Services | 106,153 | Large | 919.5 | 1,447.7 | 57.5 | None | 17.5 | 0.12 | 3.20 | 18 | 7.1 | 4.8 | 45.73 | EPS grew in line with net profit — negligible dilution | 8,094 | 24.0 | 35.76% |
| BRITANNIA | Britannia Industries Limited | FMCG | 87,916 | Large | 3,436.9 | 5,245.0 | 52.6 | None | 52.2 | 0.59 | 4.32 | 19 | 9.8 | 22.6 | 77.38 | EPS grew in line with net profit — negligible dilution | 1,851 | 47.2 | 50.55% |
| TATACONSUM | Tata Consumer Products Limited | FMCG | 69,522 | Large | 723.8 | 1,111.4 | 53.6 | None | 6.4 | 0.11 | 0.53 | 13 | 19.4 | 18.7 | 8.95 | EPS CAGR 6% < net-profit CAGR 19% — share dilution | 1,656 | 84.3 | 34.71% |
| ZENSARTECH | Zensar Technologies Limited | IT Services | 7,026 | Mid | 291.0 | 462.8 | 59.0 | None | 13.1 | 0.15 | 0.39 | 18 | 6.8 | 7.7 | 13.30 | EPS grew in line with net profit — negligible dilution | 858 | 23.4 | 49.19% |
| DIVISLAB | Divi's Laboratories Limited | Pharma | 117,262 | Large | 4,276.2 | 6,767.0 | 58.2 | None | 21.3 | 0.00 | 0.00 | 41 | 21.4 | 31.3 | 74.75 | EPS grew in line with net profit — negligible dilution | 1,947 | 59.0 | 51.95% |
| BAJFINANCE | Bajaj Finance Limited | NBFC | 72,506 | Large | 589.3 | 958.9 | 62.7 | Split/Bonus: 2025-06-16 2:1 | 12.0 | 3.57 | 0.00 | n/a | 27.9 | 21.0 | 14.66 | EPS grew in line with net profit — negligible dilution | -807 | 82.1 | 56.12% |
| MARICO | Marico Limited | FMCG | 68,481 | Large | 499.7 | 820.8 | 64.3 | None | 37.0 | 0.16 | 1.41 | 20 | 8.4 | 13.2 | 9.08 | EPS grew in line with net profit — negligible dilution | 2,007 | 58.5 | 59.61% |
| NESTLEIND | Nestlé India Limited | FMCG | 170,010 | Large | 838.1 | 1,400.4 | 67.1 | Split/Bonus: 2024-01-05 10:1; 2025-08-08 2:1 | 103.1 | 0.07 | 1.28 | 24 | 10.1 | 19.3 | 216.00 | EPS grew in line with net profit — negligible dilution | 2,454 | 81.6 | 62.76% |
| SUPREMEIND | The Supreme Industries Limited | Plastics | 27,513 | Large | 2,083.5 | 3,524.5 | 69.2 | None | 30.9 | 0.01 | 1.02 | 20 | 8.5 | 31.3 | 77.00 | EPS grew in line with net profit — negligible dilution | 1,246 | 28.1 | 48.85% |
| SUNDARMFIN | Sundaram Finance Limited | NBFC | 29,942 | Large | 2,567.6 | 4,409.6 | 71.7 | None | 15.8 | 4.72 | 0.56 | n/a | -5.8 | 13.2 | 104.87 | EPS CAGR 17% > net-profit CAGR 13% — buyback/share reduction | 450 | 25.5 | 35.91% |
| GRINDWELL | Grindwell Norton Limited | Abrasives/Industrial | 13,751 | Mid | 1,197.4 | 2,105.5 | 75.8 | None | 17.4 | 0.01 | 0.60 | 20 | 4.6 | 16.4 | 21.60 | EPS grew in line with net profit — negligible dilution | 331 | 57.5 | 58.32% |
| RPOWER | Reliance Power Limited | Power | 4,208 | Small | 15.0 | 26.7 | 77.7 | None | 3.7 | 2.09 | 0.00 | 45 | -6.1 | -18.5 | 0.82 | EPS CAGR -35% < net-profit CAGR -19% — share dilution | 4,149 | 18.3 | 9.06% |
| AXISBANK | Axis Bank Limited | Banks | 229,374 | Large | 745.2 | 1,360.1 | 82.5 | None | 7.0 | n/a | 0.00 | n/a | 11.4 | 150.0 | 23.49 | EPS CAGR 136% < net-profit CAGR 150% — share dilution | 12,633 | 31.9 | 13.58% |
| ITC | ITC Limited | FMCG/Diversified | 240,261 | Large | 159.6 | 291.1 | 82.4 | None | 22.2 | 0.00 | 10.71 | 35 | 4.3 | 5.2 | 10.69 | EPS grew in line with net profit — negligible dilution | 12,527 | 18.3 | 0.0 (no identifiable promoter) |
| COFORGE | Coforge Limited | IT Services | 25,190 | Large | 783.6 | 1,483.0 | 89.3 | Split/Bonus: 2025-06-04 5:1 | 18.9 | 0.03 | 0.31 | 17 | 16.0 | 14.7 | 75.20 | EPS CAGR 18% > net-profit CAGR 15% — buyback/share reduction | 762 | 55.3 | 63.99% |
| BPCL | Bharat Petroleum Corporation Limited | Oil & Gas | 101,553 | Large | 166.6 | 316.3 | 89.9 | Split/Bonus: 2024-06-21 2:1 | 32.3 | 1.02 | 4.49 | 9 | -0.8 | 20.9 | 74.52 | EPS grew in line with net profit — negligible dilution | 23,455 | 6.3 | 52.98% |
| YESBANK | Yes Bank Limited | Banks | 33,999 | Large | 13.6 | 25.5 | 88.0 | None | -10.5 | n/a | 0.00 | n/a | -0.4 | n/a | -1.39 | Loss in FY2018 or FY2021 — growth comparison not meaningful | 55,396 | NM | 0.00% |
| VBL | Varun Beverages Limited | Beverages | 31,849 | Large | 95.9 | 531.5 | 454.5 | Split/Bonus: 2021-06-10 1.5:1; 2022-06-06 1.5:1; 2023-06-15 2:1; 2024-09-12 2.5:1 | 10.1 | 0.91 | 0.23 | 19 | 17.2 | 18.6 | 7.58 | EPS CAGR 14% < net-profit CAGR 19% — share dilution | 1,012 | 96.3 | 66.40% |
| INFY | Infosys Limited | IT Services | 671,170 | Large | 1,376.8 | 1,127.5 | -18.1 | None | 25.4 | 0.07 | 1.71 | 28 | 12.5 | 6.6 | 45.42 | EPS grew in line with net profit — negligible dilution | 23,224 | 34.8 | 12.95% |

## 2. "Bad" list — 10 stocks

| Ticker | Company Name | Sector | Jun-2021 Mkt Cap (Cr) | Cap Cat | Jun-2021 Price | Jun-2026 Price | Total % Return | Corporate Actions | ROE % | D/E | Div Yield % | GPM (OPM proxy) % | Rev 3y CAGR % | NP 3y CAGR % | EPS (FY21) | EPS Consistency | CFO (Cr) | P/E (Jun21) | Promoter % |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| RAJESHEXPO | Rajesh Exports Limited | Jewellery | 16,670 | Mid | 562.9 | 92.9 | -83.5 | None | 7.5 | 0.09 | 0.18 | 0 | 11.2 | -12.6 | 28.61 | EPS grew in line with net profit — negligible dilution | -10,252 | 19.7 | 54.05% |
| JPASSOCIAT | Jaiprakash Associates Limited | Infra/Cement | 3,055 | Small | 12.6 | 2.4 | -80.7 | None | -42.7 | 12.26 | 0.00 | 11 | -5.7 | n/a | -2.71 | Loss in FY2018 or FY2021 — growth comparison not meaningful | 1,076 | NM | 38.47% |
| RELAXO | Relaxo Footwears Limited | Footwear | 28,619 | Large | 1,132.2 | 367.9 | -67.5 | None | 18.6 | 0.09 | 0.00 | 21 | 6.7 | 22.0 | 11.74 | EPS grew in line with net profit — negligible dilution | 513 | 98.1 | 70.92% |
| AAVAS | Aavas Financiers Limited | Housing Finance | 21,370 | Large | 2,712.4 | 1,467.6 | -45.9 | None | 12.0 | 2.66 | 0.00 | n/a | 30.7 | 45.9 | 36.80 | EPS CAGR 40% < net-profit CAGR 46% — share dilution | -1,071 | 73.7 | 50.08% |
| AARTIIND | Aarti Industries Limited | Specialty Chemicals | 30,378 | Large | 859.1 | 486.4 | -43.4 | Split/Bonus: 2021-06-22 2:1 | 15.3 | 0.82 | 0.14 | 22 | 5.8 | 15.6 | 15.02 | EPS CAGR 14% < net-profit CAGR 16% — share dilution | 873 | 58.0 | 46.82% |
| ZEEL | Zee Entertainment Enterprises Limited | Media | 20,627 | Large | 203.4 | 111.8 | -45.1 | None | 7.9 | 0.04 | 0.14 | 21 | 5.0 | -18.7 | 8.33 | EPS grew in line with net profit — negligible dilution | 1,548 | 25.8 | 3.99% |
| GUJGASLTD | Gujarat Gas Limited | Gas Distribution | 45,485 | Large | 632.9 | 399.7 | -36.8 | None | 28.4 | 0.22 | 0.19 | 21 | 16.9 | 63.2 | 18.45 | EPS grew in line with net profit — negligible dilution | 1,659 | 35.8 | 60.89% |
| IGL | Indraprastha Gas Limited | Gas Distribution | 39,043 | Large | 250.4 | 170.0 | -32.1 | Split/Bonus: 2025-01-31 2:1 | 18.5 | 0.02 | 0.50 | 30 | 2.9 | 17.6 | 16.76 | EPS grew in line with net profit — negligible dilution | 1,546 | 33.3 | 45.00% |
| PAYTM | One97 Communications Limited | Fintech | 101,400 | Large | 1,560.8 | 1,093.9 | -29.9 | LISTED NOV 2021 (baseline = listing, not Jun 2021) | -26.0 | 0.09 | 0.00 | -66 | n/a | n/a | -280.42 | EPS history unavailable (recent IPO / fiscal transition) | -2,082 | NM | n/a (not listed FY2021; no promoter classification) |
| WIPRO | Wipro Limited | IT Services | 297,922 | Large | 252.1 | 182.8 | -27.5 | Split/Bonus: 2024-12-03 2:1 | 19.8 | 0.19 | 0.18 | 24 | 4.4 | 10.7 | 19.70 | EPS CAGR 14% > net-profit CAGR 11% — buyback/share reduction | 14,755 | 27.7 | 73.02% |

## 4. Flags & sanity checks

### 4a. "Good" list stocks with NEGATIVE total return (candidates to reconsider)
- **INFY** (Infosys Limited): **-18.1%** — underperformed; trailed Nifty by -72 pts. Sits in the "Good" list on fundamentals/quality but its 5-yr price return is negative.

### 4b. "Bad" list stocks with POSITIVE total return (candidates to reassign)
- None — all 10 "Bad" list names posted negative 5-yr returns (range -83.5% to -27.5%). The bad list is internally consistent.

### 4c. Implausible / extreme outliers (>+200% or <−90%) — manual review
- **VBL** 454.5% — reviewed: corporate actions = Split/Bonus: 2021-06-10 1.5:1; 2022-06-06 1.5:1; 2023-06-15 2:1; 2024-09-12 2.5:1. auto_adjust handles the split math; return verified against split-adjusted series (genuine multibagger, not a data error).

### 4d. YESBANK fundamental sanity check (FY2021)
YESBANK price return is **+88.0%**, but FY2021 fundamentals are **weak**, consistent with a bank still digesting its 2020 reconstruction:

- FY2021 **net profit = ₹-3,489 Cr (a LOSS)**; EPS = ₹-1.39 (negative).
- **ROE FY2021 ≈ -10.5%** (negative — loss over positive equity).
- **Promoter holding ≈ 0.0%** — effectively no promoter; SBI-led investor consortium holds the reconstruction stake.
- Revenue FY2021 ₹20,039 Cr vs FY2018 ₹20,269 Cr — flat/declining topline.
- D/E: n/a (deposit-funded bank).

> **Verdict:** the +88% price move is a **low-base recovery bounce off the post-collapse 2020 price, not evidence of strong fundamentals.** On FY2021 fundamentals (loss-making, negative ROE, no promoter) YESBANK does **not** look like a "good fundamentals" stock. Flagged for your judgement.

### 4e. Market-cap diversity within the 40-stock "Good" list

| Category | Count | Tickers |
|---|---|---|
| Large | 32 | BIOCON, ASTRAL, HDFCBANK, MPHASIS, KOTAKBANK, DRREDDY, GODREJCP, HAVELLS, AMBUJACEM, COLPAL, ADANIGREEN, VOLTAS, RELIANCE, HCLTECH, CIPLA, BAJAJFINSV, TECHM, BRITANNIA, TATACONSUM, DIVISLAB, BAJFINANCE, MARICO, NESTLEIND, SUPREMEIND, SUNDARMFIN, AXISBANK, ITC, COFORGE, BPCL, YESBANK, VBL, INFY |
| Mid | 7 | CYIENT, GARFIBRES, KAJARIACER, JYOTHYLAB, CERA, ZENSARTECH, GRINDWELL |
| Small | 1 | RPOWER |

> **Small-cap (<₹5,000 Cr) count = 1.** **FLAG: small-cap representation is thin (<6–8).** Mid-cap (₹5–20k Cr) = 7. If you want richer small-cap growth scenarios, consider swapping in a few more verified small-cap names with positive returns and solid fundamentals — **not done automatically; flagged for your decision.**

### 4f. Note on "Good" list names sitting in Large-cap value/quality bucket
Several "Good" names are large, lower-beta compounders that *underperformed or roughly matched* Nifty over this specific window (e.g. HDFCBANK +12%, KOTAKBANK +19%, DRREDDY +21%, BIOCON +3%, INFY −18%). They are quality businesses but were not the window's price winners — relevant when building "good fundamentals ≠ guaranteed good return" teaching scenarios.
