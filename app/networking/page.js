import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { AttendeeDirectory } from "@/components/networking/attendee-directory";
import { getAttendeeDirectory } from "@/lib/platform-data";

export const metadata = {
  title: "Networking | SummitOS"
};

export default async function NetworkingPage() {
  const attendees = await getAttendeeDirectory();

  return (
    <main>
      <AppHeader />
      <section className="app-shell py-10">
        <AttendeeDirectory attendees={attendees} />
      </section>
      <AppFooter />
    </main>
  );
}
