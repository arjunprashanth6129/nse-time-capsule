// Canonical 35-stock universe. Mirrors scripts/stocks.py.
// `id` is the app ticker (JSON key + dropdown value); `sector` drives peers.

export interface StockMeta {
  id: string;
  name: string;
  sector: string;
}

export const STOCKS: StockMeta[] = [
  { id: "TCS", name: "Tata Consultancy Services", sector: "IT" },
  { id: "INFY", name: "Infosys", sector: "IT" },
  { id: "HCLTECH", name: "HCL Technologies", sector: "IT" },
  { id: "HDFCBANK", name: "HDFC Bank", sector: "Banking" },
  { id: "ICICIBANK", name: "ICICI Bank", sector: "Banking" },
  { id: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Banking" },
  { id: "SBIN", name: "State Bank of India", sector: "Banking" },
  { id: "YESBANK", name: "Yes Bank", sector: "Banking" },
  { id: "HINDUNILVR", name: "Hindustan Unilever", sector: "FMCG" },
  { id: "ITC", name: "ITC", sector: "FMCG" },
  { id: "NESTLEIND", name: "Nestle India", sector: "FMCG" },
  { id: "BRITANNIA", name: "Britannia Industries", sector: "FMCG" },
  { id: "SUNPHARMA", name: "Sun Pharmaceutical", sector: "Pharma" },
  { id: "DRREDDY", name: "Dr. Reddy's Laboratories", sector: "Pharma" },
  { id: "CIPLA", name: "Cipla", sector: "Pharma" },
  { id: "DIVISLAB", name: "Divi's Laboratories", sector: "Pharma" },
  { id: "MARUTI", name: "Maruti Suzuki India", sector: "Auto" },
  { id: "TATAMOTORS", name: "Tata Motors", sector: "Auto" },
  { id: "BAJAJAUTO", name: "Bajaj Auto", sector: "Auto" },
  { id: "LT", name: "Larsen & Toubro", sector: "Capital Goods/Cement" },
  { id: "ULTRACEMCO", name: "UltraTech Cement", sector: "Capital Goods/Cement" },
  { id: "ASIANPAINT", name: "Asian Paints", sector: "Consumer/Specialty" },
  { id: "TITAN", name: "Titan Company", sector: "Consumer/Specialty" },
  { id: "BAJFINANCE", name: "Bajaj Finance", sector: "NBFC" },
  { id: "POWERGRID", name: "Power Grid Corporation", sector: "Utilities/PSU" },
  { id: "NTPC", name: "NTPC", sector: "Utilities/PSU" },
  { id: "COALINDIA", name: "Coal India", sector: "Utilities/PSU" },
  { id: "IOC", name: "Indian Oil Corporation", sector: "Utilities/PSU" },
  { id: "TATASTEEL", name: "Tata Steel", sector: "Metals" },
  { id: "HINDALCO", name: "Hindalco Industries", sector: "Metals" },
  { id: "BHARTIARTL", name: "Bharti Airtel", sector: "Telecom" },
  { id: "IDEA", name: "Vodafone Idea", sector: "Telecom" },
  { id: "ZEEL", name: "Zee Entertainment", sector: "Media" },
  { id: "PAYTM", name: "One97 Communications (Paytm)", sector: "Fintech" },
  { id: "PVRINOX", name: "PVR INOX", sector: "Cinema" },
];

// Display order of sectors on the landing page / filters.
export const SECTOR_ORDER = [
  "IT",
  "Banking",
  "FMCG",
  "Pharma",
  "Auto",
  "Capital Goods/Cement",
  "Consumer/Specialty",
  "NBFC",
  "Utilities/PSU",
  "Metals",
  "Telecom",
  "Media",
  "Fintech",
  "Cinema",
];

const BY_ID = new Map(STOCKS.map((s) => [s.id, s]));
export const STOCK_IDS = STOCKS.map((s) => s.id);

export function getStockMeta(id: string): StockMeta | undefined {
  return BY_ID.get(id);
}

export function stocksInSector(sector: string): StockMeta[] {
  return STOCKS.filter((s) => s.sector === sector);
}

// Peers = other stocks in the same sector (restricted to our 35-stock list).
export function getPeerIds(id: string): string[] {
  const meta = BY_ID.get(id);
  if (!meta) return [];
  return STOCKS.filter((s) => s.sector === meta.sector && s.id !== id).map(
    (s) => s.id,
  );
}

// Sectors with only one member -> no comparable peer in our list.
export function hasNoPeers(id: string): boolean {
  return getPeerIds(id).length === 0;
}
