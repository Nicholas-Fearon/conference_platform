import Link from "next/link";
import { CalendarDays, MapPin, Ticket } from "lucide-react";

export function EventCard({ event }) {
  return (
    <article className="surface overflow-hidden">
      <div
        className="h-56 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.35), rgba(29,77,79,0.25)), url(${event.coverImage})`
        }}
      />
      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-pine">
            {event.category}
          </span>
          <p className="text-sm font-medium text-slate-500">{event.status}</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-ink">{event.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{event.description}</p>
        </div>

        <div className="space-y-3 rounded-3xl bg-stone-50 p-4">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <CalendarDays className="h-4 w-4 text-ember" />
            <span>{event.dateLabel}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-ember" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Ticket className="h-4 w-4 text-ember" />
            <span>{event.ticketSummary}</span>
          </div>
        </div>

        <Link
          href={`/events/${event.slug}`}
          className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View branded page
        </Link>
      </div>
    </article>
  );
}
