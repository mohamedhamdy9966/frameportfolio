import { redirect } from "next/navigation";
import { AdminNav, MobileNavToggle } from "@/components/AdminNav";
import { getSession } from "@/lib/session";
import { getEnquiryStats } from "@/lib/api";
import { env } from "@/lib/env";
import { LogoutButton, ApiStatusPill } from "@/components/ShellWidgets";

/**
 * Authenticated shell.
 *
 * Every page under this layout is grouped, so a missing session redirects
 * before any child renders. proxy.ts already bounces anonymous visitors; this
 * is the authoritative check, because it verifies the cookie signature rather
 * than merely its presence.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  // A stats failure must not blank the whole dashboard, so it degrades to
  // undefined and the nav simply omits the badge.
  const stats = await getEnquiryStats().catch(() => undefined);

  return (
    <div className="relative z-1 flex min-h-screen">
      <AdminNav
        followUpCount={stats?.needsFollowUp}
        logoutButton={<LogoutButton user={session.user} />}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-[rgba(8,8,10,0.85)] px-4 py-3 backdrop-blur-md sm:px-6">
          <MobileNavToggle />

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-foreground">
              Taxi Digital Solutions
            </p>
            <p className="truncate text-[11px] text-subtle">
              {env.apiUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>

          <ApiStatusPill />
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
