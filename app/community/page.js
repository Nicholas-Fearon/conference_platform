import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { CommunityHub } from "@/components/community/community-hub";
import { getCommunityFeed } from "@/lib/platform-data";

export const metadata = {
  title: "Community | SummitOS"
};

export default async function CommunityPage() {
  const feed = await getCommunityFeed({ authenticated: true });

  return (
    <main>
      <AppHeader />
      <section className="app-shell py-10">
        <CommunityHub feed={feed} authenticated />
      </section>
      <AppFooter />
    </main>
  );
}
