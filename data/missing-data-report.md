# Missing Data Report

Fixed window: prices Jan 2000-June 2026 (monthly). Anchor = **June 2021**; financials FY2015-FY2021. All values reproducible against the fixed June-2026 reference date.

## Coverage summary

- **Prices (monthly, Jan 2000-June 2026):** 35/35 stocks + Nifty 50 real (yfinance). Every stock has the June-2021 and June-2026 anchor months **except PAYTM** (IPO Nov 2021 — see below).
- **Annual financials FY2015-FY2021:** real (screener.in P&L + cash flow) for the full 7-year table — the June-2021 shift removes the old FY2010-14 gap. PAYTM is missing FY2017-FY2018 (pre-listing, not in screener).
- **June-2021 snapshot ratios:** P/E for 29/35, ROE for 34/35, D/E for 28/35. Derived from real FY2021 financials + the real split/bonus-adjusted June-2021 close.
- **Loss-makers (FY2021):** IDEA, PAYTM, YESBANK, PVRINOX correctly show **no P/E** (negative EPS). **Vodafone Idea (IDEA)** has **negative net worth** in FY2021, so ROE/D/E are intentionally blank (not meaningful).
- **PAYTM:** not listed as of June 2021 (IPO 18 Nov 2021). June-2021 snapshot ratios are N/A; the price chart and simulator use its **first listed close (Nov 2021)** as the effective entry, clearly flagged.
- **Promoter holding:** screener's free shareholding table only reaches ~FY2023, so the earliest available figure is shown as a labelled proxy.
- **Gross Profit Margin:** not exposed by screener; OPM% (operating margin) shown instead.

## Per-field gaps

- **FY2017** (1): no annual data for this year  
  _PAYTM_
- **FY2018** (1): no annual data for this year  
  _PAYTM_
- **grossMargin** (35): not exposed by screener; OPM% shown instead  
  _TCS, INFY, HCLTECH, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, YESBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL, IDEA, ZEEL, PAYTM, PVRINOX_
- **listing** (1): not listed at June 2021; IPO 2021-11, using listing price as effective entry  
  _PAYTM_
- **pe** (4): loss-making or missing FY2021 EPS — no meaningful P/E  
  _YESBANK, TATAMOTORS, BHARTIARTL, PVRINOX_
- **promoterHolding** (35): June-2021 unavailable; earliest screener value (FY2023)  
  _TCS, INFY, HCLTECH, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, YESBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL, IDEA, ZEEL, PAYTM, PVRINOX_
- **roe/de** (1): negative net worth (FY2021) — ROE/D/E not meaningful  
  _IDEA_
