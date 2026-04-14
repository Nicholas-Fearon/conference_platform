import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDashboardData } from "@/lib/platform-data";

export const metadata = {
  title: "Dashboard | SummitOS"
};

export default async function DashboardPage() {
  const dashboard = await getDashboardData();
  const user = {
    firstName: "Avery"
  };

  return <DashboardShell dashboard={dashboard} user={user} />;
}
