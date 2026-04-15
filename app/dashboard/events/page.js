import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { EventManager } from "@/components/dashboard/event-manager";
import { demoEvents } from "@/lib/demo-data";

export const metadata = {
  title: "Manage Events | SummitOS"
};

export default function DashboardEventsPage() {
  return (
    <main>
      <AppHeader />
      <EventManager initialEvents={demoEvents} />
      <AppFooter />
    </main>
  );
}
