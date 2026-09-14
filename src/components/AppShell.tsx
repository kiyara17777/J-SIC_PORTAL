import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Landmark,
  Megaphone,
  GraduationCap,
  Factory,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useT } from "@/lib/i18n";

export const ROLES = [
  { label: "Complainant", to: "/report", icon: Megaphone },
  { label: "University", to: "/university", icon: GraduationCap },
  { label: "Industry", to: "/industry", icon: Factory },
  { label: "Government", to: "/government", icon: ShieldCheck },
] as const;

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const t = useT();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Landmark className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight">{t("J-SIC Portal")}</span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              {t("Jharkhand Societal Innovation Collaboration")}
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 rounded-full border border-border bg-secondary/60 p-1 lg:flex">
          {ROLES.map((r) => {
            const active = pathname.startsWith(r.to);
            return (
              <Link
                key={r.to}
                to={r.to}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                <r.icon className="size-4" />
                {t(r.label)}
              </Link>
            );
          })}
        </nav>

        <LanguageSelector className="ml-auto hidden lg:ml-2 lg:inline-flex" />

        <Button asChild size="sm" className="hidden lg:inline-flex">
          <Link to="/report">{t("Report a Problem")}</Link>
        </Button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-10 place-items-center rounded-lg border border-border lg:hidden"
          aria-label="Toggle role menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <div className="mb-2">
            <LanguageSelector className="w-full justify-start" />
          </div>
          <div className="grid gap-1">
            {ROLES.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  pathname.startsWith(r.to)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary",
                )}
              >
                <r.icon className="size-4" />
                {t(r.label)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export type SideItem = { label: string; icon: LucideIcon; id: string; badge?: string };

export function DashboardShell({
  title,
  subtitle,
  items,
  active,
  onSelect,
  children,
  roleLabel,
}: {
  title: string;
  subtitle?: string;
  items: SideItem[];
  active: string;
  onSelect: (id: string) => void;
  children: ReactNode;
  roleLabel: string;
}) {
  const [open, setOpen] = useState(false);

  const nav = (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="rounded-xl bg-sidebar-accent/60 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-primary">
          {roleLabel}
        </p>
        <p className="mt-1 text-sm font-semibold text-sidebar-foreground">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-sidebar-foreground/70">{subtitle}</p>}
      </div>
      <nav className="grid gap-1">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => {
              onSelect(it.id);
              setOpen(false);
            }}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
              active === it.id
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            )}
          >
            <it.icon className="size-4 shrink-0" />
            <span className="flex-1">{it.label}</span>
            {it.badge && (
              <span className="rounded-full bg-sidebar-foreground/15 px-1.5 py-0.5 text-[11px] font-semibold">
                {it.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="mt-auto rounded-xl border border-sidebar-border p-3 text-xs text-sidebar-foreground/70">
        Switch roles from the top bar to move across the problem-to-solution pipeline.
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
          {nav}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-2 md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium"
            >
              <Menu className="size-4" /> Menu
            </button>
            <span className="truncate text-sm text-muted-foreground">{title}</span>
          </div>
          {open && (
            <div className="border-b border-sidebar-border bg-sidebar md:hidden">{nav}</div>
          )}
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main>{children}</main>
    </div>
  );
}
