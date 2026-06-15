"""Combine screener_raw.json + prices.json into the app's data files.

Outputs:
  data/financials.json   id -> { "2010".."2016": {revenue,netProfit,eps,cfo} | null }
  data/snapshot-2016.json id -> { price, marketCap, marketCapCategory, pe,
                                  divYield, roe, de, promoterHolding,
                                  promoterHoldingAsOf, opm, grossMargin, ... }
  data/missing-data-report.md

Consistency note: screener historical EPS is bonus/split-adjusted to the current
share base, which matches yfinance's split-adjusted June-2016 close. So
  PE      = adjClose(2016-06) / EPS(FY2016)
  MktCap  = PE * NetProfit(FY2016)          [= price*shares, basis-independent]
  DivYield= (payout% * EPS / 100) / adjClose(2016-06)
are all internally consistent using only these two real sources.
"""
import json, os
from stocks import STOCKS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")

prices = json.load(open(os.path.join(DATA, "prices.json")))
raw = json.load(open(os.path.join(DATA, "screener_raw.json")))

YEARS = ["2010", "2011", "2012", "2013", "2014", "2015", "2016"]


def june2016_close(sid):
    for p in prices.get(sid, []):
        if p["date"] == "2016-06":
            return p["close"]
    return None


def cap_category(mktcap_cr):
    if mktcap_cr is None:
        return None
    if mktcap_cr >= 20000:
        return "Large"
    if mktcap_cr >= 5000:
        return "Mid"
    return "Small"


def cagr(start, end, years):
    if start is None or end is None or start <= 0 or end <= 0:
        return None
    return round(((end / start) ** (1 / years) - 1) * 100, 1)


financials = {}
snapshot = {}
gaps = []  # (sid, field, note)

for sid, yahoo, name, sector in STOCKS:
    r = raw.get(sid, {})
    sales = r.get("sales", {})
    np_ = r.get("net_profit", {})
    eps = r.get("eps", {})
    cfo = r.get("cfo", {})
    payout = r.get("dividend_payout", {})
    opm = r.get("opm", {})
    borrow = r.get("borrowings", {})
    eqcap = r.get("equity_capital", {})
    reserves = r.get("reserves", {})
    promoters = r.get("promoters", {})

    # ---- year-by-year financials table ----
    fin = {}
    for y in YEARS:
        if y in np_ or y in sales or y in eps or y in cfo:
            fin[y] = {
                "revenue": sales.get(y),
                "netProfit": np_.get(y),
                "eps": eps.get(y),
                "cfo": cfo.get(y),
            }
        else:
            fin[y] = None
            gaps.append((sid, f"FY{y}", "no annual data (screener window starts FY2015)"))
    financials[sid] = fin

    # ---- June-2016 snapshot ----
    price = june2016_close(sid)
    e16 = eps.get("2016")
    n16 = np_.get("2016")
    pe = round(price / e16, 1) if (price and e16 and e16 > 0) else None
    mktcap = round(pe * n16) if (pe is not None and n16) else None
    dps16 = (payout.get("2016") / 100.0 * e16) if (payout.get("2016") is not None and e16) else None
    div_yield = round(dps16 / price * 100, 2) if (dps16 is not None and price) else None
    equity16 = None
    if eqcap.get("2016") is not None and reserves.get("2016") is not None:
        equity16 = eqcap["2016"] + reserves["2016"]
    roe = round(n16 / equity16 * 100, 1) if (n16 and equity16 and equity16 > 0) else None
    de = round(borrow.get("2016") / equity16, 2) if (borrow.get("2016") is not None and equity16 and equity16 > 0) else None

    # promoter holding: screener free data only reaches ~2023 -> use earliest available as proxy
    prom_val, prom_asof = None, None
    if promoters:
        prom_asof = sorted(promoters.keys())[0]
        prom_val = promoters[prom_asof]
        if prom_asof != "2016":
            gaps.append((sid, "promoterHolding", f"June-2016 unavailable; showing earliest screener value (FY{prom_asof})"))
    else:
        gaps.append((sid, "promoterHolding", "not available from screener"))

    if pe is None:
        gaps.append((sid, "pe/marketCap", "missing FY2016 EPS or price"))
    if roe is None:
        gaps.append((sid, "roe", "missing FY2016 net profit or equity"))
    if de is None:
        gaps.append((sid, "de", "missing FY2016 borrowings or equity (note: banks report deposits, not borrowings)"))
    # gross margin not exposed by screener; OPM% used as the available margin metric
    gaps.append((sid, "grossMargin", "not exposed by screener; OPM% (operating margin) shown instead"))

    snapshot[sid] = {
        "name": name,
        "sector": sector,
        "price": price,
        "marketCap": mktcap,
        "marketCapCategory": cap_category(mktcap),
        "pe": pe,
        "divYield": div_yield,
        "roe": roe,
        "de": de,
        "promoterHolding": prom_val,
        "promoterHoldingAsOf": prom_asof,
        "opm": opm.get("2016"),
        "grossMargin": None,
    }

