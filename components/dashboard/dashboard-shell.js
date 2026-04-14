import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck2,
  Handshake,
  LayoutPanelTop,
  Ticket,
  UsersRound
} from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { SectionHeading } from "@/components/ui/section-heading";

export function DashboardShell({ dashboard, user }) {
  return (
    <main>
      <AppHeader />

      <section className="app-shell py-10">
        <div className="surface px-8 py-8 md:px-10 md:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Organiser dashboard</span>
              <h1
                className="mt-4 text-4xl font-semibold text-ink md:text-5xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                Track registrations, profile quality, networking activity, and event performance across
                the attendee lifecycle.
              </p>
            </div>
            <Link
              href="/dashboard/events"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              Manage events
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboard.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.75rem] bg-mist p-5">
                <p className="text-sm text-slate-500">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-ink">{metric.value}</p>
                <p className="mt-2 text-sm text-slate-600">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-shell grid gap-6 py-4 lg:grid-cols-[1fr_360px]">
        <div className="surface p-8">
          <SectionHeading
            eyebrow="Operational focus"
            title="What matters next"
            description="These sections map directly to the MVP surfaces organisers need to operate confidently."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {dashboard.workstreams.map((item) => {
              const icons = {
                events: CalendarCheck2,
                tickets: Ticket,
                attendees: UsersRound,
                networking: Handshake,
                branding: LayoutPanelTop
              };
              const Icon = icons[item.icon] || CalendarCheck2;

              return (
                <div key={item.title} className="rounded-[1.75rem] border border-stone-200 bg-white p-5">
                  <div className="inline-flex rounded-2xl bg-stone-100 p-3 text-pine">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  <p className="mt-5 text-sm font-semibold text-ember">{item.cta}</p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="surface p-6">
            <h2 className="text-xl font-semibold text-ink">Audience segments</h2>
            <div className="mt-4 space-y-3">
              {dashboard.segments.map((segment) => (
                <div key={segment.name} className="rounded-3xl bg-stone-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-ink">{segment.name}</p>
                    <p className="text-sm text-slate-500">{segment.count}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{segment.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-6">
            <h2 className="text-xl font-semibold text-ink">Engagement pipeline</h2>
            <div className="mt-5 space-y-4">
              {dashboard.engagementStages.map((stage) => (
                <div key={stage.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{stage.label}</span>
                    <span className="text-slate-500">{stage.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-200">
                    <div
                      className="h-2 rounded-full bg-ember"
                      style={{ width: `${stage.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <AppFooter />
    </main>
  );
}
