"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Admin navigation.
 *
 * Desktop gets a fixed sidebar; below `lg` it becomes a slide-over drawer with
 * a backdrop. The drawer closes on route change and on Escape, and locks body
 * scroll while open — the same behaviour the client site's menu uses.
 */

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "▦", exact: true },
  { href: "/enquiries", label: "Enquiries", icon: "✉" },
  { href: "/content", label: "Content", icon: "▤" },
] as const;

const CONTENT_ITEMS = [
  { href: "/content/projects", label: "Projects" },
  { href: "/content/services", label: "Services" },
  { href: "/content/software", label: "Software" },
  { href: "/content/pricing", label: "Pricing" },
  { href: "/content/testimonials", label: "Testimonials" },
  { href: "/content/faqs", label: "FAQs" },
] as const;

export function AdminNav({
  logoutButton,
  followUpCount,
}: {
  logoutButton: ReactNode;
  followUpCount?: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /*
    Close the drawer on route change by *deriving* state instead of writing
    it from an effect. The pathname the drawer was opened on is remembered;
    any change means we navigated, so the drawer should be shut. Setting
    state straight from an effect body would render twice and trip React's
    "setState synchronously within an effect" check.
  */
  const [openedOnPath, setOpenedOnPath] = useState(pathname);
  const drawerOpen = open && openedOnPath === pathname;

  const openDrawer = () => {
    setOpenedOnPath(pathname);
    setOpen(true);
  };

  // The top-bar burger lives in a sibling component, so it signals us here.
  useEffect(() => {
    const onOpen = () => {
      setOpenedOnPath(window.location.pathname);
      setOpen(true);
    };
    window.addEventListener("taxi:open-nav", onOpen);
    return () => window.removeEventListener("taxi:open-nav", onOpen);
  }, []);

  // Lock scroll and wire Escape while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string, exact?: boolean) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const navBody = (
    <>
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2.5 px-4 py-5"
        aria-label="Taxi admin dashboard"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-[15px] font-black text-black">
          T
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-extrabold tracking-wide text-foreground">
            TAXI
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle">
            Admin
          </span>
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(
              item.href,
              "exact" in item ? item.exact : false,
            );
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                    active
                      ? "bg-[var(--accent-soft)] text-accent"
                      : "text-muted hover:bg-white/[0.04] hover:text-foreground",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden className="text-[15px] opacity-80">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  {item.href === "/enquiries" && followUpCount ? (
                    <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-black tabular-nums">
                      {followUpCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Content sub-nav, shown while browsing content routes. */}
        {pathname.startsWith("/content") ? (
          <div className="mt-4">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-subtle">
              Content sections
            </p>
            <ul className="flex flex-col gap-0.5">
              {CONTENT_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-[12.5px] transition-colors",
                      pathname === item.href
                        ? "text-accent"
                        : "text-subtle hover:text-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>

      <div className="border-t border-border px-3 py-3">{logoutButton}</div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        {navBody}
      </aside>

      {/* Mobile: drawer + backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/70 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 flex w-[264px] max-w-[85vw] flex-col border-r border-border bg-surface transition-transform duration-200 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {navBody}
        </aside>
      </div>
    </>
  );
}

/**
 * Burger button for the mobile top bar.
 *
 * It dispatches a custom event rather than receiving a callback, because the
 * drawer state lives inside AdminNav while the button renders in the sibling
 * header. A shared context would be heavier than the problem warrants.
 */
export function MobileNavToggle() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("taxi:open-nav"))}
      aria-label="Open navigation"
      className="flex h-9 w-9 items-center justify-center rounded-lg border-border text-muted transition-colors hover:border-[var(--accent-border)] hover:text-accent lg:hidden"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
