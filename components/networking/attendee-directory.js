"use client";

import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, MapPin, Search, Sparkles, UserRoundPlus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const SAVED_KEY = "summitos_saved_connections";
const INTRO_KEY = "summitos_intro_requests";
const roleFilters = ["All", "Founder", "Investor", "Sponsor"];

export function AttendeeDirectory({ attendees }) {
  const [query, setQuery] = useState("");
  const [activeRole, setActiveRole] = useState("All");
  const [savedIds, setSavedIds] = useState([]);
  const [introIds, setIntroIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSavedIds(JSON.parse(window.localStorage.getItem(SAVED_KEY) || "[]"));
    setIntroIds(JSON.parse(window.localStorage.getItem(INTRO_KEY) || "[]"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
  }, [hydrated, savedIds]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(INTRO_KEY, JSON.stringify(introIds));
  }, [hydrated, introIds]);

  const filteredAttendees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return attendees.filter((attendee) => {
      const roleMatches = activeRole === "All" || attendee.role === activeRole;
      const queryMatches =
        !normalizedQuery ||
        attendee.name.toLowerCase().includes(normalizedQuery) ||
        attendee.company.toLowerCase().includes(normalizedQuery) ||
        attendee.location.toLowerCase().includes(normalizedQuery) ||
        attendee.interests.join(" ").toLowerCase().includes(normalizedQuery);

      return roleMatches && queryMatches;
    });
  }, [activeRole, attendees, query]);

  const savedConnections = attendees.filter((attendee) => savedIds.includes(attendee.id));
  const introRequests = attendees.filter((attendee) => introIds.includes(attendee.id));

  function toggleSaved(id) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function toggleIntro(id) {
    setIntroIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Attendee discovery"
        title="Directory and matchmaking starter"
        description="Search by name, company, geography, or interest. Save promising attendees and keep a lightweight queue of intro requests inside the MVP."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="surface p-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto_auto]">
              <label className="flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Search by name, company, location, or topic"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              {roleFilters.map((filter) => {
                const active = activeRole === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveRole(filter)}
                    className={`rounded-full px-4 py-3 text-sm font-medium ${active ? "bg-ink text-white" : "border border-stone-300 text-slate-700"}`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
              <span>{filteredAttendees.length} attendees match your filters</span>
              <span>{savedConnections.length} saved</span>
              <span>{introRequests.length} intro requests drafted</span>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {filteredAttendees.map((attendee) => {
              const isSaved = savedIds.includes(attendee.id);
              const introRequested = introIds.includes(attendee.id);
              return (
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

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-pine">
                      {attendee.role}
                    </span>
                    {isSaved ? (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        Saved
                      </span>
                    ) : null}
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
                    <button
                      type="button"
                      onClick={() => toggleIntro(attendee.id)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${introRequested ? "bg-emerald-600 text-white" : "bg-ink text-white"}`}
                    >
                      {introRequested ? "Intro queued" : "Request intro"}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSaved(attendee.id)}
                      className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-ink"
                    >
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {!filteredAttendees.length ? (
            <div className="surface p-8 text-center text-sm text-slate-600">
              No attendees match the current filters. Try a different role or search term.
            </div>
          ) : null}
        </div>

        <aside className="space-y-5">
          <div className="surface p-6">
            <div className="flex items-center gap-3">
              <UserRoundPlus className="h-5 w-5 text-pine" />
              <h2 className="text-xl font-semibold text-ink">Saved connections</h2>
            </div>
            <div className="mt-4 space-y-3">
              {savedConnections.length ? (
                savedConnections.map((attendee) => (
                  <div key={attendee.id} className="rounded-3xl bg-stone-50 p-4">
                    <p className="font-semibold text-ink">{attendee.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{attendee.company}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{attendee.role}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600">Save a few people from the directory to create a shortlist.</p>
              )}
            </div>
          </div>

          <div className="surface p-6">
            <h2 className="text-xl font-semibold text-ink">Intro request queue</h2>
            <div className="mt-4 space-y-3">
              {introRequests.length ? (
                introRequests.map((attendee) => (
                  <div key={attendee.id} className="rounded-3xl bg-stone-50 p-4">
                    <p className="font-semibold text-ink">{attendee.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{attendee.headline}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600">Request intros to build a lightweight networking pipeline for the event.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
