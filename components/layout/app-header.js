import Link from "next/link";

const navItems = [
  { href: "/events", label: "Events" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/events", label: "Manage" },
  { href: "/networking", label: "Networking" },
  { href: "/community", label: "Community" }
];

export function AppHeader() {
  return (
    <header className="app-shell py-5">
      <div className="surface flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-white">
              SO
            </div>
            <div>
              <p
                className="text-lg font-semibold text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                SummitOS
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Conference platform MVP
              </p>
            </div>
          </Link>

          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Demo mode
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-4 md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-ink sm:inline-flex"
          >
            Open dashboard
          </Link>
          <Link
            href="/dashboard/events"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            Create event
          </Link>
        </div>
      </div>
    </header>
  );
}
