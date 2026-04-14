import { LockKeyhole, MessageSquare, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export function CommunityHub({ feed, authenticated }) {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Post-event community"
        title="Keep attendee relationships warm after event day."
        description="The MVP community layer covers recap discussions, resource sharing, sponsor follow-up, and cohort-based continuity."
      />

      {!authenticated ? (
        <div className="surface flex items-start gap-4 p-6">
          <LockKeyhole className="mt-1 h-5 w-5 text-ember" />
          <div>
            <p className="font-semibold text-ink">Sign in to join protected event communities.</p>
            <p className="mt-2 text-sm text-slate-600">
              Public visitors can browse event recaps. Authenticated attendees unlock community threads,
              direct follow-ups, and saved connections.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {feed.posts.map((post) => (
            <article key={post.id} className="surface p-6">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <MessageSquare className="h-4 w-4 text-ember" />
                <span>{post.channel}</span>
                <span>{post.author}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-ink">{post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{post.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-5">
          <div className="surface p-6">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-pine" />
              <h2 className="text-xl font-semibold text-ink">Active cohorts</h2>
            </div>
            <div className="mt-5 space-y-3">
              {feed.cohorts.map((cohort) => (
                <div key={cohort.name} className="rounded-3xl bg-stone-50 p-4">
                  <p className="font-semibold text-ink">{cohort.name}</p>
                  <p className="mt-2 text-sm text-slate-600">{cohort.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-6">
            <h2 className="text-xl font-semibold text-ink">Community MVP scope</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Threaded recap posts per event</li>
              <li>Resource and sponsor follow-up posts</li>
              <li>Saved connections carried over from networking</li>
              <li>Lightweight cohort or interest-based channels</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
