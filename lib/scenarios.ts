// The 5 portfolio-building scenarios. Names + descriptions per the project spec;
// capex + accent colours mirror the FLP "Team Scenarios" handout.

export interface Scenario {
  id: string;
  name: string;
  description: string;
  capex: number; // ₹
  capexLabel: string;
  accent: string; // hex, matches the printed handout
  // "Model answer" — 5 good-stock IDs that best fit this scenario. Reference
  // data only; NEVER rendered in any UI (not even the host simulator). Trap
  // stocks never appear here.
  ideal: string[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: "fresh-graduate",
    name: "Fresh Graduate",
    description:
      "Just finished college, first job, no dependents, high risk tolerance, long horizon.",
    capex: 50000,
    capexLabel: "Rs. 50,000",
    accent: "#3b5bdb",
    ideal: ["RELIANCE", "HCLTECH", "BAJFINANCE", "VBL", "COFORGE"],
  },
  {
    id: "newly-married",
    name: "Newly Married Couple",
    description:
      "Dual income, no kids yet, moderate-high risk, 25-30 yr horizon.",
    capex: 200000,
    capexLabel: "Rs. 2,00,000",
    accent: "#7048e8",
    ideal: ["HDFCBANK", "BAJAJFINSV", "SUPREMEIND", "DIVISLAB", "TECHM"],
  },
  {
    id: "young-family",
    name: "Young Family with Toddlers",
    description:
      "Two kids under 5, investing for college funds + family security, moderate risk.",
    capex: 300000,
    capexLabel: "Rs. 3,00,000",
    accent: "#e8830c",
    ideal: ["NESTLEIND", "MARICO", "HAVELLS", "ASTRAL", "TATACONSUM"],
  },
  {
    id: "pre-retirement",
    name: "Pre-Retirement Family",
    description:
      "Both parents working, two kids in higher education, 5-8 yrs from retirement, lower-moderate risk.",
    capex: 500000,
    capexLabel: "Rs. 5,00,000",
    accent: "#d6455e",
    ideal: ["ITC", "INFY", "CIPLA", "KOTAKBANK", "GRINDWELL"],
  },
  {
    id: "elderly-retired",
    name: "Elderly Retired Couple",
    description:
      "Living off retirement corpus + pension, low risk, dividend/stability focus.",
    capex: 100000,
    capexLabel: "Rs. 1,00,000",
    accent: "#2f9e7f",
    ideal: ["ITC", "NESTLEIND", "BPCL", "HCLTECH", "COLPAL"],
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
