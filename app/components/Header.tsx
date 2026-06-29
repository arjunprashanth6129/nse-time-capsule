import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--color-brand)] text-sm font-bold text-white">
            ₹
          </span>
          MarketMind: NSE Time Capsule
        </Link>
        <span className="hidden rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 sm:inline">
          as of June 2021
        </span>
        <nav className="ml-auto flex items-center gap-1 text-sm">
          <Link
            href="/screener"
            className="rounded-md px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100"
          >
            Screener
          </Link>
          <Link
            href="/simulator"
            className="rounded-md px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100"
          >
            Simulator
            <span className="ml-1 align-middle text-[10px] text-gray-400">🔒</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
