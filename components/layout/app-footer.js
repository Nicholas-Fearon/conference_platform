export function AppFooter() {
  return (
    <footer className="app-shell py-8">
      <div className="flex flex-col gap-3 border-t border-stone-300/70 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>SummitOS MVP starter built with Next.js, Clerk, Supabase, and Tailwind CSS.</p>
        <p>Core surfaces: event ops, attendee intelligence, networking, community.</p>
      </div>
    </footer>
  );
}
