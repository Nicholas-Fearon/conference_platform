import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="app-shell flex min-h-screen items-center justify-center py-10">
      <div className="surface max-w-xl p-8 text-center">
        <span className="eyebrow">Demo mode</span>
        <h1 className="mt-4 text-4xl font-semibold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
          Account creation is deferred for now.
        </h1>
        <p className="mt-4 text-slate-600">
          The MVP is intentionally frontend-first. Once you are happy with the flows, authentication and persistence can be layered in without changing the UX structure.
        </p>
        <Link href="/events" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
          Browse events
        </Link>
      </div>
    </main>
  );
}
