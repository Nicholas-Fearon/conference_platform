"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, ImagePlus, Palette, Plus, Ticket, Trash2, UsersRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const setupSections = [
  {
    icon: CalendarDays,
    title: "Event basics",
    description: "Name, slug, venue, timezone, dates, and publishing status."
  },
  {
    icon: Palette,
    title: "Brand configuration",
    description: "Hero imagery, colour palette, sponsor placements, and event voice."
  },
  {
    icon: Ticket,
    title: "Ticketing setup",
    description: "Ticket tiers, quantity, pricing, sales windows, and visibility."
  },
  {
    icon: UsersRound,
    title: "Audience design",
    description: "Profile questions, attendee segments, discovery filters, and networking goals."
  }
];

const STORAGE_KEY = "summitos_demo_events";
const defaultRegistrations = [
  {
    name: "Maya Chen",
    company: "Northline Labs",
    ticket: "Founder dinner",
    status: "Confirmed"
  },
  {
    name: "Theo Bernard",
    company: "Peak Horizon",
    ticket: "Investor pass",
    status: "Waitlist"
  },
  {
    name: "Aisha Patel",
    company: "Ledger Loop",
    ticket: "Standard",
    status: "Confirmed"
  }
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "new-event";
}

function formatDateLabel(dateValue) {
  if (!dateValue) return "Date TBD";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Date TBD";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function makeLocalEvent(seed = {}) {
  const name = seed.name || "New Conference Concept";
  const slug = seed.slug || slugify(name);
  const venue = seed.location || "Venue TBD";
  const status = seed.status || "Draft";
  const dateValue = seed.dateValue || "2026-11-05";

  return {
    id: seed.id || `local_${slug}_${Date.now()}`,
    name,
    slug,
    status,
    dateValue,
    dateLabel: seed.dateLabel || formatDateLabel(dateValue),
    location: venue,
    category: seed.category || "Curated event",
    description:
      seed.description ||
      "A high-context gathering designed around peer networking, quality conversations, and long-tail community engagement.",
    audience: seed.audience || "Founders, operators, buyers",
    brandPrimaryColor: seed.brandPrimaryColor || "#0f172a",
    brandAccentColor: seed.brandAccentColor || "#d97706",
    brandSupportColor: seed.brandSupportColor || "#1d4d4f",
    ticketTypes: seed.ticketTypes || [
      { name: "Standard", priceLabel: "GBP149", inventory: "120 available" },
      { name: "VIP", priceLabel: "GBP349", inventory: "24 available" }
    ]
  };
}