json.dump(financials, open(os.path.join(DATA, "financials.json"), "w"), indent=0)
json.dump(snapshot, open(os.path.join(DATA, "snapshot-2016.json"), "w"), indent=1)

# ---- missing-data report ----
have_2016 = sum(1 for s in snapshot.values() if s["pe"] is not None)
have_roe = sum(1 for s in snapshot.values() if s["roe"] is not None)
have_de = sum(1 for s in snapshot.values() if s["de"] is not None)
lines = []
lines.append("# Missing Data Report")
lines.append("")
lines.append("Fixed window: prices Jan 2000-June 2026 (monthly). Financials FY2010-2016.")
lines.append("All values reproducible against the fixed June-2026 reference date.")
lines.append("")
lines.append("## Coverage summary")
lines.append("")
lines.append(f"- **Prices (monthly, Jan 2000-June 2026):** 35/35 stocks + Nifty 50 fully sourced (real, yfinance). Every stock has the June-2016 and June-2026 anchor months. Some series start at their real listing date (Coal India 2010, PowerGrid 2007, NTPC 2004, Maruti 2003, etc.).")
lines.append(f"- **June-2016 snapshot ratios:** P/E & Market Cap for {have_2016}/35; ROE for {have_roe}/35; D/E for {have_de}/35. Derived from real FY2016 screener financials + real June-2016 split/bonus-adjusted prices.")
lines.append("- **Annual financials FY2015-FY2016:** real (screener.in P&L + cash flow).")
lines.append("- **Annual financials FY2010-FY2014:** NOT available. screener.in shows a rolling ~12-year window that in 2026 starts at FY2015; the Wayback Machine has no 2016-era screener snapshots. These years are marked null and render as \"Data not available\". 3yr/5yr CAGR rows (which need FY2011/FY2013) are therefore not computable.")
lines.append("- **Promoter holding:** screener's free shareholding table only reaches ~FY2023, so June-2016 values are unavailable; the earliest available figure is shown as a labelled proxy.")
lines.append("- **Gross Profit Margin:** not exposed by screener; OPM% (operating margin) is shown as the available margin metric.")
lines.append("")
lines.append("## Per-field gaps")
lines.append("")
by_field = {}
for sid, field, note in gaps:
    by_field.setdefault(field, []).append((sid, note))
for field in sorted(by_field):
    items = by_field[field]
    note = items[0][1]
    sids = ", ".join(sid for sid, _ in items)
    lines.append(f"- **{field}** ({len(items)}): {note}  \n  _{sids}_")
open(os.path.join(DATA, "missing-data-report.md"), "w").write("\n".join(lines) + "\n")

print("financials.json, snapshot-2016.json, missing-data-report.md written")
print(f"PE/MktCap: {have_2016}/35  ROE: {have_roe}/35  D/E: {have_de}/35")
print("\nSample snapshots:")
for sid in ["TCS", "HDFCBANK", "ITC", "SBIN", "TATAMOTORS", "MARUTI"]:
    s = snapshot[sid]
    print(f"  {sid:11} price={s['price']} mktcap={s['marketCap']} ({s['marketCapCategory']}) "
          f"PE={s['pe']} DivY={s['divYield']} ROE={s['roe']} D/E={s['de']} "
          f"Prom={s['promoterHolding']}@{s['promoterHoldingAsOf']} OPM={s['opm']}")
