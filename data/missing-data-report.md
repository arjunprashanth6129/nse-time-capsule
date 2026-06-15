# Missing Data Report

Fixed window: prices Jan 2000-June 2026 (monthly). Financials FY2010-2016.
All values reproducible against the fixed June-2026 reference date.

## Coverage summary

- **Prices (monthly, Jan 2000-June 2026):** 35/35 stocks + Nifty 50 fully sourced (real, yfinance). Every stock has the June-2016 and June-2026 anchor months. Some series start at their real listing date (Coal India 2010, PowerGrid 2007, NTPC 2004, Maruti 2003, etc.).
- **June-2016 snapshot ratios:** P/E & Market Cap for 33/35; ROE for 35/35; D/E for 29/35. Derived from real FY2016 screener financials + real June-2016 split/bonus-adjusted prices.
- **Annual financials FY2015-FY2016:** real (screener.in P&L + cash flow).
- **Annual financials FY2010-FY2014:** NOT available. screener.in shows a rolling ~12-year window that in 2026 starts at FY2015; the Wayback Machine has no 2016-era screener snapshots. These years are marked null and render as "Data not available". 3yr/5yr CAGR rows (which need FY2011/FY2013) are therefore not computable.
- **Promoter holding:** screener's free shareholding table only reaches ~FY2023, so June-2016 values are unavailable; the earliest available figure is shown as a labelled proxy.
- **Gross Profit Margin:** not exposed by screener; OPM% (operating margin) is shown as the available margin metric.

## Per-field gaps

- **FY2010** (35): no annual data (screener window starts FY2015)  
  _TCS, INFY, HCLTECH, WIPRO, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, DABUR, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, MM, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, PIDILITIND, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL_
- **FY2011** (35): no annual data (screener window starts FY2015)  
  _TCS, INFY, HCLTECH, WIPRO, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, DABUR, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, MM, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, PIDILITIND, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL_
- **FY2012** (35): no annual data (screener window starts FY2015)  
  _TCS, INFY, HCLTECH, WIPRO, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, DABUR, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, MM, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, PIDILITIND, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL_
- **FY2013** (35): no annual data (screener window starts FY2015)  
  _TCS, INFY, HCLTECH, WIPRO, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, DABUR, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, MM, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, PIDILITIND, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL_
- **FY2014** (35): no annual data (screener window starts FY2015)  
  _TCS, INFY, HCLTECH, WIPRO, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, DABUR, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, MM, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, PIDILITIND, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL_
- **de** (6): missing FY2016 borrowings or equity (note: banks report deposits, not borrowings)  
  _HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK, BAJFINANCE_
- **grossMargin** (35): not exposed by screener; OPM% (operating margin) shown instead  
  _TCS, INFY, HCLTECH, WIPRO, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, DABUR, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, MM, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, PIDILITIND, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL_
- **pe/marketCap** (2): missing FY2016 EPS or price  
  _TATASTEEL, HINDALCO_
- **promoterHolding** (35): June-2016 unavailable; showing earliest screener value (FY2023)  
  _TCS, INFY, HCLTECH, WIPRO, HDFCBANK, ICICIBANK, KOTAKBANK, SBIN, AXISBANK, HINDUNILVR, ITC, NESTLEIND, BRITANNIA, DABUR, SUNPHARMA, DRREDDY, CIPLA, DIVISLAB, MARUTI, TATAMOTORS, MM, BAJAJAUTO, LT, ULTRACEMCO, ASIANPAINT, TITAN, PIDILITIND, BAJFINANCE, POWERGRID, NTPC, COALINDIA, IOC, TATASTEEL, HINDALCO, BHARTIARTL_
