import Link from "next/link";
import { CalendarDays, ImagePlus, Palette, Ticket, UsersRound } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
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

const registrationRows = [
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

const ticketRows = [
  ["Standard", "GBP149", "420 available"],
  ["Founder dinner", "GBP349", "42 available"],
  ["Team pass", "GBP699", "18 available"]
];

const brandRows = [
  ["Primary", "#0f172a"],
  ["Accent", "#d97706"],
  ["Support", "#1d4d4f"]
];

export const metadata = {
  title: "Manage Events | SummitOS"
};

export default function DashboardEventsPage() {
  return (
    <main>
      <AppHeader />
      <section className="app-shell space-y-6 py-10">
        <div className="surface px-8 py-8 md:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Event creation and management"
              title="Working organiser surface for a no-backend MVP"
              description="Use this page to model the core organiser experience now, then wire the form state into a real backend later without redesigning the flow."
            />
            <Link
              href="/events/future-of-saas-london"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              Preview branded event page
              <ImagePlus className="h-4 w-4" />
            </Link>
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

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface p-8">
            <h2 className="text-2xl font-semibold text-ink" style={{ fontFamily: "var(--font-heading)" }}>
              Event setup form
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Static in demo mode, but already structured like the real event CRUD surface.
            </p>

            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Event name</span>
                <input defaultValue="Future of SaaS London" className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Slug</span>
                <input defaultValue="future-of-saas-london" className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Status</span>
                <select defaultValue="On sale" className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none">
                  <option>Draft</option>
                  <option>Published</option>
                  <option>On sale</option>
                  <option>Completed</option>
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Start date</span>
                <input defaultValue="2026-09-18" type="date" className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Venue</span>
                <input defaultValue="Magazine London" className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none" />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Short description</span>
                <textarea
                  defaultValue="A founder-and-operator conference designed around buyer conversations, peer networking, and product-led growth playbooks."
                  rows={4}
                  className="w-full rounded-3xl border border-stone-300 bg-white px-4 py-3 outline-none"
                />
              </label>
              <div className="flex flex-wrap gap-3 pt-2 md:col-span-2">
                <button type="button" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
                  Save draft
                </button>
                <button type="button" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-ink">
                  Publish event
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="surface p-6">
              <h2 className="text-xl font-semibold text-ink">Ticket tiers</h2>
              <div className="mt-4 space-y-3">
                {ticketRows.map(([name, price, inventory]) => (
                  <div key={name} className="rounded-3xl bg-stone-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-ink">{name}</p>
                        <p className="mt-1 text-sm text-slate-600">{inventory}</p>
                      </div>
                      <p className="text-sm font-semibold text-ember">{price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface p-6">
              <h2 className="text-xl font-semibold text-ink">Brand controls</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {brandRows.map(([label, value]) => (
                  <div key={label} className="rounded-3xl bg-stone-50 p-4 text-center">
                    <div className="mx-auto h-10 w-10 rounded-full border border-white shadow-sm" style={{ backgroundColor: value }} />
                    <p className="mt-3 text-sm font-semibold text-ink">{label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{value}</p>
                  </div>
                ))}
              </div>
            </div>
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
                {registrationRows.map((row) => (
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
      <AppFooter />
    </main>
  );
}
