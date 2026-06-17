"""Canonical 35-stock universe for the NSE Time Capsule project.

Single source of truth for the data-fetch scripts. The TypeScript app mirrors
this in lib/stocks.ts. `id` is the app-internal ticker (used as JSON keys and in
dropdowns); `yahoo` is the Yahoo Finance symbol; `sector` drives peer grouping.
"""

# id, yahoo, name, sector
STOCKS = [
    ("TCS",        "TCS.NS",         "Tata Consultancy Services", "IT"),
    ("INFY",       "INFY.NS",        "Infosys",                   "IT"),
    ("HCLTECH",    "HCLTECH.NS",     "HCL Technologies",          "IT"),
    ("HDFCBANK",   "HDFCBANK.NS",    "HDFC Bank",                 "Banking"),
    ("ICICIBANK",  "ICICIBANK.NS",   "ICICI Bank",                "Banking"),
    ("KOTAKBANK",  "KOTAKBANK.NS",   "Kotak Mahindra Bank",       "Banking"),
    ("SBIN",       "SBIN.NS",        "State Bank of India",       "Banking"),
    ("YESBANK",    "YESBANK.NS",     "Yes Bank",                  "Banking"),
    ("HINDUNILVR", "HINDUNILVR.NS",  "Hindustan Unilever",        "FMCG"),
    ("ITC",        "ITC.NS",         "ITC",                       "FMCG"),
    ("NESTLEIND",  "NESTLEIND.NS",   "Nestle India",              "FMCG"),
    ("BRITANNIA",  "BRITANNIA.NS",   "Britannia Industries",      "FMCG"),
    ("SUNPHARMA",  "SUNPHARMA.NS",   "Sun Pharmaceutical",        "Pharma"),
    ("DRREDDY",    "DRREDDY.NS",     "Dr. Reddy's Laboratories",  "Pharma"),
    ("CIPLA",      "CIPLA.NS",       "Cipla",                     "Pharma"),
    ("DIVISLAB",   "DIVISLAB.NS",    "Divi's Laboratories",       "Pharma"),
    ("MARUTI",     "MARUTI.NS",      "Maruti Suzuki India",       "Auto"),
    ("TATAMOTORS", "TATAMOTORS.NS",  "Tata Motors",               "Auto"),
    ("BAJAJAUTO",  "BAJAJ-AUTO.NS",  "Bajaj Auto",                "Auto"),
    ("LT",         "LT.NS",          "Larsen & Toubro",           "Capital Goods/Cement"),
    ("ULTRACEMCO", "ULTRACEMCO.NS",  "UltraTech Cement",          "Capital Goods/Cement"),
    ("ASIANPAINT", "ASIANPAINT.NS",  "Asian Paints",              "Consumer/Specialty"),
    ("TITAN",      "TITAN.NS",       "Titan Company",             "Consumer/Specialty"),
    ("BAJFINANCE", "BAJFINANCE.NS",  "Bajaj Finance",             "NBFC"),
    ("POWERGRID",  "POWERGRID.NS",   "Power Grid Corporation",    "Utilities/PSU"),
    ("NTPC",       "NTPC.NS",        "NTPC",                      "Utilities/PSU"),
    ("COALINDIA",  "COALINDIA.NS",   "Coal India",                "Utilities/PSU"),
    ("IOC",        "IOC.NS",         "Indian Oil Corporation",    "Utilities/PSU"),
    ("TATASTEEL",  "TATASTEEL.NS",   "Tata Steel",                "Metals"),
    ("HINDALCO",   "HINDALCO.NS",    "Hindalco Industries",       "Metals"),
    ("BHARTIARTL", "BHARTIARTL.NS",  "Bharti Airtel",             "Telecom"),
    ("IDEA",       "IDEA.NS",        "Vodafone Idea",             "Telecom"),
    ("ZEEL",       "ZEEL.NS",        "Zee Entertainment",         "Media"),
    ("PAYTM",      "PAYTM.NS",       "One97 Communications (Paytm)", "Fintech"),
    ("PVRINOX",    "PVRINOX.NS",     "PVR INOX",                  "Cinema"),
]

NIFTY = ("NIFTY50", "^NSEI", "Nifty 50", "Index")

START = "2000-01-01"
# Fixed reproducible window end. June 2026 is the anchor "present" for the project.
END = "2026-06-30"
