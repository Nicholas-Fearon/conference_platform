import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Sparkles, Ticket, UsersRound } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { getEventBySlug } from "@/lib/platform-data";

export default async function EventDetailPage({ params }) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <AppHeader />
      <section className="app-shell py-10">
        <div className="surface overflow-hidden">
          <div
            className="min-h-[280px] bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.55), rgba(29,77,79,0.45)), url(${event.coverImage})` }}
          >
            <div className="flex min-h-[280px] flex-col justify-end p-8 text-white md:p-10">
              <span className="eyebrow border-white/20 bg-white/10 text-white">{event.category}</span>
              <h1
                className="mt-5 max-w-3xl text-4xl font-semibold md:text-6xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {event.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg">{event.description}</p>
            </div>
          </div>

          <div className="grid gap-8 px-8 py-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-10">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-mist p-5">
                  <CalendarDays className="h-5 w-5 text-pine" />
                  <p className="mt-4 text-sm text-slate-500">Date</p>
                  <p className="mt-1 font-semibold text-ink">{event.dateLabel}</p>
                </div>
                <div className="rounded-3xl bg-mist p-5">
                  <MapPin className="h-5 w-5 text-pine" />
                  <p className="mt-4 text-sm text-slate-500">Location</p>
                  <p className="mt-1 font-semibold text-ink">{event.location}</p>
                </div>
                <div className="rounded-3xl bg-mist p-5">
                  <UsersRound className="h-5 w-5 text-pine" />
                  <p className="mt-4 text-sm text-slate-500">Audience fit</p>
                  <p className="mt-1 font-semibold text-ink">{event.audience}</p>
                </div>
              </div>

              <div>
                <SectionHeading
                  eyebrow="What attendees get"
                  title="An event page that does more than convert registrations."
                  description="This surface becomes the attendee's home for context, networking setup, and post-event follow-through."
                />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {event.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-3xl border border-stone-200 bg-white p-5">
                      <div className="flex items-start gap-3">
                        <Sparkles className="mt-0.5 h-5 w-5 text-ember" />
                        <p className="text-sm leading-6 text-slate-600">{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-4 rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6">
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-ember" />
                <h2 className="text-xl font-semibold text-ink">Ticket tiers</h2>
              </div>
              <div className="space-y-3">
                {event.ticketTypes.map((ticketType) => (
                  <div key={ticketType.name} className="rounded-3xl bg-white p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-ink">{ticketType.name}</p>
                        <p className="mt-1 text-sm text-slate-600">{ticketType.description}</p>
                      </div>
                      <p className="text-lg font-semibold text-ink">{ticketType.priceLabel}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Register with Clerk auth
              </button>
              <p className="text-xs leading-5 text-slate-500">
                In production this action creates a registration and checkout session after authentication.
              </p>
            </aside>
          </div>
        </div>
      </section>
      <AppFooter />
    </main>
  );
}
