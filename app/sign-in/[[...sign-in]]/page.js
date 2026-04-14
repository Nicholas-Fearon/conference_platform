import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="app-shell flex min-h-screen items-center justify-center py-10">
      <div className="surface max-w-xl p-8 text-center">
        <span className="eyebrow">Demo mode</span>
        <h1 className="mt-4 text-4xl font-semibold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
          Sign-in is disabled for the local MVP.
        </h1>
        <p className="mt-4 text-slate-600">
          The product is running without Clerk or Supabase so you can review the organiser and attendee experience immediately.
        </p>
        <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
          Continue to dashboard
        </Link>
      </div>
    </main>
  );
}
