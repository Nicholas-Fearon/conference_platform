import { createSupabaseServerClient } from "@/lib/supabase/server";
import { demoAttendees, demoCommunity, demoDashboard, demoEvents } from "@/lib/demo-data";

export async function getFeaturedEvents() {
  return demoEvents.slice(0, 3);
}

export async function getAllEvents() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return demoEvents;
  }

  const { data, error } = await supabase
    .from("events")
    .select("id, slug, name, category, status, short_description, starts_at, city, country, cover_image_url")
    .order("starts_at", { ascending: true });

  if (error || !data?.length) {
    return demoEvents;
  }

  return data.map((event) => ({
    id: event.id,
    slug: event.slug,
    name: event.name,
    category: event.category,
    status: event.status,
    description: event.short_description,
    dateLabel: new Date(event.starts_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }),
    location: `${event.city}, ${event.country}`,
    ticketSummary: "Tickets configured in Supabase",
    coverImage: event.cover_image_url || demoEvents[0].coverImage
  }));
}

export async function getEventBySlug(slug) {
  const event = demoEvents.find((item) => item.slug === slug);
  return event || null;
}

export async function getLandingMetrics() {
  return [
    { label: "Events launched", value: "24" },
    { label: "Active attendees", value: "8.6k" },
    { label: "Connections created", value: "3.1k" }
  ];
}

export async function getDashboardData() {
  return demoDashboard;
}

export async function getAttendeeDirectory() {
  return demoAttendees;
}

export async function getCommunityFeed() {
  return demoCommunity;
}
