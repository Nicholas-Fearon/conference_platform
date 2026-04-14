import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { EventCard } from "@/components/events/event-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllEvents } from "@/lib/platform-data";

export const metadata = {
  title: "Events | SummitOS"
};

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <main>
      <AppHeader />
      <section className="app-shell py-10">
        <SectionHeading
          eyebrow="Event catalogue"
          title="Discover the active event portfolio."
          description="Each listing includes branding, audience profile, capacity, and ticket inventory."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      <AppFooter />
    </main>
  );
}
