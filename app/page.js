import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Handshake,
  LayoutPanelTop,
  UsersRound
} from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { EventCard } from "@/components/events/event-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedEvents, getLandingMetrics } from "@/lib/platform-data";

const featureList = [
  {
    title: "End-to-end event operations",
    description:
      "Manage event setup, ticket inventory, publishing, and registrations from one control plane.",
    icon: CalendarDays
  },
  {
    title: "Attendee intelligence",
    description:
      "Track conversion, profile completion, session intent, and networking momentum across your audience.",
    icon: BarChart3
  },
  {
    title: "Networking that actually works",
    description:
      "Give attendees discovery filters, suggested matches, and lightweight ways to connect before the venue doors open.",
    icon: Handshake
  },
  {
    title: "Branded event surfaces",
    description:
      "Publish tailored event pages with your tone, imagery, ticket tiers, and sponsor-ready positioning.",
    icon: LayoutPanelTop
  }
];

export default async function HomePage() {
  const [events, metrics] = await Promise.all([
    getFeaturedEvents(),
    getLandingMetrics()
  ]);

  return (
    <main>
      <AppHeader />

      <section className="app-shell py-8 md:py-14">
        <div className="surface overflow-hidden px-8 py-10 md:px-12 md:py-14">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <span className="eyebrow">Conference platform MVP</span>
              <div className="space-y-5">
                <h1
                  className="max-w-3xl text-5xl font-semibold leading-tight text-ink md:text-7xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Run events like products, not spreadsheets.
                </h1>
                <p className="max-w-2xl text-lg text-slate-600 md:text-xl">
                  SummitOS helps organisers launch branded events, understand attendees,
                  unlock networking, and keep the community alive after the closing keynote.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open organiser dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ember hover:text-ember"
                >
                  Browse event pages
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-3xl bg-mist px-5 py-5">
                    <p className="text-3xl font-semibold text-ink">{metric.value}</p>
                    <p className="mt-1 text-sm text-slate-600">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 self-end">
              <div className="rounded-[1.75rem] bg-pine p-6 text-white">
                <div className="flex items-center gap-3">
                  <UsersRound className="h-6 w-6" />
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                    Live audience pulse
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-sm text-white/70">Networking readiness</p>
                    <p className="mt-2 text-3xl font-semibold">71%</p>
                    <p className="mt-1 text-sm text-white/80">
                      attendees have completed profile interests and matchmaking preferences
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-sm text-white/70">Top segment</p>
                    <p className="mt-2 text-xl font-semibold">Early-stage SaaS founders</p>
                    <p className="mt-1 text-sm text-white/80">
                      Strong overlap with AI infrastructure buyers and sponsor demand
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-ember/20 bg-ember/10 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-ember">Before. During. After.</p>
                <p className="mt-3 text-lg font-semibold text-ink">
                  One attendee graph across registration, onsite networking, and community follow-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-shell py-12">
        <SectionHeading
          eyebrow="Platform pillars"
          title="Built for organisers who need visibility, not just forms."
          description="The MVP focuses on the operational surfaces organisers use daily and the attendee experiences that drive retention."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureList.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="surface p-6">
                <div className="inline-flex rounded-2xl bg-mist p-3 text-pine">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="app-shell py-12">
        <SectionHeading
          eyebrow="Branded event pages"
          title="Each event gets its own storefront."
          description="Ticketing, speaker positioning, social proof, and audience fit live on a single branded surface."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="app-shell py-12">
        <div className="surface flex flex-col gap-6 px-8 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Post-event engagement</span>
            <h2
              className="mt-4 text-3xl font-semibold text-ink md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Keep the conversation moving after the badges come off.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Community threads, recap resources, sponsor follow-up, and attendee relationship history
              keep the event useful beyond event day.
            </p>
          </div>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            View community hub
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
