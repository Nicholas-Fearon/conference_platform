import { BriefcaseBusiness, MapPin, Search, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export function AttendeeDirectory({ attendees }) {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Attendee discovery"
        title="Directory and matchmaking starter"
        description="Profiles are filterable by role, interests, geography, and networking intent. The MVP can begin with lightweight search plus suggested matches."
      />

      <div className="surface p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto]">
          <label className="flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Search by name, company, or topic"
              readOnly
            />
          </label>
          {["Founder", "Investor", "Sponsor"].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-stone-300 px-4 py-3 text-sm font-medium text-slate-700"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {attendees.map((attendee) => (
          <article key={attendee.id} className="surface p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-ink">{attendee.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{attendee.headline}</p>
              </div>
              <span className="rounded-full bg-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                {attendee.matchScore}% match
              </span>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-4 w-4 text-pine" />
                <span>{attendee.company}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-pine" />
                <span>{attendee.location}</span>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-pine" />
                <span>{attendee.interests.join(" • ")}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
                Request intro
              </button>
              <button className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-ink">
                Save
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