export function EventManager({ initialEvents }) {
  const [events, setEvents] = useState(initialEvents.map((event) => makeLocalEvent({
    ...event,
    location: event.location,
    dateLabel: event.dateLabel
  })));
  const [selectedEventId, setSelectedEventId] = useState(initialEvents[0]?.id || null);
  const [notice, setNotice] = useState("Demo data is stored locally in this browser.");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        setEvents(parsed);
        setSelectedEventId(parsed[0].id);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events, hydrated]);

  const selectedEvent = events.find((event) => event.id === selectedEventId) || events[0];

  function updateSelectedEvent(patch) {
    setEvents((current) =>
      current.map((event) => {
        if (event.id !== selectedEvent.id) return event;
        const next = { ...event, ...patch };
        if (patch.name && !patch.slug) {
          next.slug = slugify(patch.name);
        }
        next.dateLabel = formatDateLabel(next.dateValue);
        return next;
      })
    );
  }

  function addEvent() {
    const next = makeLocalEvent({
      name: `New Event ${events.length + 1}`,
      dateValue: "2026-12-01"
    });
    setEvents((current) => [next, ...current]);
    setSelectedEventId(next.id);
    setNotice("Created a new draft event locally.");
  }

  function removeSelectedEvent() {
    if (!selectedEvent) return;
    const remaining = events.filter((event) => event.id !== selectedEvent.id);
    setEvents(remaining);
    setSelectedEventId(remaining[0]?.id || null);
    setNotice("Deleted the selected local event draft.");
  }

  function saveDraft() {
    setNotice(`Saved ${selectedEvent.name} as a local draft.`);
  }

  function publishEvent() {
    updateSelectedEvent({ status: "Published" });
    setNotice(`${selectedEvent.name} is now marked as published in demo mode.`);
  }

  return (
    <section className="app-shell space-y-6 py-10">
      <div className="surface px-8 py-8 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Event creation and management"
            title="Working organiser surface for a no-backend MVP"
            description="Event edits update instantly, drafts persist in local storage, and you can model multiple events without touching the backend yet."
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addEvent}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              New event
            </button>
            <Link
              href="/events/future-of-saas-london"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-ink"
            >
              Preview public event
              <ImagePlus className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {setupSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6">
                <div className="inline-flex rounded-2xl bg-white p-3 text-pine">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-ink">{section.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_1fr_0.95fr]">
        <div className="surface p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-ink">Your events</h2>
            <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-pine">
              {events.length} total
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {events.map((event) => {
              const active = event.id === selectedEvent?.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setSelectedEventId(event.id)}
                  className={`w-full rounded-3xl border p-4 text-left transition ${active ? "border-ink bg-ink text-white" : "border-stone-200 bg-stone-50 text-ink hover:border-stone-300"}`}
                >
                  <p className="font-semibold">{event.name}</p>
                  <p className={`mt-1 text-sm ${active ? "text-white/80" : "text-slate-500"}`}>{event.dateLabel}</p>
                  <p className={`mt-1 text-xs uppercase tracking-[0.16em] ${active ? "text-white/70" : "text-ember"}`}>{event.status}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="surface p-8">
          <h2 className="text-2xl font-semibold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
            Event setup form
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Update the selected event and the preview panel changes immediately.
          </p>

          {selectedEvent ? (
            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Event name</span>
                <input value={selectedEvent.name} onChange={(event) => updateSelectedEvent({ name: event.target.value })} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Slug</span>
                <input value={selectedEvent.slug} onChange={(event) => updateSelectedEvent({ slug: slugify(event.target.value) })} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Status</span>
                <select value={selectedEvent.status} onChange={(event) => updateSelectedEvent({ status: event.target.value })} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none">
                  <option>Draft</option>
                  <option>Published</option>
                  <option>On sale</option>
                  <option>Waitlist</option>
                  <option>Completed</option>
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Start date</span>
                <input value={selectedEvent.dateValue} type="date" onChange={(event) => updateSelectedEvent({ dateValue: event.target.value })} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Venue</span>
                <input value={selectedEvent.location} onChange={(event) => updateSelectedEvent({ location: event.target.value })} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Primary brand</span>
                <input value={selectedEvent.brandPrimaryColor} type="color" onChange={(event) => updateSelectedEvent({ brandPrimaryColor: event.target.value })} className="h-12 w-full rounded-2xl border border-stone-300 bg-white px-2 py-2 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Accent brand</span>
                <input value={selectedEvent.brandAccentColor} type="color" onChange={(event) => updateSelectedEvent({ brandAccentColor: event.target.value })} className="h-12 w-full rounded-2xl border border-stone-300 bg-white px-2 py-2 outline-none" />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Short description</span>
                <textarea value={selectedEvent.description} onChange={(event) => updateSelectedEvent({ description: event.target.value })} rows={5} className="w-full rounded-3xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <div className="flex flex-wrap gap-3 pt-2 md:col-span-2">
                <button type="button" onClick={saveDraft} className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
                  Save draft
                </button>
                <button type="button" onClick={publishEvent} className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-ink">
                  Publish event
                </button>
                <button type="button" onClick={removeSelectedEvent} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-700">
                  <Trash2 className="h-4 w-4" />
                  Delete event
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-stone-300 p-6 text-sm text-slate-600">
              No events yet. Create a new local event to start editing.
            </div>
          )}
        </div>

        <div className="space-y-6">
          {selectedEvent ? (
            <>
              <div className="surface overflow-hidden">
                <div className="p-6" style={{ backgroundColor: selectedEvent.brandPrimaryColor }}>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">Live preview</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                    {selectedEvent.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/80">{selectedEvent.description}</p>
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white" style={{ backgroundColor: selectedEvent.brandAccentColor }}>
                      {selectedEvent.status}
                    </span>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      {selectedEvent.dateLabel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{selectedEvent.location}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[selectedEvent.brandPrimaryColor, selectedEvent.brandAccentColor, selectedEvent.brandSupportColor].map((color) => (
                      <div key={color} className="rounded-3xl border border-stone-200 p-3 text-center">
                        <div className="mx-auto h-10 w-10 rounded-full" style={{ backgroundColor: color }} />
                        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="surface p-6">
                <h2 className="text-xl font-semibold text-ink">Ticket tiers</h2>
                <div className="mt-4 space-y-3">
                  {selectedEvent.ticketTypes.map((ticket) => (
                    <div key={ticket.name} className="rounded-3xl bg-stone-50 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-ink">{ticket.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{ticket.inventory}</p>
                        </div>
                        <p className="text-sm font-semibold text-ember">{ticket.priceLabel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="surface p-8">
        <h2 className="text-2xl font-semibold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
          Recent registrations
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Mock data for the MVP today. This table can later be backed by registration records and attendee profiles.
        </p>
        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-stone-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-stone-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Attendee</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Ticket</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {defaultRegistrations.map((row) => (
                <tr key={row.name} className="border-t border-stone-200">
                  <td className="px-4 py-3 font-medium text-ink">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600">{row.company}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ticket}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
