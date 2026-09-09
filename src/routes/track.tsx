import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  MapPin,
  Send,
  ListChecks,
  Building2,
  IndianRupee,
  Users,
  CalendarCheck,
  Sparkles,
  Clock,
} from "lucide-react";
import { DashboardShell, type SideItem } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { UpvoteBadge } from "@/components/UpvoteBadge";
import { DomainBadge } from "@/components/DomainBadge";
import { STAGES } from "@/lib/jsic-data";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track My Report — J-SIC Portal" },
      {
        name: "description",
        content:
          "Follow a reported problem through review, university assignment, funding, prototype and pilot stages.",
      },
      { property: "og:title", content: "Track My Report — J-SIC Portal" },
      {
        property: "og:description",
        content: "See who is solving your reported problem and which company is funding it.",
      },
    ],
  }),
  component: TrackPage,
});

const ITEMS: SideItem[] = [
  { id: "submit", label: "Report a Problem", icon: Send },
  { id: "track", label: "Track My Reports", icon: ListChecks, badge: "1" },
];

const CURRENT = "In Progress";

const UPDATES = [
  { icon: Users, text: "Team formed — 4 students + 1 faculty mentor", when: "12 Aug 2026" },
  { icon: CalendarCheck, text: "Field visit scheduled to 6 farms in Gumla", when: "21 Aug 2026" },
  { icon: Clock, text: "Baseline pest survey underway", when: "02 Sep 2026" },
];

function TrackPage() {
  const currentIndex = STAGES.indexOf(CURRENT as (typeof STAGES)[number]);

  return (
    <DashboardShell
      roleLabel="Complainant"
      title="Sunita Devi"
      subtitle="Gumla block · Citizen reporter"
      items={ITEMS}
      active="track"
      onSelect={(id) => {
        if (id === "submit") window.location.assign("/report");
      }}
    >
      <SectionHeader
        title="Track My Reports"
        description="Reference #JSIC-2026-0847 · submitted 04 Aug 2026"
        action={
          <Button asChild variant="outline">
            <Link to="/report">Report another problem</Link>
          </Button>
        }
      />

      <div className="surface-card overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <DomainBadge domain="Agriculture" />
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <MapPin className="size-3.5" /> Gumla
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold tracking-tight">
              Tomato crop pest damage — Gumla
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Whitefly and fruit borer damage wiping out 40-60% of tomato yield across smallholder
              plots for the third consecutive season.
            </p>
          </div>
          <UpvoteBadge count={14} label="people reported this" size="md" />
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" /> Matched to top 12 universities based on
              expertise-fit
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <ol className="flex min-w-[900px] items-start">
              {STAGES.map((stage, i) => {
                const done = i < currentIndex;
                const current = i === currentIndex;
                return (
                  <li key={stage} className="flex flex-1 flex-col items-center text-center">
                    <div className="flex w-full items-center">
                      <span
                        className={`h-1 flex-1 rounded-full ${i === 0 ? "bg-transparent" : done || current ? "bg-primary" : "bg-border"}`}
                      />
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition-colors ${
                          current
                            ? "border-accent bg-accent text-accent-foreground ring-4 ring-accent/25"
                            : done
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        {done ? <Check className="size-4" /> : i + 1}
                      </span>
                      <span
                        className={`h-1 flex-1 rounded-full ${i === STAGES.length - 1 ? "bg-transparent" : done ? "bg-primary" : "bg-border"}`}
                      />
                    </div>
                    <span
                      className={`mt-2 px-1 text-[11px] font-semibold ${
                        current
                          ? "text-accent"
                          : done
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {stage}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-6 grid gap-4 rounded-xl border border-success/25 bg-success/8 p-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-success/15 text-success">
                <IndianRupee className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-success">
                  Funding attribution
                </p>
                <p className="text-sm font-semibold">
                  Funded by: Tata Steel Foundation → Birsa Agricultural University
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold tabular-nums">₹ 8,50,000 sanctioned</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Building2 className="size-4 text-primary" /> Assigned university
          </h3>
          <p className="mt-3 text-lg font-bold">Birsa Agricultural University</p>
          <p className="text-sm text-muted-foreground">
            Institution Innovation Council · Kanke, Ranchi
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-secondary/60 p-3">
              <p className="text-xs text-muted-foreground">Faculty mentor</p>
              <p className="text-sm font-semibold">Dr. A. Mahto (Entomology)</p>
            </div>
            <div className="rounded-lg bg-secondary/60 p-3">
              <p className="text-xs text-muted-foreground">Student team</p>
              <p className="text-sm font-semibold">4 members</p>
            </div>
          </div>
        </div>

        <div className="surface-card p-5 sm:p-6">
          <h3 className="text-sm font-semibold">Update feed</h3>
          <ul className="mt-4 space-y-4">
            {UPDATES.map((u) => (
              <li key={u.text} className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <u.icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{u.text}</p>
                  <p className="text-xs text-muted-foreground">{u.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}
